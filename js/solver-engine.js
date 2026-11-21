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

def sym(name):
    s = SYMS.get(name)
    if s is None:
        s = sp.Symbol(name, positive=True)
        SYMS[name] = s
    return s

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
        if f.is_Pow and f.exp.is_Rational and not f.exp.is_Integer:
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
    return eval(srepr, NS)

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

def parse_eq(text):
    text = text.strip()
    if not text:
        return {'ok': False, 'error': 'Type an equation, such as v = u + a*t.'}
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
        if v.is_positive is False:  # quantities are taken as positive
            continue
        out.append(simp(v))
    # SymPy cannot always tell that e.g. sin(theta) > 0, so it may return a +/- pair; keep the + one
    if len(out) > 1:
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
            if abs(c.imag) < 1e-12 * (1 + abs(c.real)) and c.real > 0:
                vals.append(c.real)
    except Exception:
        pass
    if not vals:
        try:
            vals = [float(sp.nsolve(expr, s, 1))]
            vals = [x for x in vals if x > 0]
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
