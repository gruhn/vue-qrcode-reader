import { defineComponent as Wt, ref as we, watch as We, onMounted as vo, onUnmounted as yo, computed as Ft, openBlock as jt, createElementBlock as Lt, createElementVNode as at, normalizeStyle as go, withDirectives as wo, vShow as bo, renderSlot as Mr, withModifiers as ot } from "vue";
var Ar = (r, o, i) => {
  if (!o.has(r))
    throw TypeError("Cannot " + i);
}, br = (r, o, i) => (Ar(r, o, "read from private field"), i ? i.call(r) : o.get(r)), Co = (r, o, i) => {
  if (o.has(r))
    throw TypeError("Cannot add the same private member more than once");
  o instanceof WeakSet ? o.add(r) : o.set(r, i);
}, $o = (r, o, i, c) => (Ar(r, o, "write to private field"), c ? c.call(r, i) : o.set(r, i), i);
const Dr = [
  ["aztec", "Aztec"],
  ["code_128", "Code128"],
  ["code_39", "Code39"],
  ["code_93", "Code93"],
  ["codabar", "Codabar"],
  ["databar", "DataBar"],
  ["databar_expanded", "DataBarExpanded"],
  ["data_matrix", "DataMatrix"],
  ["dx_film_edge", "DXFilmEdge"],
  ["ean_13", "EAN-13"],
  ["ean_8", "EAN-8"],
  ["itf", "ITF"],
  ["maxi_code", "MaxiCode"],
  ["micro_qr_code", "MicroQRCode"],
  ["pdf417", "PDF417"],
  ["qr_code", "QRCode"],
  ["rm_qr_code", "rMQRCode"],
  ["upc_a", "UPC-A"],
  ["upc_e", "UPC-E"],
  ["linear_codes", "Linear-Codes"],
  ["matrix_codes", "Matrix-Codes"]
], _o = [...Dr, ["unknown"]].map((r) => r[0]), st = new Map(
  Dr
);
function So(r) {
  for (const [o, i] of st)
    if (r === i)
      return o;
  return "unknown";
}
function Po(r) {
  if (xr(r))
    return {
      width: r.naturalWidth,
      height: r.naturalHeight
    };
  if (Rr(r))
    return {
      width: r.width.baseVal.value,
      height: r.height.baseVal.value
    };
  if (kr(r))
    return {
      width: r.videoWidth,
      height: r.videoHeight
    };
  if (Fr(r))
    return {
      width: r.width,
      height: r.height
    };
  if (Wr(r))
    return {
      width: r.displayWidth,
      height: r.displayHeight
    };
  if (Ir(r))
    return {
      width: r.width,
      height: r.height
    };
  if (Ur(r))
    return {
      width: r.width,
      height: r.height
    };
  throw new TypeError(
    "The provided value is not of type '(Blob or HTMLCanvasElement or HTMLImageElement or HTMLVideoElement or ImageBitmap or ImageData or OffscreenCanvas or SVGImageElement or VideoFrame)'."
  );
}
function xr(r) {
  try {
    return r instanceof HTMLImageElement;
  } catch (o) {
    return !1;
  }
}
function Rr(r) {
  try {
    return r instanceof SVGImageElement;
  } catch (o) {
    return !1;
  }
}
function kr(r) {
  try {
    return r instanceof HTMLVideoElement;
  } catch (o) {
    return !1;
  }
}
function Ir(r) {
  try {
    return r instanceof HTMLCanvasElement;
  } catch (o) {
    return !1;
  }
}
function Fr(r) {
  try {
    return r instanceof ImageBitmap;
  } catch (o) {
    return !1;
  }
}
function Ur(r) {
  try {
    return r instanceof OffscreenCanvas;
  } catch (o) {
    return !1;
  }
}
function Wr(r) {
  try {
    return r instanceof VideoFrame;
  } catch (o) {
    return !1;
  }
}
function jr(r) {
  try {
    return r instanceof Blob;
  } catch (o) {
    return !1;
  }
}
function To(r) {
  try {
    return r instanceof ImageData;
  } catch (o) {
    return !1;
  }
}
function Eo(r, o) {
  try {
    const i = new OffscreenCanvas(r, o);
    if (i.getContext("2d") instanceof OffscreenCanvasRenderingContext2D)
      return i;
    throw void 0;
  } catch (i) {
    const c = document.createElement("canvas");
    return c.width = r, c.height = o, c;
  }
}
async function Lr(r) {
  if (xr(r) && !await Do(r))
    throw new DOMException(
      "Failed to load or decode HTMLImageElement.",
      "InvalidStateError"
    );
  if (Rr(r) && !await xo(r))
    throw new DOMException(
      "Failed to load or decode SVGImageElement.",
      "InvalidStateError"
    );
  if (Wr(r) && Ro(r))
    throw new DOMException("VideoFrame is closed.", "InvalidStateError");
  if (kr(r) && (r.readyState === 0 || r.readyState === 1))
    throw new DOMException("Invalid element or state.", "InvalidStateError");
  if (Fr(r) && Io(r))
    throw new DOMException(
      "The image source is detached.",
      "InvalidStateError"
    );
  const { width: o, height: i } = Po(r);
  if (o === 0 || i === 0)
    return null;
  const c = Eo(o, i).getContext("2d");
  c.drawImage(r, 0, 0);
  try {
    return c.getImageData(0, 0, o, i);
  } catch (l) {
    throw new DOMException("Source would taint origin.", "SecurityError");
  }
}
async function Oo(r) {
  let o;
  try {
    if (globalThis.createImageBitmap)
      o = await createImageBitmap(r);
    else if (globalThis.Image) {
      o = new Image();
      let i = "";
      try {
        i = URL.createObjectURL(r), o.src = i, await o.decode();
      } finally {
        URL.revokeObjectURL(i);
      }
    } else
      return r;
  } catch (i) {
    throw new DOMException(
      "Failed to load or decode Blob.",
      "InvalidStateError"
    );
  }
  return await Lr(o);
}
function Mo(r) {
  const { width: o, height: i } = r;
  if (o === 0 || i === 0)
    return null;
  const c = r.getContext("2d");
  try {
    return c.getImageData(0, 0, o, i);
  } catch (l) {
    throw new DOMException("Source would taint origin.", "SecurityError");
  }
}
async function Ao(r) {
  if (jr(r))
    return await Oo(r);
  if (To(r)) {
    if (ko(r))
      throw new DOMException(
        "The image data has been detached.",
        "InvalidStateError"
      );
    return r;
  }
  return Ir(r) || Ur(r) ? Mo(r) : await Lr(r);
}
async function Do(r) {
  try {
    return await r.decode(), !0;
  } catch (o) {
    return !1;
  }
}
async function xo(r) {
  var o;
  try {
    return await ((o = r.decode) == null ? void 0 : o.call(r)), !0;
  } catch (i) {
    return !1;
  }
}
function Ro(r) {
  return r.format === null;
}
function ko(r) {
  return r.data.buffer.byteLength === 0;
}
function Io(r) {
  return r.width === 0 && r.height === 0;
}
function Cr(r, o) {
  return r instanceof DOMException ? new DOMException(`${o}: ${r.message}`, r.name) : r instanceof Error ? new r.constructor(`${o}: ${r.message}`) : new Error(`${o}: ${r}`);
}
const $r = [
  "Aztec",
  "Codabar",
  "Code128",
  "Code39",
  "Code93",
  "DataBar",
  "DataBarExpanded",
  "DataMatrix",
  "DXFilmEdge",
  "EAN-13",
  "EAN-8",
  "ITF",
  "Linear-Codes",
  "Matrix-Codes",
  "MaxiCode",
  "MicroQRCode",
  "None",
  "PDF417",
  "QRCode",
  "rMQRCode",
  "UPC-A",
  "UPC-E"
];
function Fo(r) {
  return r.join("|");
}
function Uo(r) {
  const o = _r(r);
  let i = 0, c = $r.length - 1;
  for (; i <= c; ) {
    const l = Math.floor((i + c) / 2), h = $r[l], v = _r(h);
    if (v === o)
      return h;
    v < o ? i = l + 1 : c = l - 1;
  }
  return "None";
}
function _r(r) {
  return r.toLowerCase().replace(/_-\[\]/g, "");
}
function Wo(r, o) {
  return r.Binarizer[o];
}
function jo(r, o) {
  return r.CharacterSet[o];
}
const Lo = [
  "Text",
  "Binary",
  "Mixed",
  "GS1",
  "ISO15434",
  "UnknownECI"
];
function Ho(r) {
  return Lo[r.value];
}
function Bo(r, o) {
  return r.EanAddOnSymbol[o];
}
function Vo(r, o) {
  return r.TextMode[o];
}
const Ee = {
  formats: [],
  tryHarder: !0,
  tryRotate: !0,
  tryInvert: !0,
  tryDownscale: !0,
  binarizer: "LocalAverage",
  isPure: !1,
  downscaleFactor: 3,
  downscaleThreshold: 500,
  minLineCount: 2,
  maxNumberOfSymbols: 255,
  tryCode39ExtendedMode: !1,
  validateCode39CheckSum: !1,
  validateITFCheckSum: !1,
  returnCodabarStartEnd: !1,
  returnErrors: !1,
  eanAddOnSymbol: "Read",
  textMode: "Plain",
  characterSet: "Unknown"
};
function Hr(r, o) {
  return {
    ...o,
    formats: Fo(o.formats),
    binarizer: Wo(r, o.binarizer),
    eanAddOnSymbol: Bo(
      r,
      o.eanAddOnSymbol
    ),
    textMode: Vo(r, o.textMode),
    characterSet: jo(
      r,
      o.characterSet
    )
  };
}
function Br(r) {
  return {
    ...r,
    format: Uo(r.format),
    eccLevel: r.eccLevel,
    contentType: Ho(r.contentType)
  };
}
const qo = {
  locateFile: (r, o) => {
    const i = r.match(/_(.+?)\.wasm$/);
    return i ? `https://fastly.jsdelivr.net/npm/zxing-wasm@1.1.3/dist/${i[1]}/${r}` : o + r;
  }
};
let Ut = /* @__PURE__ */ new WeakMap();
function Ht(r, o) {
  var i;
  const c = Ut.get(r);
  if (c != null && c.modulePromise && (o === void 0 || Object.is(o, c.moduleOverrides)))
    return c.modulePromise;
  const l = (i = o != null ? o : c == null ? void 0 : c.moduleOverrides) != null ? i : qo, h = r({
    ...l
  });
  return Ut.set(r, {
    moduleOverrides: l,
    modulePromise: h
  }), h;
}
function No(r, o) {
  Ut.set(r, {
    moduleOverrides: o
  });
}
async function zo(r, o, i = Ee) {
  const c = {
    ...Ee,
    ...i
  }, l = await Ht(r), { size: h } = o, v = new Uint8Array(await o.arrayBuffer()), g = l._malloc(h);
  l.HEAPU8.set(v, g);
  const b = l.readBarcodesFromImage(
    g,
    h,
    Hr(l, c)
  );
  l._free(g);
  const p = [];
  for (let C = 0; C < b.size(); ++C)
    p.push(
      Br(b.get(C))
    );
  return p;
}
async function Go(r, o, i = Ee) {
  const c = {
    ...Ee,
    ...i
  }, l = await Ht(r), {
    data: h,
    width: v,
    height: g,
    data: { byteLength: b }
  } = o, p = l._malloc(b);
  l.HEAPU8.set(h, p);
  const C = l.readBarcodesFromPixmap(
    p,
    v,
    g,
    Hr(l, c)
  );
  l._free(p);
  const S = [];
  for (let $ = 0; $ < C.size(); ++$)
    S.push(
      Br(C.get($))
    );
  return S;
}
({
  ...Ee,
  formats: [...Ee.formats]
});
var lt = (() => {
  var r = typeof document < "u" && document.currentScript ? document.currentScript.src : void 0;
  return function(o = {}) {
    var i = o, c, l;
    i.ready = new Promise((e, t) => {
      c = e, l = t;
    });
    var h = Object.assign({}, i), v = "./this.program", g = typeof window == "object", b = typeof importScripts == "function";
    typeof process == "object" && typeof process.versions == "object" && process.versions.node;
    var p = "";
    function C(e) {
      return i.locateFile ? i.locateFile(e, p) : p + e;
    }
    var S;
    (g || b) && (b ? p = self.location.href : typeof document < "u" && document.currentScript && (p = document.currentScript.src), r && (p = r), p.indexOf("blob:") !== 0 ? p = p.substr(0, p.replace(/[?#].*/, "").lastIndexOf("/") + 1) : p = "", b && (S = (e) => {
      var t = new XMLHttpRequest();
      return t.open("GET", e, !1), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response);
    })), i.print || console.log.bind(console);
    var $ = i.printErr || console.error.bind(console);
    Object.assign(i, h), h = null, i.arguments && i.arguments, i.thisProgram && (v = i.thisProgram), i.quit && i.quit;
    var F;
    i.wasmBinary && (F = i.wasmBinary), typeof WebAssembly != "object" && Z("no native wasm support detected");
    var U, W = !1, R, D, X, k, M, A, le, ie;
    function be() {
      var e = U.buffer;
      i.HEAP8 = R = new Int8Array(e), i.HEAP16 = X = new Int16Array(e), i.HEAPU8 = D = new Uint8Array(e), i.HEAPU16 = k = new Uint16Array(e), i.HEAP32 = M = new Int32Array(e), i.HEAPU32 = A = new Uint32Array(e), i.HEAPF32 = le = new Float32Array(e), i.HEAPF64 = ie = new Float64Array(e);
    }
    var Ce = [], Oe = [], Me = [];
    function Le() {
      if (i.preRun)
        for (typeof i.preRun == "function" && (i.preRun = [i.preRun]); i.preRun.length; )
          ht(i.preRun.shift());
      yt(Ce);
    }
    function dt() {
      yt(Oe);
    }
    function ft() {
      if (i.postRun)
        for (typeof i.postRun == "function" && (i.postRun = [i.postRun]); i.postRun.length; )
          Ae(i.postRun.shift());
      yt(Me);
    }
    function ht(e) {
      Ce.unshift(e);
    }
    function pt(e) {
      Oe.unshift(e);
    }
    function Ae(e) {
      Me.unshift(e);
    }
    var te = 0, ve = null;
    function He(e) {
      var t;
      te++, (t = i.monitorRunDependencies) === null || t === void 0 || t.call(i, te);
    }
    function de(e) {
      var t;
      if (te--, (t = i.monitorRunDependencies) === null || t === void 0 || t.call(i, te), te == 0 && ve) {
        var n = ve;
        ve = null, n();
      }
    }
    function Z(e) {
      var t;
      (t = i.onAbort) === null || t === void 0 || t.call(i, e), e = "Aborted(" + e + ")", $(e), W = !0, e += ". Build with -sASSERTIONS for more info.";
      var n = new WebAssembly.RuntimeError(e);
      throw l(n), n;
    }
    var mt = "data:application/octet-stream;base64,", Be = (e) => e.startsWith(mt), fe;
    fe = "zxing_reader.wasm", Be(fe) || (fe = C(fe));
    function Ve(e) {
      if (e == fe && F)
        return new Uint8Array(F);
      if (S)
        return S(e);
      throw "both async and sync fetching of the wasm failed";
    }
    function vt(e) {
      return !F && (g || b) && typeof fetch == "function" ? fetch(e, {
        credentials: "same-origin"
      }).then((t) => {
        if (!t.ok)
          throw "failed to load wasm binary file at '" + e + "'";
        return t.arrayBuffer();
      }).catch(() => Ve(e)) : Promise.resolve().then(() => Ve(e));
    }
    function qe(e, t, n) {
      return vt(e).then((a) => WebAssembly.instantiate(a, t)).then((a) => a).then(n, (a) => {
        $(`failed to asynchronously prepare wasm: ${a}`), Z(a);
      });
    }
    function an(e, t, n, a) {
      return !e && typeof WebAssembly.instantiateStreaming == "function" && !Be(t) && typeof fetch == "function" ? fetch(t, {
        credentials: "same-origin"
      }).then((s) => {
        var u = WebAssembly.instantiateStreaming(s, n);
        return u.then(a, function(d) {
          return $(`wasm streaming compile failed: ${d}`), $("falling back to ArrayBuffer instantiation"), qe(t, n, a);
        });
      }) : qe(t, n, a);
    }
    function on() {
      var e = {
        a: Ga
      };
      function t(a, s) {
        return z = a.exports, U = z.ia, be(), Kt = z.ma, pt(z.ja), de(), z;
      }
      He();
      function n(a) {
        t(a.instance);
      }
      if (i.instantiateWasm)
        try {
          return i.instantiateWasm(e, t);
        } catch (a) {
          $(`Module.instantiateWasm callback failed with error: ${a}`), l(a);
        }
      return an(F, fe, e, n).catch(l), {};
    }
    var yt = (e) => {
      for (; e.length > 0; )
        e.shift()(i);
    };
    i.noExitRuntime;
    var Ne = [], ze = 0, sn = (e) => {
      var t = new gt(e);
      return t.get_caught() || (t.set_caught(!0), ze--), t.set_rethrown(!1), Ne.push(t), hr(t.excPtr), t.get_exception_ptr();
    }, se = 0, cn = () => {
      j(0, 0);
      var e = Ne.pop();
      fr(e.excPtr), se = 0;
    };
    function gt(e) {
      this.excPtr = e, this.ptr = e - 24, this.set_type = function(t) {
        A[this.ptr + 4 >> 2] = t;
      }, this.get_type = function() {
        return A[this.ptr + 4 >> 2];
      }, this.set_destructor = function(t) {
        A[this.ptr + 8 >> 2] = t;
      }, this.get_destructor = function() {
        return A[this.ptr + 8 >> 2];
      }, this.set_caught = function(t) {
        t = t ? 1 : 0, R[this.ptr + 12 >> 0] = t;
      }, this.get_caught = function() {
        return R[this.ptr + 12 >> 0] != 0;
      }, this.set_rethrown = function(t) {
        t = t ? 1 : 0, R[this.ptr + 13 >> 0] = t;
      }, this.get_rethrown = function() {
        return R[this.ptr + 13 >> 0] != 0;
      }, this.init = function(t, n) {
        this.set_adjusted_ptr(0), this.set_type(t), this.set_destructor(n);
      }, this.set_adjusted_ptr = function(t) {
        A[this.ptr + 16 >> 2] = t;
      }, this.get_adjusted_ptr = function() {
        return A[this.ptr + 16 >> 2];
      }, this.get_exception_ptr = function() {
        var t = mr(this.get_type());
        if (t)
          return A[this.excPtr >> 2];
        var n = this.get_adjusted_ptr();
        return n !== 0 ? n : this.excPtr;
      };
    }
    var un = (e) => {
      throw se || (se = e), se;
    }, wt = (e) => {
      var t = se;
      if (!t)
        return Ue(0), 0;
      var n = new gt(t);
      n.set_adjusted_ptr(t);
      var a = n.get_type();
      if (!a)
        return Ue(0), t;
      for (var s in e) {
        var u = e[s];
        if (u === 0 || u === a)
          break;
        var d = n.ptr + 16;
        if (pr(u, a, d))
          return Ue(u), t;
      }
      return Ue(a), t;
    }, ln = () => wt([]), dn = (e) => wt([e]), fn = (e, t) => wt([e, t]), hn = () => {
      var e = Ne.pop();
      e || Z("no exception to throw");
      var t = e.excPtr;
      throw e.get_rethrown() || (Ne.push(e), e.set_rethrown(!0), e.set_caught(!1), ze++), se = t, se;
    }, pn = (e, t, n) => {
      var a = new gt(e);
      throw a.init(t, n), se = e, ze++, se;
    }, mn = () => ze, Ge = {}, bt = (e) => {
      for (; e.length; ) {
        var t = e.pop(), n = e.pop();
        n(t);
      }
    };
    function Ct(e) {
      return this.fromWireType(M[e >> 2]);
    }
    var $e = {}, ye = {}, Ye = {}, qt, Je = (e) => {
      throw new qt(e);
    }, ge = (e, t, n) => {
      e.forEach(function(f) {
        Ye[f] = t;
      });
      function a(f) {
        var m = n(f);
        m.length !== e.length && Je("Mismatched type converter count");
        for (var w = 0; w < e.length; ++w)
          re(e[w], m[w]);
      }
      var s = new Array(t.length), u = [], d = 0;
      t.forEach((f, m) => {
        ye.hasOwnProperty(f) ? s[m] = ye[f] : (u.push(f), $e.hasOwnProperty(f) || ($e[f] = []), $e[f].push(() => {
          s[m] = ye[f], ++d, d === u.length && a(s);
        }));
      }), u.length === 0 && a(s);
    }, vn = (e) => {
      var t = Ge[e];
      delete Ge[e];
      var n = t.rawConstructor, a = t.rawDestructor, s = t.fields, u = s.map((d) => d.getterReturnType).concat(s.map((d) => d.setterArgumentType));
      ge([e], u, (d) => {
        var f = {};
        return s.forEach((m, w) => {
          var _ = m.fieldName, T = d[w], E = m.getter, O = m.getterContext, L = d[w + s.length], q = m.setter, I = m.setterContext;
          f[_] = {
            read: (J) => T.fromWireType(E(O, J)),
            write: (J, y) => {
              var P = [];
              q(I, J, L.toWireType(P, y)), bt(P);
            }
          };
        }), [{
          name: t.name,
          fromWireType: (m) => {
            var w = {};
            for (var _ in f)
              w[_] = f[_].read(m);
            return a(m), w;
          },
          toWireType: (m, w) => {
            for (var _ in f)
              if (!(_ in w))
                throw new TypeError(`Missing field: "${_}"`);
            var T = n();
            for (_ in f)
              f[_].write(T, w[_]);
            return m !== null && m.push(a, T), T;
          },
          argPackAdvance: ne,
          readValueFromPointer: Ct,
          destructorFunction: a
        }];
      });
    }, yn = (e, t, n, a, s) => {
    }, gn = () => {
      for (var e = new Array(256), t = 0; t < 256; ++t)
        e[t] = String.fromCharCode(t);
      Nt = e;
    }, Nt, Y = (e) => {
      for (var t = "", n = e; D[n]; )
        t += Nt[D[n++]];
      return t;
    }, _e, x = (e) => {
      throw new _e(e);
    };
    function wn(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var a = t.name;
      if (e || x(`type "${a}" must have a positive integer typeid pointer`), ye.hasOwnProperty(e)) {
        if (n.ignoreDuplicateRegistrations)
          return;
        x(`Cannot register type '${a}' twice`);
      }
      if (ye[e] = t, delete Ye[e], $e.hasOwnProperty(e)) {
        var s = $e[e];
        delete $e[e], s.forEach((u) => u());
      }
    }
    function re(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      if (!("argPackAdvance" in t))
        throw new TypeError("registerType registeredInstance requires argPackAdvance");
      return wn(e, t, n);
    }
    var ne = 8, bn = (e, t, n, a) => {
      t = Y(t), re(e, {
        name: t,
        fromWireType: function(s) {
          return !!s;
        },
        toWireType: function(s, u) {
          return u ? n : a;
        },
        argPackAdvance: ne,
        readValueFromPointer: function(s) {
          return this.fromWireType(D[s]);
        },
        destructorFunction: null
      });
    }, Cn = (e) => ({
      count: e.count,
      deleteScheduled: e.deleteScheduled,
      preservePointerOnDelete: e.preservePointerOnDelete,
      ptr: e.ptr,
      ptrType: e.ptrType,
      smartPtr: e.smartPtr,
      smartPtrType: e.smartPtrType
    }), $t = (e) => {
      function t(n) {
        return n.$$.ptrType.registeredClass.name;
      }
      x(t(e) + " instance already deleted");
    }, _t = !1, zt = (e) => {
    }, $n = (e) => {
      e.smartPtr ? e.smartPtrType.rawDestructor(e.smartPtr) : e.ptrType.registeredClass.rawDestructor(e.ptr);
    }, Gt = (e) => {
      e.count.value -= 1;
      var t = e.count.value === 0;
      t && $n(e);
    }, Yt = (e, t, n) => {
      if (t === n)
        return e;
      if (n.baseClass === void 0)
        return null;
      var a = Yt(e, t, n.baseClass);
      return a === null ? null : n.downcast(a);
    }, Jt = {}, _n = () => Object.keys(Re).length, Sn = () => {
      var e = [];
      for (var t in Re)
        Re.hasOwnProperty(t) && e.push(Re[t]);
      return e;
    }, De = [], St = () => {
      for (; De.length; ) {
        var e = De.pop();
        e.$$.deleteScheduled = !1, e.delete();
      }
    }, xe, Pn = (e) => {
      xe = e, De.length && xe && xe(St);
    }, Tn = () => {
      i.getInheritedInstanceCount = _n, i.getLiveInheritedInstances = Sn, i.flushPendingDeletes = St, i.setDelayFunction = Pn;
    }, Re = {}, En = (e, t) => {
      for (t === void 0 && x("ptr should not be undefined"); e.baseClass; )
        t = e.upcast(t), e = e.baseClass;
      return t;
    }, On = (e, t) => (t = En(e, t), Re[t]), Qe = (e, t) => {
      (!t.ptrType || !t.ptr) && Je("makeClassHandle requires ptr and ptrType");
      var n = !!t.smartPtrType, a = !!t.smartPtr;
      return n !== a && Je("Both smartPtrType and smartPtr must be specified"), t.count = {
        value: 1
      }, ke(Object.create(e, {
        $$: {
          value: t,
          writable: !0
        }
      }));
    };
    function Mn(e) {
      var t = this.getPointee(e);
      if (!t)
        return this.destructor(e), null;
      var n = On(this.registeredClass, t);
      if (n !== void 0) {
        if (n.$$.count.value === 0)
          return n.$$.ptr = t, n.$$.smartPtr = e, n.clone();
        var a = n.clone();
        return this.destructor(e), a;
      }
      function s() {
        return this.isSmartPointer ? Qe(this.registeredClass.instancePrototype, {
          ptrType: this.pointeeType,
          ptr: t,
          smartPtrType: this,
          smartPtr: e
        }) : Qe(this.registeredClass.instancePrototype, {
          ptrType: this,
          ptr: e
        });
      }
      var u = this.registeredClass.getActualType(t), d = Jt[u];
      if (!d)
        return s.call(this);
      var f;
      this.isConst ? f = d.constPointerType : f = d.pointerType;
      var m = Yt(t, this.registeredClass, f.registeredClass);
      return m === null ? s.call(this) : this.isSmartPointer ? Qe(f.registeredClass.instancePrototype, {
        ptrType: f,
        ptr: m,
        smartPtrType: this,
        smartPtr: e
      }) : Qe(f.registeredClass.instancePrototype, {
        ptrType: f,
        ptr: m
      });
    }
    var ke = (e) => typeof FinalizationRegistry > "u" ? (ke = (t) => t, e) : (_t = new FinalizationRegistry((t) => {
      Gt(t.$$);
    }), ke = (t) => {
      var n = t.$$, a = !!n.smartPtr;
      if (a) {
        var s = {
          $$: n
        };
        _t.register(t, s, t);
      }
      return t;
    }, zt = (t) => _t.unregister(t), ke(e)), An = () => {
      Object.assign(Xe.prototype, {
        isAliasOf(e) {
          if (!(this instanceof Xe) || !(e instanceof Xe))
            return !1;
          var t = this.$$.ptrType.registeredClass, n = this.$$.ptr;
          e.$$ = e.$$;
          for (var a = e.$$.ptrType.registeredClass, s = e.$$.ptr; t.baseClass; )
            n = t.upcast(n), t = t.baseClass;
          for (; a.baseClass; )
            s = a.upcast(s), a = a.baseClass;
          return t === a && n === s;
        },
        clone() {
          if (this.$$.ptr || $t(this), this.$$.preservePointerOnDelete)
            return this.$$.count.value += 1, this;
          var e = ke(Object.create(Object.getPrototypeOf(this), {
            $$: {
              value: Cn(this.$$)
            }
          }));
          return e.$$.count.value += 1, e.$$.deleteScheduled = !1, e;
        },
        delete() {
          this.$$.ptr || $t(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && x("Object already scheduled for deletion"), zt(this), Gt(this.$$), this.$$.preservePointerOnDelete || (this.$$.smartPtr = void 0, this.$$.ptr = void 0);
        },
        isDeleted() {
          return !this.$$.ptr;
        },
        deleteLater() {
          return this.$$.ptr || $t(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && x("Object already scheduled for deletion"), De.push(this), De.length === 1 && xe && xe(St), this.$$.deleteScheduled = !0, this;
        }
      });
    };
    function Xe() {
    }
    var Ie = (e, t) => Object.defineProperty(t, "name", {
      value: e
    }), Qt = (e, t, n) => {
      if (e[t].overloadTable === void 0) {
        var a = e[t];
        e[t] = function() {
          return e[t].overloadTable.hasOwnProperty(arguments.length) || x(`Function '${n}' called with an invalid number of arguments (${arguments.length}) - expects one of (${e[t].overloadTable})!`), e[t].overloadTable[arguments.length].apply(this, arguments);
        }, e[t].overloadTable = [], e[t].overloadTable[a.argCount] = a;
      }
    }, Pt = (e, t, n) => {
      i.hasOwnProperty(e) ? ((n === void 0 || i[e].overloadTable !== void 0 && i[e].overloadTable[n] !== void 0) && x(`Cannot register public name '${e}' twice`), Qt(i, e, e), i.hasOwnProperty(n) && x(`Cannot register multiple overloads of a function with the same number of arguments (${n})!`), i[e].overloadTable[n] = t) : (i[e] = t, n !== void 0 && (i[e].numArguments = n));
    }, Dn = 48, xn = 57, Rn = (e) => {
      if (e === void 0)
        return "_unknown";
      e = e.replace(/[^a-zA-Z0-9_]/g, "$");
      var t = e.charCodeAt(0);
      return t >= Dn && t <= xn ? `_${e}` : e;
    };
    function kn(e, t, n, a, s, u, d, f) {
      this.name = e, this.constructor = t, this.instancePrototype = n, this.rawDestructor = a, this.baseClass = s, this.getActualType = u, this.upcast = d, this.downcast = f, this.pureVirtualFunctions = [];
    }
    var Tt = (e, t, n) => {
      for (; t !== n; )
        t.upcast || x(`Expected null or instance of ${n.name}, got an instance of ${t.name}`), e = t.upcast(e), t = t.baseClass;
      return e;
    };
    function In(e, t) {
      if (t === null)
        return this.isReference && x(`null is not a valid ${this.name}`), 0;
      t.$$ || x(`Cannot pass "${Dt(t)}" as a ${this.name}`), t.$$.ptr || x(`Cannot pass deleted object as a pointer of type ${this.name}`);
      var n = t.$$.ptrType.registeredClass, a = Tt(t.$$.ptr, n, this.registeredClass);
      return a;
    }
    function Fn(e, t) {
      var n;
      if (t === null)
        return this.isReference && x(`null is not a valid ${this.name}`), this.isSmartPointer ? (n = this.rawConstructor(), e !== null && e.push(this.rawDestructor, n), n) : 0;
      (!t || !t.$$) && x(`Cannot pass "${Dt(t)}" as a ${this.name}`), t.$$.ptr || x(`Cannot pass deleted object as a pointer of type ${this.name}`), !this.isConst && t.$$.ptrType.isConst && x(`Cannot convert argument of type ${t.$$.smartPtrType ? t.$$.smartPtrType.name : t.$$.ptrType.name} to parameter type ${this.name}`);
      var a = t.$$.ptrType.registeredClass;
      if (n = Tt(t.$$.ptr, a, this.registeredClass), this.isSmartPointer)
        switch (t.$$.smartPtr === void 0 && x("Passing raw pointer to smart pointer is illegal"), this.sharingPolicy) {
          case 0:
            t.$$.smartPtrType === this ? n = t.$$.smartPtr : x(`Cannot convert argument of type ${t.$$.smartPtrType ? t.$$.smartPtrType.name : t.$$.ptrType.name} to parameter type ${this.name}`);
            break;
          case 1:
            n = t.$$.smartPtr;
            break;
          case 2:
            if (t.$$.smartPtrType === this)
              n = t.$$.smartPtr;
            else {
              var s = t.clone();
              n = this.rawShare(n, ce.toHandle(() => s.delete())), e !== null && e.push(this.rawDestructor, n);
            }
            break;
          default:
            x("Unsupporting sharing policy");
        }
      return n;
    }
    function Un(e, t) {
      if (t === null)
        return this.isReference && x(`null is not a valid ${this.name}`), 0;
      t.$$ || x(`Cannot pass "${Dt(t)}" as a ${this.name}`), t.$$.ptr || x(`Cannot pass deleted object as a pointer of type ${this.name}`), t.$$.ptrType.isConst && x(`Cannot convert argument of type ${t.$$.ptrType.name} to parameter type ${this.name}`);
      var n = t.$$.ptrType.registeredClass, a = Tt(t.$$.ptr, n, this.registeredClass);
      return a;
    }
    function Xt(e) {
      return this.fromWireType(A[e >> 2]);
    }
    var Wn = () => {
      Object.assign(Ze.prototype, {
        getPointee(e) {
          return this.rawGetPointee && (e = this.rawGetPointee(e)), e;
        },
        destructor(e) {
          var t;
          (t = this.rawDestructor) === null || t === void 0 || t.call(this, e);
        },
        argPackAdvance: ne,
        readValueFromPointer: Xt,
        deleteObject(e) {
          e !== null && e.delete();
        },
        fromWireType: Mn
      });
    };
    function Ze(e, t, n, a, s, u, d, f, m, w, _) {
      this.name = e, this.registeredClass = t, this.isReference = n, this.isConst = a, this.isSmartPointer = s, this.pointeeType = u, this.sharingPolicy = d, this.rawGetPointee = f, this.rawConstructor = m, this.rawShare = w, this.rawDestructor = _, !s && t.baseClass === void 0 ? a ? (this.toWireType = In, this.destructorFunction = null) : (this.toWireType = Un, this.destructorFunction = null) : this.toWireType = Fn;
    }
    var Zt = (e, t, n) => {
      i.hasOwnProperty(e) || Je("Replacing nonexistant public symbol"), i[e].overloadTable !== void 0 && n !== void 0 ? i[e].overloadTable[n] = t : (i[e] = t, i[e].argCount = n);
    }, jn = (e, t, n) => {
      var a = i["dynCall_" + e];
      return n && n.length ? a.apply(null, [t].concat(n)) : a.call(null, t);
    }, Ke = [], Kt, H = (e) => {
      var t = Ke[e];
      return t || (e >= Ke.length && (Ke.length = e + 1), Ke[e] = t = Kt.get(e)), t;
    }, Ln = (e, t, n) => {
      if (e.includes("j"))
        return jn(e, t, n);
      var a = H(t).apply(null, n);
      return a;
    }, Hn = (e, t) => {
      var n = [];
      return function() {
        return n.length = 0, Object.assign(n, arguments), Ln(e, t, n);
      };
    }, ee = (e, t) => {
      e = Y(e);
      function n() {
        return e.includes("j") ? Hn(e, t) : H(t);
      }
      var a = n();
      return typeof a != "function" && x(`unknown function pointer with signature ${e}: ${t}`), a;
    }, Bn = (e, t) => {
      var n = Ie(t, function(a) {
        this.name = t, this.message = a;
        var s = new Error(a).stack;
        s !== void 0 && (this.stack = this.toString() + `
` + s.replace(/^Error(:[^\n]*)?\n/, ""));
      });
      return n.prototype = Object.create(e.prototype), n.prototype.constructor = n, n.prototype.toString = function() {
        return this.message === void 0 ? this.name : `${this.name}: ${this.message}`;
      }, n;
    }, er, tr = (e) => {
      var t = dr(e), n = Y(t);
      return ue(t), n;
    }, et = (e, t) => {
      var n = [], a = {};
      function s(u) {
        if (!a[u] && !ye[u]) {
          if (Ye[u]) {
            Ye[u].forEach(s);
            return;
          }
          n.push(u), a[u] = !0;
        }
      }
      throw t.forEach(s), new er(`${e}: ` + n.map(tr).join([", "]));
    }, Vn = (e, t, n, a, s, u, d, f, m, w, _, T, E) => {
      _ = Y(_), u = ee(s, u), f && (f = ee(d, f)), w && (w = ee(m, w)), E = ee(T, E);
      var O = Rn(_);
      Pt(O, function() {
        et(`Cannot construct ${_} due to unbound types`, [a]);
      }), ge([e, t, n], a ? [a] : [], function(L) {
        L = L[0];
        var q, I;
        a ? (q = L.registeredClass, I = q.instancePrototype) : I = Xe.prototype;
        var J = Ie(_, function() {
          if (Object.getPrototypeOf(this) !== y)
            throw new _e("Use 'new' to construct " + _);
          if (P.constructor_body === void 0)
            throw new _e(_ + " has no accessible constructor");
          var wr = P.constructor_body[arguments.length];
          if (wr === void 0)
            throw new _e(`Tried to invoke ctor of ${_} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(P.constructor_body).toString()}) parameters instead!`);
          return wr.apply(this, arguments);
        }), y = Object.create(I, {
          constructor: {
            value: J
          }
        });
        J.prototype = y;
        var P = new kn(_, J, y, E, q, u, f, w);
        if (P.baseClass) {
          var N, G;
          (G = (N = P.baseClass).__derivedClasses) !== null && G !== void 0 || (N.__derivedClasses = []), P.baseClass.__derivedClasses.push(P);
        }
        var Se = new Ze(_, P, !0, !1, !1), nt = new Ze(_ + "*", P, !1, !1, !1), gr = new Ze(_ + " const*", P, !1, !0, !1);
        return Jt[e] = {
          pointerType: nt,
          constPointerType: gr
        }, Zt(O, J), [Se, nt, gr];
      });
    }, Et = (e, t) => {
      for (var n = [], a = 0; a < e; a++)
        n.push(A[t + a * 4 >> 2]);
      return n;
    };
    function qn(e) {
      for (var t = 1; t < e.length; ++t)
        if (e[t] !== null && e[t].destructorFunction === void 0)
          return !0;
      return !1;
    }
    function Ot(e, t, n, a, s, u) {
      var d = t.length;
      d < 2 && x("argTypes array size mismatch! Must at least get return value and 'this' types!");
      var f = t[1] !== null && n !== null, m = qn(t), w = t[0].name !== "void", _ = d - 2, T = new Array(_), E = [], O = [], L = function() {
        arguments.length !== _ && x(`function ${e} called with ${arguments.length} arguments, expected ${_}`), O.length = 0;
        var q;
        E.length = f ? 2 : 1, E[0] = s, f && (q = t[1].toWireType(O, this), E[1] = q);
        for (var I = 0; I < _; ++I)
          T[I] = t[I + 2].toWireType(O, arguments[I]), E.push(T[I]);
        var J = a.apply(null, E);
        function y(P) {
          if (m)
            bt(O);
          else
            for (var N = f ? 1 : 2; N < t.length; N++) {
              var G = N === 1 ? q : T[N - 2];
              t[N].destructorFunction !== null && t[N].destructorFunction(G);
            }
          if (w)
            return t[0].fromWireType(P);
        }
        return y(J);
      };
      return Ie(e, L);
    }
    var Nn = (e, t, n, a, s, u) => {
      var d = Et(t, n);
      s = ee(a, s), ge([], [e], function(f) {
        f = f[0];
        var m = `constructor ${f.name}`;
        if (f.registeredClass.constructor_body === void 0 && (f.registeredClass.constructor_body = []), f.registeredClass.constructor_body[t - 1] !== void 0)
          throw new _e(`Cannot register multiple constructors with identical number of parameters (${t - 1}) for class '${f.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
        return f.registeredClass.constructor_body[t - 1] = () => {
          et(`Cannot construct ${f.name} due to unbound types`, d);
        }, ge([], d, (w) => (w.splice(1, 0, null), f.registeredClass.constructor_body[t - 1] = Ot(m, w, null, s, u), [])), [];
      });
    }, rr = (e) => {
      e = e.trim();
      const t = e.indexOf("(");
      return t !== -1 ? e.substr(0, t) : e;
    }, zn = (e, t, n, a, s, u, d, f, m) => {
      var w = Et(n, a);
      t = Y(t), t = rr(t), u = ee(s, u), ge([], [e], function(_) {
        _ = _[0];
        var T = `${_.name}.${t}`;
        t.startsWith("@@") && (t = Symbol[t.substring(2)]), f && _.registeredClass.pureVirtualFunctions.push(t);
        function E() {
          et(`Cannot call ${T} due to unbound types`, w);
        }
        var O = _.registeredClass.instancePrototype, L = O[t];
        return L === void 0 || L.overloadTable === void 0 && L.className !== _.name && L.argCount === n - 2 ? (E.argCount = n - 2, E.className = _.name, O[t] = E) : (Qt(O, t, T), O[t].overloadTable[n - 2] = E), ge([], w, function(q) {
          var I = Ot(T, q, _, u, d);
          return O[t].overloadTable === void 0 ? (I.argCount = n - 2, O[t] = I) : O[t].overloadTable[n - 2] = I, [];
        }), [];
      });
    };
    function Gn() {
      Object.assign(nr.prototype, {
        get(e) {
          return this.allocated[e];
        },
        has(e) {
          return this.allocated[e] !== void 0;
        },
        allocate(e) {
          var t = this.freelist.pop() || this.allocated.length;
          return this.allocated[t] = e, t;
        },
        free(e) {
          this.allocated[e] = void 0, this.freelist.push(e);
        }
      });
    }
    function nr() {
      this.allocated = [void 0], this.freelist = [];
    }
    var K = new nr(), Mt = (e) => {
      e >= K.reserved && --K.get(e).refcount === 0 && K.free(e);
    }, Yn = () => {
      for (var e = 0, t = K.reserved; t < K.allocated.length; ++t)
        K.allocated[t] !== void 0 && ++e;
      return e;
    }, Jn = () => {
      K.allocated.push({
        value: void 0
      }, {
        value: null
      }, {
        value: !0
      }, {
        value: !1
      }), K.reserved = K.allocated.length, i.count_emval_handles = Yn;
    }, ce = {
      toValue: (e) => (e || x("Cannot use deleted val. handle = " + e), K.get(e).value),
      toHandle: (e) => {
        switch (e) {
          case void 0:
            return 1;
          case null:
            return 2;
          case !0:
            return 3;
          case !1:
            return 4;
          default:
            return K.allocate({
              refcount: 1,
              value: e
            });
        }
      }
    }, Qn = (e, t) => {
      t = Y(t), re(e, {
        name: t,
        fromWireType: (n) => {
          var a = ce.toValue(n);
          return Mt(n), a;
        },
        toWireType: (n, a) => ce.toHandle(a),
        argPackAdvance: ne,
        readValueFromPointer: Ct,
        destructorFunction: null
      });
    }, Xn = (e, t, n) => {
      switch (t) {
        case 1:
          return n ? function(a) {
            return this.fromWireType(R[a >> 0]);
          } : function(a) {
            return this.fromWireType(D[a >> 0]);
          };
        case 2:
          return n ? function(a) {
            return this.fromWireType(X[a >> 1]);
          } : function(a) {
            return this.fromWireType(k[a >> 1]);
          };
        case 4:
          return n ? function(a) {
            return this.fromWireType(M[a >> 2]);
          } : function(a) {
            return this.fromWireType(A[a >> 2]);
          };
        default:
          throw new TypeError(`invalid integer width (${t}): ${e}`);
      }
    }, Zn = (e, t, n, a) => {
      t = Y(t);
      function s() {
      }
      s.values = {}, re(e, {
        name: t,
        constructor: s,
        fromWireType: function(u) {
          return this.constructor.values[u];
        },
        toWireType: (u, d) => d.value,
        argPackAdvance: ne,
        readValueFromPointer: Xn(t, n, a),
        destructorFunction: null
      }), Pt(t, s);
    }, At = (e, t) => {
      var n = ye[e];
      return n === void 0 && x(t + " has unknown type " + tr(e)), n;
    }, Kn = (e, t, n) => {
      var a = At(e, "enum");
      t = Y(t);
      var s = a.constructor, u = Object.create(a.constructor.prototype, {
        value: {
          value: n
        },
        constructor: {
          value: Ie(`${a.name}_${t}`, function() {
          })
        }
      });
      s.values[n] = u, s[t] = u;
    }, Dt = (e) => {
      if (e === null)
        return "null";
      var t = typeof e;
      return t === "object" || t === "array" || t === "function" ? e.toString() : "" + e;
    }, ea = (e, t) => {
      switch (t) {
        case 4:
          return function(n) {
            return this.fromWireType(le[n >> 2]);
          };
        case 8:
          return function(n) {
            return this.fromWireType(ie[n >> 3]);
          };
        default:
          throw new TypeError(`invalid float width (${t}): ${e}`);
      }
    }, ta = (e, t, n) => {
      t = Y(t), re(e, {
        name: t,
        fromWireType: (a) => a,
        toWireType: (a, s) => s,
        argPackAdvance: ne,
        readValueFromPointer: ea(t, n),
        destructorFunction: null
      });
    }, ra = (e, t, n, a, s, u, d) => {
      var f = Et(t, n);
      e = Y(e), e = rr(e), s = ee(a, s), Pt(e, function() {
        et(`Cannot call ${e} due to unbound types`, f);
      }, t - 1), ge([], f, function(m) {
        var w = [m[0], null].concat(m.slice(1));
        return Zt(e, Ot(e, w, null, s, u), t - 1), [];
      });
    }, na = (e, t, n) => {
      switch (t) {
        case 1:
          return n ? (a) => R[a >> 0] : (a) => D[a >> 0];
        case 2:
          return n ? (a) => X[a >> 1] : (a) => k[a >> 1];
        case 4:
          return n ? (a) => M[a >> 2] : (a) => A[a >> 2];
        default:
          throw new TypeError(`invalid integer width (${t}): ${e}`);
      }
    }, aa = (e, t, n, a, s) => {
      t = Y(t);
      var u = (_) => _;
      if (a === 0) {
        var d = 32 - 8 * n;
        u = (_) => _ << d >>> d;
      }
      var f = t.includes("unsigned"), m = (_, T) => {
      }, w;
      f ? w = function(_, T) {
        return m(T, this.name), T >>> 0;
      } : w = function(_, T) {
        return m(T, this.name), T;
      }, re(e, {
        name: t,
        fromWireType: u,
        toWireType: w,
        argPackAdvance: ne,
        readValueFromPointer: na(t, n, a !== 0),
        destructorFunction: null
      });
    }, oa = (e, t, n) => {
      var a = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array], s = a[t];
      function u(d) {
        var f = A[d >> 2], m = A[d + 4 >> 2];
        return new s(R.buffer, m, f);
      }
      n = Y(n), re(e, {
        name: n,
        fromWireType: u,
        argPackAdvance: ne,
        readValueFromPointer: u
      }, {
        ignoreDuplicateRegistrations: !0
      });
    }, ar = (e, t, n, a) => {
      if (!(a > 0))
        return 0;
      for (var s = n, u = n + a - 1, d = 0; d < e.length; ++d) {
        var f = e.charCodeAt(d);
        if (f >= 55296 && f <= 57343) {
          var m = e.charCodeAt(++d);
          f = 65536 + ((f & 1023) << 10) | m & 1023;
        }
        if (f <= 127) {
          if (n >= u)
            break;
          t[n++] = f;
        } else if (f <= 2047) {
          if (n + 1 >= u)
            break;
          t[n++] = 192 | f >> 6, t[n++] = 128 | f & 63;
        } else if (f <= 65535) {
          if (n + 2 >= u)
            break;
          t[n++] = 224 | f >> 12, t[n++] = 128 | f >> 6 & 63, t[n++] = 128 | f & 63;
        } else {
          if (n + 3 >= u)
            break;
          t[n++] = 240 | f >> 18, t[n++] = 128 | f >> 12 & 63, t[n++] = 128 | f >> 6 & 63, t[n++] = 128 | f & 63;
        }
      }
      return t[n] = 0, n - s;
    }, ia = (e, t, n) => ar(e, D, t, n), or = (e) => {
      for (var t = 0, n = 0; n < e.length; ++n) {
        var a = e.charCodeAt(n);
        a <= 127 ? t++ : a <= 2047 ? t += 2 : a >= 55296 && a <= 57343 ? (t += 4, ++n) : t += 3;
      }
      return t;
    }, ir = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0, sa = (e, t, n) => {
      for (var a = t + n, s = t; e[s] && !(s >= a); )
        ++s;
      if (s - t > 16 && e.buffer && ir)
        return ir.decode(e.subarray(t, s));
      for (var u = ""; t < s; ) {
        var d = e[t++];
        if (!(d & 128)) {
          u += String.fromCharCode(d);
          continue;
        }
        var f = e[t++] & 63;
        if ((d & 224) == 192) {
          u += String.fromCharCode((d & 31) << 6 | f);
          continue;
        }
        var m = e[t++] & 63;
        if ((d & 240) == 224 ? d = (d & 15) << 12 | f << 6 | m : d = (d & 7) << 18 | f << 12 | m << 6 | e[t++] & 63, d < 65536)
          u += String.fromCharCode(d);
        else {
          var w = d - 65536;
          u += String.fromCharCode(55296 | w >> 10, 56320 | w & 1023);
        }
      }
      return u;
    }, xt = (e, t) => e ? sa(D, e, t) : "", ca = (e, t) => {
      t = Y(t);
      var n = t === "std::string";
      re(e, {
        name: t,
        fromWireType(a) {
          var s = A[a >> 2], u = a + 4, d;
          if (n)
            for (var f = u, m = 0; m <= s; ++m) {
              var w = u + m;
              if (m == s || D[w] == 0) {
                var _ = w - f, T = xt(f, _);
                d === void 0 ? d = T : (d += "\0", d += T), f = w + 1;
              }
            }
          else {
            for (var E = new Array(s), m = 0; m < s; ++m)
              E[m] = String.fromCharCode(D[u + m]);
            d = E.join("");
          }
          return ue(a), d;
        },
        toWireType(a, s) {
          s instanceof ArrayBuffer && (s = new Uint8Array(s));
          var u, d = typeof s == "string";
          d || s instanceof Uint8Array || s instanceof Uint8ClampedArray || s instanceof Int8Array || x("Cannot pass non-string to std::string"), n && d ? u = or(s) : u = s.length;
          var f = It(4 + u + 1), m = f + 4;
          if (A[f >> 2] = u, n && d)
            ia(s, m, u + 1);
          else if (d)
            for (var w = 0; w < u; ++w) {
              var _ = s.charCodeAt(w);
              _ > 255 && (ue(m), x("String has UTF-16 code units that do not fit in 8 bits")), D[m + w] = _;
            }
          else
            for (var w = 0; w < u; ++w)
              D[m + w] = s[w];
          return a !== null && a.push(ue, f), f;
        },
        argPackAdvance: ne,
        readValueFromPointer: Xt,
        destructorFunction(a) {
          ue(a);
        }
      });
    }, sr = typeof TextDecoder < "u" ? new TextDecoder("utf-16le") : void 0, ua = (e, t) => {
      for (var n = e, a = n >> 1, s = a + t / 2; !(a >= s) && k[a]; )
        ++a;
      if (n = a << 1, n - e > 32 && sr)
        return sr.decode(D.subarray(e, n));
      for (var u = "", d = 0; !(d >= t / 2); ++d) {
        var f = X[e + d * 2 >> 1];
        if (f == 0)
          break;
        u += String.fromCharCode(f);
      }
      return u;
    }, la = (e, t, n) => {
      var a;
      if ((a = n) !== null && a !== void 0 || (n = 2147483647), n < 2)
        return 0;
      n -= 2;
      for (var s = t, u = n < e.length * 2 ? n / 2 : e.length, d = 0; d < u; ++d) {
        var f = e.charCodeAt(d);
        X[t >> 1] = f, t += 2;
      }
      return X[t >> 1] = 0, t - s;
    }, da = (e) => e.length * 2, fa = (e, t) => {
      for (var n = 0, a = ""; !(n >= t / 4); ) {
        var s = M[e + n * 4 >> 2];
        if (s == 0)
          break;
        if (++n, s >= 65536) {
          var u = s - 65536;
          a += String.fromCharCode(55296 | u >> 10, 56320 | u & 1023);
        } else
          a += String.fromCharCode(s);
      }
      return a;
    }, ha = (e, t, n) => {
      var a;
      if ((a = n) !== null && a !== void 0 || (n = 2147483647), n < 4)
        return 0;
      for (var s = t, u = s + n - 4, d = 0; d < e.length; ++d) {
        var f = e.charCodeAt(d);
        if (f >= 55296 && f <= 57343) {
          var m = e.charCodeAt(++d);
          f = 65536 + ((f & 1023) << 10) | m & 1023;
        }
        if (M[t >> 2] = f, t += 4, t + 4 > u)
          break;
      }
      return M[t >> 2] = 0, t - s;
    }, pa = (e) => {
      for (var t = 0, n = 0; n < e.length; ++n) {
        var a = e.charCodeAt(n);
        a >= 55296 && a <= 57343 && ++n, t += 4;
      }
      return t;
    }, ma = (e, t, n) => {
      n = Y(n);
      var a, s, u, d, f;
      t === 2 ? (a = ua, s = la, d = da, u = () => k, f = 1) : t === 4 && (a = fa, s = ha, d = pa, u = () => A, f = 2), re(e, {
        name: n,
        fromWireType: (m) => {
          for (var w = A[m >> 2], _ = u(), T, E = m + 4, O = 0; O <= w; ++O) {
            var L = m + 4 + O * t;
            if (O == w || _[L >> f] == 0) {
              var q = L - E, I = a(E, q);
              T === void 0 ? T = I : (T += "\0", T += I), E = L + t;
            }
          }
          return ue(m), T;
        },
        toWireType: (m, w) => {
          typeof w != "string" && x(`Cannot pass non-string to C++ string type ${n}`);
          var _ = d(w), T = It(4 + _ + t);
          return A[T >> 2] = _ >> f, s(w, T + 4, _ + t), m !== null && m.push(ue, T), T;
        },
        argPackAdvance: ne,
        readValueFromPointer: Ct,
        destructorFunction(m) {
          ue(m);
        }
      });
    }, va = (e, t, n, a, s, u) => {
      Ge[e] = {
        name: Y(t),
        rawConstructor: ee(n, a),
        rawDestructor: ee(s, u),
        fields: []
      };
    }, ya = (e, t, n, a, s, u, d, f, m, w) => {
      Ge[e].fields.push({
        fieldName: Y(t),
        getterReturnType: n,
        getter: ee(a, s),
        getterContext: u,
        setterArgumentType: d,
        setter: ee(f, m),
        setterContext: w
      });
    }, ga = (e, t) => {
      t = Y(t), re(e, {
        isVoid: !0,
        name: t,
        argPackAdvance: 0,
        fromWireType: () => {
        },
        toWireType: (n, a) => {
        }
      });
    }, Rt = [], wa = (e, t, n, a) => (e = Rt[e], t = ce.toValue(t), e(null, t, n, a)), ba = {}, Ca = (e) => {
      var t = ba[e];
      return t === void 0 ? Y(e) : t;
    }, cr = () => {
      if (typeof globalThis == "object")
        return globalThis;
      function e(t) {
        t.$$$embind_global$$$ = t;
        var n = typeof $$$embind_global$$$ == "object" && t.$$$embind_global$$$ == t;
        return n || delete t.$$$embind_global$$$, n;
      }
      if (typeof $$$embind_global$$$ == "object" || (typeof global == "object" && e(global) ? $$$embind_global$$$ = global : typeof self == "object" && e(self) && ($$$embind_global$$$ = self), typeof $$$embind_global$$$ == "object"))
        return $$$embind_global$$$;
      throw Error("unable to get global object.");
    }, $a = (e) => e === 0 ? ce.toHandle(cr()) : (e = Ca(e), ce.toHandle(cr()[e])), _a = (e) => {
      var t = Rt.length;
      return Rt.push(e), t;
    }, Sa = (e, t) => {
      for (var n = new Array(e), a = 0; a < e; ++a)
        n[a] = At(A[t + a * 4 >> 2], "parameter " + a);
      return n;
    }, Pa = Reflect.construct, Ta = (e, t, n) => {
      var a = [], s = e.toWireType(a, n);
      return a.length && (A[t >> 2] = ce.toHandle(a)), s;
    }, Ea = (e, t, n) => {
      var a = Sa(e, t), s = a.shift();
      e--;
      var u = new Array(e), d = (m, w, _, T) => {
        for (var E = 0, O = 0; O < e; ++O)
          u[O] = a[O].readValueFromPointer(T + E), E += a[O].argPackAdvance;
        for (var L = n === 1 ? Pa(w, u) : w.apply(m, u), O = 0; O < e; ++O) {
          var q, I;
          (q = (I = a[O]).deleteObject) === null || q === void 0 || q.call(I, u[O]);
        }
        return Ta(s, _, L);
      }, f = `methodCaller<(${a.map((m) => m.name).join(", ")}) => ${s.name}>`;
      return _a(Ie(f, d));
    }, Oa = (e) => {
      e > 4 && (K.get(e).refcount += 1);
    }, Ma = (e) => {
      var t = ce.toValue(e);
      bt(t), Mt(e);
    }, Aa = (e, t) => {
      e = At(e, "_emval_take_value");
      var n = e.readValueFromPointer(t);
      return ce.toHandle(n);
    }, Da = () => {
      Z("");
    }, xa = (e, t, n) => D.copyWithin(e, t, t + n), Ra = () => 2147483648, ka = (e) => {
      var t = U.buffer, n = (e - t.byteLength + 65535) / 65536;
      try {
        return U.grow(n), be(), 1;
      } catch (a) {
      }
    }, Ia = (e) => {
      var t = D.length;
      e >>>= 0;
      var n = Ra();
      if (e > n)
        return !1;
      for (var a = (m, w) => m + (w - m % w) % w, s = 1; s <= 4; s *= 2) {
        var u = t * (1 + 0.2 / s);
        u = Math.min(u, e + 100663296);
        var d = Math.min(n, a(Math.max(e, u), 65536)), f = ka(d);
        if (f)
          return !0;
      }
      return !1;
    }, kt = {}, Fa = () => v || "./this.program", Fe = () => {
      if (!Fe.strings) {
        var e = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", t = {
          USER: "web_user",
          LOGNAME: "web_user",
          PATH: "/",
          PWD: "/",
          HOME: "/home/web_user",
          LANG: e,
          _: Fa()
        };
        for (var n in kt)
          kt[n] === void 0 ? delete t[n] : t[n] = kt[n];
        var a = [];
        for (var n in t)
          a.push(`${n}=${t[n]}`);
        Fe.strings = a;
      }
      return Fe.strings;
    }, Ua = (e, t) => {
      for (var n = 0; n < e.length; ++n)
        R[t++ >> 0] = e.charCodeAt(n);
      R[t >> 0] = 0;
    }, Wa = (e, t) => {
      var n = 0;
      return Fe().forEach((a, s) => {
        var u = t + n;
        A[e + s * 4 >> 2] = u, Ua(a, u), n += a.length + 1;
      }), 0;
    }, ja = (e, t) => {
      var n = Fe();
      A[e >> 2] = n.length;
      var a = 0;
      return n.forEach((s) => a += s.length + 1), A[t >> 2] = a, 0;
    }, La = (e) => e, tt = (e) => e % 4 === 0 && (e % 100 !== 0 || e % 400 === 0), Ha = (e, t) => {
      for (var n = 0, a = 0; a <= t; n += e[a++])
        ;
      return n;
    }, ur = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], lr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Ba = (e, t) => {
      for (var n = new Date(e.getTime()); t > 0; ) {
        var a = tt(n.getFullYear()), s = n.getMonth(), u = (a ? ur : lr)[s];
        if (t > u - n.getDate())
          t -= u - n.getDate() + 1, n.setDate(1), s < 11 ? n.setMonth(s + 1) : (n.setMonth(0), n.setFullYear(n.getFullYear() + 1));
        else
          return n.setDate(n.getDate() + t), n;
      }
      return n;
    };
    function Va(e, t, n) {
      var a = n > 0 ? n : or(e) + 1, s = new Array(a), u = ar(e, s, 0, s.length);
      return t && (s.length = u), s;
    }
    var qa = (e, t) => {
      R.set(e, t);
    }, Na = (e, t, n, a) => {
      var s = A[a + 40 >> 2], u = {
        tm_sec: M[a >> 2],
        tm_min: M[a + 4 >> 2],
        tm_hour: M[a + 8 >> 2],
        tm_mday: M[a + 12 >> 2],
        tm_mon: M[a + 16 >> 2],
        tm_year: M[a + 20 >> 2],
        tm_wday: M[a + 24 >> 2],
        tm_yday: M[a + 28 >> 2],
        tm_isdst: M[a + 32 >> 2],
        tm_gmtoff: M[a + 36 >> 2],
        tm_zone: s ? xt(s) : ""
      }, d = xt(n), f = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S",
        "%Ec": "%c",
        "%EC": "%C",
        "%Ex": "%m/%d/%y",
        "%EX": "%H:%M:%S",
        "%Ey": "%y",
        "%EY": "%Y",
        "%Od": "%d",
        "%Oe": "%e",
        "%OH": "%H",
        "%OI": "%I",
        "%Om": "%m",
        "%OM": "%M",
        "%OS": "%S",
        "%Ou": "%u",
        "%OU": "%U",
        "%OV": "%V",
        "%Ow": "%w",
        "%OW": "%W",
        "%Oy": "%y"
      };
      for (var m in f)
        d = d.replace(new RegExp(m, "g"), f[m]);
      var w = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], _ = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      function T(y, P, N) {
        for (var G = typeof y == "number" ? y.toString() : y || ""; G.length < P; )
          G = N[0] + G;
        return G;
      }
      function E(y, P) {
        return T(y, P, "0");
      }
      function O(y, P) {
        function N(Se) {
          return Se < 0 ? -1 : Se > 0 ? 1 : 0;
        }
        var G;
        return (G = N(y.getFullYear() - P.getFullYear())) === 0 && (G = N(y.getMonth() - P.getMonth())) === 0 && (G = N(y.getDate() - P.getDate())), G;
      }
      function L(y) {
        switch (y.getDay()) {
          case 0:
            return new Date(y.getFullYear() - 1, 11, 29);
          case 1:
            return y;
          case 2:
            return new Date(y.getFullYear(), 0, 3);
          case 3:
            return new Date(y.getFullYear(), 0, 2);
          case 4:
            return new Date(y.getFullYear(), 0, 1);
          case 5:
            return new Date(y.getFullYear() - 1, 11, 31);
          case 6:
            return new Date(y.getFullYear() - 1, 11, 30);
        }
      }
      function q(y) {
        var P = Ba(new Date(y.tm_year + 1900, 0, 1), y.tm_yday), N = new Date(P.getFullYear(), 0, 4), G = new Date(P.getFullYear() + 1, 0, 4), Se = L(N), nt = L(G);
        return O(Se, P) <= 0 ? O(nt, P) <= 0 ? P.getFullYear() + 1 : P.getFullYear() : P.getFullYear() - 1;
      }
      var I = {
        "%a": (y) => w[y.tm_wday].substring(0, 3),
        "%A": (y) => w[y.tm_wday],
        "%b": (y) => _[y.tm_mon].substring(0, 3),
        "%B": (y) => _[y.tm_mon],
        "%C": (y) => {
          var P = y.tm_year + 1900;
          return E(P / 100 | 0, 2);
        },
        "%d": (y) => E(y.tm_mday, 2),
        "%e": (y) => T(y.tm_mday, 2, " "),
        "%g": (y) => q(y).toString().substring(2),
        "%G": (y) => q(y),
        "%H": (y) => E(y.tm_hour, 2),
        "%I": (y) => {
          var P = y.tm_hour;
          return P == 0 ? P = 12 : P > 12 && (P -= 12), E(P, 2);
        },
        "%j": (y) => E(y.tm_mday + Ha(tt(y.tm_year + 1900) ? ur : lr, y.tm_mon - 1), 3),
        "%m": (y) => E(y.tm_mon + 1, 2),
        "%M": (y) => E(y.tm_min, 2),
        "%n": () => `
`,
        "%p": (y) => y.tm_hour >= 0 && y.tm_hour < 12 ? "AM" : "PM",
        "%S": (y) => E(y.tm_sec, 2),
        "%t": () => "	",
        "%u": (y) => y.tm_wday || 7,
        "%U": (y) => {
          var P = y.tm_yday + 7 - y.tm_wday;
          return E(Math.floor(P / 7), 2);
        },
        "%V": (y) => {
          var P = Math.floor((y.tm_yday + 7 - (y.tm_wday + 6) % 7) / 7);
          if ((y.tm_wday + 371 - y.tm_yday - 2) % 7 <= 2 && P++, P) {
            if (P == 53) {
              var N = (y.tm_wday + 371 - y.tm_yday) % 7;
              N != 4 && (N != 3 || !tt(y.tm_year)) && (P = 1);
            }
          } else {
            P = 52;
            var G = (y.tm_wday + 7 - y.tm_yday - 1) % 7;
            (G == 4 || G == 5 && tt(y.tm_year % 400 - 1)) && P++;
          }
          return E(P, 2);
        },
        "%w": (y) => y.tm_wday,
        "%W": (y) => {
          var P = y.tm_yday + 7 - (y.tm_wday + 6) % 7;
          return E(Math.floor(P / 7), 2);
        },
        "%y": (y) => (y.tm_year + 1900).toString().substring(2),
        "%Y": (y) => y.tm_year + 1900,
        "%z": (y) => {
          var P = y.tm_gmtoff, N = P >= 0;
          return P = Math.abs(P) / 60, P = P / 60 * 100 + P % 60, (N ? "+" : "-") + ("0000" + P).slice(-4);
        },
        "%Z": (y) => y.tm_zone,
        "%%": () => "%"
      };
      d = d.replace(/%%/g, "\0\0");
      for (var m in I)
        d.includes(m) && (d = d.replace(new RegExp(m, "g"), I[m](u)));
      d = d.replace(/\0\0/g, "%");
      var J = Va(d, !1);
      return J.length > t ? 0 : (qa(J, e), J.length - 1);
    }, za = (e, t, n, a, s) => Na(e, t, n, a);
    qt = i.InternalError = class extends Error {
      constructor(e) {
        super(e), this.name = "InternalError";
      }
    }, gn(), _e = i.BindingError = class extends Error {
      constructor(e) {
        super(e), this.name = "BindingError";
      }
    }, An(), Tn(), Wn(), er = i.UnboundTypeError = Bn(Error, "UnboundTypeError"), Gn(), Jn();
    var Ga = {
      s: sn,
      u: cn,
      b: ln,
      g: dn,
      q: fn,
      J: hn,
      f: pn,
      V: mn,
      d: un,
      da: vn,
      Q: yn,
      _: bn,
      ca: Vn,
      ba: Nn,
      w: zn,
      Y: Qn,
      x: Zn,
      h: Kn,
      L: ta,
      M: ra,
      t: aa,
      o: oa,
      K: ca,
      C: ma,
      A: va,
      ea: ya,
      $: ga,
      R: wa,
      ha: Mt,
      fa: $a,
      Z: Ea,
      N: Oa,
      O: Ma,
      aa: Aa,
      B: Da,
      X: xa,
      W: Ia,
      T: Wa,
      U: ja,
      E: uo,
      D: Za,
      F: co,
      n: lo,
      a: Ya,
      e: eo,
      m: Xa,
      k: ro,
      H: io,
      v: ao,
      G: so,
      z: ho,
      P: mo,
      l: to,
      j: Ka,
      c: Qa,
      p: Ja,
      I: oo,
      r: fo,
      i: no,
      y: po,
      ga: La,
      S: za
    }, z = on(), ue = i._free = (e) => (ue = i._free = z.ka)(e), It = i._malloc = (e) => (It = i._malloc = z.la)(e), dr = (e) => (dr = z.na)(e), j = (e, t) => (j = z.oa)(e, t), Ue = (e) => (Ue = z.pa)(e), B = () => (B = z.qa)(), V = (e) => (V = z.ra)(e), fr = (e) => (fr = z.sa)(e), hr = (e) => (hr = z.ta)(e), pr = (e, t, n) => (pr = z.ua)(e, t, n), mr = (e) => (mr = z.va)(e);
    i.dynCall_viijii = (e, t, n, a, s, u, d) => (i.dynCall_viijii = z.wa)(e, t, n, a, s, u, d);
    var vr = i.dynCall_jiiii = (e, t, n, a, s) => (vr = i.dynCall_jiiii = z.xa)(e, t, n, a, s);
    i.dynCall_iiiiij = (e, t, n, a, s, u, d) => (i.dynCall_iiiiij = z.ya)(e, t, n, a, s, u, d), i.dynCall_iiiiijj = (e, t, n, a, s, u, d, f, m) => (i.dynCall_iiiiijj = z.za)(e, t, n, a, s, u, d, f, m), i.dynCall_iiiiiijj = (e, t, n, a, s, u, d, f, m, w) => (i.dynCall_iiiiiijj = z.Aa)(e, t, n, a, s, u, d, f, m, w);
    function Ya(e, t) {
      var n = B();
      try {
        return H(e)(t);
      } catch (a) {
        if (V(n), a !== a + 0)
          throw a;
        j(1, 0);
      }
    }
    function Ja(e, t, n, a) {
      var s = B();
      try {
        H(e)(t, n, a);
      } catch (u) {
        if (V(s), u !== u + 0)
          throw u;
        j(1, 0);
      }
    }
    function Qa(e, t, n) {
      var a = B();
      try {
        H(e)(t, n);
      } catch (s) {
        if (V(a), s !== s + 0)
          throw s;
        j(1, 0);
      }
    }
    function Xa(e, t, n, a) {
      var s = B();
      try {
        return H(e)(t, n, a);
      } catch (u) {
        if (V(s), u !== u + 0)
          throw u;
        j(1, 0);
      }
    }
    function Za(e, t, n, a, s) {
      var u = B();
      try {
        return H(e)(t, n, a, s);
      } catch (d) {
        if (V(u), d !== d + 0)
          throw d;
        j(1, 0);
      }
    }
    function Ka(e, t) {
      var n = B();
      try {
        H(e)(t);
      } catch (a) {
        if (V(n), a !== a + 0)
          throw a;
        j(1, 0);
      }
    }
    function eo(e, t, n) {
      var a = B();
      try {
        return H(e)(t, n);
      } catch (s) {
        if (V(a), s !== s + 0)
          throw s;
        j(1, 0);
      }
    }
    function to(e) {
      var t = B();
      try {
        H(e)();
      } catch (n) {
        if (V(t), n !== n + 0)
          throw n;
        j(1, 0);
      }
    }
    function ro(e, t, n, a, s) {
      var u = B();
      try {
        return H(e)(t, n, a, s);
      } catch (d) {
        if (V(u), d !== d + 0)
          throw d;
        j(1, 0);
      }
    }
    function no(e, t, n, a, s, u, d, f, m, w, _) {
      var T = B();
      try {
        H(e)(t, n, a, s, u, d, f, m, w, _);
      } catch (E) {
        if (V(T), E !== E + 0)
          throw E;
        j(1, 0);
      }
    }
    function ao(e, t, n, a, s, u, d) {
      var f = B();
      try {
        return H(e)(t, n, a, s, u, d);
      } catch (m) {
        if (V(f), m !== m + 0)
          throw m;
        j(1, 0);
      }
    }
    function oo(e, t, n, a, s) {
      var u = B();
      try {
        H(e)(t, n, a, s);
      } catch (d) {
        if (V(u), d !== d + 0)
          throw d;
        j(1, 0);
      }
    }
    function io(e, t, n, a, s, u) {
      var d = B();
      try {
        return H(e)(t, n, a, s, u);
      } catch (f) {
        if (V(d), f !== f + 0)
          throw f;
        j(1, 0);
      }
    }
    function so(e, t, n, a, s, u, d, f) {
      var m = B();
      try {
        return H(e)(t, n, a, s, u, d, f);
      } catch (w) {
        if (V(m), w !== w + 0)
          throw w;
        j(1, 0);
      }
    }
    function co(e, t, n, a) {
      var s = B();
      try {
        return H(e)(t, n, a);
      } catch (u) {
        if (V(s), u !== u + 0)
          throw u;
        j(1, 0);
      }
    }
    function uo(e, t, n, a) {
      var s = B();
      try {
        return H(e)(t, n, a);
      } catch (u) {
        if (V(s), u !== u + 0)
          throw u;
        j(1, 0);
      }
    }
    function lo(e) {
      var t = B();
      try {
        return H(e)();
      } catch (n) {
        if (V(t), n !== n + 0)
          throw n;
        j(1, 0);
      }
    }
    function fo(e, t, n, a, s, u, d, f) {
      var m = B();
      try {
        H(e)(t, n, a, s, u, d, f);
      } catch (w) {
        if (V(m), w !== w + 0)
          throw w;
        j(1, 0);
      }
    }
    function ho(e, t, n, a, s, u, d, f, m, w, _, T) {
      var E = B();
      try {
        return H(e)(t, n, a, s, u, d, f, m, w, _, T);
      } catch (O) {
        if (V(E), O !== O + 0)
          throw O;
        j(1, 0);
      }
    }
    function po(e, t, n, a, s, u, d, f, m, w, _, T, E, O, L, q) {
      var I = B();
      try {
        H(e)(t, n, a, s, u, d, f, m, w, _, T, E, O, L, q);
      } catch (J) {
        if (V(I), J !== J + 0)
          throw J;
        j(1, 0);
      }
    }
    function mo(e, t, n, a, s) {
      var u = B();
      try {
        return vr(e, t, n, a, s);
      } catch (d) {
        if (V(u), d !== d + 0)
          throw d;
        j(1, 0);
      }
    }
    var rt;
    ve = function e() {
      rt || yr(), rt || (ve = e);
    };
    function yr() {
      if (te > 0 || (Le(), te > 0))
        return;
      function e() {
        rt || (rt = !0, i.calledRun = !0, !W && (dt(), c(i), i.onRuntimeInitialized && i.onRuntimeInitialized(), ft()));
      }
      i.setStatus ? (i.setStatus("Running..."), setTimeout(function() {
        setTimeout(function() {
          i.setStatus("");
        }, 1), e();
      }, 1)) : e();
    }
    if (i.preInit)
      for (typeof i.preInit == "function" && (i.preInit = [i.preInit]); i.preInit.length > 0; )
        i.preInit.pop()();
    return yr(), o.ready;
  };
})();
function Yo(r) {
  return Ht(
    lt,
    r
  );
}
function Li(r) {
  return No(
    lt,
    r
  );
}
async function Jo(r, o) {
  return zo(
    lt,
    r,
    o
  );
}
async function Qo(r, o) {
  return Go(
    lt,
    r,
    o
  );
}
var je;
class Bt extends EventTarget {
  constructor(o = {}) {
    var i;
    super(), Co(this, je, void 0);
    try {
      const c = (i = o == null ? void 0 : o.formats) == null ? void 0 : i.filter(
        (l) => l !== "unknown"
      );
      if ((c == null ? void 0 : c.length) === 0)
        throw new TypeError("Hint option provided, but is empty.");
      c == null || c.forEach((l) => {
        if (!st.has(l))
          throw new TypeError(
            `Failed to read the 'formats' property from 'BarcodeDetectorOptions': The provided value '${l}' is not a valid enum value of type BarcodeFormat.`
          );
      }), $o(this, je, c != null ? c : []), Yo().then((l) => {
        this.dispatchEvent(
          new CustomEvent("load", {
            detail: l
          })
        );
      }).catch((l) => {
        this.dispatchEvent(new CustomEvent("error", { detail: l }));
      });
    } catch (c) {
      throw Cr(
        c,
        "Failed to construct 'BarcodeDetector'"
      );
    }
  }
  static async getSupportedFormats() {
    return _o.filter((o) => o !== "unknown");
  }
  async detect(o) {
    try {
      const i = await Ao(o);
      if (i === null)
        return [];
      let c;
      try {
        jr(i) ? c = await Jo(i, {
          tryHarder: !0,
          formats: br(this, je).map((l) => st.get(l))
        }) : c = await Qo(i, {
          tryHarder: !0,
          formats: br(this, je).map((l) => st.get(l))
        });
      } catch (l) {
        throw console.error(l), new DOMException(
          "Barcode detection service unavailable.",
          "NotSupportedError"
        );
      }
      return c.map((l) => {
        const {
          topLeft: { x: h, y: v },
          topRight: { x: g, y: b },
          bottomLeft: { x: p, y: C },
          bottomRight: { x: S, y: $ }
        } = l.position, F = Math.min(h, g, p, S), U = Math.min(v, b, C, $), W = Math.max(h, g, p, S), R = Math.max(v, b, C, $);
        return {
          boundingBox: new DOMRectReadOnly(
            F,
            U,
            W - F,
            R - U
          ),
          rawValue: l.text,
          format: So(l.format),
          cornerPoints: [
            {
              x: h,
              y: v
            },
            {
              x: g,
              y: b
            },
            {
              x: S,
              y: $
            },
            {
              x: p,
              y: C
            }
          ]
        };
      });
    } catch (i) {
      throw Cr(
        i,
        "Failed to execute 'detect' on 'BarcodeDetector'"
      );
    }
  }
}
je = /* @__PURE__ */ new WeakMap();
const Vt = (r, o, i = "error") => {
  let c, l;
  const h = new Promise(
    (v, g) => {
      c = v, l = g, r.addEventListener(o, c), r.addEventListener(i, l);
    }
  );
  return h.finally(() => {
    r.removeEventListener(o, c), r.removeEventListener(i, l);
  }), h;
}, Sr = (r) => new Promise((o) => setTimeout(o, r));
class Xo extends Error {
  constructor() {
    super("can't process cross-origin image"), this.name = "DropImageFetchError";
  }
}
class Vr extends Error {
  constructor() {
    super("this browser has no Stream API support"), this.name = "StreamApiNotSupportedError";
  }
}
class Zo extends Error {
  constructor() {
    super(
      "camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP."
    ), this.name = "InsecureContextError";
  }
}
class Ko extends Error {
  constructor() {
    super(
      "Loading camera stream timed out after 6 seconds. If you are on iOS in PWA mode, this is a known issue (see https://github.com/gruhn/vue-qrcode-reader/issues/298)"
    ), this.name = "StreamLoadTimeoutError";
  }
}
let qr;
function Nr(r) {
  qr = new Bt({ formats: r });
}
const ei = async (r, {
  detectHandler: o,
  locateHandler: i,
  minDelay: c,
  formats: l
}) => {
  console.debug("[vue-qrcode-reader] start scanning"), Nr(l);
  const h = (v) => async (g) => {
    if (r.readyState === 0)
      console.debug("[vue-qrcode-reader] stop scanning: video element readyState is 0");
    else {
      const { lastScanned: b, contentBefore: p, lastScanHadContent: C } = v;
      if (g - b < c)
        window.requestAnimationFrame(h(v));
      else {
        const S = await qr.detect(r), $ = S.some((W) => !p.includes(W.rawValue));
        $ && o(S);
        const F = S.length > 0;
        F && i(S), !F && C && i(S);
        const U = {
          lastScanned: g,
          lastScanHadContent: F,
          // It can happen that a QR code is constantly in view of the camera but
          // maybe a scanned frame is a bit blurry and we detect nothing but in the
          // next frame we detect the code again. We also want to avoid emitting
          // a `detect` event in such a case. So we don't reset `contentBefore`,
          // if we detect nothing, only if we detect something new.
          contentBefore: $ ? S.map((W) => W.rawValue) : p
        };
        window.requestAnimationFrame(h(U));
      }
    }
  };
  h({
    lastScanned: performance.now(),
    contentBefore: [],
    lastScanHadContent: !1
  })(performance.now());
}, ti = async (r) => {
  if (r.startsWith("http") && r.includes(location.host) === !1)
    throw new Xo();
  const o = document.createElement("img");
  return o.src = r, await Vt(o, "load"), o;
}, zr = async (r, o = ["qr_code"]) => await new Bt({ formats: o }).detect(r), ri = async (r, o = ["qr_code"]) => {
  const i = new Bt({ formats: o }), c = await ti(r);
  return await i.detect(c);
};
var Gr = {}, Q = {};
Object.defineProperty(Q, "__esModule", {
  value: !0
});
Q.compactObject = Qr;
Q.deprecated = di;
var ni = Q.detectBrowser = fi;
Q.disableLog = ci;
Q.disableWarnings = ui;
Q.extractVersion = ct;
Q.filterStats = hi;
Q.log = li;
Q.walkStats = ut;
Q.wrapPeerConnectionEvent = si;
function ai(r, o, i) {
  return o = oi(o), o in r ? Object.defineProperty(r, o, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : r[o] = i, r;
}
function oi(r) {
  var o = ii(r, "string");
  return pe(o) === "symbol" ? o : String(o);
}
function ii(r, o) {
  if (pe(r) !== "object" || r === null)
    return r;
  var i = r[Symbol.toPrimitive];
  if (i !== void 0) {
    var c = i.call(r, o || "default");
    if (pe(c) !== "object")
      return c;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (o === "string" ? String : Number)(r);
}
function pe(r) {
  "@babel/helpers - typeof";
  return pe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(o) {
    return typeof o;
  } : function(o) {
    return o && typeof Symbol == "function" && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, pe(r);
}
var Yr = !0, Jr = !0;
function ct(r, o, i) {
  var c = r.match(o);
  return c && c.length >= i && parseInt(c[i], 10);
}
function si(r, o, i) {
  if (r.RTCPeerConnection) {
    var c = r.RTCPeerConnection.prototype, l = c.addEventListener;
    c.addEventListener = function(v, g) {
      if (v !== o)
        return l.apply(this, arguments);
      var b = function(C) {
        var S = i(C);
        S && (g.handleEvent ? g.handleEvent(S) : g(S));
      };
      return this._eventMap = this._eventMap || {}, this._eventMap[o] || (this._eventMap[o] = /* @__PURE__ */ new Map()), this._eventMap[o].set(g, b), l.apply(this, [v, b]);
    };
    var h = c.removeEventListener;
    c.removeEventListener = function(v, g) {
      if (v !== o || !this._eventMap || !this._eventMap[o])
        return h.apply(this, arguments);
      if (!this._eventMap[o].has(g))
        return h.apply(this, arguments);
      var b = this._eventMap[o].get(g);
      return this._eventMap[o].delete(g), this._eventMap[o].size === 0 && delete this._eventMap[o], Object.keys(this._eventMap).length === 0 && delete this._eventMap, h.apply(this, [v, b]);
    }, Object.defineProperty(c, "on" + o, {
      get: function() {
        return this["_on" + o];
      },
      set: function(g) {
        this["_on" + o] && (this.removeEventListener(o, this["_on" + o]), delete this["_on" + o]), g && this.addEventListener(o, this["_on" + o] = g);
      },
      enumerable: !0,
      configurable: !0
    });
  }
}
function ci(r) {
  return typeof r != "boolean" ? new Error("Argument type: " + pe(r) + ". Please use a boolean.") : (Yr = r, r ? "adapter.js logging disabled" : "adapter.js logging enabled");
}
function ui(r) {
  return typeof r != "boolean" ? new Error("Argument type: " + pe(r) + ". Please use a boolean.") : (Jr = !r, "adapter.js deprecation warnings " + (r ? "disabled" : "enabled"));
}
function li() {
  if ((typeof window > "u" ? "undefined" : pe(window)) === "object") {
    if (Yr)
      return;
    typeof console < "u" && typeof console.log == "function" && console.log.apply(console, arguments);
  }
}
function di(r, o) {
  Jr && console.warn(r + " is deprecated, please use " + o + " instead.");
}
function fi(r) {
  var o = {
    browser: null,
    version: null
  };
  if (typeof r > "u" || !r.navigator || !r.navigator.userAgent)
    return o.browser = "Not a browser.", o;
  var i = r.navigator;
  if (i.mozGetUserMedia)
    o.browser = "firefox", o.version = ct(i.userAgent, /Firefox\/(\d+)\./, 1);
  else if (i.webkitGetUserMedia || r.isSecureContext === !1 && r.webkitRTCPeerConnection)
    o.browser = "chrome", o.version = ct(i.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
  else if (r.RTCPeerConnection && i.userAgent.match(/AppleWebKit\/(\d+)\./))
    o.browser = "safari", o.version = ct(i.userAgent, /AppleWebKit\/(\d+)\./, 1), o.supportsUnifiedPlan = r.RTCRtpTransceiver && "currentDirection" in r.RTCRtpTransceiver.prototype;
  else
    return o.browser = "Not a supported browser.", o;
  return o;
}
function Pr(r) {
  return Object.prototype.toString.call(r) === "[object Object]";
}
function Qr(r) {
  return Pr(r) ? Object.keys(r).reduce(function(o, i) {
    var c = Pr(r[i]), l = c ? Qr(r[i]) : r[i], h = c && !Object.keys(l).length;
    return l === void 0 || h ? o : Object.assign(o, ai({}, i, l));
  }, {}) : r;
}
function ut(r, o, i) {
  !o || i.has(o.id) || (i.set(o.id, o), Object.keys(o).forEach(function(c) {
    c.endsWith("Id") ? ut(r, r.get(o[c]), i) : c.endsWith("Ids") && o[c].forEach(function(l) {
      ut(r, r.get(l), i);
    });
  }));
}
function hi(r, o, i) {
  var c = i ? "outbound-rtp" : "inbound-rtp", l = /* @__PURE__ */ new Map();
  if (o === null)
    return l;
  var h = [];
  return r.forEach(function(v) {
    v.type === "track" && v.trackIdentifier === o.id && h.push(v);
  }), h.forEach(function(v) {
    r.forEach(function(g) {
      g.type === c && g.trackId === v.id && ut(r, g, l);
    });
  }), l;
}
Object.defineProperty(Gr, "__esModule", {
  value: !0
});
var pi = Gr.shimGetUserMedia = yi, mi = vi(Q);
function Xr(r) {
  if (typeof WeakMap != "function")
    return null;
  var o = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap();
  return (Xr = function(l) {
    return l ? i : o;
  })(r);
}
function vi(r, o) {
  if (!o && r && r.__esModule)
    return r;
  if (r === null || he(r) !== "object" && typeof r != "function")
    return { default: r };
  var i = Xr(o);
  if (i && i.has(r))
    return i.get(r);
  var c = {}, l = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var h in r)
    if (h !== "default" && Object.prototype.hasOwnProperty.call(r, h)) {
      var v = l ? Object.getOwnPropertyDescriptor(r, h) : null;
      v && (v.get || v.set) ? Object.defineProperty(c, h, v) : c[h] = r[h];
    }
  return c.default = r, i && i.set(r, c), c;
}
function he(r) {
  "@babel/helpers - typeof";
  return he = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(o) {
    return typeof o;
  } : function(o) {
    return o && typeof Symbol == "function" && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, he(r);
}
var Tr = mi.log;
function yi(r, o) {
  var i = r && r.navigator;
  if (i.mediaDevices) {
    var c = function(p) {
      if (he(p) !== "object" || p.mandatory || p.optional)
        return p;
      var C = {};
      return Object.keys(p).forEach(function(S) {
        if (!(S === "require" || S === "advanced" || S === "mediaSource")) {
          var $ = he(p[S]) === "object" ? p[S] : {
            ideal: p[S]
          };
          $.exact !== void 0 && typeof $.exact == "number" && ($.min = $.max = $.exact);
          var F = function(R, D) {
            return R ? R + D.charAt(0).toUpperCase() + D.slice(1) : D === "deviceId" ? "sourceId" : D;
          };
          if ($.ideal !== void 0) {
            C.optional = C.optional || [];
            var U = {};
            typeof $.ideal == "number" ? (U[F("min", S)] = $.ideal, C.optional.push(U), U = {}, U[F("max", S)] = $.ideal, C.optional.push(U)) : (U[F("", S)] = $.ideal, C.optional.push(U));
          }
          $.exact !== void 0 && typeof $.exact != "number" ? (C.mandatory = C.mandatory || {}, C.mandatory[F("", S)] = $.exact) : ["min", "max"].forEach(function(W) {
            $[W] !== void 0 && (C.mandatory = C.mandatory || {}, C.mandatory[F(W, S)] = $[W]);
          });
        }
      }), p.advanced && (C.optional = (C.optional || []).concat(p.advanced)), C;
    }, l = function(p, C) {
      if (o.version >= 61)
        return C(p);
      if (p = JSON.parse(JSON.stringify(p)), p && he(p.audio) === "object") {
        var S = function(R, D, X) {
          D in R && !(X in R) && (R[X] = R[D], delete R[D]);
        };
        p = JSON.parse(JSON.stringify(p)), S(p.audio, "autoGainControl", "googAutoGainControl"), S(p.audio, "noiseSuppression", "googNoiseSuppression"), p.audio = c(p.audio);
      }
      if (p && he(p.video) === "object") {
        var $ = p.video.facingMode;
        $ = $ && (he($) === "object" ? $ : {
          ideal: $
        });
        var F = o.version < 66;
        if ($ && ($.exact === "user" || $.exact === "environment" || $.ideal === "user" || $.ideal === "environment") && !(i.mediaDevices.getSupportedConstraints && i.mediaDevices.getSupportedConstraints().facingMode && !F)) {
          delete p.video.facingMode;
          var U;
          if ($.exact === "environment" || $.ideal === "environment" ? U = ["back", "rear"] : ($.exact === "user" || $.ideal === "user") && (U = ["front"]), U)
            return i.mediaDevices.enumerateDevices().then(function(W) {
              W = W.filter(function(D) {
                return D.kind === "videoinput";
              });
              var R = W.find(function(D) {
                return U.some(function(X) {
                  return D.label.toLowerCase().includes(X);
                });
              });
              return !R && W.length && U.includes("back") && (R = W[W.length - 1]), R && (p.video.deviceId = $.exact ? {
                exact: R.deviceId
              } : {
                ideal: R.deviceId
              }), p.video = c(p.video), Tr("chrome: " + JSON.stringify(p)), C(p);
            });
        }
        p.video = c(p.video);
      }
      return Tr("chrome: " + JSON.stringify(p)), C(p);
    }, h = function(p) {
      return o.version >= 64 ? p : {
        name: {
          PermissionDeniedError: "NotAllowedError",
          PermissionDismissedError: "NotAllowedError",
          InvalidStateError: "NotAllowedError",
          DevicesNotFoundError: "NotFoundError",
          ConstraintNotSatisfiedError: "OverconstrainedError",
          TrackStartError: "NotReadableError",
          MediaDeviceFailedDueToShutdown: "NotAllowedError",
          MediaDeviceKillSwitchOn: "NotAllowedError",
          TabCaptureError: "AbortError",
          ScreenCaptureError: "AbortError",
          DeviceCaptureError: "AbortError"
        }[p.name] || p.name,
        message: p.message,
        constraint: p.constraint || p.constraintName,
        toString: function() {
          return this.name + (this.message && ": ") + this.message;
        }
      };
    }, v = function(p, C, S) {
      l(p, function($) {
        i.webkitGetUserMedia($, C, function(F) {
          S && S(h(F));
        });
      });
    };
    if (i.getUserMedia = v.bind(i), i.mediaDevices.getUserMedia) {
      var g = i.mediaDevices.getUserMedia.bind(i.mediaDevices);
      i.mediaDevices.getUserMedia = function(b) {
        return l(b, function(p) {
          return g(p).then(function(C) {
            if (p.audio && !C.getAudioTracks().length || p.video && !C.getVideoTracks().length)
              throw C.getTracks().forEach(function(S) {
                S.stop();
              }), new DOMException("", "NotFoundError");
            return C;
          }, function(C) {
            return Promise.reject(h(C));
          });
        });
      };
    }
  }
}
var Zr = {};
Object.defineProperty(Zr, "__esModule", {
  value: !0
});
var gi = Zr.shimGetUserMedia = Ci, wi = bi(Q);
function Kr(r) {
  if (typeof WeakMap != "function")
    return null;
  var o = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap();
  return (Kr = function(l) {
    return l ? i : o;
  })(r);
}
function bi(r, o) {
  if (!o && r && r.__esModule)
    return r;
  if (r === null || Pe(r) !== "object" && typeof r != "function")
    return { default: r };
  var i = Kr(o);
  if (i && i.has(r))
    return i.get(r);
  var c = {}, l = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var h in r)
    if (h !== "default" && Object.prototype.hasOwnProperty.call(r, h)) {
      var v = l ? Object.getOwnPropertyDescriptor(r, h) : null;
      v && (v.get || v.set) ? Object.defineProperty(c, h, v) : c[h] = r[h];
    }
  return c.default = r, i && i.set(r, c), c;
}
function Pe(r) {
  "@babel/helpers - typeof";
  return Pe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(o) {
    return typeof o;
  } : function(o) {
    return o && typeof Symbol == "function" && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, Pe(r);
}
function Ci(r, o) {
  var i = r && r.navigator, c = r && r.MediaStreamTrack;
  if (i.getUserMedia = function(b, p, C) {
    wi.deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), i.mediaDevices.getUserMedia(b).then(p, C);
  }, !(o.version > 55 && "autoGainControl" in i.mediaDevices.getSupportedConstraints())) {
    var l = function(p, C, S) {
      C in p && !(S in p) && (p[S] = p[C], delete p[C]);
    }, h = i.mediaDevices.getUserMedia.bind(i.mediaDevices);
    if (i.mediaDevices.getUserMedia = function(b) {
      return Pe(b) === "object" && Pe(b.audio) === "object" && (b = JSON.parse(JSON.stringify(b)), l(b.audio, "autoGainControl", "mozAutoGainControl"), l(b.audio, "noiseSuppression", "mozNoiseSuppression")), h(b);
    }, c && c.prototype.getSettings) {
      var v = c.prototype.getSettings;
      c.prototype.getSettings = function() {
        var b = v.apply(this, arguments);
        return l(b, "mozAutoGainControl", "autoGainControl"), l(b, "mozNoiseSuppression", "noiseSuppression"), b;
      };
    }
    if (c && c.prototype.applyConstraints) {
      var g = c.prototype.applyConstraints;
      c.prototype.applyConstraints = function(b) {
        return this.kind === "audio" && Pe(b) === "object" && (b = JSON.parse(JSON.stringify(b)), l(b, "autoGainControl", "mozAutoGainControl"), l(b, "noiseSuppression", "mozNoiseSuppression")), g.apply(this, [b]);
      };
    }
  }
}
var oe = {};
Object.defineProperty(oe, "__esModule", {
  value: !0
});
oe.shimAudioContext = Di;
oe.shimCallbacksAPI = Ti;
oe.shimConstraints = rn;
oe.shimCreateOfferLegacy = Ai;
var $i = oe.shimGetUserMedia = Ei;
oe.shimLocalStreamsAPI = Si;
oe.shimRTCIceServerUrls = Oi;
oe.shimRemoteStreamsAPI = Pi;
oe.shimTrackEventTransceiver = Mi;
var en = _i(Q);
function tn(r) {
  if (typeof WeakMap != "function")
    return null;
  var o = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap();
  return (tn = function(l) {
    return l ? i : o;
  })(r);
}
function _i(r, o) {
  if (!o && r && r.__esModule)
    return r;
  if (r === null || me(r) !== "object" && typeof r != "function")
    return { default: r };
  var i = tn(o);
  if (i && i.has(r))
    return i.get(r);
  var c = {}, l = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var h in r)
    if (h !== "default" && Object.prototype.hasOwnProperty.call(r, h)) {
      var v = l ? Object.getOwnPropertyDescriptor(r, h) : null;
      v && (v.get || v.set) ? Object.defineProperty(c, h, v) : c[h] = r[h];
    }
  return c.default = r, i && i.set(r, c), c;
}
function me(r) {
  "@babel/helpers - typeof";
  return me = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(o) {
    return typeof o;
  } : function(o) {
    return o && typeof Symbol == "function" && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, me(r);
}
function Si(r) {
  if (!(me(r) !== "object" || !r.RTCPeerConnection)) {
    if ("getLocalStreams" in r.RTCPeerConnection.prototype || (r.RTCPeerConnection.prototype.getLocalStreams = function() {
      return this._localStreams || (this._localStreams = []), this._localStreams;
    }), !("addStream" in r.RTCPeerConnection.prototype)) {
      var o = r.RTCPeerConnection.prototype.addTrack;
      r.RTCPeerConnection.prototype.addStream = function(c) {
        var l = this;
        this._localStreams || (this._localStreams = []), this._localStreams.includes(c) || this._localStreams.push(c), c.getAudioTracks().forEach(function(h) {
          return o.call(l, h, c);
        }), c.getVideoTracks().forEach(function(h) {
          return o.call(l, h, c);
        });
      }, r.RTCPeerConnection.prototype.addTrack = function(c) {
        for (var l = this, h = arguments.length, v = new Array(h > 1 ? h - 1 : 0), g = 1; g < h; g++)
          v[g - 1] = arguments[g];
        return v && v.forEach(function(b) {
          l._localStreams ? l._localStreams.includes(b) || l._localStreams.push(b) : l._localStreams = [b];
        }), o.apply(this, arguments);
      };
    }
    "removeStream" in r.RTCPeerConnection.prototype || (r.RTCPeerConnection.prototype.removeStream = function(c) {
      var l = this;
      this._localStreams || (this._localStreams = []);
      var h = this._localStreams.indexOf(c);
      if (h !== -1) {
        this._localStreams.splice(h, 1);
        var v = c.getTracks();
        this.getSenders().forEach(function(g) {
          v.includes(g.track) && l.removeTrack(g);
        });
      }
    });
  }
}
function Pi(r) {
  if (!(me(r) !== "object" || !r.RTCPeerConnection) && ("getRemoteStreams" in r.RTCPeerConnection.prototype || (r.RTCPeerConnection.prototype.getRemoteStreams = function() {
    return this._remoteStreams ? this._remoteStreams : [];
  }), !("onaddstream" in r.RTCPeerConnection.prototype))) {
    Object.defineProperty(r.RTCPeerConnection.prototype, "onaddstream", {
      get: function() {
        return this._onaddstream;
      },
      set: function(c) {
        var l = this;
        this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = c), this.addEventListener("track", this._onaddstreampoly = function(h) {
          h.streams.forEach(function(v) {
            if (l._remoteStreams || (l._remoteStreams = []), !l._remoteStreams.includes(v)) {
              l._remoteStreams.push(v);
              var g = new Event("addstream");
              g.stream = v, l.dispatchEvent(g);
            }
          });
        });
      }
    });
    var o = r.RTCPeerConnection.prototype.setRemoteDescription;
    r.RTCPeerConnection.prototype.setRemoteDescription = function() {
      var c = this;
      return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function(l) {
        l.streams.forEach(function(h) {
          if (c._remoteStreams || (c._remoteStreams = []), !(c._remoteStreams.indexOf(h) >= 0)) {
            c._remoteStreams.push(h);
            var v = new Event("addstream");
            v.stream = h, c.dispatchEvent(v);
          }
        });
      }), o.apply(c, arguments);
    };
  }
}
function Ti(r) {
  if (!(me(r) !== "object" || !r.RTCPeerConnection)) {
    var o = r.RTCPeerConnection.prototype, i = o.createOffer, c = o.createAnswer, l = o.setLocalDescription, h = o.setRemoteDescription, v = o.addIceCandidate;
    o.createOffer = function(p, C) {
      var S = arguments.length >= 2 ? arguments[2] : arguments[0], $ = i.apply(this, [S]);
      return C ? ($.then(p, C), Promise.resolve()) : $;
    }, o.createAnswer = function(p, C) {
      var S = arguments.length >= 2 ? arguments[2] : arguments[0], $ = c.apply(this, [S]);
      return C ? ($.then(p, C), Promise.resolve()) : $;
    };
    var g = function(p, C, S) {
      var $ = l.apply(this, [p]);
      return S ? ($.then(C, S), Promise.resolve()) : $;
    };
    o.setLocalDescription = g, g = function(p, C, S) {
      var $ = h.apply(this, [p]);
      return S ? ($.then(C, S), Promise.resolve()) : $;
    }, o.setRemoteDescription = g, g = function(p, C, S) {
      var $ = v.apply(this, [p]);
      return S ? ($.then(C, S), Promise.resolve()) : $;
    }, o.addIceCandidate = g;
  }
}
function Ei(r) {
  var o = r && r.navigator;
  if (o.mediaDevices && o.mediaDevices.getUserMedia) {
    var i = o.mediaDevices, c = i.getUserMedia.bind(i);
    o.mediaDevices.getUserMedia = function(l) {
      return c(rn(l));
    };
  }
  !o.getUserMedia && o.mediaDevices && o.mediaDevices.getUserMedia && (o.getUserMedia = (function(h, v, g) {
    o.mediaDevices.getUserMedia(h).then(v, g);
  }).bind(o));
}
function rn(r) {
  return r && r.video !== void 0 ? Object.assign({}, r, {
    video: en.compactObject(r.video)
  }) : r;
}
function Oi(r) {
  if (r.RTCPeerConnection) {
    var o = r.RTCPeerConnection;
    r.RTCPeerConnection = function(c, l) {
      if (c && c.iceServers) {
        for (var h = [], v = 0; v < c.iceServers.length; v++) {
          var g = c.iceServers[v];
          g.urls === void 0 && g.url ? (en.deprecated("RTCIceServer.url", "RTCIceServer.urls"), g = JSON.parse(JSON.stringify(g)), g.urls = g.url, delete g.url, h.push(g)) : h.push(c.iceServers[v]);
        }
        c.iceServers = h;
      }
      return new o(c, l);
    }, r.RTCPeerConnection.prototype = o.prototype, "generateCertificate" in o && Object.defineProperty(r.RTCPeerConnection, "generateCertificate", {
      get: function() {
        return o.generateCertificate;
      }
    });
  }
}
function Mi(r) {
  me(r) === "object" && r.RTCTrackEvent && "receiver" in r.RTCTrackEvent.prototype && !("transceiver" in r.RTCTrackEvent.prototype) && Object.defineProperty(r.RTCTrackEvent.prototype, "transceiver", {
    get: function() {
      return {
        receiver: this.receiver
      };
    }
  });
}
function Ai(r) {
  var o = r.RTCPeerConnection.prototype.createOffer;
  r.RTCPeerConnection.prototype.createOffer = function(c) {
    if (c) {
      typeof c.offerToReceiveAudio < "u" && (c.offerToReceiveAudio = !!c.offerToReceiveAudio);
      var l = this.getTransceivers().find(function(v) {
        return v.receiver.track.kind === "audio";
      });
      c.offerToReceiveAudio === !1 && l ? l.direction === "sendrecv" ? l.setDirection ? l.setDirection("sendonly") : l.direction = "sendonly" : l.direction === "recvonly" && (l.setDirection ? l.setDirection("inactive") : l.direction = "inactive") : c.offerToReceiveAudio === !0 && !l && this.addTransceiver("audio", {
        direction: "recvonly"
      }), typeof c.offerToReceiveVideo < "u" && (c.offerToReceiveVideo = !!c.offerToReceiveVideo);
      var h = this.getTransceivers().find(function(v) {
        return v.receiver.track.kind === "video";
      });
      c.offerToReceiveVideo === !1 && h ? h.direction === "sendrecv" ? h.setDirection ? h.setDirection("sendonly") : h.direction = "sendonly" : h.direction === "recvonly" && (h.setDirection ? h.setDirection("inactive") : h.direction = "inactive") : c.offerToReceiveVideo === !0 && !h && this.addTransceiver("video", {
        direction: "recvonly"
      });
    }
    return o.apply(this, arguments);
  };
}
function Di(r) {
  me(r) !== "object" || r.AudioContext || (r.AudioContext = r.webkitAudioContext);
}
const xi = (r) => {
  let o = !1, i;
  return (...c) => (o || (i = r(c), o = !0), i);
};
function ae(r, o) {
  if (r === !1)
    throw new Error(o != null ? o : "assertion failure");
}
function Er(r) {
  throw new Error("this code should be unreachable");
}
const Ri = xi(() => {
  const r = ni(window);
  switch (r.browser) {
    case "chrome":
      pi(window, r);
      break;
    case "firefox":
      gi(window, r);
      break;
    case "safari":
      $i(window, r);
      break;
    default:
      throw new Vr();
  }
});
let Te = Promise.resolve({ type: "stop", data: {} });
async function Or(r, o, i) {
  var g, b, p;
  if (console.debug(
    "[vue-qrcode-reader] starting camera with constraints: ",
    JSON.stringify(o)
  ), window.isSecureContext !== !0)
    throw new Zo();
  if (((g = navigator == null ? void 0 : navigator.mediaDevices) == null ? void 0 : g.getUserMedia) === void 0)
    throw new Vr();
  Ri(), console.debug("[vue-qrcode-reader] calling getUserMedia");
  const c = await navigator.mediaDevices.getUserMedia({
    audio: !1,
    video: o
  });
  r.srcObject !== void 0 ? r.srcObject = c : r.mozSrcObject !== void 0 ? r.mozSrcObject = c : window.URL.createObjectURL ? r.src = window.URL.createObjectURL(c) : window.webkitURL ? r.src = window.webkitURL.createObjectURL(c) : r.src = c.id, r.play(), console.debug("[vue-qrcode-reader] waiting for video element to load"), await Promise.race([
    Vt(r, "loadeddata"),
    // On iOS devices in PWA mode, QrcodeStream works initially, but after
    // killing and restarting the PWA, all video elements fail to load camera
    // streams and never emit the `loadeddata` event. Looks like this is
    // related to a WebKit issue (see #298). No workarounds at the moment.
    // To at least detect this situation, we throw an error if the event
    // has not been emitted after a 6 second timeout.
    Sr(6e3).then(() => {
      throw new Ko();
    })
  ]), console.debug("[vue-qrcode-reader] video element loaded"), await Sr(500);
  const [l] = c.getVideoTracks(), h = (p = (b = l == null ? void 0 : l.getCapabilities) == null ? void 0 : b.call(l)) != null ? p : {};
  let v = !1;
  return i && h.torch && (await l.applyConstraints({ advanced: [{ torch: !0 }] }), v = !0), console.debug("[vue-qrcode-reader] camera ready"), {
    type: "start",
    data: {
      videoEl: r,
      stream: c,
      capabilities: h,
      constraints: o,
      isTorchOn: v
    }
  };
}
async function ki(r, {
  constraints: o,
  torch: i,
  restart: c = !1
}) {
  Te = Te.then((h) => {
    if (h.type === "start") {
      const {
        data: {
          videoEl: v,
          stream: g,
          constraints: b,
          isTorchOn: p
        }
      } = h;
      return !c && r === v && o === b && i === p ? h : nn(v, g, p).then(
        () => Or(r, o, i)
      );
    } else if (h.type === "stop" || h.type === "failed")
      return Or(r, o, i);
    Er();
  }).catch((h) => (console.debug(`[vue-qrcode-reader] starting camera failed with "${h}"`), { type: "failed", error: h }));
  const l = await Te;
  if (l.type === "stop")
    throw new Error("Something went wrong with the camera task queue (start task).");
  if (l.type === "failed")
    throw l.error;
  if (l.type === "start")
    return l.data.capabilities;
  Er();
}
async function nn(r, o, i) {
  console.debug("[vue-qrcode-reader] stopping camera"), r.src = "", r.srcObject = null, r.load(), await Vt(r, "error");
  for (const c of o.getTracks())
    i != null || await c.applyConstraints({ advanced: [{ torch: !1 }] }), o.removeTrack(c), c.stop();
  return {
    type: "stop",
    data: {}
  };
}
async function it() {
  if (Te = Te.then((o) => {
    if (o.type === "stop" || o.type === "failed")
      return o;
    const {
      data: { videoEl: i, stream: c, isTorchOn: l }
    } = o;
    return nn(i, c, l);
  }), (await Te).type === "start")
    throw new Error("Something went wrong with the camera task queue (stop task).");
}
const Ii = /* @__PURE__ */ Wt({
  __name: "QrcodeStream",
  props: {
    constraints: { default: () => ({ facingMode: "environment" }) },
    formats: { default: () => ["qr_code"] },
    paused: { type: Boolean, default: !1 },
    torch: { type: Boolean, default: !1 },
    track: { type: Function, default: void 0 }
  },
  emits: ["detect", "camera-on", "camera-off", "error"],
  setup(r, { emit: o }) {
    const i = r, c = o, l = we(i.constraints), h = we(i.formats);
    We(
      () => i.constraints,
      (k, M) => {
        JSON.stringify(k) !== JSON.stringify(M) && (l.value = k);
      },
      { deep: !0 }
    ), We(
      () => i.formats,
      (k, M) => {
        JSON.stringify(k) !== JSON.stringify(M) && (h.value = k);
      },
      { deep: !0 }
    );
    const v = we(), g = we(), b = we(), p = we(!1), C = we(!1);
    vo(() => {
      C.value = !0;
    }), yo(() => {
      it();
    });
    const S = Ft(() => ({
      torch: i.torch,
      constraints: l.value,
      shouldStream: C.value && !i.paused
    }));
    We(
      S,
      async (k) => {
        const M = b.value;
        ae(
          M !== void 0,
          "cameraSettings watcher should never be triggered when component is not mounted. Thus video element should always be defined."
        );
        const A = v.value;
        ae(
          A !== void 0,
          "cameraSettings watcher should never be triggered when component is not mounted. Thus canvas should always be defined."
        );
        const le = A.getContext("2d");
        if (ae(le !== null, "if cavnas is defined, canvas 2d context should also be non-null"), k.shouldStream) {
          it(), p.value = !1;
          try {
            const ie = await ki(M, k);
            C.value ? (p.value = !0, c("camera-on", ie)) : await it();
          } catch (ie) {
            c("error", ie);
          }
        } else
          A.width = M.videoWidth, A.height = M.videoHeight, le.drawImage(M, 0, 0, M.videoWidth, M.videoHeight), it(), p.value = !1, c("camera-off");
      },
      { deep: !0 }
    ), We(h, (k) => {
      C.value && Nr(k);
    });
    const $ = Ft(() => S.value.shouldStream && p.value);
    We($, (k) => {
      if (k) {
        ae(
          v.value !== void 0,
          "shouldScan watcher should only be triggered when component is mounted. Thus pause frame canvas is defined"
        ), F(v.value), ae(
          g.value !== void 0,
          "shouldScan watcher should only be triggered when component is mounted. Thus tracking canvas is defined"
        ), F(g.value);
        const M = () => i.track === void 0 ? 500 : 40;
        ae(
          b.value !== void 0,
          "shouldScan watcher should only be triggered when component is mounted. Thus video element is defined"
        ), ei(b.value, {
          detectHandler: (A) => c("detect", A),
          formats: h.value,
          locateHandler: U,
          minDelay: M()
        });
      }
    });
    const F = (k) => {
      const M = k.getContext("2d");
      ae(M !== null, "canvas 2d context should always be non-null"), M.clearRect(0, 0, k.width, k.height);
    }, U = (k) => {
      const M = g.value;
      ae(
        M !== void 0,
        "onLocate handler should only be called when component is mounted. Thus tracking canvas is always defined."
      );
      const A = b.value;
      if (ae(
        A !== void 0,
        "onLocate handler should only be called when component is mounted. Thus video element is always defined."
      ), k.length === 0 || i.track === void 0)
        F(M);
      else {
        const le = A.offsetWidth, ie = A.offsetHeight, be = A.videoWidth, Ce = A.videoHeight, Oe = Math.max(le / be, ie / Ce), Me = be * Oe, Le = Ce * Oe, dt = Me / be, ft = Le / Ce, ht = (le - Me) / 2, pt = (ie - Le) / 2, Ae = ({ x: de, y: Z }) => ({
          x: Math.floor(de * dt),
          y: Math.floor(Z * ft)
        }), te = ({ x: de, y: Z }) => ({
          x: Math.floor(de + ht),
          y: Math.floor(Z + pt)
        }), ve = k.map((de) => {
          const { boundingBox: Z, cornerPoints: mt } = de, { x: Be, y: fe } = te(
            Ae({
              x: Z.x,
              y: Z.y
            })
          ), { x: Ve, y: vt } = Ae({
            x: Z.width,
            y: Z.height
          });
          return {
            ...de,
            cornerPoints: mt.map((qe) => te(Ae(qe))),
            boundingBox: DOMRectReadOnly.fromRect({ x: Be, y: fe, width: Ve, height: vt })
          };
        });
        M.width = A.offsetWidth, M.height = A.offsetHeight;
        const He = M.getContext("2d");
        ae(He !== null, "canvas 2d context should always be non-null"), i.track(ve, He);
      }
    }, W = {
      width: "100%",
      height: "100%",
      position: "relative",
      // notice that we use z-index only once for the wrapper div.
      // If z-index is not defined, elements are stacked in the order they appear in the DOM.
      // The first element is at the very bottom and subsequent elements are added on top.
      "z-index": "0"
    }, R = {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "0",
      left: "0"
    }, D = {
      width: "100%",
      height: "100%",
      "object-fit": "cover"
    }, X = Ft(() => $.value ? D : {
      ...D,
      visibility: "hidden",
      position: "absolute"
    });
    return (k, M) => (jt(), Lt("div", { style: W }, [
      at("video", {
        ref_key: "videoRef",
        ref: b,
        style: go(X.value),
        autoplay: "",
        muted: "",
        playsinline: ""
      }, null, 4),
      wo(at("canvas", {
        id: "qrcode-stream-pause-frame",
        ref_key: "pauseFrameRef",
        ref: v,
        style: D
      }, null, 512), [
        [bo, !$.value]
      ]),
      at("canvas", {
        id: "qrcode-stream-tracking-layer",
        ref_key: "trackingLayerRef",
        ref: g,
        style: R
      }, null, 512),
      at("div", { style: R }, [
        Mr(k.$slots, "default")
      ])
    ]));
  }
}), Fi = /* @__PURE__ */ Wt({
  __name: "QrcodeCapture",
  props: {
    formats: { default: () => ["qr_code"] }
  },
  emits: ["detect"],
  setup(r, { emit: o }) {
    const i = r, c = o, l = (h) => {
      if (!(!(h.target instanceof HTMLInputElement) || !h.target.files))
        for (const v of Array.from(h.target.files))
          zr(v, i.formats).then((g) => {
            c("detect", g);
          });
    };
    return (h, v) => (jt(), Lt("input", {
      onChange: l,
      type: "file",
      name: "image",
      accept: "image/*",
      capture: "environment",
      multiple: ""
    }, null, 32));
  }
}), Ui = /* @__PURE__ */ Wt({
  __name: "QrcodeDropZone",
  props: {
    formats: { default: () => ["qr_code"] }
  },
  emits: ["detect", "dragover", "error"],
  setup(r, { emit: o }) {
    const i = r, c = o, l = async (g) => {
      try {
        const b = await g;
        c("detect", b);
      } catch (b) {
        c("error", b);
      }
    }, h = (g) => {
      c("dragover", g);
    }, v = ({ dataTransfer: g }) => {
      if (!g)
        return;
      h(!1);
      const b = [...Array.from(g.files)], p = g.getData("text/uri-list");
      b.forEach((C) => {
        l(zr(C, i.formats));
      }), p !== "" && l(ri(p, i.formats));
    };
    return (g, b) => (jt(), Lt("div", {
      onDrop: ot(v, ["prevent", "stop"]),
      onDragenter: b[0] || (b[0] = ot((p) => h(!0), ["prevent", "stop"])),
      onDragleave: b[1] || (b[1] = ot((p) => h(!1), ["prevent", "stop"])),
      onDragover: b[2] || (b[2] = ot(() => {
      }, ["prevent", "stop"]))
    }, [
      Mr(g.$slots, "default")
    ], 32));
  }
});
function Wi(r) {
  r.component("qrcode-stream", Ii), r.component("qrcode-capture", Fi), r.component("qrcode-drop-zone", Ui);
}
const Hi = { install: Wi };
export {
  Fi as QrcodeCapture,
  Ui as QrcodeDropZone,
  Ii as QrcodeStream,
  Hi as VueQrcodeReader,
  Wi as install,
  Li as setZXingModuleOverrides
};
