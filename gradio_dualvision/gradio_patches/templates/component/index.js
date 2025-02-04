var eo = { value: () => {
} };
function Il() {
  for (var e = 0, t = arguments.length, n = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in n || /[\s.]/.test(i))
      throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new gn(n);
}
function gn(e) {
  this._ = e;
}
function to(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var i = "", r = n.indexOf(".");
    if (r >= 0 && (i = n.slice(r + 1), n = n.slice(0, r)), n && !t.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
gn.prototype = Il.prototype = {
  constructor: gn,
  on: function(e, t) {
    var n = this._, i = to(e + "", n), r, l = -1, s = i.length;
    if (arguments.length < 2) {
      for (; ++l < s; )
        if ((r = (e = i[l]).type) && (r = no(n[r], e.name)))
          return r;
      return;
    }
    if (t != null && typeof t != "function")
      throw new Error("invalid callback: " + t);
    for (; ++l < s; )
      if (r = (e = i[l]).type)
        n[r] = ar(n[r], e.name, t);
      else if (t == null)
        for (r in n)
          n[r] = ar(n[r], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t)
      e[n] = t[n].slice();
    return new gn(e);
  },
  call: function(e, t) {
    if ((r = arguments.length - 2) > 0)
      for (var n = new Array(r), i = 0, r, l; i < r; ++i)
        n[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    for (l = this._[e], i = 0, r = l.length; i < r; ++i)
      l[i].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    for (var i = this._[e], r = 0, l = i.length; r < l; ++r)
      i[r].value.apply(t, n);
  }
};
function no(e, t) {
  for (var n = 0, i = e.length, r; n < i; ++n)
    if ((r = e[n]).name === t)
      return r.value;
}
function ar(e, t, n) {
  for (var i = 0, r = e.length; i < r; ++i)
    if (e[i].name === t) {
      e[i] = eo, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var ki = "http://www.w3.org/1999/xhtml";
const ur = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ki,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ll(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), ur.hasOwnProperty(t) ? { space: ur[t], local: e } : e;
}
function io(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === ki && t.documentElement.namespaceURI === ki ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function ro(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Ol(e) {
  var t = Ll(e);
  return (t.local ? ro : io)(t);
}
function lo() {
}
function Ml(e) {
  return e == null ? lo : function() {
    return this.querySelector(e);
  };
}
function so(e) {
  typeof e != "function" && (e = Ml(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var l = t[r], s = l.length, a = i[r] = new Array(s), o, u, f = 0; f < s; ++f)
      (o = l[f]) && (u = e.call(o, o.__data__, f, l)) && ("__data__" in o && (u.__data__ = o.__data__), a[f] = u);
  return new be(i, this._parents);
}
function oo(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function ao() {
  return [];
}
function uo(e) {
  return e == null ? ao : function() {
    return this.querySelectorAll(e);
  };
}
function fo(e) {
  return function() {
    return oo(e.apply(this, arguments));
  };
}
function co(e) {
  typeof e == "function" ? e = fo(e) : e = uo(e);
  for (var t = this._groups, n = t.length, i = [], r = [], l = 0; l < n; ++l)
    for (var s = t[l], a = s.length, o, u = 0; u < a; ++u)
      (o = s[u]) && (i.push(e.call(o, o.__data__, u, s)), r.push(o));
  return new be(i, r);
}
function _o(e) {
  return function() {
    return this.matches(e);
  };
}
function Rl(e) {
  return function(t) {
    return t.matches(e);
  };
}
var ho = Array.prototype.find;
function mo(e) {
  return function() {
    return ho.call(this.children, e);
  };
}
function go() {
  return this.firstElementChild;
}
function po(e) {
  return this.select(e == null ? go : mo(typeof e == "function" ? e : Rl(e)));
}
var bo = Array.prototype.filter;
function wo() {
  return Array.from(this.children);
}
function vo(e) {
  return function() {
    return bo.call(this.children, e);
  };
}
function yo(e) {
  return this.selectAll(e == null ? wo : vo(typeof e == "function" ? e : Rl(e)));
}
function Eo(e) {
  typeof e != "function" && (e = _o(e));
  for (var t = this._groups, n = t.length, i = new Array(n), r = 0; r < n; ++r)
    for (var l = t[r], s = l.length, a = i[r] = [], o, u = 0; u < s; ++u)
      (o = l[u]) && e.call(o, o.__data__, u, l) && a.push(o);
  return new be(i, this._parents);
}
function Dl(e) {
  return new Array(e.length);
}
function So() {
  return new be(this._enter || this._groups.map(Dl), this._parents);
}
function En(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
En.prototype = {
  constructor: En,
  appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function(e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function(e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  }
};
function ko(e) {
  return function() {
    return e;
  };
}
function Ao(e, t, n, i, r, l) {
  for (var s = 0, a, o = t.length, u = l.length; s < u; ++s)
    (a = t[s]) ? (a.__data__ = l[s], i[s] = a) : n[s] = new En(e, l[s]);
  for (; s < o; ++s)
    (a = t[s]) && (r[s] = a);
}
function To(e, t, n, i, r, l, s) {
  var a, o, u = /* @__PURE__ */ new Map(), f = t.length, c = l.length, _ = new Array(f), h;
  for (a = 0; a < f; ++a)
    (o = t[a]) && (_[a] = h = s.call(o, o.__data__, a, t) + "", u.has(h) ? r[a] = o : u.set(h, o));
  for (a = 0; a < c; ++a)
    h = s.call(e, l[a], a, l) + "", (o = u.get(h)) ? (i[a] = o, o.__data__ = l[a], u.delete(h)) : n[a] = new En(e, l[a]);
  for (a = 0; a < f; ++a)
    (o = t[a]) && u.get(_[a]) === o && (r[a] = o);
}
function Bo(e) {
  return e.__data__;
}
function Co(e, t) {
  if (!arguments.length)
    return Array.from(this, Bo);
  var n = t ? To : Ao, i = this._parents, r = this._groups;
  typeof e != "function" && (e = ko(e));
  for (var l = r.length, s = new Array(l), a = new Array(l), o = new Array(l), u = 0; u < l; ++u) {
    var f = i[u], c = r[u], _ = c.length, h = No(e.call(f, f && f.__data__, u, i)), g = h.length, y = a[u] = new Array(g), v = s[u] = new Array(g), p = o[u] = new Array(_);
    n(f, c, y, v, p, h, t);
    for (var w = 0, b = 0, d, m; w < g; ++w)
      if (d = y[w]) {
        for (w >= b && (b = w + 1); !(m = v[b]) && ++b < g; )
          ;
        d._next = m || null;
      }
  }
  return s = new be(s, i), s._enter = a, s._exit = o, s;
}
function No(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Po() {
  return new be(this._exit || this._groups.map(Dl), this._parents);
}
function Ho(e, t, n) {
  var i = this.enter(), r = this, l = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (r = t(r), r && (r = r.selection())), n == null ? l.remove() : n(l), i && r ? i.merge(r).order() : r;
}
function Io(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, r = n.length, l = i.length, s = Math.min(r, l), a = new Array(r), o = 0; o < s; ++o)
    for (var u = n[o], f = i[o], c = u.length, _ = a[o] = new Array(c), h, g = 0; g < c; ++g)
      (h = u[g] || f[g]) && (_[g] = h);
  for (; o < r; ++o)
    a[o] = n[o];
  return new be(a, this._parents);
}
function Lo() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var i = e[t], r = i.length - 1, l = i[r], s; --r >= 0; )
      (s = i[r]) && (l && s.compareDocumentPosition(l) ^ 4 && l.parentNode.insertBefore(s, l), l = s);
  return this;
}
function Oo(e) {
  e || (e = Mo);
  function t(c, _) {
    return c && _ ? e(c.__data__, _.__data__) : !c - !_;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), l = 0; l < i; ++l) {
    for (var s = n[l], a = s.length, o = r[l] = new Array(a), u, f = 0; f < a; ++f)
      (u = s[f]) && (o[f] = u);
    o.sort(t);
  }
  return new be(r, this._parents).order();
}
function Mo(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ro() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Do() {
  return Array.from(this);
}
function Uo() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], r = 0, l = i.length; r < l; ++r) {
      var s = i[r];
      if (s)
        return s;
    }
  return null;
}
function Fo() {
  let e = 0;
  for (const t of this)
    ++e;
  return e;
}
function Go() {
  return !this.node();
}
function qo(e) {
  for (var t = this._groups, n = 0, i = t.length; n < i; ++n)
    for (var r = t[n], l = 0, s = r.length, a; l < s; ++l)
      (a = r[l]) && e.call(a, a.__data__, l, r);
  return this;
}
function zo(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Vo(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function jo(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Xo(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Wo(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function xo(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function Zo(e, t) {
  var n = Ll(e);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((t == null ? n.local ? Vo : zo : typeof t == "function" ? n.local ? xo : Wo : n.local ? Xo : jo)(n, t));
}
function Ul(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Jo(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Yo(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function Qo(e, t, n) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, n);
  };
}
function Ko(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? Jo : typeof t == "function" ? Qo : Yo)(e, t, n ?? "")) : $o(this.node(), e);
}
function $o(e, t) {
  return e.style.getPropertyValue(t) || Ul(e).getComputedStyle(e, null).getPropertyValue(t);
}
function ea(e) {
  return function() {
    delete this[e];
  };
}
function ta(e, t) {
  return function() {
    this[e] = t;
  };
}
function na(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function ia(e, t) {
  return arguments.length > 1 ? this.each((t == null ? ea : typeof t == "function" ? na : ta)(e, t)) : this.node()[e];
}
function Fl(e) {
  return e.trim().split(/^|\s+/);
}
function xi(e) {
  return e.classList || new Gl(e);
}
function Gl(e) {
  this._node = e, this._names = Fl(e.getAttribute("class") || "");
}
Gl.prototype = {
  add: function(e) {
    var t = this._names.indexOf(e);
    t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(e) {
    var t = this._names.indexOf(e);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(e) {
    return this._names.indexOf(e) >= 0;
  }
};
function ql(e, t) {
  for (var n = xi(e), i = -1, r = t.length; ++i < r; )
    n.add(t[i]);
}
function zl(e, t) {
  for (var n = xi(e), i = -1, r = t.length; ++i < r; )
    n.remove(t[i]);
}
function ra(e) {
  return function() {
    ql(this, e);
  };
}
function la(e) {
  return function() {
    zl(this, e);
  };
}
function sa(e, t) {
  return function() {
    (t.apply(this, arguments) ? ql : zl)(this, e);
  };
}
function oa(e, t) {
  var n = Fl(e + "");
  if (arguments.length < 2) {
    for (var i = xi(this.node()), r = -1, l = n.length; ++r < l; )
      if (!i.contains(n[r]))
        return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? sa : t ? ra : la)(n, t));
}
function aa() {
  this.textContent = "";
}
function ua(e) {
  return function() {
    this.textContent = e;
  };
}
function fa(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function ca(e) {
  return arguments.length ? this.each(e == null ? aa : (typeof e == "function" ? fa : ua)(e)) : this.node().textContent;
}
function _a() {
  this.innerHTML = "";
}
function ha(e) {
  return function() {
    this.innerHTML = e;
  };
}
function da(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function ma(e) {
  return arguments.length ? this.each(e == null ? _a : (typeof e == "function" ? da : ha)(e)) : this.node().innerHTML;
}
function ga() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function pa() {
  return this.each(ga);
}
function ba() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function wa() {
  return this.each(ba);
}
function va(e) {
  var t = typeof e == "function" ? e : Ol(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function ya() {
  return null;
}
function Ea(e, t) {
  var n = typeof e == "function" ? e : Ol(e), i = t == null ? ya : typeof t == "function" ? t : Ml(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Sa() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function ka() {
  return this.each(Sa);
}
function Aa() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ta() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ba(e) {
  return this.select(e ? Ta : Aa);
}
function Ca(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Na(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Pa(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", i = t.indexOf(".");
    return i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: n };
  });
}
function Ha(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, i = -1, r = t.length, l; n < r; ++n)
        l = t[n], (!e.type || l.type === e.type) && l.name === e.name ? this.removeEventListener(l.type, l.listener, l.options) : t[++i] = l;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function Ia(e, t, n) {
  return function() {
    var i = this.__on, r, l = Na(t);
    if (i) {
      for (var s = 0, a = i.length; s < a; ++s)
        if ((r = i[s]).type === e.type && r.name === e.name) {
          this.removeEventListener(r.type, r.listener, r.options), this.addEventListener(r.type, r.listener = l, r.options = n), r.value = t;
          return;
        }
    }
    this.addEventListener(e.type, l, n), r = { type: e.type, name: e.name, value: t, listener: l, options: n }, i ? i.push(r) : this.__on = [r];
  };
}
function La(e, t, n) {
  var i = Pa(e + ""), r, l = i.length, s;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var o = 0, u = a.length, f; o < u; ++o)
        for (r = 0, f = a[o]; r < l; ++r)
          if ((s = i[r]).type === f.type && s.name === f.name)
            return f.value;
    }
    return;
  }
  for (a = t ? Ia : Ha, r = 0; r < l; ++r)
    this.each(a(i[r], t, n));
  return this;
}
function Vl(e, t, n) {
  var i = Ul(e), r = i.CustomEvent;
  typeof r == "function" ? r = new r(t, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(t, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(t, !1, !1)), e.dispatchEvent(r);
}
function Oa(e, t) {
  return function() {
    return Vl(this, e, t);
  };
}
function Ma(e, t) {
  return function() {
    return Vl(this, e, t.apply(this, arguments));
  };
}
function Ra(e, t) {
  return this.each((typeof t == "function" ? Ma : Oa)(e, t));
}
function* Da() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], r = 0, l = i.length, s; r < l; ++r)
      (s = i[r]) && (yield s);
}
var Ua = [null];
function be(e, t) {
  this._groups = e, this._parents = t;
}
function Fa() {
  return this;
}
be.prototype = {
  constructor: be,
  select: so,
  selectAll: co,
  selectChild: po,
  selectChildren: yo,
  filter: Eo,
  data: Co,
  enter: So,
  exit: Po,
  join: Ho,
  merge: Io,
  selection: Fa,
  order: Lo,
  sort: Oo,
  call: Ro,
  nodes: Do,
  node: Uo,
  size: Fo,
  empty: Go,
  each: qo,
  attr: Zo,
  style: Ko,
  property: ia,
  classed: oa,
  text: ca,
  html: ma,
  raise: pa,
  lower: wa,
  append: va,
  insert: Ea,
  remove: ka,
  clone: Ba,
  datum: Ca,
  on: La,
  dispatch: Ra,
  [Symbol.iterator]: Da
};
function qt(e) {
  return typeof e == "string" ? new be([[document.querySelector(e)]], [document.documentElement]) : new be([[e]], Ua);
}
function Ga(e) {
  let t;
  for (; t = e.sourceEvent; )
    e = t;
  return e;
}
function fr(e, t) {
  if (e = Ga(e), t === void 0 && (t = e.currentTarget), t) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var i = n.createSVGPoint();
      return i.x = e.clientX, i.y = e.clientY, i = i.matrixTransform(t.getScreenCTM().inverse()), [i.x, i.y];
    }
    if (t.getBoundingClientRect) {
      var r = t.getBoundingClientRect();
      return [e.clientX - r.left - t.clientLeft, e.clientY - r.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
const qa = { passive: !1 }, zt = { capture: !0, passive: !1 };
function Kn(e) {
  e.stopImmediatePropagation();
}
function wt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function za(e) {
  var t = e.document.documentElement, n = qt(e).on("dragstart.drag", wt, zt);
  "onselectstart" in t ? n.on("selectstart.drag", wt, zt) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Va(e, t) {
  var n = e.document.documentElement, i = qt(e).on("dragstart.drag", null);
  t && (i.on("click.drag", wt, zt), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const en = (e) => () => e;
function Ai(e, {
  sourceEvent: t,
  subject: n,
  target: i,
  identifier: r,
  active: l,
  x: s,
  y: a,
  dx: o,
  dy: u,
  dispatch: f
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: i, enumerable: !0, configurable: !0 },
    identifier: { value: r, enumerable: !0, configurable: !0 },
    active: { value: l, enumerable: !0, configurable: !0 },
    x: { value: s, enumerable: !0, configurable: !0 },
    y: { value: a, enumerable: !0, configurable: !0 },
    dx: { value: o, enumerable: !0, configurable: !0 },
    dy: { value: u, enumerable: !0, configurable: !0 },
    _: { value: f }
  });
}
Ai.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function ja(e) {
  return !e.ctrlKey && !e.button;
}
function Xa() {
  return this.parentNode;
}
function Wa(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function xa() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Za() {
  var e = ja, t = Xa, n = Wa, i = xa, r = {}, l = Il("start", "drag", "end"), s = 0, a, o, u, f, c = 0;
  function _(d) {
    d.on("mousedown.drag", h).filter(i).on("touchstart.drag", v).on("touchmove.drag", p, qa).on("touchend.drag touchcancel.drag", w).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(d, m) {
    if (!(f || !e.call(this, d, m))) {
      var B = b(this, t.call(this, d, m), d, m, "mouse");
      B && (qt(d.view).on("mousemove.drag", g, zt).on("mouseup.drag", y, zt), za(d.view), Kn(d), u = !1, a = d.clientX, o = d.clientY, B("start", d));
    }
  }
  function g(d) {
    if (wt(d), !u) {
      var m = d.clientX - a, B = d.clientY - o;
      u = m * m + B * B > c;
    }
    r.mouse("drag", d);
  }
  function y(d) {
    qt(d.view).on("mousemove.drag mouseup.drag", null), Va(d.view, u), wt(d), r.mouse("end", d);
  }
  function v(d, m) {
    if (e.call(this, d, m)) {
      var B = d.changedTouches, P = t.call(this, d, m), L = B.length, U, F;
      for (U = 0; U < L; ++U)
        (F = b(this, P, d, m, B[U].identifier, B[U])) && (Kn(d), F("start", d, B[U]));
    }
  }
  function p(d) {
    var m = d.changedTouches, B = m.length, P, L;
    for (P = 0; P < B; ++P)
      (L = r[m[P].identifier]) && (wt(d), L("drag", d, m[P]));
  }
  function w(d) {
    var m = d.changedTouches, B = m.length, P, L;
    for (f && clearTimeout(f), f = setTimeout(function() {
      f = null;
    }, 500), P = 0; P < B; ++P)
      (L = r[m[P].identifier]) && (Kn(d), L("end", d, m[P]));
  }
  function b(d, m, B, P, L, U) {
    var F = l.copy(), T = fr(U || B, m), ee, A, C;
    if ((C = n.call(d, new Ai("beforestart", {
      sourceEvent: B,
      target: _,
      identifier: L,
      active: s,
      x: T[0],
      y: T[1],
      dx: 0,
      dy: 0,
      dispatch: F
    }), P)) != null)
      return ee = C.x - T[0] || 0, A = C.y - T[1] || 0, function k(K, V, N) {
        var X = T, S;
        switch (K) {
          case "start":
            r[L] = k, S = s++;
            break;
          case "end":
            delete r[L], --s;
          case "drag":
            T = fr(N || V, m), S = s;
            break;
        }
        F.call(
          K,
          d,
          new Ai(K, {
            sourceEvent: V,
            subject: C,
            target: _,
            identifier: L,
            active: S,
            x: T[0] + ee,
            y: T[1] + A,
            dx: T[0] - X[0],
            dy: T[1] - X[1],
            dispatch: F
          }),
          P
        );
      };
  }
  return _.filter = function(d) {
    return arguments.length ? (e = typeof d == "function" ? d : en(!!d), _) : e;
  }, _.container = function(d) {
    return arguments.length ? (t = typeof d == "function" ? d : en(d), _) : t;
  }, _.subject = function(d) {
    return arguments.length ? (n = typeof d == "function" ? d : en(d), _) : n;
  }, _.touchable = function(d) {
    return arguments.length ? (i = typeof d == "function" ? d : en(!!d), _) : i;
  }, _.on = function() {
    var d = l.on.apply(l, arguments);
    return d === l ? _ : d;
  }, _.clickDistance = function(d) {
    return arguments.length ? (c = (d = +d) * d, _) : Math.sqrt(c);
  }, _;
}
function cr(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
const {
  SvelteComponent: Ja,
  append: Ya,
  attr: _t,
  detach: Qa,
  init: Ka,
  insert: $a,
  noop: $n,
  safe_not_equal: eu,
  svg_element: _r
} = window.__gradio__svelte__internal;
function tu(e) {
  let t, n;
  return {
    c() {
      t = _r("svg"), n = _r("path"), _t(n, "fill", "currentColor"), _t(n, "d", "M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"), _t(t, "xmlns", "http://www.w3.org/2000/svg"), _t(t, "width", "100%"), _t(t, "height", "100%"), _t(t, "viewBox", "0 0 24 24");
    },
    m(i, r) {
      $a(i, t, r), Ya(t, n);
    },
    p: $n,
    i: $n,
    o: $n,
    d(i) {
      i && Qa(t);
    }
  };
}
class hr extends Ja {
  constructor(t) {
    super(), Ka(this, t, null, tu, eu, {});
  }
}
const {
  SvelteComponent: nu,
  append: Ke,
  attr: ht,
  binding_callbacks: dr,
  create_component: mr,
  create_slot: iu,
  destroy_component: gr,
  detach: ru,
  element: Rt,
  get_all_dirty_from_scope: lu,
  get_slot_changes: su,
  init: ou,
  insert: au,
  listen: uu,
  mount_component: pr,
  safe_not_equal: fu,
  set_style: tn,
  space: ei,
  toggle_class: Te,
  transition_in: ti,
  transition_out: ni,
  update_slot_base: cu
} = window.__gradio__svelte__internal, { onMount: _u } = window.__gradio__svelte__internal;
function hu(e) {
  let t, n, i, r, l, s, a, o, u, f, c, _, h;
  const g = (
    /*#slots*/
    e[10].default
  ), y = iu(
    g,
    e,
    /*$$scope*/
    e[9],
    null
  );
  return l = new hr({}), f = new hr({}), {
    c() {
      t = Rt("div"), y && y.c(), n = ei(), i = Rt("div"), r = Rt("span"), mr(l.$$.fragment), s = ei(), a = Rt("div"), o = ei(), u = Rt("span"), mr(f.$$.fragment), ht(r, "class", "icon-wrap svelte-1w37x6c"), Te(
        r,
        "active",
        /*active*/
        e[2]
      ), Te(
        r,
        "disabled",
        /*disabled*/
        e[0]
      ), ht(a, "class", "inner svelte-1w37x6c"), tn(
        a,
        "--color",
        /*slider_color*/
        e[1]
      ), ht(u, "class", "icon-wrap right svelte-1w37x6c"), Te(
        u,
        "active",
        /*active*/
        e[2]
      ), Te(
        u,
        "disabled",
        /*disabled*/
        e[0]
      ), ht(i, "class", "outer svelte-1w37x6c"), ht(i, "role", "none"), tn(i, "transform", "translateX(" + /*px*/
      e[5] + "px)"), Te(
        i,
        "disabled",
        /*disabled*/
        e[0]
      ), ht(t, "class", "wrap svelte-1w37x6c");
    },
    m(v, p) {
      au(v, t, p), y && y.m(t, null), Ke(t, n), Ke(t, i), Ke(i, r), pr(l, r, null), Ke(i, s), Ke(i, a), Ke(i, o), Ke(i, u), pr(f, u, null), e[11](i), e[12](t), c = !0, _ || (h = uu(
        window,
        "resize",
        /*set_position*/
        e[6]
      ), _ = !0);
    },
    p(v, [p]) {
      y && y.p && (!c || p & /*$$scope*/
      512) && cu(
        y,
        g,
        v,
        /*$$scope*/
        v[9],
        c ? su(
          g,
          /*$$scope*/
          v[9],
          p,
          null
        ) : lu(
          /*$$scope*/
          v[9]
        ),
        null
      ), (!c || p & /*active*/
      4) && Te(
        r,
        "active",
        /*active*/
        v[2]
      ), (!c || p & /*disabled*/
      1) && Te(
        r,
        "disabled",
        /*disabled*/
        v[0]
      ), p & /*slider_color*/
      2 && tn(
        a,
        "--color",
        /*slider_color*/
        v[1]
      ), (!c || p & /*active*/
      4) && Te(
        u,
        "active",
        /*active*/
        v[2]
      ), (!c || p & /*disabled*/
      1) && Te(
        u,
        "disabled",
        /*disabled*/
        v[0]
      ), (!c || p & /*px*/
      32) && tn(i, "transform", "translateX(" + /*px*/
      v[5] + "px)"), (!c || p & /*disabled*/
      1) && Te(
        i,
        "disabled",
        /*disabled*/
        v[0]
      );
    },
    i(v) {
      c || (ti(y, v), ti(l.$$.fragment, v), ti(f.$$.fragment, v), c = !0);
    },
    o(v) {
      ni(y, v), ni(l.$$.fragment, v), ni(f.$$.fragment, v), c = !1;
    },
    d(v) {
      v && ru(t), y && y.d(v), gr(l), gr(f), e[11](null), e[12](null), _ = !1, h();
    }
  };
}
function du(e, t) {
  const n = Math.pow(10, t);
  return Math.round((e + Number.EPSILON) * n) / n;
}
function mu(e, t, n) {
  let { $$slots: i = {}, $$scope: r } = t, { position: l = 0.5 } = t, { disabled: s = !1 } = t, { slider_color: a = "var(--border-color-primary)" } = t, o = !1, u, f, c, _ = 0;
  function h() {
    n(8, c = u.getBoundingClientRect()), n(5, _ = cr(c.width * l - 10, 0, c.width - 20));
  }
  function g(d) {
    n(5, _ = d - 10), n(7, l = du(d / c.width, 5));
  }
  function y(d) {
    s || (n(2, o = !0), g(d.x));
  }
  function v(d, m) {
    s || g(d.x);
  }
  function p() {
    s || n(2, o = !1);
  }
  _u(() => {
    h();
    const d = Za().on("start", y).on("drag", v).on("end", p);
    qt(u).call(d);
  });
  function w(d) {
    dr[d ? "unshift" : "push"](() => {
      f = d, n(4, f);
    });
  }
  function b(d) {
    dr[d ? "unshift" : "push"](() => {
      u = d, n(3, u);
    });
  }
  return e.$$set = (d) => {
    "position" in d && n(7, l = d.position), "disabled" in d && n(0, s = d.disabled), "slider_color" in d && n(1, a = d.slider_color), "$$scope" in d && n(9, r = d.$$scope);
  }, e.$$.update = () => {
    e.$$.dirty & /*box, position*/
    384 && n(5, _ = c ? cr(c.width * l - 10, 0, c.width - 20) : 0);
  }, [
    s,
    a,
    o,
    u,
    f,
    _,
    h,
    l,
    c,
    r,
    i,
    w,
    b
  ];
}
class jl extends nu {
  constructor(t) {
    super(), ou(this, t, mu, hu, fu, {
      position: 7,
      disabled: 0,
      slider_color: 1
    });
  }
}
const {
  SvelteComponent: gu,
  assign: pu,
  create_slot: bu,
  detach: wu,
  element: vu,
  get_all_dirty_from_scope: yu,
  get_slot_changes: Eu,
  get_spread_update: Su,
  init: ku,
  insert: Au,
  safe_not_equal: Tu,
  set_dynamic_element_data: br,
  set_style: ce,
  toggle_class: Fe,
  transition_in: Xl,
  transition_out: Wl,
  update_slot_base: Bu
} = window.__gradio__svelte__internal;
function Cu(e) {
  let t, n, i;
  const r = (
    /*#slots*/
    e[17].default
  ), l = bu(
    r,
    e,
    /*$$scope*/
    e[16],
    null
  );
  let s = [
    { "data-testid": (
      /*test_id*/
      e[7]
    ) },
    { id: (
      /*elem_id*/
      e[2]
    ) },
    {
      class: n = "block " + /*elem_classes*/
      e[3].join(" ") + " svelte-1t38q2d"
    }
  ], a = {};
  for (let o = 0; o < s.length; o += 1)
    a = pu(a, s[o]);
  return {
    c() {
      t = vu(
        /*tag*/
        e[14]
      ), l && l.c(), br(
        /*tag*/
        e[14]
      )(t, a), Fe(
        t,
        "hidden",
        /*visible*/
        e[10] === !1
      ), Fe(
        t,
        "padded",
        /*padding*/
        e[6]
      ), Fe(
        t,
        "border_focus",
        /*border_mode*/
        e[5] === "focus"
      ), Fe(t, "hide-container", !/*explicit_call*/
      e[8] && !/*container*/
      e[9]), ce(t, "height", typeof /*height*/
      e[0] == "number" ? (
        /*height*/
        e[0] + "px"
      ) : void 0), ce(t, "width", typeof /*width*/
      e[1] == "number" ? `calc(min(${/*width*/
      e[1]}px, 100%))` : void 0), ce(
        t,
        "border-style",
        /*variant*/
        e[4]
      ), ce(
        t,
        "overflow",
        /*allow_overflow*/
        e[11] ? "visible" : "hidden"
      ), ce(
        t,
        "flex-grow",
        /*scale*/
        e[12]
      ), ce(t, "min-width", `calc(min(${/*min_width*/
      e[13]}px, 100%))`), ce(t, "border-width", "var(--block-border-width)");
    },
    m(o, u) {
      Au(o, t, u), l && l.m(t, null), i = !0;
    },
    p(o, u) {
      l && l.p && (!i || u & /*$$scope*/
      65536) && Bu(
        l,
        r,
        o,
        /*$$scope*/
        o[16],
        i ? Eu(
          r,
          /*$$scope*/
          o[16],
          u,
          null
        ) : yu(
          /*$$scope*/
          o[16]
        ),
        null
      ), br(
        /*tag*/
        o[14]
      )(t, a = Su(s, [
        (!i || u & /*test_id*/
        128) && { "data-testid": (
          /*test_id*/
          o[7]
        ) },
        (!i || u & /*elem_id*/
        4) && { id: (
          /*elem_id*/
          o[2]
        ) },
        (!i || u & /*elem_classes*/
        8 && n !== (n = "block " + /*elem_classes*/
        o[3].join(" ") + " svelte-1t38q2d")) && { class: n }
      ])), Fe(
        t,
        "hidden",
        /*visible*/
        o[10] === !1
      ), Fe(
        t,
        "padded",
        /*padding*/
        o[6]
      ), Fe(
        t,
        "border_focus",
        /*border_mode*/
        o[5] === "focus"
      ), Fe(t, "hide-container", !/*explicit_call*/
      o[8] && !/*container*/
      o[9]), u & /*height*/
      1 && ce(t, "height", typeof /*height*/
      o[0] == "number" ? (
        /*height*/
        o[0] + "px"
      ) : void 0), u & /*width*/
      2 && ce(t, "width", typeof /*width*/
      o[1] == "number" ? `calc(min(${/*width*/
      o[1]}px, 100%))` : void 0), u & /*variant*/
      16 && ce(
        t,
        "border-style",
        /*variant*/
        o[4]
      ), u & /*allow_overflow*/
      2048 && ce(
        t,
        "overflow",
        /*allow_overflow*/
        o[11] ? "visible" : "hidden"
      ), u & /*scale*/
      4096 && ce(
        t,
        "flex-grow",
        /*scale*/
        o[12]
      ), u & /*min_width*/
      8192 && ce(t, "min-width", `calc(min(${/*min_width*/
      o[13]}px, 100%))`);
    },
    i(o) {
      i || (Xl(l, o), i = !0);
    },
    o(o) {
      Wl(l, o), i = !1;
    },
    d(o) {
      o && wu(t), l && l.d(o);
    }
  };
}
function Nu(e) {
  let t, n = (
    /*tag*/
    e[14] && Cu(e)
  );
  return {
    c() {
      n && n.c();
    },
    m(i, r) {
      n && n.m(i, r), t = !0;
    },
    p(i, [r]) {
      /*tag*/
      i[14] && n.p(i, r);
    },
    i(i) {
      t || (Xl(n, i), t = !0);
    },
    o(i) {
      Wl(n, i), t = !1;
    },
    d(i) {
      n && n.d(i);
    }
  };
}
function Pu(e, t, n) {
  let { $$slots: i = {}, $$scope: r } = t, { height: l = void 0 } = t, { width: s = void 0 } = t, { elem_id: a = "" } = t, { elem_classes: o = [] } = t, { variant: u = "solid" } = t, { border_mode: f = "base" } = t, { padding: c = !0 } = t, { type: _ = "normal" } = t, { test_id: h = void 0 } = t, { explicit_call: g = !1 } = t, { container: y = !0 } = t, { visible: v = !0 } = t, { allow_overflow: p = !0 } = t, { scale: w = null } = t, { min_width: b = 0 } = t, d = _ === "fieldset" ? "fieldset" : "div";
  return e.$$set = (m) => {
    "height" in m && n(0, l = m.height), "width" in m && n(1, s = m.width), "elem_id" in m && n(2, a = m.elem_id), "elem_classes" in m && n(3, o = m.elem_classes), "variant" in m && n(4, u = m.variant), "border_mode" in m && n(5, f = m.border_mode), "padding" in m && n(6, c = m.padding), "type" in m && n(15, _ = m.type), "test_id" in m && n(7, h = m.test_id), "explicit_call" in m && n(8, g = m.explicit_call), "container" in m && n(9, y = m.container), "visible" in m && n(10, v = m.visible), "allow_overflow" in m && n(11, p = m.allow_overflow), "scale" in m && n(12, w = m.scale), "min_width" in m && n(13, b = m.min_width), "$$scope" in m && n(16, r = m.$$scope);
  }, [
    l,
    s,
    a,
    o,
    u,
    f,
    c,
    h,
    g,
    y,
    v,
    p,
    w,
    b,
    d,
    _,
    r,
    i
  ];
}
class xl extends gu {
  constructor(t) {
    super(), ku(this, t, Pu, Nu, Tu, {
      height: 0,
      width: 1,
      elem_id: 2,
      elem_classes: 3,
      variant: 4,
      border_mode: 5,
      padding: 6,
      type: 15,
      test_id: 7,
      explicit_call: 8,
      container: 9,
      visible: 10,
      allow_overflow: 11,
      scale: 12,
      min_width: 13
    });
  }
}
const {
  SvelteComponent: Hu,
  append: ii,
  attr: nn,
  create_component: Iu,
  destroy_component: Lu,
  detach: Ou,
  element: wr,
  init: Mu,
  insert: Ru,
  mount_component: Du,
  safe_not_equal: Uu,
  set_data: Fu,
  space: Gu,
  text: qu,
  toggle_class: Ge,
  transition_in: zu,
  transition_out: Vu
} = window.__gradio__svelte__internal;
function ju(e) {
  let t, n, i, r, l, s;
  return i = new /*Icon*/
  e[1]({}), {
    c() {
      t = wr("label"), n = wr("span"), Iu(i.$$.fragment), r = Gu(), l = qu(
        /*label*/
        e[0]
      ), nn(n, "class", "svelte-9gxdi0"), nn(t, "for", ""), nn(t, "data-testid", "block-label"), nn(t, "class", "svelte-9gxdi0"), Ge(t, "hide", !/*show_label*/
      e[2]), Ge(t, "sr-only", !/*show_label*/
      e[2]), Ge(
        t,
        "float",
        /*float*/
        e[4]
      ), Ge(
        t,
        "hide-label",
        /*disable*/
        e[3]
      );
    },
    m(a, o) {
      Ru(a, t, o), ii(t, n), Du(i, n, null), ii(t, r), ii(t, l), s = !0;
    },
    p(a, [o]) {
      (!s || o & /*label*/
      1) && Fu(
        l,
        /*label*/
        a[0]
      ), (!s || o & /*show_label*/
      4) && Ge(t, "hide", !/*show_label*/
      a[2]), (!s || o & /*show_label*/
      4) && Ge(t, "sr-only", !/*show_label*/
      a[2]), (!s || o & /*float*/
      16) && Ge(
        t,
        "float",
        /*float*/
        a[4]
      ), (!s || o & /*disable*/
      8) && Ge(
        t,
        "hide-label",
        /*disable*/
        a[3]
      );
    },
    i(a) {
      s || (zu(i.$$.fragment, a), s = !0);
    },
    o(a) {
      Vu(i.$$.fragment, a), s = !1;
    },
    d(a) {
      a && Ou(t), Lu(i);
    }
  };
}
function Xu(e, t, n) {
  let { label: i = null } = t, { Icon: r } = t, { show_label: l = !0 } = t, { disable: s = !1 } = t, { float: a = !0 } = t;
  return e.$$set = (o) => {
    "label" in o && n(0, i = o.label), "Icon" in o && n(1, r = o.Icon), "show_label" in o && n(2, l = o.show_label), "disable" in o && n(3, s = o.disable), "float" in o && n(4, a = o.float);
  }, [i, r, l, s, a];
}
class Zl extends Hu {
  constructor(t) {
    super(), Mu(this, t, Xu, ju, Uu, {
      label: 0,
      Icon: 1,
      show_label: 2,
      disable: 3,
      float: 4
    });
  }
}
const {
  SvelteComponent: Wu,
  append: Ti,
  attr: Le,
  bubble: xu,
  create_component: Zu,
  destroy_component: Ju,
  detach: Jl,
  element: Bi,
  init: Yu,
  insert: Yl,
  listen: Qu,
  mount_component: Ku,
  safe_not_equal: $u,
  set_data: ef,
  set_style: rn,
  space: tf,
  text: nf,
  toggle_class: de,
  transition_in: rf,
  transition_out: lf
} = window.__gradio__svelte__internal;
function vr(e) {
  let t, n;
  return {
    c() {
      t = Bi("span"), n = nf(
        /*label*/
        e[1]
      ), Le(t, "class", "svelte-lpi64a");
    },
    m(i, r) {
      Yl(i, t, r), Ti(t, n);
    },
    p(i, r) {
      r & /*label*/
      2 && ef(
        n,
        /*label*/
        i[1]
      );
    },
    d(i) {
      i && Jl(t);
    }
  };
}
function sf(e) {
  let t, n, i, r, l, s, a, o = (
    /*show_label*/
    e[2] && vr(e)
  );
  return r = new /*Icon*/
  e[0]({}), {
    c() {
      t = Bi("button"), o && o.c(), n = tf(), i = Bi("div"), Zu(r.$$.fragment), Le(i, "class", "svelte-lpi64a"), de(
        i,
        "small",
        /*size*/
        e[4] === "small"
      ), de(
        i,
        "large",
        /*size*/
        e[4] === "large"
      ), t.disabled = /*disabled*/
      e[7], Le(
        t,
        "aria-label",
        /*label*/
        e[1]
      ), Le(
        t,
        "aria-haspopup",
        /*hasPopup*/
        e[8]
      ), Le(
        t,
        "title",
        /*label*/
        e[1]
      ), Le(t, "class", "svelte-lpi64a"), de(
        t,
        "pending",
        /*pending*/
        e[3]
      ), de(
        t,
        "padded",
        /*padded*/
        e[5]
      ), de(
        t,
        "highlight",
        /*highlight*/
        e[6]
      ), de(
        t,
        "transparent",
        /*transparent*/
        e[9]
      ), rn(t, "color", !/*disabled*/
      e[7] && /*_color*/
      e[11] ? (
        /*_color*/
        e[11]
      ) : "var(--block-label-text-color)"), rn(t, "--bg-color", /*disabled*/
      e[7] ? "auto" : (
        /*background*/
        e[10]
      ));
    },
    m(u, f) {
      Yl(u, t, f), o && o.m(t, null), Ti(t, n), Ti(t, i), Ku(r, i, null), l = !0, s || (a = Qu(
        t,
        "click",
        /*click_handler*/
        e[13]
      ), s = !0);
    },
    p(u, [f]) {
      /*show_label*/
      u[2] ? o ? o.p(u, f) : (o = vr(u), o.c(), o.m(t, n)) : o && (o.d(1), o = null), (!l || f & /*size*/
      16) && de(
        i,
        "small",
        /*size*/
        u[4] === "small"
      ), (!l || f & /*size*/
      16) && de(
        i,
        "large",
        /*size*/
        u[4] === "large"
      ), (!l || f & /*disabled*/
      128) && (t.disabled = /*disabled*/
      u[7]), (!l || f & /*label*/
      2) && Le(
        t,
        "aria-label",
        /*label*/
        u[1]
      ), (!l || f & /*hasPopup*/
      256) && Le(
        t,
        "aria-haspopup",
        /*hasPopup*/
        u[8]
      ), (!l || f & /*label*/
      2) && Le(
        t,
        "title",
        /*label*/
        u[1]
      ), (!l || f & /*pending*/
      8) && de(
        t,
        "pending",
        /*pending*/
        u[3]
      ), (!l || f & /*padded*/
      32) && de(
        t,
        "padded",
        /*padded*/
        u[5]
      ), (!l || f & /*highlight*/
      64) && de(
        t,
        "highlight",
        /*highlight*/
        u[6]
      ), (!l || f & /*transparent*/
      512) && de(
        t,
        "transparent",
        /*transparent*/
        u[9]
      ), f & /*disabled, _color*/
      2176 && rn(t, "color", !/*disabled*/
      u[7] && /*_color*/
      u[11] ? (
        /*_color*/
        u[11]
      ) : "var(--block-label-text-color)"), f & /*disabled, background*/
      1152 && rn(t, "--bg-color", /*disabled*/
      u[7] ? "auto" : (
        /*background*/
        u[10]
      ));
    },
    i(u) {
      l || (rf(r.$$.fragment, u), l = !0);
    },
    o(u) {
      lf(r.$$.fragment, u), l = !1;
    },
    d(u) {
      u && Jl(t), o && o.d(), Ju(r), s = !1, a();
    }
  };
}
function of(e, t, n) {
  let i, { Icon: r } = t, { label: l = "" } = t, { show_label: s = !1 } = t, { pending: a = !1 } = t, { size: o = "small" } = t, { padded: u = !0 } = t, { highlight: f = !1 } = t, { disabled: c = !1 } = t, { hasPopup: _ = !1 } = t, { color: h = "var(--block-label-text-color)" } = t, { transparent: g = !1 } = t, { background: y = "var(--background-fill-primary)" } = t;
  function v(p) {
    xu.call(this, e, p);
  }
  return e.$$set = (p) => {
    "Icon" in p && n(0, r = p.Icon), "label" in p && n(1, l = p.label), "show_label" in p && n(2, s = p.show_label), "pending" in p && n(3, a = p.pending), "size" in p && n(4, o = p.size), "padded" in p && n(5, u = p.padded), "highlight" in p && n(6, f = p.highlight), "disabled" in p && n(7, c = p.disabled), "hasPopup" in p && n(8, _ = p.hasPopup), "color" in p && n(12, h = p.color), "transparent" in p && n(9, g = p.transparent), "background" in p && n(10, y = p.background);
  }, e.$$.update = () => {
    e.$$.dirty & /*highlight, color*/
    4160 && n(11, i = f ? "var(--color-accent)" : h);
  }, [
    r,
    l,
    s,
    a,
    o,
    u,
    f,
    c,
    _,
    g,
    y,
    i,
    h,
    v
  ];
}
class Gn extends Wu {
  constructor(t) {
    super(), Yu(this, t, of, sf, $u, {
      Icon: 0,
      label: 1,
      show_label: 2,
      pending: 3,
      size: 4,
      padded: 5,
      highlight: 6,
      disabled: 7,
      hasPopup: 8,
      color: 12,
      transparent: 9,
      background: 10
    });
  }
}
const {
  SvelteComponent: af,
  append: uf,
  attr: ri,
  binding_callbacks: ff,
  create_slot: cf,
  detach: _f,
  element: yr,
  get_all_dirty_from_scope: hf,
  get_slot_changes: df,
  init: mf,
  insert: gf,
  safe_not_equal: pf,
  toggle_class: qe,
  transition_in: bf,
  transition_out: wf,
  update_slot_base: vf
} = window.__gradio__svelte__internal;
function yf(e) {
  let t, n, i;
  const r = (
    /*#slots*/
    e[5].default
  ), l = cf(
    r,
    e,
    /*$$scope*/
    e[4],
    null
  );
  return {
    c() {
      t = yr("div"), n = yr("div"), l && l.c(), ri(n, "class", "icon svelte-3w3rth"), ri(t, "class", "empty svelte-3w3rth"), ri(t, "aria-label", "Empty value"), qe(
        t,
        "small",
        /*size*/
        e[0] === "small"
      ), qe(
        t,
        "large",
        /*size*/
        e[0] === "large"
      ), qe(
        t,
        "unpadded_box",
        /*unpadded_box*/
        e[1]
      ), qe(
        t,
        "small_parent",
        /*parent_height*/
        e[3]
      );
    },
    m(s, a) {
      gf(s, t, a), uf(t, n), l && l.m(n, null), e[6](t), i = !0;
    },
    p(s, [a]) {
      l && l.p && (!i || a & /*$$scope*/
      16) && vf(
        l,
        r,
        s,
        /*$$scope*/
        s[4],
        i ? df(
          r,
          /*$$scope*/
          s[4],
          a,
          null
        ) : hf(
          /*$$scope*/
          s[4]
        ),
        null
      ), (!i || a & /*size*/
      1) && qe(
        t,
        "small",
        /*size*/
        s[0] === "small"
      ), (!i || a & /*size*/
      1) && qe(
        t,
        "large",
        /*size*/
        s[0] === "large"
      ), (!i || a & /*unpadded_box*/
      2) && qe(
        t,
        "unpadded_box",
        /*unpadded_box*/
        s[1]
      ), (!i || a & /*parent_height*/
      8) && qe(
        t,
        "small_parent",
        /*parent_height*/
        s[3]
      );
    },
    i(s) {
      i || (bf(l, s), i = !0);
    },
    o(s) {
      wf(l, s), i = !1;
    },
    d(s) {
      s && _f(t), l && l.d(s), e[6](null);
    }
  };
}
function Ef(e) {
  let t, n = e[0], i = 1;
  for (; i < e.length; ) {
    const r = e[i], l = e[i + 1];
    if (i += 2, (r === "optionalAccess" || r === "optionalCall") && n == null)
      return;
    r === "access" || r === "optionalAccess" ? (t = n, n = l(n)) : (r === "call" || r === "optionalCall") && (n = l((...s) => n.call(t, ...s)), t = void 0);
  }
  return n;
}
function Sf(e, t, n) {
  let i, { $$slots: r = {}, $$scope: l } = t, { size: s = "small" } = t, { unpadded_box: a = !1 } = t, o;
  function u(c) {
    if (!c)
      return !1;
    const { height: _ } = c.getBoundingClientRect(), { height: h } = Ef([
      c,
      "access",
      (g) => g.parentElement,
      "optionalAccess",
      (g) => g.getBoundingClientRect,
      "call",
      (g) => g()
    ]) || { height: _ };
    return _ > h + 2;
  }
  function f(c) {
    ff[c ? "unshift" : "push"](() => {
      o = c, n(2, o);
    });
  }
  return e.$$set = (c) => {
    "size" in c && n(0, s = c.size), "unpadded_box" in c && n(1, a = c.unpadded_box), "$$scope" in c && n(4, l = c.$$scope);
  }, e.$$.update = () => {
    e.$$.dirty & /*el*/
    4 && n(3, i = u(o));
  }, [s, a, o, i, l, r, f];
}
class Ql extends af {
  constructor(t) {
    super(), mf(this, t, Sf, yf, pf, { size: 0, unpadded_box: 1 });
  }
}
const {
  SvelteComponent: kf,
  append: li,
  attr: ye,
  detach: Af,
  init: Tf,
  insert: Bf,
  noop: si,
  safe_not_equal: Cf,
  set_style: Be,
  svg_element: ln
} = window.__gradio__svelte__internal;
function Nf(e) {
  let t, n, i, r;
  return {
    c() {
      t = ln("svg"), n = ln("g"), i = ln("path"), r = ln("path"), ye(i, "d", "M18,6L6.087,17.913"), Be(i, "fill", "none"), Be(i, "fill-rule", "nonzero"), Be(i, "stroke-width", "2px"), ye(n, "transform", "matrix(1.14096,-0.140958,-0.140958,1.14096,-0.0559523,0.0559523)"), ye(r, "d", "M4.364,4.364L19.636,19.636"), Be(r, "fill", "none"), Be(r, "fill-rule", "nonzero"), Be(r, "stroke-width", "2px"), ye(t, "width", "100%"), ye(t, "height", "100%"), ye(t, "viewBox", "0 0 24 24"), ye(t, "version", "1.1"), ye(t, "xmlns", "http://www.w3.org/2000/svg"), ye(t, "xmlns:xlink", "http://www.w3.org/1999/xlink"), ye(t, "xml:space", "preserve"), ye(t, "stroke", "currentColor"), Be(t, "fill-rule", "evenodd"), Be(t, "clip-rule", "evenodd"), Be(t, "stroke-linecap", "round"), Be(t, "stroke-linejoin", "round");
    },
    m(l, s) {
      Bf(l, t, s), li(t, n), li(n, i), li(t, r);
    },
    p: si,
    i: si,
    o: si,
    d(l) {
      l && Af(t);
    }
  };
}
class Pf extends kf {
  constructor(t) {
    super(), Tf(this, t, null, Nf, Cf, {});
  }
}
const {
  SvelteComponent: Hf,
  append: If,
  attr: dt,
  detach: Lf,
  init: Of,
  insert: Mf,
  noop: oi,
  safe_not_equal: Rf,
  svg_element: Er
} = window.__gradio__svelte__internal;
function Df(e) {
  let t, n;
  return {
    c() {
      t = Er("svg"), n = Er("path"), dt(n, "fill", "currentColor"), dt(n, "d", "M26 24v4H6v-4H4v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4zm0-10l-1.41-1.41L17 20.17V2h-2v18.17l-7.59-7.58L6 14l10 10l10-10z"), dt(t, "xmlns", "http://www.w3.org/2000/svg"), dt(t, "width", "100%"), dt(t, "height", "100%"), dt(t, "viewBox", "0 0 32 32");
    },
    m(i, r) {
      Mf(i, t, r), If(t, n);
    },
    p: oi,
    i: oi,
    o: oi,
    d(i) {
      i && Lf(t);
    }
  };
}
class Zi extends Hf {
  constructor(t) {
    super(), Of(this, t, null, Df, Rf, {});
  }
}
const {
  SvelteComponent: Uf,
  append: ai,
  attr: Y,
  detach: Ff,
  init: Gf,
  insert: qf,
  noop: ui,
  safe_not_equal: zf,
  svg_element: sn
} = window.__gradio__svelte__internal;
function Vf(e) {
  let t, n, i, r;
  return {
    c() {
      t = sn("svg"), n = sn("rect"), i = sn("circle"), r = sn("polyline"), Y(n, "x", "3"), Y(n, "y", "3"), Y(n, "width", "18"), Y(n, "height", "18"), Y(n, "rx", "2"), Y(n, "ry", "2"), Y(i, "cx", "8.5"), Y(i, "cy", "8.5"), Y(i, "r", "1.5"), Y(r, "points", "21 15 16 10 5 21"), Y(t, "xmlns", "http://www.w3.org/2000/svg"), Y(t, "width", "100%"), Y(t, "height", "100%"), Y(t, "viewBox", "0 0 24 24"), Y(t, "fill", "none"), Y(t, "stroke", "currentColor"), Y(t, "stroke-width", "1.5"), Y(t, "stroke-linecap", "round"), Y(t, "stroke-linejoin", "round"), Y(t, "class", "feather feather-image");
    },
    m(l, s) {
      qf(l, t, s), ai(t, n), ai(t, i), ai(t, r);
    },
    p: ui,
    i: ui,
    o: ui,
    d(l) {
      l && Ff(t);
    }
  };
}
class qn extends Uf {
  constructor(t) {
    super(), Gf(this, t, null, Vf, zf, {});
  }
}
const {
  SvelteComponent: jf,
  append: fi,
  attr: re,
  detach: Xf,
  init: Wf,
  insert: xf,
  noop: ci,
  safe_not_equal: Zf,
  svg_element: on
} = window.__gradio__svelte__internal;
function Jf(e) {
  let t, n, i, r;
  return {
    c() {
      t = on("svg"), n = on("path"), i = on("polyline"), r = on("line"), re(n, "d", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"), re(i, "points", "17 8 12 3 7 8"), re(r, "x1", "12"), re(r, "y1", "3"), re(r, "x2", "12"), re(r, "y2", "15"), re(t, "xmlns", "http://www.w3.org/2000/svg"), re(t, "width", "90%"), re(t, "height", "90%"), re(t, "viewBox", "0 0 24 24"), re(t, "fill", "none"), re(t, "stroke", "currentColor"), re(t, "stroke-width", "2"), re(t, "stroke-linecap", "round"), re(t, "stroke-linejoin", "round"), re(t, "class", "feather feather-upload");
    },
    m(l, s) {
      xf(l, t, s), fi(t, n), fi(t, i), fi(t, r);
    },
    p: ci,
    i: ci,
    o: ci,
    d(l) {
      l && Xf(t);
    }
  };
}
let Yf = class extends jf {
  constructor(t) {
    super(), Wf(this, t, null, Jf, Zf, {});
  }
};
const Qf = [
  { color: "red", primary: 600, secondary: 100 },
  { color: "green", primary: 600, secondary: 100 },
  { color: "blue", primary: 600, secondary: 100 },
  { color: "yellow", primary: 500, secondary: 100 },
  { color: "purple", primary: 600, secondary: 100 },
  { color: "teal", primary: 600, secondary: 100 },
  { color: "orange", primary: 600, secondary: 100 },
  { color: "cyan", primary: 600, secondary: 100 },
  { color: "lime", primary: 500, secondary: 100 },
  { color: "pink", primary: 600, secondary: 100 }
], Sr = {
  inherit: "inherit",
  current: "currentColor",
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617"
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712"
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b"
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a"
  },
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09"
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a"
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407"
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03"
  },
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
    950: "#422006"
  },
  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314",
    950: "#1a2e05"
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16"
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22"
  },
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e"
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344"
  },
  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49"
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554"
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b"
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065"
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764"
  },
  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
    950: "#4a044e"
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
    950: "#500724"
  },
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519"
  }
};
Qf.reduce(
  (e, { color: t, primary: n, secondary: i }) => ({
    ...e,
    [t]: {
      primary: Sr[t][n],
      secondary: Sr[t][i]
    }
  }),
  {}
);
const {
  SvelteComponent: Kf,
  append: rt,
  attr: Ci,
  create_component: $f,
  destroy_component: ec,
  detach: pn,
  element: Ni,
  init: tc,
  insert: bn,
  mount_component: nc,
  safe_not_equal: ic,
  set_data: Pi,
  space: Hi,
  text: Ft,
  toggle_class: kr,
  transition_in: rc,
  transition_out: lc
} = window.__gradio__svelte__internal;
function Ar(e) {
  let t, n, i = (
    /*i18n*/
    e[1]("common.or") + ""
  ), r, l, s, a = (
    /*message*/
    (e[2] || /*i18n*/
    e[1]("upload_text.click_to_upload")) + ""
  ), o;
  return {
    c() {
      t = Ni("span"), n = Ft("- "), r = Ft(i), l = Ft(" -"), s = Hi(), o = Ft(a), Ci(t, "class", "or svelte-kzcjhc");
    },
    m(u, f) {
      bn(u, t, f), rt(t, n), rt(t, r), rt(t, l), bn(u, s, f), bn(u, o, f);
    },
    p(u, f) {
      f & /*i18n*/
      2 && i !== (i = /*i18n*/
      u[1]("common.or") + "") && Pi(r, i), f & /*message, i18n*/
      6 && a !== (a = /*message*/
      (u[2] || /*i18n*/
      u[1]("upload_text.click_to_upload")) + "") && Pi(o, a);
    },
    d(u) {
      u && (pn(t), pn(s), pn(o));
    }
  };
}
function sc(e) {
  let t, n, i, r, l = (
    /*i18n*/
    e[1](
      /*defs*/
      e[5][
        /*type*/
        e[0]
      ] || /*defs*/
      e[5].file
    ) + ""
  ), s, a, o;
  i = new Yf({});
  let u = (
    /*mode*/
    e[3] !== "short" && Ar(e)
  );
  return {
    c() {
      t = Ni("div"), n = Ni("span"), $f(i.$$.fragment), r = Hi(), s = Ft(l), a = Hi(), u && u.c(), Ci(n, "class", "icon-wrap svelte-kzcjhc"), kr(
        n,
        "hovered",
        /*hovered*/
        e[4]
      ), Ci(t, "class", "wrap svelte-kzcjhc");
    },
    m(f, c) {
      bn(f, t, c), rt(t, n), nc(i, n, null), rt(t, r), rt(t, s), rt(t, a), u && u.m(t, null), o = !0;
    },
    p(f, [c]) {
      (!o || c & /*hovered*/
      16) && kr(
        n,
        "hovered",
        /*hovered*/
        f[4]
      ), (!o || c & /*i18n, type*/
      3) && l !== (l = /*i18n*/
      f[1](
        /*defs*/
        f[5][
          /*type*/
          f[0]
        ] || /*defs*/
        f[5].file
      ) + "") && Pi(s, l), /*mode*/
      f[3] !== "short" ? u ? u.p(f, c) : (u = Ar(f), u.c(), u.m(t, null)) : u && (u.d(1), u = null);
    },
    i(f) {
      o || (rc(i.$$.fragment, f), o = !0);
    },
    o(f) {
      lc(i.$$.fragment, f), o = !1;
    },
    d(f) {
      f && pn(t), ec(i), u && u.d();
    }
  };
}
function oc(e, t, n) {
  let { type: i = "file" } = t, { i18n: r } = t, { message: l = void 0 } = t, { mode: s = "full" } = t, { hovered: a = !1 } = t;
  const o = {
    image: "upload_text.drop_image",
    video: "upload_text.drop_video",
    audio: "upload_text.drop_audio",
    file: "upload_text.drop_file",
    csv: "upload_text.drop_csv"
  };
  return e.$$set = (u) => {
    "type" in u && n(0, i = u.type), "i18n" in u && n(1, r = u.i18n), "message" in u && n(2, l = u.message), "mode" in u && n(3, s = u.mode), "hovered" in u && n(4, a = u.hovered);
  }, [i, r, l, s, a, o];
}
class ac extends Kf {
  constructor(t) {
    super(), tc(this, t, oc, sc, ic, {
      type: 0,
      i18n: 1,
      message: 2,
      mode: 3,
      hovered: 4
    });
  }
}
const {
  SvelteComponent: uc,
  attr: fc,
  create_component: cc,
  destroy_component: _c,
  detach: hc,
  element: dc,
  init: mc,
  insert: gc,
  mount_component: pc,
  noop: bc,
  safe_not_equal: wc,
  transition_in: vc,
  transition_out: yc
} = window.__gradio__svelte__internal, { createEventDispatcher: Ec } = window.__gradio__svelte__internal;
function Sc(e) {
  let t, n, i;
  return n = new Gn({
    props: { Icon: Pf, label: "Remove Image" }
  }), n.$on(
    "click",
    /*click_handler*/
    e[1]
  ), {
    c() {
      t = dc("div"), cc(n.$$.fragment), fc(t, "class", "svelte-1g74h68");
    },
    m(r, l) {
      gc(r, t, l), pc(n, t, null), i = !0;
    },
    p: bc,
    i(r) {
      i || (vc(n.$$.fragment, r), i = !0);
    },
    o(r) {
      yc(n.$$.fragment, r), i = !1;
    },
    d(r) {
      r && hc(t), _c(n);
    }
  };
}
function kc(e) {
  const t = Ec();
  return [t, (i) => {
    t("remove_image"), i.stopPropagation();
  }];
}
class Ac extends uc {
  constructor(t) {
    super(), mc(this, t, kc, Sc, wc, {});
  }
}
var _i = new Intl.Collator(0, { numeric: 1 }).compare;
function Tr(e, t, n) {
  return e = e.split("."), t = t.split("."), _i(e[0], t[0]) || _i(e[1], t[1]) || (t[2] = t.slice(2).join("."), n = /[.-]/.test(e[2] = e.slice(2).join(".")), n == /[.-]/.test(t[2]) ? _i(e[2], t[2]) : n ? -1 : 1);
}
function Ve(e, t, n) {
  return t.startsWith("http://") || t.startsWith("https://") ? n ? e : t : e + t;
}
function hi(e) {
  if (e.startsWith("http")) {
    const { protocol: t, host: n } = new URL(e);
    return n.endsWith("hf.space") ? {
      ws_protocol: "wss",
      host: n,
      http_protocol: t
    } : {
      ws_protocol: t === "https:" ? "wss" : "ws",
      http_protocol: t,
      host: n
    };
  } else if (e.startsWith("file:"))
    return {
      ws_protocol: "ws",
      http_protocol: "http:",
      host: "lite.local"
      // Special fake hostname only used for this case. This matches the hostname allowed in `is_self_host()` in `js/wasm/network/host.ts`.
    };
  return {
    ws_protocol: "wss",
    http_protocol: "https:",
    host: e
  };
}
const Kl = /^[^\/]*\/[^\/]*$/, Tc = /.*hf\.space\/{0,1}$/;
async function Bc(e, t) {
  const n = {};
  t && (n.Authorization = `Bearer ${t}`);
  const i = e.trim();
  if (Kl.test(i))
    try {
      const r = await fetch(
        `https://huggingface.co/api/spaces/${i}/host`,
        { headers: n }
      );
      if (r.status !== 200)
        throw new Error("Space metadata could not be loaded.");
      const l = (await r.json()).host;
      return {
        space_id: e,
        ...hi(l)
      };
    } catch (r) {
      throw new Error("Space metadata could not be loaded." + r.message);
    }
  if (Tc.test(i)) {
    const { ws_protocol: r, http_protocol: l, host: s } = hi(i);
    return {
      space_id: s.replace(".hf.space", ""),
      ws_protocol: r,
      http_protocol: l,
      host: s
    };
  }
  return {
    space_id: !1,
    ...hi(i)
  };
}
function Cc(e) {
  let t = {};
  return e.forEach(({ api_name: n }, i) => {
    n && (t[n] = i);
  }), t;
}
const Nc = /^(?=[^]*\b[dD]iscussions{0,1}\b)(?=[^]*\b[dD]isabled\b)[^]*$/;
async function Br(e) {
  try {
    const n = (await fetch(
      `https://huggingface.co/api/spaces/${e}/discussions`,
      {
        method: "HEAD"
      }
    )).headers.get("x-error-message");
    return !(n && Nc.test(n));
  } catch {
    return !1;
  }
}
function ke(e, t, n) {
  if (e == null)
    return null;
  if (Array.isArray(e)) {
    const i = [];
    for (const r of e)
      r == null ? i.push(null) : i.push(ke(r, t, n));
    return i;
  }
  return e.is_stream ? n == null ? new vt({
    ...e,
    url: t + "/stream/" + e.path
  }) : new vt({
    ...e,
    url: "/proxy=" + n + "stream/" + e.path
  }) : new vt({
    ...e,
    url: Hc(e.path, t, n)
  });
}
function Pc(e) {
  try {
    const t = new URL(e);
    return t.protocol === "http:" || t.protocol === "https:";
  } catch {
    return !1;
  }
}
function Hc(e, t, n) {
  return e == null ? n ? `/proxy=${n}file=` : `${t}/file=` : Pc(e) ? e : n ? `/proxy=${n}file=${e}` : `${t}/file=${e}`;
}
async function Ic(e, t, n, i = Rc) {
  let r = (Array.isArray(e) ? e : [e]).map(
    (l) => l.blob
  );
  return await Promise.all(
    await i(t, r, void 0, n).then(
      async (l) => {
        if (l.error)
          throw new Error(l.error);
        return l.files ? l.files.map((s, a) => {
          const o = new vt({ ...e[a], path: s });
          return ke(o, t, null);
        }) : [];
      }
    )
  );
}
async function Lc(e, t) {
  return e.map(
    (n, i) => new vt({
      path: n.name,
      orig_name: n.name,
      blob: n,
      size: n.size,
      mime_type: n.type,
      is_stream: t
    })
  );
}
class vt {
  constructor({
    path: t,
    url: n,
    orig_name: i,
    size: r,
    blob: l,
    is_stream: s,
    mime_type: a,
    alt_text: o
  }) {
    this.path = t, this.url = n, this.orig_name = i, this.size = r, this.blob = n ? void 0 : l, this.is_stream = s, this.mime_type = a, this.alt_text = o;
  }
}
const Oc = "This application is too busy. Keep trying!", Dt = "Connection errored out.";
let $l;
function Mc(e, t) {
  return { post_data: n, upload_files: i, client: r, handle_blob: l };
  async function n(s, a, o) {
    const u = { "Content-Type": "application/json" };
    o && (u.Authorization = `Bearer ${o}`);
    try {
      var f = await e(s, {
        method: "POST",
        body: JSON.stringify(a),
        headers: u
      });
    } catch {
      return [{ error: Dt }, 500];
    }
    return [await f.json(), f.status];
  }
  async function i(s, a, o, u) {
    const f = {};
    o && (f.Authorization = `Bearer ${o}`);
    const c = 1e3, _ = [];
    for (let g = 0; g < a.length; g += c) {
      const y = a.slice(g, g + c), v = new FormData();
      y.forEach((w) => {
        v.append("files", w);
      });
      try {
        const w = u ? `${s}/upload?upload_id=${u}` : `${s}/upload`;
        var h = await e(w, {
          method: "POST",
          body: v,
          headers: f
        });
      } catch {
        return { error: Dt };
      }
      const p = await h.json();
      _.push(...p);
    }
    return { files: _ };
  }
  async function r(s, a = { normalise_files: !0 }) {
    return new Promise(async (o) => {
      const { status_callback: u, hf_token: f, normalise_files: c } = a, _ = {
        predict: F,
        submit: T,
        view_api: A,
        component_server: ee
      }, h = c ?? !0;
      if ((typeof window > "u" || !("WebSocket" in window)) && !global.Websocket) {
        const C = await import("./wrapper-6f348d45-19fa94bf.js");
        $l = (await import("./__vite-browser-external-2447137e.js")).Blob, global.WebSocket = C.WebSocket;
      }
      const { ws_protocol: g, http_protocol: y, host: v, space_id: p } = await Bc(s, f), w = Math.random().toString(36).substring(2), b = {};
      let d, m = {}, B = !1;
      f && p && (B = await Uc(p, f));
      async function P(C) {
        if (d = C, m = Cc((C == null ? void 0 : C.dependencies) || []), d.auth_required)
          return {
            config: d,
            ..._
          };
        try {
          L = await A(d);
        } catch (k) {
          console.error(`Could not get api details: ${k.message}`);
        }
        return {
          config: d,
          ..._
        };
      }
      let L;
      async function U(C) {
        if (u && u(C), C.status === "running")
          try {
            d = await Hr(
              e,
              `${y}//${v}`,
              f
            );
            const k = await P(d);
            o(k);
          } catch (k) {
            console.error(k), u && u({
              status: "error",
              message: "Could not load this space.",
              load_status: "error",
              detail: "NOT_FOUND"
            });
          }
      }
      try {
        d = await Hr(
          e,
          `${y}//${v}`,
          f
        );
        const C = await P(d);
        o(C);
      } catch (C) {
        console.error(C), p ? Li(
          p,
          Kl.test(p) ? "space_name" : "subdomain",
          U
        ) : u && u({
          status: "error",
          message: "Could not load this space.",
          load_status: "error",
          detail: "NOT_FOUND"
        });
      }
      function F(C, k, K) {
        let V = !1, N = !1, X;
        if (typeof C == "number")
          X = d.dependencies[C];
        else {
          const S = C.replace(/^\//, "");
          X = d.dependencies[m[S]];
        }
        if (X.types.continuous)
          throw new Error(
            "Cannot call predict on this function as it may run forever. Use submit instead"
          );
        return new Promise((S, G) => {
          const Z = T(C, k, K);
          let E;
          Z.on("data", (fe) => {
            N && (Z.destroy(), S(fe)), V = !0, E = fe;
          }).on("status", (fe) => {
            fe.stage === "error" && G(fe), fe.stage === "complete" && (N = !0, V && (Z.destroy(), S(E)));
          });
        });
      }
      function T(C, k, K, V = null) {
        let N, X;
        if (typeof C == "number")
          N = C, X = L.unnamed_endpoints[N];
        else {
          const te = C.replace(/^\//, "");
          N = m[te], X = L.named_endpoints[C.trim()];
        }
        if (typeof N != "number")
          throw new Error(
            "There is no endpoint matching that name of fn_index matching that number."
          );
        let S, G, Z = d.protocol ?? "sse";
        const E = typeof C == "number" ? "/predict" : C;
        let fe, Zn = null, Ie = !1;
        const Mt = {};
        let Qe = "";
        typeof window < "u" && (Qe = new URLSearchParams(window.location.search).toString()), l(
          `${y}//${Ve(v, d.path, !0)}`,
          k,
          X,
          f
        ).then((te) => {
          if (fe = { data: te || [], event_data: K, fn_index: N, trigger_id: V }, Fc(N, d))
            J({
              type: "status",
              endpoint: E,
              stage: "pending",
              queue: !1,
              fn_index: N,
              time: /* @__PURE__ */ new Date()
            }), n(
              `${y}//${Ve(v, d.path, !0)}/run${E.startsWith("/") ? E : `/${E}`}${Qe ? "?" + Qe : ""}`,
              {
                ...fe,
                session_hash: w
              },
              f
            ).then(([W, ne]) => {
              const Ue = h ? di(
                W.data,
                X,
                d.root,
                d.root_url
              ) : W.data;
              ne == 200 ? (J({
                type: "data",
                endpoint: E,
                fn_index: N,
                data: Ue,
                time: /* @__PURE__ */ new Date()
              }), J({
                type: "status",
                endpoint: E,
                fn_index: N,
                stage: "complete",
                eta: W.average_duration,
                queue: !1,
                time: /* @__PURE__ */ new Date()
              })) : J({
                type: "status",
                stage: "error",
                endpoint: E,
                fn_index: N,
                message: W.error,
                queue: !1,
                time: /* @__PURE__ */ new Date()
              });
            }).catch((W) => {
              J({
                type: "status",
                stage: "error",
                message: W.message,
                endpoint: E,
                fn_index: N,
                queue: !1,
                time: /* @__PURE__ */ new Date()
              });
            });
          else if (Z == "ws") {
            J({
              type: "status",
              stage: "pending",
              queue: !0,
              endpoint: E,
              fn_index: N,
              time: /* @__PURE__ */ new Date()
            });
            let W = new URL(`${g}://${Ve(
              v,
              d.path,
              !0
            )}
							/queue/join${Qe ? "?" + Qe : ""}`);
            B && W.searchParams.set("__sign", B), S = t(W), S.onclose = (ne) => {
              ne.wasClean || J({
                type: "status",
                stage: "error",
                broken: !0,
                message: Dt,
                queue: !0,
                endpoint: E,
                fn_index: N,
                time: /* @__PURE__ */ new Date()
              });
            }, S.onmessage = function(ne) {
              const Ue = JSON.parse(ne.data), { type: he, status: $, data: ve } = Ir(
                Ue,
                b[N]
              );
              if (he === "update" && $ && !Ie)
                J({
                  type: "status",
                  endpoint: E,
                  fn_index: N,
                  time: /* @__PURE__ */ new Date(),
                  ...$
                }), $.stage === "error" && S.close();
              else if (he === "hash") {
                S.send(JSON.stringify({ fn_index: N, session_hash: w }));
                return;
              } else
                he === "data" ? S.send(JSON.stringify({ ...fe, session_hash: w })) : he === "complete" ? Ie = $ : he === "log" ? J({
                  type: "log",
                  log: ve.log,
                  level: ve.level,
                  endpoint: E,
                  fn_index: N
                }) : he === "generating" && J({
                  type: "status",
                  time: /* @__PURE__ */ new Date(),
                  ...$,
                  stage: $ == null ? void 0 : $.stage,
                  queue: !0,
                  endpoint: E,
                  fn_index: N
                });
              ve && (J({
                type: "data",
                time: /* @__PURE__ */ new Date(),
                data: h ? di(
                  ve.data,
                  X,
                  d.root,
                  d.root_url
                ) : ve.data,
                endpoint: E,
                fn_index: N
              }), Ie && (J({
                type: "status",
                time: /* @__PURE__ */ new Date(),
                ...Ie,
                stage: $ == null ? void 0 : $.stage,
                queue: !0,
                endpoint: E,
                fn_index: N
              }), S.close()));
            }, Tr(d.version || "2.0.0", "3.6") < 0 && addEventListener(
              "open",
              () => S.send(JSON.stringify({ hash: w }))
            );
          } else {
            J({
              type: "status",
              stage: "pending",
              queue: !0,
              endpoint: E,
              fn_index: N,
              time: /* @__PURE__ */ new Date()
            });
            var _e = new URLSearchParams({
              fn_index: N.toString(),
              session_hash: w
            }).toString();
            let W = new URL(
              `${y}//${Ve(
                v,
                d.path,
                !0
              )}/queue/join?${Qe ? Qe + "&" : ""}${_e}`
            );
            G = new EventSource(W), G.onmessage = async function(ne) {
              const Ue = JSON.parse(ne.data), { type: he, status: $, data: ve } = Ir(
                Ue,
                b[N]
              );
              if (he === "update" && $ && !Ie)
                J({
                  type: "status",
                  endpoint: E,
                  fn_index: N,
                  time: /* @__PURE__ */ new Date(),
                  ...$
                }), $.stage === "error" && G.close();
              else if (he === "data") {
                Zn = Ue.event_id;
                let [Rm, $s] = await n(
                  `${y}//${Ve(
                    v,
                    d.path,
                    !0
                  )}/queue/data`,
                  {
                    ...fe,
                    session_hash: w,
                    event_id: Zn
                  },
                  f
                );
                $s !== 200 && (J({
                  type: "status",
                  stage: "error",
                  message: Dt,
                  queue: !0,
                  endpoint: E,
                  fn_index: N,
                  time: /* @__PURE__ */ new Date()
                }), G.close());
              } else
                he === "complete" ? Ie = $ : he === "log" ? J({
                  type: "log",
                  log: ve.log,
                  level: ve.level,
                  endpoint: E,
                  fn_index: N
                }) : he === "generating" && J({
                  type: "status",
                  time: /* @__PURE__ */ new Date(),
                  ...$,
                  stage: $ == null ? void 0 : $.stage,
                  queue: !0,
                  endpoint: E,
                  fn_index: N
                });
              ve && (J({
                type: "data",
                time: /* @__PURE__ */ new Date(),
                data: h ? di(
                  ve.data,
                  X,
                  d.root,
                  d.root_url
                ) : ve.data,
                endpoint: E,
                fn_index: N
              }), Ie && (J({
                type: "status",
                time: /* @__PURE__ */ new Date(),
                ...Ie,
                stage: $ == null ? void 0 : $.stage,
                queue: !0,
                endpoint: E,
                fn_index: N
              }), G.close()));
            };
          }
        });
        function J(te) {
          const W = Mt[te.type] || [];
          W == null || W.forEach((ne) => ne(te));
        }
        function Jn(te, _e) {
          const W = Mt, ne = W[te] || [];
          return W[te] = ne, ne == null || ne.push(_e), { on: Jn, off: $t, cancel: Yn, destroy: Qn };
        }
        function $t(te, _e) {
          const W = Mt;
          let ne = W[te] || [];
          return ne = ne == null ? void 0 : ne.filter((Ue) => Ue !== _e), W[te] = ne, { on: Jn, off: $t, cancel: Yn, destroy: Qn };
        }
        async function Yn() {
          const te = {
            stage: "complete",
            queue: !1,
            time: /* @__PURE__ */ new Date()
          };
          Ie = te, J({
            ...te,
            type: "status",
            endpoint: E,
            fn_index: N
          });
          let _e = {};
          Z === "ws" ? (S && S.readyState === 0 ? S.addEventListener("open", () => {
            S.close();
          }) : S.close(), _e = { fn_index: N, session_hash: w }) : (G.close(), _e = { event_id: Zn });
          try {
            await e(
              `${y}//${Ve(
                v,
                d.path,
                !0
              )}/reset`,
              {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(_e)
              }
            );
          } catch {
            console.warn(
              "The `/reset` endpoint could not be called. Subsequent endpoint results may be unreliable."
            );
          }
        }
        function Qn() {
          for (const te in Mt)
            Mt[te].forEach((_e) => {
              $t(te, _e);
            });
        }
        return {
          on: Jn,
          off: $t,
          cancel: Yn,
          destroy: Qn
        };
      }
      async function ee(C, k, K) {
        var V;
        const N = { "Content-Type": "application/json" };
        f && (N.Authorization = `Bearer ${f}`);
        let X, S = d.components.find(
          (E) => E.id === C
        );
        (V = S == null ? void 0 : S.props) != null && V.root_url ? X = S.props.root_url : X = `${y}//${Ve(
          v,
          d.path,
          !0
        )}/`;
        const G = await e(
          `${X}component_server/`,
          {
            method: "POST",
            body: JSON.stringify({
              data: K,
              component_id: C,
              fn_name: k,
              session_hash: w
            }),
            headers: N
          }
        );
        if (!G.ok)
          throw new Error(
            "Could not connect to component server: " + G.statusText
          );
        return await G.json();
      }
      async function A(C) {
        if (L)
          return L;
        const k = { "Content-Type": "application/json" };
        f && (k.Authorization = `Bearer ${f}`);
        let K;
        if (Tr(C.version || "2.0.0", "3.30") < 0 ? K = await e(
          "https://gradio-space-api-fetcher-v2.hf.space/api",
          {
            method: "POST",
            body: JSON.stringify({
              serialize: !1,
              config: JSON.stringify(C)
            }),
            headers: k
          }
        ) : K = await e(`${C.root}/info`, {
          headers: k
        }), !K.ok)
          throw new Error(Dt);
        let V = await K.json();
        return "api" in V && (V = V.api), V.named_endpoints["/predict"] && !V.unnamed_endpoints[0] && (V.unnamed_endpoints[0] = V.named_endpoints["/predict"]), Dc(V, C, m);
      }
    });
  }
  async function l(s, a, o, u) {
    const f = await Ii(
      a,
      void 0,
      [],
      !0,
      o
    );
    return Promise.all(
      f.map(async ({ path: c, blob: _, type: h }) => {
        if (_) {
          const g = (await i(s, [_], u)).files[0];
          return { path: c, file_url: g, type: h, name: _ == null ? void 0 : _.name };
        }
        return { path: c, type: h };
      })
    ).then((c) => (c.forEach(({ path: _, file_url: h, type: g, name: y }) => {
      if (g === "Gallery")
        Pr(a, h, _);
      else if (h) {
        const v = new vt({ path: h, orig_name: y });
        Pr(a, v, _);
      }
    }), a));
  }
}
const { post_data: Um, upload_files: Rc, client: Fm, handle_blob: Gm } = Mc(
  fetch,
  (...e) => new WebSocket(...e)
);
function di(e, t, n, i) {
  return e.map((r, l) => {
    var s, a, o, u;
    return ((a = (s = t == null ? void 0 : t.returns) == null ? void 0 : s[l]) == null ? void 0 : a.component) === "File" ? ke(r, n, i) : ((u = (o = t == null ? void 0 : t.returns) == null ? void 0 : o[l]) == null ? void 0 : u.component) === "Gallery" ? r.map((f) => Array.isArray(f) ? [ke(f[0], n, i), f[1]] : [ke(f, n, i), null]) : typeof r == "object" && r.path ? ke(r, n, i) : r;
  });
}
function Cr(e, t, n, i) {
  switch (e.type) {
    case "string":
      return "string";
    case "boolean":
      return "boolean";
    case "number":
      return "number";
  }
  if (n === "JSONSerializable" || n === "StringSerializable")
    return "any";
  if (n === "ListStringSerializable")
    return "string[]";
  if (t === "Image")
    return i === "parameter" ? "Blob | File | Buffer" : "string";
  if (n === "FileSerializable")
    return (e == null ? void 0 : e.type) === "array" ? i === "parameter" ? "(Blob | File | Buffer)[]" : "{ name: string; data: string; size?: number; is_file?: boolean; orig_name?: string}[]" : i === "parameter" ? "Blob | File | Buffer" : "{ name: string; data: string; size?: number; is_file?: boolean; orig_name?: string}";
  if (n === "GallerySerializable")
    return i === "parameter" ? "[(Blob | File | Buffer), (string | null)][]" : "[{ name: string; data: string; size?: number; is_file?: boolean; orig_name?: string}, (string | null))][]";
}
function Nr(e, t) {
  return t === "GallerySerializable" ? "array of [file, label] tuples" : t === "ListStringSerializable" ? "array of strings" : t === "FileSerializable" ? "array of files or single file" : e.description;
}
function Dc(e, t, n) {
  const i = {
    named_endpoints: {},
    unnamed_endpoints: {}
  };
  for (const r in e) {
    const l = e[r];
    for (const s in l) {
      const a = t.dependencies[s] ? s : n[s.replace("/", "")], o = l[s];
      i[r][s] = {}, i[r][s].parameters = {}, i[r][s].returns = {}, i[r][s].type = t.dependencies[a].types, i[r][s].parameters = o.parameters.map(
        ({ label: u, component: f, type: c, serializer: _ }) => ({
          label: u,
          component: f,
          type: Cr(c, f, _, "parameter"),
          description: Nr(c, _)
        })
      ), i[r][s].returns = o.returns.map(
        ({ label: u, component: f, type: c, serializer: _ }) => ({
          label: u,
          component: f,
          type: Cr(c, f, _, "return"),
          description: Nr(c, _)
        })
      );
    }
  }
  return i;
}
async function Uc(e, t) {
  try {
    return (await (await fetch(`https://huggingface.co/api/spaces/${e}/jwt`, {
      headers: {
        Authorization: `Bearer ${t}`
      }
    })).json()).token || !1;
  } catch (n) {
    return console.error(n), !1;
  }
}
function Pr(e, t, n) {
  for (; n.length > 1; )
    e = e[n.shift()];
  e[n.shift()] = t;
}
async function Ii(e, t = void 0, n = [], i = !1, r = void 0) {
  if (Array.isArray(e)) {
    let l = [];
    return await Promise.all(
      e.map(async (s, a) => {
        var o;
        let u = n.slice();
        u.push(a);
        const f = await Ii(
          e[a],
          i ? ((o = r == null ? void 0 : r.parameters[a]) == null ? void 0 : o.component) || void 0 : t,
          u,
          !1,
          r
        );
        l = l.concat(f);
      })
    ), l;
  } else {
    if (globalThis.Buffer && e instanceof globalThis.Buffer)
      return [
        {
          path: n,
          blob: t === "Image" ? !1 : new $l([e]),
          type: t
        }
      ];
    if (typeof e == "object") {
      let l = [];
      for (let s in e)
        if (e.hasOwnProperty(s)) {
          let a = n.slice();
          a.push(s), l = l.concat(
            await Ii(
              e[s],
              void 0,
              a,
              !1,
              r
            )
          );
        }
      return l;
    }
  }
  return [];
}
function Fc(e, t) {
  var n, i, r, l;
  return !(((i = (n = t == null ? void 0 : t.dependencies) == null ? void 0 : n[e]) == null ? void 0 : i.queue) === null ? t.enable_queue : (l = (r = t == null ? void 0 : t.dependencies) == null ? void 0 : r[e]) != null && l.queue) || !1;
}
async function Hr(e, t, n) {
  const i = {};
  if (n && (i.Authorization = `Bearer ${n}`), typeof window < "u" && window.gradio_config && location.origin !== "http://localhost:9876" && !window.gradio_config.dev_mode) {
    const r = window.gradio_config.root, l = window.gradio_config;
    return l.root = Ve(t, l.root, !1), { ...l, path: r };
  } else if (t) {
    let r = await e(`${t}/config`, {
      headers: i
    });
    if (r.status === 200) {
      const l = await r.json();
      return l.path = l.path ?? "", l.root = t, l;
    }
    throw new Error("Could not get config.");
  }
  throw new Error("No config or app endpoint found");
}
async function Li(e, t, n) {
  let i = t === "subdomain" ? `https://huggingface.co/api/spaces/by-subdomain/${e}` : `https://huggingface.co/api/spaces/${e}`, r, l;
  try {
    if (r = await fetch(i), l = r.status, l !== 200)
      throw new Error();
    r = await r.json();
  } catch {
    n({
      status: "error",
      load_status: "error",
      message: "Could not get space status",
      detail: "NOT_FOUND"
    });
    return;
  }
  if (!r || l !== 200)
    return;
  const {
    runtime: { stage: s },
    id: a
  } = r;
  switch (s) {
    case "STOPPED":
    case "SLEEPING":
      n({
        status: "sleeping",
        load_status: "pending",
        message: "Space is asleep. Waking it up...",
        detail: s
      }), setTimeout(() => {
        Li(e, t, n);
      }, 1e3);
      break;
    case "PAUSED":
      n({
        status: "paused",
        load_status: "error",
        message: "This space has been paused by the author. If you would like to try this demo, consider duplicating the space.",
        detail: s,
        discussions_enabled: await Br(a)
      });
      break;
    case "RUNNING":
    case "RUNNING_BUILDING":
      n({
        status: "running",
        load_status: "complete",
        message: "",
        detail: s
      });
      break;
    case "BUILDING":
      n({
        status: "building",
        load_status: "pending",
        message: "Space is building...",
        detail: s
      }), setTimeout(() => {
        Li(e, t, n);
      }, 1e3);
      break;
    default:
      n({
        status: "space_error",
        load_status: "error",
        message: "This space is experiencing an issue.",
        detail: s,
        discussions_enabled: await Br(a)
      });
      break;
  }
}
function Ir(e, t) {
  switch (e.msg) {
    case "send_data":
      return { type: "data" };
    case "send_hash":
      return { type: "hash" };
    case "queue_full":
      return {
        type: "update",
        status: {
          queue: !0,
          message: Oc,
          stage: "error",
          code: e.code,
          success: e.success
        }
      };
    case "estimation":
      return {
        type: "update",
        status: {
          queue: !0,
          stage: t || "pending",
          code: e.code,
          size: e.queue_size,
          position: e.rank,
          eta: e.rank_eta,
          success: e.success
        }
      };
    case "progress":
      return {
        type: "update",
        status: {
          queue: !0,
          stage: "pending",
          code: e.code,
          progress_data: e.progress_data,
          success: e.success
        }
      };
    case "log":
      return { type: "log", data: e };
    case "process_generating":
      return {
        type: "generating",
        status: {
          queue: !0,
          message: e.success ? null : e.output.error,
          stage: e.success ? "generating" : "error",
          code: e.code,
          progress_data: e.progress_data,
          eta: e.average_duration
        },
        data: e.success ? e.output : null
      };
    case "process_completed":
      return "error" in e.output ? {
        type: "update",
        status: {
          queue: !0,
          message: e.output.error,
          stage: "error",
          code: e.code,
          success: e.success
        }
      } : {
        type: "complete",
        status: {
          queue: !0,
          message: e.success ? void 0 : e.output.error,
          stage: e.success ? "complete" : "error",
          code: e.code,
          progress_data: e.progress_data,
          eta: e.output.average_duration
        },
        data: e.success ? e.output : null
      };
    case "process_starts":
      return {
        type: "update",
        status: {
          queue: !0,
          stage: "pending",
          code: e.code,
          size: e.rank,
          position: 0,
          success: e.success
        }
      };
  }
  return { type: "none", status: { stage: "error", queue: !0 } };
}
function ot() {
}
function Gc(e) {
  return e();
}
function qc(e) {
  e.forEach(Gc);
}
function zc(e) {
  return typeof e == "function";
}
function Vc(e, t) {
  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";
}
function jc(e, ...t) {
  if (e == null) {
    for (const i of t)
      i(void 0);
    return ot;
  }
  const n = e.subscribe(...t);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
const es = typeof window < "u";
let Lr = es ? () => window.performance.now() : () => Date.now(), ts = es ? (e) => requestAnimationFrame(e) : ot;
const yt = /* @__PURE__ */ new Set();
function ns(e) {
  yt.forEach((t) => {
    t.c(e) || (yt.delete(t), t.f());
  }), yt.size !== 0 && ts(ns);
}
function Xc(e) {
  let t;
  return yt.size === 0 && ts(ns), {
    promise: new Promise((n) => {
      yt.add(t = { c: e, f: n });
    }),
    abort() {
      yt.delete(t);
    }
  };
}
const mt = [];
function Wc(e, t) {
  return {
    subscribe: Yt(e, t).subscribe
  };
}
function Yt(e, t = ot) {
  let n;
  const i = /* @__PURE__ */ new Set();
  function r(a) {
    if (Vc(e, a) && (e = a, n)) {
      const o = !mt.length;
      for (const u of i)
        u[1](), mt.push(u, e);
      if (o) {
        for (let u = 0; u < mt.length; u += 2)
          mt[u][0](mt[u + 1]);
        mt.length = 0;
      }
    }
  }
  function l(a) {
    r(a(e));
  }
  function s(a, o = ot) {
    const u = [a, o];
    return i.add(u), i.size === 1 && (n = t(r, l) || ot), a(e), () => {
      i.delete(u), i.size === 0 && n && (n(), n = null);
    };
  }
  return { set: r, update: l, subscribe: s };
}
function Nt(e, t, n) {
  const i = !Array.isArray(e), r = i ? [e] : e;
  if (!r.every(Boolean))
    throw new Error("derived() expects stores as input, got a falsy value");
  const l = t.length < 2;
  return Wc(n, (s, a) => {
    let o = !1;
    const u = [];
    let f = 0, c = ot;
    const _ = () => {
      if (f)
        return;
      c();
      const g = t(i ? u[0] : u, s, a);
      l ? s(g) : c = zc(g) ? g : ot;
    }, h = r.map(
      (g, y) => jc(
        g,
        (v) => {
          u[y] = v, f &= ~(1 << y), o && _();
        },
        () => {
          f |= 1 << y;
        }
      )
    );
    return o = !0, _(), function() {
      qc(h), c(), o = !1;
    };
  });
}
function Or(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function Oi(e, t, n, i) {
  if (typeof n == "number" || Or(n)) {
    const r = i - n, l = (n - t) / (e.dt || 1 / 60), s = e.opts.stiffness * r, a = e.opts.damping * l, o = (s - a) * e.inv_mass, u = (l + o) * e.dt;
    return Math.abs(u) < e.opts.precision && Math.abs(r) < e.opts.precision ? i : (e.settled = !1, Or(n) ? new Date(n.getTime() + u) : n + u);
  } else {
    if (Array.isArray(n))
      return n.map(
        (r, l) => Oi(e, t[l], n[l], i[l])
      );
    if (typeof n == "object") {
      const r = {};
      for (const l in n)
        r[l] = Oi(e, t[l], n[l], i[l]);
      return r;
    } else
      throw new Error(`Cannot spring ${typeof n} values`);
  }
}
function Mr(e, t = {}) {
  const n = Yt(e), { stiffness: i = 0.15, damping: r = 0.8, precision: l = 0.01 } = t;
  let s, a, o, u = e, f = e, c = 1, _ = 0, h = !1;
  function g(v, p = {}) {
    f = v;
    const w = o = {};
    return e == null || p.hard || y.stiffness >= 1 && y.damping >= 1 ? (h = !0, s = Lr(), u = v, n.set(e = f), Promise.resolve()) : (p.soft && (_ = 1 / ((p.soft === !0 ? 0.5 : +p.soft) * 60), c = 0), a || (s = Lr(), h = !1, a = Xc((b) => {
      if (h)
        return h = !1, a = null, !1;
      c = Math.min(c + _, 1);
      const d = {
        inv_mass: c,
        opts: y,
        settled: !0,
        dt: (b - s) * 60 / 1e3
      }, m = Oi(d, u, e, f);
      return s = b, u = e, n.set(e = m), d.settled && (a = null), !d.settled;
    })), new Promise((b) => {
      a.promise.then(() => {
        w === o && b();
      });
    }));
  }
  const y = {
    set: g,
    update: (v, p) => g(v(f, e), p),
    subscribe: n.subscribe,
    stiffness: i,
    damping: r,
    precision: l
  };
  return y;
}
function xc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Zc = function(t) {
  return Jc(t) && !Yc(t);
};
function Jc(e) {
  return !!e && typeof e == "object";
}
function Yc(e) {
  var t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || $c(e);
}
var Qc = typeof Symbol == "function" && Symbol.for, Kc = Qc ? Symbol.for("react.element") : 60103;
function $c(e) {
  return e.$$typeof === Kc;
}
function e_(e) {
  return Array.isArray(e) ? [] : {};
}
function Vt(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? Et(e_(e), e, t) : e;
}
function t_(e, t, n) {
  return e.concat(t).map(function(i) {
    return Vt(i, n);
  });
}
function n_(e, t) {
  if (!t.customMerge)
    return Et;
  var n = t.customMerge(e);
  return typeof n == "function" ? n : Et;
}
function i_(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return Object.propertyIsEnumerable.call(e, t);
  }) : [];
}
function Rr(e) {
  return Object.keys(e).concat(i_(e));
}
function is(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function r_(e, t) {
  return is(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function l_(e, t, n) {
  var i = {};
  return n.isMergeableObject(e) && Rr(e).forEach(function(r) {
    i[r] = Vt(e[r], n);
  }), Rr(t).forEach(function(r) {
    r_(e, r) || (is(e, r) && n.isMergeableObject(t[r]) ? i[r] = n_(r, n)(e[r], t[r], n) : i[r] = Vt(t[r], n));
  }), i;
}
function Et(e, t, n) {
  n = n || {}, n.arrayMerge = n.arrayMerge || t_, n.isMergeableObject = n.isMergeableObject || Zc, n.cloneUnlessOtherwiseSpecified = Vt;
  var i = Array.isArray(t), r = Array.isArray(e), l = i === r;
  return l ? i ? n.arrayMerge(e, t, n) : l_(e, t, n) : Vt(t, n);
}
Et.all = function(t, n) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(i, r) {
    return Et(i, r, n);
  }, {});
};
var s_ = Et, o_ = s_;
const a_ = /* @__PURE__ */ xc(o_);
var Mi = function(e, t) {
  return Mi = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, i) {
    n.__proto__ = i;
  } || function(n, i) {
    for (var r in i)
      Object.prototype.hasOwnProperty.call(i, r) && (n[r] = i[r]);
  }, Mi(e, t);
};
function zn(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Mi(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var D = function() {
  return D = Object.assign || function(t) {
    for (var n, i = 1, r = arguments.length; i < r; i++) {
      n = arguments[i];
      for (var l in n)
        Object.prototype.hasOwnProperty.call(n, l) && (t[l] = n[l]);
    }
    return t;
  }, D.apply(this, arguments);
};
function mi(e, t, n) {
  if (n || arguments.length === 2)
    for (var i = 0, r = t.length, l; i < r; i++)
      (l || !(i in t)) && (l || (l = Array.prototype.slice.call(t, 0, i)), l[i] = t[i]);
  return e.concat(l || Array.prototype.slice.call(t));
}
var O;
(function(e) {
  e[e.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE", e[e.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT", e[e.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT", e[e.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE", e[e.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE", e[e.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE", e[e.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON", e[e.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON", e[e.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON", e[e.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON", e[e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE", e[e.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS", e[e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE", e[e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE", e[e.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR", e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR", e[e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT", e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT", e[e.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR", e[e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR", e[e.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR", e[e.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE", e[e.INVALID_TAG = 23] = "INVALID_TAG", e[e.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME", e[e.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG", e[e.UNCLOSED_TAG = 27] = "UNCLOSED_TAG";
})(O || (O = {}));
var q;
(function(e) {
  e[e.literal = 0] = "literal", e[e.argument = 1] = "argument", e[e.number = 2] = "number", e[e.date = 3] = "date", e[e.time = 4] = "time", e[e.select = 5] = "select", e[e.plural = 6] = "plural", e[e.pound = 7] = "pound", e[e.tag = 8] = "tag";
})(q || (q = {}));
var St;
(function(e) {
  e[e.number = 0] = "number", e[e.dateTime = 1] = "dateTime";
})(St || (St = {}));
function Dr(e) {
  return e.type === q.literal;
}
function u_(e) {
  return e.type === q.argument;
}
function rs(e) {
  return e.type === q.number;
}
function ls(e) {
  return e.type === q.date;
}
function ss(e) {
  return e.type === q.time;
}
function os(e) {
  return e.type === q.select;
}
function as(e) {
  return e.type === q.plural;
}
function f_(e) {
  return e.type === q.pound;
}
function us(e) {
  return e.type === q.tag;
}
function fs(e) {
  return !!(e && typeof e == "object" && e.type === St.number);
}
function Ri(e) {
  return !!(e && typeof e == "object" && e.type === St.dateTime);
}
var cs = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/, c_ = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function __(e) {
  var t = {};
  return e.replace(c_, function(n) {
    var i = n.length;
    switch (n[0]) {
      case "G":
        t.era = i === 4 ? "long" : i === 5 ? "narrow" : "short";
        break;
      case "y":
        t.year = i === 2 ? "2-digit" : "numeric";
        break;
      case "Y":
      case "u":
      case "U":
      case "r":
        throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
      case "q":
      case "Q":
        throw new RangeError("`q/Q` (quarter) patterns are not supported");
      case "M":
      case "L":
        t.month = ["numeric", "2-digit", "short", "long", "narrow"][i - 1];
        break;
      case "w":
      case "W":
        throw new RangeError("`w/W` (week) patterns are not supported");
      case "d":
        t.day = ["numeric", "2-digit"][i - 1];
        break;
      case "D":
      case "F":
      case "g":
        throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
      case "E":
        t.weekday = i === 4 ? "short" : i === 5 ? "narrow" : "short";
        break;
      case "e":
        if (i < 4)
          throw new RangeError("`e..eee` (weekday) patterns are not supported");
        t.weekday = ["short", "long", "narrow", "short"][i - 4];
        break;
      case "c":
        if (i < 4)
          throw new RangeError("`c..ccc` (weekday) patterns are not supported");
        t.weekday = ["short", "long", "narrow", "short"][i - 4];
        break;
      case "a":
        t.hour12 = !0;
        break;
      case "b":
      case "B":
        throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
      case "h":
        t.hourCycle = "h12", t.hour = ["numeric", "2-digit"][i - 1];
        break;
      case "H":
        t.hourCycle = "h23", t.hour = ["numeric", "2-digit"][i - 1];
        break;
      case "K":
        t.hourCycle = "h11", t.hour = ["numeric", "2-digit"][i - 1];
        break;
      case "k":
        t.hourCycle = "h24", t.hour = ["numeric", "2-digit"][i - 1];
        break;
      case "j":
      case "J":
      case "C":
        throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
      case "m":
        t.minute = ["numeric", "2-digit"][i - 1];
        break;
      case "s":
        t.second = ["numeric", "2-digit"][i - 1];
        break;
      case "S":
      case "A":
        throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
      case "z":
        t.timeZoneName = i < 4 ? "short" : "long";
        break;
      case "Z":
      case "O":
      case "v":
      case "V":
      case "X":
      case "x":
        throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
    }
    return "";
  }), t;
}
var h_ = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
function d_(e) {
  if (e.length === 0)
    throw new Error("Number skeleton cannot be empty");
  for (var t = e.split(h_).filter(function(_) {
    return _.length > 0;
  }), n = [], i = 0, r = t; i < r.length; i++) {
    var l = r[i], s = l.split("/");
    if (s.length === 0)
      throw new Error("Invalid number skeleton");
    for (var a = s[0], o = s.slice(1), u = 0, f = o; u < f.length; u++) {
      var c = f[u];
      if (c.length === 0)
        throw new Error("Invalid number skeleton");
    }
    n.push({ stem: a, options: o });
  }
  return n;
}
function m_(e) {
  return e.replace(/^(.*?)-/, "");
}
var Ur = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g, _s = /^(@+)?(\+|#+)?[rs]?$/g, g_ = /(\*)(0+)|(#+)(0+)|(0+)/g, hs = /^(0+)$/;
function Fr(e) {
  var t = {};
  return e[e.length - 1] === "r" ? t.roundingPriority = "morePrecision" : e[e.length - 1] === "s" && (t.roundingPriority = "lessPrecision"), e.replace(_s, function(n, i, r) {
    return typeof r != "string" ? (t.minimumSignificantDigits = i.length, t.maximumSignificantDigits = i.length) : r === "+" ? t.minimumSignificantDigits = i.length : i[0] === "#" ? t.maximumSignificantDigits = i.length : (t.minimumSignificantDigits = i.length, t.maximumSignificantDigits = i.length + (typeof r == "string" ? r.length : 0)), "";
  }), t;
}
function ds(e) {
  switch (e) {
    case "sign-auto":
      return {
        signDisplay: "auto"
      };
    case "sign-accounting":
    case "()":
      return {
        currencySign: "accounting"
      };
    case "sign-always":
    case "+!":
      return {
        signDisplay: "always"
      };
    case "sign-accounting-always":
    case "()!":
      return {
        signDisplay: "always",
        currencySign: "accounting"
      };
    case "sign-except-zero":
    case "+?":
      return {
        signDisplay: "exceptZero"
      };
    case "sign-accounting-except-zero":
    case "()?":
      return {
        signDisplay: "exceptZero",
        currencySign: "accounting"
      };
    case "sign-never":
    case "+_":
      return {
        signDisplay: "never"
      };
  }
}
function p_(e) {
  var t;
  if (e[0] === "E" && e[1] === "E" ? (t = {
    notation: "engineering"
  }, e = e.slice(2)) : e[0] === "E" && (t = {
    notation: "scientific"
  }, e = e.slice(1)), t) {
    var n = e.slice(0, 2);
    if (n === "+!" ? (t.signDisplay = "always", e = e.slice(2)) : n === "+?" && (t.signDisplay = "exceptZero", e = e.slice(2)), !hs.test(e))
      throw new Error("Malformed concise eng/scientific notation");
    t.minimumIntegerDigits = e.length;
  }
  return t;
}
function Gr(e) {
  var t = {}, n = ds(e);
  return n || t;
}
function b_(e) {
  for (var t = {}, n = 0, i = e; n < i.length; n++) {
    var r = i[n];
    switch (r.stem) {
      case "percent":
      case "%":
        t.style = "percent";
        continue;
      case "%x100":
        t.style = "percent", t.scale = 100;
        continue;
      case "currency":
        t.style = "currency", t.currency = r.options[0];
        continue;
      case "group-off":
      case ",_":
        t.useGrouping = !1;
        continue;
      case "precision-integer":
      case ".":
        t.maximumFractionDigits = 0;
        continue;
      case "measure-unit":
      case "unit":
        t.style = "unit", t.unit = m_(r.options[0]);
        continue;
      case "compact-short":
      case "K":
        t.notation = "compact", t.compactDisplay = "short";
        continue;
      case "compact-long":
      case "KK":
        t.notation = "compact", t.compactDisplay = "long";
        continue;
      case "scientific":
        t = D(D(D({}, t), { notation: "scientific" }), r.options.reduce(function(o, u) {
          return D(D({}, o), Gr(u));
        }, {}));
        continue;
      case "engineering":
        t = D(D(D({}, t), { notation: "engineering" }), r.options.reduce(function(o, u) {
          return D(D({}, o), Gr(u));
        }, {}));
        continue;
      case "notation-simple":
        t.notation = "standard";
        continue;
      case "unit-width-narrow":
        t.currencyDisplay = "narrowSymbol", t.unitDisplay = "narrow";
        continue;
      case "unit-width-short":
        t.currencyDisplay = "code", t.unitDisplay = "short";
        continue;
      case "unit-width-full-name":
        t.currencyDisplay = "name", t.unitDisplay = "long";
        continue;
      case "unit-width-iso-code":
        t.currencyDisplay = "symbol";
        continue;
      case "scale":
        t.scale = parseFloat(r.options[0]);
        continue;
      case "integer-width":
        if (r.options.length > 1)
          throw new RangeError("integer-width stems only accept a single optional option");
        r.options[0].replace(g_, function(o, u, f, c, _, h) {
          if (u)
            t.minimumIntegerDigits = f.length;
          else {
            if (c && _)
              throw new Error("We currently do not support maximum integer digits");
            if (h)
              throw new Error("We currently do not support exact integer digits");
          }
          return "";
        });
        continue;
    }
    if (hs.test(r.stem)) {
      t.minimumIntegerDigits = r.stem.length;
      continue;
    }
    if (Ur.test(r.stem)) {
      if (r.options.length > 1)
        throw new RangeError("Fraction-precision stems only accept a single optional option");
      r.stem.replace(Ur, function(o, u, f, c, _, h) {
        return f === "*" ? t.minimumFractionDigits = u.length : c && c[0] === "#" ? t.maximumFractionDigits = c.length : _ && h ? (t.minimumFractionDigits = _.length, t.maximumFractionDigits = _.length + h.length) : (t.minimumFractionDigits = u.length, t.maximumFractionDigits = u.length), "";
      });
      var l = r.options[0];
      l === "w" ? t = D(D({}, t), { trailingZeroDisplay: "stripIfInteger" }) : l && (t = D(D({}, t), Fr(l)));
      continue;
    }
    if (_s.test(r.stem)) {
      t = D(D({}, t), Fr(r.stem));
      continue;
    }
    var s = ds(r.stem);
    s && (t = D(D({}, t), s));
    var a = p_(r.stem);
    a && (t = D(D({}, t), a));
  }
  return t;
}
var an = {
  AX: [
    "H"
  ],
  BQ: [
    "H"
  ],
  CP: [
    "H"
  ],
  CZ: [
    "H"
  ],
  DK: [
    "H"
  ],
  FI: [
    "H"
  ],
  ID: [
    "H"
  ],
  IS: [
    "H"
  ],
  ML: [
    "H"
  ],
  NE: [
    "H"
  ],
  RU: [
    "H"
  ],
  SE: [
    "H"
  ],
  SJ: [
    "H"
  ],
  SK: [
    "H"
  ],
  AS: [
    "h",
    "H"
  ],
  BT: [
    "h",
    "H"
  ],
  DJ: [
    "h",
    "H"
  ],
  ER: [
    "h",
    "H"
  ],
  GH: [
    "h",
    "H"
  ],
  IN: [
    "h",
    "H"
  ],
  LS: [
    "h",
    "H"
  ],
  PG: [
    "h",
    "H"
  ],
  PW: [
    "h",
    "H"
  ],
  SO: [
    "h",
    "H"
  ],
  TO: [
    "h",
    "H"
  ],
  VU: [
    "h",
    "H"
  ],
  WS: [
    "h",
    "H"
  ],
  "001": [
    "H",
    "h"
  ],
  AL: [
    "h",
    "H",
    "hB"
  ],
  TD: [
    "h",
    "H",
    "hB"
  ],
  "ca-ES": [
    "H",
    "h",
    "hB"
  ],
  CF: [
    "H",
    "h",
    "hB"
  ],
  CM: [
    "H",
    "h",
    "hB"
  ],
  "fr-CA": [
    "H",
    "h",
    "hB"
  ],
  "gl-ES": [
    "H",
    "h",
    "hB"
  ],
  "it-CH": [
    "H",
    "h",
    "hB"
  ],
  "it-IT": [
    "H",
    "h",
    "hB"
  ],
  LU: [
    "H",
    "h",
    "hB"
  ],
  NP: [
    "H",
    "h",
    "hB"
  ],
  PF: [
    "H",
    "h",
    "hB"
  ],
  SC: [
    "H",
    "h",
    "hB"
  ],
  SM: [
    "H",
    "h",
    "hB"
  ],
  SN: [
    "H",
    "h",
    "hB"
  ],
  TF: [
    "H",
    "h",
    "hB"
  ],
  VA: [
    "H",
    "h",
    "hB"
  ],
  CY: [
    "h",
    "H",
    "hb",
    "hB"
  ],
  GR: [
    "h",
    "H",
    "hb",
    "hB"
  ],
  CO: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  DO: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  KP: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  KR: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  NA: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  PA: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  PR: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  VE: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  AC: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  AI: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  BW: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  BZ: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CC: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CK: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CX: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  DG: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  FK: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  GB: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  GG: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  GI: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  IE: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  IM: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  IO: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  JE: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  LT: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  MK: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  MN: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  MS: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NF: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NG: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NR: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NU: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  PN: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  SH: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  SX: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  TA: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  ZA: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "af-ZA": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  AR: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  CL: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  CR: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  CU: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  EA: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-BO": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-BR": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-EC": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-ES": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-GQ": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-PE": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  GT: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  HN: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  IC: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  KG: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  KM: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  LK: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  MA: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  MX: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  NI: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  PY: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  SV: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  UY: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  JP: [
    "H",
    "h",
    "K"
  ],
  AD: [
    "H",
    "hB"
  ],
  AM: [
    "H",
    "hB"
  ],
  AO: [
    "H",
    "hB"
  ],
  AT: [
    "H",
    "hB"
  ],
  AW: [
    "H",
    "hB"
  ],
  BE: [
    "H",
    "hB"
  ],
  BF: [
    "H",
    "hB"
  ],
  BJ: [
    "H",
    "hB"
  ],
  BL: [
    "H",
    "hB"
  ],
  BR: [
    "H",
    "hB"
  ],
  CG: [
    "H",
    "hB"
  ],
  CI: [
    "H",
    "hB"
  ],
  CV: [
    "H",
    "hB"
  ],
  DE: [
    "H",
    "hB"
  ],
  EE: [
    "H",
    "hB"
  ],
  FR: [
    "H",
    "hB"
  ],
  GA: [
    "H",
    "hB"
  ],
  GF: [
    "H",
    "hB"
  ],
  GN: [
    "H",
    "hB"
  ],
  GP: [
    "H",
    "hB"
  ],
  GW: [
    "H",
    "hB"
  ],
  HR: [
    "H",
    "hB"
  ],
  IL: [
    "H",
    "hB"
  ],
  IT: [
    "H",
    "hB"
  ],
  KZ: [
    "H",
    "hB"
  ],
  MC: [
    "H",
    "hB"
  ],
  MD: [
    "H",
    "hB"
  ],
  MF: [
    "H",
    "hB"
  ],
  MQ: [
    "H",
    "hB"
  ],
  MZ: [
    "H",
    "hB"
  ],
  NC: [
    "H",
    "hB"
  ],
  NL: [
    "H",
    "hB"
  ],
  PM: [
    "H",
    "hB"
  ],
  PT: [
    "H",
    "hB"
  ],
  RE: [
    "H",
    "hB"
  ],
  RO: [
    "H",
    "hB"
  ],
  SI: [
    "H",
    "hB"
  ],
  SR: [
    "H",
    "hB"
  ],
  ST: [
    "H",
    "hB"
  ],
  TG: [
    "H",
    "hB"
  ],
  TR: [
    "H",
    "hB"
  ],
  WF: [
    "H",
    "hB"
  ],
  YT: [
    "H",
    "hB"
  ],
  BD: [
    "h",
    "hB",
    "H"
  ],
  PK: [
    "h",
    "hB",
    "H"
  ],
  AZ: [
    "H",
    "hB",
    "h"
  ],
  BA: [
    "H",
    "hB",
    "h"
  ],
  BG: [
    "H",
    "hB",
    "h"
  ],
  CH: [
    "H",
    "hB",
    "h"
  ],
  GE: [
    "H",
    "hB",
    "h"
  ],
  LI: [
    "H",
    "hB",
    "h"
  ],
  ME: [
    "H",
    "hB",
    "h"
  ],
  RS: [
    "H",
    "hB",
    "h"
  ],
  UA: [
    "H",
    "hB",
    "h"
  ],
  UZ: [
    "H",
    "hB",
    "h"
  ],
  XK: [
    "H",
    "hB",
    "h"
  ],
  AG: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  AU: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BB: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BS: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  CA: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  DM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "en-001": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  FJ: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  FM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GD: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GU: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GY: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  JM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  KI: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  KN: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  KY: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  LC: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  LR: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  MH: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  MP: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  MW: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  NZ: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SB: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SG: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SL: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SS: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SZ: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  TC: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  TT: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  UM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  US: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  VC: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  VG: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  VI: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  ZM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BO: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  EC: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  ES: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  GQ: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  PE: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  AE: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "ar-001": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  BH: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  DZ: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  EG: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  EH: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  HK: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  IQ: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  JO: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  KW: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  LB: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  LY: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  MO: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  MR: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  OM: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  PH: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  PS: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  QA: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  SA: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  SD: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  SY: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  TN: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  YE: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  AF: [
    "H",
    "hb",
    "hB",
    "h"
  ],
  LA: [
    "H",
    "hb",
    "hB",
    "h"
  ],
  CN: [
    "H",
    "hB",
    "hb",
    "h"
  ],
  LV: [
    "H",
    "hB",
    "hb",
    "h"
  ],
  TL: [
    "H",
    "hB",
    "hb",
    "h"
  ],
  "zu-ZA": [
    "H",
    "hB",
    "hb",
    "h"
  ],
  CD: [
    "hB",
    "H"
  ],
  IR: [
    "hB",
    "H"
  ],
  "hi-IN": [
    "hB",
    "h",
    "H"
  ],
  "kn-IN": [
    "hB",
    "h",
    "H"
  ],
  "ml-IN": [
    "hB",
    "h",
    "H"
  ],
  "te-IN": [
    "hB",
    "h",
    "H"
  ],
  KH: [
    "hB",
    "h",
    "H",
    "hb"
  ],
  "ta-IN": [
    "hB",
    "h",
    "hb",
    "H"
  ],
  BN: [
    "hb",
    "hB",
    "h",
    "H"
  ],
  MY: [
    "hb",
    "hB",
    "h",
    "H"
  ],
  ET: [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "gu-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "mr-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "pa-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  TW: [
    "hB",
    "hb",
    "h",
    "H"
  ],
  KE: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  MM: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  TZ: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  UG: [
    "hB",
    "hb",
    "H",
    "h"
  ]
};
function w_(e, t) {
  for (var n = "", i = 0; i < e.length; i++) {
    var r = e.charAt(i);
    if (r === "j") {
      for (var l = 0; i + 1 < e.length && e.charAt(i + 1) === r; )
        l++, i++;
      var s = 1 + (l & 1), a = l < 2 ? 1 : 3 + (l >> 1), o = "a", u = v_(t);
      for ((u == "H" || u == "k") && (a = 0); a-- > 0; )
        n += o;
      for (; s-- > 0; )
        n = u + n;
    } else
      r === "J" ? n += "H" : n += r;
  }
  return n;
}
function v_(e) {
  var t = e.hourCycle;
  if (t === void 0 && // @ts-ignore hourCycle(s) is not identified yet
  e.hourCycles && // @ts-ignore
  e.hourCycles.length && (t = e.hourCycles[0]), t)
    switch (t) {
      case "h24":
        return "k";
      case "h23":
        return "H";
      case "h12":
        return "h";
      case "h11":
        return "K";
      default:
        throw new Error("Invalid hourCycle");
    }
  var n = e.language, i;
  n !== "root" && (i = e.maximize().region);
  var r = an[i || ""] || an[n || ""] || an["".concat(n, "-001")] || an["001"];
  return r[0];
}
var gi, y_ = new RegExp("^".concat(cs.source, "*")), E_ = new RegExp("".concat(cs.source, "*$"));
function M(e, t) {
  return { start: e, end: t };
}
var S_ = !!String.prototype.startsWith, k_ = !!String.fromCodePoint, A_ = !!Object.fromEntries, T_ = !!String.prototype.codePointAt, B_ = !!String.prototype.trimStart, C_ = !!String.prototype.trimEnd, N_ = !!Number.isSafeInteger, P_ = N_ ? Number.isSafeInteger : function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e && Math.abs(e) <= 9007199254740991;
}, Di = !0;
try {
  var H_ = gs("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  Di = ((gi = H_.exec("a")) === null || gi === void 0 ? void 0 : gi[0]) === "a";
} catch {
  Di = !1;
}
var qr = S_ ? (
  // Native
  function(t, n, i) {
    return t.startsWith(n, i);
  }
) : (
  // For IE11
  function(t, n, i) {
    return t.slice(i, i + n.length) === n;
  }
), Ui = k_ ? String.fromCodePoint : (
  // IE11
  function() {
    for (var t = [], n = 0; n < arguments.length; n++)
      t[n] = arguments[n];
    for (var i = "", r = t.length, l = 0, s; r > l; ) {
      if (s = t[l++], s > 1114111)
        throw RangeError(s + " is not a valid code point");
      i += s < 65536 ? String.fromCharCode(s) : String.fromCharCode(((s -= 65536) >> 10) + 55296, s % 1024 + 56320);
    }
    return i;
  }
), zr = (
  // native
  A_ ? Object.fromEntries : (
    // Ponyfill
    function(t) {
      for (var n = {}, i = 0, r = t; i < r.length; i++) {
        var l = r[i], s = l[0], a = l[1];
        n[s] = a;
      }
      return n;
    }
  )
), ms = T_ ? (
  // Native
  function(t, n) {
    return t.codePointAt(n);
  }
) : (
  // IE 11
  function(t, n) {
    var i = t.length;
    if (!(n < 0 || n >= i)) {
      var r = t.charCodeAt(n), l;
      return r < 55296 || r > 56319 || n + 1 === i || (l = t.charCodeAt(n + 1)) < 56320 || l > 57343 ? r : (r - 55296 << 10) + (l - 56320) + 65536;
    }
  }
), I_ = B_ ? (
  // Native
  function(t) {
    return t.trimStart();
  }
) : (
  // Ponyfill
  function(t) {
    return t.replace(y_, "");
  }
), L_ = C_ ? (
  // Native
  function(t) {
    return t.trimEnd();
  }
) : (
  // Ponyfill
  function(t) {
    return t.replace(E_, "");
  }
);
function gs(e, t) {
  return new RegExp(e, t);
}
var Fi;
if (Di) {
  var Vr = gs("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  Fi = function(t, n) {
    var i;
    Vr.lastIndex = n;
    var r = Vr.exec(t);
    return (i = r[1]) !== null && i !== void 0 ? i : "";
  };
} else
  Fi = function(t, n) {
    for (var i = []; ; ) {
      var r = ms(t, n);
      if (r === void 0 || ps(r) || D_(r))
        break;
      i.push(r), n += r >= 65536 ? 2 : 1;
    }
    return Ui.apply(void 0, i);
  };
var O_ = (
  /** @class */
  function() {
    function e(t, n) {
      n === void 0 && (n = {}), this.message = t, this.position = { offset: 0, line: 1, column: 1 }, this.ignoreTag = !!n.ignoreTag, this.locale = n.locale, this.requiresOtherClause = !!n.requiresOtherClause, this.shouldParseSkeletons = !!n.shouldParseSkeletons;
    }
    return e.prototype.parse = function() {
      if (this.offset() !== 0)
        throw Error("parser can only be used once");
      return this.parseMessage(0, "", !1);
    }, e.prototype.parseMessage = function(t, n, i) {
      for (var r = []; !this.isEOF(); ) {
        var l = this.char();
        if (l === 123) {
          var s = this.parseArgument(t, i);
          if (s.err)
            return s;
          r.push(s.val);
        } else {
          if (l === 125 && t > 0)
            break;
          if (l === 35 && (n === "plural" || n === "selectordinal")) {
            var a = this.clonePosition();
            this.bump(), r.push({
              type: q.pound,
              location: M(a, this.clonePosition())
            });
          } else if (l === 60 && !this.ignoreTag && this.peek() === 47) {
            if (i)
              break;
            return this.error(O.UNMATCHED_CLOSING_TAG, M(this.clonePosition(), this.clonePosition()));
          } else if (l === 60 && !this.ignoreTag && Gi(this.peek() || 0)) {
            var s = this.parseTag(t, n);
            if (s.err)
              return s;
            r.push(s.val);
          } else {
            var s = this.parseLiteral(t, n);
            if (s.err)
              return s;
            r.push(s.val);
          }
        }
      }
      return { val: r, err: null };
    }, e.prototype.parseTag = function(t, n) {
      var i = this.clonePosition();
      this.bump();
      var r = this.parseTagName();
      if (this.bumpSpace(), this.bumpIf("/>"))
        return {
          val: {
            type: q.literal,
            value: "<".concat(r, "/>"),
            location: M(i, this.clonePosition())
          },
          err: null
        };
      if (this.bumpIf(">")) {
        var l = this.parseMessage(t + 1, n, !0);
        if (l.err)
          return l;
        var s = l.val, a = this.clonePosition();
        if (this.bumpIf("</")) {
          if (this.isEOF() || !Gi(this.char()))
            return this.error(O.INVALID_TAG, M(a, this.clonePosition()));
          var o = this.clonePosition(), u = this.parseTagName();
          return r !== u ? this.error(O.UNMATCHED_CLOSING_TAG, M(o, this.clonePosition())) : (this.bumpSpace(), this.bumpIf(">") ? {
            val: {
              type: q.tag,
              value: r,
              children: s,
              location: M(i, this.clonePosition())
            },
            err: null
          } : this.error(O.INVALID_TAG, M(a, this.clonePosition())));
        } else
          return this.error(O.UNCLOSED_TAG, M(i, this.clonePosition()));
      } else
        return this.error(O.INVALID_TAG, M(i, this.clonePosition()));
    }, e.prototype.parseTagName = function() {
      var t = this.offset();
      for (this.bump(); !this.isEOF() && R_(this.char()); )
        this.bump();
      return this.message.slice(t, this.offset());
    }, e.prototype.parseLiteral = function(t, n) {
      for (var i = this.clonePosition(), r = ""; ; ) {
        var l = this.tryParseQuote(n);
        if (l) {
          r += l;
          continue;
        }
        var s = this.tryParseUnquoted(t, n);
        if (s) {
          r += s;
          continue;
        }
        var a = this.tryParseLeftAngleBracket();
        if (a) {
          r += a;
          continue;
        }
        break;
      }
      var o = M(i, this.clonePosition());
      return {
        val: { type: q.literal, value: r, location: o },
        err: null
      };
    }, e.prototype.tryParseLeftAngleBracket = function() {
      return !this.isEOF() && this.char() === 60 && (this.ignoreTag || // If at the opening tag or closing tag position, bail.
      !M_(this.peek() || 0)) ? (this.bump(), "<") : null;
    }, e.prototype.tryParseQuote = function(t) {
      if (this.isEOF() || this.char() !== 39)
        return null;
      switch (this.peek()) {
        case 39:
          return this.bump(), this.bump(), "'";
        case 123:
        case 60:
        case 62:
        case 125:
          break;
        case 35:
          if (t === "plural" || t === "selectordinal")
            break;
          return null;
        default:
          return null;
      }
      this.bump();
      var n = [this.char()];
      for (this.bump(); !this.isEOF(); ) {
        var i = this.char();
        if (i === 39)
          if (this.peek() === 39)
            n.push(39), this.bump();
          else {
            this.bump();
            break;
          }
        else
          n.push(i);
        this.bump();
      }
      return Ui.apply(void 0, n);
    }, e.prototype.tryParseUnquoted = function(t, n) {
      if (this.isEOF())
        return null;
      var i = this.char();
      return i === 60 || i === 123 || i === 35 && (n === "plural" || n === "selectordinal") || i === 125 && t > 0 ? null : (this.bump(), Ui(i));
    }, e.prototype.parseArgument = function(t, n) {
      var i = this.clonePosition();
      if (this.bump(), this.bumpSpace(), this.isEOF())
        return this.error(O.EXPECT_ARGUMENT_CLOSING_BRACE, M(i, this.clonePosition()));
      if (this.char() === 125)
        return this.bump(), this.error(O.EMPTY_ARGUMENT, M(i, this.clonePosition()));
      var r = this.parseIdentifierIfPossible().value;
      if (!r)
        return this.error(O.MALFORMED_ARGUMENT, M(i, this.clonePosition()));
      if (this.bumpSpace(), this.isEOF())
        return this.error(O.EXPECT_ARGUMENT_CLOSING_BRACE, M(i, this.clonePosition()));
      switch (this.char()) {
        case 125:
          return this.bump(), {
            val: {
              type: q.argument,
              // value does not include the opening and closing braces.
              value: r,
              location: M(i, this.clonePosition())
            },
            err: null
          };
        case 44:
          return this.bump(), this.bumpSpace(), this.isEOF() ? this.error(O.EXPECT_ARGUMENT_CLOSING_BRACE, M(i, this.clonePosition())) : this.parseArgumentOptions(t, n, r, i);
        default:
          return this.error(O.MALFORMED_ARGUMENT, M(i, this.clonePosition()));
      }
    }, e.prototype.parseIdentifierIfPossible = function() {
      var t = this.clonePosition(), n = this.offset(), i = Fi(this.message, n), r = n + i.length;
      this.bumpTo(r);
      var l = this.clonePosition(), s = M(t, l);
      return { value: i, location: s };
    }, e.prototype.parseArgumentOptions = function(t, n, i, r) {
      var l, s = this.clonePosition(), a = this.parseIdentifierIfPossible().value, o = this.clonePosition();
      switch (a) {
        case "":
          return this.error(O.EXPECT_ARGUMENT_TYPE, M(s, o));
        case "number":
        case "date":
        case "time": {
          this.bumpSpace();
          var u = null;
          if (this.bumpIf(",")) {
            this.bumpSpace();
            var f = this.clonePosition(), c = this.parseSimpleArgStyleIfPossible();
            if (c.err)
              return c;
            var _ = L_(c.val);
            if (_.length === 0)
              return this.error(O.EXPECT_ARGUMENT_STYLE, M(this.clonePosition(), this.clonePosition()));
            var h = M(f, this.clonePosition());
            u = { style: _, styleLocation: h };
          }
          var g = this.tryParseArgumentClose(r);
          if (g.err)
            return g;
          var y = M(r, this.clonePosition());
          if (u && qr(u == null ? void 0 : u.style, "::", 0)) {
            var v = I_(u.style.slice(2));
            if (a === "number") {
              var c = this.parseNumberSkeletonFromString(v, u.styleLocation);
              return c.err ? c : {
                val: { type: q.number, value: i, location: y, style: c.val },
                err: null
              };
            } else {
              if (v.length === 0)
                return this.error(O.EXPECT_DATE_TIME_SKELETON, y);
              var p = v;
              this.locale && (p = w_(v, this.locale));
              var _ = {
                type: St.dateTime,
                pattern: p,
                location: u.styleLocation,
                parsedOptions: this.shouldParseSkeletons ? __(p) : {}
              }, w = a === "date" ? q.date : q.time;
              return {
                val: { type: w, value: i, location: y, style: _ },
                err: null
              };
            }
          }
          return {
            val: {
              type: a === "number" ? q.number : a === "date" ? q.date : q.time,
              value: i,
              location: y,
              style: (l = u == null ? void 0 : u.style) !== null && l !== void 0 ? l : null
            },
            err: null
          };
        }
        case "plural":
        case "selectordinal":
        case "select": {
          var b = this.clonePosition();
          if (this.bumpSpace(), !this.bumpIf(","))
            return this.error(O.EXPECT_SELECT_ARGUMENT_OPTIONS, M(b, D({}, b)));
          this.bumpSpace();
          var d = this.parseIdentifierIfPossible(), m = 0;
          if (a !== "select" && d.value === "offset") {
            if (!this.bumpIf(":"))
              return this.error(O.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, M(this.clonePosition(), this.clonePosition()));
            this.bumpSpace();
            var c = this.tryParseDecimalInteger(O.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, O.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
            if (c.err)
              return c;
            this.bumpSpace(), d = this.parseIdentifierIfPossible(), m = c.val;
          }
          var B = this.tryParsePluralOrSelectOptions(t, a, n, d);
          if (B.err)
            return B;
          var g = this.tryParseArgumentClose(r);
          if (g.err)
            return g;
          var P = M(r, this.clonePosition());
          return a === "select" ? {
            val: {
              type: q.select,
              value: i,
              options: zr(B.val),
              location: P
            },
            err: null
          } : {
            val: {
              type: q.plural,
              value: i,
              options: zr(B.val),
              offset: m,
              pluralType: a === "plural" ? "cardinal" : "ordinal",
              location: P
            },
            err: null
          };
        }
        default:
          return this.error(O.INVALID_ARGUMENT_TYPE, M(s, o));
      }
    }, e.prototype.tryParseArgumentClose = function(t) {
      return this.isEOF() || this.char() !== 125 ? this.error(O.EXPECT_ARGUMENT_CLOSING_BRACE, M(t, this.clonePosition())) : (this.bump(), { val: !0, err: null });
    }, e.prototype.parseSimpleArgStyleIfPossible = function() {
      for (var t = 0, n = this.clonePosition(); !this.isEOF(); ) {
        var i = this.char();
        switch (i) {
          case 39: {
            this.bump();
            var r = this.clonePosition();
            if (!this.bumpUntil("'"))
              return this.error(O.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, M(r, this.clonePosition()));
            this.bump();
            break;
          }
          case 123: {
            t += 1, this.bump();
            break;
          }
          case 125: {
            if (t > 0)
              t -= 1;
            else
              return {
                val: this.message.slice(n.offset, this.offset()),
                err: null
              };
            break;
          }
          default:
            this.bump();
            break;
        }
      }
      return {
        val: this.message.slice(n.offset, this.offset()),
        err: null
      };
    }, e.prototype.parseNumberSkeletonFromString = function(t, n) {
      var i = [];
      try {
        i = d_(t);
      } catch {
        return this.error(O.INVALID_NUMBER_SKELETON, n);
      }
      return {
        val: {
          type: St.number,
          tokens: i,
          location: n,
          parsedOptions: this.shouldParseSkeletons ? b_(i) : {}
        },
        err: null
      };
    }, e.prototype.tryParsePluralOrSelectOptions = function(t, n, i, r) {
      for (var l, s = !1, a = [], o = /* @__PURE__ */ new Set(), u = r.value, f = r.location; ; ) {
        if (u.length === 0) {
          var c = this.clonePosition();
          if (n !== "select" && this.bumpIf("=")) {
            var _ = this.tryParseDecimalInteger(O.EXPECT_PLURAL_ARGUMENT_SELECTOR, O.INVALID_PLURAL_ARGUMENT_SELECTOR);
            if (_.err)
              return _;
            f = M(c, this.clonePosition()), u = this.message.slice(c.offset, this.offset());
          } else
            break;
        }
        if (o.has(u))
          return this.error(n === "select" ? O.DUPLICATE_SELECT_ARGUMENT_SELECTOR : O.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, f);
        u === "other" && (s = !0), this.bumpSpace();
        var h = this.clonePosition();
        if (!this.bumpIf("{"))
          return this.error(n === "select" ? O.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : O.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, M(this.clonePosition(), this.clonePosition()));
        var g = this.parseMessage(t + 1, n, i);
        if (g.err)
          return g;
        var y = this.tryParseArgumentClose(h);
        if (y.err)
          return y;
        a.push([
          u,
          {
            value: g.val,
            location: M(h, this.clonePosition())
          }
        ]), o.add(u), this.bumpSpace(), l = this.parseIdentifierIfPossible(), u = l.value, f = l.location;
      }
      return a.length === 0 ? this.error(n === "select" ? O.EXPECT_SELECT_ARGUMENT_SELECTOR : O.EXPECT_PLURAL_ARGUMENT_SELECTOR, M(this.clonePosition(), this.clonePosition())) : this.requiresOtherClause && !s ? this.error(O.MISSING_OTHER_CLAUSE, M(this.clonePosition(), this.clonePosition())) : { val: a, err: null };
    }, e.prototype.tryParseDecimalInteger = function(t, n) {
      var i = 1, r = this.clonePosition();
      this.bumpIf("+") || this.bumpIf("-") && (i = -1);
      for (var l = !1, s = 0; !this.isEOF(); ) {
        var a = this.char();
        if (a >= 48 && a <= 57)
          l = !0, s = s * 10 + (a - 48), this.bump();
        else
          break;
      }
      var o = M(r, this.clonePosition());
      return l ? (s *= i, P_(s) ? { val: s, err: null } : this.error(n, o)) : this.error(t, o);
    }, e.prototype.offset = function() {
      return this.position.offset;
    }, e.prototype.isEOF = function() {
      return this.offset() === this.message.length;
    }, e.prototype.clonePosition = function() {
      return {
        offset: this.position.offset,
        line: this.position.line,
        column: this.position.column
      };
    }, e.prototype.char = function() {
      var t = this.position.offset;
      if (t >= this.message.length)
        throw Error("out of bound");
      var n = ms(this.message, t);
      if (n === void 0)
        throw Error("Offset ".concat(t, " is at invalid UTF-16 code unit boundary"));
      return n;
    }, e.prototype.error = function(t, n) {
      return {
        val: null,
        err: {
          kind: t,
          message: this.message,
          location: n
        }
      };
    }, e.prototype.bump = function() {
      if (!this.isEOF()) {
        var t = this.char();
        t === 10 ? (this.position.line += 1, this.position.column = 1, this.position.offset += 1) : (this.position.column += 1, this.position.offset += t < 65536 ? 1 : 2);
      }
    }, e.prototype.bumpIf = function(t) {
      if (qr(this.message, t, this.offset())) {
        for (var n = 0; n < t.length; n++)
          this.bump();
        return !0;
      }
      return !1;
    }, e.prototype.bumpUntil = function(t) {
      var n = this.offset(), i = this.message.indexOf(t, n);
      return i >= 0 ? (this.bumpTo(i), !0) : (this.bumpTo(this.message.length), !1);
    }, e.prototype.bumpTo = function(t) {
      if (this.offset() > t)
        throw Error("targetOffset ".concat(t, " must be greater than or equal to the current offset ").concat(this.offset()));
      for (t = Math.min(t, this.message.length); ; ) {
        var n = this.offset();
        if (n === t)
          break;
        if (n > t)
          throw Error("targetOffset ".concat(t, " is at invalid UTF-16 code unit boundary"));
        if (this.bump(), this.isEOF())
          break;
      }
    }, e.prototype.bumpSpace = function() {
      for (; !this.isEOF() && ps(this.char()); )
        this.bump();
    }, e.prototype.peek = function() {
      if (this.isEOF())
        return null;
      var t = this.char(), n = this.offset(), i = this.message.charCodeAt(n + (t >= 65536 ? 2 : 1));
      return i ?? null;
    }, e;
  }()
);
function Gi(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function M_(e) {
  return Gi(e) || e === 47;
}
function R_(e) {
  return e === 45 || e === 46 || e >= 48 && e <= 57 || e === 95 || e >= 97 && e <= 122 || e >= 65 && e <= 90 || e == 183 || e >= 192 && e <= 214 || e >= 216 && e <= 246 || e >= 248 && e <= 893 || e >= 895 && e <= 8191 || e >= 8204 && e <= 8205 || e >= 8255 && e <= 8256 || e >= 8304 && e <= 8591 || e >= 11264 && e <= 12271 || e >= 12289 && e <= 55295 || e >= 63744 && e <= 64975 || e >= 65008 && e <= 65533 || e >= 65536 && e <= 983039;
}
function ps(e) {
  return e >= 9 && e <= 13 || e === 32 || e === 133 || e >= 8206 && e <= 8207 || e === 8232 || e === 8233;
}
function D_(e) {
  return e >= 33 && e <= 35 || e === 36 || e >= 37 && e <= 39 || e === 40 || e === 41 || e === 42 || e === 43 || e === 44 || e === 45 || e >= 46 && e <= 47 || e >= 58 && e <= 59 || e >= 60 && e <= 62 || e >= 63 && e <= 64 || e === 91 || e === 92 || e === 93 || e === 94 || e === 96 || e === 123 || e === 124 || e === 125 || e === 126 || e === 161 || e >= 162 && e <= 165 || e === 166 || e === 167 || e === 169 || e === 171 || e === 172 || e === 174 || e === 176 || e === 177 || e === 182 || e === 187 || e === 191 || e === 215 || e === 247 || e >= 8208 && e <= 8213 || e >= 8214 && e <= 8215 || e === 8216 || e === 8217 || e === 8218 || e >= 8219 && e <= 8220 || e === 8221 || e === 8222 || e === 8223 || e >= 8224 && e <= 8231 || e >= 8240 && e <= 8248 || e === 8249 || e === 8250 || e >= 8251 && e <= 8254 || e >= 8257 && e <= 8259 || e === 8260 || e === 8261 || e === 8262 || e >= 8263 && e <= 8273 || e === 8274 || e === 8275 || e >= 8277 && e <= 8286 || e >= 8592 && e <= 8596 || e >= 8597 && e <= 8601 || e >= 8602 && e <= 8603 || e >= 8604 && e <= 8607 || e === 8608 || e >= 8609 && e <= 8610 || e === 8611 || e >= 8612 && e <= 8613 || e === 8614 || e >= 8615 && e <= 8621 || e === 8622 || e >= 8623 && e <= 8653 || e >= 8654 && e <= 8655 || e >= 8656 && e <= 8657 || e === 8658 || e === 8659 || e === 8660 || e >= 8661 && e <= 8691 || e >= 8692 && e <= 8959 || e >= 8960 && e <= 8967 || e === 8968 || e === 8969 || e === 8970 || e === 8971 || e >= 8972 && e <= 8991 || e >= 8992 && e <= 8993 || e >= 8994 && e <= 9e3 || e === 9001 || e === 9002 || e >= 9003 && e <= 9083 || e === 9084 || e >= 9085 && e <= 9114 || e >= 9115 && e <= 9139 || e >= 9140 && e <= 9179 || e >= 9180 && e <= 9185 || e >= 9186 && e <= 9254 || e >= 9255 && e <= 9279 || e >= 9280 && e <= 9290 || e >= 9291 && e <= 9311 || e >= 9472 && e <= 9654 || e === 9655 || e >= 9656 && e <= 9664 || e === 9665 || e >= 9666 && e <= 9719 || e >= 9720 && e <= 9727 || e >= 9728 && e <= 9838 || e === 9839 || e >= 9840 && e <= 10087 || e === 10088 || e === 10089 || e === 10090 || e === 10091 || e === 10092 || e === 10093 || e === 10094 || e === 10095 || e === 10096 || e === 10097 || e === 10098 || e === 10099 || e === 10100 || e === 10101 || e >= 10132 && e <= 10175 || e >= 10176 && e <= 10180 || e === 10181 || e === 10182 || e >= 10183 && e <= 10213 || e === 10214 || e === 10215 || e === 10216 || e === 10217 || e === 10218 || e === 10219 || e === 10220 || e === 10221 || e === 10222 || e === 10223 || e >= 10224 && e <= 10239 || e >= 10240 && e <= 10495 || e >= 10496 && e <= 10626 || e === 10627 || e === 10628 || e === 10629 || e === 10630 || e === 10631 || e === 10632 || e === 10633 || e === 10634 || e === 10635 || e === 10636 || e === 10637 || e === 10638 || e === 10639 || e === 10640 || e === 10641 || e === 10642 || e === 10643 || e === 10644 || e === 10645 || e === 10646 || e === 10647 || e === 10648 || e >= 10649 && e <= 10711 || e === 10712 || e === 10713 || e === 10714 || e === 10715 || e >= 10716 && e <= 10747 || e === 10748 || e === 10749 || e >= 10750 && e <= 11007 || e >= 11008 && e <= 11055 || e >= 11056 && e <= 11076 || e >= 11077 && e <= 11078 || e >= 11079 && e <= 11084 || e >= 11085 && e <= 11123 || e >= 11124 && e <= 11125 || e >= 11126 && e <= 11157 || e === 11158 || e >= 11159 && e <= 11263 || e >= 11776 && e <= 11777 || e === 11778 || e === 11779 || e === 11780 || e === 11781 || e >= 11782 && e <= 11784 || e === 11785 || e === 11786 || e === 11787 || e === 11788 || e === 11789 || e >= 11790 && e <= 11798 || e === 11799 || e >= 11800 && e <= 11801 || e === 11802 || e === 11803 || e === 11804 || e === 11805 || e >= 11806 && e <= 11807 || e === 11808 || e === 11809 || e === 11810 || e === 11811 || e === 11812 || e === 11813 || e === 11814 || e === 11815 || e === 11816 || e === 11817 || e >= 11818 && e <= 11822 || e === 11823 || e >= 11824 && e <= 11833 || e >= 11834 && e <= 11835 || e >= 11836 && e <= 11839 || e === 11840 || e === 11841 || e === 11842 || e >= 11843 && e <= 11855 || e >= 11856 && e <= 11857 || e === 11858 || e >= 11859 && e <= 11903 || e >= 12289 && e <= 12291 || e === 12296 || e === 12297 || e === 12298 || e === 12299 || e === 12300 || e === 12301 || e === 12302 || e === 12303 || e === 12304 || e === 12305 || e >= 12306 && e <= 12307 || e === 12308 || e === 12309 || e === 12310 || e === 12311 || e === 12312 || e === 12313 || e === 12314 || e === 12315 || e === 12316 || e === 12317 || e >= 12318 && e <= 12319 || e === 12320 || e === 12336 || e === 64830 || e === 64831 || e >= 65093 && e <= 65094;
}
function qi(e) {
  e.forEach(function(t) {
    if (delete t.location, os(t) || as(t))
      for (var n in t.options)
        delete t.options[n].location, qi(t.options[n].value);
    else
      rs(t) && fs(t.style) || (ls(t) || ss(t)) && Ri(t.style) ? delete t.style.location : us(t) && qi(t.children);
  });
}
function U_(e, t) {
  t === void 0 && (t = {}), t = D({ shouldParseSkeletons: !0, requiresOtherClause: !0 }, t);
  var n = new O_(e, t).parse();
  if (n.err) {
    var i = SyntaxError(O[n.err.kind]);
    throw i.location = n.err.location, i.originalMessage = n.err.message, i;
  }
  return t != null && t.captureLocation || qi(n.val), n.val;
}
function pi(e, t) {
  var n = t && t.cache ? t.cache : j_, i = t && t.serializer ? t.serializer : V_, r = t && t.strategy ? t.strategy : G_;
  return r(e, {
    cache: n,
    serializer: i
  });
}
function F_(e) {
  return e == null || typeof e == "number" || typeof e == "boolean";
}
function bs(e, t, n, i) {
  var r = F_(i) ? i : n(i), l = t.get(r);
  return typeof l > "u" && (l = e.call(this, i), t.set(r, l)), l;
}
function ws(e, t, n) {
  var i = Array.prototype.slice.call(arguments, 3), r = n(i), l = t.get(r);
  return typeof l > "u" && (l = e.apply(this, i), t.set(r, l)), l;
}
function Ji(e, t, n, i, r) {
  return n.bind(t, e, i, r);
}
function G_(e, t) {
  var n = e.length === 1 ? bs : ws;
  return Ji(e, this, n, t.cache.create(), t.serializer);
}
function q_(e, t) {
  return Ji(e, this, ws, t.cache.create(), t.serializer);
}
function z_(e, t) {
  return Ji(e, this, bs, t.cache.create(), t.serializer);
}
var V_ = function() {
  return JSON.stringify(arguments);
};
function Yi() {
  this.cache = /* @__PURE__ */ Object.create(null);
}
Yi.prototype.get = function(e) {
  return this.cache[e];
};
Yi.prototype.set = function(e, t) {
  this.cache[e] = t;
};
var j_ = {
  create: function() {
    return new Yi();
  }
}, bi = {
  variadic: q_,
  monadic: z_
}, kt;
(function(e) {
  e.MISSING_VALUE = "MISSING_VALUE", e.INVALID_VALUE = "INVALID_VALUE", e.MISSING_INTL_API = "MISSING_INTL_API";
})(kt || (kt = {}));
var Vn = (
  /** @class */
  function(e) {
    zn(t, e);
    function t(n, i, r) {
      var l = e.call(this, n) || this;
      return l.code = i, l.originalMessage = r, l;
    }
    return t.prototype.toString = function() {
      return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
    }, t;
  }(Error)
), jr = (
  /** @class */
  function(e) {
    zn(t, e);
    function t(n, i, r, l) {
      return e.call(this, 'Invalid values for "'.concat(n, '": "').concat(i, '". Options are "').concat(Object.keys(r).join('", "'), '"'), kt.INVALID_VALUE, l) || this;
    }
    return t;
  }(Vn)
), X_ = (
  /** @class */
  function(e) {
    zn(t, e);
    function t(n, i, r) {
      return e.call(this, 'Value for "'.concat(n, '" must be of type ').concat(i), kt.INVALID_VALUE, r) || this;
    }
    return t;
  }(Vn)
), W_ = (
  /** @class */
  function(e) {
    zn(t, e);
    function t(n, i) {
      return e.call(this, 'The intl string context variable "'.concat(n, '" was not provided to the string "').concat(i, '"'), kt.MISSING_VALUE, i) || this;
    }
    return t;
  }(Vn)
), oe;
(function(e) {
  e[e.literal = 0] = "literal", e[e.object = 1] = "object";
})(oe || (oe = {}));
function x_(e) {
  return e.length < 2 ? e : e.reduce(function(t, n) {
    var i = t[t.length - 1];
    return !i || i.type !== oe.literal || n.type !== oe.literal ? t.push(n) : i.value += n.value, t;
  }, []);
}
function Z_(e) {
  return typeof e == "function";
}
function wn(e, t, n, i, r, l, s) {
  if (e.length === 1 && Dr(e[0]))
    return [
      {
        type: oe.literal,
        value: e[0].value
      }
    ];
  for (var a = [], o = 0, u = e; o < u.length; o++) {
    var f = u[o];
    if (Dr(f)) {
      a.push({
        type: oe.literal,
        value: f.value
      });
      continue;
    }
    if (f_(f)) {
      typeof l == "number" && a.push({
        type: oe.literal,
        value: n.getNumberFormat(t).format(l)
      });
      continue;
    }
    var c = f.value;
    if (!(r && c in r))
      throw new W_(c, s);
    var _ = r[c];
    if (u_(f)) {
      (!_ || typeof _ == "string" || typeof _ == "number") && (_ = typeof _ == "string" || typeof _ == "number" ? String(_) : ""), a.push({
        type: typeof _ == "string" ? oe.literal : oe.object,
        value: _
      });
      continue;
    }
    if (ls(f)) {
      var h = typeof f.style == "string" ? i.date[f.style] : Ri(f.style) ? f.style.parsedOptions : void 0;
      a.push({
        type: oe.literal,
        value: n.getDateTimeFormat(t, h).format(_)
      });
      continue;
    }
    if (ss(f)) {
      var h = typeof f.style == "string" ? i.time[f.style] : Ri(f.style) ? f.style.parsedOptions : i.time.medium;
      a.push({
        type: oe.literal,
        value: n.getDateTimeFormat(t, h).format(_)
      });
      continue;
    }
    if (rs(f)) {
      var h = typeof f.style == "string" ? i.number[f.style] : fs(f.style) ? f.style.parsedOptions : void 0;
      h && h.scale && (_ = _ * (h.scale || 1)), a.push({
        type: oe.literal,
        value: n.getNumberFormat(t, h).format(_)
      });
      continue;
    }
    if (us(f)) {
      var g = f.children, y = f.value, v = r[y];
      if (!Z_(v))
        throw new X_(y, "function", s);
      var p = wn(g, t, n, i, r, l), w = v(p.map(function(m) {
        return m.value;
      }));
      Array.isArray(w) || (w = [w]), a.push.apply(a, w.map(function(m) {
        return {
          type: typeof m == "string" ? oe.literal : oe.object,
          value: m
        };
      }));
    }
    if (os(f)) {
      var b = f.options[_] || f.options.other;
      if (!b)
        throw new jr(f.value, _, Object.keys(f.options), s);
      a.push.apply(a, wn(b.value, t, n, i, r));
      continue;
    }
    if (as(f)) {
      var b = f.options["=".concat(_)];
      if (!b) {
        if (!Intl.PluralRules)
          throw new Vn(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, kt.MISSING_INTL_API, s);
        var d = n.getPluralRules(t, { type: f.pluralType }).select(_ - (f.offset || 0));
        b = f.options[d] || f.options.other;
      }
      if (!b)
        throw new jr(f.value, _, Object.keys(f.options), s);
      a.push.apply(a, wn(b.value, t, n, i, r, _ - (f.offset || 0)));
      continue;
    }
  }
  return x_(a);
}
function J_(e, t) {
  return t ? D(D(D({}, e || {}), t || {}), Object.keys(e).reduce(function(n, i) {
    return n[i] = D(D({}, e[i]), t[i] || {}), n;
  }, {})) : e;
}
function Y_(e, t) {
  return t ? Object.keys(e).reduce(function(n, i) {
    return n[i] = J_(e[i], t[i]), n;
  }, D({}, e)) : e;
}
function wi(e) {
  return {
    create: function() {
      return {
        get: function(t) {
          return e[t];
        },
        set: function(t, n) {
          e[t] = n;
        }
      };
    }
  };
}
function Q_(e) {
  return e === void 0 && (e = {
    number: {},
    dateTime: {},
    pluralRules: {}
  }), {
    getNumberFormat: pi(function() {
      for (var t, n = [], i = 0; i < arguments.length; i++)
        n[i] = arguments[i];
      return new ((t = Intl.NumberFormat).bind.apply(t, mi([void 0], n, !1)))();
    }, {
      cache: wi(e.number),
      strategy: bi.variadic
    }),
    getDateTimeFormat: pi(function() {
      for (var t, n = [], i = 0; i < arguments.length; i++)
        n[i] = arguments[i];
      return new ((t = Intl.DateTimeFormat).bind.apply(t, mi([void 0], n, !1)))();
    }, {
      cache: wi(e.dateTime),
      strategy: bi.variadic
    }),
    getPluralRules: pi(function() {
      for (var t, n = [], i = 0; i < arguments.length; i++)
        n[i] = arguments[i];
      return new ((t = Intl.PluralRules).bind.apply(t, mi([void 0], n, !1)))();
    }, {
      cache: wi(e.pluralRules),
      strategy: bi.variadic
    })
  };
}
var K_ = (
  /** @class */
  function() {
    function e(t, n, i, r) {
      var l = this;
      if (n === void 0 && (n = e.defaultLocale), this.formatterCache = {
        number: {},
        dateTime: {},
        pluralRules: {}
      }, this.format = function(s) {
        var a = l.formatToParts(s);
        if (a.length === 1)
          return a[0].value;
        var o = a.reduce(function(u, f) {
          return !u.length || f.type !== oe.literal || typeof u[u.length - 1] != "string" ? u.push(f.value) : u[u.length - 1] += f.value, u;
        }, []);
        return o.length <= 1 ? o[0] || "" : o;
      }, this.formatToParts = function(s) {
        return wn(l.ast, l.locales, l.formatters, l.formats, s, void 0, l.message);
      }, this.resolvedOptions = function() {
        return {
          locale: l.resolvedLocale.toString()
        };
      }, this.getAst = function() {
        return l.ast;
      }, this.locales = n, this.resolvedLocale = e.resolveLocale(n), typeof t == "string") {
        if (this.message = t, !e.__parse)
          throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
        this.ast = e.__parse(t, {
          ignoreTag: r == null ? void 0 : r.ignoreTag,
          locale: this.resolvedLocale
        });
      } else
        this.ast = t;
      if (!Array.isArray(this.ast))
        throw new TypeError("A message must be provided as a String or AST.");
      this.formats = Y_(e.formats, i), this.formatters = r && r.formatters || Q_(this.formatterCache);
    }
    return Object.defineProperty(e, "defaultLocale", {
      get: function() {
        return e.memoizedDefaultLocale || (e.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale), e.memoizedDefaultLocale;
      },
      enumerable: !1,
      configurable: !0
    }), e.memoizedDefaultLocale = null, e.resolveLocale = function(t) {
      var n = Intl.NumberFormat.supportedLocalesOf(t);
      return n.length > 0 ? new Intl.Locale(n[0]) : new Intl.Locale(typeof t == "string" ? t : t[0]);
    }, e.__parse = U_, e.formats = {
      number: {
        integer: {
          maximumFractionDigits: 0
        },
        currency: {
          style: "currency"
        },
        percent: {
          style: "percent"
        }
      },
      date: {
        short: {
          month: "numeric",
          day: "numeric",
          year: "2-digit"
        },
        medium: {
          month: "short",
          day: "numeric",
          year: "numeric"
        },
        long: {
          month: "long",
          day: "numeric",
          year: "numeric"
        },
        full: {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        }
      },
      time: {
        short: {
          hour: "numeric",
          minute: "numeric"
        },
        medium: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
        },
        long: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short"
        },
        full: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short"
        }
      }
    }, e;
  }()
);
function $_(e, t) {
  if (t == null)
    return;
  if (t in e)
    return e[t];
  const n = t.split(".");
  let i = e;
  for (let r = 0; r < n.length; r++)
    if (typeof i == "object") {
      if (r > 0) {
        const l = n.slice(r, n.length).join(".");
        if (l in i) {
          i = i[l];
          break;
        }
      }
      i = i[n[r]];
    } else
      i = void 0;
  return i;
}
const Xe = {}, eh = (e, t, n) => n && (t in Xe || (Xe[t] = {}), e in Xe[t] || (Xe[t][e] = n), n), vs = (e, t) => {
  if (t == null)
    return;
  if (t in Xe && e in Xe[t])
    return Xe[t][e];
  const n = jn(t);
  for (let i = 0; i < n.length; i++) {
    const r = n[i], l = nh(r, e);
    if (l)
      return eh(e, t, l);
  }
};
let Qi;
const Qt = Yt({});
function th(e) {
  return Qi[e] || null;
}
function ys(e) {
  return e in Qi;
}
function nh(e, t) {
  if (!ys(e))
    return null;
  const n = th(e);
  return $_(n, t);
}
function ih(e) {
  if (e == null)
    return;
  const t = jn(e);
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    if (ys(i))
      return i;
  }
}
function rh(e, ...t) {
  delete Xe[e], Qt.update((n) => (n[e] = a_.all([n[e] || {}, ...t]), n));
}
Nt(
  [Qt],
  ([e]) => Object.keys(e)
);
Qt.subscribe((e) => Qi = e);
const vn = {};
function lh(e, t) {
  vn[e].delete(t), vn[e].size === 0 && delete vn[e];
}
function Es(e) {
  return vn[e];
}
function sh(e) {
  return jn(e).map((t) => {
    const n = Es(t);
    return [t, n ? [...n] : []];
  }).filter(([, t]) => t.length > 0);
}
function zi(e) {
  return e == null ? !1 : jn(e).some(
    (t) => {
      var n;
      return (n = Es(t)) == null ? void 0 : n.size;
    }
  );
}
function oh(e, t) {
  return Promise.all(
    t.map((i) => (lh(e, i), i().then((r) => r.default || r)))
  ).then((i) => rh(e, ...i));
}
const Ut = {};
function Ss(e) {
  if (!zi(e))
    return e in Ut ? Ut[e] : Promise.resolve();
  const t = sh(e);
  return Ut[e] = Promise.all(
    t.map(
      ([n, i]) => oh(n, i)
    )
  ).then(() => {
    if (zi(e))
      return Ss(e);
    delete Ut[e];
  }), Ut[e];
}
const ah = {
  number: {
    scientific: { notation: "scientific" },
    engineering: { notation: "engineering" },
    compactLong: { notation: "compact", compactDisplay: "long" },
    compactShort: { notation: "compact", compactDisplay: "short" }
  },
  date: {
    short: { month: "numeric", day: "numeric", year: "2-digit" },
    medium: { month: "short", day: "numeric", year: "numeric" },
    long: { month: "long", day: "numeric", year: "numeric" },
    full: { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  },
  time: {
    short: { hour: "numeric", minute: "numeric" },
    medium: { hour: "numeric", minute: "numeric", second: "numeric" },
    long: {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short"
    },
    full: {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short"
    }
  }
}, uh = {
  fallbackLocale: null,
  loadingDelay: 200,
  formats: ah,
  warnOnMissingMessages: !0,
  handleMissingMessage: void 0,
  ignoreTag: !0
}, fh = uh;
function At() {
  return fh;
}
const vi = Yt(!1);
var ch = Object.defineProperty, _h = Object.defineProperties, hh = Object.getOwnPropertyDescriptors, Xr = Object.getOwnPropertySymbols, dh = Object.prototype.hasOwnProperty, mh = Object.prototype.propertyIsEnumerable, Wr = (e, t, n) => t in e ? ch(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, gh = (e, t) => {
  for (var n in t || (t = {}))
    dh.call(t, n) && Wr(e, n, t[n]);
  if (Xr)
    for (var n of Xr(t))
      mh.call(t, n) && Wr(e, n, t[n]);
  return e;
}, ph = (e, t) => _h(e, hh(t));
let Vi;
const Sn = Yt(null);
function xr(e) {
  return e.split("-").map((t, n, i) => i.slice(0, n + 1).join("-")).reverse();
}
function jn(e, t = At().fallbackLocale) {
  const n = xr(e);
  return t ? [.../* @__PURE__ */ new Set([...n, ...xr(t)])] : n;
}
function ft() {
  return Vi ?? void 0;
}
Sn.subscribe((e) => {
  Vi = e ?? void 0, typeof window < "u" && e != null && document.documentElement.setAttribute("lang", e);
});
const bh = (e) => {
  if (e && ih(e) && zi(e)) {
    const { loadingDelay: t } = At();
    let n;
    return typeof window < "u" && ft() != null && t ? n = window.setTimeout(
      () => vi.set(!0),
      t
    ) : vi.set(!0), Ss(e).then(() => {
      Sn.set(e);
    }).finally(() => {
      clearTimeout(n), vi.set(!1);
    });
  }
  return Sn.set(e);
}, Kt = ph(gh({}, Sn), {
  set: bh
}), Xn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (i) => {
    const r = JSON.stringify(i);
    return r in t ? t[r] : t[r] = e(i);
  };
};
var wh = Object.defineProperty, kn = Object.getOwnPropertySymbols, ks = Object.prototype.hasOwnProperty, As = Object.prototype.propertyIsEnumerable, Zr = (e, t, n) => t in e ? wh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Ki = (e, t) => {
  for (var n in t || (t = {}))
    ks.call(t, n) && Zr(e, n, t[n]);
  if (kn)
    for (var n of kn(t))
      As.call(t, n) && Zr(e, n, t[n]);
  return e;
}, Pt = (e, t) => {
  var n = {};
  for (var i in e)
    ks.call(e, i) && t.indexOf(i) < 0 && (n[i] = e[i]);
  if (e != null && kn)
    for (var i of kn(e))
      t.indexOf(i) < 0 && As.call(e, i) && (n[i] = e[i]);
  return n;
};
const jt = (e, t) => {
  const { formats: n } = At();
  if (e in n && t in n[e])
    return n[e][t];
  throw new Error(`[svelte-i18n] Unknown "${t}" ${e} format.`);
}, vh = Xn(
  (e) => {
    var t = e, { locale: n, format: i } = t, r = Pt(t, ["locale", "format"]);
    if (n == null)
      throw new Error('[svelte-i18n] A "locale" must be set to format numbers');
    return i && (r = jt("number", i)), new Intl.NumberFormat(n, r);
  }
), yh = Xn(
  (e) => {
    var t = e, { locale: n, format: i } = t, r = Pt(t, ["locale", "format"]);
    if (n == null)
      throw new Error('[svelte-i18n] A "locale" must be set to format dates');
    return i ? r = jt("date", i) : Object.keys(r).length === 0 && (r = jt("date", "short")), new Intl.DateTimeFormat(n, r);
  }
), Eh = Xn(
  (e) => {
    var t = e, { locale: n, format: i } = t, r = Pt(t, ["locale", "format"]);
    if (n == null)
      throw new Error(
        '[svelte-i18n] A "locale" must be set to format time values'
      );
    return i ? r = jt("time", i) : Object.keys(r).length === 0 && (r = jt("time", "short")), new Intl.DateTimeFormat(n, r);
  }
), Sh = (e = {}) => {
  var t = e, {
    locale: n = ft()
  } = t, i = Pt(t, [
    "locale"
  ]);
  return vh(Ki({ locale: n }, i));
}, kh = (e = {}) => {
  var t = e, {
    locale: n = ft()
  } = t, i = Pt(t, [
    "locale"
  ]);
  return yh(Ki({ locale: n }, i));
}, Ah = (e = {}) => {
  var t = e, {
    locale: n = ft()
  } = t, i = Pt(t, [
    "locale"
  ]);
  return Eh(Ki({ locale: n }, i));
}, Th = Xn(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  (e, t = ft()) => new K_(e, t, At().formats, {
    ignoreTag: At().ignoreTag
  })
), Bh = (e, t = {}) => {
  var n, i, r, l;
  let s = t;
  typeof e == "object" && (s = e, e = s.id);
  const {
    values: a,
    locale: o = ft(),
    default: u
  } = s;
  if (o == null)
    throw new Error(
      "[svelte-i18n] Cannot format a message without first setting the initial locale."
    );
  let f = vs(e, o);
  if (!f)
    f = (l = (r = (i = (n = At()).handleMissingMessage) == null ? void 0 : i.call(n, { locale: o, id: e, defaultValue: u })) != null ? r : u) != null ? l : e;
  else if (typeof f != "string")
    return console.warn(
      `[svelte-i18n] Message with id "${e}" must be of type "string", found: "${typeof f}". Gettin its value through the "$format" method is deprecated; use the "json" method instead.`
    ), f;
  if (!a)
    return f;
  let c = f;
  try {
    c = Th(f, o).format(a);
  } catch (_) {
    _ instanceof Error && console.warn(
      `[svelte-i18n] Message "${e}" has syntax error:`,
      _.message
    );
  }
  return c;
}, Ch = (e, t) => Ah(t).format(e), Nh = (e, t) => kh(t).format(e), Ph = (e, t) => Sh(t).format(e), Hh = (e, t = ft()) => vs(e, t);
Nt([Kt, Qt], () => Bh);
Nt([Kt], () => Ch);
Nt([Kt], () => Nh);
Nt([Kt], () => Ph);
Nt([Kt, Qt], () => Hh);
const {
  SvelteComponent: Ih,
  append: ue,
  attr: nt,
  detach: Ts,
  element: it,
  init: Lh,
  insert: Bs,
  noop: Jr,
  safe_not_equal: Oh,
  set_data: An,
  set_style: yi,
  space: ji,
  text: gt,
  toggle_class: Yr
} = window.__gradio__svelte__internal, { onMount: Mh, createEventDispatcher: Rh } = window.__gradio__svelte__internal;
function Qr(e) {
  let t, n, i, r, l = Gt(
    /*current_file_upload*/
    e[2]
  ) + "", s, a, o, u, f = (
    /*current_file_upload*/
    e[2].orig_name + ""
  ), c;
  return {
    c() {
      t = it("div"), n = it("span"), i = it("div"), r = it("progress"), s = gt(l), o = ji(), u = it("span"), c = gt(f), yi(r, "visibility", "hidden"), yi(r, "height", "0"), yi(r, "width", "0"), r.value = a = Gt(
        /*current_file_upload*/
        e[2]
      ), nt(r, "max", "100"), nt(r, "class", "svelte-1juivz4"), nt(i, "class", "progress-bar svelte-1juivz4"), nt(u, "class", "file-name svelte-1juivz4"), nt(t, "class", "file svelte-1juivz4");
    },
    m(_, h) {
      Bs(_, t, h), ue(t, n), ue(n, i), ue(i, r), ue(r, s), ue(t, o), ue(t, u), ue(u, c);
    },
    p(_, h) {
      h & /*current_file_upload*/
      4 && l !== (l = Gt(
        /*current_file_upload*/
        _[2]
      ) + "") && An(s, l), h & /*current_file_upload*/
      4 && a !== (a = Gt(
        /*current_file_upload*/
        _[2]
      )) && (r.value = a), h & /*current_file_upload*/
      4 && f !== (f = /*current_file_upload*/
      _[2].orig_name + "") && An(c, f);
    },
    d(_) {
      _ && Ts(t);
    }
  };
}
function Dh(e) {
  let t, n, i, r = (
    /*files_with_progress*/
    e[0].length + ""
  ), l, s, a = (
    /*files_with_progress*/
    e[0].length > 1 ? "files" : "file"
  ), o, u, f, c = (
    /*current_file_upload*/
    e[2] && Qr(e)
  );
  return {
    c() {
      t = it("div"), n = it("span"), i = gt("Uploading "), l = gt(r), s = ji(), o = gt(a), u = gt("..."), f = ji(), c && c.c(), nt(n, "class", "uploading svelte-1juivz4"), nt(t, "class", "wrap svelte-1juivz4"), Yr(
        t,
        "progress",
        /*progress*/
        e[1]
      );
    },
    m(_, h) {
      Bs(_, t, h), ue(t, n), ue(n, i), ue(n, l), ue(n, s), ue(n, o), ue(n, u), ue(t, f), c && c.m(t, null);
    },
    p(_, [h]) {
      h & /*files_with_progress*/
      1 && r !== (r = /*files_with_progress*/
      _[0].length + "") && An(l, r), h & /*files_with_progress*/
      1 && a !== (a = /*files_with_progress*/
      _[0].length > 1 ? "files" : "file") && An(o, a), /*current_file_upload*/
      _[2] ? c ? c.p(_, h) : (c = Qr(_), c.c(), c.m(t, null)) : c && (c.d(1), c = null), h & /*progress*/
      2 && Yr(
        t,
        "progress",
        /*progress*/
        _[1]
      );
    },
    i: Jr,
    o: Jr,
    d(_) {
      _ && Ts(t), c && c.d();
    }
  };
}
function Gt(e) {
  return e.progress * 100 / (e.size || 0) || 0;
}
function Uh(e) {
  let t = 0;
  return e.forEach((n) => {
    t += Gt(n);
  }), document.documentElement.style.setProperty("--upload-progress-width", (t / e.length).toFixed(2) + "%"), t / e.length;
}
function Fh(e, t, n) {
  let { upload_id: i } = t, { root: r } = t, { files: l } = t, s, a = !1, o, u = l.map((_) => ({ ..._, progress: 0 }));
  const f = Rh();
  function c(_, h) {
    n(0, u = u.map((g) => (g.orig_name === _ && (g.progress += h), g)));
  }
  return Mh(() => {
    s = new EventSource(`${r}/upload_progress?upload_id=${i}`), s.onmessage = async function(_) {
      const h = JSON.parse(_.data);
      a || n(1, a = !0), h.msg === "done" ? (s.close(), f("done")) : (n(2, o = h), c(h.orig_name, h.chunk_size));
    };
  }), e.$$set = (_) => {
    "upload_id" in _ && n(3, i = _.upload_id), "root" in _ && n(4, r = _.root), "files" in _ && n(5, l = _.files);
  }, e.$$.update = () => {
    e.$$.dirty & /*files_with_progress*/
    1 && Uh(u);
  }, [u, a, o, i, r, l];
}
class Gh extends Ih {
  constructor(t) {
    super(), Lh(this, t, Fh, Dh, Oh, { upload_id: 3, root: 4, files: 5 });
  }
}
const {
  SvelteComponent: qh,
  append: Kr,
  attr: me,
  binding_callbacks: zh,
  bubble: $e,
  check_outros: Vh,
  create_component: jh,
  create_slot: Xh,
  destroy_component: Wh,
  detach: Cs,
  element: $r,
  empty: xh,
  get_all_dirty_from_scope: Zh,
  get_slot_changes: Jh,
  group_outros: Yh,
  init: Qh,
  insert: Ns,
  listen: ge,
  mount_component: Kh,
  prevent_default: et,
  run_all: $h,
  safe_not_equal: e0,
  set_style: el,
  space: t0,
  stop_propagation: tt,
  toggle_class: ze,
  transition_in: Tn,
  transition_out: Bn,
  update_slot_base: n0
} = window.__gradio__svelte__internal, { createEventDispatcher: i0, tick: r0, getContext: l0 } = window.__gradio__svelte__internal;
function s0(e) {
  let t, n, i, r, l, s, a, o, u, f;
  const c = (
    /*#slots*/
    e[21].default
  ), _ = Xh(
    c,
    e,
    /*$$scope*/
    e[20],
    null
  );
  return {
    c() {
      t = $r("button"), _ && _.c(), n = t0(), i = $r("input"), me(i, "aria-label", "file upload"), me(i, "type", "file"), me(
        i,
        "accept",
        /*filetype*/
        e[1]
      ), i.multiple = r = /*file_count*/
      e[5] === "multiple" || void 0, me(i, "webkitdirectory", l = /*file_count*/
      e[5] === "directory" || void 0), me(i, "mozdirectory", s = /*file_count*/
      e[5] === "directory" || void 0), me(i, "class", "svelte-1aq8tno"), me(t, "tabindex", a = /*hidden*/
      e[7] ? -1 : 0), me(t, "class", "svelte-1aq8tno"), ze(
        t,
        "hidden",
        /*hidden*/
        e[7]
      ), ze(
        t,
        "center",
        /*center*/
        e[3]
      ), ze(
        t,
        "boundedheight",
        /*boundedheight*/
        e[2]
      ), ze(
        t,
        "flex",
        /*flex*/
        e[4]
      ), el(
        t,
        "height",
        /*include_sources*/
        e[8] ? "calc(100% - 40px" : "100%"
      );
    },
    m(h, g) {
      Ns(h, t, g), _ && _.m(t, null), Kr(t, n), Kr(t, i), e[29](i), o = !0, u || (f = [
        ge(
          i,
          "change",
          /*load_files_from_upload*/
          e[14]
        ),
        ge(t, "drag", tt(et(
          /*drag_handler*/
          e[22]
        ))),
        ge(t, "dragstart", tt(et(
          /*dragstart_handler*/
          e[23]
        ))),
        ge(t, "dragend", tt(et(
          /*dragend_handler*/
          e[24]
        ))),
        ge(t, "dragover", tt(et(
          /*dragover_handler*/
          e[25]
        ))),
        ge(t, "dragenter", tt(et(
          /*dragenter_handler*/
          e[26]
        ))),
        ge(t, "dragleave", tt(et(
          /*dragleave_handler*/
          e[27]
        ))),
        ge(t, "drop", tt(et(
          /*drop_handler*/
          e[28]
        ))),
        ge(
          t,
          "click",
          /*open_file_upload*/
          e[9]
        ),
        ge(
          t,
          "drop",
          /*loadFilesFromDrop*/
          e[15]
        ),
        ge(
          t,
          "dragenter",
          /*updateDragging*/
          e[13]
        ),
        ge(
          t,
          "dragleave",
          /*updateDragging*/
          e[13]
        )
      ], u = !0);
    },
    p(h, g) {
      _ && _.p && (!o || g[0] & /*$$scope*/
      1048576) && n0(
        _,
        c,
        h,
        /*$$scope*/
        h[20],
        o ? Jh(
          c,
          /*$$scope*/
          h[20],
          g,
          null
        ) : Zh(
          /*$$scope*/
          h[20]
        ),
        null
      ), (!o || g[0] & /*filetype*/
      2) && me(
        i,
        "accept",
        /*filetype*/
        h[1]
      ), (!o || g[0] & /*file_count*/
      32 && r !== (r = /*file_count*/
      h[5] === "multiple" || void 0)) && (i.multiple = r), (!o || g[0] & /*file_count*/
      32 && l !== (l = /*file_count*/
      h[5] === "directory" || void 0)) && me(i, "webkitdirectory", l), (!o || g[0] & /*file_count*/
      32 && s !== (s = /*file_count*/
      h[5] === "directory" || void 0)) && me(i, "mozdirectory", s), (!o || g[0] & /*hidden*/
      128 && a !== (a = /*hidden*/
      h[7] ? -1 : 0)) && me(t, "tabindex", a), (!o || g[0] & /*hidden*/
      128) && ze(
        t,
        "hidden",
        /*hidden*/
        h[7]
      ), (!o || g[0] & /*center*/
      8) && ze(
        t,
        "center",
        /*center*/
        h[3]
      ), (!o || g[0] & /*boundedheight*/
      4) && ze(
        t,
        "boundedheight",
        /*boundedheight*/
        h[2]
      ), (!o || g[0] & /*flex*/
      16) && ze(
        t,
        "flex",
        /*flex*/
        h[4]
      ), g[0] & /*include_sources*/
      256 && el(
        t,
        "height",
        /*include_sources*/
        h[8] ? "calc(100% - 40px" : "100%"
      );
    },
    i(h) {
      o || (Tn(_, h), o = !0);
    },
    o(h) {
      Bn(_, h), o = !1;
    },
    d(h) {
      h && Cs(t), _ && _.d(h), e[29](null), u = !1, $h(f);
    }
  };
}
function o0(e) {
  let t, n;
  return t = new Gh({
    props: {
      root: (
        /*root*/
        e[6]
      ),
      upload_id: (
        /*upload_id*/
        e[10]
      ),
      files: (
        /*file_data*/
        e[11]
      )
    }
  }), {
    c() {
      jh(t.$$.fragment);
    },
    m(i, r) {
      Kh(t, i, r), n = !0;
    },
    p(i, r) {
      const l = {};
      r[0] & /*root*/
      64 && (l.root = /*root*/
      i[6]), r[0] & /*upload_id*/
      1024 && (l.upload_id = /*upload_id*/
      i[10]), r[0] & /*file_data*/
      2048 && (l.files = /*file_data*/
      i[11]), t.$set(l);
    },
    i(i) {
      n || (Tn(t.$$.fragment, i), n = !0);
    },
    o(i) {
      Bn(t.$$.fragment, i), n = !1;
    },
    d(i) {
      Wh(t, i);
    }
  };
}
function a0(e) {
  let t, n, i, r;
  const l = [o0, s0], s = [];
  function a(o, u) {
    return (
      /*uploading*/
      o[0] ? 0 : 1
    );
  }
  return t = a(e), n = s[t] = l[t](e), {
    c() {
      n.c(), i = xh();
    },
    m(o, u) {
      s[t].m(o, u), Ns(o, i, u), r = !0;
    },
    p(o, u) {
      let f = t;
      t = a(o), t === f ? s[t].p(o, u) : (Yh(), Bn(s[f], 1, 1, () => {
        s[f] = null;
      }), Vh(), n = s[t], n ? n.p(o, u) : (n = s[t] = l[t](o), n.c()), Tn(n, 1), n.m(i.parentNode, i));
    },
    i(o) {
      r || (Tn(n), r = !0);
    },
    o(o) {
      Bn(n), r = !1;
    },
    d(o) {
      o && Cs(i), s[t].d(o);
    }
  };
}
function Ei(e) {
  let t, n = e[0], i = 1;
  for (; i < e.length; ) {
    const r = e[i], l = e[i + 1];
    if (i += 2, (r === "optionalAccess" || r === "optionalCall") && n == null)
      return;
    r === "access" || r === "optionalAccess" ? (t = n, n = l(n)) : (r === "call" || r === "optionalCall") && (n = l((...s) => n.call(t, ...s)), t = void 0);
  }
  return n;
}
function u0(e, t) {
  return !e || e === "*" ? !0 : e.endsWith("/*") ? t.startsWith(e.slice(0, -1)) : e === t;
}
function f0(e, t, n) {
  let { $$slots: i = {}, $$scope: r } = t, { filetype: l = null } = t, { dragging: s = !1 } = t, { boundedheight: a = !0 } = t, { center: o = !0 } = t, { flex: u = !0 } = t, { file_count: f = "single" } = t, { disable_click: c = !1 } = t, { root: _ } = t, { hidden: h = !1 } = t, { format: g = "file" } = t, { include_sources: y = !1 } = t, { uploading: v = !1 } = t, p, w;
  const b = l0("upload_files");
  let d;
  const m = i0();
  function B() {
    n(16, s = !s);
  }
  function P() {
    c || (n(12, d.value = "", d), d.click());
  }
  async function L(S) {
    await r0(), n(10, p = Math.random().toString(36).substring(2, 15)), n(0, v = !0);
    const G = await Ic(S, _, p, b);
    return m("load", f === "single" ? Ei([G, "optionalAccess", (Z) => Z[0]]) : G), n(0, v = !1), G || [];
  }
  async function U(S) {
    if (!S.length)
      return;
    let G = S.map((Z) => new File([Z], Z.name));
    return n(11, w = await Lc(G)), await L(w);
  }
  async function F(S) {
    const G = S.target;
    if (G.files)
      if (g != "blob")
        await U(Array.from(G.files));
      else {
        if (f === "single") {
          m("load", G.files[0]);
          return;
        }
        m("load", G.files);
      }
  }
  async function T(S) {
    if (n(16, s = !1), !Ei([S, "access", (Z) => Z.dataTransfer, "optionalAccess", (Z) => Z.files]))
      return;
    const G = Array.from(S.dataTransfer.files).filter((Z) => Ei([
      l,
      "optionalAccess",
      (E) => E.split,
      "call",
      (E) => E(","),
      "access",
      (E) => E.some,
      "call",
      (E) => E((fe) => u0(fe, Z.type))
    ]) ? !0 : (m("error", `Invalid file type only ${l} allowed.`), !1));
    await U(G);
  }
  function ee(S) {
    $e.call(this, e, S);
  }
  function A(S) {
    $e.call(this, e, S);
  }
  function C(S) {
    $e.call(this, e, S);
  }
  function k(S) {
    $e.call(this, e, S);
  }
  function K(S) {
    $e.call(this, e, S);
  }
  function V(S) {
    $e.call(this, e, S);
  }
  function N(S) {
    $e.call(this, e, S);
  }
  function X(S) {
    zh[S ? "unshift" : "push"](() => {
      d = S, n(12, d);
    });
  }
  return e.$$set = (S) => {
    "filetype" in S && n(1, l = S.filetype), "dragging" in S && n(16, s = S.dragging), "boundedheight" in S && n(2, a = S.boundedheight), "center" in S && n(3, o = S.center), "flex" in S && n(4, u = S.flex), "file_count" in S && n(5, f = S.file_count), "disable_click" in S && n(17, c = S.disable_click), "root" in S && n(6, _ = S.root), "hidden" in S && n(7, h = S.hidden), "format" in S && n(18, g = S.format), "include_sources" in S && n(8, y = S.include_sources), "uploading" in S && n(0, v = S.uploading), "$$scope" in S && n(20, r = S.$$scope);
  }, [
    v,
    l,
    a,
    o,
    u,
    f,
    _,
    h,
    y,
    P,
    p,
    w,
    d,
    B,
    F,
    T,
    s,
    c,
    g,
    U,
    r,
    i,
    ee,
    A,
    C,
    k,
    K,
    V,
    N,
    X
  ];
}
class Ps extends qh {
  constructor(t) {
    super(), Qh(
      this,
      t,
      f0,
      a0,
      e0,
      {
        filetype: 1,
        dragging: 16,
        boundedheight: 2,
        center: 3,
        flex: 4,
        file_count: 5,
        disable_click: 17,
        root: 6,
        hidden: 7,
        format: 18,
        include_sources: 8,
        uploading: 0,
        open_file_upload: 9,
        load_files: 19
      },
      null,
      [-1, -1]
    );
  }
  get open_file_upload() {
    return this.$$.ctx[9];
  }
  get load_files() {
    return this.$$.ctx[19];
  }
}
const { setContext: qm, getContext: c0 } = window.__gradio__svelte__internal, _0 = "WORKER_PROXY_CONTEXT_KEY";
function h0() {
  return c0(_0);
}
function d0(e) {
  return e.host === window.location.host || e.host === "localhost:7860" || e.host === "127.0.0.1:7860" || // Ref: https://github.com/gradio-app/gradio/blob/v3.32.0/js/app/src/Index.svelte#L194
  e.host === "lite.local";
}
function m0(e, t) {
  const n = t.toLowerCase();
  for (const [i, r] of Object.entries(e))
    if (i.toLowerCase() === n)
      return r;
}
function g0(e) {
  if (e == null)
    return !1;
  const t = new URL(e, window.location.href);
  return !(!d0(t) || t.protocol !== "http:" && t.protocol !== "https:");
}
const {
  SvelteComponent: p0,
  assign: Cn,
  check_outros: Hs,
  compute_rest_props: tl,
  create_slot: $i,
  detach: Wn,
  element: Is,
  empty: Ls,
  exclude_internal_props: b0,
  get_all_dirty_from_scope: er,
  get_slot_changes: tr,
  get_spread_update: Os,
  group_outros: Ms,
  init: w0,
  insert: xn,
  listen: Rs,
  prevent_default: v0,
  safe_not_equal: y0,
  set_attributes: Nn,
  transition_in: at,
  transition_out: ut,
  update_slot_base: nr
} = window.__gradio__svelte__internal, { createEventDispatcher: E0 } = window.__gradio__svelte__internal;
function S0(e) {
  let t, n, i, r, l;
  const s = (
    /*#slots*/
    e[8].default
  ), a = $i(
    s,
    e,
    /*$$scope*/
    e[7],
    null
  );
  let o = [
    { href: (
      /*href*/
      e[0]
    ) },
    {
      target: n = typeof window < "u" && window.__is_colab__ ? "_blank" : null
    },
    { rel: "noopener noreferrer" },
    { download: (
      /*download*/
      e[1]
    ) },
    /*$$restProps*/
    e[6]
  ], u = {};
  for (let f = 0; f < o.length; f += 1)
    u = Cn(u, o[f]);
  return {
    c() {
      t = Is("a"), a && a.c(), Nn(t, u);
    },
    m(f, c) {
      xn(f, t, c), a && a.m(t, null), i = !0, r || (l = Rs(
        t,
        "click",
        /*dispatch*/
        e[3].bind(null, "click")
      ), r = !0);
    },
    p(f, c) {
      a && a.p && (!i || c & /*$$scope*/
      128) && nr(
        a,
        s,
        f,
        /*$$scope*/
        f[7],
        i ? tr(
          s,
          /*$$scope*/
          f[7],
          c,
          null
        ) : er(
          /*$$scope*/
          f[7]
        ),
        null
      ), Nn(t, u = Os(o, [
        (!i || c & /*href*/
        1) && { href: (
          /*href*/
          f[0]
        ) },
        { target: n },
        { rel: "noopener noreferrer" },
        (!i || c & /*download*/
        2) && { download: (
          /*download*/
          f[1]
        ) },
        c & /*$$restProps*/
        64 && /*$$restProps*/
        f[6]
      ]));
    },
    i(f) {
      i || (at(a, f), i = !0);
    },
    o(f) {
      ut(a, f), i = !1;
    },
    d(f) {
      f && Wn(t), a && a.d(f), r = !1, l();
    }
  };
}
function k0(e) {
  let t, n, i, r;
  const l = [T0, A0], s = [];
  function a(o, u) {
    return (
      /*is_downloading*/
      o[2] ? 0 : 1
    );
  }
  return t = a(e), n = s[t] = l[t](e), {
    c() {
      n.c(), i = Ls();
    },
    m(o, u) {
      s[t].m(o, u), xn(o, i, u), r = !0;
    },
    p(o, u) {
      let f = t;
      t = a(o), t === f ? s[t].p(o, u) : (Ms(), ut(s[f], 1, 1, () => {
        s[f] = null;
      }), Hs(), n = s[t], n ? n.p(o, u) : (n = s[t] = l[t](o), n.c()), at(n, 1), n.m(i.parentNode, i));
    },
    i(o) {
      r || (at(n), r = !0);
    },
    o(o) {
      ut(n), r = !1;
    },
    d(o) {
      o && Wn(i), s[t].d(o);
    }
  };
}
function A0(e) {
  let t, n, i, r;
  const l = (
    /*#slots*/
    e[8].default
  ), s = $i(
    l,
    e,
    /*$$scope*/
    e[7],
    null
  );
  let a = [
    /*$$restProps*/
    e[6],
    { href: (
      /*href*/
      e[0]
    ) }
  ], o = {};
  for (let u = 0; u < a.length; u += 1)
    o = Cn(o, a[u]);
  return {
    c() {
      t = Is("a"), s && s.c(), Nn(t, o);
    },
    m(u, f) {
      xn(u, t, f), s && s.m(t, null), n = !0, i || (r = Rs(t, "click", v0(
        /*wasm_click_handler*/
        e[5]
      )), i = !0);
    },
    p(u, f) {
      s && s.p && (!n || f & /*$$scope*/
      128) && nr(
        s,
        l,
        u,
        /*$$scope*/
        u[7],
        n ? tr(
          l,
          /*$$scope*/
          u[7],
          f,
          null
        ) : er(
          /*$$scope*/
          u[7]
        ),
        null
      ), Nn(t, o = Os(a, [
        f & /*$$restProps*/
        64 && /*$$restProps*/
        u[6],
        (!n || f & /*href*/
        1) && { href: (
          /*href*/
          u[0]
        ) }
      ]));
    },
    i(u) {
      n || (at(s, u), n = !0);
    },
    o(u) {
      ut(s, u), n = !1;
    },
    d(u) {
      u && Wn(t), s && s.d(u), i = !1, r();
    }
  };
}
function T0(e) {
  let t;
  const n = (
    /*#slots*/
    e[8].default
  ), i = $i(
    n,
    e,
    /*$$scope*/
    e[7],
    null
  );
  return {
    c() {
      i && i.c();
    },
    m(r, l) {
      i && i.m(r, l), t = !0;
    },
    p(r, l) {
      i && i.p && (!t || l & /*$$scope*/
      128) && nr(
        i,
        n,
        r,
        /*$$scope*/
        r[7],
        t ? tr(
          n,
          /*$$scope*/
          r[7],
          l,
          null
        ) : er(
          /*$$scope*/
          r[7]
        ),
        null
      );
    },
    i(r) {
      t || (at(i, r), t = !0);
    },
    o(r) {
      ut(i, r), t = !1;
    },
    d(r) {
      i && i.d(r);
    }
  };
}
function B0(e) {
  let t, n, i, r, l;
  const s = [k0, S0], a = [];
  function o(u, f) {
    return f & /*href*/
    1 && (t = null), t == null && (t = !!/*worker_proxy*/
    (u[4] && g0(
      /*href*/
      u[0]
    ))), t ? 0 : 1;
  }
  return n = o(e, -1), i = a[n] = s[n](e), {
    c() {
      i.c(), r = Ls();
    },
    m(u, f) {
      a[n].m(u, f), xn(u, r, f), l = !0;
    },
    p(u, [f]) {
      let c = n;
      n = o(u, f), n === c ? a[n].p(u, f) : (Ms(), ut(a[c], 1, 1, () => {
        a[c] = null;
      }), Hs(), i = a[n], i ? i.p(u, f) : (i = a[n] = s[n](u), i.c()), at(i, 1), i.m(r.parentNode, r));
    },
    i(u) {
      l || (at(i), l = !0);
    },
    o(u) {
      ut(i), l = !1;
    },
    d(u) {
      u && Wn(r), a[n].d(u);
    }
  };
}
function C0(e, t, n) {
  const i = ["href", "download"];
  let r = tl(t, i), { $$slots: l = {}, $$scope: s } = t, { href: a = void 0 } = t, { download: o } = t;
  const u = E0();
  let f = !1;
  const c = h0();
  async function _() {
    if (f)
      return;
    if (u("click"), a == null)
      throw new Error("href is not defined.");
    if (c == null)
      throw new Error("Wasm worker proxy is not available.");
    const g = new URL(a, window.location.href).pathname;
    n(2, f = !0), c.httpRequest({
      method: "GET",
      path: g,
      headers: {},
      query_string: ""
    }).then((y) => {
      if (y.status !== 200)
        throw new Error(`Failed to get file ${g} from the Wasm worker.`);
      const v = new Blob(
        [y.body],
        {
          type: m0(y.headers, "content-type")
        }
      ), p = URL.createObjectURL(v), w = document.createElement("a");
      w.href = p, w.download = o, w.click(), URL.revokeObjectURL(p);
    }).finally(() => {
      n(2, f = !1);
    });
  }
  return e.$$set = (h) => {
    t = Cn(Cn({}, t), b0(h)), n(6, r = tl(t, i)), "href" in h && n(0, a = h.href), "download" in h && n(1, o = h.download), "$$scope" in h && n(7, s = h.$$scope);
  }, [
    a,
    o,
    f,
    u,
    c,
    _,
    r,
    s,
    l
  ];
}
class ir extends p0 {
  constructor(t) {
    super(), w0(this, t, C0, B0, y0, { href: 0, download: 1 });
  }
}
const {
  SvelteComponent: N0,
  add_flush_callback: rr,
  add_iframe_resize_listener: P0,
  add_render_callback: H0,
  append: Xi,
  attr: se,
  bind: lr,
  binding_callbacks: sr,
  check_outros: Xt,
  create_component: Me,
  create_slot: Ds,
  destroy_component: Re,
  detach: Je,
  element: ct,
  get_all_dirty_from_scope: Us,
  get_slot_changes: Fs,
  group_outros: Wt,
  init: I0,
  insert: Ye,
  mount_component: De,
  noop: Tt,
  safe_not_equal: L0,
  set_style: pt,
  space: yn,
  src_url_equal: Pn,
  toggle_class: He,
  transition_in: z,
  transition_out: x,
  update_slot_base: Gs
} = window.__gradio__svelte__internal, { createEventDispatcher: O0, tick: M0, onMount: zm } = window.__gradio__svelte__internal;
function nl(e) {
  let t, n;
  return t = new Ac({}), t.$on(
    "remove_image",
    /*remove_image_handler*/
    e[16]
  ), {
    c() {
      Me(t.$$.fragment);
    },
    m(i, r) {
      De(t, i, r), n = !0;
    },
    p: Tt,
    i(i) {
      n || (z(t.$$.fragment, i), n = !0);
    },
    o(i) {
      x(t.$$.fragment, i), n = !1;
    },
    d(i) {
      Re(t, i);
    }
  };
}
function il(e) {
  let t, n, i = (
    /*show_download_button*/
    e[6] && rl(e)
  );
  return {
    c() {
      t = ct("div"), i && i.c(), se(t, "class", "icon-buttons svelte-106mu0e");
    },
    m(r, l) {
      Ye(r, t, l), i && i.m(t, null), n = !0;
    },
    p(r, l) {
      /*show_download_button*/
      r[6] ? i ? (i.p(r, l), l & /*show_download_button*/
      64 && z(i, 1)) : (i = rl(r), i.c(), z(i, 1), i.m(t, null)) : i && (Wt(), x(i, 1, 1, () => {
        i = null;
      }), Xt());
    },
    i(r) {
      n || (z(i), n = !0);
    },
    o(r) {
      x(i), n = !1;
    },
    d(r) {
      r && Je(t), i && i.d();
    }
  };
}
function rl(e) {
  let t, n;
  return t = new ir({
    props: {
      href: (
        /*value*/
        e[0][1].url
      ),
      download: (
        /*value*/
        e[0][1].orig_name || "image"
      ),
      $$slots: { default: [R0] },
      $$scope: { ctx: e }
    }
  }), {
    c() {
      Me(t.$$.fragment);
    },
    m(i, r) {
      De(t, i, r), n = !0;
    },
    p(i, r) {
      const l = {};
      r & /*value*/
      1 && (l.href = /*value*/
      i[0][1].url), r & /*value*/
      1 && (l.download = /*value*/
      i[0][1].orig_name || "image"), r & /*$$scope*/
      8388608 && (l.$$scope = { dirty: r, ctx: i }), t.$set(l);
    },
    i(i) {
      n || (z(t.$$.fragment, i), n = !0);
    },
    o(i) {
      x(t.$$.fragment, i), n = !1;
    },
    d(i) {
      Re(t, i);
    }
  };
}
function R0(e) {
  let t, n;
  return t = new Gn({ props: { Icon: Zi } }), {
    c() {
      Me(t.$$.fragment);
    },
    m(i, r) {
      De(t, i, r), n = !0;
    },
    p: Tt,
    i(i) {
      n || (z(t.$$.fragment, i), n = !0);
    },
    o(i) {
      x(t.$$.fragment, i), n = !1;
    },
    d(i) {
      Re(t, i);
    }
  };
}
function D0(e) {
  let t, n;
  return {
    c() {
      var i, r, l;
      t = ct("img"), Pn(t.src, n = /*value_*/
      (i = e[9][0]) == null ? void 0 : i.url) || se(t, "src", n), se(t, "alt", ""), se(t, "class", "svelte-106mu0e"), He(
        t,
        "half-wrap",
        /*upload_count*/
        e[5] === 2 && !/*value*/
        ((l = (r = e[0]) == null ? void 0 : r[1]) != null && l.url)
      );
    },
    m(i, r) {
      Ye(i, t, r);
    },
    p(i, r) {
      var l, s, a;
      r & /*value_*/
      512 && !Pn(t.src, n = /*value_*/
      (l = i[9][0]) == null ? void 0 : l.url) && se(t, "src", n), r & /*upload_count, value*/
      33 && He(
        t,
        "half-wrap",
        /*upload_count*/
        i[5] === 2 && !/*value*/
        ((a = (s = i[0]) == null ? void 0 : s[1]) != null && a.url)
      );
    },
    i: Tt,
    o: Tt,
    d(i) {
      i && Je(t);
    }
  };
}
function U0(e) {
  var a;
  let t, n, i, r;
  function l(o) {
    e[17](o);
  }
  let s = {
    filetype: "image/*",
    disable_click: !!/*value*/
    ((a = e[0]) != null && a[0]),
    root: (
      /*root*/
      e[4]
    ),
    file_count: "multiple",
    $$slots: { default: [F0] },
    $$scope: { ctx: e }
  };
  return (
    /*dragging*/
    e[8] !== void 0 && (s.dragging = /*dragging*/
    e[8]), n = new Ps({ props: s }), sr.push(() => lr(n, "dragging", l)), n.$on(
      "load",
      /*load_handler*/
      e[18]
    ), {
      c() {
        t = ct("div"), Me(n.$$.fragment), se(t, "class", "wrap svelte-106mu0e"), He(
          t,
          "half-wrap",
          /*upload_count*/
          e[5] === 1
        );
      },
      m(o, u) {
        Ye(o, t, u), De(n, t, null), r = !0;
      },
      p(o, u) {
        var c;
        const f = {};
        u & /*value*/
        1 && (f.disable_click = !!/*value*/
        ((c = o[0]) != null && c[0])), u & /*root*/
        16 && (f.root = /*root*/
        o[4]), u & /*$$scope*/
        8388608 && (f.$$scope = { dirty: u, ctx: o }), !i && u & /*dragging*/
        256 && (i = !0, f.dragging = /*dragging*/
        o[8], rr(() => i = !1)), n.$set(f), (!r || u & /*upload_count*/
        32) && He(
          t,
          "half-wrap",
          /*upload_count*/
          o[5] === 1
        );
      },
      i(o) {
        r || (z(n.$$.fragment, o), r = !0);
      },
      o(o) {
        x(n.$$.fragment, o), r = !1;
      },
      d(o) {
        o && Je(t), Re(n);
      }
    }
  );
}
function F0(e) {
  let t;
  const n = (
    /*#slots*/
    e[15].default
  ), i = Ds(
    n,
    e,
    /*$$scope*/
    e[23],
    null
  );
  return {
    c() {
      i && i.c();
    },
    m(r, l) {
      i && i.m(r, l), t = !0;
    },
    p(r, l) {
      i && i.p && (!t || l & /*$$scope*/
      8388608) && Gs(
        i,
        n,
        r,
        /*$$scope*/
        r[23],
        t ? Fs(
          n,
          /*$$scope*/
          r[23],
          l,
          null
        ) : Us(
          /*$$scope*/
          r[23]
        ),
        null
      );
    },
    i(r) {
      t || (z(i, r), t = !0);
    },
    o(r) {
      x(i, r), t = !1;
    },
    d(r) {
      i && i.d(r);
    }
  };
}
function G0(e) {
  let t, n;
  return {
    c() {
      t = ct("img"), Pn(t.src, n = /*value_*/
      e[9][1].url) || se(t, "src", n), se(t, "alt", ""), se(
        t,
        "style",
        /*style*/
        e[11]
      ), se(t, "class", "svelte-106mu0e"), He(
        t,
        "fixed",
        /*upload_count*/
        e[5] === 1
      );
    },
    m(i, r) {
      Ye(i, t, r);
    },
    p(i, r) {
      r & /*value_*/
      512 && !Pn(t.src, n = /*value_*/
      i[9][1].url) && se(t, "src", n), r & /*style*/
      2048 && se(
        t,
        "style",
        /*style*/
        i[11]
      ), r & /*upload_count*/
      32 && He(
        t,
        "fixed",
        /*upload_count*/
        i[5] === 1
      );
    },
    i: Tt,
    o: Tt,
    d(i) {
      i && Je(t);
    }
  };
}
function q0(e) {
  let t, n, i = `${/*el_width*/
  e[10] * (1 - /*position*/
  e[1])}px`, r = `translateX(${/*el_width*/
  e[10] * /*position*/
  e[1]}px)`, l;
  return n = new Ql({
    props: {
      unpadded_box: !0,
      size: "large",
      $$slots: { default: [V0] },
      $$scope: { ctx: e }
    }
  }), {
    c() {
      var s, a;
      t = ct("div"), Me(n.$$.fragment), se(t, "class", "empty-wrap fixed svelte-106mu0e"), He(t, "white-icon", !/*value*/
      ((a = (s = e[0]) == null ? void 0 : s[0]) != null && a.url)), pt(t, "width", i), pt(t, "transform", r);
    },
    m(s, a) {
      Ye(s, t, a), De(n, t, null), l = !0;
    },
    p(s, a) {
      var u, f;
      const o = {};
      a & /*$$scope*/
      8388608 && (o.$$scope = { dirty: a, ctx: s }), n.$set(o), (!l || a & /*value*/
      1) && He(t, "white-icon", !/*value*/
      ((f = (u = s[0]) == null ? void 0 : u[0]) != null && f.url)), a & /*el_width, position*/
      1026 && i !== (i = `${/*el_width*/
      s[10] * (1 - /*position*/
      s[1])}px`) && pt(t, "width", i), a & /*el_width, position*/
      1026 && r !== (r = `translateX(${/*el_width*/
      s[10] * /*position*/
      s[1]}px)`) && pt(t, "transform", r);
    },
    i(s) {
      l || (z(n.$$.fragment, s), l = !0);
    },
    o(s) {
      x(n.$$.fragment, s), l = !1;
    },
    d(s) {
      s && Je(t), Re(n);
    }
  };
}
function z0(e) {
  var s;
  let t, n, i;
  function r(a) {
    e[19](a);
  }
  let l = {
    filetype: "image/*",
    disable_click: !!/*value*/
    ((s = e[0]) != null && s[1]),
    root: (
      /*root*/
      e[4]
    ),
    file_count: "multiple",
    $$slots: { default: [j0] },
    $$scope: { ctx: e }
  };
  return (
    /*dragging*/
    e[8] !== void 0 && (l.dragging = /*dragging*/
    e[8]), t = new Ps({ props: l }), sr.push(() => lr(t, "dragging", r)), t.$on(
      "load",
      /*load_handler_1*/
      e[20]
    ), {
      c() {
        Me(t.$$.fragment);
      },
      m(a, o) {
        De(t, a, o), i = !0;
      },
      p(a, o) {
        var f;
        const u = {};
        o & /*value*/
        1 && (u.disable_click = !!/*value*/
        ((f = a[0]) != null && f[1])), o & /*root*/
        16 && (u.root = /*root*/
        a[4]), o & /*$$scope*/
        8388608 && (u.$$scope = { dirty: o, ctx: a }), !n && o & /*dragging*/
        256 && (n = !0, u.dragging = /*dragging*/
        a[8], rr(() => n = !1)), t.$set(u);
      },
      i(a) {
        i || (z(t.$$.fragment, a), i = !0);
      },
      o(a) {
        x(t.$$.fragment, a), i = !1;
      },
      d(a) {
        Re(t, a);
      }
    }
  );
}
function V0(e) {
  let t, n;
  return t = new qn({}), {
    c() {
      Me(t.$$.fragment);
    },
    m(i, r) {
      De(t, i, r), n = !0;
    },
    i(i) {
      n || (z(t.$$.fragment, i), n = !0);
    },
    o(i) {
      x(t.$$.fragment, i), n = !1;
    },
    d(i) {
      Re(t, i);
    }
  };
}
function j0(e) {
  let t;
  const n = (
    /*#slots*/
    e[15].default
  ), i = Ds(
    n,
    e,
    /*$$scope*/
    e[23],
    null
  );
  return {
    c() {
      i && i.c();
    },
    m(r, l) {
      i && i.m(r, l), t = !0;
    },
    p(r, l) {
      i && i.p && (!t || l & /*$$scope*/
      8388608) && Gs(
        i,
        n,
        r,
        /*$$scope*/
        r[23],
        t ? Fs(
          n,
          /*$$scope*/
          r[23],
          l,
          null
        ) : Us(
          /*$$scope*/
          r[23]
        ),
        null
      );
    },
    i(r) {
      t || (z(i, r), t = !0);
    },
    o(r) {
      x(i, r), t = !1;
    },
    d(r) {
      i && i.d(r);
    }
  };
}
function X0(e) {
  let t, n, i, r, l, s, a;
  const o = [U0, D0], u = [];
  function f(g, y) {
    var v;
    return (
      /*value_*/
      (v = g[9]) != null && v[0] ? 1 : 0
    );
  }
  n = f(e), i = u[n] = o[n](e);
  const c = [z0, q0, G0], _ = [];
  function h(g, y) {
    var v, p;
    return !/*value_*/
    ((v = g[9]) != null && v[1]) && /*upload_count*/
    g[5] === 2 ? 0 : !/*value_*/
    ((p = g[9]) != null && p[1]) && /*upload_count*/
    g[5] === 1 ? 1 : 2;
  }
  return l = h(e), s = _[l] = c[l](e), {
    c() {
      t = ct("div"), i.c(), r = yn(), s.c(), se(t, "class", "upload-wrap svelte-106mu0e"), He(
        t,
        "side-by-side",
        /*upload_count*/
        e[5] === 2
      ), pt(
        t,
        "display",
        /*upload_count*/
        e[5] === 2 ? "flex" : "block"
      );
    },
    m(g, y) {
      Ye(g, t, y), u[n].m(t, null), Xi(t, r), _[l].m(t, null), a = !0;
    },
    p(g, y) {
      let v = n;
      n = f(g), n === v ? u[n].p(g, y) : (Wt(), x(u[v], 1, 1, () => {
        u[v] = null;
      }), Xt(), i = u[n], i ? i.p(g, y) : (i = u[n] = o[n](g), i.c()), z(i, 1), i.m(t, r));
      let p = l;
      l = h(g), l === p ? _[l].p(g, y) : (Wt(), x(_[p], 1, 1, () => {
        _[p] = null;
      }), Xt(), s = _[l], s ? s.p(g, y) : (s = _[l] = c[l](g), s.c()), z(s, 1), s.m(t, null)), (!a || y & /*upload_count*/
      32) && He(
        t,
        "side-by-side",
        /*upload_count*/
        g[5] === 2
      ), y & /*upload_count*/
      32 && pt(
        t,
        "display",
        /*upload_count*/
        g[5] === 2 ? "flex" : "block"
      );
    },
    i(g) {
      a || (z(i), z(s), a = !0);
    },
    o(g) {
      x(i), x(s), a = !1;
    },
    d(g) {
      g && Je(t), u[n].d(), _[l].d();
    }
  };
}
function W0(e) {
  var g, y, v, p, w, b, d;
  let t, n, i, r, l, s, a, o, u;
  t = new Zl({
    props: {
      show_label: (
        /*show_label*/
        e[3]
      ),
      Icon: qn,
      label: (
        /*label*/
        e[2] || "Image"
      )
    }
  });
  let f = (
    /*value*/
    (((y = (g = e[0]) == null ? void 0 : g[0]) == null ? void 0 : y.url) || /*value*/
    ((p = (v = e[0]) == null ? void 0 : v[1]) == null ? void 0 : p.url)) && nl(e)
  ), c = (
    /*value*/
    ((b = (w = e[0]) == null ? void 0 : w[1]) == null ? void 0 : b.url) && il(e)
  );
  function _(m) {
    e[21](m);
  }
  let h = {
    disabled: (
      /*upload_count*/
      e[5] == 2 || !/*value*/
      ((d = e[0]) != null && d[0])
    ),
    slider_color: (
      /*slider_color*/
      e[7]
    ),
    $$slots: { default: [X0] },
    $$scope: { ctx: e }
  };
  return (
    /*position*/
    e[1] !== void 0 && (h.position = /*position*/
    e[1]), s = new jl({ props: h }), sr.push(() => lr(s, "position", _)), {
      c() {
        Me(t.$$.fragment), n = yn(), i = ct("div"), f && f.c(), r = yn(), c && c.c(), l = yn(), Me(s.$$.fragment), se(i, "data-testid", "image"), se(i, "class", "image-container svelte-106mu0e"), H0(() => (
          /*div_elementresize_handler*/
          e[22].call(i)
        ));
      },
      m(m, B) {
        De(t, m, B), Ye(m, n, B), Ye(m, i, B), f && f.m(i, null), Xi(i, r), c && c.m(i, null), Xi(i, l), De(s, i, null), o = P0(
          i,
          /*div_elementresize_handler*/
          e[22].bind(i)
        ), u = !0;
      },
      p(m, [B]) {
        var U, F, T, ee, A, C, k;
        const P = {};
        B & /*show_label*/
        8 && (P.show_label = /*show_label*/
        m[3]), B & /*label*/
        4 && (P.label = /*label*/
        m[2] || "Image"), t.$set(P), /*value*/
        (F = (U = m[0]) == null ? void 0 : U[0]) != null && F.url || /*value*/
        (ee = (T = m[0]) == null ? void 0 : T[1]) != null && ee.url ? f ? (f.p(m, B), B & /*value*/
        1 && z(f, 1)) : (f = nl(m), f.c(), z(f, 1), f.m(i, r)) : f && (Wt(), x(f, 1, 1, () => {
          f = null;
        }), Xt()), /*value*/
        (C = (A = m[0]) == null ? void 0 : A[1]) != null && C.url ? c ? (c.p(m, B), B & /*value*/
        1 && z(c, 1)) : (c = il(m), c.c(), z(c, 1), c.m(i, l)) : c && (Wt(), x(c, 1, 1, () => {
          c = null;
        }), Xt());
        const L = {};
        B & /*upload_count, value*/
        33 && (L.disabled = /*upload_count*/
        m[5] == 2 || !/*value*/
        ((k = m[0]) != null && k[0])), B & /*slider_color*/
        128 && (L.slider_color = /*slider_color*/
        m[7]), B & /*$$scope, upload_count, value, root, dragging, value_, el_width, position, style*/
        8392499 && (L.$$scope = { dirty: B, ctx: m }), !a && B & /*position*/
        2 && (a = !0, L.position = /*position*/
        m[1], rr(() => a = !1)), s.$set(L);
      },
      i(m) {
        u || (z(t.$$.fragment, m), z(f), z(c), z(s.$$.fragment, m), u = !0);
      },
      o(m) {
        x(t.$$.fragment, m), x(f), x(c), x(s.$$.fragment, m), u = !1;
      },
      d(m) {
        m && (Je(n), Je(i)), Re(t, m), f && f.d(), c && c.d(), Re(s), o();
      }
    }
  );
}
function x0(e, t, n) {
  let i, { $$slots: r = {}, $$scope: l } = t, { value: s } = t, { label: a = void 0 } = t, { show_label: o } = t, { root: u } = t, { position: f } = t, { upload_count: c = 2 } = t, { show_download_button: _ = !0 } = t, { slider_color: h } = t, g = s || [null, null];
  async function y({ detail: T }, ee) {
    T.length > 1 ? (n(0, s[0] = ke(T[0], u, null), s), n(0, s[1] = ke(T[1], u, null), s)) : n(0, s[ee] = ke(T[0], u, null), s), await M0(), p("upload", s);
  }
  let v = "";
  const p = O0();
  let w = !1, b;
  const d = () => {
    n(1, f = 0.5), n(0, s = [null, null]), p("clear");
  };
  function m(T) {
    w = T, n(8, w);
  }
  const B = (T) => y(T, 0);
  function P(T) {
    w = T, n(8, w);
  }
  const L = (T) => y(T, 1);
  function U(T) {
    f = T, n(1, f);
  }
  function F() {
    b = this.clientWidth, n(10, b);
  }
  return e.$$set = (T) => {
    "value" in T && n(0, s = T.value), "label" in T && n(2, a = T.label), "show_label" in T && n(3, o = T.show_label), "root" in T && n(4, u = T.root), "position" in T && n(1, f = T.position), "upload_count" in T && n(5, c = T.upload_count), "show_download_button" in T && n(6, _ = T.show_download_button), "slider_color" in T && n(7, h = T.slider_color), "$$scope" in T && n(23, l = T.$$scope);
  }, e.$$.update = () => {
    e.$$.dirty & /*value, old_value*/
    16385 && JSON.stringify(s) !== v && (n(14, v = JSON.stringify(s)), n(9, g = s)), e.$$.dirty & /*dragging*/
    256 && p("drag", w), e.$$.dirty & /*upload_count, position*/
    34 && n(11, i = c === 1 ? `clip-path: inset(0 0 0 ${f * 100}%)` : "");
  }, [
    s,
    f,
    a,
    o,
    u,
    c,
    _,
    h,
    w,
    g,
    b,
    i,
    y,
    p,
    v,
    r,
    d,
    m,
    B,
    P,
    L,
    U,
    F,
    l
  ];
}
class Z0 extends N0 {
  constructor(t) {
    super(), I0(this, t, x0, W0, L0, {
      value: 0,
      label: 2,
      show_label: 3,
      root: 4,
      position: 1,
      upload_count: 5,
      show_download_button: 6,
      slider_color: 7
    });
  }
}
function bt(e) {
  let t = ["", "k", "M", "G", "T", "P", "E", "Z"], n = 0;
  for (; e > 1e3 && n < t.length - 1; )
    e /= 1e3, n++;
  let i = t[n];
  return (Number.isInteger(e) ? e : e.toFixed(1)) + i;
}
const {
  SvelteComponent: J0,
  append: Ee,
  attr: R,
  component_subscribe: ll,
  detach: Y0,
  element: Q0,
  init: K0,
  insert: $0,
  noop: sl,
  safe_not_equal: ed,
  set_style: un,
  svg_element: Se,
  toggle_class: ol
} = window.__gradio__svelte__internal, { onMount: td } = window.__gradio__svelte__internal;
function nd(e) {
  let t, n, i, r, l, s, a, o, u, f, c, _;
  return {
    c() {
      t = Q0("div"), n = Se("svg"), i = Se("g"), r = Se("path"), l = Se("path"), s = Se("path"), a = Se("path"), o = Se("g"), u = Se("path"), f = Se("path"), c = Se("path"), _ = Se("path"), R(r, "d", "M255.926 0.754768L509.702 139.936V221.027L255.926 81.8465V0.754768Z"), R(r, "fill", "#FF7C00"), R(r, "fill-opacity", "0.4"), R(r, "class", "svelte-43sxxs"), R(l, "d", "M509.69 139.936L254.981 279.641V361.255L509.69 221.55V139.936Z"), R(l, "fill", "#FF7C00"), R(l, "class", "svelte-43sxxs"), R(s, "d", "M0.250138 139.937L254.981 279.641V361.255L0.250138 221.55V139.937Z"), R(s, "fill", "#FF7C00"), R(s, "fill-opacity", "0.4"), R(s, "class", "svelte-43sxxs"), R(a, "d", "M255.923 0.232622L0.236328 139.936V221.55L255.923 81.8469V0.232622Z"), R(a, "fill", "#FF7C00"), R(a, "class", "svelte-43sxxs"), un(i, "transform", "translate(" + /*$top*/
      e[1][0] + "px, " + /*$top*/
      e[1][1] + "px)"), R(u, "d", "M255.926 141.5L509.702 280.681V361.773L255.926 222.592V141.5Z"), R(u, "fill", "#FF7C00"), R(u, "fill-opacity", "0.4"), R(u, "class", "svelte-43sxxs"), R(f, "d", "M509.69 280.679L254.981 420.384V501.998L509.69 362.293V280.679Z"), R(f, "fill", "#FF7C00"), R(f, "class", "svelte-43sxxs"), R(c, "d", "M0.250138 280.681L254.981 420.386V502L0.250138 362.295V280.681Z"), R(c, "fill", "#FF7C00"), R(c, "fill-opacity", "0.4"), R(c, "class", "svelte-43sxxs"), R(_, "d", "M255.923 140.977L0.236328 280.68V362.294L255.923 222.591V140.977Z"), R(_, "fill", "#FF7C00"), R(_, "class", "svelte-43sxxs"), un(o, "transform", "translate(" + /*$bottom*/
      e[2][0] + "px, " + /*$bottom*/
      e[2][1] + "px)"), R(n, "viewBox", "-1200 -1200 3000 3000"), R(n, "fill", "none"), R(n, "xmlns", "http://www.w3.org/2000/svg"), R(n, "class", "svelte-43sxxs"), R(t, "class", "svelte-43sxxs"), ol(
        t,
        "margin",
        /*margin*/
        e[0]
      );
    },
    m(h, g) {
      $0(h, t, g), Ee(t, n), Ee(n, i), Ee(i, r), Ee(i, l), Ee(i, s), Ee(i, a), Ee(n, o), Ee(o, u), Ee(o, f), Ee(o, c), Ee(o, _);
    },
    p(h, [g]) {
      g & /*$top*/
      2 && un(i, "transform", "translate(" + /*$top*/
      h[1][0] + "px, " + /*$top*/
      h[1][1] + "px)"), g & /*$bottom*/
      4 && un(o, "transform", "translate(" + /*$bottom*/
      h[2][0] + "px, " + /*$bottom*/
      h[2][1] + "px)"), g & /*margin*/
      1 && ol(
        t,
        "margin",
        /*margin*/
        h[0]
      );
    },
    i: sl,
    o: sl,
    d(h) {
      h && Y0(t);
    }
  };
}
function id(e, t, n) {
  let i, r, { margin: l = !0 } = t;
  const s = Mr([0, 0]);
  ll(e, s, (_) => n(1, i = _));
  const a = Mr([0, 0]);
  ll(e, a, (_) => n(2, r = _));
  let o;
  async function u() {
    await Promise.all([s.set([125, 140]), a.set([-125, -140])]), await Promise.all([s.set([-125, 140]), a.set([125, -140])]), await Promise.all([s.set([-125, 0]), a.set([125, -0])]), await Promise.all([s.set([125, 0]), a.set([-125, 0])]);
  }
  async function f() {
    await u(), o || f();
  }
  async function c() {
    await Promise.all([s.set([125, 0]), a.set([-125, 0])]), f();
  }
  return td(() => (c(), () => o = !0)), e.$$set = (_) => {
    "margin" in _ && n(0, l = _.margin);
  }, [l, i, r, s, a];
}
class rd extends J0 {
  constructor(t) {
    super(), K0(this, t, id, nd, ed, { margin: 0 });
  }
}
const {
  SvelteComponent: ld,
  append: lt,
  attr: Ce,
  binding_callbacks: al,
  check_outros: qs,
  create_component: sd,
  create_slot: od,
  destroy_component: ad,
  destroy_each: zs,
  detach: H,
  element: Oe,
  empty: Ht,
  ensure_array_like: Hn,
  get_all_dirty_from_scope: ud,
  get_slot_changes: fd,
  group_outros: Vs,
  init: cd,
  insert: I,
  mount_component: _d,
  noop: Wi,
  safe_not_equal: hd,
  set_data: we,
  set_style: We,
  space: Ne,
  text: j,
  toggle_class: pe,
  transition_in: Bt,
  transition_out: Ct,
  update_slot_base: dd
} = window.__gradio__svelte__internal, { tick: md } = window.__gradio__svelte__internal, { onDestroy: gd } = window.__gradio__svelte__internal, pd = (e) => ({}), ul = (e) => ({});
function fl(e, t, n) {
  const i = e.slice();
  return i[38] = t[n], i[40] = n, i;
}
function cl(e, t, n) {
  const i = e.slice();
  return i[38] = t[n], i;
}
function bd(e) {
  let t, n = (
    /*i18n*/
    e[1]("common.error") + ""
  ), i, r, l;
  const s = (
    /*#slots*/
    e[29].error
  ), a = od(
    s,
    e,
    /*$$scope*/
    e[28],
    ul
  );
  return {
    c() {
      t = Oe("span"), i = j(n), r = Ne(), a && a.c(), Ce(t, "class", "error svelte-1txqlrd");
    },
    m(o, u) {
      I(o, t, u), lt(t, i), I(o, r, u), a && a.m(o, u), l = !0;
    },
    p(o, u) {
      (!l || u[0] & /*i18n*/
      2) && n !== (n = /*i18n*/
      o[1]("common.error") + "") && we(i, n), a && a.p && (!l || u[0] & /*$$scope*/
      268435456) && dd(
        a,
        s,
        o,
        /*$$scope*/
        o[28],
        l ? fd(
          s,
          /*$$scope*/
          o[28],
          u,
          pd
        ) : ud(
          /*$$scope*/
          o[28]
        ),
        ul
      );
    },
    i(o) {
      l || (Bt(a, o), l = !0);
    },
    o(o) {
      Ct(a, o), l = !1;
    },
    d(o) {
      o && (H(t), H(r)), a && a.d(o);
    }
  };
}
function wd(e) {
  let t, n, i, r, l, s, a, o, u, f = (
    /*variant*/
    e[8] === "default" && /*show_eta_bar*/
    e[18] && /*show_progress*/
    e[6] === "full" && _l(e)
  );
  function c(b, d) {
    if (
      /*progress*/
      b[7]
    )
      return Ed;
    if (
      /*queue_position*/
      b[2] !== null && /*queue_size*/
      b[3] !== void 0 && /*queue_position*/
      b[2] >= 0
    )
      return yd;
    if (
      /*queue_position*/
      b[2] === 0
    )
      return vd;
  }
  let _ = c(e), h = _ && _(e), g = (
    /*timer*/
    e[5] && ml(e)
  );
  const y = [Td, Ad], v = [];
  function p(b, d) {
    return (
      /*last_progress_level*/
      b[15] != null ? 0 : (
        /*show_progress*/
        b[6] === "full" ? 1 : -1
      )
    );
  }
  ~(l = p(e)) && (s = v[l] = y[l](e));
  let w = !/*timer*/
  e[5] && El(e);
  return {
    c() {
      f && f.c(), t = Ne(), n = Oe("div"), h && h.c(), i = Ne(), g && g.c(), r = Ne(), s && s.c(), a = Ne(), w && w.c(), o = Ht(), Ce(n, "class", "progress-text svelte-1txqlrd"), pe(
        n,
        "meta-text-center",
        /*variant*/
        e[8] === "center"
      ), pe(
        n,
        "meta-text",
        /*variant*/
        e[8] === "default"
      );
    },
    m(b, d) {
      f && f.m(b, d), I(b, t, d), I(b, n, d), h && h.m(n, null), lt(n, i), g && g.m(n, null), I(b, r, d), ~l && v[l].m(b, d), I(b, a, d), w && w.m(b, d), I(b, o, d), u = !0;
    },
    p(b, d) {
      /*variant*/
      b[8] === "default" && /*show_eta_bar*/
      b[18] && /*show_progress*/
      b[6] === "full" ? f ? f.p(b, d) : (f = _l(b), f.c(), f.m(t.parentNode, t)) : f && (f.d(1), f = null), _ === (_ = c(b)) && h ? h.p(b, d) : (h && h.d(1), h = _ && _(b), h && (h.c(), h.m(n, i))), /*timer*/
      b[5] ? g ? g.p(b, d) : (g = ml(b), g.c(), g.m(n, null)) : g && (g.d(1), g = null), (!u || d[0] & /*variant*/
      256) && pe(
        n,
        "meta-text-center",
        /*variant*/
        b[8] === "center"
      ), (!u || d[0] & /*variant*/
      256) && pe(
        n,
        "meta-text",
        /*variant*/
        b[8] === "default"
      );
      let m = l;
      l = p(b), l === m ? ~l && v[l].p(b, d) : (s && (Vs(), Ct(v[m], 1, 1, () => {
        v[m] = null;
      }), qs()), ~l ? (s = v[l], s ? s.p(b, d) : (s = v[l] = y[l](b), s.c()), Bt(s, 1), s.m(a.parentNode, a)) : s = null), /*timer*/
      b[5] ? w && (w.d(1), w = null) : w ? w.p(b, d) : (w = El(b), w.c(), w.m(o.parentNode, o));
    },
    i(b) {
      u || (Bt(s), u = !0);
    },
    o(b) {
      Ct(s), u = !1;
    },
    d(b) {
      b && (H(t), H(n), H(r), H(a), H(o)), f && f.d(b), h && h.d(), g && g.d(), ~l && v[l].d(b), w && w.d(b);
    }
  };
}
function _l(e) {
  let t, n = `translateX(${/*eta_level*/
  (e[17] || 0) * 100 - 100}%)`;
  return {
    c() {
      t = Oe("div"), Ce(t, "class", "eta-bar svelte-1txqlrd"), We(t, "transform", n);
    },
    m(i, r) {
      I(i, t, r);
    },
    p(i, r) {
      r[0] & /*eta_level*/
      131072 && n !== (n = `translateX(${/*eta_level*/
      (i[17] || 0) * 100 - 100}%)`) && We(t, "transform", n);
    },
    d(i) {
      i && H(t);
    }
  };
}
function vd(e) {
  let t;
  return {
    c() {
      t = j("processing |");
    },
    m(n, i) {
      I(n, t, i);
    },
    p: Wi,
    d(n) {
      n && H(t);
    }
  };
}
function yd(e) {
  let t, n = (
    /*queue_position*/
    e[2] + 1 + ""
  ), i, r, l, s;
  return {
    c() {
      t = j("queue: "), i = j(n), r = j("/"), l = j(
        /*queue_size*/
        e[3]
      ), s = j(" |");
    },
    m(a, o) {
      I(a, t, o), I(a, i, o), I(a, r, o), I(a, l, o), I(a, s, o);
    },
    p(a, o) {
      o[0] & /*queue_position*/
      4 && n !== (n = /*queue_position*/
      a[2] + 1 + "") && we(i, n), o[0] & /*queue_size*/
      8 && we(
        l,
        /*queue_size*/
        a[3]
      );
    },
    d(a) {
      a && (H(t), H(i), H(r), H(l), H(s));
    }
  };
}
function Ed(e) {
  let t, n = Hn(
    /*progress*/
    e[7]
  ), i = [];
  for (let r = 0; r < n.length; r += 1)
    i[r] = dl(cl(e, n, r));
  return {
    c() {
      for (let r = 0; r < i.length; r += 1)
        i[r].c();
      t = Ht();
    },
    m(r, l) {
      for (let s = 0; s < i.length; s += 1)
        i[s] && i[s].m(r, l);
      I(r, t, l);
    },
    p(r, l) {
      if (l[0] & /*progress*/
      128) {
        n = Hn(
          /*progress*/
          r[7]
        );
        let s;
        for (s = 0; s < n.length; s += 1) {
          const a = cl(r, n, s);
          i[s] ? i[s].p(a, l) : (i[s] = dl(a), i[s].c(), i[s].m(t.parentNode, t));
        }
        for (; s < i.length; s += 1)
          i[s].d(1);
        i.length = n.length;
      }
    },
    d(r) {
      r && H(t), zs(i, r);
    }
  };
}
function hl(e) {
  let t, n = (
    /*p*/
    e[38].unit + ""
  ), i, r, l = " ", s;
  function a(f, c) {
    return (
      /*p*/
      f[38].length != null ? kd : Sd
    );
  }
  let o = a(e), u = o(e);
  return {
    c() {
      u.c(), t = Ne(), i = j(n), r = j(" | "), s = j(l);
    },
    m(f, c) {
      u.m(f, c), I(f, t, c), I(f, i, c), I(f, r, c), I(f, s, c);
    },
    p(f, c) {
      o === (o = a(f)) && u ? u.p(f, c) : (u.d(1), u = o(f), u && (u.c(), u.m(t.parentNode, t))), c[0] & /*progress*/
      128 && n !== (n = /*p*/
      f[38].unit + "") && we(i, n);
    },
    d(f) {
      f && (H(t), H(i), H(r), H(s)), u.d(f);
    }
  };
}
function Sd(e) {
  let t = bt(
    /*p*/
    e[38].index || 0
  ) + "", n;
  return {
    c() {
      n = j(t);
    },
    m(i, r) {
      I(i, n, r);
    },
    p(i, r) {
      r[0] & /*progress*/
      128 && t !== (t = bt(
        /*p*/
        i[38].index || 0
      ) + "") && we(n, t);
    },
    d(i) {
      i && H(n);
    }
  };
}
function kd(e) {
  let t = bt(
    /*p*/
    e[38].index || 0
  ) + "", n, i, r = bt(
    /*p*/
    e[38].length
  ) + "", l;
  return {
    c() {
      n = j(t), i = j("/"), l = j(r);
    },
    m(s, a) {
      I(s, n, a), I(s, i, a), I(s, l, a);
    },
    p(s, a) {
      a[0] & /*progress*/
      128 && t !== (t = bt(
        /*p*/
        s[38].index || 0
      ) + "") && we(n, t), a[0] & /*progress*/
      128 && r !== (r = bt(
        /*p*/
        s[38].length
      ) + "") && we(l, r);
    },
    d(s) {
      s && (H(n), H(i), H(l));
    }
  };
}
function dl(e) {
  let t, n = (
    /*p*/
    e[38].index != null && hl(e)
  );
  return {
    c() {
      n && n.c(), t = Ht();
    },
    m(i, r) {
      n && n.m(i, r), I(i, t, r);
    },
    p(i, r) {
      /*p*/
      i[38].index != null ? n ? n.p(i, r) : (n = hl(i), n.c(), n.m(t.parentNode, t)) : n && (n.d(1), n = null);
    },
    d(i) {
      i && H(t), n && n.d(i);
    }
  };
}
function ml(e) {
  let t, n = (
    /*eta*/
    e[0] ? `/${/*formatted_eta*/
    e[19]}` : ""
  ), i, r;
  return {
    c() {
      t = j(
        /*formatted_timer*/
        e[20]
      ), i = j(n), r = j("s");
    },
    m(l, s) {
      I(l, t, s), I(l, i, s), I(l, r, s);
    },
    p(l, s) {
      s[0] & /*formatted_timer*/
      1048576 && we(
        t,
        /*formatted_timer*/
        l[20]
      ), s[0] & /*eta, formatted_eta*/
      524289 && n !== (n = /*eta*/
      l[0] ? `/${/*formatted_eta*/
      l[19]}` : "") && we(i, n);
    },
    d(l) {
      l && (H(t), H(i), H(r));
    }
  };
}
function Ad(e) {
  let t, n;
  return t = new rd({
    props: { margin: (
      /*variant*/
      e[8] === "default"
    ) }
  }), {
    c() {
      sd(t.$$.fragment);
    },
    m(i, r) {
      _d(t, i, r), n = !0;
    },
    p(i, r) {
      const l = {};
      r[0] & /*variant*/
      256 && (l.margin = /*variant*/
      i[8] === "default"), t.$set(l);
    },
    i(i) {
      n || (Bt(t.$$.fragment, i), n = !0);
    },
    o(i) {
      Ct(t.$$.fragment, i), n = !1;
    },
    d(i) {
      ad(t, i);
    }
  };
}
function Td(e) {
  let t, n, i, r, l, s = `${/*last_progress_level*/
  e[15] * 100}%`, a = (
    /*progress*/
    e[7] != null && gl(e)
  );
  return {
    c() {
      t = Oe("div"), n = Oe("div"), a && a.c(), i = Ne(), r = Oe("div"), l = Oe("div"), Ce(n, "class", "progress-level-inner svelte-1txqlrd"), Ce(l, "class", "progress-bar svelte-1txqlrd"), We(l, "width", s), Ce(r, "class", "progress-bar-wrap svelte-1txqlrd"), Ce(t, "class", "progress-level svelte-1txqlrd");
    },
    m(o, u) {
      I(o, t, u), lt(t, n), a && a.m(n, null), lt(t, i), lt(t, r), lt(r, l), e[30](l);
    },
    p(o, u) {
      /*progress*/
      o[7] != null ? a ? a.p(o, u) : (a = gl(o), a.c(), a.m(n, null)) : a && (a.d(1), a = null), u[0] & /*last_progress_level*/
      32768 && s !== (s = `${/*last_progress_level*/
      o[15] * 100}%`) && We(l, "width", s);
    },
    i: Wi,
    o: Wi,
    d(o) {
      o && H(t), a && a.d(), e[30](null);
    }
  };
}
function gl(e) {
  let t, n = Hn(
    /*progress*/
    e[7]
  ), i = [];
  for (let r = 0; r < n.length; r += 1)
    i[r] = yl(fl(e, n, r));
  return {
    c() {
      for (let r = 0; r < i.length; r += 1)
        i[r].c();
      t = Ht();
    },
    m(r, l) {
      for (let s = 0; s < i.length; s += 1)
        i[s] && i[s].m(r, l);
      I(r, t, l);
    },
    p(r, l) {
      if (l[0] & /*progress_level, progress*/
      16512) {
        n = Hn(
          /*progress*/
          r[7]
        );
        let s;
        for (s = 0; s < n.length; s += 1) {
          const a = fl(r, n, s);
          i[s] ? i[s].p(a, l) : (i[s] = yl(a), i[s].c(), i[s].m(t.parentNode, t));
        }
        for (; s < i.length; s += 1)
          i[s].d(1);
        i.length = n.length;
      }
    },
    d(r) {
      r && H(t), zs(i, r);
    }
  };
}
function pl(e) {
  let t, n, i, r, l = (
    /*i*/
    e[40] !== 0 && Bd()
  ), s = (
    /*p*/
    e[38].desc != null && bl(e)
  ), a = (
    /*p*/
    e[38].desc != null && /*progress_level*/
    e[14] && /*progress_level*/
    e[14][
      /*i*/
      e[40]
    ] != null && wl()
  ), o = (
    /*progress_level*/
    e[14] != null && vl(e)
  );
  return {
    c() {
      l && l.c(), t = Ne(), s && s.c(), n = Ne(), a && a.c(), i = Ne(), o && o.c(), r = Ht();
    },
    m(u, f) {
      l && l.m(u, f), I(u, t, f), s && s.m(u, f), I(u, n, f), a && a.m(u, f), I(u, i, f), o && o.m(u, f), I(u, r, f);
    },
    p(u, f) {
      /*p*/
      u[38].desc != null ? s ? s.p(u, f) : (s = bl(u), s.c(), s.m(n.parentNode, n)) : s && (s.d(1), s = null), /*p*/
      u[38].desc != null && /*progress_level*/
      u[14] && /*progress_level*/
      u[14][
        /*i*/
        u[40]
      ] != null ? a || (a = wl(), a.c(), a.m(i.parentNode, i)) : a && (a.d(1), a = null), /*progress_level*/
      u[14] != null ? o ? o.p(u, f) : (o = vl(u), o.c(), o.m(r.parentNode, r)) : o && (o.d(1), o = null);
    },
    d(u) {
      u && (H(t), H(n), H(i), H(r)), l && l.d(u), s && s.d(u), a && a.d(u), o && o.d(u);
    }
  };
}
function Bd(e) {
  let t;
  return {
    c() {
      t = j(" /");
    },
    m(n, i) {
      I(n, t, i);
    },
    d(n) {
      n && H(t);
    }
  };
}
function bl(e) {
  let t = (
    /*p*/
    e[38].desc + ""
  ), n;
  return {
    c() {
      n = j(t);
    },
    m(i, r) {
      I(i, n, r);
    },
    p(i, r) {
      r[0] & /*progress*/
      128 && t !== (t = /*p*/
      i[38].desc + "") && we(n, t);
    },
    d(i) {
      i && H(n);
    }
  };
}
function wl(e) {
  let t;
  return {
    c() {
      t = j("-");
    },
    m(n, i) {
      I(n, t, i);
    },
    d(n) {
      n && H(t);
    }
  };
}
function vl(e) {
  let t = (100 * /*progress_level*/
  (e[14][
    /*i*/
    e[40]
  ] || 0)).toFixed(1) + "", n, i;
  return {
    c() {
      n = j(t), i = j("%");
    },
    m(r, l) {
      I(r, n, l), I(r, i, l);
    },
    p(r, l) {
      l[0] & /*progress_level*/
      16384 && t !== (t = (100 * /*progress_level*/
      (r[14][
        /*i*/
        r[40]
      ] || 0)).toFixed(1) + "") && we(n, t);
    },
    d(r) {
      r && (H(n), H(i));
    }
  };
}
function yl(e) {
  let t, n = (
    /*p*/
    (e[38].desc != null || /*progress_level*/
    e[14] && /*progress_level*/
    e[14][
      /*i*/
      e[40]
    ] != null) && pl(e)
  );
  return {
    c() {
      n && n.c(), t = Ht();
    },
    m(i, r) {
      n && n.m(i, r), I(i, t, r);
    },
    p(i, r) {
      /*p*/
      i[38].desc != null || /*progress_level*/
      i[14] && /*progress_level*/
      i[14][
        /*i*/
        i[40]
      ] != null ? n ? n.p(i, r) : (n = pl(i), n.c(), n.m(t.parentNode, t)) : n && (n.d(1), n = null);
    },
    d(i) {
      i && H(t), n && n.d(i);
    }
  };
}
function El(e) {
  let t, n;
  return {
    c() {
      t = Oe("p"), n = j(
        /*loading_text*/
        e[9]
      ), Ce(t, "class", "loading svelte-1txqlrd");
    },
    m(i, r) {
      I(i, t, r), lt(t, n);
    },
    p(i, r) {
      r[0] & /*loading_text*/
      512 && we(
        n,
        /*loading_text*/
        i[9]
      );
    },
    d(i) {
      i && H(t);
    }
  };
}
function Cd(e) {
  let t, n, i, r, l;
  const s = [wd, bd], a = [];
  function o(u, f) {
    return (
      /*status*/
      u[4] === "pending" ? 0 : (
        /*status*/
        u[4] === "error" ? 1 : -1
      )
    );
  }
  return ~(n = o(e)) && (i = a[n] = s[n](e)), {
    c() {
      t = Oe("div"), i && i.c(), Ce(t, "class", r = "wrap " + /*variant*/
      e[8] + " " + /*show_progress*/
      e[6] + " svelte-1txqlrd"), pe(t, "hide", !/*status*/
      e[4] || /*status*/
      e[4] === "complete" || /*show_progress*/
      e[6] === "hidden"), pe(
        t,
        "translucent",
        /*variant*/
        e[8] === "center" && /*status*/
        (e[4] === "pending" || /*status*/
        e[4] === "error") || /*translucent*/
        e[11] || /*show_progress*/
        e[6] === "minimal"
      ), pe(
        t,
        "generating",
        /*status*/
        e[4] === "generating"
      ), pe(
        t,
        "border",
        /*border*/
        e[12]
      ), We(
        t,
        "position",
        /*absolute*/
        e[10] ? "absolute" : "static"
      ), We(
        t,
        "padding",
        /*absolute*/
        e[10] ? "0" : "var(--size-8) 0"
      );
    },
    m(u, f) {
      I(u, t, f), ~n && a[n].m(t, null), e[31](t), l = !0;
    },
    p(u, f) {
      let c = n;
      n = o(u), n === c ? ~n && a[n].p(u, f) : (i && (Vs(), Ct(a[c], 1, 1, () => {
        a[c] = null;
      }), qs()), ~n ? (i = a[n], i ? i.p(u, f) : (i = a[n] = s[n](u), i.c()), Bt(i, 1), i.m(t, null)) : i = null), (!l || f[0] & /*variant, show_progress*/
      320 && r !== (r = "wrap " + /*variant*/
      u[8] + " " + /*show_progress*/
      u[6] + " svelte-1txqlrd")) && Ce(t, "class", r), (!l || f[0] & /*variant, show_progress, status, show_progress*/
      336) && pe(t, "hide", !/*status*/
      u[4] || /*status*/
      u[4] === "complete" || /*show_progress*/
      u[6] === "hidden"), (!l || f[0] & /*variant, show_progress, variant, status, translucent, show_progress*/
      2384) && pe(
        t,
        "translucent",
        /*variant*/
        u[8] === "center" && /*status*/
        (u[4] === "pending" || /*status*/
        u[4] === "error") || /*translucent*/
        u[11] || /*show_progress*/
        u[6] === "minimal"
      ), (!l || f[0] & /*variant, show_progress, status*/
      336) && pe(
        t,
        "generating",
        /*status*/
        u[4] === "generating"
      ), (!l || f[0] & /*variant, show_progress, border*/
      4416) && pe(
        t,
        "border",
        /*border*/
        u[12]
      ), f[0] & /*absolute*/
      1024 && We(
        t,
        "position",
        /*absolute*/
        u[10] ? "absolute" : "static"
      ), f[0] & /*absolute*/
      1024 && We(
        t,
        "padding",
        /*absolute*/
        u[10] ? "0" : "var(--size-8) 0"
      );
    },
    i(u) {
      l || (Bt(i), l = !0);
    },
    o(u) {
      Ct(i), l = !1;
    },
    d(u) {
      u && H(t), ~n && a[n].d(), e[31](null);
    }
  };
}
let fn = [], Si = !1;
async function Nd(e, t = !0) {
  if (!(window.__gradio_mode__ === "website" || window.__gradio_mode__ !== "app" && t !== !0)) {
    if (fn.push(e), !Si)
      Si = !0;
    else
      return;
    await md(), requestAnimationFrame(() => {
      let n = [0, 0];
      for (let i = 0; i < fn.length; i++) {
        const l = fn[i].getBoundingClientRect();
        (i === 0 || l.top + window.scrollY <= n[0]) && (n[0] = l.top + window.scrollY, n[1] = i);
      }
      window.scrollTo({ top: n[0] - 20, behavior: "smooth" }), Si = !1, fn = [];
    });
  }
}
function Pd(e, t, n) {
  let i, { $$slots: r = {}, $$scope: l } = t, { i18n: s } = t, { eta: a = null } = t, { queue: o = !1 } = t, { queue_position: u } = t, { queue_size: f } = t, { status: c } = t, { scroll_to_output: _ = !1 } = t, { timer: h = !0 } = t, { show_progress: g = "full" } = t, { message: y = null } = t, { progress: v = null } = t, { variant: p = "default" } = t, { loading_text: w = "Loading..." } = t, { absolute: b = !0 } = t, { translucent: d = !1 } = t, { border: m = !1 } = t, { autoscroll: B } = t, P, L = !1, U = 0, F = 0, T = null, ee = 0, A = null, C, k = null, K = !0;
  const V = () => {
    n(25, U = performance.now()), n(26, F = 0), L = !0, N();
  };
  function N() {
    requestAnimationFrame(() => {
      n(26, F = (performance.now() - U) / 1e3), L && N();
    });
  }
  function X() {
    n(26, F = 0), L && (L = !1);
  }
  gd(() => {
    L && X();
  });
  let S = null;
  function G(E) {
    al[E ? "unshift" : "push"](() => {
      k = E, n(16, k), n(7, v), n(14, A), n(15, C);
    });
  }
  function Z(E) {
    al[E ? "unshift" : "push"](() => {
      P = E, n(13, P);
    });
  }
  return e.$$set = (E) => {
    "i18n" in E && n(1, s = E.i18n), "eta" in E && n(0, a = E.eta), "queue" in E && n(21, o = E.queue), "queue_position" in E && n(2, u = E.queue_position), "queue_size" in E && n(3, f = E.queue_size), "status" in E && n(4, c = E.status), "scroll_to_output" in E && n(22, _ = E.scroll_to_output), "timer" in E && n(5, h = E.timer), "show_progress" in E && n(6, g = E.show_progress), "message" in E && n(23, y = E.message), "progress" in E && n(7, v = E.progress), "variant" in E && n(8, p = E.variant), "loading_text" in E && n(9, w = E.loading_text), "absolute" in E && n(10, b = E.absolute), "translucent" in E && n(11, d = E.translucent), "border" in E && n(12, m = E.border), "autoscroll" in E && n(24, B = E.autoscroll), "$$scope" in E && n(28, l = E.$$scope);
  }, e.$$.update = () => {
    e.$$.dirty[0] & /*eta, old_eta, queue, timer_start*/
    169869313 && (a === null ? n(0, a = T) : o && n(0, a = (performance.now() - U) / 1e3 + a), a != null && (n(19, S = a.toFixed(1)), n(27, T = a))), e.$$.dirty[0] & /*eta, timer_diff*/
    67108865 && n(17, ee = a === null || a <= 0 || !F ? null : Math.min(F / a, 1)), e.$$.dirty[0] & /*progress*/
    128 && v != null && n(18, K = !1), e.$$.dirty[0] & /*progress, progress_level, progress_bar, last_progress_level*/
    114816 && (v != null ? n(14, A = v.map((E) => {
      if (E.index != null && E.length != null)
        return E.index / E.length;
      if (E.progress != null)
        return E.progress;
    })) : n(14, A = null), A ? (n(15, C = A[A.length - 1]), k && (C === 0 ? n(16, k.style.transition = "0", k) : n(16, k.style.transition = "150ms", k))) : n(15, C = void 0)), e.$$.dirty[0] & /*status*/
    16 && (c === "pending" ? V() : X()), e.$$.dirty[0] & /*el, scroll_to_output, status, autoscroll*/
    20979728 && P && _ && (c === "pending" || c === "complete") && Nd(P, B), e.$$.dirty[0] & /*status, message*/
    8388624, e.$$.dirty[0] & /*timer_diff*/
    67108864 && n(20, i = F.toFixed(1));
  }, [
    a,
    s,
    u,
    f,
    c,
    h,
    g,
    v,
    p,
    w,
    b,
    d,
    m,
    P,
    A,
    C,
    k,
    ee,
    K,
    S,
    i,
    o,
    _,
    y,
    B,
    U,
    F,
    T,
    l,
    r,
    G,
    Z
  ];
}
class js extends ld {
  constructor(t) {
    super(), cd(
      this,
      t,
      Pd,
      Cd,
      hd,
      {
        i18n: 1,
        eta: 0,
        queue: 21,
        queue_position: 2,
        queue_size: 3,
        status: 4,
        scroll_to_output: 22,
        timer: 5,
        show_progress: 6,
        message: 23,
        progress: 7,
        variant: 8,
        loading_text: 9,
        absolute: 10,
        translucent: 11,
        border: 12,
        autoscroll: 24
      },
      null,
      [-1, -1]
    );
  }
}
const {
  SvelteComponent: Hd,
  add_flush_callback: Id,
  assign: Ld,
  bind: Od,
  binding_callbacks: Md,
  create_component: In,
  destroy_component: Ln,
  detach: Rd,
  flush: ie,
  get_spread_object: Dd,
  get_spread_update: Ud,
  init: Fd,
  insert: Gd,
  mount_component: On,
  safe_not_equal: qd,
  space: zd,
  transition_in: Mn,
  transition_out: Rn
} = window.__gradio__svelte__internal;
function Vd(e) {
  let t, n;
  return t = new ac({
    props: {
      i18n: (
        /*gradio*/
        e[16].i18n
      ),
      type: "image"
    }
  }), {
    c() {
      In(t.$$.fragment);
    },
    m(i, r) {
      On(t, i, r), n = !0;
    },
    p(i, r) {
      const l = {};
      r & /*gradio*/
      65536 && (l.i18n = /*gradio*/
      i[16].i18n), t.$set(l);
    },
    i(i) {
      n || (Mn(t.$$.fragment, i), n = !0);
    },
    o(i) {
      Rn(t.$$.fragment, i), n = !1;
    },
    d(i) {
      Ln(t, i);
    }
  };
}
function jd(e) {
  let t, n, i, r, l;
  const s = [
    {
      autoscroll: (
        /*gradio*/
        e[16].autoscroll
      )
    },
    { i18n: (
      /*gradio*/
      e[16].i18n
    ) },
    /*loading_status*/
    e[11]
  ];
  let a = {};
  for (let f = 0; f < s.length; f += 1)
    a = Ld(a, s[f]);
  t = new js({ props: a });
  function o(f) {
    e[19](f);
  }
  let u = {
    slider_color: (
      /*slider_color*/
      e[15]
    ),
    position: (
      /*position*/
      e[13]
    ),
    root: (
      /*root*/
      e[12]
    ),
    label: (
      /*label*/
      e[4]
    ),
    show_label: (
      /*show_label*/
      e[5]
    ),
    upload_count: (
      /*upload_count*/
      e[14]
    ),
    $$slots: { default: [Vd] },
    $$scope: { ctx: e }
  };
  return (
    /*value*/
    e[0] !== void 0 && (u.value = /*value*/
    e[0]), i = new Z0({ props: u }), Md.push(() => Od(i, "value", o)), i.$on(
      "edit",
      /*edit_handler*/
      e[20]
    ), i.$on(
      "clear",
      /*clear_handler*/
      e[21]
    ), i.$on(
      "stream",
      /*stream_handler*/
      e[22]
    ), i.$on(
      "drag",
      /*drag_handler*/
      e[23]
    ), i.$on(
      "upload",
      /*handle_upload*/
      e[18]
    ), i.$on(
      "select",
      /*select_handler*/
      e[24]
    ), i.$on(
      "share",
      /*share_handler*/
      e[25]
    ), {
      c() {
        In(t.$$.fragment), n = zd(), In(i.$$.fragment);
      },
      m(f, c) {
        On(t, f, c), Gd(f, n, c), On(i, f, c), l = !0;
      },
      p(f, c) {
        const _ = c & /*gradio, loading_status*/
        67584 ? Ud(s, [
          c & /*gradio*/
          65536 && {
            autoscroll: (
              /*gradio*/
              f[16].autoscroll
            )
          },
          c & /*gradio*/
          65536 && { i18n: (
            /*gradio*/
            f[16].i18n
          ) },
          c & /*loading_status*/
          2048 && Dd(
            /*loading_status*/
            f[11]
          )
        ]) : {};
        t.$set(_);
        const h = {};
        c & /*slider_color*/
        32768 && (h.slider_color = /*slider_color*/
        f[15]), c & /*position*/
        8192 && (h.position = /*position*/
        f[13]), c & /*root*/
        4096 && (h.root = /*root*/
        f[12]), c & /*label*/
        16 && (h.label = /*label*/
        f[4]), c & /*show_label*/
        32 && (h.show_label = /*show_label*/
        f[5]), c & /*upload_count*/
        16384 && (h.upload_count = /*upload_count*/
        f[14]), c & /*$$scope, gradio*/
        67174400 && (h.$$scope = { dirty: c, ctx: f }), !r && c & /*value*/
        1 && (r = !0, h.value = /*value*/
        f[0], Id(() => r = !1)), i.$set(h);
      },
      i(f) {
        l || (Mn(t.$$.fragment, f), Mn(i.$$.fragment, f), l = !0);
      },
      o(f) {
        Rn(t.$$.fragment, f), Rn(i.$$.fragment, f), l = !1;
      },
      d(f) {
        f && Rd(n), Ln(t, f), Ln(i, f);
      }
    }
  );
}
function Xd(e) {
  let t, n;
  return t = new xl({
    props: {
      visible: (
        /*visible*/
        e[3]
      ),
      variant: (
        /*value*/
        e[0] === null ? "dashed" : "solid"
      ),
      border_mode: (
        /*dragging*/
        e[17] ? "focus" : "base"
      ),
      padding: !1,
      elem_id: (
        /*elem_id*/
        e[1]
      ),
      elem_classes: (
        /*elem_classes*/
        e[2]
      ),
      height: (
        /*height*/
        e[6]
      ),
      width: (
        /*width*/
        e[7]
      ),
      allow_overflow: !1,
      container: (
        /*container*/
        e[8]
      ),
      scale: (
        /*scale*/
        e[9]
      ),
      min_width: (
        /*min_width*/
        e[10]
      ),
      $$slots: { default: [jd] },
      $$scope: { ctx: e }
    }
  }), {
    c() {
      In(t.$$.fragment);
    },
    m(i, r) {
      On(t, i, r), n = !0;
    },
    p(i, [r]) {
      const l = {};
      r & /*visible*/
      8 && (l.visible = /*visible*/
      i[3]), r & /*value*/
      1 && (l.variant = /*value*/
      i[0] === null ? "dashed" : "solid"), r & /*dragging*/
      131072 && (l.border_mode = /*dragging*/
      i[17] ? "focus" : "base"), r & /*elem_id*/
      2 && (l.elem_id = /*elem_id*/
      i[1]), r & /*elem_classes*/
      4 && (l.elem_classes = /*elem_classes*/
      i[2]), r & /*height*/
      64 && (l.height = /*height*/
      i[6]), r & /*width*/
      128 && (l.width = /*width*/
      i[7]), r & /*container*/
      256 && (l.container = /*container*/
      i[8]), r & /*scale*/
      512 && (l.scale = /*scale*/
      i[9]), r & /*min_width*/
      1024 && (l.min_width = /*min_width*/
      i[10]), r & /*$$scope, slider_color, position, root, label, show_label, upload_count, value, gradio, dragging, loading_status*/
      67369009 && (l.$$scope = { dirty: r, ctx: i }), t.$set(l);
    },
    i(i) {
      n || (Mn(t.$$.fragment, i), n = !0);
    },
    o(i) {
      Rn(t.$$.fragment, i), n = !1;
    },
    d(i) {
      Ln(t, i);
    }
  };
}
function Wd(e, t, n) {
  let { elem_id: i = "" } = t, { elem_classes: r = [] } = t, { visible: l = !0 } = t, { value: s = [null, null] } = t, { label: a } = t, { show_label: o } = t, { height: u } = t, { width: f } = t, { container: c = !0 } = t, { scale: _ = null } = t, { min_width: h = void 0 } = t, { loading_status: g } = t, { root: y } = t, { position: v } = t, { upload_count: p = 2 } = t, { slider_color: w } = t, { gradio: b } = t, d;
  async function m({ detail: A }) {
    n(0, s = A), b.dispatch("upload");
  }
  function B(A) {
    s = A, n(0, s), n(12, y);
  }
  const P = () => b.dispatch("edit"), L = () => b.dispatch("clear"), U = () => b.dispatch("stream"), F = ({ detail: A }) => n(17, d = A), T = ({ detail: A }) => b.dispatch("select", A), ee = ({ detail: A }) => b.dispatch("share", A);
  return e.$$set = (A) => {
    "elem_id" in A && n(1, i = A.elem_id), "elem_classes" in A && n(2, r = A.elem_classes), "visible" in A && n(3, l = A.visible), "value" in A && n(0, s = A.value), "label" in A && n(4, a = A.label), "show_label" in A && n(5, o = A.show_label), "height" in A && n(6, u = A.height), "width" in A && n(7, f = A.width), "container" in A && n(8, c = A.container), "scale" in A && n(9, _ = A.scale), "min_width" in A && n(10, h = A.min_width), "loading_status" in A && n(11, g = A.loading_status), "root" in A && n(12, y = A.root), "position" in A && n(13, v = A.position), "upload_count" in A && n(14, p = A.upload_count), "slider_color" in A && n(15, w = A.slider_color), "gradio" in A && n(16, b = A.gradio);
  }, e.$$.update = () => {
    e.$$.dirty & /*value, root*/
    4097 && n(0, s = s ? ke(s, y, null) : null), e.$$.dirty & /*value, gradio*/
    65537 && b.dispatch("change");
  }, [
    s,
    i,
    r,
    l,
    a,
    o,
    u,
    f,
    c,
    _,
    h,
    g,
    y,
    v,
    p,
    w,
    b,
    d,
    m,
    B,
    P,
    L,
    U,
    F,
    T,
    ee
  ];
}
class xd extends Hd {
  constructor(t) {
    super(), Fd(this, t, Wd, Xd, qd, {
      elem_id: 1,
      elem_classes: 2,
      visible: 3,
      value: 0,
      label: 4,
      show_label: 5,
      height: 6,
      width: 7,
      container: 8,
      scale: 9,
      min_width: 10,
      loading_status: 11,
      root: 12,
      position: 13,
      upload_count: 14,
      slider_color: 15,
      gradio: 16
    });
  }
  get elem_id() {
    return this.$$.ctx[1];
  }
  set elem_id(t) {
    this.$$set({ elem_id: t }), ie();
  }
  get elem_classes() {
    return this.$$.ctx[2];
  }
  set elem_classes(t) {
    this.$$set({ elem_classes: t }), ie();
  }
  get visible() {
    return this.$$.ctx[3];
  }
  set visible(t) {
    this.$$set({ visible: t }), ie();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(t) {
    this.$$set({ value: t }), ie();
  }
  get label() {
    return this.$$.ctx[4];
  }
  set label(t) {
    this.$$set({ label: t }), ie();
  }
  get show_label() {
    return this.$$.ctx[5];
  }
  set show_label(t) {
    this.$$set({ show_label: t }), ie();
  }
  get height() {
    return this.$$.ctx[6];
  }
  set height(t) {
    this.$$set({ height: t }), ie();
  }
  get width() {
    return this.$$.ctx[7];
  }
  set width(t) {
    this.$$set({ width: t }), ie();
  }
  get container() {
    return this.$$.ctx[8];
  }
  set container(t) {
    this.$$set({ container: t }), ie();
  }
  get scale() {
    return this.$$.ctx[9];
  }
  set scale(t) {
    this.$$set({ scale: t }), ie();
  }
  get min_width() {
    return this.$$.ctx[10];
  }
  set min_width(t) {
    this.$$set({ min_width: t }), ie();
  }
  get loading_status() {
    return this.$$.ctx[11];
  }
  set loading_status(t) {
    this.$$set({ loading_status: t }), ie();
  }
  get root() {
    return this.$$.ctx[12];
  }
  set root(t) {
    this.$$set({ root: t }), ie();
  }
  get position() {
    return this.$$.ctx[13];
  }
  set position(t) {
    this.$$set({ position: t }), ie();
  }
  get upload_count() {
    return this.$$.ctx[14];
  }
  set upload_count(t) {
    this.$$set({ upload_count: t }), ie();
  }
  get slider_color() {
    return this.$$.ctx[15];
  }
  set slider_color(t) {
    this.$$set({ slider_color: t }), ie();
  }
  get gradio() {
    return this.$$.ctx[16];
  }
  set gradio(t) {
    this.$$set({ gradio: t }), ie();
  }
}
const {
  SvelteComponent: Zd,
  add_flush_callback: Jd,
  add_iframe_resize_listener: Yd,
  add_render_callback: Qd,
  attr: ae,
  bind: Kd,
  binding_callbacks: $d,
  check_outros: Xs,
  create_component: It,
  destroy_component: Lt,
  detach: xe,
  element: Dn,
  empty: em,
  group_outros: Ws,
  init: tm,
  insert: Ze,
  mount_component: Ot,
  safe_not_equal: nm,
  space: or,
  src_url_equal: cn,
  toggle_class: _n,
  transition_in: Ae,
  transition_out: Pe
} = window.__gradio__svelte__internal;
function im(e) {
  let t, n, i, r, l, s, a, o = (
    /*show_download_button*/
    e[4] && Sl(e)
  );
  function u(c) {
    e[12](c);
  }
  let f = {
    slider_color: (
      /*slider_color*/
      e[9]
    ),
    $$slots: { default: [sm] },
    $$scope: { ctx: e }
  };
  return (
    /*position*/
    e[1] !== void 0 && (f.position = /*position*/
    e[1]), r = new jl({ props: f }), $d.push(() => Kd(r, "position", u)), {
      c() {
        t = Dn("div"), o && o.c(), n = or(), i = Dn("div"), It(r.$$.fragment), ae(t, "class", "icon-buttons svelte-a2zf8o"), ae(i, "class", "slider-wrap svelte-a2zf8o"), Qd(() => (
          /*div1_elementresize_handler*/
          e[13].call(i)
        ));
      },
      m(c, _) {
        Ze(c, t, _), o && o.m(t, null), Ze(c, n, _), Ze(c, i, _), Ot(r, i, null), s = Yd(
          i,
          /*div1_elementresize_handler*/
          e[13].bind(i)
        ), a = !0;
      },
      p(c, _) {
        /*show_download_button*/
        c[4] ? o ? (o.p(c, _), _ & /*show_download_button*/
        16 && Ae(o, 1)) : (o = Sl(c), o.c(), Ae(o, 1), o.m(t, null)) : o && (Ws(), Pe(o, 1, 1, () => {
          o = null;
        }), Xs());
        const h = {};
        _ & /*slider_color*/
        512 && (h.slider_color = /*slider_color*/
        c[9]), _ & /*$$scope, value, style, layer_images*/
        17537 && (h.$$scope = { dirty: _, ctx: c }), !l && _ & /*position*/
        2 && (l = !0, h.position = /*position*/
        c[1], Jd(() => l = !1)), r.$set(h);
      },
      i(c) {
        a || (Ae(o), Ae(r.$$.fragment, c), a = !0);
      },
      o(c) {
        Pe(o), Pe(r.$$.fragment, c), a = !1;
      },
      d(c) {
        c && (xe(t), xe(n), xe(i)), o && o.d(), Lt(r), s();
      }
    }
  );
}
function rm(e) {
  let t, n;
  return t = new Ql({
    props: {
      unpadded_box: !0,
      size: "large",
      $$slots: { default: [om] },
      $$scope: { ctx: e }
    }
  }), {
    c() {
      It(t.$$.fragment);
    },
    m(i, r) {
      Ot(t, i, r), n = !0;
    },
    p(i, r) {
      const l = {};
      r & /*$$scope*/
      16384 && (l.$$scope = { dirty: r, ctx: i }), t.$set(l);
    },
    i(i) {
      n || (Ae(t.$$.fragment, i), n = !0);
    },
    o(i) {
      Pe(t.$$.fragment, i), n = !1;
    },
    d(i) {
      Lt(t, i);
    }
  };
}
function Sl(e) {
  let t, n;
  return t = new ir({
    props: {
      href: (
        /*value*/
        e[0][1].url
      ),
      download: (
        /*value*/
        e[0][1].orig_name || "image"
      ),
      $$slots: { default: [lm] },
      $$scope: { ctx: e }
    }
  }), {
    c() {
      It(t.$$.fragment);
    },
    m(i, r) {
      Ot(t, i, r), n = !0;
    },
    p(i, r) {
      const l = {};
      r & /*value*/
      1 && (l.href = /*value*/
      i[0][1].url), r & /*value*/
      1 && (l.download = /*value*/
      i[0][1].orig_name || "image"), r & /*$$scope, i18n*/
      16448 && (l.$$scope = { dirty: r, ctx: i }), t.$set(l);
    },
    i(i) {
      n || (Ae(t.$$.fragment, i), n = !0);
    },
    o(i) {
      Pe(t.$$.fragment, i), n = !1;
    },
    d(i) {
      Lt(t, i);
    }
  };
}
function lm(e) {
  let t, n;
  return t = new Gn({
    props: {
      Icon: Zi,
      label: (
        /*i18n*/
        e[6]("common.download")
      )
    }
  }), {
    c() {
      It(t.$$.fragment);
    },
    m(i, r) {
      Ot(t, i, r), n = !0;
    },
    p(i, r) {
      const l = {};
      r & /*i18n*/
      64 && (l.label = /*i18n*/
      i[6]("common.download")), t.$set(l);
    },
    i(i) {
      n || (Ae(t.$$.fragment, i), n = !0);
    },
    o(i) {
      Pe(t.$$.fragment, i), n = !1;
    },
    d(i) {
      Lt(t, i);
    }
  };
}
function sm(e) {
  let t, n, i, r, l;
  return {
    c() {
      var s, a, o, u, f, c;
      t = Dn("img"), i = or(), r = Dn("img"), cn(t.src, n = /*value*/
      (a = (s = e[0]) == null ? void 0 : s[0]) == null ? void 0 : a.url) || ae(t, "src", n), ae(t, "alt", ""), ae(t, "loading", "lazy"), ae(t, "class", "svelte-a2zf8o"), cn(r.src, l = /*value*/
      (u = (o = e[0]) == null ? void 0 : o[1]) == null ? void 0 : u.url) || ae(r, "src", l), ae(r, "alt", ""), ae(r, "loading", "lazy"), ae(
        r,
        "style",
        /*style*/
        e[10]
      ), ae(r, "class", "svelte-a2zf8o"), _n(
        r,
        "fixed",
        /*layer_images*/
        e[7]
      ), _n(r, "hidden", !/*value*/
      ((c = (f = e[0]) == null ? void 0 : f[1]) != null && c.url));
    },
    m(s, a) {
      Ze(s, t, a), Ze(s, i, a), Ze(s, r, a);
    },
    p(s, a) {
      var o, u, f, c, _, h;
      a & /*value*/
      1 && !cn(t.src, n = /*value*/
      (u = (o = s[0]) == null ? void 0 : o[0]) == null ? void 0 : u.url) && ae(t, "src", n), a & /*value*/
      1 && !cn(r.src, l = /*value*/
      (c = (f = s[0]) == null ? void 0 : f[1]) == null ? void 0 : c.url) && ae(r, "src", l), a & /*style*/
      1024 && ae(
        r,
        "style",
        /*style*/
        s[10]
      ), a & /*layer_images*/
      128 && _n(
        r,
        "fixed",
        /*layer_images*/
        s[7]
      ), a & /*value*/
      1 && _n(r, "hidden", !/*value*/
      ((h = (_ = s[0]) == null ? void 0 : _[1]) != null && h.url));
    },
    d(s) {
      s && (xe(t), xe(i), xe(r));
    }
  };
}
function om(e) {
  let t, n;
  return t = new qn({}), {
    c() {
      It(t.$$.fragment);
    },
    m(i, r) {
      Ot(t, i, r), n = !0;
    },
    i(i) {
      n || (Ae(t.$$.fragment, i), n = !0);
    },
    o(i) {
      Pe(t.$$.fragment, i), n = !1;
    },
    d(i) {
      Lt(t, i);
    }
  };
}
function am(e) {
  let t, n, i, r, l, s;
  t = new Zl({
    props: {
      show_label: (
        /*show_label*/
        e[5]
      ),
      Icon: qn,
      label: (
        /*label*/
        e[3] || /*i18n*/
        e[6]("image.image")
      )
    }
  });
  const a = [rm, im], o = [];
  function u(f, c) {
    return (
      /*value*/
      (f[0] === null || /*value*/
      f[0][0] === null || /*value*/
      f[0][1] === null) && !/*show_single*/
      f[8] ? 0 : 1
    );
  }
  return i = u(e), r = o[i] = a[i](e), {
    c() {
      It(t.$$.fragment), n = or(), r.c(), l = em();
    },
    m(f, c) {
      Ot(t, f, c), Ze(f, n, c), o[i].m(f, c), Ze(f, l, c), s = !0;
    },
    p(f, [c]) {
      const _ = {};
      c & /*show_label*/
      32 && (_.show_label = /*show_label*/
      f[5]), c & /*label, i18n*/
      72 && (_.label = /*label*/
      f[3] || /*i18n*/
      f[6]("image.image")), t.$set(_);
      let h = i;
      i = u(f), i === h ? o[i].p(f, c) : (Ws(), Pe(o[h], 1, 1, () => {
        o[h] = null;
      }), Xs(), r = o[i], r ? r.p(f, c) : (r = o[i] = a[i](f), r.c()), Ae(r, 1), r.m(l.parentNode, l));
    },
    i(f) {
      s || (Ae(t.$$.fragment, f), Ae(r), s = !0);
    },
    o(f) {
      Pe(t.$$.fragment, f), Pe(r), s = !1;
    },
    d(f) {
      f && (xe(n), xe(l)), Lt(t, f), o[i].d(f);
    }
  };
}
function um(e, t, n) {
  let i, { value: r = [null, null] } = t, { label: l = void 0 } = t, { show_download_button: s = !0 } = t, { show_label: a } = t, { root: o } = t, { i18n: u } = t, { position: f } = t, { layer_images: c = !0 } = t, { show_single: _ = !1 } = t, { slider_color: h } = t, { el_width: g } = t;
  function y(p) {
    f = p, n(1, f);
  }
  function v() {
    g = this.clientWidth, n(2, g);
  }
  return e.$$set = (p) => {
    "value" in p && n(0, r = p.value), "label" in p && n(3, l = p.label), "show_download_button" in p && n(4, s = p.show_download_button), "show_label" in p && n(5, a = p.show_label), "root" in p && n(11, o = p.root), "i18n" in p && n(6, u = p.i18n), "position" in p && n(1, f = p.position), "layer_images" in p && n(7, c = p.layer_images), "show_single" in p && n(8, _ = p.show_single), "slider_color" in p && n(9, h = p.slider_color), "el_width" in p && n(2, g = p.el_width);
  }, e.$$.update = () => {
    e.$$.dirty & /*value, root*/
    2049 && n(0, r = ke(r, o, null)), e.$$.dirty & /*layer_images, position*/
    130 && n(10, i = c ? `clip-path: inset(0 0 0 ${f * 100}%)` : "");
  }, [
    r,
    f,
    g,
    l,
    s,
    a,
    u,
    c,
    _,
    h,
    i,
    o,
    y,
    v
  ];
}
class fm extends Zd {
  constructor(t) {
    super(), tm(this, t, um, am, nm, {
      value: 0,
      label: 3,
      show_download_button: 4,
      show_label: 5,
      root: 11,
      i18n: 6,
      position: 1,
      layer_images: 7,
      show_single: 8,
      slider_color: 9,
      el_width: 2
    });
  }
}
const {
  SvelteComponent: cm,
  add_flush_callback: kl,
  assign: _m,
  attr: Al,
  bind: Tl,
  binding_callbacks: Bl,
  check_outros: hm,
  create_component: xt,
  destroy_component: Zt,
  detach: hn,
  element: Cl,
  flush: Q,
  get_spread_object: dm,
  get_spread_update: mm,
  group_outros: gm,
  init: pm,
  insert: dn,
  mount_component: Jt,
  safe_not_equal: bm,
  set_style: mn,
  space: Nl,
  toggle_class: Pl,
  transition_in: je,
  transition_out: st
} = window.__gradio__svelte__internal;
function Hl(e) {
  let t, n;
  return t = new ir({
    props: {
      href: (
        /*value*/
        e[0][1].url
      ),
      download: (
        /*value*/
        e[0][1].orig_name || "image"
      ),
      $$slots: { default: [wm] },
      $$scope: { ctx: e }
    }
  }), {
    c() {
      xt(t.$$.fragment);
    },
    m(i, r) {
      Jt(t, i, r), n = !0;
    },
    p(i, r) {
      const l = {};
      r & /*value*/
      1 && (l.href = /*value*/
      i[0][1].url), r & /*value*/
      1 && (l.download = /*value*/
      i[0][1].orig_name || "image"), r & /*$$scope, i18n*/
      268439552 && (l.$$scope = { dirty: r, ctx: i }), t.$set(l);
    },
    i(i) {
      n || (je(t.$$.fragment, i), n = !0);
    },
    o(i) {
      st(t.$$.fragment, i), n = !1;
    },
    d(i) {
      Zt(t, i);
    }
  };
}
function wm(e) {
  let t, n;
  return t = new Gn({
    props: {
      Icon: Zi,
      label: (
        /*i18n*/
        e[12]("common.download")
      )
    }
  }), {
    c() {
      xt(t.$$.fragment);
    },
    m(i, r) {
      Jt(t, i, r), n = !0;
    },
    p(i, r) {
      const l = {};
      r & /*i18n*/
      4096 && (l.label = /*i18n*/
      i[12]("common.download")), t.$set(l);
    },
    i(i) {
      n || (je(t.$$.fragment, i), n = !0);
    },
    o(i) {
      st(t.$$.fragment, i), n = !1;
    },
    d(i) {
      Zt(t, i);
    }
  };
}
function vm(e) {
  let t, n, i, r, l = `${/*is_half*/
  e[20] ? (
    /*el_width*/
    e[19] * (1 - /*position*/
    e[1])
  ) : (
    /*el_width*/
    e[19]
  )}px`, s = `translateX(${/*is_half*/
  e[20] ? (
    /*el_width*/
    e[19] * /*position*/
    e[1]
  ) : 0}px)`, a, o, u, f, c, _ = (
    /*show_download_button*/
    e[8] && /*value*/
    e[0] && /*value*/
    e[0][1] && Hl(e)
  );
  const h = [
    {
      autoscroll: (
        /*gradio*/
        e[18].autoscroll
      )
    },
    { i18n: (
      /*gradio*/
      e[18].i18n
    ) },
    /*loading_status*/
    e[17]
  ];
  let g = {};
  for (let w = 0; w < h.length; w += 1)
    g = _m(g, h[w]);
  r = new js({ props: g });
  function y(w) {
    e[23](w);
  }
  function v(w) {
    e[24](w);
  }
  let p = {
    root: (
      /*root*/
      e[7]
    ),
    value: (
      /*value*/
      e[0]
    ),
    label: (
      /*label*/
      e[5]
    ),
    show_label: (
      /*show_label*/
      e[6]
    ),
    i18n: (
      /*gradio*/
      e[18].i18n
    ),
    layer_images: (
      /*layer_images*/
      e[11]
    ),
    show_single: (
      /*is_half*/
      e[20]
    ),
    slider_color: (
      /*slider_color*/
      e[13]
    )
  };
  return (
    /*position*/
    e[1] !== void 0 && (p.position = /*position*/
    e[1]), /*el_width*/
    e[19] !== void 0 && (p.el_width = /*el_width*/
    e[19]), o = new fm({ props: p }), Bl.push(() => Tl(o, "position", y)), Bl.push(() => Tl(o, "el_width", v)), o.$on(
      "select",
      /*select_handler*/
      e[25]
    ), o.$on(
      "share",
      /*share_handler*/
      e[26]
    ), o.$on(
      "error",
      /*error_handler*/
      e[27]
    ), {
      c() {
        t = Cl("div"), _ && _.c(), n = Nl(), i = Cl("div"), xt(r.$$.fragment), a = Nl(), xt(o.$$.fragment), Al(t, "class", "icon-buttons svelte-6wvohu"), Al(i, "class", "status-wrap svelte-6wvohu"), Pl(
          i,
          "half",
          /*is_half*/
          e[20]
        ), mn(i, "width", l), mn(i, "transform", s);
      },
      m(w, b) {
        dn(w, t, b), _ && _.m(t, null), dn(w, n, b), dn(w, i, b), Jt(r, i, null), dn(w, a, b), Jt(o, w, b), c = !0;
      },
      p(w, b) {
        /*show_download_button*/
        w[8] && /*value*/
        w[0] && /*value*/
        w[0][1] ? _ ? (_.p(w, b), b & /*show_download_button, value*/
        257 && je(_, 1)) : (_ = Hl(w), _.c(), je(_, 1), _.m(t, null)) : _ && (gm(), st(_, 1, 1, () => {
          _ = null;
        }), hm());
        const d = b & /*gradio, loading_status*/
        393216 ? mm(h, [
          b & /*gradio*/
          262144 && {
            autoscroll: (
              /*gradio*/
              w[18].autoscroll
            )
          },
          b & /*gradio*/
          262144 && { i18n: (
            /*gradio*/
            w[18].i18n
          ) },
          b & /*loading_status*/
          131072 && dm(
            /*loading_status*/
            w[17]
          )
        ]) : {};
        r.$set(d), (!c || b & /*is_half*/
        1048576) && Pl(
          i,
          "half",
          /*is_half*/
          w[20]
        ), b & /*is_half, el_width, position*/
        1572866 && l !== (l = `${/*is_half*/
        w[20] ? (
          /*el_width*/
          w[19] * (1 - /*position*/
          w[1])
        ) : (
          /*el_width*/
          w[19]
        )}px`) && mn(i, "width", l), b & /*is_half, el_width, position*/
        1572866 && s !== (s = `translateX(${/*is_half*/
        w[20] ? (
          /*el_width*/
          w[19] * /*position*/
          w[1]
        ) : 0}px)`) && mn(i, "transform", s);
        const m = {};
        b & /*root*/
        128 && (m.root = /*root*/
        w[7]), b & /*value*/
        1 && (m.value = /*value*/
        w[0]), b & /*label*/
        32 && (m.label = /*label*/
        w[5]), b & /*show_label*/
        64 && (m.show_label = /*show_label*/
        w[6]), b & /*gradio*/
        262144 && (m.i18n = /*gradio*/
        w[18].i18n), b & /*layer_images*/
        2048 && (m.layer_images = /*layer_images*/
        w[11]), b & /*is_half*/
        1048576 && (m.show_single = /*is_half*/
        w[20]), b & /*slider_color*/
        8192 && (m.slider_color = /*slider_color*/
        w[13]), !u && b & /*position*/
        2 && (u = !0, m.position = /*position*/
        w[1], kl(() => u = !1)), !f && b & /*el_width*/
        524288 && (f = !0, m.el_width = /*el_width*/
        w[19], kl(() => f = !1)), o.$set(m);
      },
      i(w) {
        c || (je(_), je(r.$$.fragment, w), je(o.$$.fragment, w), c = !0);
      },
      o(w) {
        st(_), st(r.$$.fragment, w), st(o.$$.fragment, w), c = !1;
      },
      d(w) {
        w && (hn(t), hn(n), hn(i), hn(a)), _ && _.d(), Zt(r), Zt(o, w);
      }
    }
  );
}
function ym(e) {
  let t, n;
  return t = new xl({
    props: {
      visible: (
        /*visible*/
        e[4]
      ),
      variant: "solid",
      border_mode: (
        /*dragging*/
        e[21] ? "focus" : "base"
      ),
      padding: !1,
      elem_id: (
        /*elem_id*/
        e[2]
      ),
      elem_classes: (
        /*elem_classes*/
        e[3]
      ),
      height: (
        /*height*/
        e[9]
      ),
      width: (
        /*width*/
        e[10]
      ),
      allow_overflow: !1,
      container: (
        /*container*/
        e[14]
      ),
      scale: (
        /*scale*/
        e[15]
      ),
      min_width: (
        /*min_width*/
        e[16]
      ),
      $$slots: { default: [vm] },
      $$scope: { ctx: e }
    }
  }), {
    c() {
      xt(t.$$.fragment);
    },
    m(i, r) {
      Jt(t, i, r), n = !0;
    },
    p(i, [r]) {
      const l = {};
      r & /*visible*/
      16 && (l.visible = /*visible*/
      i[4]), r & /*elem_id*/
      4 && (l.elem_id = /*elem_id*/
      i[2]), r & /*elem_classes*/
      8 && (l.elem_classes = /*elem_classes*/
      i[3]), r & /*height*/
      512 && (l.height = /*height*/
      i[9]), r & /*width*/
      1024 && (l.width = /*width*/
      i[10]), r & /*container*/
      16384 && (l.container = /*container*/
      i[14]), r & /*scale*/
      32768 && (l.scale = /*scale*/
      i[15]), r & /*min_width*/
      65536 && (l.min_width = /*min_width*/
      i[16]), r & /*$$scope, root, value, label, show_label, gradio, layer_images, is_half, slider_color, position, el_width, loading_status, i18n, show_download_button*/
      270416355 && (l.$$scope = { dirty: r, ctx: i }), t.$set(l);
    },
    i(i) {
      n || (je(t.$$.fragment, i), n = !0);
    },
    o(i) {
      st(t.$$.fragment, i), n = !1;
    },
    d(i) {
      Zt(t, i);
    }
  };
}
function Em(e, t, n) {
  let i, { elem_id: r = "" } = t, { elem_classes: l = [] } = t, { visible: s = !0 } = t, { value: a = null } = t, { label: o } = t, { show_label: u } = t, { root: f } = t, { upload_count: c = 2 } = t, { show_download_button: _ = !0 } = t, { height: h } = t, { width: g } = t, { layer_images: y = !0 } = t, { i18n: v } = t, { slider_color: p } = t, { container: w = !0 } = t, { scale: b = null } = t, { min_width: d = void 0 } = t, { loading_status: m } = t, { gradio: B } = t, { position: P } = t, L, U;
  function F(k) {
    P = k, n(1, P);
  }
  function T(k) {
    L = k, n(19, L);
  }
  const ee = ({ detail: k }) => B.dispatch("select", k), A = ({ detail: k }) => B.dispatch("share", k), C = ({ detail: k }) => B.dispatch("error", k);
  return e.$$set = (k) => {
    "elem_id" in k && n(2, r = k.elem_id), "elem_classes" in k && n(3, l = k.elem_classes), "visible" in k && n(4, s = k.visible), "value" in k && n(0, a = k.value), "label" in k && n(5, o = k.label), "show_label" in k && n(6, u = k.show_label), "root" in k && n(7, f = k.root), "upload_count" in k && n(22, c = k.upload_count), "show_download_button" in k && n(8, _ = k.show_download_button), "height" in k && n(9, h = k.height), "width" in k && n(10, g = k.width), "layer_images" in k && n(11, y = k.layer_images), "i18n" in k && n(12, v = k.i18n), "slider_color" in k && n(13, p = k.slider_color), "container" in k && n(14, w = k.container), "scale" in k && n(15, b = k.scale), "min_width" in k && n(16, d = k.min_width), "loading_status" in k && n(17, m = k.loading_status), "gradio" in k && n(18, B = k.gradio), "position" in k && n(1, P = k.position);
  }, e.$$.update = () => {
    e.$$.dirty & /*value*/
    1 && n(0, a = a || null), e.$$.dirty & /*value, gradio*/
    262145 && B.dispatch("change"), e.$$.dirty & /*upload_count, value*/
    4194305 && n(20, i = c === 1 && a && a[0] != null && a[1] == null);
  }, [
    a,
    P,
    r,
    l,
    s,
    o,
    u,
    f,
    _,
    h,
    g,
    y,
    v,
    p,
    w,
    b,
    d,
    m,
    B,
    L,
    i,
    U,
    c,
    F,
    T,
    ee,
    A,
    C
  ];
}
class Sm extends cm {
  constructor(t) {
    super(), pm(this, t, Em, ym, bm, {
      elem_id: 2,
      elem_classes: 3,
      visible: 4,
      value: 0,
      label: 5,
      show_label: 6,
      root: 7,
      upload_count: 22,
      show_download_button: 8,
      height: 9,
      width: 10,
      layer_images: 11,
      i18n: 12,
      slider_color: 13,
      container: 14,
      scale: 15,
      min_width: 16,
      loading_status: 17,
      gradio: 18,
      position: 1
    });
  }
  get elem_id() {
    return this.$$.ctx[2];
  }
  set elem_id(t) {
    this.$$set({ elem_id: t }), Q();
  }
  get elem_classes() {
    return this.$$.ctx[3];
  }
  set elem_classes(t) {
    this.$$set({ elem_classes: t }), Q();
  }
  get visible() {
    return this.$$.ctx[4];
  }
  set visible(t) {
    this.$$set({ visible: t }), Q();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(t) {
    this.$$set({ value: t }), Q();
  }
  get label() {
    return this.$$.ctx[5];
  }
  set label(t) {
    this.$$set({ label: t }), Q();
  }
  get show_label() {
    return this.$$.ctx[6];
  }
  set show_label(t) {
    this.$$set({ show_label: t }), Q();
  }
  get root() {
    return this.$$.ctx[7];
  }
  set root(t) {
    this.$$set({ root: t }), Q();
  }
  get upload_count() {
    return this.$$.ctx[22];
  }
  set upload_count(t) {
    this.$$set({ upload_count: t }), Q();
  }
  get show_download_button() {
    return this.$$.ctx[8];
  }
  set show_download_button(t) {
    this.$$set({ show_download_button: t }), Q();
  }
  get height() {
    return this.$$.ctx[9];
  }
  set height(t) {
    this.$$set({ height: t }), Q();
  }
  get width() {
    return this.$$.ctx[10];
  }
  set width(t) {
    this.$$set({ width: t }), Q();
  }
  get layer_images() {
    return this.$$.ctx[11];
  }
  set layer_images(t) {
    this.$$set({ layer_images: t }), Q();
  }
  get i18n() {
    return this.$$.ctx[12];
  }
  set i18n(t) {
    this.$$set({ i18n: t }), Q();
  }
  get slider_color() {
    return this.$$.ctx[13];
  }
  set slider_color(t) {
    this.$$set({ slider_color: t }), Q();
  }
  get container() {
    return this.$$.ctx[14];
  }
  set container(t) {
    this.$$set({ container: t }), Q();
  }
  get scale() {
    return this.$$.ctx[15];
  }
  set scale(t) {
    this.$$set({ scale: t }), Q();
  }
  get min_width() {
    return this.$$.ctx[16];
  }
  set min_width(t) {
    this.$$set({ min_width: t }), Q();
  }
  get loading_status() {
    return this.$$.ctx[17];
  }
  set loading_status(t) {
    this.$$set({ loading_status: t }), Q();
  }
  get gradio() {
    return this.$$.ctx[18];
  }
  set gradio(t) {
    this.$$set({ gradio: t }), Q();
  }
  get position() {
    return this.$$.ctx[1];
  }
  set position(t) {
    this.$$set({ position: t }), Q();
  }
}
const {
  SvelteComponent: km,
  add_flush_callback: xs,
  bind: Zs,
  binding_callbacks: Js,
  check_outros: Am,
  create_component: Ys,
  destroy_component: Qs,
  detach: Tm,
  empty: Bm,
  flush: le,
  group_outros: Cm,
  init: Nm,
  insert: Pm,
  mount_component: Ks,
  safe_not_equal: Hm,
  transition_in: Un,
  transition_out: Fn
} = window.__gradio__svelte__internal;
function Im(e) {
  let t, n, i;
  function r(s) {
    e[17](s);
  }
  let l = {
    slider_color: (
      /*slider_color*/
      e[14]
    ),
    i18n: (
      /*gradio*/
      e[15].i18n
    ),
    elem_id: (
      /*elem_id*/
      e[1]
    ),
    elem_classes: (
      /*elem_classes*/
      e[2]
    ),
    visible: (
      /*visible*/
      e[3]
    ),
    label: (
      /*label*/
      e[4]
    ),
    show_label: (
      /*show_label*/
      e[6]
    ),
    show_download_button: (
      /*show_download_button*/
      e[5]
    ),
    loading_status: (
      /*loading_status*/
      e[10]
    ),
    height: (
      /*height*/
      e[8]
    ),
    width: (
      /*width*/
      e[9]
    ),
    root: (
      /*root*/
      e[7]
    ),
    gradio: (
      /*gradio*/
      e[15]
    ),
    position: (
      /*position*/
      e[12]
    ),
    layer_images: !0,
    upload_count: (
      /*upload_count*/
      e[13]
    )
  };
  return (
    /*value*/
    e[0] !== void 0 && (l.value = /*value*/
    e[0]), t = new Sm({ props: l }), Js.push(() => Zs(t, "value", r)), {
      c() {
        Ys(t.$$.fragment);
      },
      m(s, a) {
        Ks(t, s, a), i = !0;
      },
      p(s, a) {
        const o = {};
        a & /*slider_color*/
        16384 && (o.slider_color = /*slider_color*/
        s[14]), a & /*gradio*/
        32768 && (o.i18n = /*gradio*/
        s[15].i18n), a & /*elem_id*/
        2 && (o.elem_id = /*elem_id*/
        s[1]), a & /*elem_classes*/
        4 && (o.elem_classes = /*elem_classes*/
        s[2]), a & /*visible*/
        8 && (o.visible = /*visible*/
        s[3]), a & /*label*/
        16 && (o.label = /*label*/
        s[4]), a & /*show_label*/
        64 && (o.show_label = /*show_label*/
        s[6]), a & /*show_download_button*/
        32 && (o.show_download_button = /*show_download_button*/
        s[5]), a & /*loading_status*/
        1024 && (o.loading_status = /*loading_status*/
        s[10]), a & /*height*/
        256 && (o.height = /*height*/
        s[8]), a & /*width*/
        512 && (o.width = /*width*/
        s[9]), a & /*root*/
        128 && (o.root = /*root*/
        s[7]), a & /*gradio*/
        32768 && (o.gradio = /*gradio*/
        s[15]), a & /*position*/
        4096 && (o.position = /*position*/
        s[12]), a & /*upload_count*/
        8192 && (o.upload_count = /*upload_count*/
        s[13]), !n && a & /*value*/
        1 && (n = !0, o.value = /*value*/
        s[0], xs(() => n = !1)), t.$set(o);
      },
      i(s) {
        i || (Un(t.$$.fragment, s), i = !0);
      },
      o(s) {
        Fn(t.$$.fragment, s), i = !1;
      },
      d(s) {
        Qs(t, s);
      }
    }
  );
}
function Lm(e) {
  let t, n, i;
  function r(s) {
    e[16](s);
  }
  let l = {
    slider_color: (
      /*slider_color*/
      e[14]
    ),
    elem_id: (
      /*elem_id*/
      e[1]
    ),
    elem_classes: (
      /*elem_classes*/
      e[2]
    ),
    visible: (
      /*visible*/
      e[3]
    ),
    label: (
      /*label*/
      e[4]
    ),
    show_label: (
      /*show_label*/
      e[6]
    ),
    loading_status: (
      /*loading_status*/
      e[10]
    ),
    height: (
      /*height*/
      e[8]
    ),
    width: (
      /*width*/
      e[9]
    ),
    root: (
      /*root*/
      e[7]
    ),
    gradio: (
      /*gradio*/
      e[15]
    ),
    position: (
      /*position*/
      e[12]
    ),
    upload_count: (
      /*upload_count*/
      e[13]
    )
  };
  return (
    /*value*/
    e[0] !== void 0 && (l.value = /*value*/
    e[0]), t = new xd({ props: l }), Js.push(() => Zs(t, "value", r)), {
      c() {
        Ys(t.$$.fragment);
      },
      m(s, a) {
        Ks(t, s, a), i = !0;
      },
      p(s, a) {
        const o = {};
        a & /*slider_color*/
        16384 && (o.slider_color = /*slider_color*/
        s[14]), a & /*elem_id*/
        2 && (o.elem_id = /*elem_id*/
        s[1]), a & /*elem_classes*/
        4 && (o.elem_classes = /*elem_classes*/
        s[2]), a & /*visible*/
        8 && (o.visible = /*visible*/
        s[3]), a & /*label*/
        16 && (o.label = /*label*/
        s[4]), a & /*show_label*/
        64 && (o.show_label = /*show_label*/
        s[6]), a & /*loading_status*/
        1024 && (o.loading_status = /*loading_status*/
        s[10]), a & /*height*/
        256 && (o.height = /*height*/
        s[8]), a & /*width*/
        512 && (o.width = /*width*/
        s[9]), a & /*root*/
        128 && (o.root = /*root*/
        s[7]), a & /*gradio*/
        32768 && (o.gradio = /*gradio*/
        s[15]), a & /*position*/
        4096 && (o.position = /*position*/
        s[12]), a & /*upload_count*/
        8192 && (o.upload_count = /*upload_count*/
        s[13]), !n && a & /*value*/
        1 && (n = !0, o.value = /*value*/
        s[0], xs(() => n = !1)), t.$set(o);
      },
      i(s) {
        i || (Un(t.$$.fragment, s), i = !0);
      },
      o(s) {
        Fn(t.$$.fragment, s), i = !1;
      },
      d(s) {
        Qs(t, s);
      }
    }
  );
}
function Om(e) {
  let t, n, i, r;
  const l = [Lm, Im], s = [];
  function a(o, u) {
    return (
      /*interactive*/
      o[11] ? 0 : 1
    );
  }
  return t = a(e), n = s[t] = l[t](e), {
    c() {
      n.c(), i = Bm();
    },
    m(o, u) {
      s[t].m(o, u), Pm(o, i, u), r = !0;
    },
    p(o, [u]) {
      let f = t;
      t = a(o), t === f ? s[t].p(o, u) : (Cm(), Fn(s[f], 1, 1, () => {
        s[f] = null;
      }), Am(), n = s[t], n ? n.p(o, u) : (n = s[t] = l[t](o), n.c()), Un(n, 1), n.m(i.parentNode, i));
    },
    i(o) {
      r || (Un(n), r = !0);
    },
    o(o) {
      Fn(n), r = !1;
    },
    d(o) {
      o && Tm(i), s[t].d(o);
    }
  };
}
function Mm(e, t, n) {
  let { elem_id: i = "" } = t, { elem_classes: r = [] } = t, { visible: l = !0 } = t, { value: s = [null, null] } = t, { label: a } = t, { show_download_button: o } = t, { show_label: u } = t, { root: f } = t, { height: c } = t, { width: _ } = t, { loading_status: h } = t, { interactive: g } = t, { position: y } = t, { upload_count: v = 2 } = t, { slider_color: p = "var(--border-color-primary)" } = t, { gradio: w } = t;
  function b(m) {
    s = m, n(0, s);
  }
  function d(m) {
    s = m, n(0, s);
  }
  return e.$$set = (m) => {
    "elem_id" in m && n(1, i = m.elem_id), "elem_classes" in m && n(2, r = m.elem_classes), "visible" in m && n(3, l = m.visible), "value" in m && n(0, s = m.value), "label" in m && n(4, a = m.label), "show_download_button" in m && n(5, o = m.show_download_button), "show_label" in m && n(6, u = m.show_label), "root" in m && n(7, f = m.root), "height" in m && n(8, c = m.height), "width" in m && n(9, _ = m.width), "loading_status" in m && n(10, h = m.loading_status), "interactive" in m && n(11, g = m.interactive), "position" in m && n(12, y = m.position), "upload_count" in m && n(13, v = m.upload_count), "slider_color" in m && n(14, p = m.slider_color), "gradio" in m && n(15, w = m.gradio);
  }, [
    s,
    i,
    r,
    l,
    a,
    o,
    u,
    f,
    c,
    _,
    h,
    g,
    y,
    v,
    p,
    w,
    b,
    d
  ];
}
class Vm extends km {
  constructor(t) {
    super(), Nm(this, t, Mm, Om, Hm, {
      elem_id: 1,
      elem_classes: 2,
      visible: 3,
      value: 0,
      label: 4,
      show_download_button: 5,
      show_label: 6,
      root: 7,
      height: 8,
      width: 9,
      loading_status: 10,
      interactive: 11,
      position: 12,
      upload_count: 13,
      slider_color: 14,
      gradio: 15
    });
  }
  get elem_id() {
    return this.$$.ctx[1];
  }
  set elem_id(t) {
    this.$$set({ elem_id: t }), le();
  }
  get elem_classes() {
    return this.$$.ctx[2];
  }
  set elem_classes(t) {
    this.$$set({ elem_classes: t }), le();
  }
  get visible() {
    return this.$$.ctx[3];
  }
  set visible(t) {
    this.$$set({ visible: t }), le();
  }
  get value() {
    return this.$$.ctx[0];
  }
  set value(t) {
    this.$$set({ value: t }), le();
  }
  get label() {
    return this.$$.ctx[4];
  }
  set label(t) {
    this.$$set({ label: t }), le();
  }
  get show_download_button() {
    return this.$$.ctx[5];
  }
  set show_download_button(t) {
    this.$$set({ show_download_button: t }), le();
  }
  get show_label() {
    return this.$$.ctx[6];
  }
  set show_label(t) {
    this.$$set({ show_label: t }), le();
  }
  get root() {
    return this.$$.ctx[7];
  }
  set root(t) {
    this.$$set({ root: t }), le();
  }
  get height() {
    return this.$$.ctx[8];
  }
  set height(t) {
    this.$$set({ height: t }), le();
  }
  get width() {
    return this.$$.ctx[9];
  }
  set width(t) {
    this.$$set({ width: t }), le();
  }
  get loading_status() {
    return this.$$.ctx[10];
  }
  set loading_status(t) {
    this.$$set({ loading_status: t }), le();
  }
  get interactive() {
    return this.$$.ctx[11];
  }
  set interactive(t) {
    this.$$set({ interactive: t }), le();
  }
  get position() {
    return this.$$.ctx[12];
  }
  set position(t) {
    this.$$set({ position: t }), le();
  }
  get upload_count() {
    return this.$$.ctx[13];
  }
  set upload_count(t) {
    this.$$set({ upload_count: t }), le();
  }
  get slider_color() {
    return this.$$.ctx[14];
  }
  set slider_color(t) {
    this.$$set({ slider_color: t }), le();
  }
  get gradio() {
    return this.$$.ctx[15];
  }
  set gradio(t) {
    this.$$set({ gradio: t }), le();
  }
}
export {
  Vm as default
};
