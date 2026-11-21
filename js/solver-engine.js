/* Physbook equation board: the SymPy engine, run in the browser by Pyodide. Kept as a string so the
   site still works from file:// (no fetch of a .py file). All symbols are positive physical quantities. */
window.PB.SOLVER_PY = String.raw`

import json, re, keyword
import sympy as sp
from sympy.parsing.sympy_parser import (parse_expr, standard_transformations,
    implicit_multiplication, convert_xor, function_exponentiation)

FUNCS = {
    'sin': sp.sin, 'cos': sp.cos, 'tan': sp.tan, 'sec': sp.sec, 'csc': sp.csc, 'cot': sp.cot,
    'asin': sp.asin, 'acos': sp.acos, 'atan': sp.atan, 'arcsin': sp.asin, 'arccos': sp.acos, 'arctan': sp.atan,
    'sinh': sp.sinh, 'cosh': sp.cosh, 'tanh': sp.tanh,
    'sqrt': sp.sqrt, 'cbrt': sp.cbrt, 'exp': sp.exp, 'ln': sp.log, 'log': sp.log, 'abs': sp.Abs,
}
CONSTS = {'pi': sp.pi}
TRANS = standard_transformations + (implicit_multiplication, convert_xor, function_exponentiation)
IDENT = re.compile(r'[A-Za-z][A-Za-z0-9_]*')
SYMS = {}
SIGNS = {}  # name -> 'real' for quantities that may be negative; everything else is positive

def sym(name):
    kind = SIGNS.get(name, 'positive')
    s = SYMS.get((name, kind))
    if s is None:
        s = sp.Symbol(name, real=True) if kind == 'real' else sp.Symbol(name, positive=True)
        SYMS[(name, kind)] = s
    return s

def is_pos(s):
    return SIGNS.get(s.name, 'positive') == 'positive'

def set_signs(signs_json):
    SIGNS.clear()
    SIGNS.update({k: v for k, v in json.loads(signs_json).items() if v == 'real'})
    return {'ok': True}

def safe_name(name):
    # names SymPy's parser or Python would misread; SymPy prints 'lamda' as \lambda
    if name == 'lambda': return 'lamda'
    if keyword.iskeyword(name): return name + '_'
    return name

def parse_side(text):
    text = text.replace('·', '*').replace('×', '*').replace('−', '-').replace('π', 'pi')
    out, local, i = [], {}, 0
    for m in IDENT.finditer(text):
        out.append(text[i:m.start()])
        name = m.group(0)
        rest = text[m.end():].lstrip()
        if name in FUNCS and rest.startswith('('):
            tok = name
            local[name] = FUNCS[name]
        elif name in CONSTS:
            tok = name
            local[name] = CONSTS[name]
        elif name == 'e' and (rest.startswith('^') or rest.startswith('**')):
            tok = 'E'
            local['E'] = sp.E
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

def merge_roots(e):
    """Display-only: sqrt(2)*sqrt(g)*sqrt(h) -> sqrt(2*g*h), sqrt(G)*sqrt(M)/sqrt(r) -> sqrt(G*M/r).
    Valid because every symbol is positive. Built unevaluated so SymPy does not split it again."""
    if not isinstance(e, sp.Basic) or e.is_Atom:
        return e
    if not e.is_Mul:
        return e.func(*[merge_roots(a) for a in e.args], evaluate=False) if e.args else e
    groups, rest = {}, []
    for f in e.args:
        f = merge_roots(f)
        if f.is_Pow and f.exp.is_Rational and not f.exp.is_Integer and f.base.is_positive:
            k = abs(f.exp)
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

def sym_tex(s):
    n = s.name
    if n.startswith('Delta') and len(n) > 5:
        return r'\Delta ' + sp.latex(sp.Symbol(n[5:].lstrip('_')))
    return sp.latex(s)

def names_for(e):
    return {s: sym_tex(s) for s in e.free_symbols if s.name.startswith('Delta') and len(s.name) > 5}

def tex(e):
    return sp.latex(nice(e), ln_notation=True, symbol_names=names_for(e))

def eq_tex(L, R):
    return tex(L) + ' = ' + tex(R)

def var_info(L, R):
    syms = sorted((L - R).free_symbols | L.free_symbols | R.free_symbols, key=lambda s: s.name)
    return [{'name': s.name, 'tex': sym_tex(s)} for s in syms]

def pack(L, R, **extra):
    d = {'ok': True, 'L': sp.srepr(L), 'R': sp.srepr(R), 'tex': eq_tex(L, R), 'vars': var_info(L, R)}
    d.update(extra)
    return d

NS = {k: getattr(sp, k) for k in dir(sp) if not k.startswith('_')}
def load(srepr):
    e = eval(srepr, NS)
    # re-apply the current sign settings to every symbol
    return e.xreplace({s: sym(s.name) for s in e.free_symbols if isinstance(s, sp.Symbol)})

def is_sym(e, s=None):
    return isinstance(e, sp.Symbol) and (s is None or e == s)

def tidy(L, R):
    """Cancel positive common factors from both sides, and drop sides that are zero."""
    notes = []
    try:
        if L != 0 and R != 0 and not is_sym(L) and not is_sym(R):
            fL, fR = sp.factor(L), sp.factor(R)
            g = sp.gcd(fL, fR)
            if g not in (0, 1) and not g.is_number and g.is_positive:
                L, R = sp.simplify(fL / g), sp.simplify(fR / g)
                notes.append(r'\text{cancel } ' + tex(g) + r'\text{ from both sides}')
            elif g.is_number and g not in (0, 1):
                pass
    except Exception:
        pass
    return L, R, notes

def simp(e):
    best, cost = e, sp.count_ops(e)
    for f in (sp.simplify, sp.factor, lambda x: sp.together(sp.expand(x)), sp.cancel):
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
          'ln': 'ln', 'log': 'log', 'exp': 'exp'}
INVERSE = {'sin': 'asin', 'cos': 'acos', 'tan': 'atan'}
SPACES = {',', ';', ':', '!', ' ', 'quad', 'qquad', 'displaystyle', 'textstyle', 'limits', 'nolimits', 'big', 'Big', 'bigg', 'Bigg'}
WRAPPERS = {'mathrm', 'text', 'mathit', 'textrm', 'textit', 'mathsf', 'operatorname', 'mathbf', 'boldsymbol', 'bm', 'vec',
            'hat', 'bar', 'overline', 'tilde', 'mathcal', 'mathbb', 'dot', 'ddot', 'widehat', 'overrightarrow'}

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

class LatexReader:
    def __init__(self, s):
        self.t = [x for x in ltokens(s) if not (x.startswith('\\') and x[1:] in SPACES)]
        self.i = 0

    def peek(self, k=0):
        j = self.i + k
        return self.t[j] if j < len(self.t) else None

    def take(self, want=None):
        tok = self.peek()
        if tok is None or (want is not None and tok != want):
            raise LatexError('expected ' + (want or 'more input') + (' but found ' + tok if tok else ''))
        self.i += 1
        return tok

    def group_text(self):
        """Raw text of a {...} group or a single token (for subscripts and \\mathrm names)."""
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

    def name_from(self, parts):
        txt = ''
        for p in parts:
            if p in ('{', '}'):
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
            sub = self.name_from(self.group_text())
            if sub:
                base = base + '_' + sub
        return base

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
            return c in ('frac', 'dfrac', 'tfrac', 'sqrt', 'left', 'pi', 'lbrace', '{') or c in LFUNCS or c in GREEK \
                or c in GREEK_ALIAS or c in WRAPPERS or c == 'mathrm'
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
                if in_func and tok.startswith('\\') and tok[1:] in LFUNCS:
                    break  # \sin\theta\cos\theta is two factors
                out.append('*'); out.append(self.power())
            else:
                break
        return ' '.join(out)

    def power(self):
        base = self.atom()
        while self.peek() in ('^', "'"):
            if self.take() == "'":
                raise LatexError('primes (derivatives) are not supported')
            a = self.arg()
            base = (base if re.fullmatch(r'[A-Za-z][A-Za-z0-9_]*|[0-9.]+', base) else '(' + base + ')') + '^(' + a + ')'
        return base

    def atom(self):
        tok = self.take()
        if tok.isdigit() or tok == '.':
            num = tok
            while self.peek() is not None and (self.peek().isdigit() or self.peek() == '.'):
                num += self.take()
            return num
        if tok.isalpha():
            return self.subscript(tok)
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
            close = {'(': ')', '[': ']', '|': '|', '\\{': '\\}', '\\lbrace': '\\rbrace', '.': None}.get(open_)
            e = self.expr(stop={'\\right'})
            self.take('\\right'); self.take()
            return ('abs' + e) if open_ == '|' else e
        if c in ('frac', 'dfrac', 'tfrac', 'cfrac'):
            a = self.arg(); b = self.arg()
            return '((' + a + ')/(' + b + '))'
        if c == 'sqrt':
            if self.peek() == '[':
                self.take('[')
                n = self.expr(stop={']'})
                self.take(']')
                return '((' + self.arg() + ')^(1/' + n + '))'
            return 'sqrt(' + self.arg() + ')'
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
        if c in ('infty', 'sum', 'int', 'prod', 'lim', 'partial', 'nabla'):
            raise LatexError('\\' + c + ' is not supported (only algebraic equations)')
        if c in GREEK or c in GREEK_ALIAS:
            name = GREEK_ALIAS.get(c, c)
            if name == 'Delta' and self.peek() is not None and (self.peek().isalpha() or (self.peek().startswith('\\') and self.peek()[1:] in GREEK)):
                nxt = self.take()
                name = 'Delta' + (nxt[1:] if nxt.startswith('\\') else nxt)
            return self.subscript(name)
        if c in WRAPPERS:
            name = self.name_from(self.group_text())
            if not name:
                raise LatexError('an empty \\' + c)
            if name in LFUNCS and c in ('mathrm', 'operatorname'):
                return LFUNCS[name] + '(' + self.func_arg() + ')'
            if name == 'e' and self.peek() == '^':
                return 'e'
            return self.subscript(name)
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
    return '\\' in text or '{' in text

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
    if not (L.free_symbols | R.free_symbols):
        return {'ok': False, 'error': 'The equation has no variables.'}
    return pack(L, R)

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
    L, R = load(Ls), load(Rs)
    s = sym(name)
    if is_sym(L, s) and s not in R.free_symbols:
        return {'ok': False, 'error': 'This equation is already solved for that variable.'}
    sols = solutions(L, R, s)
    if not sols:
        return {'ok': False, 'error': 'SymPy could not isolate ' + name + ' here (or no positive solution exists).'}
    return {'ok': True, 'results': [pack(s, v, steps=[r'\text{rearrange for } ' + sym_tex(s)]) for v in sols]}

def substitute(srcL, srcR, srcVar, dstL, dstR, dstVar, srcLab='(1)', dstLab='(2)'):
    """Solve the source equation for srcVar and put that expression in place of dstVar in the destination."""
    L1, R1, L2, R2 = load(srcL), load(srcR), load(dstL), load(dstR)
    a, b = sym(srcVar), sym(dstVar)
    if b not in (L2.free_symbols | R2.free_symbols):
        return {'ok': False, 'error': 'The target equation has no ' + dstVar + '.'}
    if is_sym(L1, a) and a not in R1.free_symbols:
        sols, steps0 = [R1], []
    elif is_sym(R1, a) and a not in L1.free_symbols:
        sols, steps0 = [L1], []
    else:
        sols = solutions(L1, R1, a)
        steps0 = None
    if not sols:
        return {'ok': False, 'error': 'Could not solve the first equation for ' + srcVar + '.'}
    results = []
    for v in sols:
        steps = [] if steps0 == [] else [r'\text{rearrange ' + srcLab + r': } ' + sym_tex(a) + ' = ' + tex(v)]
        if a != b:
            steps.insert(0, sym_tex(a) + r' \equiv ' + sym_tex(b))
        steps.append(r'\text{put } ' + sym_tex(b) + ' = ' + tex(v) + r'\text{ into ' + dstLab + '}')
        NL, NR = L2.subs(b, v), R2.subs(b, v)
        # keep a lone symbol on the left if the destination had one
        if not is_sym(NL):
            NL = simp(NL)
        NR = simp(NR)
        diff = simp(NL - NR)
        if diff == 0:
            return {'ok': False, 'error': 'Substituting gives 0 = 0: both equations say the same thing, so nothing new comes out.'}
        if diff.is_number:
            return {'ok': False, 'error': 'Substituting gives a contradiction (' + sp.latex(diff) + r' \ne 0).'}
        NL, NR, notes = tidy(NL, NR)
        # if a side lost everything symbolic, put the unknown side on the left
        if NL.is_number and not NR.is_number:
            NL, NR = NR, NL
        steps.extend(notes)
        results.append(pack(NL, NR, steps=steps))
    return {'ok': True, 'results': results}

TRIG = (sp.sin, sp.cos, sp.tan, sp.sec, sp.csc, sp.cot)
ATRIG = (sp.asin, sp.acos, sp.atan)
def to_degrees(e):
    e = e.replace(lambda x: isinstance(x, TRIG), lambda x: x.func(x.args[0] * sp.pi / 180))
    return e.replace(lambda x: isinstance(x, ATRIG), lambda x: x * 180 / sp.pi)

def evaluate(Ls, Rs, knowns_json, deg=False):
    L, R = load(Ls), load(Rs)
    if deg:
        L, R = to_degrees(L), to_degrees(R)
    kn = json.loads(knowns_json)
    subs = {}
    for k, v in kn.items():
        try:
            subs[sym(k)] = sp.nsimplify(float(v), rational=True) if float(v) == int(float(v)) else sp.Float(v)
        except Exception:
            pass
    expr = (L - R).subs(subs)
    free = sorted(expr.free_symbols, key=lambda s: s.name)
    if len(free) == 0:
        val = complex(sp.N(expr))
        ok = abs(val) < 1e-9 * (1 + max(abs(complex(sp.N(L.subs(subs)))), 1))
        return {'ok': True, 'kind': 'check', 'consistent': bool(ok)}
    if len(free) > 1:
        return {'ok': True, 'kind': 'need', 'unknowns': [{'name': s.name, 'tex': sym_tex(s)} for s in free]}
    s = free[0]
    vals = []
    try:
        for v in sp.solve(expr, s):
            c = complex(sp.N(v))
            if abs(c.imag) < 1e-12 * (1 + abs(c.real)) and (c.real > 0 or not is_pos(s)):
                vals.append(c.real)
    except Exception:
        pass
    if not vals:
        try:
            vals = [float(sp.nsolve(expr, s, 1))]
            vals = [x for x in vals if x > 0 or not is_pos(s)]
        except Exception:
            vals = []
    return {'ok': True, 'kind': 'value', 'name': s.name, 'tex': sym_tex(s), 'values': sorted(set(round(x, 12) for x in vals))}

def api(fn, args_json):
    args = json.loads(args_json)
    try:
        return json.dumps(globals()[fn](*args))
    except Exception as ex:
        return json.dumps({'ok': False, 'error': 'Algebra error: ' + str(ex).split('\n')[0]})
`;
