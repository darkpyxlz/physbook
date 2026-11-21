/* Physbook equation board: the SymPy engine, run in the browser by Pyodide. Kept as a string so the
   site still works from file:// (no fetch of a .py file). All symbols are positive physical quantities. */
window.PB.SOLVER_PY = String.raw`

import json, re, keyword
import sympy as sp
from sympy.core.function import AppliedUndef
from sympy.printing.latex import LatexPrinter
from sympy.parsing.sympy_parser import (parse_expr, standard_transformations,
    implicit_multiplication, convert_xor, function_exponentiation)

TIME = 't'  # the variable \dot{x} differentiates with respect to

# ---------- Symbols and sign settings ----------
SYMS = {}
SIGNS = {}  # name -> 'real' for quantities that may be negative; everything else is positive
FUNS = {}

def sym(name):
    kind = SIGNS.get(name, 'positive')
    s = SYMS.get((name, kind))
    if s is None:
        s = sp.Symbol(name, real=True) if kind == 'real' else sp.Symbol(name, positive=True)
        SYMS[(name, kind)] = s
    return s

def fun(name):
    """A quantity written as a function, such as x(t). Functions may take any real value."""
    f = FUNS.get(name)
    if f is None:
        f = sp.Function(name, real=True)
        FUNS[name] = f
    return f

def vname(e):
    if isinstance(e, AppliedUndef):
        return e.func.__name__
    return getattr(e, 'name', str(e))

def is_pos(s):
    if isinstance(s, AppliedUndef) or isinstance(s, sp.Dummy):
        return False
    return SIGNS.get(vname(s), 'positive') == 'positive'

def set_signs(signs_json):
    SIGNS.clear()
    SIGNS.update({k: v for k, v in json.loads(signs_json).items() if v == 'real'})
    return {'ok': True}

def safe_name(name):
    # names SymPy's parser or Python would misread; SymPy prints 'lamda' as \lambda
    if name == 'lambda': return 'lamda'
    if keyword.iskeyword(name): return name + '_'
    return name

# ---------- Calculus helpers ----------
def make_diff(e, *spec):
    if not spec:
        spec = (sym(TIME),)
    out = []
    for a in spec:
        if isinstance(a, (sp.Integer, int)) and out:
            out[-1] = (out[-1][0], int(a))
        elif isinstance(a, sp.Symbol):
            out.append((a, 1))
        else:
            raise ValueError('diff needs a variable to differentiate with respect to, like diff(x, t)')
    return sp.Derivative(e, *out)

def make_int(f, v=None, a=None, b=None):
    if v is None:
        fs = sorted(f.free_symbols, key=lambda s: s.name)
        if len(fs) != 1:
            raise ValueError('say which variable to integrate over, like int(F, x, 0, d)')
        v = fs[0]
    if not isinstance(v, sp.Symbol):
        raise ValueError('the second argument of int must be a variable')
    if a is None:
        return sp.Integral(f, v)
    if b is None:
        raise ValueError('give both limits, like int(F, x, 0, d)')
    return sp.Integral(f, (v, a, b))

def calc_eval(e, force=False):
    """Evaluate derivatives and integrals that can be: d/dt of something written in terms of t.
    A bare symbol like dx/dt stays as it is (x may depend on t) unless force=True."""
    def ready(n):
        if isinstance(n, sp.Derivative):
            return force or all(n.expr.has(v) for v, _ in n.variable_count)
        if isinstance(n, sp.Integral):
            return force or all(n.function.has(lim[0]) for lim in n.limits)
        return False
    try:
        return e.replace(lambda n: isinstance(n, (sp.Derivative, sp.Integral)) and ready(n), lambda n: n.doit())
    except Exception:
        return e

def has_calc(e):
    return e.has(sp.Derivative) or e.has(sp.Integral)

# ---------- Plain-text parsing ----------
FUNCS = {
    'sin': sp.sin, 'cos': sp.cos, 'tan': sp.tan, 'sec': sp.sec, 'csc': sp.csc, 'cot': sp.cot,
    'asin': sp.asin, 'acos': sp.acos, 'atan': sp.atan, 'arcsin': sp.asin, 'arccos': sp.acos, 'arctan': sp.atan,
    'sinh': sp.sinh, 'cosh': sp.cosh, 'tanh': sp.tanh, 'asinh': sp.asinh, 'acosh': sp.acosh, 'atanh': sp.atanh,
    'sqrt': sp.sqrt, 'cbrt': sp.cbrt, 'exp': sp.exp, 'ln': sp.log, 'log': sp.log, 'abs': sp.Abs,
    'sign': sp.sign, 'floor': sp.floor, 'ceil': sp.ceiling, 'atan2': sp.atan2,
    'diff': make_diff, 'derivative': make_diff, 'int': make_int, 'integrate': make_int, 'integral': make_int,
}
CONSTS = {'pi': sp.pi, 'oo': sp.oo, 'inf': sp.oo, 'infinity': sp.oo}
TRANS = standard_transformations + (implicit_multiplication, convert_xor, function_exponentiation)
IDENT = re.compile(r'[A-Za-z][A-Za-z0-9_]*')
SIMPLE_ARGS = re.compile(r'^\s*([A-Za-z][A-Za-z0-9_]*|[0-9.]+)\s*(,\s*([A-Za-z][A-Za-z0-9_]*|[0-9.]+)\s*)*$')

def match_paren(text, i):
    """Index of the bracket closing the one at text[i]."""
    depth = 0
    for j in range(i, len(text)):
        if text[j] == '(':
            depth += 1
        elif text[j] == ')':
            depth -= 1
            if depth == 0:
                return j
    raise ValueError('a bracket is not closed')

def flatten_sub(m):
    inner = re.sub(r'\\(mathrm|text|mathit|rm)\b', '', m.group(1))
    inner = re.sub(r'[{}\\\s]', '', inner).replace(',', '_')
    return '_' + inner

def plain_prep(text):
    text = text.replace('·', '*').replace('×', '*').replace('−', '-').replace('π', 'pi').replace('∞', 'oo')
    text = re.sub(r'_\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}', flatten_sub, text)   # v_{max} -> v_max
    text = text.replace('^{', '^(').replace('{', '(').replace('}', ')')
    # Leibniz notation: dx/dt, d^2x/dt^2, d2x/dt2
    text = re.sub(r'(?<![A-Za-z0-9_])d(?:\^?([0-9]))?([A-Za-z][A-Za-z0-9_]*)\s*/\s*d([A-Za-z][A-Za-z0-9_]*?)(?:\^?([0-9]))?(?![A-Za-z0-9_(])',
                  lambda m: 'diff(' + m.group(2) + ', ' + m.group(3) + (', ' + m.group(1) if m.group(1) and m.group(1) != '1' else '') + ')', text)
    # operator form: d/dt(expr)
    while True:
        m = re.search(r'(?<![A-Za-z0-9_])d/d([A-Za-z][A-Za-z0-9_]*)\s*\(', text)
        if not m:
            break
        j = match_paren(text, m.end() - 1)
        text = text[:m.start()] + 'diff(' + text[m.end():j] + ', ' + m.group(1) + ')' + text[j + 1:]
    return text

def parse_side(text):
    text = plain_prep(text)
    out, local, i = [], {}, 0
    for m in IDENT.finditer(text):
        if m.start() < i:
            continue
        out.append(text[i:m.start()])
        name = m.group(0)
        rest = text[m.end():].lstrip()
        if name in FUNCS and rest.startswith('('):
            tok = '_F_' + name
            local[tok] = FUNCS[name]
        elif name in CONSTS:
            tok = name
            local[name] = CONSTS[name]
        elif name == 'e' and (rest.startswith('^') or rest.startswith('**')):
            tok = 'E'
            local['E'] = sp.E
        elif m.end() < len(text) and text[m.end()] == '(' and SIMPLE_ARGS.match(text[m.end() + 1:match_paren(text, m.end())]):
            # x(t), v(0), F(x): a quantity written as a function of simple arguments
            fname = safe_name(name)
            tok = '_U_' + fname
            local[tok] = fun(fname)
            j = match_paren(text, m.end())
            args = []
            for a in text[m.end() + 1:j].split(','):
                a = a.strip()
                if IDENT.fullmatch(a):
                    a2 = safe_name(a)
                    local[a2] = sym(a2)
                    args.append(a2)
                else:
                    args.append(a)
            out.append(tok + '(' + ', '.join(args) + ')')
            i = j + 1
            continue
        else:
            tok = safe_name(name)
            local[tok] = sym(tok)
        out.append(tok)
        i = m.end()
    out.append(text[i:])
    src = ''.join(out)
    if not src.strip():
        raise ValueError('One side of the equation is empty.')
    expr = parse_expr(src, local_dict=local, global_dict={'Integer': sp.Integer, 'Float': sp.Float, 'Rational': sp.Rational, 'Symbol': sp.Symbol, 'E': sp.E}, transformations=TRANS, evaluate=True)
    return sp.nsimplify(expr, rational=True) if expr.has(sp.Float) else expr

# ---------- Display ----------
def merge_roots(e):
    """Display-only: sqrt(2)*sqrt(g)*sqrt(h) -> sqrt(2*g*h), sqrt(G)*sqrt(M)/sqrt(r) -> sqrt(G*M/r).
    Valid because the bases are positive. Built unevaluated so SymPy does not split it again."""
    if not isinstance(e, sp.Basic) or e.is_Atom or isinstance(e, (sp.Derivative, sp.Integral, AppliedUndef)):
        return e
    if not e.is_Mul:
        try:
            return e.func(*[merge_roots(a) for a in e.args], evaluate=False) if e.args else e
        except TypeError:
            return e
    groups, rest, loose = {}, [], {}
    for f in e.args:
        f = merge_roots(f)
        if f.is_Pow and f.exp.is_Rational and not f.exp.is_Integer:
            k = abs(f.exp)
            # sqrt(a)*sqrt(b) = sqrt(a*b) holds when all but at most one base are non-negative
            if not f.base.is_nonnegative:
                if loose.get(k):
                    rest.append(f)
                    continue
                loose[k] = True
            groups.setdefault(k, ([], []))[0 if f.exp > 0 else 1].append(f.base)
        else:
            rest.append(f)
    for k, (num, den) in groups.items():
        if len(num) + len(den) < 2:
            rest.extend([sp.Pow(b, k, evaluate=False) for b in num] + [sp.Pow(b, -k, evaluate=False) for b in den])
            continue
        top = sp.Mul(*num, evaluate=False) if len(num) > 1 else (num[0] if num else sp.Integer(1))
        inner = top if not den else sp.Mul(top, sp.Pow(sp.Mul(*den, evaluate=False) if len(den) > 1 else den[0], -1, evaluate=False), evaluate=False)
        rest.append(sp.Pow(inner, k, evaluate=False))
    return sp.Mul(*rest, evaluate=False) if len(rest) > 1 else rest[0]

def nice(e):
    try:
        e = e.replace(lambda x: x.is_Add and len(x.args) > 1 and all(isinstance(t, sp.log) or (t.is_Mul and len(t.args) == 2 and t.args[0] == -1 and isinstance(t.args[1], sp.log)) for t in x.args),
                      lambda x: sp.log(sp.Mul(*[t.args[0] if isinstance(t, sp.log) else 1 / t.args[1].args[0] for t in x.args])))
    except Exception:
        pass
    try:
        return merge_roots(e)
    except Exception:
        return e

GREEK_NAMES = {'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lamda', 'lambda', 'mu', 'nu',
               'xi', 'omicron', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega',
               'Gamma', 'Delta', 'Theta', 'Lambda', 'Xi', 'Pi', 'Sigma', 'Upsilon', 'Phi', 'Psi', 'Omega'}

def name_tex(n):
    """v_max -> v_{\\mathrm{max}}, theta_1 -> \\theta_{1}, v_1_x -> v_{1,x}, DeltaT -> \\Delta T."""
    if n.startswith('Delta') and len(n) > 5:
        return r'\Delta ' + name_tex(n[5:].lstrip('_'))
    base, _, sub = n.partition('_')
    if base == 'hbar':
        bt = r'\hbar'
    elif base in GREEK_NAMES:
        bt = sp.latex(sp.Symbol(base))
    elif len(base) > 1:
        bt = r'\mathrm{' + base + '}' if base.isupper() and len(base) <= 3 else base
    else:
        bt = base
    if not sub:
        return bt
    parts = []
    for p in sub.split('_'):
        if not p:
            continue
        if p in GREEK_NAMES:
            parts.append(sp.latex(sp.Symbol(p)))
        elif p.isalpha() and len(p) > 1:
            parts.append(r'\mathrm{' + p + '}')
        else:
            parts.append(p)
    return bt + '_{' + ','.join(parts) + '}'

def sym_tex(s):
    if isinstance(s, AppliedUndef):
        return name_tex(vname(s)) + r'(' + ', '.join(sym_tex(a) if isinstance(a, sp.Symbol) else sp.latex(a) for a in s.args) + ')'
    if isinstance(s, sp.Dummy):
        return DUMMY_TEX.get(s, sp.latex(s))
    return name_tex(s.name)

class PhysPrinter(LatexPrinter):
    """Leibniz derivatives (dx/dt) and plain x(t) for quantities written as functions."""
    def _print_Symbol(self, s, style='plain'):
        if isinstance(s, sp.Dummy):
            return DUMMY_TEX.get(s, super()._print_Symbol(s))
        return name_tex(s.name)

    def _print_Function(self, e, exp=None):
        if isinstance(e, AppliedUndef):
            t = name_tex(vname(e)) + r'\left(' + ', '.join(self._print(a) for a in e.args) + r'\right)'
            return t if exp is None else r'\left(' + t + r'\right)^{' + exp + '}'
        return super()._print_Function(e, exp)

    def _print_Derivative(self, e):
        inner = e.expr
        vc = e.variable_count
        if len(vc) == 1 and isinstance(inner, (sp.Symbol, AppliedUndef)):
            v, n = vc[0]
            nm = name_tex(vname(inner))
            vt = self._print(v)
            if n == 1:
                return r'\frac{d' + nm + '}{d' + vt + '}'
            return r'\frac{d^{' + str(n) + '}' + nm + '}{d' + vt + '^{' + str(n) + '}}'
        if len(vc) == 1:
            v, n = vc[0]
            vt = self._print(v)
            op = r'\frac{d}{d' + vt + '}' if n == 1 else r'\frac{d^{' + str(n) + '}}{d' + vt + '^{' + str(n) + '}}'
            return op + r'\left(' + self._print(inner) + r'\right)'
        return super()._print_Derivative(e)

def tex(e):
    return PhysPrinter({'ln_notation': True}).doprint(nice(e))

def eq_tex(L, R):
    return tex(L) + ' = ' + tex(R)

def quantities(e):
    """name -> the object that stands for it (a Symbol, or an applied function like x(t))."""
    out = {}
    for s in e.free_symbols:
        if isinstance(s, sp.Symbol) and not isinstance(s, sp.Dummy):
            out[s.name] = s
    for a in e.atoms(AppliedUndef):
        n = vname(a)
        if n in out and isinstance(out[n], sp.Symbol):
            continue
        if n not in out or all(isinstance(x, sp.Symbol) for x in a.args):
            out[n] = a
    return out

def var_info(L, R):
    q = quantities(L - R if not (L - R) == 0 else L)
    q.update({k: v for k, v in quantities(L).items() if k not in q})
    q.update({k: v for k, v in quantities(R).items() if k not in q})
    return [{'name': k, 'tex': sym_tex(q[k]), 'fn': isinstance(q[k], AppliedUndef)} for k in sorted(q, key=lambda k: (k.lower(), k))]

def pack(L, R, **extra):
    d = {'ok': True, 'L': sp.srepr(L), 'R': sp.srepr(R), 'tex': eq_tex(L, R), 'vars': var_info(L, R), 'calc': has_calc(L) or has_calc(R)}
    d.update(extra)
    return d

NS = {k: getattr(sp, k) for k in dir(sp) if not k.startswith('_')}
def load(srepr):
    e = eval(srepr, NS)
    # re-apply the current sign settings to every symbol, and the shared function objects
    e = e.xreplace({s: sym(s.name) for s in e.free_symbols if isinstance(s, sp.Symbol) and not isinstance(s, sp.Dummy)})
    apps = e.atoms(AppliedUndef)
    if apps:
        e = e.xreplace({a: fun(vname(a))(*a.args) for a in apps})
    return e

def is_sym(e, s=None):
    return isinstance(e, (sp.Symbol, AppliedUndef)) and (s is None or e == s)

def target(e, name):
    """The object to solve for or replace when the user picks the variable called name."""
    q = quantities(e)
    return q.get(name)

def tidy(L, R):
    """Cancel positive common factors from both sides."""
    notes = []
    try:
        if L != 0 and R != 0 and not is_sym(L) and not is_sym(R):
            fL, fR = sp.factor(L), sp.factor(R)
            g = sp.gcd(fL, fR)
            if g not in (0, 1) and not g.is_number and g.is_positive:
                L, R = sp.simplify(fL / g, doit=False), sp.simplify(fR / g, doit=False)
                notes.append(r'\text{cancel } ' + tex(g) + r'\text{ from both sides}')
    except Exception:
        pass
    return L, R, notes

def simp(e):
    best, cost = e, sp.count_ops(e)
    for f in (lambda x: sp.simplify(x, doit=False), sp.factor, lambda x: sp.together(sp.expand(x)), sp.cancel):
        try:
            c = f(e)
            k = sp.count_ops(c)
            if k < cost:
                best, cost = c, k
        except Exception:
            pass
    return best

# ---------- LaTeX input ----------
# Turns LaTeX (typed, or from the visual equation maker) into the plain syntax parse_side reads.
# LaTeX convention: adjacent single letters multiply (mgh = m*g*h); \mathrm{KE} is one symbol.
GREEK = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu',
         'xi', 'omicron', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega',
         'Gamma', 'Delta', 'Theta', 'Lambda', 'Xi', 'Pi', 'Sigma', 'Upsilon', 'Phi', 'Psi', 'Omega']
GREEK_ALIAS = {'varepsilon': 'epsilon', 'vartheta': 'theta', 'varphi': 'phi', 'varrho': 'rho', 'varsigma': 'sigma',
               'varpi': 'pi', 'ell': 'l', 'hbar': 'hbar'}
LFUNCS = {'sin': 'sin', 'cos': 'cos', 'tan': 'tan', 'sec': 'sec', 'csc': 'csc', 'cot': 'cot',
          'arcsin': 'asin', 'arccos': 'acos', 'arctan': 'atan', 'sinh': 'sinh', 'cosh': 'cosh', 'tanh': 'tanh',
          'arcsinh': 'asinh', 'arccosh': 'acosh', 'arctanh': 'atanh', 'ln': 'ln', 'log': 'log', 'exp': 'exp', 'sgn': 'sign'}
INVERSE = {'sin': 'asin', 'cos': 'acos', 'tan': 'atan', 'sinh': 'asinh', 'cosh': 'acosh', 'tanh': 'atanh'}
SPACES = {',', ';', ':', '!', ' ', 'quad', 'qquad', 'displaystyle', 'textstyle', 'limits', 'nolimits', 'big', 'Big', 'bigg', 'Bigg'}
WRAPPERS = {'mathrm', 'text', 'mathit', 'textrm', 'textit', 'mathsf', 'operatorname', 'mathbf', 'boldsymbol', 'bm', 'vec',
            'hat', 'bar', 'overline', 'tilde', 'mathcal', 'mathbb', 'widehat', 'overrightarrow'}
STOPPERS = {None, '+', '-', '=', ')', '}', ']', '\\right', '|', ','}

class LatexError(ValueError):
    pass

def ltokens(s):
    out, i = [], 0
    while i < len(s):
        ch = s[i]
        if ch.isspace():
            i += 1
        elif ch == '\\':
            m = re.match(r'\\([A-Za-z]+|.)', s[i:])
            if not m:
                raise LatexError('a lone backslash')
            out.append('\\' + m.group(1))
            i += m.end()
        else:
            out.append(ch)
            i += 1
    return out

def is_var_tok(tok):
    return tok is not None and (len(tok) == 1 and tok.isalpha() or (tok.startswith('\\') and (tok[1:] in GREEK or tok[1:] in GREEK_ALIAS)))

def diff_mark(toks, i):
    """Length of a differential 'd' at toks[i] (d, \\mathrm{d}, \\text{d}, \\partial, \\operatorname{d}), else 0."""
    t = toks[i] if i < len(toks) else None
    if t == 'd' or t == '\\partial':
        return 1
    if t in ('\\mathrm', '\\text', '\\operatorname', '\\rm') and toks[i + 1:i + 4] == ['{', 'd', '}']:
        return 4
    return 0

class LatexReader:
    def __init__(self, s, toks=None):
        self.t = toks if toks is not None else [x for x in ltokens(s) if not (x.startswith('\\') and x[1:] in SPACES)]
        self.i = 0

    def sub(self, toks):
        return LatexReader(None, list(toks))

    def peek(self, k=0):
        j = self.i + k
        return self.t[j] if j < len(self.t) else None

    def take(self, want=None):
        tok = self.peek()
        if tok is None or (want is not None and tok != want):
            raise LatexError('expected ' + (want or 'more input') + (' but found ' + tok if tok else ''))
        self.i += 1
        return tok

    def raw_group(self):
        """Tokens of a {...} group (without the braces) or of a single token."""
        if self.peek() == '{':
            self.take('{')
            parts, depth = [], 0
            while True:
                tok = self.take()
                if tok == '{': depth += 1
                elif tok == '}':
                    if depth == 0: break
                    depth -= 1
                parts.append(tok)
            return parts
        return [self.take()]

    def name_from(self, parts, sub=False):
        txt = ''
        for p in parts:
            if p in ('{', '}'):
                continue
            if p == ',' and sub:
                txt += '_'
                continue
            if p.startswith('\\'):
                c = p[1:]
                if c in WRAPPERS or c in SPACES:
                    continue
                c = GREEK_ALIAS.get(c, c)
                if c in GREEK or c.isalpha():
                    txt += c
                continue
            if p.isalnum():
                txt += p
        return txt

    def arg(self):
        """A macro argument: {expr} or a single token (so \\frac12 works)."""
        if self.peek() == '{':
            self.take('{')
            e = self.expr(stop={'}'})
            self.take('}')
            return e
        tok = self.peek()
        if tok is not None and tok.isdigit():
            self.take()
            return tok
        return self.atom()

    def subscript(self, base):
        if self.peek() == '_':
            self.take('_')
            s = self.name_from(self.raw_group(), sub=True)
            if s:
                base = base + '_' + s
        return base

    def maybe_call(self, name):
        """x(t), v(0), F(x, y): a quantity written as a function of simple arguments."""
        if self.peek() not in ('(', '\\left'):
            return name
        save = self.i
        try:
            if self.take() == '\\left':
                self.take('(')
            args = []
            while True:
                tok = self.peek()
                if tok is not None and tok.isdigit():
                    num = ''
                    while self.peek() is not None and (self.peek().isdigit() or self.peek() == '.'):
                        num += self.take()
                    args.append(num)
                elif is_var_tok(tok):
                    self.take()
                    args.append(self.subscript(GREEK_ALIAS.get(tok[1:], tok[1:]) if tok.startswith('\\') else tok))
                else:
                    raise LatexError('not a call')
                nxt = self.take()
                if nxt == '\\right':
                    nxt = self.take()
                if nxt == ')':
                    break
                if nxt != ',':
                    raise LatexError('not a call')
            return name + '(' + ', '.join(args) + ')'
        except LatexError:
            self.i = save
            return name

    def expr(self, stop=()):
        out = []
        while self.peek() is not None and self.peek() not in stop:
            tok = self.peek()
            if tok in ('+', '-'):
                self.take()
                out.append(tok)
                continue
            if tok == '\\pm' or tok == '\\mp':
                raise LatexError('\\pm gives two equations; write them separately')
            out.append(self.term(stop))
        if not out:
            raise LatexError('an empty group')
        return '(' + ' '.join(out) + ')'

    def starts_factor(self, tok):
        if tok is None:
            return False
        if tok in ('(', '[', '{', '|') or tok.isalnum() or tok == '.':
            return True
        if tok.startswith('\\'):
            c = tok[1:]
            return c in ('frac', 'dfrac', 'tfrac', 'sqrt', 'left', 'pi', 'lbrace', '{', 'int', 'partial', 'dot', 'ddot', 'infty', 'hbar') \
                or c in LFUNCS or c in GREEK or c in GREEK_ALIAS or c in WRAPPERS
        return False

    def term(self, stop, in_func=False):
        out = [self.power()]
        while True:
            tok = self.peek()
            if tok is None or tok in stop:
                break
            if tok in ('*', '\\cdot', '\\times', '\\ast'):
                if in_func:
                    break
                self.take(); out.append('*'); out.append(self.power())
            elif tok in ('/', '\\div'):
                if in_func:
                    break
                self.take(); out.append('/'); out.append(self.power())
            elif self.starts_factor(tok):
                if in_func and tok.startswith('\\') and (tok[1:] in LFUNCS or tok[1:] == 'int'):
                    break  # \sin\theta\cos\theta is two factors
                out.append('*'); out.append(self.power())
            else:
                break
        return ' '.join(out)

    def power(self):
        base = self.atom()
        while self.peek() in ('^', "'"):
            if self.take() == "'":
                raise LatexError("primes are ambiguous here; write \\frac{dy}{dx} or \\dot{x} for derivatives")
            a = self.arg()
            base = (base if re.fullmatch(r'[A-Za-z][A-Za-z0-9_]*|[0-9.]+', base) else '(' + base + ')') + '^(' + a + ')'
        return base

    def derivative_frac(self, num, den):
        """\\frac{dx}{dt}, \\frac{d^2x}{dt^2}, \\frac{d}{dt}(...): returns diff(...) text, or None if not a derivative."""
        k = diff_mark(den, 0)
        if not k or not diff_mark(num, 0):
            return None
        rd = self.sub(den[k:])
        if not is_var_tok(rd.peek()):
            return None
        tok = rd.take()
        var = rd.subscript(GREEK_ALIAS.get(tok[1:], tok[1:]) if tok.startswith('\\') else tok)
        order = '1'
        if rd.peek() == '^':
            rd.take('^')
            order = rd.name_from(rd.raw_group())
        if rd.peek() is not None:
            return None
        rn = self.sub(num[diff_mark(num, 0):])
        if rn.peek() == '^':
            rn.take('^')
            order = rn.name_from(rn.raw_group()) or order
        if rn.peek() is None:
            inner = self.power()   # operator form: \frac{d}{dt}\left(...\right)
        else:
            inner = rn.expr()
        if not order.isdigit():
            raise LatexError('the order of a derivative must be a whole number')
        return 'diff(' + inner + ', ' + var + ('' if order == '1' else ', ' + order) + ')'

    def integral(self):
        lo = hi = None
        for _ in range(2):
            if self.peek() == '_':
                self.take('_'); lo = self.arg()
            elif self.peek() == '^':
                self.take('^'); hi = self.arg()
        # the integrand runs up to the first top-level differential "dx" that ends a term
        depth, j = 0, self.i
        found = None
        while j < len(self.t):
            tok = self.t[j]
            if tok in ('{', '(', '[', '\\left'):
                depth += 1
            elif tok in ('}', ')', ']', '\\right'):
                if depth == 0:
                    break
                depth -= 1
            elif depth == 0:
                k = diff_mark(self.t, j)
                if k and is_var_tok(self.t[j + k] if j + k < len(self.t) else None):
                    e = j + k + 1
                    if e < len(self.t) and self.t[e] == '_':
                        e += 1
                        if e < len(self.t) and self.t[e] == '{':
                            while e < len(self.t) and self.t[e] != '}':
                                e += 1
                        e += 1
                    if (self.t[e] if e < len(self.t) else None) in STOPPERS or (e < len(self.t) and self.t[e] in ('\\cdot', '\\int')):
                        found = (j, j + k, e)
                        break
            j += 1
        if not found:
            raise LatexError('an integral needs its differential, like \\int_0^d F\\,dx')
        body = [x for x in self.t[self.i:found[0]]]
        while body and body[-1] in ('\\cdot', '*', '\\times'):
            body.pop()
        integrand = self.sub(body).expr() if body else '1'
        rv = self.sub(self.t[found[1]:found[2]])
        tok = rv.take()
        var = rv.subscript(GREEK_ALIAS.get(tok[1:], tok[1:]) if tok.startswith('\\') else tok)
        self.i = found[2]
        if lo is None and hi is None:
            return 'int(' + integrand + ', ' + var + ')'
        if lo is None or hi is None:
            raise LatexError('a definite integral needs both limits')
        return 'int(' + integrand + ', ' + var + ', ' + lo + ', ' + hi + ')'

    def atom(self):
        tok = self.take()
        if tok.isdigit() or tok == '.':
            num = tok
            while self.peek() is not None and (self.peek().isdigit() or self.peek() == '.'):
                num += self.take()
            return num
        if tok.isalpha():
            return self.maybe_call(self.subscript(tok))
        if tok in ('(', '['):
            e = self.expr(stop={')' if tok == '(' else ']'})
            self.take(')' if tok == '(' else ']')
            return e
        if tok == '{':
            e = self.expr(stop={'}'})
            self.take('}')
            return e
        if tok == '|':
            e = self.expr(stop={'|'})
            self.take('|')
            return 'abs' + e
        if not tok.startswith('\\'):
            raise LatexError('unexpected "' + tok + '"')
        c = tok[1:]
        if c == 'left':
            open_ = self.take()
            e = self.expr(stop={'\\right'})
            self.take('\\right'); self.take()
            return ('abs' + e) if open_ == '|' else e
        if c in ('frac', 'dfrac', 'tfrac', 'cfrac'):
            num = self.raw_group(); den = self.raw_group()
            d = self.derivative_frac(num, den)
            if d:
                return d
            return '((' + self.sub(num).expr() + ')/(' + self.sub(den).expr() + '))'
        if c == 'sqrt':
            if self.peek() == '[':
                self.take('[')
                n = self.expr(stop={']'})
                self.take(']')
                return '((' + self.arg() + ')^(1/' + n + '))'
            return 'sqrt(' + self.arg() + ')'
        if c in ('dot', 'ddot'):
            inner = self.sub(self.raw_group()).atom()
            return 'diff(' + inner + ', ' + TIME + (', 2' if c == 'ddot' else '') + ')'
        if c == 'int':
            return self.integral()
        if c in LFUNCS:
            f = LFUNCS[c]
            powr = None
            if self.peek() == '^':
                self.take('^')
                powr = self.arg()
                if powr in ('(-1)', '(-(1))', '(- 1)') and c in INVERSE:
                    f, powr = INVERSE[c], None
            if self.peek() == '_' and c == 'log':
                self.take('_')
                b = self.arg()
                inner = self.func_arg()
                res = '(ln(' + inner + ')/ln(' + b + '))'
            else:
                res = f + '(' + self.func_arg() + ')'
            return '(' + res + ')^(' + powr + ')' if powr else res
        if c == 'pi':
            return 'pi'
        if c == 'infty':
            return 'oo'
        if c == 'hbar':
            return self.subscript('hbar')
        if c in ('sum', 'prod', 'lim', 'nabla', 'oint', 'iint'):
            raise LatexError('\\' + c + ' is not supported')
        if c == 'partial':
            raise LatexError('use \\partial inside a fraction, like \\frac{\\partial x}{\\partial t}')
        if c in GREEK or c in GREEK_ALIAS:
            name = GREEK_ALIAS.get(c, c)
            if name == 'Delta' and self.peek() == '{':
                inner = self.name_from(self.raw_group())
                if inner:
                    name = 'Delta' + inner
            elif name == 'Delta' and self.peek() is not None and (self.peek().isalpha() or (self.peek().startswith('\\') and self.peek()[1:] in GREEK)):
                nxt = self.take()
                name = 'Delta' + (nxt[1:] if nxt.startswith('\\') else nxt)
            return self.maybe_call(self.subscript(name))
        if c in WRAPPERS:
            name = self.name_from(self.raw_group())
            if not name:
                raise LatexError('an empty \\' + c)
            if name in LFUNCS and c in ('mathrm', 'operatorname'):
                return LFUNCS[name] + '(' + self.func_arg() + ')'
            if name in FUNCS and c in ('mathrm', 'operatorname'):
                return name + '(' + self.func_arg() + ')'
            if name == 'e' and self.peek() == '^':
                return 'e'
            return self.maybe_call(self.subscript(name))
        raise LatexError('\\' + c + ' is not supported')

    def func_arg(self):
        tok = self.peek()
        if tok in ('(', '\\left', '{'):
            return self.atom()
        return '(' + self.term(stop=(), in_func=True) + ')'

def latex_to_text(s):
    s = s.strip().strip('$').strip()
    s = re.sub(r'\\begin\{(equation|align|gather)\*?\}|\\end\{(equation|align|gather)\*?\}|\\label\{[^}]*\}|\\nonumber|\\notag|&|\\\\', ' ', s)
    s = s.strip().rstrip('.,;').strip()
    if s.count('=') != 1:
        raise LatexError('write exactly one = sign')
    a, b = s.split('=')
    return LatexReader(a).expr() + ' = ' + LatexReader(b).expr()

def looks_latex(text):
    return '\\' in text

# ---------- Operations called from the page ----------
def parse_eq(text, mode='auto'):
    text = text.strip()
    if not text:
        return {'ok': False, 'error': 'Type an equation, such as v = u + a*t.'}
    if mode == 'latex' or (mode == 'auto' and looks_latex(text)):
        try:
            text = latex_to_text(text)
        except LatexError as ex:
            return {'ok': False, 'error': 'Could not read the LaTeX: ' + str(ex) + '.'}
        except Exception as ex:
            return {'ok': False, 'error': 'Could not read the LaTeX (' + type(ex).__name__ + ').'}
    if text.count('=') != 1 or '==' in text:
        return {'ok': False, 'error': 'Write exactly one = sign, such as F = m*a.'}
    a, b = text.split('=')
    try:
        L, R = parse_side(a), parse_side(b)
    except Exception as ex:
        msg = str(ex).split('\n')[0]
        if isinstance(ex, (SyntaxError, TypeError)) or 'syntax' in msg or 'EOF' in msg or 'token' in msg:
            msg = 'check for a missing term or an unclosed bracket'
        return {'ok': False, 'error': 'Could not read that: ' + (msg or type(ex).__name__) + '. Use * for products and ^ for powers.'}
    if not (L.free_symbols | R.free_symbols | L.atoms(AppliedUndef) | R.atoms(AppliedUndef)):
        return {'ok': False, 'error': 'The equation has no variables.'}
    steps = []
    EL, ER = calc_eval(L), calc_eval(R)
    if (EL, ER) != (L, R):
        steps = [r'\text{as typed: } ' + eq_tex(L, R), r'\text{evaluate the derivatives and integrals}']
        L, R = (EL if is_sym(EL) else simp(EL)), simp(ER)
    return pack(L, R, steps=steps)

def inside_calc(e, t):
    """True if t sits inside an unevaluated derivative or integral (so it cannot simply be isolated)."""
    return any(n.has(t) for n in e.atoms(sp.Derivative, sp.Integral))

def solutions(L, R, s):
    try:
        sols = sp.solve(sp.Eq(L, R), s, dict=False)
    except NotImplementedError:
        sols = []
    except Exception:
        sols = []
    out = []
    for v in sols:
        if v.has(sp.I):
            continue
        if is_pos(s) and v.is_positive is False:  # positive quantities drop negative roots
            continue
        out.append(simp(v))
    # SymPy cannot always tell that e.g. sin(theta) > 0, so it may return a +/- pair; keep the + one
    if len(out) > 1 and is_pos(s):
        keep = []
        for v in out:
            twin = any(w is not v and sp.simplify(v + w) == 0 for w in out)
            if twin and v.could_extract_minus_sign():
                continue
            keep.append(v)
        out = keep or out
    return out

def solve_for(Ls, Rs, name):
    L, R = calc_eval(load(Ls)), calc_eval(load(Rs))
    s = target(L - R, name) or target(L, name) or target(R, name)
    if s is None:
        return {'ok': False, 'error': 'This equation has no ' + name + '.'}
    if L == s and not R.has(s):
        return {'ok': False, 'error': 'This equation is already solved for that variable.'}
    if inside_calc(L - R, s) and not (L == s or R == s):
        return {'ok': False, 'error': name + ' is inside a derivative or integral here, so it cannot be isolated by algebra. Link it to an expression instead.'}
    sols = solutions(L, R, s)
    if not sols:
        return {'ok': False, 'error': 'SymPy could not isolate ' + name + ' here (or no ' + ('positive ' if is_pos(s) else '') + 'solution exists).'}
    return {'ok': True, 'results': [pack(s, v, steps=[r'\text{rearrange for } ' + sym_tex(s)]) for v in sols]}

def put(e, name, value, params):
    """Replace the quantity called name in e by value. For x(t) := f(t), x(u) becomes f(u)."""
    for s in list(e.free_symbols):
        if isinstance(s, sp.Symbol) and s.name == name:
            for d in e.atoms(sp.Derivative):
                if any(v == s for v, _ in d.variable_count):
                    raise ValueError(name + ' is the variable of a derivative here, so it cannot be replaced')
            e = e.subs(s, value)
    def swap(a):
        if params and len(params) == len(a.args):
            return value.xreplace(dict(zip(params, a.args)))
        return value
    e = e.replace(lambda a: isinstance(a, AppliedUndef) and vname(a) == name, swap)
    return calc_eval(e)

def substitute(srcL, srcR, srcVar, dstL, dstR, dstVar, srcLab='(1)', dstLab='(2)'):
    """Solve the source equation for srcVar and put that expression in place of dstVar in the destination."""
    L1, R1 = calc_eval(load(srcL)), calc_eval(load(srcR))
    L2, R2 = load(dstL), load(dstR)
    a = target(L1 - R1, srcVar) or target(L1, srcVar) or target(R1, srcVar)
    b = target(L2 - R2, dstVar) or target(L2, dstVar) or target(R2, dstVar)
    if a is None:
        return {'ok': False, 'error': 'The first equation has no ' + srcVar + '.'}
    if b is None:
        return {'ok': False, 'error': 'The target equation has no ' + dstVar + '.'}
    if L1 == a and not R1.has(a):
        sols, steps0 = [R1], []
    elif R1 == a and not L1.has(a):
        sols, steps0 = [L1], []
    else:
        if inside_calc(L1 - R1, a):
            return {'ok': False, 'error': srcVar + ' is inside a derivative or integral in the first equation, so it cannot be isolated. Try the other direction.'}
        sols = solutions(L1, R1, a)
        steps0 = None
    if not sols:
        return {'ok': False, 'error': 'Could not solve the first equation for ' + srcVar + '.'}
    params = tuple(a.args) if isinstance(a, AppliedUndef) and all(isinstance(x, sp.Symbol) for x in a.args) else ()
    results = []
    for v in sols:
        steps = [] if steps0 == [] else [r'\text{rearrange ' + srcLab + r': } ' + sym_tex(a) + ' = ' + tex(v)]
        if srcVar != dstVar:
            steps.insert(0, name_tex(srcVar) + r' \equiv ' + name_tex(dstVar))
        steps.append(r'\text{put } ' + sym_tex(b) + ' = ' + tex(v) + r'\text{ into ' + dstLab + '}')
        try:
            NL, NR = put(L2, dstVar, v, params), put(R2, dstVar, v, params)
        except ValueError as ex:
            return {'ok': False, 'error': str(ex) + '.'}
        if has_calc(L2) or has_calc(R2):
            if not (has_calc(NL) or has_calc(NR)):
                steps.append(r'\text{evaluate the derivatives and integrals}')
        if not is_sym(NL):
            NL = simp(NL)
        NR = simp(NR)
        diff = simp(NL - NR)
        if diff == 0:
            return {'ok': False, 'error': 'Substituting gives 0 = 0: both equations say the same thing, so nothing new comes out.'}
        if diff.is_number:
            return {'ok': False, 'error': 'Substituting gives a contradiction (' + sp.latex(diff) + r' \ne 0).'}
        NL, NR, notes = tidy(NL, NR)
        if NL.is_number and not NR.is_number:
            NL, NR = NR, NL
        steps.extend(notes)
        results.append(pack(NL, NR, steps=steps))
    return {'ok': True, 'results': results}

def eval_calculus(Ls, Rs):
    """Evaluate every derivative and integral, treating any symbol not written in terms of the variable as constant."""
    L, R = load(Ls), load(Rs)
    NL, NR = calc_eval(L, force=True), calc_eval(R, force=True)
    if (NL, NR) == (L, R):
        return {'ok': False, 'error': 'Nothing to evaluate here.'}
    NL = NL if is_sym(NL) else simp(NL)
    NR = simp(NR)
    if simp(NL - NR) == 0:
        return {'ok': False, 'error': 'Treating them as constants makes this 0 = 0, so nothing is left.'}
    return {'ok': True, 'results': [pack(NL, NR, steps=[r'\text{treat quantities not written in terms of the variable as constants}'])]}

TRIG = (sp.sin, sp.cos, sp.tan, sp.sec, sp.csc, sp.cot)
ATRIG = (sp.asin, sp.acos, sp.atan)
def to_degrees(e):
    e = e.replace(lambda x: isinstance(x, TRIG), lambda x: x.func(x.args[0] * sp.pi / 180))
    return e.replace(lambda x: isinstance(x, ATRIG), lambda x: x * 180 / sp.pi)

DUMMY_TEX = {}
def opaque(e):
    """Stand-ins for things numbers cannot be put into directly: dx/dt (x unknown as a function) and x(t)."""
    rep = {}
    for d in sorted(e.atoms(sp.Derivative), key=sp.default_sort_key):
        z = sp.Dummy('d', real=True)
        DUMMY_TEX[z] = tex(d)
        rep[d] = z
    e = e.xreplace(rep)
    return e

def num(v):
    v = float(v)
    return sp.Integer(int(v)) if v == int(v) and abs(v) < 1e15 else sp.Float(v)

def evaluate(Ls, Rs, knowns_json, deg=False):
    L, R = load(Ls), load(Rs)
    if deg:
        L, R = to_degrees(L), to_degrees(R)
    kn = {k: num(v) for k, v in json.loads(knowns_json).items()}
    e = calc_eval(L - R)
    e = opaque(e)
    # quantities written as functions: x(t) takes the known value of x
    reps = {}
    for a in e.atoms(AppliedUndef):
        n = vname(a)
        if n in kn and all(isinstance(x, sp.Symbol) for x in a.args):
            reps[a] = kn[n]
        else:
            z = sp.Dummy(n, real=True)
            DUMMY_TEX[z] = sym_tex(a)
            reps[a] = z
    e = e.xreplace(reps)
    e = e.subs({sym(k): v for k, v in kn.items()})
    try:
        e = e.doit()
    except Exception:
        pass
    if e.has(sp.Integral):
        return {'ok': True, 'kind': 'note', 'text': 'This integral has no closed form here.'}
    free = sorted(e.free_symbols, key=lambda s: (isinstance(s, sp.Dummy), str(s)))
    def info(s):
        return {'name': None if isinstance(s, sp.Dummy) else s.name, 'tex': sym_tex(s)}
    if len(free) == 0:
        val = complex(sp.N(e))
        scale = max([abs(complex(sp.N(x))) for x in (L.subs({sym(k): v for k, v in kn.items()}),) if not x.free_symbols] + [1])
        ok = abs(val) < 1e-9 * (1 + scale)
        return {'ok': True, 'kind': 'check', 'consistent': bool(ok)}
    if len(free) > 1:
        return {'ok': True, 'kind': 'need', 'unknowns': [info(s) for s in free]}
    s = free[0]
    vals = []
    try:
        for v in sp.solve(e, s):
            c = complex(sp.N(v))
            if abs(c.imag) < 1e-12 * (1 + abs(c.real)) and (c.real > 0 or not is_pos(s)):
                vals.append(c.real)
    except Exception:
        pass
    if not vals:
        try:
            vals = [float(sp.nsolve(e, s, 1))]
            vals = [x for x in vals if x > 0 or not is_pos(s)]
        except Exception:
            vals = []
    d = info(s)
    d.update({'ok': True, 'kind': 'value', 'values': sorted(set(round(x, 12) for x in vals))})
    return d

def graph_fn(Ls, Rs, yname, xname, deg=False):
    """y as a JavaScript expression in x and the other quantities, for plotting in the page."""
    L, R = calc_eval(load(Ls)), calc_eval(load(Rs))
    if deg:
        L, R = to_degrees(L), to_degrees(R)
    e = L - R
    y = target(e, yname) or target(L, yname) or target(R, yname)
    if y is None:
        return {'ok': False, 'error': 'This equation has no ' + yname + '.'}
    if L == y and not R.has(y):
        sols = [R]
    elif inside_calc(e, y):
        return {'ok': False, 'error': yname + ' is inside a derivative or integral, so it cannot be plotted from this card.'}
    else:
        sols = solutions(L, R, y)
    if not sols:
        return {'ok': False, 'error': 'Could not get ' + yname + ' on its own to plot it.'}
    # plot in terms of plain symbols: x(t) -> x
    flat = {}
    for s in sols:
        for a in s.atoms(AppliedUndef):
            flat[a] = sym(vname(a))
    sols = [s.xreplace(flat) for s in sols]
    if any(has_calc(s) for s in sols):
        return {'ok': False, 'error': 'The result still contains a derivative or integral of an unknown quantity, so it cannot be plotted yet.'}
    names = set()
    for s in sols:
        names |= {x.name for x in s.free_symbols}
    names.add(xname)
    names.discard(yname)
    order = sorted(names, key=lambda n: (n != xname, n))
    js = {n: sp.Symbol('p' + str(i), real=True) for i, n in enumerate(order)}
    branches = []
    for s in sols:
        code = sp.jscode(s.xreplace({x: js[x.name] for x in s.free_symbols}))
        if 'Not supported' in code:
            return {'ok': False, 'error': 'This uses a function the plotter cannot draw.'}
        branches.append(code)
    return {'ok': True, 'branches': branches, 'branch_tex': [sym_tex(y) + ' = ' + tex(s) for s in sols],
            'params': [{'name': n, 'tex': name_tex(n), 'js': str(js[n]), 'pos': SIGNS.get(n, 'positive') == 'positive'} for n in order],
            'ytex': sym_tex(y) if not isinstance(y, AppliedUndef) else name_tex(yname), 'xtex': name_tex(xname)}

def api(fn, args_json):
    args = json.loads(args_json)
    try:
        return json.dumps(globals()[fn](*args))
    except Exception as ex:
        return json.dumps({'ok': False, 'error': 'Algebra error: ' + str(ex).split('\n')[0]})

def rename(Ls, Rs, old, new):
    """Rename a quantity in one equation only (for example Q -> Q_heat when two different Qs meet)."""
    new = re.sub(r'_\{([^}]*)\}', lambda m: '_' + re.sub(r'[^A-Za-z0-9_]', '', m.group(1).replace(',', '_')), new.strip())
    new = re.sub(r'\\', '', new)
    if not IDENT.fullmatch(new):
        return {'ok': False, 'error': 'Use letters, digits and _ only, like Q_heat or v_1.'}
    new = safe_name(new)
    L, R = load(Ls), load(Rs)
    def ren(e):
        e = e.xreplace({s: sym(new) for s in e.free_symbols if isinstance(s, sp.Symbol) and s.name == old})
        return e.replace(lambda a: isinstance(a, AppliedUndef) and vname(a) == old, lambda a: fun(new)(*a.args))
    NL, NR = ren(L), ren(R)
    if (NL, NR) == (L, R):
        return {'ok': False, 'error': 'This equation has no ' + old + '.'}
    return pack(NL, NR, name=new)
`;
