!(function(e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.VueQrcodeReader = t())
    : (e.VueQrcodeReader = t());
})("undefined" != typeof self ? self : this, function() {
  return (function(e) {
    function t(o) {
      if (r[o]) return r[o].exports;
      var n = (r[o] = { i: o, l: !1, exports: {} });
      return e[o].call(n.exports, n, n.exports, t), (n.l = !0), n.exports;
    }
    var r = {};
    return (
      (t.m = e),
      (t.c = r),
      (t.d = function(e, r, o) {
        t.o(e, r) ||
          Object.defineProperty(e, r, {
            configurable: !1,
            enumerable: !0,
            get: o
          });
      }),
      (t.n = function(e) {
        var r =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return t.d(r, "a", r), r;
      }),
      (t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (t.p = ""),
      t((t.s = 71))
    );
  })([
    function(e, t) {
      var r = (e.exports = { version: "2.6.10" });
      "number" == typeof __e && (__e = r);
    },
    function(e, t) {
      var r = (e.exports =
        "undefined" != typeof window && window.Math == Math
          ? window
          : "undefined" != typeof self && self.Math == Math
          ? self
          : Function("return this")());
      "number" == typeof __g && (__g = r);
    },
    function(e, t, r) {
      var o = r(34)("wks"),
        n = r(22),
        a = r(1).Symbol,
        i = "function" == typeof a;
      (e.exports = function(e) {
        return o[e] || (o[e] = (i && a[e]) || (i ? a : n)("Symbol." + e));
      }).store = o;
    },
    function(e, t, r) {
      var o = r(1),
        n = r(0),
        a = r(13),
        i = r(9),
        c = r(10),
        s = function(e, t, r) {
          var d,
            u,
            l,
            f = e & s.F,
            p = e & s.G,
            m = e & s.S,
            v = e & s.P,
            h = e & s.B,
            k = e & s.W,
            C = p ? n : n[t] || (n[t] = {}),
            y = C.prototype,
            g = p ? o : m ? o[t] : (o[t] || {}).prototype;
          p && (r = t);
          for (d in r)
            ((u = !f && g && void 0 !== g[d]) && c(C, d)) ||
              ((l = u ? g[d] : r[d]),
              (C[d] =
                p && "function" != typeof g[d]
                  ? r[d]
                  : h && u
                  ? a(l, o)
                  : k && g[d] == l
                  ? (function(e) {
                      var t = function(t, r, o) {
                        if (this instanceof e) {
                          switch (arguments.length) {
                            case 0:
                              return new e();
                            case 1:
                              return new e(t);
                            case 2:
                              return new e(t, r);
                          }
                          return new e(t, r, o);
                        }
                        return e.apply(this, arguments);
                      };
                      return (t.prototype = e.prototype), t;
                    })(l)
                  : v && "function" == typeof l
                  ? a(Function.call, l)
                  : l),
              v &&
                (((C.virtual || (C.virtual = {}))[d] = l),
                e & s.R && y && !y[d] && i(y, d, l)));
        };
      (s.F = 1),
        (s.G = 2),
        (s.S = 4),
        (s.P = 8),
        (s.B = 16),
        (s.W = 32),
        (s.U = 64),
        (s.R = 128),
        (e.exports = s);
    },
    function(e, t, r) {
      var o = r(5),
        n = r(48),
        a = r(29),
        i = Object.defineProperty;
      t.f = r(8)
        ? Object.defineProperty
        : function(e, t, r) {
            if ((o(e), (t = a(t, !0)), o(r), n))
              try {
                return i(e, t, r);
              } catch (e) {}
            if ("get" in r || "set" in r)
              throw TypeError("Accessors not supported!");
            return "value" in r && (e[t] = r.value), e;
          };
    },
    function(e, t, r) {
      var o = r(7);
      e.exports = function(e) {
        if (!o(e)) throw TypeError(e + " is not an object!");
        return e;
      };
    },
    function(e, t, r) {
      "use strict";
      function o(e, t, r) {
        var o = e.match(t);
        return o && o.length >= r && parseInt(o[r], 10);
      }
      function n(e, t, r) {
        if (e.RTCPeerConnection) {
          var o = e.RTCPeerConnection.prototype,
            n = o.addEventListener;
          o.addEventListener = function(e, o) {
            if (e !== t) return n.apply(this, arguments);
            var a = function(e) {
              var t = r(e);
              t && o(t);
            };
            return (
              (this._eventMap = this._eventMap || {}),
              (this._eventMap[o] = a),
              n.apply(this, [e, a])
            );
          };
          var a = o.removeEventListener;
          (o.removeEventListener = function(e, r) {
            if (e !== t || !this._eventMap || !this._eventMap[r])
              return a.apply(this, arguments);
            var o = this._eventMap[r];
            return delete this._eventMap[r], a.apply(this, [e, o]);
          }),
            Object.defineProperty(o, "on" + t, {
              get: function() {
                return this["_on" + t];
              },
              set: function(e) {
                this["_on" + t] &&
                  (this.removeEventListener(t, this["_on" + t]),
                  delete this["_on" + t]),
                  e && this.addEventListener(t, (this["_on" + t] = e));
              },
              enumerable: !0,
              configurable: !0
            });
        }
      }
      var a = !0,
        i = !0;
      e.exports = {
        extractVersion: o,
        wrapPeerConnectionEvent: n,
        disableLog: function(e) {
          return "boolean" != typeof e
            ? new Error(
                "Argument type: " + typeof e + ". Please use a boolean."
              )
            : ((a = e),
              e ? "adapter.js logging disabled" : "adapter.js logging enabled");
        },
        disableWarnings: function(e) {
          return "boolean" != typeof e
            ? new Error(
                "Argument type: " + typeof e + ". Please use a boolean."
              )
            : ((i = !e),
              "adapter.js deprecation warnings " +
                (e ? "disabled" : "enabled"));
        },
        log: function() {
          if ("object" == typeof window) {
            if (a) return;
            "undefined" != typeof console &&
              "function" == typeof console.log &&
              console.log.apply(console, arguments);
          }
        },
        deprecated: function(e, t) {
          i &&
            console.warn(e + " is deprecated, please use " + t + " instead.");
        },
        detectBrowser: function(e) {
          var t = e && e.navigator,
            r = {};
          if (
            ((r.browser = null),
            (r.version = null),
            void 0 === e || !e.navigator)
          )
            return (r.browser = "Not a browser."), r;
          if (t.mozGetUserMedia)
            (r.browser = "firefox"),
              (r.version = o(t.userAgent, /Firefox\/(\d+)\./, 1));
          else if (t.webkitGetUserMedia)
            (r.browser = "chrome"),
              (r.version = o(t.userAgent, /Chrom(e|ium)\/(\d+)\./, 2));
          else if (t.mediaDevices && t.userAgent.match(/Edge\/(\d+).(\d+)$/))
            (r.browser = "edge"),
              (r.version = o(t.userAgent, /Edge\/(\d+).(\d+)$/, 2));
          else {
            if (
              !e.RTCPeerConnection ||
              !t.userAgent.match(/AppleWebKit\/(\d+)\./)
            )
              return (r.browser = "Not a supported browser."), r;
            (r.browser = "safari"),
              (r.version = o(t.userAgent, /AppleWebKit\/(\d+)\./, 1));
          }
          return r;
        }
      };
    },
    function(e, t) {
      e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e;
      };
    },
    function(e, t, r) {
      e.exports = !r(16)(function() {
        return (
          7 !=
          Object.defineProperty({}, "a", {
            get: function() {
              return 7;
            }
          }).a
        );
      });
    },
    function(e, t, r) {
      var o = r(4),
        n = r(17);
      e.exports = r(8)
        ? function(e, t, r) {
            return o.f(e, t, n(1, r));
          }
        : function(e, t, r) {
            return (e[t] = r), e;
          };
    },
    function(e, t) {
      var r = {}.hasOwnProperty;
      e.exports = function(e, t) {
        return r.call(e, t);
      };
    },
    function(e, t, r) {
      e.exports = r(96);
    },
    function(e, t, r) {
      "use strict";
      t.__esModule = !0;
      var o = r(45),
        n = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(o);
      t.default = function(e) {
        return function() {
          var t = e.apply(this, arguments);
          return new n.default(function(e, r) {
            function o(a, i) {
              try {
                var c = t[a](i),
                  s = c.value;
              } catch (e) {
                return void r(e);
              }
              if (!c.done)
                return n.default.resolve(s).then(
                  function(e) {
                    o("next", e);
                  },
                  function(e) {
                    o("throw", e);
                  }
                );
              e(s);
            }
            return o("next");
          });
        };
      };
    },
    function(e, t, r) {
      var o = r(21);
      e.exports = function(e, t, r) {
        if ((o(e), void 0 === t)) return e;
        switch (r) {
          case 1:
            return function(r) {
              return e.call(t, r);
            };
          case 2:
            return function(r, o) {
              return e.call(t, r, o);
            };
          case 3:
            return function(r, o, n) {
              return e.call(t, r, o, n);
            };
        }
        return function() {
          return e.apply(t, arguments);
        };
      };
    },
    function(e, t, r) {
      var o = r(80),
        n = r(27);
      e.exports = function(e) {
        return o(n(e));
      };
    },
    function(e, t) {
      e.exports = !0;
    },
    function(e, t) {
      e.exports = function(e) {
        try {
          return !!e();
        } catch (e) {
          return !0;
        }
      };
    },
    function(e, t) {
      e.exports = function(e, t) {
        return {
          enumerable: !(1 & e),
          configurable: !(2 & e),
          writable: !(4 & e),
          value: t
        };
      };
    },
    function(e, t) {
      e.exports = {};
    },
    function(e, t) {
      var r = {}.toString;
      e.exports = function(e) {
        return r.call(e).slice(8, -1);
      };
    },
    function(e, t) {
      e.exports = function(e, t, r, o) {
        var n,
          a = (e = e || {}),
          i = typeof e.default;
        ("object" !== i && "function" !== i) || ((n = e), (a = e.default));
        var c = "function" == typeof a ? a.options : a;
        if (
          (t &&
            ((c.render = t.render), (c.staticRenderFns = t.staticRenderFns)),
          r && (c._scopeId = r),
          o)
        ) {
          var s = c.computed || (c.computed = {});
          Object.keys(o).forEach(function(e) {
            var t = o[e];
            s[e] = function() {
              return t;
            };
          });
        }
        return { esModule: n, exports: a, options: c };
      };
    },
    function(e, t) {
      e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e;
      };
    },
    function(e, t) {
      var r = 0,
        o = Math.random();
      e.exports = function(e) {
        return "Symbol(".concat(
          void 0 === e ? "" : e,
          ")_",
          (++r + o).toString(36)
        );
      };
    },
    function(e, t, r) {
      var o = r(4).f,
        n = r(10),
        a = r(2)("toStringTag");
      e.exports = function(e, t, r) {
        e &&
          !n((e = r ? e : e.prototype), a) &&
          o(e, a, { configurable: !0, value: t });
      };
    },
    function(e, t, r) {
      var o = r(27);
      e.exports = function(e) {
        return Object(o(e));
      };
    },
    function(e, t, r) {
      "use strict";
      var o = r(77)(!0);
      r(47)(
        String,
        "String",
        function(e) {
          (this._t = String(e)), (this._i = 0);
        },
        function() {
          var e,
            t = this._t,
            r = this._i;
          return r >= t.length
            ? { value: void 0, done: !0 }
            : ((e = o(t, r)), (this._i += e.length), { value: e, done: !1 });
        }
      );
    },
    function(e, t) {
      var r = Math.ceil,
        o = Math.floor;
      e.exports = function(e) {
        return isNaN((e = +e)) ? 0 : (e > 0 ? o : r)(e);
      };
    },
    function(e, t) {
      e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e;
      };
    },
    function(e, t, r) {
      var o = r(7),
        n = r(1).document,
        a = o(n) && o(n.createElement);
      e.exports = function(e) {
        return a ? n.createElement(e) : {};
      };
    },
    function(e, t, r) {
      var o = r(7);
      e.exports = function(e, t) {
        if (!o(e)) return e;
        var r, n;
        if (t && "function" == typeof (r = e.toString) && !o((n = r.call(e))))
          return n;
        if ("function" == typeof (r = e.valueOf) && !o((n = r.call(e))))
          return n;
        if (!t && "function" == typeof (r = e.toString) && !o((n = r.call(e))))
          return n;
        throw TypeError("Can't convert object to primitive value");
      };
    },
    function(e, t, r) {
      var o = r(5),
        n = r(79),
        a = r(35),
        i = r(33)("IE_PROTO"),
        c = function() {},
        s = function() {
          var e,
            t = r(28)("iframe"),
            o = a.length;
          for (
            t.style.display = "none",
              r(51).appendChild(t),
              t.src = "javascript:",
              e = t.contentWindow.document,
              e.open(),
              e.write("<script>document.F=Object</script>"),
              e.close(),
              s = e.F;
            o--;

          )
            delete s.prototype[a[o]];
          return s();
        };
      e.exports =
        Object.create ||
        function(e, t) {
          var r;
          return (
            null !== e
              ? ((c.prototype = o(e)),
                (r = new c()),
                (c.prototype = null),
                (r[i] = e))
              : (r = s()),
            void 0 === t ? r : n(r, t)
          );
        };
    },
    function(e, t, r) {
      var o = r(50),
        n = r(35);
      e.exports =
        Object.keys ||
        function(e) {
          return o(e, n);
        };
    },
    function(e, t, r) {
      var o = r(26),
        n = Math.min;
      e.exports = function(e) {
        return e > 0 ? n(o(e), 9007199254740991) : 0;
      };
    },
    function(e, t, r) {
      var o = r(34)("keys"),
        n = r(22);
      e.exports = function(e) {
        return o[e] || (o[e] = n(e));
      };
    },
    function(e, t, r) {
      var o = r(0),
        n = r(1),
        a = n["__core-js_shared__"] || (n["__core-js_shared__"] = {});
      (e.exports = function(e, t) {
        return a[e] || (a[e] = void 0 !== t ? t : {});
      })("versions", []).push({
        version: o.version,
        mode: r(15) ? "pure" : "global",
        copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
      });
    },
    function(e, t) {
      e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
        ","
      );
    },
    function(e, t, r) {
      "use strict";
      function o(e) {
        var t, r;
        (this.promise = new e(function(e, o) {
          if (void 0 !== t || void 0 !== r)
            throw TypeError("Bad Promise constructor");
          (t = e), (r = o);
        })),
          (this.resolve = n(t)),
          (this.reject = n(r));
      }
      var n = r(21);
      e.exports.f = function(e) {
        return new o(e);
      };
    },
    function(e, t, r) {
      "use strict";
      function o(e, t, r) {
        var o = r.detectHandler,
          n = r.locateHandler,
          a = r.minDelay,
          i = null,
          c = null,
          s = performance.now(),
          d = new e(),
          u = !1,
          l = !0;
        d.onmessage = function(e) {
          u = !1;
          var t = e.data,
            r = t.content,
            a = t.location;
          null !== r && r !== i && o(e.data),
            a !== c && n(a),
            (i = r || i),
            (c = a);
        };
        return (
          (function e(r) {
            if (l) {
              if (
                (window.requestAnimationFrame(e),
                r - s >= a && ((s = r), !1 === u))
              ) {
                u = !0;
                var o = t.captureFrame();
                d.postMessage(o, [o.data.buffer]);
              }
            } else d.terminate();
          })(),
          function() {
            l = !1;
          }
        );
      }
      r.d(t, "b", function() {
        return d;
      }),
        (t.a = o);
      var n = r(11),
        a = r.n(n),
        i = r(12),
        c = r.n(i),
        s = r(38),
        d = (function() {
          var e = c()(
            a.a.mark(function e(t, r) {
              var o, n;
              return a.a.wrap(
                function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (o = new t()),
                          o.postMessage(r, [r.data.buffer]),
                          (e.next = 4),
                          Object(s.a)(o, "message")
                        );
                      case 4:
                        return (
                          (n = e.sent),
                          o.terminate(),
                          e.abrupt("return", n.data)
                        );
                      case 7:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                this
              );
            })
          );
          return function(t, r) {
            return e.apply(this, arguments);
          };
        })();
    },
    function(e, t, r) {
      "use strict";
      function o(e, t, r) {
        var o, n;
        void 0 === r && (r = "error");
        var a = new Promise(function(e, t) {
          (o = e), (n = t);
        });
        return (
          e.addEventListener(t, o),
          e.addEventListener(r, n),
          a.finally(function() {
            e.removeEventListener(t, o), e.removeEventListener(r, n);
          }),
          a
        );
      }
      r.d(t, "a", function() {
        return o;
      });
    },
    function(e, t, r) {
      t.f = r(2);
    },
    function(e, t, r) {
      var o = r(1),
        n = r(0),
        a = r(15),
        i = r(39),
        c = r(4).f;
      e.exports = function(e) {
        var t = n.Symbol || (n.Symbol = a ? {} : o.Symbol || {});
        "_" == e.charAt(0) || e in t || c(t, e, { value: i.f(e) });
      };
    },
    function(e, t) {
      t.f = {}.propertyIsEnumerable;
    },
    function(e, t, r) {
      "use strict";
      function o(e, t, r) {
        var o = Math.min(1, f.width / t, f.height / r),
          n = o * t,
          a = o * r;
        return p.drawImage(e, 0, 0, n, a), p.getImageData(0, 0, n, a);
      }
      function n(e) {
        return o(e, e.naturalWidth, e.naturalHeight);
      }
      function a(e) {
        return o(e, e.videoWidth, e.videoHeight);
      }
      (t.c = a),
        r.d(t, "b", function() {
          return m;
        }),
        r.d(t, "a", function() {
          return v;
        });
      var i = r(11),
        c = r.n(i),
        s = r(12),
        d = r.n(s),
        u = r(65),
        l = r(38),
        f = document.createElement("canvas"),
        p = f.getContext("2d");
      (f.width = 1920), (f.height = 1080);
      var m = (function() {
          var e = d()(
            c.a.mark(function e(t) {
              var r;
              return c.a.wrap(
                function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (
                          !t.startsWith("http") ||
                          !1 !== t.includes(location.host)
                        ) {
                          e.next = 2;
                          break;
                        }
                        throw new u.b();
                      case 2:
                        return (
                          (r = document.createElement("img")),
                          (r.src = t),
                          (e.next = 6),
                          Object(l.a)(r, "load")
                        );
                      case 6:
                        return e.abrupt("return", n(r));
                      case 7:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                this
              );
            })
          );
          return function(t) {
            return e.apply(this, arguments);
          };
        })(),
        v = (function() {
          var e = d()(
            c.a.mark(function e(t) {
              var r, o, n;
              return c.a.wrap(
                function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (!/image.*/.test(t.type)) {
                          e.next = 10;
                          break;
                        }
                        return (
                          (r = new FileReader()),
                          r.readAsDataURL(t),
                          (e.next = 5),
                          Object(l.a)(r, "load")
                        );
                      case 5:
                        return (
                          (o = e.sent),
                          (n = o.target.result),
                          e.abrupt("return", m(n))
                        );
                      case 10:
                        throw new u.a();
                      case 11:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                this
              );
            })
          );
          return function(t) {
            return e.apply(this, arguments);
          };
        })();
    },
    function(e, t, r) {
      var o = r(20)(r(139), null, null, null);
      e.exports = o.exports;
    },
    function(e, t, r) {
      e.exports = function() {
        return r(140)(
          '!function(o){function e(t){if(r[t])return r[t].exports;var c=r[t]={i:t,l:!1,exports:{}};return o[t].call(c.exports,c,c.exports,e),c.l=!0,c.exports}var r={};e.m=o,e.c=r,e.d=function(o,r,t){e.o(o,r)||Object.defineProperty(o,r,{configurable:!1,enumerable:!0,get:t})},e.n=function(o){var r=o&&o.__esModule?function(){return o.default}:function(){return o};return e.d(r,"a",r),r},e.o=function(o,e){return Object.prototype.hasOwnProperty.call(o,e)},e.p="",e(e.s=0)}([function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r(1),c=r.n(t);self.addEventListener("message",function(o){var e=o.data,r=c()(e.data,e.width,e.height,{inversionAttempts:"dontInvert"}),t=null,s=null;null!==r&&(t=r.data,s=r.location);var a={content:t,location:s,imageData:e};self.postMessage(a,[e.data.buffer])})},function(o,e,r){!function(e,r){o.exports=r()}("undefined"!=typeof self&&self,function(){return function(o){function e(t){if(r[t])return r[t].exports;var c=r[t]={i:t,l:!1,exports:{}};return o[t].call(c.exports,c,c.exports,e),c.l=!0,c.exports}var r={};return e.m=o,e.c=r,e.d=function(o,r,t){e.o(o,r)||Object.defineProperty(o,r,{configurable:!1,enumerable:!0,get:t})},e.n=function(o){var r=o&&o.__esModule?function(){return o.default}:function(){return o};return e.d(r,"a",r),r},e.o=function(o,e){return Object.prototype.hasOwnProperty.call(o,e)},e.p="",e(e.s=3)}([function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(){function o(o,e){this.width=e,this.height=o.length/e,this.data=o}return o.createEmpty=function(e,r){return new o(new Uint8ClampedArray(e*r),e)},o.prototype.get=function(o,e){return!(o<0||o>=this.width||e<0||e>=this.height)&&!!this.data[e*this.width+o]},o.prototype.set=function(o,e,r){this.data[e*this.width+o]=r?1:0},o.prototype.setRegion=function(o,e,r,t,c){for(var s=e;s<e+t;s++)for(var a=o;a<o+r;a++)this.set(a,s,!!c)},o}();e.BitMatrix=t},function(o,e,r){"use strict";function t(o,e){return o^e}Object.defineProperty(e,"__esModule",{value:!0});var c=r(2);e.addOrSubtractGF=t;var s=function(){function o(o,e,r){this.primitive=o,this.size=e,this.generatorBase=r,this.expTable=new Array(this.size),this.logTable=new Array(this.size);for(var t=1,s=0;s<this.size;s++)this.expTable[s]=t,(t*=2)>=this.size&&(t=(t^this.primitive)&this.size-1);for(var s=0;s<this.size-1;s++)this.logTable[this.expTable[s]]=s;this.zero=new c.default(this,Uint8ClampedArray.from([0])),this.one=new c.default(this,Uint8ClampedArray.from([1]))}return o.prototype.multiply=function(o,e){return 0===o||0===e?0:this.expTable[(this.logTable[o]+this.logTable[e])%(this.size-1)]},o.prototype.inverse=function(o){if(0===o)throw new Error("Can\'t invert 0");return this.expTable[this.size-this.logTable[o]-1]},o.prototype.buildMonomial=function(o,e){if(o<0)throw new Error("Invalid monomial degree less than 0");if(0===e)return this.zero;var r=new Uint8ClampedArray(o+1);return r[0]=e,new c.default(this,r)},o.prototype.log=function(o){if(0===o)throw new Error("Can\'t take log(0)");return this.logTable[o]},o.prototype.exp=function(o){return this.expTable[o]},o}();e.default=s},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r(1),c=function(){function o(o,e){if(0===e.length)throw new Error("No coefficients.");this.field=o;var r=e.length;if(r>1&&0===e[0]){for(var t=1;t<r&&0===e[t];)t++;if(t===r)this.coefficients=o.zero.coefficients;else{this.coefficients=new Uint8ClampedArray(r-t);for(var c=0;c<this.coefficients.length;c++)this.coefficients[c]=e[t+c]}}else this.coefficients=e}return o.prototype.degree=function(){return this.coefficients.length-1},o.prototype.isZero=function(){return 0===this.coefficients[0]},o.prototype.getCoefficient=function(o){return this.coefficients[this.coefficients.length-1-o]},o.prototype.addOrSubtract=function(e){if(this.isZero())return e;if(e.isZero())return this;var r=this.coefficients,c=e.coefficients;r.length>c.length&&(d=[c,r],r=d[0],c=d[1]);for(var s=new Uint8ClampedArray(c.length),a=c.length-r.length,n=0;n<a;n++)s[n]=c[n];for(var n=a;n<c.length;n++)s[n]=t.addOrSubtractGF(r[n-a],c[n]);return new o(this.field,s);var d},o.prototype.multiply=function(e){if(0===e)return this.field.zero;if(1===e)return this;for(var r=this.coefficients.length,t=new Uint8ClampedArray(r),c=0;c<r;c++)t[c]=this.field.multiply(this.coefficients[c],e);return new o(this.field,t)},o.prototype.multiplyPoly=function(e){if(this.isZero()||e.isZero())return this.field.zero;for(var r=this.coefficients,c=r.length,s=e.coefficients,a=s.length,n=new Uint8ClampedArray(c+a-1),d=0;d<c;d++)for(var l=r[d],i=0;i<a;i++)n[d+i]=t.addOrSubtractGF(n[d+i],this.field.multiply(l,s[i]));return new o(this.field,n)},o.prototype.multiplyByMonomial=function(e,r){if(e<0)throw new Error("Invalid degree less than 0");if(0===r)return this.field.zero;for(var t=this.coefficients.length,c=new Uint8ClampedArray(t+e),s=0;s<t;s++)c[s]=this.field.multiply(this.coefficients[s],r);return new o(this.field,c)},o.prototype.evaluateAt=function(o){var e=0;if(0===o)return this.getCoefficient(0);var r=this.coefficients.length;if(1===o)return this.coefficients.forEach(function(o){e=t.addOrSubtractGF(e,o)}),e;e=this.coefficients[0];for(var c=1;c<r;c++)e=t.addOrSubtractGF(this.field.multiply(o,e),this.coefficients[c]);return e},o}();e.default=c},function(o,e,r){"use strict";function t(o){var e=d.locate(o);if(!e)return null;var r=n.extract(o,e),t=a.decode(r.matrix);return t?{binaryData:t.bytes,data:t.text,chunks:t.chunks,location:{topRightCorner:r.mappingFunction(e.dimension,0),topLeftCorner:r.mappingFunction(0,0),bottomRightCorner:r.mappingFunction(e.dimension,e.dimension),bottomLeftCorner:r.mappingFunction(0,e.dimension),topRightFinderPattern:e.topRight,topLeftFinderPattern:e.topLeft,bottomLeftFinderPattern:e.bottomLeft,bottomRightAlignmentPattern:e.alignmentPattern}}:null}function c(o,e,r,c){void 0===c&&(c={});var a=l;Object.keys(a||{}).forEach(function(o){a[o]=c[o]||a[o]});var n="attemptBoth"===a.inversionAttempts||"invertFirst"===a.inversionAttempts,d="onlyInvert"===a.inversionAttempts||"invertFirst"===a.inversionAttempts,i=s.binarize(o,e,r,n),B=i.binarized,k=i.inverted,u=t(d?k:B);return u||"attemptBoth"!==a.inversionAttempts&&"invertFirst"!==a.inversionAttempts||(u=t(d?B:k)),u}Object.defineProperty(e,"__esModule",{value:!0});var s=r(4),a=r(5),n=r(11),d=r(12),l={inversionAttempts:"attemptBoth"};c.default=c,e.default=c},function(o,e,r){"use strict";function t(o,e,r){return o<e?e:o>r?r:o}function c(o,e,r,c){if(o.length!==e*r*4)throw new Error("Malformed data passed to binarizer.");for(var l=new d(e,r),i=0;i<e;i++)for(var B=0;B<r;B++){var k=o[4*(B*e+i)+0],u=o[4*(B*e+i)+1],C=o[4*(B*e+i)+2];l.set(i,B,.2126*k+.7152*u+.0722*C)}for(var m=Math.ceil(e/a),f=Math.ceil(r/a),w=new d(m,f),P=0;P<f;P++)for(var v=0;v<m;v++){for(var h=0,p=1/0,b=0,B=0;B<a;B++)for(var i=0;i<a;i++){var y=l.get(v*a+i,P*a+B);h+=y,p=Math.min(p,y),b=Math.max(b,y)}var g=h/Math.pow(a,2);if(b-p<=n&&(g=p/2,P>0&&v>0)){var x=(w.get(v,P-1)+2*w.get(v-1,P)+w.get(v-1,P-1))/4;p<x&&(g=x)}w.set(v,P,g)}var M=s.BitMatrix.createEmpty(e,r),L=null;c&&(L=s.BitMatrix.createEmpty(e,r));for(var P=0;P<f;P++)for(var v=0;v<m;v++){for(var N=t(v,2,m-3),I=t(P,2,f-3),h=0,O=-2;O<=2;O++)for(var z=-2;z<=2;z++)h+=w.get(N+O,I+z);for(var S=h/25,O=0;O<a;O++)for(var z=0;z<a;z++){var i=v*a+O,B=P*a+z,X=l.get(i,B);M.set(i,B,X<=S),c&&L.set(i,B,!(X<=S))}}return c?{binarized:M,inverted:L}:{binarized:M}}Object.defineProperty(e,"__esModule",{value:!0});var s=r(0),a=8,n=24,d=function(){function o(o,e){this.width=o,this.data=new Uint8ClampedArray(o*e)}return o.prototype.get=function(o,e){return this.data[e*this.width+o]},o.prototype.set=function(o,e,r){this.data[e*this.width+o]=r},o}();e.binarize=c},function(o,e,r){"use strict";function t(o,e){for(var r=o^e,t=0;r;)t++,r&=r-1;return t}function c(o,e){return e<<1|o}function s(o){var e=17+4*o.versionNumber,r=k.BitMatrix.createEmpty(e,e);r.setRegion(0,0,9,9,!0),r.setRegion(e-8,0,8,9,!0),r.setRegion(0,e-8,9,8,!0);for(var t=0,c=o.alignmentPatternCenters;t<c.length;t++)for(var s=c[t],a=0,n=o.alignmentPatternCenters;a<n.length;a++){var d=n[a];6===s&&6===d||6===s&&d===e-7||s===e-7&&6===d||r.setRegion(s-2,d-2,5,5,!0)}return r.setRegion(6,9,1,e-17,!0),r.setRegion(9,6,e-17,1,!0),o.versionNumber>6&&(r.setRegion(e-11,0,3,6,!0),r.setRegion(0,e-11,6,3,!0)),r}function a(o,e,r){for(var t=w[r.dataMask],a=o.height,n=s(e),d=[],l=0,i=0,B=!0,k=a-1;k>0;k-=2){6===k&&k--;for(var u=0;u<a;u++)for(var C=B?a-1-u:u,m=0;m<2;m++){var f=k-m;if(!n.get(f,C)){i++;var P=o.get(f,C);t({y:C,x:f})&&(P=!P),l=c(P,l),8===i&&(d.push(l),i=0,l=0)}}B=!B}return d}function n(o){var e=o.height,r=Math.floor((e-17)/4);if(r<=6)return m.VERSIONS[r-1];for(var s=0,a=5;a>=0;a--)for(var n=e-9;n>=e-11;n--)s=c(o.get(n,a),s);for(var d=0,n=5;n>=0;n--)for(var a=e-9;a>=e-11;a--)d=c(o.get(n,a),d);for(var l,i=1/0,B=0,k=m.VERSIONS;B<k.length;B++){var u=k[B];if(u.infoBits===s||u.infoBits===d)return u;var C=t(s,u.infoBits);C<i&&(l=u,i=C),C=t(d,u.infoBits),C<i&&(l=u,i=C)}return i<=3?l:void 0}function d(o){for(var e=0,r=0;r<=8;r++)6!==r&&(e=c(o.get(r,8),e));for(var s=7;s>=0;s--)6!==s&&(e=c(o.get(8,s),e));for(var a=o.height,n=0,s=a-1;s>=a-7;s--)n=c(o.get(8,s),n);for(var r=a-8;r<a;r++)n=c(o.get(r,8),n);for(var d=1/0,l=null,i=0,B=f;i<B.length;i++){var k=B[i],u=k.bits,C=k.formatInfo;if(u===e||u===n)return C;var m=t(e,u);m<d&&(l=C,d=m),e!==n&&(m=t(n,u))<d&&(l=C,d=m)}return d<=3?l:null}function l(o,e,r){var t=e.errorCorrectionLevels[r],c=[],s=0;if(t.ecBlocks.forEach(function(o){for(var e=0;e<o.numBlocks;e++)c.push({numDataCodewords:o.dataCodewordsPerBlock,codewords:[]}),s+=o.dataCodewordsPerBlock+t.ecCodewordsPerBlock}),o.length<s)return null;o=o.slice(0,s);for(var a=t.ecBlocks[0].dataCodewordsPerBlock,n=0;n<a;n++)for(var d=0,l=c;d<l.length;d++){var i=l[d];i.codewords.push(o.shift())}if(t.ecBlocks.length>1)for(var B=t.ecBlocks[0].numBlocks,k=t.ecBlocks[1].numBlocks,n=0;n<k;n++)c[B+n].codewords.push(o.shift());for(;o.length>0;)for(var u=0,C=c;u<C.length;u++){var i=C[u];i.codewords.push(o.shift())}return c}function i(o){var e=n(o);if(!e)return null;var r=d(o);if(!r)return null;var t=a(o,e,r),c=l(t,e,r.errorCorrectionLevel);if(!c)return null;for(var s=c.reduce(function(o,e){return o+e.numDataCodewords},0),i=new Uint8ClampedArray(s),B=0,k=0,m=c;k<m.length;k++){var f=m[k],w=C.decode(f.codewords,f.codewords.length-f.numDataCodewords);if(!w)return null;for(var P=0;P<f.numDataCodewords;P++)i[B++]=w[P]}try{return u.decode(i,e.versionNumber)}catch(o){return null}}function B(o){if(null==o)return null;var e=i(o);if(e)return e;for(var r=0;r<o.width;r++)for(var t=r+1;t<o.height;t++)o.get(r,t)!==o.get(t,r)&&(o.set(r,t,!o.get(r,t)),o.set(t,r,!o.get(t,r)));return i(o)}Object.defineProperty(e,"__esModule",{value:!0});var k=r(0),u=r(6),C=r(9),m=r(10),f=[{bits:21522,formatInfo:{errorCorrectionLevel:1,dataMask:0}},{bits:20773,formatInfo:{errorCorrectionLevel:1,dataMask:1}},{bits:24188,formatInfo:{errorCorrectionLevel:1,dataMask:2}},{bits:23371,formatInfo:{errorCorrectionLevel:1,dataMask:3}},{bits:17913,formatInfo:{errorCorrectionLevel:1,dataMask:4}},{bits:16590,formatInfo:{errorCorrectionLevel:1,dataMask:5}},{bits:20375,formatInfo:{errorCorrectionLevel:1,dataMask:6}},{bits:19104,formatInfo:{errorCorrectionLevel:1,dataMask:7}},{bits:30660,formatInfo:{errorCorrectionLevel:0,dataMask:0}},{bits:29427,formatInfo:{errorCorrectionLevel:0,dataMask:1}},{bits:32170,formatInfo:{errorCorrectionLevel:0,dataMask:2}},{bits:30877,formatInfo:{errorCorrectionLevel:0,dataMask:3}},{bits:26159,formatInfo:{errorCorrectionLevel:0,dataMask:4}},{bits:25368,formatInfo:{errorCorrectionLevel:0,dataMask:5}},{bits:27713,formatInfo:{errorCorrectionLevel:0,dataMask:6}},{bits:26998,formatInfo:{errorCorrectionLevel:0,dataMask:7}},{bits:5769,formatInfo:{errorCorrectionLevel:3,dataMask:0}},{bits:5054,formatInfo:{errorCorrectionLevel:3,dataMask:1}},{bits:7399,formatInfo:{errorCorrectionLevel:3,dataMask:2}},{bits:6608,formatInfo:{errorCorrectionLevel:3,dataMask:3}},{bits:1890,formatInfo:{errorCorrectionLevel:3,dataMask:4}},{bits:597,formatInfo:{errorCorrectionLevel:3,dataMask:5}},{bits:3340,formatInfo:{errorCorrectionLevel:3,dataMask:6}},{bits:2107,formatInfo:{errorCorrectionLevel:3,dataMask:7}},{bits:13663,formatInfo:{errorCorrectionLevel:2,dataMask:0}},{bits:12392,formatInfo:{errorCorrectionLevel:2,dataMask:1}},{bits:16177,formatInfo:{errorCorrectionLevel:2,dataMask:2}},{bits:14854,formatInfo:{errorCorrectionLevel:2,dataMask:3}},{bits:9396,formatInfo:{errorCorrectionLevel:2,dataMask:4}},{bits:8579,formatInfo:{errorCorrectionLevel:2,dataMask:5}},{bits:11994,formatInfo:{errorCorrectionLevel:2,dataMask:6}},{bits:11245,formatInfo:{errorCorrectionLevel:2,dataMask:7}}],w=[function(o){return(o.y+o.x)%2==0},function(o){return o.y%2==0},function(o){return o.x%3==0},function(o){return(o.y+o.x)%3==0},function(o){return(Math.floor(o.y/2)+Math.floor(o.x/3))%2==0},function(o){return o.x*o.y%2+o.x*o.y%3==0},function(o){return(o.y*o.x%2+o.y*o.x%3)%2==0},function(o){return((o.y+o.x)%2+o.y*o.x%3)%2==0}];e.decode=B},function(o,e,r){"use strict";function t(o,e){for(var r=[],t="",c=[10,12,14][e],s=o.readBits(c);s>=3;){var a=o.readBits(10);if(a>=1e3)throw new Error("Invalid numeric value above 999");var n=Math.floor(a/100),d=Math.floor(a/10)%10,l=a%10;r.push(48+n,48+d,48+l),t+=n.toString()+d.toString()+l.toString(),s-=3}if(2===s){var a=o.readBits(7);if(a>=100)throw new Error("Invalid numeric value above 99");var n=Math.floor(a/10),d=a%10;r.push(48+n,48+d),t+=n.toString()+d.toString()}else if(1===s){var a=o.readBits(4);if(a>=10)throw new Error("Invalid numeric value above 9");r.push(48+a),t+=a.toString()}return{bytes:r,text:t}}function c(o,e){for(var r=[],t="",c=[9,11,13][e],s=o.readBits(c);s>=2;){var a=o.readBits(11),n=Math.floor(a/45),d=a%45;r.push(k[n].charCodeAt(0),k[d].charCodeAt(0)),t+=k[n]+k[d],s-=2}if(1===s){var n=o.readBits(6);r.push(k[n].charCodeAt(0)),t+=k[n]}return{bytes:r,text:t}}function s(o,e){for(var r=[],t="",c=[8,16,16][e],s=o.readBits(c),a=0;a<s;a++){var n=o.readBits(8);r.push(n)}try{t+=decodeURIComponent(r.map(function(o){return"%"+("0"+o.toString(16)).substr(-2)}).join(""))}catch(o){}return{bytes:r,text:t}}function a(o,e){for(var r=[],t="",c=[8,10,12][e],s=o.readBits(c),a=0;a<s;a++){var n=o.readBits(13),d=Math.floor(n/192)<<8|n%192;d+=d<7936?33088:49472,r.push(d>>8,255&d),t+=String.fromCharCode(i.shiftJISTable[d])}return{bytes:r,text:t}}function n(o,e){for(var r=new l.BitStream(o),n=e<=9?0:e<=26?1:2,i={text:"",bytes:[],chunks:[]};r.available()>=4;){var k=r.readBits(4);if(k===B.Terminator)return i;if(k===B.ECI)0===r.readBits(1)?i.chunks.push({type:d.ECI,assignmentNumber:r.readBits(7)}):0===r.readBits(1)?i.chunks.push({type:d.ECI,assignmentNumber:r.readBits(14)}):0===r.readBits(1)?i.chunks.push({type:d.ECI,assignmentNumber:r.readBits(21)}):i.chunks.push({type:d.ECI,assignmentNumber:-1});else if(k===B.Numeric){var u=t(r,n);i.text+=u.text,(w=i.bytes).push.apply(w,u.bytes),i.chunks.push({type:d.Numeric,text:u.text})}else if(k===B.Alphanumeric){var C=c(r,n);i.text+=C.text,(P=i.bytes).push.apply(P,C.bytes),i.chunks.push({type:d.Alphanumeric,text:C.text})}else if(k===B.Byte){var m=s(r,n);i.text+=m.text,(v=i.bytes).push.apply(v,m.bytes),i.chunks.push({type:d.Byte,bytes:m.bytes,text:m.text})}else if(k===B.Kanji){var f=a(r,n);i.text+=f.text,(h=i.bytes).push.apply(h,f.bytes),i.chunks.push({type:d.Kanji,bytes:f.bytes,text:f.text})}}var w,P,v,h}Object.defineProperty(e,"__esModule",{value:!0});var d,l=r(7),i=r(8);!function(o){o.Numeric="numeric",o.Alphanumeric="alphanumeric",o.Byte="byte",o.Kanji="kanji",o.ECI="eci"}(d=e.Mode||(e.Mode={}));var B;!function(o){o[o.Terminator=0]="Terminator",o[o.Numeric=1]="Numeric",o[o.Alphanumeric=2]="Alphanumeric",o[o.Byte=4]="Byte",o[o.Kanji=8]="Kanji",o[o.ECI=7]="ECI"}(B||(B={}));var k=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];e.decode=n},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(){function o(o){this.byteOffset=0,this.bitOffset=0,this.bytes=o}return o.prototype.readBits=function(o){if(o<1||o>32||o>this.available())throw new Error("Cannot read "+o.toString()+" bits");var e=0;if(this.bitOffset>0){var r=8-this.bitOffset,t=o<r?o:r,c=r-t,s=255>>8-t<<c;e=(this.bytes[this.byteOffset]&s)>>c,o-=t,this.bitOffset+=t,8===this.bitOffset&&(this.bitOffset=0,this.byteOffset++)}if(o>0){for(;o>=8;)e=e<<8|255&this.bytes[this.byteOffset],this.byteOffset++,o-=8;if(o>0){var c=8-o,s=255>>c<<c;e=e<<o|(this.bytes[this.byteOffset]&s)>>c,this.bitOffset+=o}}return e},o.prototype.available=function(){return 8*(this.bytes.length-this.byteOffset)-this.bitOffset},o}();e.BitStream=t},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.shiftJISTable={32:32,33:33,34:34,35:35,36:36,37:37,38:38,39:39,40:40,41:41,42:42,43:43,44:44,45:45,46:46,47:47,48:48,49:49,50:50,51:51,52:52,53:53,54:54,55:55,56:56,57:57,58:58,59:59,60:60,61:61,62:62,63:63,64:64,65:65,66:66,67:67,68:68,69:69,70:70,71:71,72:72,73:73,74:74,75:75,76:76,77:77,78:78,79:79,80:80,81:81,82:82,83:83,84:84,85:85,86:86,87:87,88:88,89:89,90:90,91:91,92:165,93:93,94:94,95:95,96:96,97:97,98:98,99:99,100:100,101:101,102:102,103:103,104:104,105:105,106:106,107:107,108:108,109:109,110:110,111:111,112:112,113:113,114:114,115:115,116:116,117:117,118:118,119:119,120:120,121:121,122:122,123:123,124:124,125:125,126:8254,33088:12288,33089:12289,33090:12290,33091:65292,33092:65294,33093:12539,33094:65306,33095:65307,33096:65311,33097:65281,33098:12443,33099:12444,33100:180,33101:65344,33102:168,33103:65342,33104:65507,33105:65343,33106:12541,33107:12542,33108:12445,33109:12446,33110:12291,33111:20189,33112:12293,33113:12294,33114:12295,33115:12540,33116:8213,33117:8208,33118:65295,33119:92,33120:12316,33121:8214,33122:65372,33123:8230,33124:8229,33125:8216,33126:8217,33127:8220,33128:8221,33129:65288,33130:65289,33131:12308,33132:12309,33133:65339,33134:65341,33135:65371,33136:65373,33137:12296,33138:12297,33139:12298,33140:12299,33141:12300,33142:12301,33143:12302,33144:12303,33145:12304,33146:12305,33147:65291,33148:8722,33149:177,33150:215,33152:247,33153:65309,33154:8800,33155:65308,33156:65310,33157:8806,33158:8807,33159:8734,33160:8756,33161:9794,33162:9792,33163:176,33164:8242,33165:8243,33166:8451,33167:65509,33168:65284,33169:162,33170:163,33171:65285,33172:65283,33173:65286,33174:65290,33175:65312,33176:167,33177:9734,33178:9733,33179:9675,33180:9679,33181:9678,33182:9671,33183:9670,33184:9633,33185:9632,33186:9651,33187:9650,33188:9661,33189:9660,33190:8251,33191:12306,33192:8594,33193:8592,33194:8593,33195:8595,33196:12307,33208:8712,33209:8715,33210:8838,33211:8839,33212:8834,33213:8835,33214:8746,33215:8745,33224:8743,33225:8744,33226:172,33227:8658,33228:8660,33229:8704,33230:8707,33242:8736,33243:8869,33244:8978,33245:8706,33246:8711,33247:8801,33248:8786,33249:8810,33250:8811,33251:8730,33252:8765,33253:8733,33254:8757,33255:8747,33256:8748,33264:8491,33265:8240,33266:9839,33267:9837,33268:9834,33269:8224,33270:8225,33271:182,33276:9711,33359:65296,33360:65297,33361:65298,33362:65299,33363:65300,33364:65301,33365:65302,33366:65303,33367:65304,33368:65305,33376:65313,33377:65314,33378:65315,33379:65316,33380:65317,33381:65318,33382:65319,33383:65320,33384:65321,33385:65322,33386:65323,33387:65324,33388:65325,33389:65326,33390:65327,33391:65328,33392:65329,33393:65330,33394:65331,33395:65332,33396:65333,33397:65334,33398:65335,33399:65336,33400:65337,33401:65338,33409:65345,33410:65346,33411:65347,33412:65348,33413:65349,33414:65350,33415:65351,33416:65352,33417:65353,33418:65354,33419:65355,33420:65356,33421:65357,33422:65358,33423:65359,33424:65360,33425:65361,33426:65362,33427:65363,33428:65364,33429:65365,33430:65366,33431:65367,33432:65368,33433:65369,33434:65370,33439:12353,33440:12354,33441:12355,33442:12356,33443:12357,33444:12358,33445:12359,33446:12360,33447:12361,33448:12362,33449:12363,33450:12364,33451:12365,33452:12366,33453:12367,33454:12368,33455:12369,33456:12370,33457:12371,33458:12372,33459:12373,33460:12374,33461:12375,33462:12376,33463:12377,33464:12378,33465:12379,33466:12380,33467:12381,33468:12382,33469:12383,33470:12384,33471:12385,33472:12386,33473:12387,33474:12388,33475:12389,33476:12390,33477:12391,33478:12392,33479:12393,33480:12394,33481:12395,33482:12396,33483:12397,33484:12398,33485:12399,33486:12400,33487:12401,33488:12402,33489:12403,33490:12404,33491:12405,33492:12406,33493:12407,33494:12408,33495:12409,33496:12410,33497:12411,33498:12412,33499:12413,33500:12414,33501:12415,33502:12416,33503:12417,33504:12418,33505:12419,33506:12420,33507:12421,33508:12422,33509:12423,33510:12424,33511:12425,33512:12426,33513:12427,33514:12428,33515:12429,33516:12430,33517:12431,33518:12432,33519:12433,33520:12434,33521:12435,33600:12449,33601:12450,33602:12451,33603:12452,33604:12453,33605:12454,33606:12455,33607:12456,33608:12457,33609:12458,33610:12459,33611:12460,33612:12461,33613:12462,33614:12463,33615:12464,33616:12465,33617:12466,33618:12467,33619:12468,33620:12469,33621:12470,33622:12471,33623:12472,33624:12473,33625:12474,33626:12475,33627:12476,33628:12477,33629:12478,33630:12479,33631:12480,33632:12481,33633:12482,33634:12483,33635:12484,33636:12485,33637:12486,33638:12487,33639:12488,33640:12489,33641:12490,33642:12491,33643:12492,33644:12493,33645:12494,33646:12495,33647:12496,33648:12497,33649:12498,33650:12499,33651:12500,33652:12501,33653:12502,33654:12503,33655:12504,33656:12505,33657:12506,33658:12507,33659:12508,33660:12509,33661:12510,33662:12511,33664:12512,33665:12513,33666:12514,33667:12515,33668:12516,33669:12517,33670:12518,33671:12519,33672:12520,33673:12521,33674:12522,33675:12523,33676:12524,33677:12525,33678:12526,33679:12527,33680:12528,33681:12529,33682:12530,33683:12531,33684:12532,33685:12533,33686:12534,33695:913,33696:914,33697:915,33698:916,33699:917,33700:918,33701:919,33702:920,33703:921,33704:922,33705:923,33706:924,33707:925,33708:926,33709:927,33710:928,33711:929,33712:931,33713:932,33714:933,33715:934,33716:935,33717:936,33718:937,33727:945,33728:946,33729:947,33730:948,33731:949,33732:950,33733:951,33734:952,33735:953,33736:954,33737:955,33738:956,33739:957,33740:958,33741:959,33742:960,33743:961,33744:963,33745:964,33746:965,33747:966,33748:967,33749:968,33750:969,33856:1040,33857:1041,33858:1042,33859:1043,33860:1044,33861:1045,33862:1025,33863:1046,33864:1047,33865:1048,33866:1049,33867:1050,33868:1051,33869:1052,33870:1053,33871:1054,33872:1055,33873:1056,33874:1057,33875:1058,33876:1059,33877:1060,33878:1061,33879:1062,33880:1063,33881:1064,33882:1065,33883:1066,33884:1067,33885:1068,33886:1069,33887:1070,33888:1071,33904:1072,33905:1073,33906:1074,33907:1075,33908:1076,33909:1077,33910:1105,33911:1078,33912:1079,33913:1080,33914:1081,33915:1082,33916:1083,33917:1084,33918:1085,33920:1086,33921:1087,33922:1088,33923:1089,33924:1090,33925:1091,33926:1092,33927:1093,33928:1094,33929:1095,33930:1096,33931:1097,33932:1098,33933:1099,33934:1100,33935:1101,33936:1102,33937:1103,33951:9472,33952:9474,33953:9484,33954:9488,33955:9496,33956:9492,33957:9500,33958:9516,33959:9508,33960:9524,33961:9532,33962:9473,33963:9475,33964:9487,33965:9491,33966:9499,33967:9495,33968:9507,33969:9523,33970:9515,33971:9531,33972:9547,33973:9504,33974:9519,33975:9512,33976:9527,33977:9535,33978:9501,33979:9520,33980:9509,33981:9528,33982:9538,34975:20124,34976:21782,34977:23043,34978:38463,34979:21696,34980:24859,34981:25384,34982:23030,34983:36898,34984:33909,34985:33564,34986:31312,34987:24746,34988:25569,34989:28197,34990:26093,34991:33894,34992:33446,34993:39925,34994:26771,34995:22311,34996:26017,34997:25201,34998:23451,34999:22992,35e3:34427,35001:39156,35002:32098,35003:32190,35004:39822,35005:25110,35006:31903,35007:34999,35008:23433,35009:24245,35010:25353,35011:26263,35012:26696,35013:38343,35014:38797,35015:26447,35016:20197,35017:20234,35018:20301,35019:20381,35020:20553,35021:22258,35022:22839,35023:22996,35024:23041,35025:23561,35026:24799,35027:24847,35028:24944,35029:26131,35030:26885,35031:28858,35032:30031,35033:30064,35034:31227,35035:32173,35036:32239,35037:32963,35038:33806,35039:34915,35040:35586,35041:36949,35042:36986,35043:21307,35044:20117,35045:20133,35046:22495,35047:32946,35048:37057,35049:30959,35050:19968,35051:22769,35052:28322,35053:36920,35054:31282,35055:33576,35056:33419,35057:39983,35058:20801,35059:21360,35060:21693,35061:21729,35062:22240,35063:23035,35064:24341,35065:39154,35066:28139,35067:32996,35068:34093,35136:38498,35137:38512,35138:38560,35139:38907,35140:21515,35141:21491,35142:23431,35143:28879,35144:32701,35145:36802,35146:38632,35147:21359,35148:40284,35149:31418,35150:19985,35151:30867,35152:33276,35153:28198,35154:22040,35155:21764,35156:27421,35157:34074,35158:39995,35159:23013,35160:21417,35161:28006,35162:29916,35163:38287,35164:22082,35165:20113,35166:36939,35167:38642,35168:33615,35169:39180,35170:21473,35171:21942,35172:23344,35173:24433,35174:26144,35175:26355,35176:26628,35177:27704,35178:27891,35179:27945,35180:29787,35181:30408,35182:31310,35183:38964,35184:33521,35185:34907,35186:35424,35187:37613,35188:28082,35189:30123,35190:30410,35191:39365,35192:24742,35193:35585,35194:36234,35195:38322,35196:27022,35197:21421,35198:20870,35200:22290,35201:22576,35202:22852,35203:23476,35204:24310,35205:24616,35206:25513,35207:25588,35208:27839,35209:28436,35210:28814,35211:28948,35212:29017,35213:29141,35214:29503,35215:32257,35216:33398,35217:33489,35218:34199,35219:36960,35220:37467,35221:40219,35222:22633,35223:26044,35224:27738,35225:29989,35226:20985,35227:22830,35228:22885,35229:24448,35230:24540,35231:25276,35232:26106,35233:27178,35234:27431,35235:27572,35236:29579,35237:32705,35238:35158,35239:40236,35240:40206,35241:40644,35242:23713,35243:27798,35244:33659,35245:20740,35246:23627,35247:25014,35248:33222,35249:26742,35250:29281,35251:20057,35252:20474,35253:21368,35254:24681,35255:28201,35256:31311,35257:38899,35258:19979,35259:21270,35260:20206,35261:20309,35262:20285,35263:20385,35264:20339,35265:21152,35266:21487,35267:22025,35268:22799,35269:23233,35270:23478,35271:23521,35272:31185,35273:26247,35274:26524,35275:26550,35276:27468,35277:27827,35278:28779,35279:29634,35280:31117,35281:31166,35282:31292,35283:31623,35284:33457,35285:33499,35286:33540,35287:33655,35288:33775,35289:33747,35290:34662,35291:35506,35292:22057,35293:36008,35294:36838,35295:36942,35296:38686,35297:34442,35298:20420,35299:23784,35300:25105,35301:29273,35302:30011,35303:33253,35304:33469,35305:34558,35306:36032,35307:38597,35308:39187,35309:39381,35310:20171,35311:20250,35312:35299,35313:22238,35314:22602,35315:22730,35316:24315,35317:24555,35318:24618,35319:24724,35320:24674,35321:25040,35322:25106,35323:25296,35324:25913,35392:39745,35393:26214,35394:26800,35395:28023,35396:28784,35397:30028,35398:30342,35399:32117,35400:33445,35401:34809,35402:38283,35403:38542,35404:35997,35405:20977,35406:21182,35407:22806,35408:21683,35409:23475,35410:23830,35411:24936,35412:27010,35413:28079,35414:30861,35415:33995,35416:34903,35417:35442,35418:37799,35419:39608,35420:28012,35421:39336,35422:34521,35423:22435,35424:26623,35425:34510,35426:37390,35427:21123,35428:22151,35429:21508,35430:24275,35431:25313,35432:25785,35433:26684,35434:26680,35435:27579,35436:29554,35437:30906,35438:31339,35439:35226,35440:35282,35441:36203,35442:36611,35443:37101,35444:38307,35445:38548,35446:38761,35447:23398,35448:23731,35449:27005,35450:38989,35451:38990,35452:25499,35453:31520,35454:27179,35456:27263,35457:26806,35458:39949,35459:28511,35460:21106,35461:21917,35462:24688,35463:25324,35464:27963,35465:28167,35466:28369,35467:33883,35468:35088,35469:36676,35470:19988,35471:39993,35472:21494,35473:26907,35474:27194,35475:38788,35476:26666,35477:20828,35478:31427,35479:33970,35480:37340,35481:37772,35482:22107,35483:40232,35484:26658,35485:33541,35486:33841,35487:31909,35488:21e3,35489:33477,35490:29926,35491:20094,35492:20355,35493:20896,35494:23506,35495:21002,35496:21208,35497:21223,35498:24059,35499:21914,35500:22570,35501:23014,35502:23436,35503:23448,35504:23515,35505:24178,35506:24185,35507:24739,35508:24863,35509:24931,35510:25022,35511:25563,35512:25954,35513:26577,35514:26707,35515:26874,35516:27454,35517:27475,35518:27735,35519:28450,35520:28567,35521:28485,35522:29872,35523:29976,35524:30435,35525:30475,35526:31487,35527:31649,35528:31777,35529:32233,35530:32566,35531:32752,35532:32925,35533:33382,35534:33694,35535:35251,35536:35532,35537:36011,35538:36996,35539:37969,35540:38291,35541:38289,35542:38306,35543:38501,35544:38867,35545:39208,35546:33304,35547:20024,35548:21547,35549:23736,35550:24012,35551:29609,35552:30284,35553:30524,35554:23721,35555:32747,35556:36107,35557:38593,35558:38929,35559:38996,35560:39e3,35561:20225,35562:20238,35563:21361,35564:21916,35565:22120,35566:22522,35567:22855,35568:23305,35569:23492,35570:23696,35571:24076,35572:24190,35573:24524,35574:25582,35575:26426,35576:26071,35577:26082,35578:26399,35579:26827,35580:26820,35648:27231,35649:24112,35650:27589,35651:27671,35652:27773,35653:30079,35654:31048,35655:23395,35656:31232,35657:32e3,35658:24509,35659:35215,35660:35352,35661:36020,35662:36215,35663:36556,35664:36637,35665:39138,35666:39438,35667:39740,35668:20096,35669:20605,35670:20736,35671:22931,35672:23452,35673:25135,35674:25216,35675:25836,35676:27450,35677:29344,35678:30097,35679:31047,35680:32681,35681:34811,35682:35516,35683:35696,35684:25516,35685:33738,35686:38816,35687:21513,35688:21507,35689:21931,35690:26708,35691:27224,35692:35440,35693:30759,35694:26485,35695:40653,35696:21364,35697:23458,35698:33050,35699:34384,35700:36870,35701:19992,35702:20037,35703:20167,35704:20241,35705:21450,35706:21560,35707:23470,35708:24339,35709:24613,35710:25937,35712:26429,35713:27714,35714:27762,35715:27875,35716:28792,35717:29699,35718:31350,35719:31406,35720:31496,35721:32026,35722:31998,35723:32102,35724:26087,35725:29275,35726:21435,35727:23621,35728:24040,35729:25298,35730:25312,35731:25369,35732:28192,35733:34394,35734:35377,35735:36317,35736:37624,35737:28417,35738:31142,35739:39770,35740:20136,35741:20139,35742:20140,35743:20379,35744:20384,35745:20689,35746:20807,35747:31478,35748:20849,35749:20982,35750:21332,35751:21281,35752:21375,35753:21483,35754:21932,35755:22659,35756:23777,35757:24375,35758:24394,35759:24623,35760:24656,35761:24685,35762:25375,35763:25945,35764:27211,35765:27841,35766:29378,35767:29421,35768:30703,35769:33016,35770:33029,35771:33288,35772:34126,35773:37111,35774:37857,35775:38911,35776:39255,35777:39514,35778:20208,35779:20957,35780:23597,35781:26241,35782:26989,35783:23616,35784:26354,35785:26997,35786:29577,35787:26704,35788:31873,35789:20677,35790:21220,35791:22343,35792:24062,35793:37670,35794:26020,35795:27427,35796:27453,35797:29748,35798:31105,35799:31165,35800:31563,35801:32202,35802:33465,35803:33740,35804:34943,35805:35167,35806:35641,35807:36817,35808:37329,35809:21535,35810:37504,35811:20061,35812:20534,35813:21477,35814:21306,35815:29399,35816:29590,35817:30697,35818:33510,35819:36527,35820:39366,35821:39368,35822:39378,35823:20855,35824:24858,35825:34398,35826:21936,35827:31354,35828:20598,35829:23507,35830:36935,35831:38533,35832:20018,35833:27355,35834:37351,35835:23633,35836:23624,35904:25496,35905:31391,35906:27795,35907:38772,35908:36705,35909:31402,35910:29066,35911:38536,35912:31874,35913:26647,35914:32368,35915:26705,35916:37740,35917:21234,35918:21531,35919:34219,35920:35347,35921:32676,35922:36557,35923:37089,35924:21350,35925:34952,35926:31041,35927:20418,35928:20670,35929:21009,35930:20804,35931:21843,35932:22317,35933:29674,35934:22411,35935:22865,35936:24418,35937:24452,35938:24693,35939:24950,35940:24935,35941:25001,35942:25522,35943:25658,35944:25964,35945:26223,35946:26690,35947:28179,35948:30054,35949:31293,35950:31995,35951:32076,35952:32153,35953:32331,35954:32619,35955:33550,35956:33610,35957:34509,35958:35336,35959:35427,35960:35686,35961:36605,35962:38938,35963:40335,35964:33464,35965:36814,35966:39912,35968:21127,35969:25119,35970:25731,35971:28608,35972:38553,35973:26689,35974:20625,35975:27424,35976:27770,35977:28500,35978:31348,35979:32080,35980:34880,35981:35363,35982:26376,35983:20214,35984:20537,35985:20518,35986:20581,35987:20860,35988:21048,35989:21091,35990:21927,35991:22287,35992:22533,35993:23244,35994:24314,35995:25010,35996:25080,35997:25331,35998:25458,35999:26908,36e3:27177,36001:29309,36002:29356,36003:29486,36004:30740,36005:30831,36006:32121,36007:30476,36008:32937,36009:35211,36010:35609,36011:36066,36012:36562,36013:36963,36014:37749,36015:38522,36016:38997,36017:39443,36018:40568,36019:20803,36020:21407,36021:21427,36022:24187,36023:24358,36024:28187,36025:28304,36026:29572,36027:29694,36028:32067,36029:33335,36030:35328,36031:35578,36032:38480,36033:20046,36034:20491,36035:21476,36036:21628,36037:22266,36038:22993,36039:23396,36040:24049,36041:24235,36042:24359,36043:25144,36044:25925,36045:26543,36046:28246,36047:29392,36048:31946,36049:34996,36050:32929,36051:32993,36052:33776,36053:34382,36054:35463,36055:36328,36056:37431,36057:38599,36058:39015,36059:40723,36060:20116,36061:20114,36062:20237,36063:21320,36064:21577,36065:21566,36066:23087,36067:24460,36068:24481,36069:24735,36070:26791,36071:27278,36072:29786,36073:30849,36074:35486,36075:35492,36076:35703,36077:37264,36078:20062,36079:39881,36080:20132,36081:20348,36082:20399,36083:20505,36084:20502,36085:20809,36086:20844,36087:21151,36088:21177,36089:21246,36090:21402,36091:21475,36092:21521,36160:21518,36161:21897,36162:22353,36163:22434,36164:22909,36165:23380,36166:23389,36167:23439,36168:24037,36169:24039,36170:24055,36171:24184,36172:24195,36173:24218,36174:24247,36175:24344,36176:24658,36177:24908,36178:25239,36179:25304,36180:25511,36181:25915,36182:26114,36183:26179,36184:26356,36185:26477,36186:26657,36187:26775,36188:27083,36189:27743,36190:27946,36191:28009,36192:28207,36193:28317,36194:30002,36195:30343,36196:30828,36197:31295,36198:31968,36199:32005,36200:32024,36201:32094,36202:32177,36203:32789,36204:32771,36205:32943,36206:32945,36207:33108,36208:33167,36209:33322,36210:33618,36211:34892,36212:34913,36213:35611,36214:36002,36215:36092,36216:37066,36217:37237,36218:37489,36219:30783,36220:37628,36221:38308,36222:38477,36224:38917,36225:39321,36226:39640,36227:40251,36228:21083,36229:21163,36230:21495,36231:21512,36232:22741,36233:25335,36234:28640,36235:35946,36236:36703,36237:40633,36238:20811,36239:21051,36240:21578,36241:22269,36242:31296,36243:37239,36244:40288,36245:40658,36246:29508,36247:28425,36248:33136,36249:29969,36250:24573,36251:24794,36252:39592,36253:29403,36254:36796,36255:27492,36256:38915,36257:20170,36258:22256,36259:22372,36260:22718,36261:23130,36262:24680,36263:25031,36264:26127,36265:26118,36266:26681,36267:26801,36268:28151,36269:30165,36270:32058,36271:33390,36272:39746,36273:20123,36274:20304,36275:21449,36276:21766,36277:23919,36278:24038,36279:24046,36280:26619,36281:27801,36282:29811,36283:30722,36284:35408,36285:37782,36286:35039,36287:22352,36288:24231,36289:25387,36290:20661,36291:20652,36292:20877,36293:26368,36294:21705,36295:22622,36296:22971,36297:23472,36298:24425,36299:25165,36300:25505,36301:26685,36302:27507,36303:28168,36304:28797,36305:37319,36306:29312,36307:30741,36308:30758,36309:31085,36310:25998,36311:32048,36312:33756,36313:35009,36314:36617,36315:38555,36316:21092,36317:22312,36318:26448,36319:32618,36320:36001,36321:20916,36322:22338,36323:38442,36324:22586,36325:27018,36326:32948,36327:21682,36328:23822,36329:22524,36330:30869,36331:40442,36332:20316,36333:21066,36334:21643,36335:25662,36336:26152,36337:26388,36338:26613,36339:31364,36340:31574,36341:32034,36342:37679,36343:26716,36344:39853,36345:31545,36346:21273,36347:20874,36348:21047,36416:23519,36417:25334,36418:25774,36419:25830,36420:26413,36421:27578,36422:34217,36423:38609,36424:30352,36425:39894,36426:25420,36427:37638,36428:39851,36429:30399,36430:26194,36431:19977,36432:20632,36433:21442,36434:23665,36435:24808,36436:25746,36437:25955,36438:26719,36439:29158,36440:29642,36441:29987,36442:31639,36443:32386,36444:34453,36445:35715,36446:36059,36447:37240,36448:39184,36449:26028,36450:26283,36451:27531,36452:20181,36453:20180,36454:20282,36455:20351,36456:21050,36457:21496,36458:21490,36459:21987,36460:22235,36461:22763,36462:22987,36463:22985,36464:23039,36465:23376,36466:23629,36467:24066,36468:24107,36469:24535,36470:24605,36471:25351,36472:25903,36473:23388,36474:26031,36475:26045,36476:26088,36477:26525,36478:27490,36480:27515,36481:27663,36482:29509,36483:31049,36484:31169,36485:31992,36486:32025,36487:32043,36488:32930,36489:33026,36490:33267,36491:35222,36492:35422,36493:35433,36494:35430,36495:35468,36496:35566,36497:36039,36498:36060,36499:38604,36500:39164,36501:27503,36502:20107,36503:20284,36504:20365,36505:20816,36506:23383,36507:23546,36508:24904,36509:25345,36510:26178,36511:27425,36512:28363,36513:27835,36514:29246,36515:29885,36516:30164,36517:30913,36518:31034,36519:32780,36520:32819,36521:33258,36522:33940,36523:36766,36524:27728,36525:40575,36526:24335,36527:35672,36528:40235,36529:31482,36530:36600,36531:23437,36532:38635,36533:19971,36534:21489,36535:22519,36536:22833,36537:23241,36538:23460,36539:24713,36540:28287,36541:28422,36542:30142,36543:36074,36544:23455,36545:34048,36546:31712,36547:20594,36548:26612,36549:33437,36550:23649,36551:34122,36552:32286,36553:33294,36554:20889,36555:23556,36556:25448,36557:36198,36558:26012,36559:29038,36560:31038,36561:32023,36562:32773,36563:35613,36564:36554,36565:36974,36566:34503,36567:37034,36568:20511,36569:21242,36570:23610,36571:26451,36572:28796,36573:29237,36574:37196,36575:37320,36576:37675,36577:33509,36578:23490,36579:24369,36580:24825,36581:20027,36582:21462,36583:23432,36584:25163,36585:26417,36586:27530,36587:29417,36588:29664,36589:31278,36590:33131,36591:36259,36592:37202,36593:39318,36594:20754,36595:21463,36596:21610,36597:23551,36598:25480,36599:27193,36600:32172,36601:38656,36602:22234,36603:21454,36604:21608,36672:23447,36673:23601,36674:24030,36675:20462,36676:24833,36677:25342,36678:27954,36679:31168,36680:31179,36681:32066,36682:32333,36683:32722,36684:33261,36685:33311,36686:33936,36687:34886,36688:35186,36689:35728,36690:36468,36691:36655,36692:36913,36693:37195,36694:37228,36695:38598,36696:37276,36697:20160,36698:20303,36699:20805,36700:21313,36701:24467,36702:25102,36703:26580,36704:27713,36705:28171,36706:29539,36707:32294,36708:37325,36709:37507,36710:21460,36711:22809,36712:23487,36713:28113,36714:31069,36715:32302,36716:31899,36717:22654,36718:29087,36719:20986,36720:34899,36721:36848,36722:20426,36723:23803,36724:26149,36725:30636,36726:31459,36727:33308,36728:39423,36729:20934,36730:24490,36731:26092,36732:26991,36733:27529,36734:28147,36736:28310,36737:28516,36738:30462,36739:32020,36740:24033,36741:36981,36742:37255,36743:38918,36744:20966,36745:21021,36746:25152,36747:26257,36748:26329,36749:28186,36750:24246,36751:32210,36752:32626,36753:26360,36754:34223,36755:34295,36756:35576,36757:21161,36758:21465,36759:22899,36760:24207,36761:24464,36762:24661,36763:37604,36764:38500,36765:20663,36766:20767,36767:21213,36768:21280,36769:21319,36770:21484,36771:21736,36772:21830,36773:21809,36774:22039,36775:22888,36776:22974,36777:23100,36778:23477,36779:23558,36780:23567,36781:23569,36782:23578,36783:24196,36784:24202,36785:24288,36786:24432,36787:25215,36788:25220,36789:25307,36790:25484,36791:25463,36792:26119,36793:26124,36794:26157,36795:26230,36796:26494,36797:26786,36798:27167,36799:27189,36800:27836,36801:28040,36802:28169,36803:28248,36804:28988,36805:28966,36806:29031,36807:30151,36808:30465,36809:30813,36810:30977,36811:31077,36812:31216,36813:31456,36814:31505,36815:31911,36816:32057,36817:32918,36818:33750,36819:33931,36820:34121,36821:34909,36822:35059,36823:35359,36824:35388,36825:35412,36826:35443,36827:35937,36828:36062,36829:37284,36830:37478,36831:37758,36832:37912,36833:38556,36834:38808,36835:19978,36836:19976,36837:19998,36838:20055,36839:20887,36840:21104,36841:22478,36842:22580,36843:22732,36844:23330,36845:24120,36846:24773,36847:25854,36848:26465,36849:26454,36850:27972,36851:29366,36852:30067,36853:31331,36854:33976,36855:35698,36856:37304,36857:37664,36858:22065,36859:22516,36860:39166,36928:25325,36929:26893,36930:27542,36931:29165,36932:32340,36933:32887,36934:33394,36935:35302,36936:39135,36937:34645,36938:36785,36939:23611,36940:20280,36941:20449,36942:20405,36943:21767,36944:23072,36945:23517,36946:23529,36947:24515,36948:24910,36949:25391,36950:26032,36951:26187,36952:26862,36953:27035,36954:28024,36955:28145,36956:30003,36957:30137,36958:30495,36959:31070,36960:31206,36961:32051,36962:33251,36963:33455,36964:34218,36965:35242,36966:35386,36967:36523,36968:36763,36969:36914,36970:37341,36971:38663,36972:20154,36973:20161,36974:20995,36975:22645,36976:22764,36977:23563,36978:29978,36979:23613,36980:33102,36981:35338,36982:36805,36983:38499,36984:38765,36985:31525,36986:35535,36987:38920,36988:37218,36989:22259,36990:21416,36992:36887,36993:21561,36994:22402,36995:24101,36996:25512,36997:27700,36998:28810,36999:30561,37e3:31883,37001:32736,37002:34928,37003:36930,37004:37204,37005:37648,37006:37656,37007:38543,37008:29790,37009:39620,37010:23815,37011:23913,37012:25968,37013:26530,37014:36264,37015:38619,37016:25454,37017:26441,37018:26905,37019:33733,37020:38935,37021:38592,37022:35070,37023:28548,37024:25722,37025:23544,37026:19990,37027:28716,37028:30045,37029:26159,37030:20932,37031:21046,37032:21218,37033:22995,37034:24449,37035:24615,37036:25104,37037:25919,37038:25972,37039:26143,37040:26228,37041:26866,37042:26646,37043:27491,37044:28165,37045:29298,37046:29983,37047:30427,37048:31934,37049:32854,37050:22768,37051:35069,37052:35199,37053:35488,37054:35475,37055:35531,37056:36893,37057:37266,37058:38738,37059:38745,37060:25993,37061:31246,37062:33030,37063:38587,37064:24109,37065:24796,37066:25114,37067:26021,37068:26132,37069:26512,37070:30707,37071:31309,37072:31821,37073:32318,37074:33034,37075:36012,37076:36196,37077:36321,37078:36447,37079:30889,37080:20999,37081:25305,37082:25509,37083:25666,37084:25240,37085:35373,37086:31363,37087:31680,37088:35500,37089:38634,37090:32118,37091:33292,37092:34633,37093:20185,37094:20808,37095:21315,37096:21344,37097:23459,37098:23554,37099:23574,37100:24029,37101:25126,37102:25159,37103:25776,37104:26643,37105:26676,37106:27849,37107:27973,37108:27927,37109:26579,37110:28508,37111:29006,37112:29053,37113:26059,37114:31359,37115:31661,37116:32218,37184:32330,37185:32680,37186:33146,37187:33307,37188:33337,37189:34214,37190:35438,37191:36046,37192:36341,37193:36984,37194:36983,37195:37549,37196:37521,37197:38275,37198:39854,37199:21069,37200:21892,37201:28472,37202:28982,37203:20840,37204:31109,37205:32341,37206:33203,37207:31950,37208:22092,37209:22609,37210:23720,37211:25514,37212:26366,37213:26365,37214:26970,37215:29401,37216:30095,37217:30094,37218:30990,37219:31062,37220:31199,37221:31895,37222:32032,37223:32068,37224:34311,37225:35380,37226:38459,37227:36961,37228:40736,37229:20711,37230:21109,37231:21452,37232:21474,37233:20489,37234:21930,37235:22766,37236:22863,37237:29245,37238:23435,37239:23652,37240:21277,37241:24803,37242:24819,37243:25436,37244:25475,37245:25407,37246:25531,37248:25805,37249:26089,37250:26361,37251:24035,37252:27085,37253:27133,37254:28437,37255:29157,37256:20105,37257:30185,37258:30456,37259:31379,37260:31967,37261:32207,37262:32156,37263:32865,37264:33609,37265:33624,37266:33900,37267:33980,37268:34299,37269:35013,37270:36208,37271:36865,37272:36973,37273:37783,37274:38684,37275:39442,37276:20687,37277:22679,37278:24974,37279:33235,37280:34101,37281:36104,37282:36896,37283:20419,37284:20596,37285:21063,37286:21363,37287:24687,37288:25417,37289:26463,37290:28204,37291:36275,37292:36895,37293:20439,37294:23646,37295:36042,37296:26063,37297:32154,37298:21330,37299:34966,37300:20854,37301:25539,37302:23384,37303:23403,37304:23562,37305:25613,37306:26449,37307:36956,37308:20182,37309:22810,37310:22826,37311:27760,37312:35409,37313:21822,37314:22549,37315:22949,37316:24816,37317:25171,37318:26561,37319:33333,37320:26965,37321:38464,37322:39364,37323:39464,37324:20307,37325:22534,37326:23550,37327:32784,37328:23729,37329:24111,37330:24453,37331:24608,37332:24907,37333:25140,37334:26367,37335:27888,37336:28382,37337:32974,37338:33151,37339:33492,37340:34955,37341:36024,37342:36864,37343:36910,37344:38538,37345:40667,37346:39899,37347:20195,37348:21488,37349:22823,37350:31532,37351:37261,37352:38988,37353:40441,37354:28381,37355:28711,37356:21331,37357:21828,37358:23429,37359:25176,37360:25246,37361:25299,37362:27810,37363:28655,37364:29730,37365:35351,37366:37944,37367:28609,37368:35582,37369:33592,37370:20967,37371:34552,37372:21482,37440:21481,37441:20294,37442:36948,37443:36784,37444:22890,37445:33073,37446:24061,37447:31466,37448:36799,37449:26842,37450:35895,37451:29432,37452:40008,37453:27197,37454:35504,37455:20025,37456:21336,37457:22022,37458:22374,37459:25285,37460:25506,37461:26086,37462:27470,37463:28129,37464:28251,37465:28845,37466:30701,37467:31471,37468:31658,37469:32187,37470:32829,37471:32966,37472:34507,37473:35477,37474:37723,37475:22243,37476:22727,37477:24382,37478:26029,37479:26262,37480:27264,37481:27573,37482:30007,37483:35527,37484:20516,37485:30693,37486:22320,37487:24347,37488:24677,37489:26234,37490:27744,37491:30196,37492:31258,37493:32622,37494:33268,37495:34584,37496:36933,37497:39347,37498:31689,37499:30044,37500:31481,37501:31569,37502:33988,37504:36880,37505:31209,37506:31378,37507:33590,37508:23265,37509:30528,37510:20013,37511:20210,37512:23449,37513:24544,37514:25277,37515:26172,37516:26609,37517:27880,37518:34411,37519:34935,37520:35387,37521:37198,37522:37619,37523:39376,37524:27159,37525:28710,37526:29482,37527:33511,37528:33879,37529:36015,37530:19969,37531:20806,37532:20939,37533:21899,37534:23541,37535:24086,37536:24115,37537:24193,37538:24340,37539:24373,37540:24427,37541:24500,37542:25074,37543:25361,37544:26274,37545:26397,37546:28526,37547:29266,37548:30010,37549:30522,37550:32884,37551:33081,37552:33144,37553:34678,37554:35519,37555:35548,37556:36229,37557:36339,37558:37530,37559:38263,37560:38914,37561:40165,37562:21189,37563:25431,37564:30452,37565:26389,37566:27784,37567:29645,37568:36035,37569:37806,37570:38515,37571:27941,37572:22684,37573:26894,37574:27084,37575:36861,37576:37786,37577:30171,37578:36890,37579:22618,37580:26626,37581:25524,37582:27131,37583:20291,37584:28460,37585:26584,37586:36795,37587:34086,37588:32180,37589:37716,37590:26943,37591:28528,37592:22378,37593:22775,37594:23340,37595:32044,37596:29226,37597:21514,37598:37347,37599:40372,37600:20141,37601:20302,37602:20572,37603:20597,37604:21059,37605:35998,37606:21576,37607:22564,37608:23450,37609:24093,37610:24213,37611:24237,37612:24311,37613:24351,37614:24716,37615:25269,37616:25402,37617:25552,37618:26799,37619:27712,37620:30855,37621:31118,37622:31243,37623:32224,37624:33351,37625:35330,37626:35558,37627:36420,37628:36883,37696:37048,37697:37165,37698:37336,37699:40718,37700:27877,37701:25688,37702:25826,37703:25973,37704:28404,37705:30340,37706:31515,37707:36969,37708:37841,37709:28346,37710:21746,37711:24505,37712:25764,37713:36685,37714:36845,37715:37444,37716:20856,37717:22635,37718:22825,37719:23637,37720:24215,37721:28155,37722:32399,37723:29980,37724:36028,37725:36578,37726:39003,37727:28857,37728:20253,37729:27583,37730:28593,37731:3e4,37732:38651,37733:20814,37734:21520,37735:22581,37736:22615,37737:22956,37738:23648,37739:24466,37740:26007,37741:26460,37742:28193,37743:30331,37744:33759,37745:36077,37746:36884,37747:37117,37748:37709,37749:30757,37750:30778,37751:21162,37752:24230,37753:22303,37754:22900,37755:24594,37756:20498,37757:20826,37758:20908,37760:20941,37761:20992,37762:21776,37763:22612,37764:22616,37765:22871,37766:23445,37767:23798,37768:23947,37769:24764,37770:25237,37771:25645,37772:26481,37773:26691,37774:26812,37775:26847,37776:30423,37777:28120,37778:28271,37779:28059,37780:28783,37781:29128,37782:24403,37783:30168,37784:31095,37785:31561,37786:31572,37787:31570,37788:31958,37789:32113,37790:21040,37791:33891,37792:34153,37793:34276,37794:35342,37795:35588,37796:35910,37797:36367,37798:36867,37799:36879,37800:37913,37801:38518,37802:38957,37803:39472,37804:38360,37805:20685,37806:21205,37807:21516,37808:22530,37809:23566,37810:24999,37811:25758,37812:27934,37813:30643,37814:31461,37815:33012,37816:33796,37817:36947,37818:37509,37819:23776,37820:40199,37821:21311,37822:24471,37823:24499,37824:28060,37825:29305,37826:30563,37827:31167,37828:31716,37829:27602,37830:29420,37831:35501,37832:26627,37833:27233,37834:20984,37835:31361,37836:26932,37837:23626,37838:40182,37839:33515,37840:23493,37841:37193,37842:28702,37843:22136,37844:23663,37845:24775,37846:25958,37847:27788,37848:35930,37849:36929,37850:38931,37851:21585,37852:26311,37853:37389,37854:22856,37855:37027,37856:20869,37857:20045,37858:20970,37859:34201,37860:35598,37861:28760,37862:25466,37863:37707,37864:26978,37865:39348,37866:32260,37867:30071,37868:21335,37869:26976,37870:36575,37871:38627,37872:27741,37873:20108,37874:23612,37875:24336,37876:36841,37877:21250,37878:36049,37879:32905,37880:34425,37881:24319,37882:26085,37883:20083,37884:20837,37952:22914,37953:23615,37954:38894,37955:20219,37956:22922,37957:24525,37958:35469,37959:28641,37960:31152,37961:31074,37962:23527,37963:33905,37964:29483,37965:29105,37966:24180,37967:24565,37968:25467,37969:25754,37970:29123,37971:31896,37972:20035,37973:24316,37974:20043,37975:22492,37976:22178,37977:24745,37978:28611,37979:32013,37980:33021,37981:33075,37982:33215,37983:36786,37984:35223,37985:34468,37986:24052,37987:25226,37988:25773,37989:35207,37990:26487,37991:27874,37992:27966,37993:29750,37994:30772,37995:23110,37996:32629,37997:33453,37998:39340,37999:20467,38e3:24259,38001:25309,38002:25490,38003:25943,38004:26479,38005:30403,38006:29260,38007:32972,38008:32954,38009:36649,38010:37197,38011:20493,38012:22521,38013:23186,38014:26757,38016:26995,38017:29028,38018:29437,38019:36023,38020:22770,38021:36064,38022:38506,38023:36889,38024:34687,38025:31204,38026:30695,38027:33833,38028:20271,38029:21093,38030:21338,38031:25293,38032:26575,38033:27850,38034:30333,38035:31636,38036:31893,38037:33334,38038:34180,38039:36843,38040:26333,38041:28448,38042:29190,38043:32283,38044:33707,38045:39361,38046:40614,38047:20989,38048:31665,38049:30834,38050:31672,38051:32903,38052:31560,38053:27368,38054:24161,38055:32908,38056:30033,38057:30048,38058:20843,38059:37474,38060:28300,38061:30330,38062:37271,38063:39658,38064:20240,38065:32624,38066:25244,38067:31567,38068:38309,38069:40169,38070:22138,38071:22617,38072:34532,38073:38588,38074:20276,38075:21028,38076:21322,38077:21453,38078:21467,38079:24070,38080:25644,38081:26001,38082:26495,38083:27710,38084:27726,38085:29256,38086:29359,38087:29677,38088:30036,38089:32321,38090:33324,38091:34281,38092:36009,38093:31684,38094:37318,38095:29033,38096:38930,38097:39151,38098:25405,38099:26217,38100:30058,38101:30436,38102:30928,38103:34115,38104:34542,38105:21290,38106:21329,38107:21542,38108:22915,38109:24199,38110:24444,38111:24754,38112:25161,38113:25209,38114:25259,38115:26e3,38116:27604,38117:27852,38118:30130,38119:30382,38120:30865,38121:31192,38122:32203,38123:32631,38124:32933,38125:34987,38126:35513,38127:36027,38128:36991,38129:38750,38130:39131,38131:27147,38132:31800,38133:20633,38134:23614,38135:24494,38136:26503,38137:27608,38138:29749,38139:30473,38140:32654,38208:40763,38209:26570,38210:31255,38211:21305,38212:30091,38213:39661,38214:24422,38215:33181,38216:33777,38217:32920,38218:24380,38219:24517,38220:30050,38221:31558,38222:36924,38223:26727,38224:23019,38225:23195,38226:32016,38227:30334,38228:35628,38229:20469,38230:24426,38231:27161,38232:27703,38233:28418,38234:29922,38235:31080,38236:34920,38237:35413,38238:35961,38239:24287,38240:25551,38241:30149,38242:31186,38243:33495,38244:37672,38245:37618,38246:33948,38247:34541,38248:39981,38249:21697,38250:24428,38251:25996,38252:27996,38253:28693,38254:36007,38255:36051,38256:38971,38257:25935,38258:29942,38259:19981,38260:20184,38261:22496,38262:22827,38263:23142,38264:23500,38265:20904,38266:24067,38267:24220,38268:24598,38269:25206,38270:25975,38272:26023,38273:26222,38274:28014,38275:29238,38276:31526,38277:33104,38278:33178,38279:33433,38280:35676,38281:36e3,38282:36070,38283:36212,38284:38428,38285:38468,38286:20398,38287:25771,38288:27494,38289:33310,38290:33889,38291:34154,38292:37096,38293:23553,38294:26963,38295:39080,38296:33914,38297:34135,38298:20239,38299:21103,38300:24489,38301:24133,38302:26381,38303:31119,38304:33145,38305:35079,38306:35206,38307:28149,38308:24343,38309:25173,38310:27832,38311:20175,38312:29289,38313:39826,38314:20998,38315:21563,38316:22132,38317:22707,38318:24996,38319:25198,38320:28954,38321:22894,38322:31881,38323:31966,38324:32027,38325:38640,38326:25991,38327:32862,38328:19993,38329:20341,38330:20853,38331:22592,38332:24163,38333:24179,38334:24330,38335:26564,38336:20006,38337:34109,38338:38281,38339:38491,38340:31859,38341:38913,38342:20731,38343:22721,38344:30294,38345:30887,38346:21029,38347:30629,38348:34065,38349:31622,38350:20559,38351:22793,38352:29255,38353:31687,38354:32232,38355:36794,38356:36820,38357:36941,38358:20415,38359:21193,38360:23081,38361:24321,38362:38829,38363:20445,38364:33303,38365:37610,38366:22275,38367:25429,38368:27497,38369:29995,38370:35036,38371:36628,38372:31298,38373:21215,38374:22675,38375:24917,38376:25098,38377:26286,38378:27597,38379:31807,38380:33769,38381:20515,38382:20472,38383:21253,38384:21574,38385:22577,38386:22857,38387:23453,38388:23792,38389:23791,38390:23849,38391:24214,38392:25265,38393:25447,38394:25918,38395:26041,38396:26379,38464:27861,38465:27873,38466:28921,38467:30770,38468:32299,38469:32990,38470:33459,38471:33804,38472:34028,38473:34562,38474:35090,38475:35370,38476:35914,38477:37030,38478:37586,38479:39165,38480:40179,38481:40300,38482:20047,38483:20129,38484:20621,38485:21078,38486:22346,38487:22952,38488:24125,38489:24536,38490:24537,38491:25151,38492:26292,38493:26395,38494:26576,38495:26834,38496:20882,38497:32033,38498:32938,38499:33192,38500:35584,38501:35980,38502:36031,38503:37502,38504:38450,38505:21536,38506:38956,38507:21271,38508:20693,38509:21340,38510:22696,38511:25778,38512:26420,38513:29287,38514:30566,38515:31302,38516:37350,38517:21187,38518:27809,38519:27526,38520:22528,38521:24140,38522:22868,38523:26412,38524:32763,38525:20961,38526:30406,38528:25705,38529:30952,38530:39764,38531:40635,38532:22475,38533:22969,38534:26151,38535:26522,38536:27598,38537:21737,38538:27097,38539:24149,38540:33180,38541:26517,38542:39850,38543:26622,38544:40018,38545:26717,38546:20134,38547:20451,38548:21448,38549:25273,38550:26411,38551:27819,38552:36804,38553:20397,38554:32365,38555:40639,38556:19975,38557:24930,38558:28288,38559:28459,38560:34067,38561:21619,38562:26410,38563:39749,38564:24051,38565:31637,38566:23724,38567:23494,38568:34588,38569:28234,38570:34001,38571:31252,38572:33032,38573:22937,38574:31885,38575:27665,38576:30496,38577:21209,38578:22818,38579:28961,38580:29279,38581:30683,38582:38695,38583:40289,38584:26891,38585:23167,38586:23064,38587:20901,38588:21517,38589:21629,38590:26126,38591:30431,38592:36855,38593:37528,38594:40180,38595:23018,38596:29277,38597:28357,38598:20813,38599:26825,38600:32191,38601:32236,38602:38754,38603:40634,38604:25720,38605:27169,38606:33538,38607:22916,38608:23391,38609:27611,38610:29467,38611:30450,38612:32178,38613:32791,38614:33945,38615:20786,38616:26408,38617:40665,38618:30446,38619:26466,38620:21247,38621:39173,38622:23588,38623:25147,38624:31870,38625:36016,38626:21839,38627:24758,38628:32011,38629:38272,38630:21249,38631:20063,38632:20918,38633:22812,38634:29242,38635:32822,38636:37326,38637:24357,38638:30690,38639:21380,38640:24441,38641:32004,38642:34220,38643:35379,38644:36493,38645:38742,38646:26611,38647:34222,38648:37971,38649:24841,38650:24840,38651:27833,38652:30290,38720:35565,38721:36664,38722:21807,38723:20305,38724:20778,38725:21191,38726:21451,38727:23461,38728:24189,38729:24736,38730:24962,38731:25558,38732:26377,38733:26586,38734:28263,38735:28044,38736:29494,38737:29495,38738:30001,38739:31056,38740:35029,38741:35480,38742:36938,38743:37009,38744:37109,38745:38596,38746:34701,38747:22805,38748:20104,38749:20313,38750:19982,38751:35465,38752:36671,38753:38928,38754:20653,38755:24188,38756:22934,38757:23481,38758:24248,38759:25562,38760:25594,38761:25793,38762:26332,38763:26954,38764:27096,38765:27915,38766:28342,38767:29076,38768:29992,38769:31407,38770:32650,38771:32768,38772:33865,38773:33993,38774:35201,38775:35617,38776:36362,38777:36965,38778:38525,38779:39178,38780:24958,38781:25233,38782:27442,38784:27779,38785:28020,38786:32716,38787:32764,38788:28096,38789:32645,38790:34746,38791:35064,38792:26469,38793:33713,38794:38972,38795:38647,38796:27931,38797:32097,38798:33853,38799:37226,38800:20081,38801:21365,38802:23888,38803:27396,38804:28651,38805:34253,38806:34349,38807:35239,38808:21033,38809:21519,38810:23653,38811:26446,38812:26792,38813:29702,38814:29827,38815:30178,38816:35023,38817:35041,38818:37324,38819:38626,38820:38520,38821:24459,38822:29575,38823:31435,38824:33870,38825:25504,38826:30053,38827:21129,38828:27969,38829:28316,38830:29705,38831:30041,38832:30827,38833:31890,38834:38534,38835:31452,38836:40845,38837:20406,38838:24942,38839:26053,38840:34396,38841:20102,38842:20142,38843:20698,38844:20001,38845:20940,38846:23534,38847:26009,38848:26753,38849:28092,38850:29471,38851:30274,38852:30637,38853:31260,38854:31975,38855:33391,38856:35538,38857:36988,38858:37327,38859:38517,38860:38936,38861:21147,38862:32209,38863:20523,38864:21400,38865:26519,38866:28107,38867:29136,38868:29747,38869:33256,38870:36650,38871:38563,38872:40023,38873:40607,38874:29792,38875:22593,38876:28057,38877:32047,38878:39006,38879:20196,38880:20278,38881:20363,38882:20919,38883:21169,38884:23994,38885:24604,38886:29618,38887:31036,38888:33491,38889:37428,38890:38583,38891:38646,38892:38666,38893:40599,38894:40802,38895:26278,38896:27508,38897:21015,38898:21155,38899:28872,38900:35010,38901:24265,38902:24651,38903:24976,38904:28451,38905:29001,38906:31806,38907:32244,38908:32879,38976:34030,38977:36899,38978:37676,38979:21570,38980:39791,38981:27347,38982:28809,38983:36034,38984:36335,38985:38706,38986:21172,38987:23105,38988:24266,38989:24324,38990:26391,38991:27004,38992:27028,38993:28010,38994:28431,38995:29282,38996:29436,38997:31725,38998:32769,38999:32894,39e3:34635,39001:37070,39002:20845,39003:40595,39004:31108,39005:32907,39006:37682,39007:35542,39008:20525,39009:21644,39010:35441,39011:27498,39012:36036,39013:33031,39014:24785,39015:26528,39016:40434,39017:20121,39018:20120,39019:39952,39020:35435,39021:34241,39022:34152,39023:26880,39024:28286,39025:30871,39026:33109,39071:24332,39072:19984,39073:19989,39074:20010,39075:20017,39076:20022,39077:20028,39078:20031,39079:20034,39080:20054,39081:20056,39082:20098,39083:20101,39084:35947,39085:20106,39086:33298,39087:24333,39088:20110,39089:20126,39090:20127,39091:20128,39092:20130,39093:20144,39094:20147,39095:20150,39096:20174,39097:20173,39098:20164,39099:20166,39100:20162,39101:20183,39102:20190,39103:20205,39104:20191,39105:20215,39106:20233,39107:20314,39108:20272,39109:20315,39110:20317,39111:20311,39112:20295,39113:20342,39114:20360,39115:20367,39116:20376,39117:20347,39118:20329,39119:20336,39120:20369,39121:20335,39122:20358,39123:20374,39124:20760,39125:20436,39126:20447,39127:20430,39128:20440,39129:20443,39130:20433,39131:20442,39132:20432,39133:20452,39134:20453,39135:20506,39136:20520,39137:20500,39138:20522,39139:20517,39140:20485,39141:20252,39142:20470,39143:20513,39144:20521,39145:20524,39146:20478,39147:20463,39148:20497,39149:20486,39150:20547,39151:20551,39152:26371,39153:20565,39154:20560,39155:20552,39156:20570,39157:20566,39158:20588,39159:20600,39160:20608,39161:20634,39162:20613,39163:20660,39164:20658,39232:20681,39233:20682,39234:20659,39235:20674,39236:20694,39237:20702,39238:20709,39239:20717,39240:20707,39241:20718,39242:20729,39243:20725,39244:20745,39245:20737,39246:20738,39247:20758,39248:20757,39249:20756,39250:20762,39251:20769,39252:20794,39253:20791,39254:20796,39255:20795,39256:20799,39257:20800,39258:20818,39259:20812,39260:20820,39261:20834,39262:31480,39263:20841,39264:20842,39265:20846,39266:20864,39267:20866,39268:22232,39269:20876,39270:20873,39271:20879,39272:20881,39273:20883,39274:20885,39275:20886,39276:20900,39277:20902,39278:20898,39279:20905,39280:20906,39281:20907,39282:20915,39283:20913,39284:20914,39285:20912,39286:20917,39287:20925,39288:20933,39289:20937,39290:20955,39291:20960,39292:34389,39293:20969,39294:20973,39296:20976,39297:20981,39298:20990,39299:20996,39300:21003,39301:21012,39302:21006,39303:21031,39304:21034,39305:21038,39306:21043,39307:21049,39308:21071,39309:21060,39310:21067,39311:21068,39312:21086,39313:21076,39314:21098,39315:21108,39316:21097,39317:21107,39318:21119,39319:21117,39320:21133,39321:21140,39322:21138,39323:21105,39324:21128,39325:21137,39326:36776,39327:36775,39328:21164,39329:21165,39330:21180,39331:21173,39332:21185,39333:21197,39334:21207,39335:21214,39336:21219,39337:21222,39338:39149,39339:21216,39340:21235,39341:21237,39342:21240,39343:21241,39344:21254,39345:21256,39346:30008,39347:21261,39348:21264,39349:21263,39350:21269,39351:21274,39352:21283,39353:21295,39354:21297,39355:21299,39356:21304,39357:21312,39358:21318,39359:21317,39360:19991,39361:21321,39362:21325,39363:20950,39364:21342,39365:21353,39366:21358,39367:22808,39368:21371,39369:21367,39370:21378,39371:21398,39372:21408,39373:21414,39374:21413,39375:21422,39376:21424,39377:21430,39378:21443,39379:31762,39380:38617,39381:21471,39382:26364,39383:29166,39384:21486,39385:21480,39386:21485,39387:21498,39388:21505,39389:21565,39390:21568,39391:21548,39392:21549,39393:21564,39394:21550,39395:21558,39396:21545,39397:21533,39398:21582,39399:21647,39400:21621,39401:21646,39402:21599,39403:21617,39404:21623,39405:21616,39406:21650,39407:21627,39408:21632,39409:21622,39410:21636,39411:21648,39412:21638,39413:21703,39414:21666,39415:21688,39416:21669,39417:21676,39418:21700,39419:21704,39420:21672,39488:21675,39489:21698,39490:21668,39491:21694,39492:21692,39493:21720,39494:21733,39495:21734,39496:21775,39497:21780,39498:21757,39499:21742,39500:21741,39501:21754,39502:21730,39503:21817,39504:21824,39505:21859,39506:21836,39507:21806,39508:21852,39509:21829,39510:21846,39511:21847,39512:21816,39513:21811,39514:21853,39515:21913,39516:21888,39517:21679,39518:21898,39519:21919,39520:21883,39521:21886,39522:21912,39523:21918,39524:21934,39525:21884,39526:21891,39527:21929,39528:21895,39529:21928,39530:21978,39531:21957,39532:21983,39533:21956,39534:21980,39535:21988,39536:21972,39537:22036,39538:22007,39539:22038,39540:22014,39541:22013,39542:22043,39543:22009,39544:22094,39545:22096,39546:29151,39547:22068,39548:22070,39549:22066,39550:22072,39552:22123,39553:22116,39554:22063,39555:22124,39556:22122,39557:22150,39558:22144,39559:22154,39560:22176,39561:22164,39562:22159,39563:22181,39564:22190,39565:22198,39566:22196,39567:22210,39568:22204,39569:22209,39570:22211,39571:22208,39572:22216,39573:22222,39574:22225,39575:22227,39576:22231,39577:22254,39578:22265,39579:22272,39580:22271,39581:22276,39582:22281,39583:22280,39584:22283,39585:22285,39586:22291,39587:22296,39588:22294,39589:21959,39590:22300,39591:22310,39592:22327,39593:22328,39594:22350,39595:22331,39596:22336,39597:22351,39598:22377,39599:22464,39600:22408,39601:22369,39602:22399,39603:22409,39604:22419,39605:22432,39606:22451,39607:22436,39608:22442,39609:22448,39610:22467,39611:22470,39612:22484,39613:22482,39614:22483,39615:22538,39616:22486,39617:22499,39618:22539,39619:22553,39620:22557,39621:22642,39622:22561,39623:22626,39624:22603,39625:22640,39626:27584,39627:22610,39628:22589,39629:22649,39630:22661,39631:22713,39632:22687,39633:22699,39634:22714,39635:22750,39636:22715,39637:22712,39638:22702,39639:22725,39640:22739,39641:22737,39642:22743,39643:22745,39644:22744,39645:22757,39646:22748,39647:22756,39648:22751,39649:22767,39650:22778,39651:22777,39652:22779,39653:22780,39654:22781,39655:22786,39656:22794,39657:22800,39658:22811,39659:26790,39660:22821,39661:22828,39662:22829,39663:22834,39664:22840,39665:22846,39666:31442,39667:22869,39668:22864,39669:22862,39670:22874,39671:22872,39672:22882,39673:22880,39674:22887,39675:22892,39676:22889,39744:22904,39745:22913,39746:22941,39747:20318,39748:20395,39749:22947,39750:22962,39751:22982,39752:23016,39753:23004,39754:22925,39755:23001,39756:23002,39757:23077,39758:23071,39759:23057,39760:23068,39761:23049,39762:23066,39763:23104,39764:23148,39765:23113,39766:23093,39767:23094,39768:23138,39769:23146,39770:23194,39771:23228,39772:23230,39773:23243,39774:23234,39775:23229,39776:23267,39777:23255,39778:23270,39779:23273,39780:23254,39781:23290,39782:23291,39783:23308,39784:23307,39785:23318,39786:23346,39787:23248,39788:23338,39789:23350,39790:23358,39791:23363,39792:23365,39793:23360,39794:23377,39795:23381,39796:23386,39797:23387,39798:23397,39799:23401,39800:23408,39801:23411,39802:23413,39803:23416,39804:25992,39805:23418,39806:23424,39808:23427,39809:23462,39810:23480,39811:23491,39812:23495,39813:23497,39814:23508,39815:23504,39816:23524,39817:23526,39818:23522,39819:23518,39820:23525,39821:23531,39822:23536,39823:23542,39824:23539,39825:23557,39826:23559,39827:23560,39828:23565,39829:23571,39830:23584,39831:23586,39832:23592,39833:23608,39834:23609,39835:23617,39836:23622,39837:23630,39838:23635,39839:23632,39840:23631,39841:23409,39842:23660,39843:23662,39844:20066,39845:23670,39846:23673,39847:23692,39848:23697,39849:23700,39850:22939,39851:23723,39852:23739,39853:23734,39854:23740,39855:23735,39856:23749,39857:23742,39858:23751,39859:23769,39860:23785,39861:23805,39862:23802,39863:23789,39864:23948,39865:23786,39866:23819,39867:23829,39868:23831,39869:23900,39870:23839,39871:23835,39872:23825,39873:23828,39874:23842,39875:23834,39876:23833,39877:23832,39878:23884,39879:23890,39880:23886,39881:23883,39882:23916,39883:23923,39884:23926,39885:23943,39886:23940,39887:23938,39888:23970,39889:23965,39890:23980,39891:23982,39892:23997,39893:23952,39894:23991,39895:23996,39896:24009,39897:24013,39898:24019,39899:24018,39900:24022,39901:24027,39902:24043,39903:24050,39904:24053,39905:24075,39906:24090,39907:24089,39908:24081,39909:24091,39910:24118,39911:24119,39912:24132,39913:24131,39914:24128,39915:24142,39916:24151,39917:24148,39918:24159,39919:24162,39920:24164,39921:24135,39922:24181,39923:24182,39924:24186,39925:40636,39926:24191,39927:24224,39928:24257,39929:24258,39930:24264,39931:24272,39932:24271,4e4:24278,40001:24291,40002:24285,40003:24282,40004:24283,40005:24290,40006:24289,40007:24296,40008:24297,40009:24300,40010:24305,40011:24307,40012:24304,40013:24308,40014:24312,40015:24318,40016:24323,40017:24329,40018:24413,40019:24412,40020:24331,40021:24337,40022:24342,40023:24361,40024:24365,40025:24376,40026:24385,40027:24392,40028:24396,40029:24398,40030:24367,40031:24401,40032:24406,40033:24407,40034:24409,40035:24417,40036:24429,40037:24435,40038:24439,40039:24451,40040:24450,40041:24447,40042:24458,40043:24456,40044:24465,40045:24455,40046:24478,40047:24473,40048:24472,40049:24480,40050:24488,40051:24493,40052:24508,40053:24534,40054:24571,40055:24548,40056:24568,40057:24561,40058:24541,40059:24755,40060:24575,40061:24609,40062:24672,40064:24601,40065:24592,40066:24617,40067:24590,40068:24625,40069:24603,40070:24597,40071:24619,40072:24614,40073:24591,40074:24634,40075:24666,40076:24641,40077:24682,40078:24695,40079:24671,40080:24650,40081:24646,40082:24653,40083:24675,40084:24643,40085:24676,40086:24642,40087:24684,40088:24683,40089:24665,40090:24705,40091:24717,40092:24807,40093:24707,40094:24730,40095:24708,40096:24731,40097:24726,40098:24727,40099:24722,40100:24743,40101:24715,40102:24801,40103:24760,40104:24800,40105:24787,40106:24756,40107:24560,40108:24765,40109:24774,40110:24757,40111:24792,40112:24909,40113:24853,40114:24838,40115:24822,40116:24823,40117:24832,40118:24820,40119:24826,40120:24835,40121:24865,40122:24827,40123:24817,40124:24845,40125:24846,40126:24903,40127:24894,40128:24872,40129:24871,40130:24906,40131:24895,40132:24892,40133:24876,40134:24884,40135:24893,40136:24898,40137:24900,40138:24947,40139:24951,40140:24920,40141:24921,40142:24922,40143:24939,40144:24948,40145:24943,40146:24933,40147:24945,40148:24927,40149:24925,40150:24915,40151:24949,40152:24985,40153:24982,40154:24967,40155:25004,40156:24980,40157:24986,40158:24970,40159:24977,40160:25003,40161:25006,40162:25036,40163:25034,40164:25033,40165:25079,40166:25032,40167:25027,40168:25030,40169:25018,40170:25035,40171:32633,40172:25037,40173:25062,40174:25059,40175:25078,40176:25082,40177:25076,40178:25087,40179:25085,40180:25084,40181:25086,40182:25088,40183:25096,40184:25097,40185:25101,40186:25100,40187:25108,40188:25115,40256:25118,40257:25121,40258:25130,40259:25134,40260:25136,40261:25138,40262:25139,40263:25153,40264:25166,40265:25182,40266:25187,40267:25179,40268:25184,40269:25192,40270:25212,40271:25218,40272:25225,40273:25214,40274:25234,40275:25235,40276:25238,40277:25300,40278:25219,40279:25236,40280:25303,40281:25297,40282:25275,40283:25295,40284:25343,40285:25286,40286:25812,40287:25288,40288:25308,40289:25292,40290:25290,40291:25282,40292:25287,40293:25243,40294:25289,40295:25356,40296:25326,40297:25329,40298:25383,40299:25346,40300:25352,40301:25327,40302:25333,40303:25424,40304:25406,40305:25421,40306:25628,40307:25423,40308:25494,40309:25486,40310:25472,40311:25515,40312:25462,40313:25507,40314:25487,40315:25481,40316:25503,40317:25525,40318:25451,40320:25449,40321:25534,40322:25577,40323:25536,40324:25542,40325:25571,40326:25545,40327:25554,40328:25590,40329:25540,40330:25622,40331:25652,40332:25606,40333:25619,40334:25638,40335:25654,40336:25885,40337:25623,40338:25640,40339:25615,40340:25703,40341:25711,40342:25718,40343:25678,40344:25898,40345:25749,40346:25747,40347:25765,40348:25769,40349:25736,40350:25788,40351:25818,40352:25810,40353:25797,40354:25799,40355:25787,40356:25816,40357:25794,40358:25841,40359:25831,40360:33289,40361:25824,40362:25825,40363:25260,40364:25827,40365:25839,40366:25900,40367:25846,40368:25844,40369:25842,40370:25850,40371:25856,40372:25853,40373:25880,40374:25884,40375:25861,40376:25892,40377:25891,40378:25899,40379:25908,40380:25909,40381:25911,40382:25910,40383:25912,40384:30027,40385:25928,40386:25942,40387:25941,40388:25933,40389:25944,40390:25950,40391:25949,40392:25970,40393:25976,40394:25986,40395:25987,40396:35722,40397:26011,40398:26015,40399:26027,40400:26039,40401:26051,40402:26054,40403:26049,40404:26052,40405:26060,40406:26066,40407:26075,40408:26073,40409:26080,40410:26081,40411:26097,40412:26482,40413:26122,40414:26115,40415:26107,40416:26483,40417:26165,40418:26166,40419:26164,40420:26140,40421:26191,40422:26180,40423:26185,40424:26177,40425:26206,40426:26205,40427:26212,40428:26215,40429:26216,40430:26207,40431:26210,40432:26224,40433:26243,40434:26248,40435:26254,40436:26249,40437:26244,40438:26264,40439:26269,40440:26305,40441:26297,40442:26313,40443:26302,40444:26300,40512:26308,40513:26296,40514:26326,40515:26330,40516:26336,40517:26175,40518:26342,40519:26345,40520:26352,40521:26357,40522:26359,40523:26383,40524:26390,40525:26398,40526:26406,40527:26407,40528:38712,40529:26414,40530:26431,40531:26422,40532:26433,40533:26424,40534:26423,40535:26438,40536:26462,40537:26464,40538:26457,40539:26467,40540:26468,40541:26505,40542:26480,40543:26537,40544:26492,40545:26474,40546:26508,40547:26507,40548:26534,40549:26529,40550:26501,40551:26551,40552:26607,40553:26548,40554:26604,40555:26547,40556:26601,40557:26552,40558:26596,40559:26590,40560:26589,40561:26594,40562:26606,40563:26553,40564:26574,40565:26566,40566:26599,40567:27292,40568:26654,40569:26694,40570:26665,40571:26688,40572:26701,40573:26674,40574:26702,40576:26803,40577:26667,40578:26713,40579:26723,40580:26743,40581:26751,40582:26783,40583:26767,40584:26797,40585:26772,40586:26781,40587:26779,40588:26755,40589:27310,40590:26809,40591:26740,40592:26805,40593:26784,40594:26810,40595:26895,40596:26765,40597:26750,40598:26881,40599:26826,40600:26888,40601:26840,40602:26914,40603:26918,40604:26849,40605:26892,40606:26829,40607:26836,40608:26855,40609:26837,40610:26934,40611:26898,40612:26884,40613:26839,40614:26851,40615:26917,40616:26873,40617:26848,40618:26863,40619:26920,40620:26922,40621:26906,40622:26915,40623:26913,40624:26822,40625:27001,40626:26999,40627:26972,40628:27e3,40629:26987,40630:26964,40631:27006,40632:26990,40633:26937,40634:26996,40635:26941,40636:26969,40637:26928,40638:26977,40639:26974,40640:26973,40641:27009,40642:26986,40643:27058,40644:27054,40645:27088,40646:27071,40647:27073,40648:27091,40649:27070,40650:27086,40651:23528,40652:27082,40653:27101,40654:27067,40655:27075,40656:27047,40657:27182,40658:27025,40659:27040,40660:27036,40661:27029,40662:27060,40663:27102,40664:27112,40665:27138,40666:27163,40667:27135,40668:27402,40669:27129,40670:27122,40671:27111,40672:27141,40673:27057,40674:27166,40675:27117,40676:27156,40677:27115,40678:27146,40679:27154,40680:27329,40681:27171,40682:27155,40683:27204,40684:27148,40685:27250,40686:27190,40687:27256,40688:27207,40689:27234,40690:27225,40691:27238,40692:27208,40693:27192,40694:27170,40695:27280,40696:27277,40697:27296,40698:27268,40699:27298,40700:27299,40768:27287,40769:34327,40770:27323,40771:27331,40772:27330,40773:27320,40774:27315,40775:27308,40776:27358,40777:27345,40778:27359,40779:27306,40780:27354,40781:27370,40782:27387,40783:27397,40784:34326,40785:27386,40786:27410,40787:27414,40788:39729,40789:27423,40790:27448,40791:27447,40792:30428,40793:27449,40794:39150,40795:27463,40796:27459,40797:27465,40798:27472,40799:27481,40800:27476,40801:27483,40802:27487,40803:27489,40804:27512,40805:27513,40806:27519,40807:27520,40808:27524,40809:27523,40810:27533,40811:27544,40812:27541,40813:27550,40814:27556,40815:27562,40816:27563,40817:27567,40818:27570,40819:27569,40820:27571,40821:27575,40822:27580,40823:27590,40824:27595,40825:27603,40826:27615,40827:27628,40828:27627,40829:27635,40830:27631,40832:40638,40833:27656,40834:27667,40835:27668,40836:27675,40837:27684,40838:27683,40839:27742,40840:27733,40841:27746,40842:27754,40843:27778,40844:27789,40845:27802,40846:27777,40847:27803,40848:27774,40849:27752,40850:27763,40851:27794,40852:27792,40853:27844,40854:27889,40855:27859,40856:27837,40857:27863,40858:27845,40859:27869,40860:27822,40861:27825,40862:27838,40863:27834,40864:27867,40865:27887,40866:27865,40867:27882,40868:27935,40869:34893,40870:27958,40871:27947,40872:27965,40873:27960,40874:27929,40875:27957,40876:27955,40877:27922,40878:27916,40879:28003,40880:28051,40881:28004,40882:27994,40883:28025,40884:27993,40885:28046,40886:28053,40887:28644,40888:28037,40889:28153,40890:28181,40891:28170,40892:28085,40893:28103,40894:28134,40895:28088,40896:28102,40897:28140,40898:28126,40899:28108,40900:28136,40901:28114,40902:28101,40903:28154,40904:28121,40905:28132,40906:28117,40907:28138,40908:28142,40909:28205,40910:28270,40911:28206,40912:28185,40913:28274,40914:28255,40915:28222,40916:28195,40917:28267,40918:28203,40919:28278,40920:28237,40921:28191,40922:28227,40923:28218,40924:28238,40925:28196,40926:28415,40927:28189,40928:28216,40929:28290,40930:28330,40931:28312,40932:28361,40933:28343,40934:28371,40935:28349,40936:28335,40937:28356,40938:28338,40939:28372,40940:28373,40941:28303,40942:28325,40943:28354,40944:28319,40945:28481,40946:28433,40947:28748,40948:28396,40949:28408,40950:28414,40951:28479,40952:28402,40953:28465,40954:28399,40955:28466,40956:28364,161:65377,162:65378,163:65379,164:65380,165:65381,166:65382,167:65383,168:65384,169:65385,170:65386,171:65387,172:65388,173:65389,174:65390,175:65391,176:65392,177:65393,178:65394,179:65395,180:65396,181:65397,182:65398,183:65399,184:65400,185:65401,186:65402,187:65403,188:65404,189:65405,190:65406,191:65407,192:65408,193:65409,194:65410,195:65411,196:65412,197:65413,198:65414,199:65415,200:65416,201:65417,202:65418,203:65419,204:65420,205:65421,206:65422,207:65423,208:65424,209:65425,210:65426,211:65427,212:65428,213:65429,214:65430,215:65431,216:65432,217:65433,218:65434,219:65435,220:65436,221:65437,222:65438,223:65439,57408:28478,57409:28435,57410:28407,57411:28550,57412:28538,57413:28536,57414:28545,57415:28544,57416:28527,57417:28507,57418:28659,57419:28525,57420:28546,57421:28540,57422:28504,57423:28558,57424:28561,57425:28610,57426:28518,57427:28595,57428:28579,57429:28577,57430:28580,57431:28601,57432:28614,57433:28586,57434:28639,57435:28629,57436:28652,57437:28628,57438:28632,57439:28657,57440:28654,57441:28635,57442:28681,57443:28683,57444:28666,57445:28689,57446:28673,57447:28687,57448:28670,57449:28699,57450:28698,57451:28532,57452:28701,57453:28696,57454:28703,57455:28720,57456:28734,57457:28722,57458:28753,57459:28771,57460:28825,57461:28818,57462:28847,57463:28913,57464:28844,57465:28856,57466:28851,57467:28846,57468:28895,57469:28875,57470:28893,57472:28889,57473:28937,57474:28925,57475:28956,57476:28953,57477:29029,57478:29013,57479:29064,57480:29030,57481:29026,57482:29004,57483:29014,57484:29036,57485:29071,57486:29179,57487:29060,57488:29077,57489:29096,57490:29100,57491:29143,57492:29113,57493:29118,57494:29138,57495:29129,57496:29140,57497:29134,57498:29152,57499:29164,57500:29159,57501:29173,57502:29180,57503:29177,57504:29183,57505:29197,57506:29200,57507:29211,57508:29224,57509:29229,57510:29228,57511:29232,57512:29234,57513:29243,57514:29244,57515:29247,57516:29248,57517:29254,57518:29259,57519:29272,57520:29300,57521:29310,57522:29314,57523:29313,57524:29319,57525:29330,57526:29334,57527:29346,57528:29351,57529:29369,57530:29362,57531:29379,57532:29382,57533:29380,57534:29390,57535:29394,57536:29410,57537:29408,57538:29409,57539:29433,57540:29431,57541:20495,57542:29463,57543:29450,57544:29468,57545:29462,57546:29469,57547:29492,57548:29487,57549:29481,57550:29477,57551:29502,57552:29518,57553:29519,57554:40664,57555:29527,57556:29546,57557:29544,57558:29552,57559:29560,57560:29557,57561:29563,57562:29562,57563:29640,57564:29619,57565:29646,57566:29627,57567:29632,57568:29669,57569:29678,57570:29662,57571:29858,57572:29701,57573:29807,57574:29733,57575:29688,57576:29746,57577:29754,57578:29781,57579:29759,57580:29791,57581:29785,57582:29761,57583:29788,57584:29801,57585:29808,57586:29795,57587:29802,57588:29814,57589:29822,57590:29835,57591:29854,57592:29863,57593:29898,57594:29903,57595:29908,57596:29681,57664:29920,57665:29923,57666:29927,57667:29929,57668:29934,57669:29938,57670:29936,57671:29937,57672:29944,57673:29943,57674:29956,57675:29955,57676:29957,57677:29964,57678:29966,57679:29965,57680:29973,57681:29971,57682:29982,57683:29990,57684:29996,57685:30012,57686:30020,57687:30029,57688:30026,57689:30025,57690:30043,57691:30022,57692:30042,57693:30057,57694:30052,57695:30055,57696:30059,57697:30061,57698:30072,57699:30070,57700:30086,57701:30087,57702:30068,57703:30090,57704:30089,57705:30082,57706:30100,57707:30106,57708:30109,57709:30117,57710:30115,57711:30146,57712:30131,57713:30147,57714:30133,57715:30141,57716:30136,57717:30140,57718:30129,57719:30157,57720:30154,57721:30162,57722:30169,57723:30179,57724:30174,57725:30206,57726:30207,57728:30204,57729:30209,57730:30192,57731:30202,57732:30194,57733:30195,57734:30219,57735:30221,57736:30217,57737:30239,57738:30247,57739:30240,57740:30241,57741:30242,57742:30244,57743:30260,57744:30256,57745:30267,57746:30279,57747:30280,57748:30278,57749:30300,57750:30296,57751:30305,57752:30306,57753:30312,57754:30313,57755:30314,57756:30311,57757:30316,57758:30320,57759:30322,57760:30326,57761:30328,57762:30332,57763:30336,57764:30339,57765:30344,57766:30347,57767:30350,57768:30358,57769:30355,57770:30361,57771:30362,57772:30384,57773:30388,57774:30392,57775:30393,57776:30394,57777:30402,57778:30413,57779:30422,57780:30418,57781:30430,57782:30433,57783:30437,57784:30439,57785:30442,57786:34351,57787:30459,57788:30472,57789:30471,57790:30468,57791:30505,57792:30500,57793:30494,57794:30501,57795:30502,57796:30491,57797:30519,57798:30520,57799:30535,57800:30554,57801:30568,57802:30571,57803:30555,57804:30565,57805:30591,57806:30590,57807:30585,57808:30606,57809:30603,57810:30609,57811:30624,57812:30622,57813:30640,57814:30646,57815:30649,57816:30655,57817:30652,57818:30653,57819:30651,57820:30663,57821:30669,57822:30679,57823:30682,57824:30684,57825:30691,57826:30702,57827:30716,57828:30732,57829:30738,57830:31014,57831:30752,57832:31018,57833:30789,57834:30862,57835:30836,57836:30854,57837:30844,57838:30874,57839:30860,57840:30883,57841:30901,57842:30890,57843:30895,57844:30929,57845:30918,57846:30923,57847:30932,57848:30910,57849:30908,57850:30917,57851:30922,57852:30956,57920:30951,57921:30938,57922:30973,57923:30964,57924:30983,57925:30994,57926:30993,57927:31001,57928:31020,57929:31019,57930:31040,57931:31072,57932:31063,57933:31071,57934:31066,57935:31061,57936:31059,57937:31098,57938:31103,57939:31114,57940:31133,57941:31143,57942:40779,57943:31146,57944:31150,57945:31155,57946:31161,57947:31162,57948:31177,57949:31189,57950:31207,57951:31212,57952:31201,57953:31203,57954:31240,57955:31245,57956:31256,57957:31257,57958:31264,57959:31263,57960:31104,57961:31281,57962:31291,57963:31294,57964:31287,57965:31299,57966:31319,57967:31305,57968:31329,57969:31330,57970:31337,57971:40861,57972:31344,57973:31353,57974:31357,57975:31368,57976:31383,57977:31381,57978:31384,57979:31382,57980:31401,57981:31432,57982:31408,57984:31414,57985:31429,57986:31428,57987:31423,57988:36995,57989:31431,57990:31434,57991:31437,57992:31439,57993:31445,57994:31443,57995:31449,57996:31450,57997:31453,57998:31457,57999:31458,58e3:31462,58001:31469,58002:31472,58003:31490,58004:31503,58005:31498,58006:31494,58007:31539,58008:31512,58009:31513,58010:31518,58011:31541,58012:31528,58013:31542,58014:31568,58015:31610,58016:31492,58017:31565,58018:31499,58019:31564,58020:31557,58021:31605,58022:31589,58023:31604,58024:31591,58025:31600,58026:31601,58027:31596,58028:31598,58029:31645,58030:31640,58031:31647,58032:31629,58033:31644,58034:31642,58035:31627,58036:31634,58037:31631,58038:31581,58039:31641,58040:31691,58041:31681,58042:31692,58043:31695,58044:31668,58045:31686,58046:31709,58047:31721,58048:31761,58049:31764,58050:31718,58051:31717,58052:31840,58053:31744,58054:31751,58055:31763,58056:31731,58057:31735,58058:31767,58059:31757,58060:31734,58061:31779,58062:31783,58063:31786,58064:31775,58065:31799,58066:31787,58067:31805,58068:31820,58069:31811,58070:31828,58071:31823,58072:31808,58073:31824,58074:31832,58075:31839,58076:31844,58077:31830,58078:31845,58079:31852,58080:31861,58081:31875,58082:31888,58083:31908,58084:31917,58085:31906,58086:31915,58087:31905,58088:31912,58089:31923,58090:31922,58091:31921,58092:31918,58093:31929,58094:31933,58095:31936,58096:31941,58097:31938,58098:31960,58099:31954,58100:31964,58101:31970,58102:39739,58103:31983,58104:31986,58105:31988,58106:31990,58107:31994,58108:32006,58176:32002,58177:32028,58178:32021,58179:32010,58180:32069,58181:32075,58182:32046,58183:32050,58184:32063,58185:32053,58186:32070,58187:32115,58188:32086,58189:32078,58190:32114,58191:32104,58192:32110,58193:32079,58194:32099,58195:32147,58196:32137,58197:32091,58198:32143,58199:32125,58200:32155,58201:32186,58202:32174,58203:32163,58204:32181,58205:32199,58206:32189,58207:32171,58208:32317,58209:32162,58210:32175,58211:32220,58212:32184,58213:32159,58214:32176,58215:32216,58216:32221,58217:32228,58218:32222,58219:32251,58220:32242,58221:32225,58222:32261,58223:32266,58224:32291,58225:32289,58226:32274,58227:32305,58228:32287,58229:32265,58230:32267,58231:32290,58232:32326,58233:32358,58234:32315,58235:32309,58236:32313,58237:32323,58238:32311,58240:32306,58241:32314,58242:32359,58243:32349,58244:32342,58245:32350,58246:32345,58247:32346,58248:32377,58249:32362,58250:32361,58251:32380,58252:32379,58253:32387,58254:32213,58255:32381,58256:36782,58257:32383,58258:32392,58259:32393,58260:32396,58261:32402,58262:32400,58263:32403,58264:32404,58265:32406,58266:32398,58267:32411,58268:32412,58269:32568,58270:32570,58271:32581,58272:32588,58273:32589,58274:32590,58275:32592,58276:32593,58277:32597,58278:32596,58279:32600,58280:32607,58281:32608,58282:32616,58283:32617,58284:32615,58285:32632,58286:32642,58287:32646,58288:32643,58289:32648,58290:32647,58291:32652,58292:32660,58293:32670,58294:32669,58295:32666,58296:32675,58297:32687,58298:32690,58299:32697,58300:32686,58301:32694,58302:32696,58303:35697,58304:32709,58305:32710,58306:32714,58307:32725,58308:32724,58309:32737,58310:32742,58311:32745,58312:32755,58313:32761,58314:39132,58315:32774,58316:32772,58317:32779,58318:32786,58319:32792,58320:32793,58321:32796,58322:32801,58323:32808,58324:32831,58325:32827,58326:32842,58327:32838,58328:32850,58329:32856,58330:32858,58331:32863,58332:32866,58333:32872,58334:32883,58335:32882,58336:32880,58337:32886,58338:32889,58339:32893,58340:32895,58341:32900,58342:32902,58343:32901,58344:32923,58345:32915,58346:32922,58347:32941,58348:20880,58349:32940,58350:32987,58351:32997,58352:32985,58353:32989,58354:32964,58355:32986,58356:32982,58357:33033,58358:33007,58359:33009,58360:33051,58361:33065,58362:33059,58363:33071,58364:33099,58432:38539,58433:33094,58434:33086,58435:33107,58436:33105,58437:33020,58438:33137,58439:33134,58440:33125,58441:33126,58442:33140,58443:33155,58444:33160,58445:33162,58446:33152,58447:33154,58448:33184,58449:33173,58450:33188,58451:33187,58452:33119,58453:33171,58454:33193,58455:33200,58456:33205,58457:33214,58458:33208,58459:33213,58460:33216,58461:33218,58462:33210,58463:33225,58464:33229,58465:33233,58466:33241,58467:33240,58468:33224,58469:33242,58470:33247,58471:33248,58472:33255,58473:33274,58474:33275,58475:33278,58476:33281,58477:33282,58478:33285,58479:33287,58480:33290,58481:33293,58482:33296,58483:33302,58484:33321,58485:33323,58486:33336,58487:33331,58488:33344,58489:33369,58490:33368,58491:33373,58492:33370,58493:33375,58494:33380,58496:33378,58497:33384,58498:33386,58499:33387,58500:33326,58501:33393,58502:33399,58503:33400,58504:33406,58505:33421,58506:33426,58507:33451,58508:33439,58509:33467,58510:33452,58511:33505,58512:33507,58513:33503,58514:33490,58515:33524,58516:33523,58517:33530,58518:33683,58519:33539,58520:33531,58521:33529,58522:33502,58523:33542,58524:33500,58525:33545,58526:33497,58527:33589,58528:33588,58529:33558,58530:33586,58531:33585,58532:33600,58533:33593,58534:33616,58535:33605,58536:33583,58537:33579,58538:33559,58539:33560,58540:33669,58541:33690,58542:33706,58543:33695,58544:33698,58545:33686,58546:33571,58547:33678,58548:33671,58549:33674,58550:33660,58551:33717,58552:33651,58553:33653,58554:33696,58555:33673,58556:33704,58557:33780,58558:33811,58559:33771,58560:33742,58561:33789,58562:33795,58563:33752,58564:33803,58565:33729,58566:33783,58567:33799,58568:33760,58569:33778,58570:33805,58571:33826,58572:33824,58573:33725,58574:33848,58575:34054,58576:33787,58577:33901,58578:33834,58579:33852,58580:34138,58581:33924,58582:33911,58583:33899,58584:33965,58585:33902,58586:33922,58587:33897,58588:33862,58589:33836,58590:33903,58591:33913,58592:33845,58593:33994,58594:33890,58595:33977,58596:33983,58597:33951,58598:34009,58599:33997,58600:33979,58601:34010,58602:34e3,58603:33985,58604:33990,58605:34006,58606:33953,58607:34081,58608:34047,58609:34036,58610:34071,58611:34072,58612:34092,58613:34079,58614:34069,58615:34068,58616:34044,58617:34112,58618:34147,58619:34136,58620:34120,58688:34113,58689:34306,58690:34123,58691:34133,58692:34176,58693:34212,58694:34184,58695:34193,58696:34186,58697:34216,58698:34157,58699:34196,58700:34203,58701:34282,58702:34183,58703:34204,58704:34167,58705:34174,58706:34192,58707:34249,58708:34234,58709:34255,58710:34233,58711:34256,58712:34261,58713:34269,58714:34277,58715:34268,58716:34297,58717:34314,58718:34323,58719:34315,58720:34302,58721:34298,58722:34310,58723:34338,58724:34330,58725:34352,58726:34367,58727:34381,58728:20053,58729:34388,58730:34399,58731:34407,58732:34417,58733:34451,58734:34467,58735:34473,58736:34474,58737:34443,58738:34444,58739:34486,58740:34479,58741:34500,58742:34502,58743:34480,58744:34505,58745:34851,58746:34475,58747:34516,58748:34526,58749:34537,58750:34540,58752:34527,58753:34523,58754:34543,58755:34578,58756:34566,58757:34568,58758:34560,58759:34563,58760:34555,58761:34577,58762:34569,58763:34573,58764:34553,58765:34570,58766:34612,58767:34623,58768:34615,58769:34619,58770:34597,58771:34601,58772:34586,58773:34656,58774:34655,58775:34680,58776:34636,58777:34638,58778:34676,58779:34647,58780:34664,58781:34670,58782:34649,58783:34643,58784:34659,58785:34666,58786:34821,58787:34722,58788:34719,58789:34690,58790:34735,58791:34763,58792:34749,58793:34752,58794:34768,58795:38614,58796:34731,58797:34756,58798:34739,58799:34759,58800:34758,58801:34747,58802:34799,58803:34802,58804:34784,58805:34831,58806:34829,58807:34814,58808:34806,58809:34807,58810:34830,58811:34770,58812:34833,58813:34838,58814:34837,58815:34850,58816:34849,58817:34865,58818:34870,58819:34873,58820:34855,58821:34875,58822:34884,58823:34882,58824:34898,58825:34905,58826:34910,58827:34914,58828:34923,58829:34945,58830:34942,58831:34974,58832:34933,58833:34941,58834:34997,58835:34930,58836:34946,58837:34967,58838:34962,58839:34990,58840:34969,58841:34978,58842:34957,58843:34980,58844:34992,58845:35007,58846:34993,58847:35011,58848:35012,58849:35028,58850:35032,58851:35033,58852:35037,58853:35065,58854:35074,58855:35068,58856:35060,58857:35048,58858:35058,58859:35076,58860:35084,58861:35082,58862:35091,58863:35139,58864:35102,58865:35109,58866:35114,58867:35115,58868:35137,58869:35140,58870:35131,58871:35126,58872:35128,58873:35148,58874:35101,58875:35168,58876:35166,58944:35174,58945:35172,58946:35181,58947:35178,58948:35183,58949:35188,58950:35191,58951:35198,58952:35203,58953:35208,58954:35210,58955:35219,58956:35224,58957:35233,58958:35241,58959:35238,58960:35244,58961:35247,58962:35250,58963:35258,58964:35261,58965:35263,58966:35264,58967:35290,58968:35292,58969:35293,58970:35303,58971:35316,58972:35320,58973:35331,58974:35350,58975:35344,58976:35340,58977:35355,58978:35357,58979:35365,58980:35382,58981:35393,58982:35419,58983:35410,58984:35398,58985:35400,58986:35452,58987:35437,58988:35436,58989:35426,58990:35461,58991:35458,58992:35460,58993:35496,58994:35489,58995:35473,58996:35493,58997:35494,58998:35482,58999:35491,59e3:35524,59001:35533,59002:35522,59003:35546,59004:35563,59005:35571,59006:35559,59008:35556,59009:35569,59010:35604,59011:35552,59012:35554,59013:35575,59014:35550,59015:35547,59016:35596,59017:35591,59018:35610,59019:35553,59020:35606,59021:35600,59022:35607,59023:35616,59024:35635,59025:38827,59026:35622,59027:35627,59028:35646,59029:35624,59030:35649,59031:35660,59032:35663,59033:35662,59034:35657,59035:35670,59036:35675,59037:35674,59038:35691,59039:35679,59040:35692,59041:35695,59042:35700,59043:35709,59044:35712,59045:35724,59046:35726,59047:35730,59048:35731,59049:35734,59050:35737,59051:35738,59052:35898,59053:35905,59054:35903,59055:35912,59056:35916,59057:35918,59058:35920,59059:35925,59060:35938,59061:35948,59062:35960,59063:35962,59064:35970,59065:35977,59066:35973,59067:35978,59068:35981,59069:35982,59070:35988,59071:35964,59072:35992,59073:25117,59074:36013,59075:36010,59076:36029,59077:36018,59078:36019,59079:36014,59080:36022,59081:36040,59082:36033,59083:36068,59084:36067,59085:36058,59086:36093,59087:36090,59088:36091,59089:36100,59090:36101,59091:36106,59092:36103,59093:36111,59094:36109,59095:36112,59096:40782,59097:36115,59098:36045,59099:36116,59100:36118,59101:36199,59102:36205,59103:36209,59104:36211,59105:36225,59106:36249,59107:36290,59108:36286,59109:36282,59110:36303,59111:36314,59112:36310,59113:36300,59114:36315,59115:36299,59116:36330,59117:36331,59118:36319,59119:36323,59120:36348,59121:36360,59122:36361,59123:36351,59124:36381,59125:36382,59126:36368,59127:36383,59128:36418,59129:36405,59130:36400,59131:36404,59132:36426,59200:36423,59201:36425,59202:36428,59203:36432,59204:36424,59205:36441,59206:36452,59207:36448,59208:36394,59209:36451,59210:36437,59211:36470,59212:36466,59213:36476,59214:36481,59215:36487,59216:36485,59217:36484,59218:36491,59219:36490,59220:36499,59221:36497,59222:36500,59223:36505,59224:36522,59225:36513,59226:36524,59227:36528,59228:36550,59229:36529,59230:36542,59231:36549,59232:36552,59233:36555,59234:36571,59235:36579,59236:36604,59237:36603,59238:36587,59239:36606,59240:36618,59241:36613,59242:36629,59243:36626,59244:36633,59245:36627,59246:36636,59247:36639,59248:36635,59249:36620,59250:36646,59251:36659,59252:36667,59253:36665,59254:36677,59255:36674,59256:36670,59257:36684,59258:36681,59259:36678,59260:36686,59261:36695,59262:36700,59264:36706,59265:36707,59266:36708,59267:36764,59268:36767,59269:36771,59270:36781,59271:36783,59272:36791,59273:36826,59274:36837,59275:36834,59276:36842,59277:36847,59278:36999,59279:36852,59280:36869,59281:36857,59282:36858,59283:36881,59284:36885,59285:36897,59286:36877,59287:36894,59288:36886,59289:36875,59290:36903,59291:36918,59292:36917,59293:36921,59294:36856,59295:36943,59296:36944,59297:36945,59298:36946,59299:36878,59300:36937,59301:36926,59302:36950,59303:36952,59304:36958,59305:36968,59306:36975,59307:36982,59308:38568,59309:36978,59310:36994,59311:36989,59312:36993,59313:36992,59314:37002,59315:37001,59316:37007,59317:37032,59318:37039,59319:37041,59320:37045,59321:37090,59322:37092,59323:25160,59324:37083,59325:37122,59326:37138,59327:37145,59328:37170,59329:37168,59330:37194,59331:37206,59332:37208,59333:37219,59334:37221,59335:37225,59336:37235,59337:37234,59338:37259,59339:37257,59340:37250,59341:37282,59342:37291,59343:37295,59344:37290,59345:37301,59346:37300,59347:37306,59348:37312,59349:37313,59350:37321,59351:37323,59352:37328,59353:37334,59354:37343,59355:37345,59356:37339,59357:37372,59358:37365,59359:37366,59360:37406,59361:37375,59362:37396,59363:37420,59364:37397,59365:37393,59366:37470,59367:37463,59368:37445,59369:37449,59370:37476,59371:37448,59372:37525,59373:37439,59374:37451,59375:37456,59376:37532,59377:37526,59378:37523,59379:37531,59380:37466,59381:37583,59382:37561,59383:37559,59384:37609,59385:37647,59386:37626,59387:37700,59388:37678,59456:37657,59457:37666,59458:37658,59459:37667,59460:37690,59461:37685,59462:37691,59463:37724,59464:37728,59465:37756,59466:37742,59467:37718,59468:37808,59469:37804,59470:37805,59471:37780,59472:37817,59473:37846,59474:37847,59475:37864,59476:37861,59477:37848,59478:37827,59479:37853,59480:37840,59481:37832,59482:37860,59483:37914,59484:37908,59485:37907,59486:37891,59487:37895,59488:37904,59489:37942,59490:37931,59491:37941,59492:37921,59493:37946,59494:37953,59495:37970,59496:37956,59497:37979,59498:37984,59499:37986,59500:37982,59501:37994,59502:37417,59503:38e3,59504:38005,59505:38007,59506:38013,59507:37978,59508:38012,59509:38014,59510:38017,59511:38015,59512:38274,59513:38279,59514:38282,59515:38292,59516:38294,59517:38296,59518:38297,59520:38304,59521:38312,59522:38311,59523:38317,59524:38332,59525:38331,59526:38329,59527:38334,59528:38346,59529:28662,59530:38339,59531:38349,59532:38348,59533:38357,59534:38356,59535:38358,59536:38364,59537:38369,59538:38373,59539:38370,59540:38433,59541:38440,59542:38446,59543:38447,59544:38466,59545:38476,59546:38479,59547:38475,59548:38519,59549:38492,59550:38494,59551:38493,59552:38495,59553:38502,59554:38514,59555:38508,59556:38541,59557:38552,59558:38549,59559:38551,59560:38570,59561:38567,59562:38577,59563:38578,59564:38576,59565:38580,59566:38582,59567:38584,59568:38585,59569:38606,59570:38603,59571:38601,59572:38605,59573:35149,59574:38620,59575:38669,59576:38613,59577:38649,59578:38660,59579:38662,59580:38664,59581:38675,59582:38670,59583:38673,59584:38671,59585:38678,59586:38681,59587:38692,59588:38698,59589:38704,59590:38713,59591:38717,59592:38718,59593:38724,59594:38726,59595:38728,59596:38722,59597:38729,59598:38748,59599:38752,59600:38756,59601:38758,59602:38760,59603:21202,59604:38763,59605:38769,59606:38777,59607:38789,59608:38780,59609:38785,59610:38778,59611:38790,59612:38795,59613:38799,59614:38800,59615:38812,59616:38824,59617:38822,59618:38819,59619:38835,59620:38836,59621:38851,59622:38854,59623:38856,59624:38859,59625:38876,59626:38893,59627:40783,59628:38898,59629:31455,59630:38902,59631:38901,59632:38927,59633:38924,59634:38968,59635:38948,59636:38945,59637:38967,59638:38973,59639:38982,59640:38991,59641:38987,59642:39019,59643:39023,59644:39024,59712:39025,59713:39028,59714:39027,59715:39082,59716:39087,59717:39089,59718:39094,59719:39108,59720:39107,59721:39110,59722:39145,59723:39147,59724:39171,59725:39177,59726:39186,59727:39188,59728:39192,59729:39201,59730:39197,59731:39198,59732:39204,59733:39200,59734:39212,59735:39214,59736:39229,59737:39230,59738:39234,59739:39241,59740:39237,59741:39248,59742:39243,59743:39249,59744:39250,59745:39244,59746:39253,59747:39319,59748:39320,59749:39333,59750:39341,59751:39342,59752:39356,59753:39391,59754:39387,59755:39389,59756:39384,59757:39377,59758:39405,59759:39406,59760:39409,59761:39410,59762:39419,59763:39416,59764:39425,59765:39439,59766:39429,59767:39394,59768:39449,59769:39467,59770:39479,59771:39493,59772:39490,59773:39488,59774:39491,59776:39486,59777:39509,59778:39501,59779:39515,59780:39511,59781:39519,59782:39522,59783:39525,59784:39524,59785:39529,59786:39531,59787:39530,59788:39597,59789:39600,59790:39612,59791:39616,59792:39631,59793:39633,59794:39635,59795:39636,59796:39646,59797:39647,59798:39650,59799:39651,59800:39654,59801:39663,59802:39659,59803:39662,59804:39668,59805:39665,59806:39671,59807:39675,59808:39686,59809:39704,59810:39706,59811:39711,59812:39714,59813:39715,59814:39717,59815:39719,59816:39720,59817:39721,59818:39722,59819:39726,59820:39727,59821:39730,59822:39748,59823:39747,59824:39759,59825:39757,59826:39758,59827:39761,59828:39768,59829:39796,59830:39827,59831:39811,59832:39825,59833:39830,59834:39831,59835:39839,59836:39840,59837:39848,59838:39860,59839:39872,59840:39882,59841:39865,59842:39878,59843:39887,59844:39889,59845:39890,59846:39907,59847:39906,59848:39908,59849:39892,59850:39905,59851:39994,59852:39922,59853:39921,59854:39920,59855:39957,59856:39956,59857:39945,59858:39955,59859:39948,59860:39942,59861:39944,59862:39954,59863:39946,59864:39940,59865:39982,59866:39963,59867:39973,59868:39972,59869:39969,59870:39984,59871:40007,59872:39986,59873:40006,59874:39998,59875:40026,59876:40032,59877:40039,59878:40054,59879:40056,59880:40167,59881:40172,59882:40176,59883:40201,59884:40200,59885:40171,59886:40195,59887:40198,59888:40234,59889:40230,59890:40367,59891:40227,59892:40223,59893:40260,59894:40213,59895:40210,59896:40257,59897:40255,59898:40254,59899:40262,59900:40264,59968:40285,59969:40286,59970:40292,59971:40273,59972:40272,59973:40281,59974:40306,59975:40329,59976:40327,59977:40363,59978:40303,59979:40314,59980:40346,59981:40356,59982:40361,59983:40370,59984:40388,59985:40385,59986:40379,59987:40376,59988:40378,59989:40390,59990:40399,59991:40386,59992:40409,59993:40403,59994:40440,59995:40422,59996:40429,59997:40431,59998:40445,59999:40474,6e4:40475,60001:40478,60002:40565,60003:40569,60004:40573,60005:40577,60006:40584,60007:40587,60008:40588,60009:40594,60010:40597,60011:40593,60012:40605,60013:40613,60014:40617,60015:40632,60016:40618,60017:40621,60018:38753,60019:40652,60020:40654,60021:40655,60022:40656,60023:40660,60024:40668,60025:40670,60026:40669,60027:40672,60028:40677,60029:40680,60030:40687,60032:40692,60033:40694,60034:40695,60035:40697,60036:40699,60037:40700,60038:40701,60039:40711,60040:40712,60041:30391,60042:40725,60043:40737,60044:40748,60045:40766,60046:40778,60047:40786,60048:40788,60049:40803,60050:40799,60051:40800,60052:40801,60053:40806,60054:40807,60055:40812,60056:40810,60057:40823,60058:40818,60059:40822,60060:40853,60061:40860,60062:40864,60063:22575,60064:27079,60065:36953,60066:29796,60067:20956,60068:29081}},function(o,e,r){"use strict";function t(o,e,r,t){e.degree()<r.degree()&&(w=[r,e],e=w[0],r=w[1]);for(var c=e,s=r,a=o.zero,n=o.one;s.degree()>=t/2;){var d=c,l=a;if(c=s,a=n,c.isZero())return null;s=d;for(var i=o.zero,B=c.getCoefficient(c.degree()),k=o.inverse(B);s.degree()>=c.degree()&&!s.isZero();){var u=s.degree()-c.degree(),C=o.multiply(s.getCoefficient(s.degree()),k);i=i.addOrSubtract(o.buildMonomial(u,C)),s=s.addOrSubtract(c.multiplyByMonomial(u,C))}if(n=i.multiplyPoly(a).addOrSubtract(l),s.degree()>=c.degree())return null}var m=n.getCoefficient(0);if(0===m)return null;var f=o.inverse(m);return[n.multiply(f),s.multiply(f)];var w}function c(o,e){var r=e.degree();if(1===r)return[e.getCoefficient(1)];for(var t=new Array(r),c=0,s=1;s<o.size&&c<r;s++)0===e.evaluateAt(s)&&(t[c]=o.inverse(s),c++);return c!==r?null:t}function s(o,e,r){for(var t=r.length,c=new Array(t),s=0;s<t;s++){for(var a=o.inverse(r[s]),d=1,l=0;l<t;l++)s!==l&&(d=o.multiply(d,n.addOrSubtractGF(1,o.multiply(r[l],a))));c[s]=o.multiply(e.evaluateAt(a),o.inverse(d)),0!==o.generatorBase&&(c[s]=o.multiply(c[s],a))}return c}function a(o,e){var r=new Uint8ClampedArray(o.length);r.set(o);for(var a=new n.default(285,256,0),l=new d.default(a,r),i=new Uint8ClampedArray(e),B=!1,k=0;k<e;k++){var u=l.evaluateAt(a.exp(k+a.generatorBase));i[i.length-1-k]=u,0!==u&&(B=!0)}if(!B)return r;var C=new d.default(a,i),m=t(a,a.buildMonomial(e,1),C,e);if(null===m)return null;var f=c(a,m[0]);if(null==f)return null;for(var w=s(a,m[1],f),P=0;P<f.length;P++){var v=r.length-1-a.log(f[P]);if(v<0)return null;r[v]=n.addOrSubtractGF(r[v],w[P])}return r}Object.defineProperty(e,"__esModule",{value:!0});var n=r(1),d=r(2);e.decode=a},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VERSIONS=[{infoBits:null,versionNumber:1,alignmentPatternCenters:[],errorCorrectionLevels:[{ecCodewordsPerBlock:7,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:13,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:13}]},{ecCodewordsPerBlock:17,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:2,alignmentPatternCenters:[6,18],errorCorrectionLevels:[{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:34}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:28}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]}]},{infoBits:null,versionNumber:3,alignmentPatternCenters:[6,22],errorCorrectionLevels:[{ecCodewordsPerBlock:15,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:55}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:13}]}]},{infoBits:null,versionNumber:4,alignmentPatternCenters:[6,26],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:80}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:32}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:5,alignmentPatternCenters:[6,30],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:43}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:11},{numBlocks:2,dataCodewordsPerBlock:12}]}]},{infoBits:null,versionNumber:6,alignmentPatternCenters:[6,34],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:27}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:31892,versionNumber:7,alignmentPatternCenters:[6,22,38],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:78}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:31}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:13},{numBlocks:1,dataCodewordsPerBlock:14}]}]},{infoBits:34236,versionNumber:8,alignmentPatternCenters:[6,24,42],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:97}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:38},{numBlocks:2,dataCodewordsPerBlock:39}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:18},{numBlocks:2,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:14},{numBlocks:2,dataCodewordsPerBlock:15}]}]},{infoBits:39577,versionNumber:9,alignmentPatternCenters:[6,26,46],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:12},{numBlocks:4,dataCodewordsPerBlock:13}]}]},{infoBits:42195,versionNumber:10,alignmentPatternCenters:[6,28,50],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68},{numBlocks:2,dataCodewordsPerBlock:69}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:43},{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]}]},{infoBits:48118,versionNumber:11,alignmentPatternCenters:[6,30,54],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:81}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:50},{numBlocks:4,dataCodewordsPerBlock:51}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:22},{numBlocks:4,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:12},{numBlocks:8,dataCodewordsPerBlock:13}]}]},{infoBits:51042,versionNumber:12,alignmentPatternCenters:[6,32,58],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:92},{numBlocks:2,dataCodewordsPerBlock:93}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:20},{numBlocks:6,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:55367,versionNumber:13,alignmentPatternCenters:[6,34,62],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:37},{numBlocks:1,dataCodewordsPerBlock:38}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:20},{numBlocks:4,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:11},{numBlocks:4,dataCodewordsPerBlock:12}]}]},{infoBits:58893,versionNumber:14,alignmentPatternCenters:[6,26,46,66],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:40},{numBlocks:5,dataCodewordsPerBlock:41}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:16},{numBlocks:5,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:5,dataCodewordsPerBlock:13}]}]},{infoBits:63784,versionNumber:15,alignmentPatternCenters:[6,26,48,70],errorCorrectionLevels:[{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:87},{numBlocks:1,dataCodewordsPerBlock:88}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:41},{numBlocks:5,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:7,dataCodewordsPerBlock:13}]}]},{infoBits:68472,versionNumber:16,alignmentPatternCenters:[6,26,50,74],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:98},{numBlocks:1,dataCodewordsPerBlock:99}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:70749,versionNumber:17,alignmentPatternCenters:[6,30,54,78],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:1,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22},{numBlocks:15,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:17,dataCodewordsPerBlock:15}]}]},{infoBits:76311,versionNumber:18,alignmentPatternCenters:[6,30,56,82],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:120},{numBlocks:1,dataCodewordsPerBlock:121}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:43},{numBlocks:4,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:1,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:19,dataCodewordsPerBlock:15}]}]},{infoBits:79154,versionNumber:19,alignmentPatternCenters:[6,30,58,86],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:113},{numBlocks:4,dataCodewordsPerBlock:114}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:44},{numBlocks:11,dataCodewordsPerBlock:45}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:21},{numBlocks:4,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:13},{numBlocks:16,dataCodewordsPerBlock:14}]}]},{infoBits:84390,versionNumber:20,alignmentPatternCenters:[6,34,62,90],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:41},{numBlocks:13,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:5,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:15},{numBlocks:10,dataCodewordsPerBlock:16}]}]},{infoBits:87683,versionNumber:21,alignmentPatternCenters:[6,28,50,72,94],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:116},{numBlocks:4,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:16},{numBlocks:6,dataCodewordsPerBlock:17}]}]},{infoBits:92361,versionNumber:22,alignmentPatternCenters:[6,26,50,74,98],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:111},{numBlocks:7,dataCodewordsPerBlock:112}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:13}]}]},{infoBits:96236,versionNumber:23,alignmentPatternCenters:[6,30,54,74,102],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:121},{numBlocks:5,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:47},{numBlocks:14,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:16,dataCodewordsPerBlock:15},{numBlocks:14,dataCodewordsPerBlock:16}]}]},{infoBits:102084,versionNumber:24,alignmentPatternCenters:[6,28,54,80,106],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:45},{numBlocks:14,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:30,dataCodewordsPerBlock:16},{numBlocks:2,dataCodewordsPerBlock:17}]}]},{infoBits:102881,versionNumber:25,alignmentPatternCenters:[6,32,58,84,110],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:106},{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:47},{numBlocks:13,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:110507,versionNumber:26,alignmentPatternCenters:[6,30,58,86,114],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:114},{numBlocks:2,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:46},{numBlocks:4,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:28,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:33,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]}]},{infoBits:110734,versionNumber:27,alignmentPatternCenters:[6,34,62,90,118],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:23},{numBlocks:26,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:117786,versionNumber:28,alignmentPatternCenters:[6,26,50,74,98,122],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:117},{numBlocks:10,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:45},{numBlocks:23,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:24},{numBlocks:31,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:31,dataCodewordsPerBlock:16}]}]},{infoBits:119615,versionNumber:29,alignmentPatternCenters:[6,30,54,78,102,126],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:116},{numBlocks:7,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:21,dataCodewordsPerBlock:45},{numBlocks:7,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:23},{numBlocks:37,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:26,dataCodewordsPerBlock:16}]}]},{infoBits:126325,versionNumber:30,alignmentPatternCenters:[6,26,52,78,104,130],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:115},{numBlocks:10,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:47},{numBlocks:10,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:25,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:25,dataCodewordsPerBlock:16}]}]},{infoBits:127568,versionNumber:31,alignmentPatternCenters:[6,30,56,82,108,134],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:3,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:46},{numBlocks:29,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:24},{numBlocks:1,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:133589,versionNumber:32,alignmentPatternCenters:[6,34,60,86,112,138],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:24},{numBlocks:35,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:35,dataCodewordsPerBlock:16}]}]},{infoBits:136944,versionNumber:33,alignmentPatternCenters:[6,30,58,86,114,142],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:21,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:24},{numBlocks:19,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:141498,versionNumber:34,alignmentPatternCenters:[6,34,62,90,118,146],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:6,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:44,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:59,dataCodewordsPerBlock:16},{numBlocks:1,dataCodewordsPerBlock:17}]}]},{infoBits:145311,versionNumber:35,alignmentPatternCenters:[6,30,54,78,102,126,150],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:121},{numBlocks:7,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:47},{numBlocks:26,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:39,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:41,dataCodewordsPerBlock:16}]}]},{infoBits:150283,versionNumber:36,alignmentPatternCenters:[6,24,50,76,102,128,154],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:121},{numBlocks:14,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:47},{numBlocks:34,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:46,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:64,dataCodewordsPerBlock:16}]}]},{infoBits:152622,versionNumber:37,alignmentPatternCenters:[6,28,54,80,106,132,158],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:46},{numBlocks:14,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:49,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:24,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:158308,versionNumber:38,alignmentPatternCenters:[6,32,58,84,110,136,162],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:122},{numBlocks:18,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:46},{numBlocks:32,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:48,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:15},{numBlocks:32,dataCodewordsPerBlock:16}]}]},{infoBits:161089,versionNumber:39,alignmentPatternCenters:[6,26,54,82,110,138,166],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:40,dataCodewordsPerBlock:47},{numBlocks:7,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:43,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:15},{numBlocks:67,dataCodewordsPerBlock:16}]}]},{infoBits:167017,versionNumber:40,alignmentPatternCenters:[6,30,58,86,114,142,170],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:118},{numBlocks:6,dataCodewordsPerBlock:119}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:18,dataCodewordsPerBlock:47},{numBlocks:31,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:24},{numBlocks:34,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:15},{numBlocks:61,dataCodewordsPerBlock:16}]}]}]},function(o,e,r){"use strict";function t(o,e,r,t){var c=o.x-e.x+r.x-t.x,s=o.y-e.y+r.y-t.y;if(0===c&&0===s)return{a11:e.x-o.x,a12:e.y-o.y,a13:0,a21:r.x-e.x,a22:r.y-e.y,a23:0,a31:o.x,a32:o.y,a33:1};var a=e.x-r.x,n=t.x-r.x,d=e.y-r.y,l=t.y-r.y,i=a*l-n*d,B=(c*l-n*s)/i,k=(a*s-c*d)/i;return{a11:e.x-o.x+B*e.x,a12:e.y-o.y+B*e.y,a13:B,a21:t.x-o.x+k*t.x,a22:t.y-o.y+k*t.y,a23:k,a31:o.x,a32:o.y,a33:1}}function c(o,e,r,c){var s=t(o,e,r,c);return{a11:s.a22*s.a33-s.a23*s.a32,a12:s.a13*s.a32-s.a12*s.a33,a13:s.a12*s.a23-s.a13*s.a22,a21:s.a23*s.a31-s.a21*s.a33,a22:s.a11*s.a33-s.a13*s.a31,a23:s.a13*s.a21-s.a11*s.a23,a31:s.a21*s.a32-s.a22*s.a31,a32:s.a12*s.a31-s.a11*s.a32,a33:s.a11*s.a22-s.a12*s.a21}}function s(o,e){return{a11:o.a11*e.a11+o.a21*e.a12+o.a31*e.a13,a12:o.a12*e.a11+o.a22*e.a12+o.a32*e.a13,a13:o.a13*e.a11+o.a23*e.a12+o.a33*e.a13,a21:o.a11*e.a21+o.a21*e.a22+o.a31*e.a23,a22:o.a12*e.a21+o.a22*e.a22+o.a32*e.a23,a23:o.a13*e.a21+o.a23*e.a22+o.a33*e.a23,a31:o.a11*e.a31+o.a21*e.a32+o.a31*e.a33,a32:o.a12*e.a31+o.a22*e.a32+o.a32*e.a33,a33:o.a13*e.a31+o.a23*e.a32+o.a33*e.a33}}function a(o,e){for(var r=c({x:3.5,y:3.5},{x:e.dimension-3.5,y:3.5},{x:e.dimension-6.5,y:e.dimension-6.5},{x:3.5,y:e.dimension-3.5}),a=t(e.topLeft,e.topRight,e.alignmentPattern,e.bottomLeft),d=s(a,r),l=n.BitMatrix.createEmpty(e.dimension,e.dimension),i=function(o,e){var r=d.a13*o+d.a23*e+d.a33;return{x:(d.a11*o+d.a21*e+d.a31)/r,y:(d.a12*o+d.a22*e+d.a32)/r}},B=0;B<e.dimension;B++)for(var k=0;k<e.dimension;k++){var u=k+.5,C=B+.5,m=i(u,C);l.set(k,B,o.get(Math.floor(m.x),Math.floor(m.y)))}return{matrix:l,mappingFunction:i}}Object.defineProperty(e,"__esModule",{value:!0});var n=r(0);e.extract=a},function(o,e,r){"use strict";function t(o){return o.reduce(function(o,e){return o+e})}function c(o,e,r){var t,c,s,a=C(o,e),n=C(e,r),d=C(o,r);return n>=a&&n>=d?(l=[e,o,r],t=l[0],c=l[1],s=l[2]):d>=n&&d>=a?(i=[o,e,r],t=i[0],c=i[1],s=i[2]):(B=[o,r,e],t=B[0],c=B[1],s=B[2]),(s.x-c.x)*(t.y-c.y)-(s.y-c.y)*(t.x-c.x)<0&&(k=[s,t],t=k[0],s=k[1]),{bottomLeft:t,topLeft:c,topRight:s};var l,i,B,k}function s(o,e,r,c){var s=(t(n(o,r,c,5))/7+t(n(o,e,c,5))/7+t(n(r,o,c,5))/7+t(n(e,o,c,5))/7)/4;if(s<1)throw new Error("Invalid module size");var a=Math.round(C(o,e)/s),d=Math.round(C(o,r)/s),l=Math.floor((a+d)/2)+7;switch(l%4){case 0:l++;break;case 2:l--}return{dimension:l,moduleSize:s}}function a(o,e,r,t){var c,s,a,n,d=[{x:Math.floor(o.x),y:Math.floor(o.y)}],l=Math.abs(e.y-o.y)>Math.abs(e.x-o.x);l?(c=Math.floor(o.y),s=Math.floor(o.x),a=Math.floor(e.y),n=Math.floor(e.x)):(c=Math.floor(o.x),s=Math.floor(o.y),a=Math.floor(e.x),n=Math.floor(e.y));for(var i=Math.abs(a-c),B=Math.abs(n-s),k=Math.floor(-i/2),u=c<a?1:-1,m=s<n?1:-1,f=!0,w=c,P=s;w!==a+u;w+=u){var v=l?P:w,h=l?w:P;if(r.get(v,h)!==f&&(f=!f,d.push({x:v,y:h}),d.length===t+1))break;if((k+=B)>0){if(P===n)break;P+=m,k-=i}}for(var p=[],b=0;b<t;b++)d[b]&&d[b+1]?p.push(C(d[b],d[b+1])):p.push(0);return p}function n(o,e,r,t){var c=e.y-o.y,s=e.x-o.x,n=a(o,e,r,Math.ceil(t/2)),d=a(o,{x:o.x-s,y:o.y-c},r,Math.ceil(t/2)),l=n.shift()+d.shift()-1;return(i=d.concat(l)).concat.apply(i,n);var i}function d(o,e){var r=t(o)/t(e),c=0;return e.forEach(function(e,t){c+=Math.pow(o[t]-e*r,2)}),{averageSize:r,error:c}}function l(o,e,r){try{var t=n(o,{x:-1,y:o.y},r,e.length),c=n(o,{x:o.x,y:-1},r,e.length),s={x:Math.max(0,o.x-o.y)-1,y:Math.max(0,o.y-o.x)-1},a=n(o,s,r,e.length),l={x:Math.min(r.width,o.x+o.y)+1,y:Math.min(r.height,o.y+o.x)+1},i=n(o,l,r,e.length),B=d(t,e),k=d(c,e),u=d(a,e),C=d(i,e),m=Math.sqrt(B.error*B.error+k.error*k.error+u.error*u.error+C.error*C.error),f=(B.averageSize+k.averageSize+u.averageSize+C.averageSize)/4;return m+(Math.pow(B.averageSize-f,2)+Math.pow(k.averageSize-f,2)+Math.pow(u.averageSize-f,2)+Math.pow(C.averageSize-f,2))/f}catch(o){return 1/0}}function i(o){for(var e=[],r=[],a=[],n=[],d=0;d<=o.height;d++)!function(c){for(var s=0,d=!1,l=[0,0,0,0,0],i=-1;i<=o.width;i++)!function(e){var a=o.get(e,c);if(a===d)s++;else{l=[l[1],l[2],l[3],l[4],s],s=1,d=a;var i=t(l)/7,B=Math.abs(l[0]-i)<i&&Math.abs(l[1]-i)<i&&Math.abs(l[2]-3*i)<3*i&&Math.abs(l[3]-i)<i&&Math.abs(l[4]-i)<i&&!a,C=t(l.slice(-3))/3,m=Math.abs(l[2]-C)<C&&Math.abs(l[3]-C)<C&&Math.abs(l[4]-C)<C&&a;if(B){var f=e-l[3]-l[4],w=f-l[2],P={startX:w,endX:f,y:c},v=r.filter(function(o){return w>=o.bottom.startX&&w<=o.bottom.endX||f>=o.bottom.startX&&w<=o.bottom.endX||w<=o.bottom.startX&&f>=o.bottom.endX&&l[2]/(o.bottom.endX-o.bottom.startX)<u&&l[2]/(o.bottom.endX-o.bottom.startX)>k});v.length>0?v[0].bottom=P:r.push({top:P,bottom:P})}if(m){var h=e-l[4],p=h-l[3],P={startX:p,y:c,endX:h},v=n.filter(function(o){return p>=o.bottom.startX&&p<=o.bottom.endX||h>=o.bottom.startX&&p<=o.bottom.endX||p<=o.bottom.startX&&h>=o.bottom.endX&&l[2]/(o.bottom.endX-o.bottom.startX)<u&&l[2]/(o.bottom.endX-o.bottom.startX)>k});v.length>0?v[0].bottom=P:n.push({top:P,bottom:P})}}}(i);e.push.apply(e,r.filter(function(o){return o.bottom.y!==c&&o.bottom.y-o.top.y>=2})),r=r.filter(function(o){return o.bottom.y===c}),a.push.apply(a,n.filter(function(o){return o.bottom.y!==c})),n=n.filter(function(o){return o.bottom.y===c})}(d);e.push.apply(e,r.filter(function(o){return o.bottom.y-o.top.y>=2})),a.push.apply(a,n);var i=e.filter(function(o){return o.bottom.y-o.top.y>=2}).map(function(e){var r=(e.top.startX+e.top.endX+e.bottom.startX+e.bottom.endX)/4,c=(e.top.y+e.bottom.y+1)/2;if(o.get(Math.round(r),Math.round(c))){var s=[e.top.endX-e.top.startX,e.bottom.endX-e.bottom.startX,e.bottom.y-e.top.y+1],a=t(s)/s.length;return{score:l({x:Math.round(r),y:Math.round(c)},[1,1,3,1,1],o),x:r,y:c,size:a}}}).filter(function(o){return!!o}).sort(function(o,e){return o.score-e.score}).map(function(o,e,r){if(e>B)return null;var t=r.filter(function(o,r){return e!==r}).map(function(e){return{x:e.x,y:e.y,score:e.score+Math.pow(e.size-o.size,2)/o.size,size:e.size}}).sort(function(o,e){return o.score-e.score});if(t.length<2)return null;var c=o.score+t[0].score+t[1].score;return{points:[o].concat(t.slice(0,2)),score:c}}).filter(function(o){return!!o}).sort(function(o,e){return o.score-e.score});if(0===i.length)return null;var m,f,w=c(i[0].points[0],i[0].points[1],i[0].points[2]),P=w.topRight,v=w.topLeft,h=w.bottomLeft;try{L=s(v,P,h,o),m=L.dimension,f=L.moduleSize}catch(o){return null}var p={x:P.x-v.x+h.x,y:P.y-v.y+h.y},b=(C(v,h)+C(v,P))/2/f,y=1-3/b,g={x:v.x+y*(p.x-v.x),y:v.y+y*(p.y-v.y)},x=a.map(function(e){var r=(e.top.startX+e.top.endX+e.bottom.startX+e.bottom.endX)/4,c=(e.top.y+e.bottom.y+1)/2;if(o.get(Math.floor(r),Math.floor(c))){var s=[e.top.endX-e.top.startX,e.bottom.endX-e.bottom.startX,e.bottom.y-e.top.y+1];t(s);return{x:r,y:c,score:l({x:Math.floor(r),y:Math.floor(c)},[1,1,1],o)+C({x:r,y:c},g)}}}).filter(function(o){return!!o}).sort(function(o,e){return o.score-e.score}),M=b>=15&&x.length?x[0]:g;return{alignmentPattern:{x:M.x,y:M.y},bottomLeft:{x:h.x,y:h.y},dimension:m,topLeft:{x:v.x,y:v.y},topRight:{x:P.x,y:P.y}};var L}Object.defineProperty(e,"__esModule",{value:!0});var B=4,k=.5,u=1.5,C=function(o,e){return Math.sqrt(Math.pow(e.x-o.x,2)+Math.pow(e.y-o.y,2))};e.locate=i}]).default})}]);',
          null
        );
      };
    },
    function(e, t, r) {
      e.exports = { default: r(76), __esModule: !0 };
    },
    function(e, t) {},
    function(e, t, r) {
      "use strict";
      var o = r(15),
        n = r(3),
        a = r(49),
        i = r(9),
        c = r(18),
        s = r(78),
        d = r(23),
        u = r(52),
        l = r(2)("iterator"),
        f = !([].keys && "next" in [].keys()),
        p = function() {
          return this;
        };
      e.exports = function(e, t, r, m, v, h, k) {
        s(r, t, m);
        var C,
          y,
          g,
          B = function(e) {
            if (!f && e in S) return S[e];
            switch (e) {
              case "keys":
              case "values":
                return function() {
                  return new r(this, e);
                };
            }
            return function() {
              return new r(this, e);
            };
          },
          w = t + " Iterator",
          P = "values" == v,
          b = !1,
          S = e.prototype,
          T = S[l] || S["@@iterator"] || (v && S[v]),
          x = T || B(v),
          R = v ? (P ? B("entries") : x) : void 0,
          _ = "Array" == t ? S.entries || T : T;
        if (
          (_ &&
            (g = u(_.call(new e()))) !== Object.prototype &&
            g.next &&
            (d(g, w, !0), o || "function" == typeof g[l] || i(g, l, p)),
          P &&
            T &&
            "values" !== T.name &&
            ((b = !0),
            (x = function() {
              return T.call(this);
            })),
          (o && !k) || (!f && !b && S[l]) || i(S, l, x),
          (c[t] = x),
          (c[w] = p),
          v)
        )
          if (
            ((C = {
              values: P ? x : B("values"),
              keys: h ? x : B("keys"),
              entries: R
            }),
            k)
          )
            for (y in C) y in S || a(S, y, C[y]);
          else n(n.P + n.F * (f || b), t, C);
        return C;
      };
    },
    function(e, t, r) {
      e.exports =
        !r(8) &&
        !r(16)(function() {
          return (
            7 !=
            Object.defineProperty(r(28)("div"), "a", {
              get: function() {
                return 7;
              }
            }).a
          );
        });
    },
    function(e, t, r) {
      e.exports = r(9);
    },
    function(e, t, r) {
      var o = r(10),
        n = r(14),
        a = r(81)(!1),
        i = r(33)("IE_PROTO");
      e.exports = function(e, t) {
        var r,
          c = n(e),
          s = 0,
          d = [];
        for (r in c) r != i && o(c, r) && d.push(r);
        for (; t.length > s; ) o(c, (r = t[s++])) && (~a(d, r) || d.push(r));
        return d;
      };
    },
    function(e, t, r) {
      var o = r(1).document;
      e.exports = o && o.documentElement;
    },
    function(e, t, r) {
      var o = r(10),
        n = r(24),
        a = r(33)("IE_PROTO"),
        i = Object.prototype;
      e.exports =
        Object.getPrototypeOf ||
        function(e) {
          return (
            (e = n(e)),
            o(e, a)
              ? e[a]
              : "function" == typeof e.constructor && e instanceof e.constructor
              ? e.constructor.prototype
              : e instanceof Object
              ? i
              : null
          );
        };
    },
    function(e, t, r) {
      r(83);
      for (
        var o = r(1),
          n = r(9),
          a = r(18),
          i = r(2)("toStringTag"),
          c = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(
            ","
          ),
          s = 0;
        s < c.length;
        s++
      ) {
        var d = c[s],
          u = o[d],
          l = u && u.prototype;
        l && !l[i] && n(l, i, d), (a[d] = a.Array);
      }
    },
    function(e, t, r) {
      var o = r(19),
        n = r(2)("toStringTag"),
        a =
          "Arguments" ==
          o(
            (function() {
              return arguments;
            })()
          ),
        i = function(e, t) {
          try {
            return e[t];
          } catch (e) {}
        };
      e.exports = function(e) {
        var t, r, c;
        return void 0 === e
          ? "Undefined"
          : null === e
          ? "Null"
          : "string" == typeof (r = i((t = Object(e)), n))
          ? r
          : a
          ? o(t)
          : "Object" == (c = o(t)) && "function" == typeof t.callee
          ? "Arguments"
          : c;
      };
    },
    function(e, t, r) {
      var o = r(5);
      e.exports = function(e, t, r, n) {
        try {
          return n ? t(o(r)[0], r[1]) : t(r);
        } catch (t) {
          var a = e.return;
          throw (void 0 !== a && o(a.call(e)), t);
        }
      };
    },
    function(e, t, r) {
      var o = r(18),
        n = r(2)("iterator"),
        a = Array.prototype;
      e.exports = function(e) {
        return void 0 !== e && (o.Array === e || a[n] === e);
      };
    },
    function(e, t, r) {
      var o = r(54),
        n = r(2)("iterator"),
        a = r(18);
      e.exports = r(0).getIteratorMethod = function(e) {
        if (void 0 != e) return e[n] || e["@@iterator"] || a[o(e)];
      };
    },
    function(e, t, r) {
      var o = r(5),
        n = r(21),
        a = r(2)("species");
      e.exports = function(e, t) {
        var r,
          i = o(e).constructor;
        return void 0 === i || void 0 == (r = o(i)[a]) ? t : n(r);
      };
    },
    function(e, t, r) {
      var o,
        n,
        a,
        i = r(13),
        c = r(89),
        s = r(51),
        d = r(28),
        u = r(1),
        l = u.process,
        f = u.setImmediate,
        p = u.clearImmediate,
        m = u.MessageChannel,
        v = u.Dispatch,
        h = 0,
        k = {},
        C = function() {
          var e = +this;
          if (k.hasOwnProperty(e)) {
            var t = k[e];
            delete k[e], t();
          }
        },
        y = function(e) {
          C.call(e.data);
        };
      (f && p) ||
        ((f = function(e) {
          for (var t = [], r = 1; arguments.length > r; )
            t.push(arguments[r++]);
          return (
            (k[++h] = function() {
              c("function" == typeof e ? e : Function(e), t);
            }),
            o(h),
            h
          );
        }),
        (p = function(e) {
          delete k[e];
        }),
        "process" == r(19)(l)
          ? (o = function(e) {
              l.nextTick(i(C, e, 1));
            })
          : v && v.now
          ? (o = function(e) {
              v.now(i(C, e, 1));
            })
          : m
          ? ((n = new m()),
            (a = n.port2),
            (n.port1.onmessage = y),
            (o = i(a.postMessage, a, 1)))
          : u.addEventListener &&
            "function" == typeof postMessage &&
            !u.importScripts
          ? ((o = function(e) {
              u.postMessage(e + "", "*");
            }),
            u.addEventListener("message", y, !1))
          : (o =
              "onreadystatechange" in d("script")
                ? function(e) {
                    s.appendChild(d("script")).onreadystatechange = function() {
                      s.removeChild(this), C.call(e);
                    };
                  }
                : function(e) {
                    setTimeout(i(C, e, 1), 0);
                  })),
        (e.exports = { set: f, clear: p });
    },
    function(e, t) {
      e.exports = function(e) {
        try {
          return { e: !1, v: e() };
        } catch (e) {
          return { e: !0, v: e };
        }
      };
    },
    function(e, t, r) {
      var o = r(5),
        n = r(7),
        a = r(36);
      e.exports = function(e, t) {
        if ((o(e), n(t) && t.constructor === e)) return t;
        var r = a.f(e);
        return (0, r.resolve)(t), r.promise;
      };
    },
    function(e, t, r) {
      var o = r(2)("iterator"),
        n = !1;
      try {
        var a = [7][o]();
        (a.return = function() {
          n = !0;
        }),
          Array.from(a, function() {
            throw 2;
          });
      } catch (e) {}
      e.exports = function(e, t) {
        if (!t && !n) return !1;
        var r = !1;
        try {
          var a = [7],
            i = a[o]();
          (i.next = function() {
            return { done: (r = !0) };
          }),
            (a[o] = function() {
              return i;
            }),
            e(a);
        } catch (e) {}
        return r;
      };
    },
    function(e, t, r) {
      "use strict";
      (t.__esModule = !0),
        (t.default = function(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        });
    },
    function(e, t, r) {
      "use strict";
      var o = {};
      (o.generateIdentifier = function() {
        return Math.random()
          .toString(36)
          .substr(2, 10);
      }),
        (o.localCName = o.generateIdentifier()),
        (o.splitLines = function(e) {
          return e
            .trim()
            .split("\n")
            .map(function(e) {
              return e.trim();
            });
        }),
        (o.splitSections = function(e) {
          return e.split("\nm=").map(function(e, t) {
            return (t > 0 ? "m=" + e : e).trim() + "\r\n";
          });
        }),
        (o.getDescription = function(e) {
          var t = o.splitSections(e);
          return t && t[0];
        }),
        (o.getMediaSections = function(e) {
          var t = o.splitSections(e);
          return t.shift(), t;
        }),
        (o.matchPrefix = function(e, t) {
          return o.splitLines(e).filter(function(e) {
            return 0 === e.indexOf(t);
          });
        }),
        (o.parseCandidate = function(e) {
          var t;
          t =
            0 === e.indexOf("a=candidate:")
              ? e.substring(12).split(" ")
              : e.substring(10).split(" ");
          for (
            var r = {
                foundation: t[0],
                component: parseInt(t[1], 10),
                protocol: t[2].toLowerCase(),
                priority: parseInt(t[3], 10),
                ip: t[4],
                address: t[4],
                port: parseInt(t[5], 10),
                type: t[7]
              },
              o = 8;
            o < t.length;
            o += 2
          )
            switch (t[o]) {
              case "raddr":
                r.relatedAddress = t[o + 1];
                break;
              case "rport":
                r.relatedPort = parseInt(t[o + 1], 10);
                break;
              case "tcptype":
                r.tcpType = t[o + 1];
                break;
              case "ufrag":
                (r.ufrag = t[o + 1]), (r.usernameFragment = t[o + 1]);
                break;
              default:
                r[t[o]] = t[o + 1];
            }
          return r;
        }),
        (o.writeCandidate = function(e) {
          var t = [];
          t.push(e.foundation),
            t.push(e.component),
            t.push(e.protocol.toUpperCase()),
            t.push(e.priority),
            t.push(e.address || e.ip),
            t.push(e.port);
          var r = e.type;
          return (
            t.push("typ"),
            t.push(r),
            "host" !== r &&
              e.relatedAddress &&
              e.relatedPort &&
              (t.push("raddr"),
              t.push(e.relatedAddress),
              t.push("rport"),
              t.push(e.relatedPort)),
            e.tcpType &&
              "tcp" === e.protocol.toLowerCase() &&
              (t.push("tcptype"), t.push(e.tcpType)),
            (e.usernameFragment || e.ufrag) &&
              (t.push("ufrag"), t.push(e.usernameFragment || e.ufrag)),
            "candidate:" + t.join(" ")
          );
        }),
        (o.parseIceOptions = function(e) {
          return e.substr(14).split(" ");
        }),
        (o.parseRtpMap = function(e) {
          var t = e.substr(9).split(" "),
            r = { payloadType: parseInt(t.shift(), 10) };
          return (
            (t = t[0].split("/")),
            (r.name = t[0]),
            (r.clockRate = parseInt(t[1], 10)),
            (r.channels = 3 === t.length ? parseInt(t[2], 10) : 1),
            (r.numChannels = r.channels),
            r
          );
        }),
        (o.writeRtpMap = function(e) {
          var t = e.payloadType;
          void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType);
          var r = e.channels || e.numChannels || 1;
          return (
            "a=rtpmap:" +
            t +
            " " +
            e.name +
            "/" +
            e.clockRate +
            (1 !== r ? "/" + r : "") +
            "\r\n"
          );
        }),
        (o.parseExtmap = function(e) {
          var t = e.substr(9).split(" ");
          return {
            id: parseInt(t[0], 10),
            direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv",
            uri: t[1]
          };
        }),
        (o.writeExtmap = function(e) {
          return (
            "a=extmap:" +
            (e.id || e.preferredId) +
            (e.direction && "sendrecv" !== e.direction
              ? "/" + e.direction
              : "") +
            " " +
            e.uri +
            "\r\n"
          );
        }),
        (o.parseFmtp = function(e) {
          for (
            var t, r = {}, o = e.substr(e.indexOf(" ") + 1).split(";"), n = 0;
            n < o.length;
            n++
          )
            (t = o[n].trim().split("=")), (r[t[0].trim()] = t[1]);
          return r;
        }),
        (o.writeFmtp = function(e) {
          var t = "",
            r = e.payloadType;
          if (
            (void 0 !== e.preferredPayloadType && (r = e.preferredPayloadType),
            e.parameters && Object.keys(e.parameters).length)
          ) {
            var o = [];
            Object.keys(e.parameters).forEach(function(t) {
              e.parameters[t] ? o.push(t + "=" + e.parameters[t]) : o.push(t);
            }),
              (t += "a=fmtp:" + r + " " + o.join(";") + "\r\n");
          }
          return t;
        }),
        (o.parseRtcpFb = function(e) {
          var t = e.substr(e.indexOf(" ") + 1).split(" ");
          return { type: t.shift(), parameter: t.join(" ") };
        }),
        (o.writeRtcpFb = function(e) {
          var t = "",
            r = e.payloadType;
          return (
            void 0 !== e.preferredPayloadType && (r = e.preferredPayloadType),
            e.rtcpFeedback &&
              e.rtcpFeedback.length &&
              e.rtcpFeedback.forEach(function(e) {
                t +=
                  "a=rtcp-fb:" +
                  r +
                  " " +
                  e.type +
                  (e.parameter && e.parameter.length ? " " + e.parameter : "") +
                  "\r\n";
              }),
            t
          );
        }),
        (o.parseSsrcMedia = function(e) {
          var t = e.indexOf(" "),
            r = { ssrc: parseInt(e.substr(7, t - 7), 10) },
            o = e.indexOf(":", t);
          return (
            o > -1
              ? ((r.attribute = e.substr(t + 1, o - t - 1)),
                (r.value = e.substr(o + 1)))
              : (r.attribute = e.substr(t + 1)),
            r
          );
        }),
        (o.parseSsrcGroup = function(e) {
          var t = e.substr(13).split(" ");
          return {
            semantics: t.shift(),
            ssrcs: t.map(function(e) {
              return parseInt(e, 10);
            })
          };
        }),
        (o.getMid = function(e) {
          var t = o.matchPrefix(e, "a=mid:")[0];
          if (t) return t.substr(6);
        }),
        (o.parseFingerprint = function(e) {
          var t = e.substr(14).split(" ");
          return { algorithm: t[0].toLowerCase(), value: t[1] };
        }),
        (o.getDtlsParameters = function(e, t) {
          return {
            role: "auto",
            fingerprints: o
              .matchPrefix(e + t, "a=fingerprint:")
              .map(o.parseFingerprint)
          };
        }),
        (o.writeDtlsParameters = function(e, t) {
          var r = "a=setup:" + t + "\r\n";
          return (
            e.fingerprints.forEach(function(e) {
              r += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n";
            }),
            r
          );
        }),
        (o.getIceParameters = function(e, t) {
          var r = o.splitLines(e);
          return (
            (r = r.concat(o.splitLines(t))),
            {
              usernameFragment: r
                .filter(function(e) {
                  return 0 === e.indexOf("a=ice-ufrag:");
                })[0]
                .substr(12),
              password: r
                .filter(function(e) {
                  return 0 === e.indexOf("a=ice-pwd:");
                })[0]
                .substr(10)
            }
          );
        }),
        (o.writeIceParameters = function(e) {
          return (
            "a=ice-ufrag:" +
            e.usernameFragment +
            "\r\na=ice-pwd:" +
            e.password +
            "\r\n"
          );
        }),
        (o.parseRtpParameters = function(e) {
          for (
            var t = {
                codecs: [],
                headerExtensions: [],
                fecMechanisms: [],
                rtcp: []
              },
              r = o.splitLines(e),
              n = r[0].split(" "),
              a = 3;
            a < n.length;
            a++
          ) {
            var i = n[a],
              c = o.matchPrefix(e, "a=rtpmap:" + i + " ")[0];
            if (c) {
              var s = o.parseRtpMap(c),
                d = o.matchPrefix(e, "a=fmtp:" + i + " ");
              switch (
                ((s.parameters = d.length ? o.parseFmtp(d[0]) : {}),
                (s.rtcpFeedback = o
                  .matchPrefix(e, "a=rtcp-fb:" + i + " ")
                  .map(o.parseRtcpFb)),
                t.codecs.push(s),
                s.name.toUpperCase())
              ) {
                case "RED":
                case "ULPFEC":
                  t.fecMechanisms.push(s.name.toUpperCase());
              }
            }
          }
          return (
            o.matchPrefix(e, "a=extmap:").forEach(function(e) {
              t.headerExtensions.push(o.parseExtmap(e));
            }),
            t
          );
        }),
        (o.writeRtpDescription = function(e, t) {
          var r = "";
          (r += "m=" + e + " "),
            (r += t.codecs.length > 0 ? "9" : "0"),
            (r += " UDP/TLS/RTP/SAVPF "),
            (r +=
              t.codecs
                .map(function(e) {
                  return void 0 !== e.preferredPayloadType
                    ? e.preferredPayloadType
                    : e.payloadType;
                })
                .join(" ") + "\r\n"),
            (r += "c=IN IP4 0.0.0.0\r\n"),
            (r += "a=rtcp:9 IN IP4 0.0.0.0\r\n"),
            t.codecs.forEach(function(e) {
              (r += o.writeRtpMap(e)),
                (r += o.writeFmtp(e)),
                (r += o.writeRtcpFb(e));
            });
          var n = 0;
          return (
            t.codecs.forEach(function(e) {
              e.maxptime > n && (n = e.maxptime);
            }),
            n > 0 && (r += "a=maxptime:" + n + "\r\n"),
            (r += "a=rtcp-mux\r\n"),
            t.headerExtensions &&
              t.headerExtensions.forEach(function(e) {
                r += o.writeExtmap(e);
              }),
            r
          );
        }),
        (o.parseRtpEncodingParameters = function(e) {
          var t,
            r = [],
            n = o.parseRtpParameters(e),
            a = -1 !== n.fecMechanisms.indexOf("RED"),
            i = -1 !== n.fecMechanisms.indexOf("ULPFEC"),
            c = o
              .matchPrefix(e, "a=ssrc:")
              .map(function(e) {
                return o.parseSsrcMedia(e);
              })
              .filter(function(e) {
                return "cname" === e.attribute;
              }),
            s = c.length > 0 && c[0].ssrc,
            d = o.matchPrefix(e, "a=ssrc-group:FID").map(function(e) {
              return e
                .substr(17)
                .split(" ")
                .map(function(e) {
                  return parseInt(e, 10);
                });
            });
          d.length > 0 && d[0].length > 1 && d[0][0] === s && (t = d[0][1]),
            n.codecs.forEach(function(e) {
              if ("RTX" === e.name.toUpperCase() && e.parameters.apt) {
                var o = {
                  ssrc: s,
                  codecPayloadType: parseInt(e.parameters.apt, 10)
                };
                s && t && (o.rtx = { ssrc: t }),
                  r.push(o),
                  a &&
                    ((o = JSON.parse(JSON.stringify(o))),
                    (o.fec = { ssrc: s, mechanism: i ? "red+ulpfec" : "red" }),
                    r.push(o));
              }
            }),
            0 === r.length && s && r.push({ ssrc: s });
          var u = o.matchPrefix(e, "b=");
          return (
            u.length &&
              ((u =
                0 === u[0].indexOf("b=TIAS:")
                  ? parseInt(u[0].substr(7), 10)
                  : 0 === u[0].indexOf("b=AS:")
                  ? 1e3 * parseInt(u[0].substr(5), 10) * 0.95 - 16e3
                  : void 0),
              r.forEach(function(e) {
                e.maxBitrate = u;
              })),
            r
          );
        }),
        (o.parseRtcpParameters = function(e) {
          var t = {},
            r = o
              .matchPrefix(e, "a=ssrc:")
              .map(function(e) {
                return o.parseSsrcMedia(e);
              })
              .filter(function(e) {
                return "cname" === e.attribute;
              })[0];
          r && ((t.cname = r.value), (t.ssrc = r.ssrc));
          var n = o.matchPrefix(e, "a=rtcp-rsize");
          (t.reducedSize = n.length > 0), (t.compound = 0 === n.length);
          var a = o.matchPrefix(e, "a=rtcp-mux");
          return (t.mux = a.length > 0), t;
        }),
        (o.parseMsid = function(e) {
          var t,
            r = o.matchPrefix(e, "a=msid:");
          if (1 === r.length)
            return (
              (t = r[0].substr(7).split(" ")), { stream: t[0], track: t[1] }
            );
          var n = o
            .matchPrefix(e, "a=ssrc:")
            .map(function(e) {
              return o.parseSsrcMedia(e);
            })
            .filter(function(e) {
              return "msid" === e.attribute;
            });
          return n.length > 0
            ? ((t = n[0].value.split(" ")), { stream: t[0], track: t[1] })
            : void 0;
        }),
        (o.parseSctpDescription = function(e) {
          var t,
            r = o.parseMLine(e),
            n = o.matchPrefix(e, "a=max-message-size:");
          n.length > 0 && (t = parseInt(n[0].substr(19), 10)),
            isNaN(t) && (t = 65536);
          var a = o.matchPrefix(e, "a=sctp-port:");
          if (a.length > 0)
            return {
              port: parseInt(a[0].substr(12), 10),
              protocol: r.fmt,
              maxMessageSize: t
            };
          if (o.matchPrefix(e, "a=sctpmap:").length > 0) {
            var i = o
              .matchPrefix(e, "a=sctpmap:")[0]
              .substr(10)
              .split(" ");
            return {
              port: parseInt(i[0], 10),
              protocol: i[1],
              maxMessageSize: t
            };
          }
        }),
        (o.writeSctpDescription = function(e, t) {
          var r = [];
          return (
            (r =
              "DTLS/SCTP" !== e.protocol
                ? [
                    "m=" +
                      e.kind +
                      " 9 " +
                      e.protocol +
                      " " +
                      t.protocol +
                      "\r\n",
                    "c=IN IP4 0.0.0.0\r\n",
                    "a=sctp-port:" + t.port + "\r\n"
                  ]
                : [
                    "m=" + e.kind + " 9 " + e.protocol + " " + t.port + "\r\n",
                    "c=IN IP4 0.0.0.0\r\n",
                    "a=sctpmap:" + t.port + " " + t.protocol + " 65535\r\n"
                  ]),
            void 0 !== t.maxMessageSize &&
              r.push("a=max-message-size:" + t.maxMessageSize + "\r\n"),
            r.join("")
          );
        }),
        (o.generateSessionId = function() {
          return Math.random()
            .toString()
            .substr(2, 21);
        }),
        (o.writeSessionBoilerplate = function(e, t, r) {
          var n,
            a = void 0 !== t ? t : 2;
          return (
            (n = e || o.generateSessionId()),
            "v=0\r\no=" +
              (r || "thisisadapterortc") +
              " " +
              n +
              " " +
              a +
              " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
          );
        }),
        (o.writeMediaSection = function(e, t, r, n) {
          var a = o.writeRtpDescription(e.kind, t);
          if (
            ((a += o.writeIceParameters(e.iceGatherer.getLocalParameters())),
            (a += o.writeDtlsParameters(
              e.dtlsTransport.getLocalParameters(),
              "offer" === r ? "actpass" : "active"
            )),
            (a += "a=mid:" + e.mid + "\r\n"),
            e.direction
              ? (a += "a=" + e.direction + "\r\n")
              : e.rtpSender && e.rtpReceiver
              ? (a += "a=sendrecv\r\n")
              : e.rtpSender
              ? (a += "a=sendonly\r\n")
              : e.rtpReceiver
              ? (a += "a=recvonly\r\n")
              : (a += "a=inactive\r\n"),
            e.rtpSender)
          ) {
            var i = "msid:" + n.id + " " + e.rtpSender.track.id + "\r\n";
            (a += "a=" + i),
              (a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + i),
              e.sendEncodingParameters[0].rtx &&
                ((a +=
                  "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + i),
                (a +=
                  "a=ssrc-group:FID " +
                  e.sendEncodingParameters[0].ssrc +
                  " " +
                  e.sendEncodingParameters[0].rtx.ssrc +
                  "\r\n"));
          }
          return (
            (a +=
              "a=ssrc:" +
              e.sendEncodingParameters[0].ssrc +
              " cname:" +
              o.localCName +
              "\r\n"),
            e.rtpSender &&
              e.sendEncodingParameters[0].rtx &&
              (a +=
                "a=ssrc:" +
                e.sendEncodingParameters[0].rtx.ssrc +
                " cname:" +
                o.localCName +
                "\r\n"),
            a
          );
        }),
        (o.getDirection = function(e, t) {
          for (var r = o.splitLines(e), n = 0; n < r.length; n++)
            switch (r[n]) {
              case "a=sendrecv":
              case "a=sendonly":
              case "a=recvonly":
              case "a=inactive":
                return r[n].substr(2);
            }
          return t ? o.getDirection(t) : "sendrecv";
        }),
        (o.getKind = function(e) {
          return o
            .splitLines(e)[0]
            .split(" ")[0]
            .substr(2);
        }),
        (o.isRejected = function(e) {
          return "0" === e.split(" ", 2)[1];
        }),
        (o.parseMLine = function(e) {
          var t = o.splitLines(e),
            r = t[0].substr(2).split(" ");
          return {
            kind: r[0],
            port: parseInt(r[1], 10),
            protocol: r[2],
            fmt: r.slice(3).join(" ")
          };
        }),
        (o.parseOLine = function(e) {
          var t = o.matchPrefix(e, "o=")[0],
            r = t.substr(2).split(" ");
          return {
            username: r[0],
            sessionId: r[1],
            sessionVersion: parseInt(r[2], 10),
            netType: r[3],
            addressType: r[4],
            address: r[5]
          };
        }),
        (o.isValidSDP = function(e) {
          if ("string" != typeof e || 0 === e.length) return !1;
          for (var t = o.splitLines(e), r = 0; r < t.length; r++)
            if (t[r].length < 2 || "=" !== t[r].charAt(1)) return !1;
          return !0;
        }),
        (e.exports = o);
    },
    function(e, t, r) {
      "use strict";
      r.d(t, "b", function() {
        return l;
      }),
        r.d(t, "a", function() {
          return f;
        }),
        r.d(t, "d", function() {
          return p;
        }),
        r.d(t, "c", function() {
          return m;
        });
      var o = r(115),
        n = r.n(o),
        a = r(63),
        i = r.n(a),
        c = r(119),
        s = r.n(c),
        d = r(131),
        u = r.n(d),
        l = (function(e) {
          function t() {
            i()(this, t);
            var e = s()(
              this,
              (t.__proto__ || n()(t)).call(
                this,
                "can't process cross-origin image"
              )
            );
            return (e.name = "DropImageFetchError"), e;
          }
          return u()(t, e), t;
        })(Error),
        f = (function(e) {
          function t() {
            i()(this, t);
            var e = s()(
              this,
              (t.__proto__ || n()(t)).call(
                this,
                "drag-and-dropped file is not of type image and can't be decoded"
              )
            );
            return (e.name = "DropImageDecodeError"), e;
          }
          return u()(t, e), t;
        })(Error),
        p = (function(e) {
          function t() {
            i()(this, t);
            var e = s()(
              this,
              (t.__proto__ || n()(t)).call(
                this,
                "this browser has no Stream API support"
              )
            );
            return (e.name = "StreamApiNotSupportedError"), e;
          }
          return u()(t, e), t;
        })(Error),
        m = (function(e) {
          function t() {
            i()(this, t);
            var e = s()(
              this,
              (t.__proto__ || n()(t)).call(
                this,
                "camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP."
              )
            );
            return (e.name = "InsecureContextError"), e;
          }
          return u()(t, e), t;
        })(Error);
    },
    function(e, t, r) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.__esModule = !0;
      var n = r(120),
        a = o(n),
        i = r(122),
        c = o(i),
        s =
          "function" == typeof c.default && "symbol" == typeof a.default
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e &&
                  "function" == typeof c.default &&
                  e.constructor === c.default &&
                  e !== c.default.prototype
                  ? "symbol"
                  : typeof e;
              };
      t.default =
        "function" == typeof c.default && "symbol" === s(a.default)
          ? function(e) {
              return void 0 === e ? "undefined" : s(e);
            }
          : function(e) {
              return e &&
                "function" == typeof c.default &&
                e.constructor === c.default &&
                e !== c.default.prototype
                ? "symbol"
                : void 0 === e
                ? "undefined"
                : s(e);
            };
    },
    function(e, t) {
      t.f = Object.getOwnPropertySymbols;
    },
    function(e, t, r) {
      var o = r(50),
        n = r(35).concat("length", "prototype");
      t.f =
        Object.getOwnPropertyNames ||
        function(e) {
          return o(e, n);
        };
    },
    function(e, t, r) {
      var o = r(41),
        n = r(17),
        a = r(14),
        i = r(29),
        c = r(10),
        s = r(48),
        d = Object.getOwnPropertyDescriptor;
      t.f = r(8)
        ? d
        : function(e, t) {
            if (((e = a(e)), (t = i(t, !0)), s))
              try {
                return d(e, t);
              } catch (e) {}
            if (c(e, t)) return n(!o.f.call(e, t), e[t]);
          };
    },
    function(e, t, r) {
      "use strict";
      t.__esModule = !0;
      var o = r(144),
        n = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(o);
      t.default = function(e) {
        if (Array.isArray(e)) {
          for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
          return r;
        }
        return (0, n.default)(e);
      };
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        function(e) {
          function o(e) {
            e.component("qrcode-stream", a.a),
              e.component("qrcode-capture", c.a),
              e.component("qrcode-drop-zone", d.a);
          }
          t.install = o;
          var n = r(73),
            a = r.n(n),
            i = r(142),
            c = r.n(i),
            s = r(149),
            d = r.n(s);
          r.d(t, "QrcodeStream", function() {
            return a.a;
          }),
            r.d(t, "QrcodeCapture", function() {
              return c.a;
            }),
            r.d(t, "QrcodeDropZone", function() {
              return d.a;
            });
          var u = { install: o };
          t.default = u;
          var l = null;
          "undefined" != typeof window
            ? (l = window.Vue)
            : void 0 !== e && (l = e.Vue),
            l && l.use(u);
        }.call(t, r(72));
    },
    function(e, t) {
      var r;
      r = (function() {
        return this;
      })();
      try {
        r = r || Function("return this")() || (0, eval)("this");
      } catch (e) {
        "object" == typeof window && (r = window);
      }
      e.exports = r;
    },
    function(e, t, r) {
      r(74);
      var o = r(20)(r(75), r(141), "data-v-1f90552a", null);
      e.exports = o.exports;
    },
    function(e, t) {},
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var o = r(45),
        n = r.n(o),
        a = r(11),
        i = r.n(a),
        c = r(12),
        s = r.n(c),
        d = r(37),
        u = r(98),
        l = r(99),
        f = r(43),
        p = r.n(f),
        m = r(44),
        v = r.n(m);
      t.default = {
        name: "qrcode-stream",
        mixins: [p.a],
        props: {
          camera: {
            type: String,
            default: "auto",
            validator: function(e) {
              return ["auto", "rear", "front", "off", "id"].includes(e);
            }
          },
          deviceId: { type: String, default: "" },
          track: { type: [Function, Boolean], default: !0 },
          worker: { type: Function, default: v.a }
        },
        data: function() {
          return {
            cameraInstance: null,
            destroyed: !1,
            stopScanning: function() {}
          };
        },
        computed: {
          shouldStream: function() {
            return !1 === this.destroyed && "off" !== this.camera;
          },
          shouldScan: function() {
            return !0 === this.shouldStream && null !== this.cameraInstance;
          },
          scanInterval: function() {
            return !1 === this.track ? 500 : 40;
          },
          trackRepaintFunction: function() {
            return !0 === this.track
              ? Object(u.a)({ color: "#ff0000" })
              : !1 === this.track
              ? void 0
              : this.track;
          },
          constraints: function() {
            var e = {
              audio: !1,
              video: {
                width: { min: 360, ideal: 640, max: 1920 },
                height: { min: 240, ideal: 480, max: 1080 }
              }
            };
            switch (this.camera) {
              case "auto":
                return (e.video.facingMode = { ideal: "environment" }), e;
              case "rear":
                return (e.video.facingMode = { exact: "environment" }), e;
              case "front":
                return (e.video.facingMode = { exact: "user" }), e;
              case "id":
                return (
                  (e.video.facingMode = { ideal: "" }),
                  (e.video.deviceId = { exact: this.deviceId }),
                  e
                );
              case "off":
              default:
                return;
            }
          }
        },
        watch: {
          shouldStream: function(e) {
            if (!e) {
              var t = this.cameraInstance.captureFrame();
              this.paintPauseFrame(t);
            }
          },
          shouldScan: function(e) {
            e
              ? (this.clearPauseFrame(),
                this.clearTrackingLayer(),
                this.startScanning())
              : this.stopScanning();
          },
          constraints: function() {
            this.$emit("init", this.init());
          }
        },
        mounted: function() {
          this.$emit("init", this.init());
        },
        beforeDestroy: function() {
          this.beforeResetCamera(), this.stopScanning(), (this.destroyed = !0);
        },
        methods: {
          init: function() {
            var e = this;
            return s()(
              i.a.mark(function t() {
                return i.a.wrap(
                  function(t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          if (
                            (e.beforeResetCamera(), void 0 !== e.constraints)
                          ) {
                            t.next = 5;
                            break;
                          }
                          (e.cameraInstance = null), (t.next = 9);
                          break;
                        case 5:
                          return (
                            (t.next = 7),
                            Object(l.a)(e.constraints, e.$refs.video)
                          );
                        case 7:
                          (e.cameraInstance = t.sent),
                            e.destroyed && e.cameraInstance.stop();
                        case 9:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  e
                );
              })
            )();
          },
          startScanning: function() {
            var e = this,
              t = function(t) {
                e.onDetect(n.a.resolve(t));
              };
            this.stopScanning = Object(d.a)(this.worker, this.cameraInstance, {
              detectHandler: t,
              locateHandler: this.onLocate,
              minDelay: this.scanInterval
            });
          },
          beforeResetCamera: function() {
            null !== this.cameraInstance &&
              (this.cameraInstance.stop(), (this.cameraInstance = null));
          },
          onLocate: function(e) {
            void 0 === this.trackRepaintFunction || null === e
              ? this.clearTrackingLayer()
              : this.repaintTrackingLayer(e);
          },
          repaintTrackingLayer: function(e) {
            var t = this,
              r = this.$refs.video,
              o = this.$refs.trackingLayer,
              n = o.getContext("2d"),
              a = r.offsetWidth,
              i = r.offsetHeight,
              c = r.videoWidth,
              s = r.videoHeight,
              d = Math.max(a / c, i / s),
              u = c * d,
              l = s * d,
              f = u / c,
              p = l / s,
              m = (a - u) / 2,
              v = (i - l) / 2,
              h = {};
            for (var k in e)
              h[k] = {
                x: Math.floor(e[k].x * f + m),
                y: Math.floor(e[k].y * p + v)
              };
            window.requestAnimationFrame(function() {
              (o.width = a), (o.height = i), t.trackRepaintFunction(h, n);
            });
          },
          clearTrackingLayer: function() {
            var e = this.$refs.trackingLayer,
              t = e.getContext("2d");
            window.requestAnimationFrame(function() {
              t.clearRect(0, 0, e.width, e.height);
            });
          },
          paintPauseFrame: function(e) {
            var t = this.$refs.pauseFrame,
              r = t.getContext("2d");
            window.requestAnimationFrame(function() {
              (t.width = e.width),
                (t.height = e.height),
                r.putImageData(e, 0, 0);
            });
          },
          clearPauseFrame: function() {
            var e = this.$refs.pauseFrame,
              t = e.getContext("2d");
            window.requestAnimationFrame(function() {
              t.clearRect(0, 0, e.width, e.height);
            });
          }
        }
      };
    },
    function(e, t, r) {
      r(46), r(25), r(53), r(86), r(94), r(95), (e.exports = r(0).Promise);
    },
    function(e, t, r) {
      var o = r(26),
        n = r(27);
      e.exports = function(e) {
        return function(t, r) {
          var a,
            i,
            c = String(n(t)),
            s = o(r),
            d = c.length;
          return s < 0 || s >= d
            ? e
              ? ""
              : void 0
            : ((a = c.charCodeAt(s)),
              a < 55296 ||
              a > 56319 ||
              s + 1 === d ||
              (i = c.charCodeAt(s + 1)) < 56320 ||
              i > 57343
                ? e
                  ? c.charAt(s)
                  : a
                : e
                ? c.slice(s, s + 2)
                : i - 56320 + ((a - 55296) << 10) + 65536);
        };
      };
    },
    function(e, t, r) {
      "use strict";
      var o = r(30),
        n = r(17),
        a = r(23),
        i = {};
      r(9)(i, r(2)("iterator"), function() {
        return this;
      }),
        (e.exports = function(e, t, r) {
          (e.prototype = o(i, { next: n(1, r) })), a(e, t + " Iterator");
        });
    },
    function(e, t, r) {
      var o = r(4),
        n = r(5),
        a = r(31);
      e.exports = r(8)
        ? Object.defineProperties
        : function(e, t) {
            n(e);
            for (var r, i = a(t), c = i.length, s = 0; c > s; )
              o.f(e, (r = i[s++]), t[r]);
            return e;
          };
    },
    function(e, t, r) {
      var o = r(19);
      e.exports = Object("z").propertyIsEnumerable(0)
        ? Object
        : function(e) {
            return "String" == o(e) ? e.split("") : Object(e);
          };
    },
    function(e, t, r) {
      var o = r(14),
        n = r(32),
        a = r(82);
      e.exports = function(e) {
        return function(t, r, i) {
          var c,
            s = o(t),
            d = n(s.length),
            u = a(i, d);
          if (e && r != r) {
            for (; d > u; ) if ((c = s[u++]) != c) return !0;
          } else
            for (; d > u; u++)
              if ((e || u in s) && s[u] === r) return e || u || 0;
          return !e && -1;
        };
      };
    },
    function(e, t, r) {
      var o = r(26),
        n = Math.max,
        a = Math.min;
      e.exports = function(e, t) {
        return (e = o(e)), e < 0 ? n(e + t, 0) : a(e, t);
      };
    },
    function(e, t, r) {
      "use strict";
      var o = r(84),
        n = r(85),
        a = r(18),
        i = r(14);
      (e.exports = r(47)(
        Array,
        "Array",
        function(e, t) {
          (this._t = i(e)), (this._i = 0), (this._k = t);
        },
        function() {
          var e = this._t,
            t = this._k,
            r = this._i++;
          return !e || r >= e.length
            ? ((this._t = void 0), n(1))
            : "keys" == t
            ? n(0, r)
            : "values" == t
            ? n(0, e[r])
            : n(0, [r, e[r]]);
        },
        "values"
      )),
        (a.Arguments = a.Array),
        o("keys"),
        o("values"),
        o("entries");
    },
    function(e, t) {
      e.exports = function() {};
    },
    function(e, t) {
      e.exports = function(e, t) {
        return { value: t, done: !!e };
      };
    },
    function(e, t, r) {
      "use strict";
      var o,
        n,
        a,
        i,
        c = r(15),
        s = r(1),
        d = r(13),
        u = r(54),
        l = r(3),
        f = r(7),
        p = r(21),
        m = r(87),
        v = r(88),
        h = r(58),
        k = r(59).set,
        C = r(90)(),
        y = r(36),
        g = r(60),
        B = r(91),
        w = r(61),
        P = s.TypeError,
        b = s.process,
        S = b && b.versions,
        T = (S && S.v8) || "",
        x = s.Promise,
        R = "process" == u(b),
        _ = function() {},
        E = (n = y.f),
        M = !!(function() {
          try {
            var e = x.resolve(1),
              t = ((e.constructor = {})[r(2)("species")] = function(e) {
                e(_, _);
              });
            return (
              (R || "function" == typeof PromiseRejectionEvent) &&
              e.then(_) instanceof t &&
              0 !== T.indexOf("6.6") &&
              -1 === B.indexOf("Chrome/66")
            );
          } catch (e) {}
        })(),
        O = function(e) {
          var t;
          return !(!f(e) || "function" != typeof (t = e.then)) && t;
        },
        L = function(e, t) {
          if (!e._n) {
            e._n = !0;
            var r = e._c;
            C(function() {
              for (var o = e._v, n = 1 == e._s, a = 0; r.length > a; )
                !(function(t) {
                  var r,
                    a,
                    i,
                    c = n ? t.ok : t.fail,
                    s = t.resolve,
                    d = t.reject,
                    u = t.domain;
                  try {
                    c
                      ? (n || (2 == e._h && I(e), (e._h = 1)),
                        !0 === c
                          ? (r = o)
                          : (u && u.enter(),
                            (r = c(o)),
                            u && (u.exit(), (i = !0))),
                        r === t.promise
                          ? d(P("Promise-chain cycle"))
                          : (a = O(r))
                          ? a.call(r, s, d)
                          : s(r))
                      : d(o);
                  } catch (e) {
                    u && !i && u.exit(), d(e);
                  }
                })(r[a++]);
              (e._c = []), (e._n = !1), t && !e._h && j(e);
            });
          }
        },
        j = function(e) {
          k.call(s, function() {
            var t,
              r,
              o,
              n = e._v,
              a = D(e);
            if (
              (a &&
                ((t = g(function() {
                  R
                    ? b.emit("unhandledRejection", n, e)
                    : (r = s.onunhandledrejection)
                    ? r({ promise: e, reason: n })
                    : (o = s.console) &&
                      o.error &&
                      o.error("Unhandled promise rejection", n);
                })),
                (e._h = R || D(e) ? 2 : 1)),
              (e._a = void 0),
              a && t.e)
            )
              throw t.v;
          });
        },
        D = function(e) {
          return 1 !== e._h && 0 === (e._a || e._c).length;
        },
        I = function(e) {
          k.call(s, function() {
            var t;
            R
              ? b.emit("rejectionHandled", e)
              : (t = s.onrejectionhandled) && t({ promise: e, reason: e._v });
          });
        },
        N = function(e) {
          var t = this;
          t._d ||
            ((t._d = !0),
            (t = t._w || t),
            (t._v = e),
            (t._s = 2),
            t._a || (t._a = t._c.slice()),
            L(t, !0));
        },
        A = function(e) {
          var t,
            r = this;
          if (!r._d) {
            (r._d = !0), (r = r._w || r);
            try {
              if (r === e) throw P("Promise can't be resolved itself");
              (t = O(e))
                ? C(function() {
                    var o = { _w: r, _d: !1 };
                    try {
                      t.call(e, d(A, o, 1), d(N, o, 1));
                    } catch (e) {
                      N.call(o, e);
                    }
                  })
                : ((r._v = e), (r._s = 1), L(r, !1));
            } catch (e) {
              N.call({ _w: r, _d: !1 }, e);
            }
          }
        };
      M ||
        ((x = function(e) {
          m(this, x, "Promise", "_h"), p(e), o.call(this);
          try {
            e(d(A, this, 1), d(N, this, 1));
          } catch (e) {
            N.call(this, e);
          }
        }),
        (o = function(e) {
          (this._c = []),
            (this._a = void 0),
            (this._s = 0),
            (this._d = !1),
            (this._v = void 0),
            (this._h = 0),
            (this._n = !1);
        }),
        (o.prototype = r(92)(x.prototype, {
          then: function(e, t) {
            var r = E(h(this, x));
            return (
              (r.ok = "function" != typeof e || e),
              (r.fail = "function" == typeof t && t),
              (r.domain = R ? b.domain : void 0),
              this._c.push(r),
              this._a && this._a.push(r),
              this._s && L(this, !1),
              r.promise
            );
          },
          catch: function(e) {
            return this.then(void 0, e);
          }
        })),
        (a = function() {
          var e = new o();
          (this.promise = e),
            (this.resolve = d(A, e, 1)),
            (this.reject = d(N, e, 1));
        }),
        (y.f = E = function(e) {
          return e === x || e === i ? new a(e) : n(e);
        })),
        l(l.G + l.W + l.F * !M, { Promise: x }),
        r(23)(x, "Promise"),
        r(93)("Promise"),
        (i = r(0).Promise),
        l(l.S + l.F * !M, "Promise", {
          reject: function(e) {
            var t = E(this);
            return (0, t.reject)(e), t.promise;
          }
        }),
        l(l.S + l.F * (c || !M), "Promise", {
          resolve: function(e) {
            return w(c && this === i ? x : this, e);
          }
        }),
        l(
          l.S +
            l.F *
              !(
                M &&
                r(62)(function(e) {
                  x.all(e).catch(_);
                })
              ),
          "Promise",
          {
            all: function(e) {
              var t = this,
                r = E(t),
                o = r.resolve,
                n = r.reject,
                a = g(function() {
                  var r = [],
                    a = 0,
                    i = 1;
                  v(e, !1, function(e) {
                    var c = a++,
                      s = !1;
                    r.push(void 0),
                      i++,
                      t.resolve(e).then(function(e) {
                        s || ((s = !0), (r[c] = e), --i || o(r));
                      }, n);
                  }),
                    --i || o(r);
                });
              return a.e && n(a.v), r.promise;
            },
            race: function(e) {
              var t = this,
                r = E(t),
                o = r.reject,
                n = g(function() {
                  v(e, !1, function(e) {
                    t.resolve(e).then(r.resolve, o);
                  });
                });
              return n.e && o(n.v), r.promise;
            }
          }
        );
    },
    function(e, t) {
      e.exports = function(e, t, r, o) {
        if (!(e instanceof t) || (void 0 !== o && o in e))
          throw TypeError(r + ": incorrect invocation!");
        return e;
      };
    },
    function(e, t, r) {
      var o = r(13),
        n = r(55),
        a = r(56),
        i = r(5),
        c = r(32),
        s = r(57),
        d = {},
        u = {},
        t = (e.exports = function(e, t, r, l, f) {
          var p,
            m,
            v,
            h,
            k = f
              ? function() {
                  return e;
                }
              : s(e),
            C = o(r, l, t ? 2 : 1),
            y = 0;
          if ("function" != typeof k) throw TypeError(e + " is not iterable!");
          if (a(k)) {
            for (p = c(e.length); p > y; y++)
              if (
                (h = t ? C(i((m = e[y]))[0], m[1]) : C(e[y])) === d ||
                h === u
              )
                return h;
          } else
            for (v = k.call(e); !(m = v.next()).done; )
              if ((h = n(v, C, m.value, t)) === d || h === u) return h;
        });
      (t.BREAK = d), (t.RETURN = u);
    },
    function(e, t) {
      e.exports = function(e, t, r) {
        var o = void 0 === r;
        switch (t.length) {
          case 0:
            return o ? e() : e.call(r);
          case 1:
            return o ? e(t[0]) : e.call(r, t[0]);
          case 2:
            return o ? e(t[0], t[1]) : e.call(r, t[0], t[1]);
          case 3:
            return o ? e(t[0], t[1], t[2]) : e.call(r, t[0], t[1], t[2]);
          case 4:
            return o
              ? e(t[0], t[1], t[2], t[3])
              : e.call(r, t[0], t[1], t[2], t[3]);
        }
        return e.apply(r, t);
      };
    },
    function(e, t, r) {
      var o = r(1),
        n = r(59).set,
        a = o.MutationObserver || o.WebKitMutationObserver,
        i = o.process,
        c = o.Promise,
        s = "process" == r(19)(i);
      e.exports = function() {
        var e,
          t,
          r,
          d = function() {
            var o, n;
            for (s && (o = i.domain) && o.exit(); e; ) {
              (n = e.fn), (e = e.next);
              try {
                n();
              } catch (o) {
                throw (e ? r() : (t = void 0), o);
              }
            }
            (t = void 0), o && o.enter();
          };
        if (s)
          r = function() {
            i.nextTick(d);
          };
        else if (!a || (o.navigator && o.navigator.standalone))
          if (c && c.resolve) {
            var u = c.resolve(void 0);
            r = function() {
              u.then(d);
            };
          } else
            r = function() {
              n.call(o, d);
            };
        else {
          var l = !0,
            f = document.createTextNode("");
          new a(d).observe(f, { characterData: !0 }),
            (r = function() {
              f.data = l = !l;
            });
        }
        return function(o) {
          var n = { fn: o, next: void 0 };
          t && (t.next = n), e || ((e = n), r()), (t = n);
        };
      };
    },
    function(e, t, r) {
      var o = r(1),
        n = o.navigator;
      e.exports = (n && n.userAgent) || "";
    },
    function(e, t, r) {
      var o = r(9);
      e.exports = function(e, t, r) {
        for (var n in t) r && e[n] ? (e[n] = t[n]) : o(e, n, t[n]);
        return e;
      };
    },
    function(e, t, r) {
      "use strict";
      var o = r(1),
        n = r(0),
        a = r(4),
        i = r(8),
        c = r(2)("species");
      e.exports = function(e) {
        var t = "function" == typeof n[e] ? n[e] : o[e];
        i &&
          t &&
          !t[c] &&
          a.f(t, c, {
            configurable: !0,
            get: function() {
              return this;
            }
          });
      };
    },
    function(e, t, r) {
      "use strict";
      var o = r(3),
        n = r(0),
        a = r(1),
        i = r(58),
        c = r(61);
      o(o.P + o.R, "Promise", {
        finally: function(e) {
          var t = i(this, n.Promise || a.Promise),
            r = "function" == typeof e;
          return this.then(
            r
              ? function(r) {
                  return c(t, e()).then(function() {
                    return r;
                  });
                }
              : e,
            r
              ? function(r) {
                  return c(t, e()).then(function() {
                    throw r;
                  });
                }
              : e
          );
        }
      });
    },
    function(e, t, r) {
      "use strict";
      var o = r(3),
        n = r(36),
        a = r(60);
      o(o.S, "Promise", {
        try: function(e) {
          var t = n.f(this),
            r = a(e);
          return (r.e ? t.reject : t.resolve)(r.v), t.promise;
        }
      });
    },
    function(e, t, r) {
      var o =
          (function() {
            return this;
          })() || Function("return this")(),
        n =
          o.regeneratorRuntime &&
          Object.getOwnPropertyNames(o).indexOf("regeneratorRuntime") >= 0,
        a = n && o.regeneratorRuntime;
      if (((o.regeneratorRuntime = void 0), (e.exports = r(97)), n))
        o.regeneratorRuntime = a;
      else
        try {
          delete o.regeneratorRuntime;
        } catch (e) {
          o.regeneratorRuntime = void 0;
        }
    },
    function(e, t) {
      !(function(t) {
        "use strict";
        function r(e, t, r, o) {
          var a = t && t.prototype instanceof n ? t : n,
            i = Object.create(a.prototype),
            c = new p(o || []);
          return (i._invoke = d(e, r, c)), i;
        }
        function o(e, t, r) {
          try {
            return { type: "normal", arg: e.call(t, r) };
          } catch (e) {
            return { type: "throw", arg: e };
          }
        }
        function n() {}
        function a() {}
        function i() {}
        function c(e) {
          ["next", "throw", "return"].forEach(function(t) {
            e[t] = function(e) {
              return this._invoke(t, e);
            };
          });
        }
        function s(e) {
          function t(r, n, a, i) {
            var c = o(e[r], e, n);
            if ("throw" !== c.type) {
              var s = c.arg,
                d = s.value;
              return d && "object" == typeof d && C.call(d, "__await")
                ? Promise.resolve(d.__await).then(
                    function(e) {
                      t("next", e, a, i);
                    },
                    function(e) {
                      t("throw", e, a, i);
                    }
                  )
                : Promise.resolve(d).then(function(e) {
                    (s.value = e), a(s);
                  }, i);
            }
            i(c.arg);
          }
          function r(e, r) {
            function o() {
              return new Promise(function(o, n) {
                t(e, r, o, n);
              });
            }
            return (n = n ? n.then(o, o) : o());
          }
          var n;
          this._invoke = r;
        }
        function d(e, t, r) {
          var n = S;
          return function(a, i) {
            if (n === x) throw new Error("Generator is already running");
            if (n === R) {
              if ("throw" === a) throw i;
              return v();
            }
            for (r.method = a, r.arg = i; ; ) {
              var c = r.delegate;
              if (c) {
                var s = u(c, r);
                if (s) {
                  if (s === _) continue;
                  return s;
                }
              }
              if ("next" === r.method) r.sent = r._sent = r.arg;
              else if ("throw" === r.method) {
                if (n === S) throw ((n = R), r.arg);
                r.dispatchException(r.arg);
              } else "return" === r.method && r.abrupt("return", r.arg);
              n = x;
              var d = o(e, t, r);
              if ("normal" === d.type) {
                if (((n = r.done ? R : T), d.arg === _)) continue;
                return { value: d.arg, done: r.done };
              }
              "throw" === d.type &&
                ((n = R), (r.method = "throw"), (r.arg = d.arg));
            }
          };
        }
        function u(e, t) {
          var r = e.iterator[t.method];
          if (r === h) {
            if (((t.delegate = null), "throw" === t.method)) {
              if (
                e.iterator.return &&
                ((t.method = "return"),
                (t.arg = h),
                u(e, t),
                "throw" === t.method)
              )
                return _;
              (t.method = "throw"),
                (t.arg = new TypeError(
                  "The iterator does not provide a 'throw' method"
                ));
            }
            return _;
          }
          var n = o(r, e.iterator, t.arg);
          if ("throw" === n.type)
            return (
              (t.method = "throw"), (t.arg = n.arg), (t.delegate = null), _
            );
          var a = n.arg;
          return a
            ? a.done
              ? ((t[e.resultName] = a.value),
                (t.next = e.nextLoc),
                "return" !== t.method && ((t.method = "next"), (t.arg = h)),
                (t.delegate = null),
                _)
              : a
            : ((t.method = "throw"),
              (t.arg = new TypeError("iterator result is not an object")),
              (t.delegate = null),
              _);
        }
        function l(e) {
          var t = { tryLoc: e[0] };
          1 in e && (t.catchLoc = e[1]),
            2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
            this.tryEntries.push(t);
        }
        function f(e) {
          var t = e.completion || {};
          (t.type = "normal"), delete t.arg, (e.completion = t);
        }
        function p(e) {
          (this.tryEntries = [{ tryLoc: "root" }]),
            e.forEach(l, this),
            this.reset(!0);
        }
        function m(e) {
          if (e) {
            var t = e[g];
            if (t) return t.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) {
              var r = -1,
                o = function t() {
                  for (; ++r < e.length; )
                    if (C.call(e, r)) return (t.value = e[r]), (t.done = !1), t;
                  return (t.value = h), (t.done = !0), t;
                };
              return (o.next = o);
            }
          }
          return { next: v };
        }
        function v() {
          return { value: h, done: !0 };
        }
        var h,
          k = Object.prototype,
          C = k.hasOwnProperty,
          y = "function" == typeof Symbol ? Symbol : {},
          g = y.iterator || "@@iterator",
          B = y.asyncIterator || "@@asyncIterator",
          w = y.toStringTag || "@@toStringTag",
          P = "object" == typeof e,
          b = t.regeneratorRuntime;
        if (b) return void (P && (e.exports = b));
        (b = t.regeneratorRuntime = P ? e.exports : {}), (b.wrap = r);
        var S = "suspendedStart",
          T = "suspendedYield",
          x = "executing",
          R = "completed",
          _ = {},
          E = {};
        E[g] = function() {
          return this;
        };
        var M = Object.getPrototypeOf,
          O = M && M(M(m([])));
        O && O !== k && C.call(O, g) && (E = O);
        var L = (i.prototype = n.prototype = Object.create(E));
        (a.prototype = L.constructor = i),
          (i.constructor = a),
          (i[w] = a.displayName = "GeneratorFunction"),
          (b.isGeneratorFunction = function(e) {
            var t = "function" == typeof e && e.constructor;
            return (
              !!t &&
              (t === a || "GeneratorFunction" === (t.displayName || t.name))
            );
          }),
          (b.mark = function(e) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(e, i)
                : ((e.__proto__ = i), w in e || (e[w] = "GeneratorFunction")),
              (e.prototype = Object.create(L)),
              e
            );
          }),
          (b.awrap = function(e) {
            return { __await: e };
          }),
          c(s.prototype),
          (s.prototype[B] = function() {
            return this;
          }),
          (b.AsyncIterator = s),
          (b.async = function(e, t, o, n) {
            var a = new s(r(e, t, o, n));
            return b.isGeneratorFunction(t)
              ? a
              : a.next().then(function(e) {
                  return e.done ? e.value : a.next();
                });
          }),
          c(L),
          (L[w] = "Generator"),
          (L[g] = function() {
            return this;
          }),
          (L.toString = function() {
            return "[object Generator]";
          }),
          (b.keys = function(e) {
            var t = [];
            for (var r in e) t.push(r);
            return (
              t.reverse(),
              function r() {
                for (; t.length; ) {
                  var o = t.pop();
                  if (o in e) return (r.value = o), (r.done = !1), r;
                }
                return (r.done = !0), r;
              }
            );
          }),
          (b.values = m),
          (p.prototype = {
            constructor: p,
            reset: function(e) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = h),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = h),
                this.tryEntries.forEach(f),
                !e)
              )
                for (var t in this)
                  "t" === t.charAt(0) &&
                    C.call(this, t) &&
                    !isNaN(+t.slice(1)) &&
                    (this[t] = h);
            },
            stop: function() {
              this.done = !0;
              var e = this.tryEntries[0],
                t = e.completion;
              if ("throw" === t.type) throw t.arg;
              return this.rval;
            },
            dispatchException: function(e) {
              function t(t, o) {
                return (
                  (a.type = "throw"),
                  (a.arg = e),
                  (r.next = t),
                  o && ((r.method = "next"), (r.arg = h)),
                  !!o
                );
              }
              if (this.done) throw e;
              for (var r = this, o = this.tryEntries.length - 1; o >= 0; --o) {
                var n = this.tryEntries[o],
                  a = n.completion;
                if ("root" === n.tryLoc) return t("end");
                if (n.tryLoc <= this.prev) {
                  var i = C.call(n, "catchLoc"),
                    c = C.call(n, "finallyLoc");
                  if (i && c) {
                    if (this.prev < n.catchLoc) return t(n.catchLoc, !0);
                    if (this.prev < n.finallyLoc) return t(n.finallyLoc);
                  } else if (i) {
                    if (this.prev < n.catchLoc) return t(n.catchLoc, !0);
                  } else {
                    if (!c)
                      throw new Error("try statement without catch or finally");
                    if (this.prev < n.finallyLoc) return t(n.finallyLoc);
                  }
                }
              }
            },
            abrupt: function(e, t) {
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var o = this.tryEntries[r];
                if (
                  o.tryLoc <= this.prev &&
                  C.call(o, "finallyLoc") &&
                  this.prev < o.finallyLoc
                ) {
                  var n = o;
                  break;
                }
              }
              n &&
                ("break" === e || "continue" === e) &&
                n.tryLoc <= t &&
                t <= n.finallyLoc &&
                (n = null);
              var a = n ? n.completion : {};
              return (
                (a.type = e),
                (a.arg = t),
                n
                  ? ((this.method = "next"), (this.next = n.finallyLoc), _)
                  : this.complete(a)
              );
            },
            complete: function(e, t) {
              if ("throw" === e.type) throw e.arg;
              return (
                "break" === e.type || "continue" === e.type
                  ? (this.next = e.arg)
                  : "return" === e.type
                  ? ((this.rval = this.arg = e.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === e.type && t && (this.next = t),
                _
              );
            },
            finish: function(e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var r = this.tryEntries[t];
                if (r.finallyLoc === e)
                  return this.complete(r.completion, r.afterLoc), f(r), _;
              }
            },
            catch: function(e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var r = this.tryEntries[t];
                if (r.tryLoc === e) {
                  var o = r.completion;
                  if ("throw" === o.type) {
                    var n = o.arg;
                    f(r);
                  }
                  return n;
                }
              }
              throw new Error("illegal catch attempt");
            },
            delegateYield: function(e, t, r) {
              return (
                (this.delegate = { iterator: m(e), resultName: t, nextLoc: r }),
                "next" === this.method && (this.arg = h),
                _
              );
            }
          });
      })(
        (function() {
          return this;
        })() || Function("return this")()
      );
    },
    function(e, t, r) {
      "use strict";
      function o(e) {
        var t = e.color;
        return function(e, r) {
          var o = e.topLeftCorner,
            n = e.topRightCorner,
            a = e.bottomLeftCorner,
            i = e.bottomRightCorner;
          (r.strokeStyle = t),
            r.beginPath(),
            r.moveTo(o.x, o.y),
            r.lineTo(a.x, a.y),
            r.lineTo(i.x, i.y),
            r.lineTo(n.x, n.y),
            r.lineTo(o.x, o.y),
            r.closePath(),
            r.stroke();
        };
      }
      t.a = o;
    },
    function(e, t, r) {
      "use strict";
      var o = r(11),
        n = r.n(o),
        a = r(12),
        i = r.n(a),
        c = r(63),
        s = r.n(c),
        d = r(100),
        u = r.n(d),
        l = r(104),
        f = r.n(l),
        p = r(65),
        m = r(42),
        v = r(38),
        h = (function() {
          function e(t, r) {
            s()(this, e), (this.videoEl = t), (this.stream = r);
          }
          return (
            u()(e, [
              {
                key: "stop",
                value: function() {
                  this.stream.getTracks().forEach(function(e) {
                    return e.stop();
                  });
                }
              },
              {
                key: "captureFrame",
                value: function() {
                  return Object(m.c)(this.videoEl);
                }
              }
            ]),
            e
          );
        })(),
        k = !0 !== window.isSecureContext,
        C = !(
          navigator &&
          (navigator.getUserMedia ||
            (navigator.mediaDevices && navigator.mediaDevices.getUserMedia))
        ),
        y = !1;
      t.a = (function() {
        var e = i()(
          n.a.mark(function e(t, r) {
            var o;
            return n.a.wrap(
              function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if (!k) {
                        e.next = 2;
                        break;
                      }
                      throw new p.c();
                    case 2:
                      if (!C) {
                        e.next = 4;
                        break;
                      }
                      throw new p.d();
                    case 4:
                      return (
                        !1 === y && (f()({ window: window }), (y = !0)),
                        (e.next = 7),
                        navigator.mediaDevices.getUserMedia(t)
                      );
                    case 7:
                      return (
                        (o = e.sent),
                        void 0 !== r.srcObject
                          ? (r.srcObject = o)
                          : void 0 !== r.mozSrcObject
                          ? (r.mozSrcObject = o)
                          : window.URL.createObjectURL
                          ? (r.src = window.URL.createObjectURL(o))
                          : window.webkitURL
                          ? (r.src = window.webkitURL.createObjectURL(o))
                          : (r.src = o),
                        (e.next = 11),
                        Object(v.a)(r, "loadeddata")
                      );
                    case 11:
                      return e.abrupt("return", new h(r, o));
                    case 12:
                    case "end":
                      return e.stop();
                  }
              },
              e,
              this
            );
          })
        );
        return function(t, r) {
          return e.apply(this, arguments);
        };
      })();
    },
    function(e, t, r) {
      "use strict";
      t.__esModule = !0;
      var o = r(101),
        n = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(o);
      t.default = (function() {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var o = t[r];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              (0, n.default)(e, o.key, o);
          }
        }
        return function(t, r, o) {
          return r && e(t.prototype, r), o && e(t, o), t;
        };
      })();
    },
    function(e, t, r) {
      e.exports = { default: r(102), __esModule: !0 };
    },
    function(e, t, r) {
      r(103);
      var o = r(0).Object;
      e.exports = function(e, t, r) {
        return o.defineProperty(e, t, r);
      };
    },
    function(e, t, r) {
      var o = r(3);
      o(o.S + o.F * !r(8), "Object", { defineProperty: r(4).f });
    },
    function(e, t, r) {
      "use strict";
      var o = r(6);
      e.exports = function(e, t) {
        var n = e && e.window,
          a = { shimChrome: !0, shimFirefox: !0, shimEdge: !0, shimSafari: !0 };
        for (var i in t) hasOwnProperty.call(t, i) && (a[i] = t[i]);
        var c = o.log,
          s = o.detectBrowser(n),
          d = r(105) || null,
          u = r(107) || null,
          l = r(111) || null,
          f = r(113) || null,
          p = r(114) || null,
          m = {
            browserDetails: s,
            commonShim: p,
            extractVersion: o.extractVersion,
            disableLog: o.disableLog,
            disableWarnings: o.disableWarnings
          };
        switch (s.browser) {
          case "chrome":
            if (!d || !d.shimPeerConnection || !a.shimChrome)
              return (
                c("Chrome shim is not included in this adapter release."), m
              );
            c("adapter.js shimming chrome."),
              (m.browserShim = d),
              p.shimCreateObjectURL(n),
              d.shimGetUserMedia(n),
              d.shimMediaStream(n),
              d.shimSourceObject(n),
              d.shimPeerConnection(n),
              d.shimOnTrack(n),
              d.shimAddTrackRemoveTrack(n),
              d.shimGetSendersWithDtmf(n),
              d.shimSenderReceiverGetStats(n),
              d.fixNegotiationNeeded(n),
              p.shimRTCIceCandidate(n),
              p.shimMaxMessageSize(n),
              p.shimSendThrowTypeError(n);
            break;
          case "firefox":
            if (!l || !l.shimPeerConnection || !a.shimFirefox)
              return (
                c("Firefox shim is not included in this adapter release."), m
              );
            c("adapter.js shimming firefox."),
              (m.browserShim = l),
              p.shimCreateObjectURL(n),
              l.shimGetUserMedia(n),
              l.shimSourceObject(n),
              l.shimPeerConnection(n),
              l.shimOnTrack(n),
              l.shimRemoveStream(n),
              l.shimSenderGetStats(n),
              l.shimReceiverGetStats(n),
              l.shimRTCDataChannel(n),
              p.shimRTCIceCandidate(n),
              p.shimMaxMessageSize(n),
              p.shimSendThrowTypeError(n);
            break;
          case "edge":
            if (!u || !u.shimPeerConnection || !a.shimEdge)
              return (
                c("MS edge shim is not included in this adapter release."), m
              );
            c("adapter.js shimming edge."),
              (m.browserShim = u),
              p.shimCreateObjectURL(n),
              u.shimGetUserMedia(n),
              u.shimPeerConnection(n),
              u.shimReplaceTrack(n),
              u.shimGetDisplayMedia(n),
              p.shimMaxMessageSize(n),
              p.shimSendThrowTypeError(n);
            break;
          case "safari":
            if (!f || !a.shimSafari)
              return (
                c("Safari shim is not included in this adapter release."), m
              );
            c("adapter.js shimming safari."),
              (m.browserShim = f),
              p.shimCreateObjectURL(n),
              f.shimRTCIceServerUrls(n),
              f.shimCreateOfferLegacy(n),
              f.shimCallbacksAPI(n),
              f.shimLocalStreamsAPI(n),
              f.shimRemoteStreamsAPI(n),
              f.shimTrackEventTransceiver(n),
              f.shimGetUserMedia(n),
              p.shimRTCIceCandidate(n),
              p.shimMaxMessageSize(n),
              p.shimSendThrowTypeError(n);
            break;
          default:
            c("Unsupported browser!");
        }
        return m;
      };
    },
    function(e, t, r) {
      "use strict";
      function o(e, t, r) {
        t &&
          !r.has(t.id) &&
          (r.set(t.id, t),
          Object.keys(t).forEach(function(n) {
            n.endsWith("Id")
              ? o(e, e.get(t[n]), r)
              : n.endsWith("Ids") &&
                t[n].forEach(function(t) {
                  o(e, e.get(t), r);
                });
          }));
      }
      function n(e, t, r) {
        var n = r ? "outbound-rtp" : "inbound-rtp",
          a = new Map();
        if (null === t) return a;
        var i = [];
        return (
          e.forEach(function(e) {
            "track" === e.type && e.trackIdentifier === t.id && i.push(e);
          }),
          i.forEach(function(t) {
            e.forEach(function(r) {
              r.type === n && r.trackId === t.id && o(e, r, a);
            });
          }),
          a
        );
      }
      var a = r(6),
        i = a.log;
      e.exports = {
        shimGetUserMedia: r(106),
        shimMediaStream: function(e) {
          e.MediaStream = e.MediaStream || e.webkitMediaStream;
        },
        shimOnTrack: function(e) {
          if (
            "object" != typeof e ||
            !e.RTCPeerConnection ||
            "ontrack" in e.RTCPeerConnection.prototype
          )
            a.wrapPeerConnectionEvent(e, "track", function(e) {
              return (
                e.transceiver ||
                  Object.defineProperty(e, "transceiver", {
                    value: { receiver: e.receiver }
                  }),
                e
              );
            });
          else {
            Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
              get: function() {
                return this._ontrack;
              },
              set: function(e) {
                this._ontrack &&
                  this.removeEventListener("track", this._ontrack),
                  this.addEventListener("track", (this._ontrack = e));
              },
              enumerable: !0,
              configurable: !0
            });
            var t = e.RTCPeerConnection.prototype.setRemoteDescription;
            e.RTCPeerConnection.prototype.setRemoteDescription = function() {
              var r = this;
              return (
                r._ontrackpoly ||
                  ((r._ontrackpoly = function(t) {
                    t.stream.addEventListener("addtrack", function(o) {
                      var n;
                      n = e.RTCPeerConnection.prototype.getReceivers
                        ? r.getReceivers().find(function(e) {
                            return e.track && e.track.id === o.track.id;
                          })
                        : { track: o.track };
                      var a = new Event("track");
                      (a.track = o.track),
                        (a.receiver = n),
                        (a.transceiver = { receiver: n }),
                        (a.streams = [t.stream]),
                        r.dispatchEvent(a);
                    }),
                      t.stream.getTracks().forEach(function(o) {
                        var n;
                        n = e.RTCPeerConnection.prototype.getReceivers
                          ? r.getReceivers().find(function(e) {
                              return e.track && e.track.id === o.id;
                            })
                          : { track: o };
                        var a = new Event("track");
                        (a.track = o),
                          (a.receiver = n),
                          (a.transceiver = { receiver: n }),
                          (a.streams = [t.stream]),
                          r.dispatchEvent(a);
                      });
                  }),
                  r.addEventListener("addstream", r._ontrackpoly)),
                t.apply(r, arguments)
              );
            };
          }
        },
        shimGetSendersWithDtmf: function(e) {
          if (
            "object" == typeof e &&
            e.RTCPeerConnection &&
            !("getSenders" in e.RTCPeerConnection.prototype) &&
            "createDTMFSender" in e.RTCPeerConnection.prototype
          ) {
            var t = function(e, t) {
              return {
                track: t,
                get dtmf() {
                  return (
                    void 0 === this._dtmf &&
                      ("audio" === t.kind
                        ? (this._dtmf = e.createDTMFSender(t))
                        : (this._dtmf = null)),
                    this._dtmf
                  );
                },
                _pc: e
              };
            };
            if (!e.RTCPeerConnection.prototype.getSenders) {
              e.RTCPeerConnection.prototype.getSenders = function() {
                return (
                  (this._senders = this._senders || []), this._senders.slice()
                );
              };
              var r = e.RTCPeerConnection.prototype.addTrack;
              e.RTCPeerConnection.prototype.addTrack = function(e, o) {
                var n = this,
                  a = r.apply(n, arguments);
                return a || ((a = t(n, e)), n._senders.push(a)), a;
              };
              var o = e.RTCPeerConnection.prototype.removeTrack;
              e.RTCPeerConnection.prototype.removeTrack = function(e) {
                var t = this;
                o.apply(t, arguments);
                var r = t._senders.indexOf(e);
                -1 !== r && t._senders.splice(r, 1);
              };
            }
            var n = e.RTCPeerConnection.prototype.addStream;
            e.RTCPeerConnection.prototype.addStream = function(e) {
              var r = this;
              (r._senders = r._senders || []),
                n.apply(r, [e]),
                e.getTracks().forEach(function(e) {
                  r._senders.push(t(r, e));
                });
            };
            var a = e.RTCPeerConnection.prototype.removeStream;
            e.RTCPeerConnection.prototype.removeStream = function(e) {
              var t = this;
              (t._senders = t._senders || []),
                a.apply(t, [e]),
                e.getTracks().forEach(function(e) {
                  var r = t._senders.find(function(t) {
                    return t.track === e;
                  });
                  r && t._senders.splice(t._senders.indexOf(r), 1);
                });
            };
          } else if (
            "object" == typeof e &&
            e.RTCPeerConnection &&
            "getSenders" in e.RTCPeerConnection.prototype &&
            "createDTMFSender" in e.RTCPeerConnection.prototype &&
            e.RTCRtpSender &&
            !("dtmf" in e.RTCRtpSender.prototype)
          ) {
            var i = e.RTCPeerConnection.prototype.getSenders;
            (e.RTCPeerConnection.prototype.getSenders = function() {
              var e = this,
                t = i.apply(e, []);
              return (
                t.forEach(function(t) {
                  t._pc = e;
                }),
                t
              );
            }),
              Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
                get: function() {
                  return (
                    void 0 === this._dtmf &&
                      ("audio" === this.track.kind
                        ? (this._dtmf = this._pc.createDTMFSender(this.track))
                        : (this._dtmf = null)),
                    this._dtmf
                  );
                }
              });
          }
        },
        shimSenderReceiverGetStats: function(e) {
          if (
            "object" == typeof e &&
            e.RTCPeerConnection &&
            e.RTCRtpSender &&
            e.RTCRtpReceiver
          ) {
            if (!("getStats" in e.RTCRtpSender.prototype)) {
              var t = e.RTCPeerConnection.prototype.getSenders;
              t &&
                (e.RTCPeerConnection.prototype.getSenders = function() {
                  var e = this,
                    r = t.apply(e, []);
                  return (
                    r.forEach(function(t) {
                      t._pc = e;
                    }),
                    r
                  );
                });
              var r = e.RTCPeerConnection.prototype.addTrack;
              r &&
                (e.RTCPeerConnection.prototype.addTrack = function() {
                  var e = r.apply(this, arguments);
                  return (e._pc = this), e;
                }),
                (e.RTCRtpSender.prototype.getStats = function() {
                  var e = this;
                  return this._pc.getStats().then(function(t) {
                    return n(t, e.track, !0);
                  });
                });
            }
            if (!("getStats" in e.RTCRtpReceiver.prototype)) {
              var o = e.RTCPeerConnection.prototype.getReceivers;
              o &&
                (e.RTCPeerConnection.prototype.getReceivers = function() {
                  var e = this,
                    t = o.apply(e, []);
                  return (
                    t.forEach(function(t) {
                      t._pc = e;
                    }),
                    t
                  );
                }),
                a.wrapPeerConnectionEvent(e, "track", function(e) {
                  return (e.receiver._pc = e.srcElement), e;
                }),
                (e.RTCRtpReceiver.prototype.getStats = function() {
                  var e = this;
                  return this._pc.getStats().then(function(t) {
                    return n(t, e.track, !1);
                  });
                });
            }
            if (
              "getStats" in e.RTCRtpSender.prototype &&
              "getStats" in e.RTCRtpReceiver.prototype
            ) {
              var i = e.RTCPeerConnection.prototype.getStats;
              e.RTCPeerConnection.prototype.getStats = function() {
                var t = this;
                if (
                  arguments.length > 0 &&
                  arguments[0] instanceof e.MediaStreamTrack
                ) {
                  var r,
                    o,
                    n,
                    a = arguments[0];
                  return (
                    t.getSenders().forEach(function(e) {
                      e.track === a && (r ? (n = !0) : (r = e));
                    }),
                    t.getReceivers().forEach(function(e) {
                      return (
                        e.track === a && (o ? (n = !0) : (o = e)), e.track === a
                      );
                    }),
                    n || (r && o)
                      ? Promise.reject(
                          new DOMException(
                            "There are more than one sender or receiver for the track.",
                            "InvalidAccessError"
                          )
                        )
                      : r
                      ? r.getStats()
                      : o
                      ? o.getStats()
                      : Promise.reject(
                          new DOMException(
                            "There is no sender or receiver for the track.",
                            "InvalidAccessError"
                          )
                        )
                  );
                }
                return i.apply(t, arguments);
              };
            }
          }
        },
        shimSourceObject: function(e) {
          var t = e && e.URL;
          "object" == typeof e &&
            (!e.HTMLMediaElement ||
              "srcObject" in e.HTMLMediaElement.prototype ||
              Object.defineProperty(e.HTMLMediaElement.prototype, "srcObject", {
                get: function() {
                  return this._srcObject;
                },
                set: function(e) {
                  var r = this;
                  if (
                    ((this._srcObject = e),
                    this.src && t.revokeObjectURL(this.src),
                    !e)
                  )
                    return void (this.src = "");
                  (this.src = t.createObjectURL(e)),
                    e.addEventListener("addtrack", function() {
                      r.src && t.revokeObjectURL(r.src),
                        (r.src = t.createObjectURL(e));
                    }),
                    e.addEventListener("removetrack", function() {
                      r.src && t.revokeObjectURL(r.src),
                        (r.src = t.createObjectURL(e));
                    });
                }
              }));
        },
        shimAddTrackRemoveTrackWithNative: function(e) {
          e.RTCPeerConnection.prototype.getLocalStreams = function() {
            var e = this;
            return (
              (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
              Object.keys(this._shimmedLocalStreams).map(function(t) {
                return e._shimmedLocalStreams[t][0];
              })
            );
          };
          var t = e.RTCPeerConnection.prototype.addTrack;
          e.RTCPeerConnection.prototype.addTrack = function(e, r) {
            if (!r) return t.apply(this, arguments);
            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            var o = t.apply(this, arguments);
            return (
              this._shimmedLocalStreams[r.id]
                ? -1 === this._shimmedLocalStreams[r.id].indexOf(o) &&
                  this._shimmedLocalStreams[r.id].push(o)
                : (this._shimmedLocalStreams[r.id] = [r, o]),
              o
            );
          };
          var r = e.RTCPeerConnection.prototype.addStream;
          e.RTCPeerConnection.prototype.addStream = function(e) {
            var t = this;
            (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
              e.getTracks().forEach(function(e) {
                if (
                  t.getSenders().find(function(t) {
                    return t.track === e;
                  })
                )
                  throw new DOMException(
                    "Track already exists.",
                    "InvalidAccessError"
                  );
              });
            var o = t.getSenders();
            r.apply(this, arguments);
            var n = t.getSenders().filter(function(e) {
              return -1 === o.indexOf(e);
            });
            this._shimmedLocalStreams[e.id] = [e].concat(n);
          };
          var o = e.RTCPeerConnection.prototype.removeStream;
          e.RTCPeerConnection.prototype.removeStream = function(e) {
            return (
              (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
              delete this._shimmedLocalStreams[e.id],
              o.apply(this, arguments)
            );
          };
          var n = e.RTCPeerConnection.prototype.removeTrack;
          e.RTCPeerConnection.prototype.removeTrack = function(e) {
            var t = this;
            return (
              (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
              e &&
                Object.keys(this._shimmedLocalStreams).forEach(function(r) {
                  var o = t._shimmedLocalStreams[r].indexOf(e);
                  -1 !== o && t._shimmedLocalStreams[r].splice(o, 1),
                    1 === t._shimmedLocalStreams[r].length &&
                      delete t._shimmedLocalStreams[r];
                }),
              n.apply(this, arguments)
            );
          };
        },
        shimAddTrackRemoveTrack: function(e) {
          function t(e, t) {
            var r = t.sdp;
            return (
              Object.keys(e._reverseStreams || []).forEach(function(t) {
                var o = e._reverseStreams[t],
                  n = e._streams[o.id];
                r = r.replace(new RegExp(n.id, "g"), o.id);
              }),
              new RTCSessionDescription({ type: t.type, sdp: r })
            );
          }
          function r(e, t) {
            var r = t.sdp;
            return (
              Object.keys(e._reverseStreams || []).forEach(function(t) {
                var o = e._reverseStreams[t],
                  n = e._streams[o.id];
                r = r.replace(new RegExp(o.id, "g"), n.id);
              }),
              new RTCSessionDescription({ type: t.type, sdp: r })
            );
          }
          if (e.RTCPeerConnection) {
            var o = a.detectBrowser(e);
            if (e.RTCPeerConnection.prototype.addTrack && o.version >= 65)
              return this.shimAddTrackRemoveTrackWithNative(e);
            var n = e.RTCPeerConnection.prototype.getLocalStreams;
            e.RTCPeerConnection.prototype.getLocalStreams = function() {
              var e = this,
                t = n.apply(this);
              return (
                (e._reverseStreams = e._reverseStreams || {}),
                t.map(function(t) {
                  return e._reverseStreams[t.id];
                })
              );
            };
            var i = e.RTCPeerConnection.prototype.addStream;
            e.RTCPeerConnection.prototype.addStream = function(t) {
              var r = this;
              if (
                ((r._streams = r._streams || {}),
                (r._reverseStreams = r._reverseStreams || {}),
                t.getTracks().forEach(function(e) {
                  if (
                    r.getSenders().find(function(t) {
                      return t.track === e;
                    })
                  )
                    throw new DOMException(
                      "Track already exists.",
                      "InvalidAccessError"
                    );
                }),
                !r._reverseStreams[t.id])
              ) {
                var o = new e.MediaStream(t.getTracks());
                (r._streams[t.id] = o), (r._reverseStreams[o.id] = t), (t = o);
              }
              i.apply(r, [t]);
            };
            var c = e.RTCPeerConnection.prototype.removeStream;
            (e.RTCPeerConnection.prototype.removeStream = function(e) {
              var t = this;
              (t._streams = t._streams || {}),
                (t._reverseStreams = t._reverseStreams || {}),
                c.apply(t, [t._streams[e.id] || e]),
                delete t._reverseStreams[
                  t._streams[e.id] ? t._streams[e.id].id : e.id
                ],
                delete t._streams[e.id];
            }),
              (e.RTCPeerConnection.prototype.addTrack = function(t, r) {
                var o = this;
                if ("closed" === o.signalingState)
                  throw new DOMException(
                    "The RTCPeerConnection's signalingState is 'closed'.",
                    "InvalidStateError"
                  );
                var n = [].slice.call(arguments, 1);
                if (
                  1 !== n.length ||
                  !n[0].getTracks().find(function(e) {
                    return e === t;
                  })
                )
                  throw new DOMException(
                    "The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.",
                    "NotSupportedError"
                  );
                if (
                  o.getSenders().find(function(e) {
                    return e.track === t;
                  })
                )
                  throw new DOMException(
                    "Track already exists.",
                    "InvalidAccessError"
                  );
                (o._streams = o._streams || {}),
                  (o._reverseStreams = o._reverseStreams || {});
                var a = o._streams[r.id];
                if (a)
                  a.addTrack(t),
                    Promise.resolve().then(function() {
                      o.dispatchEvent(new Event("negotiationneeded"));
                    });
                else {
                  var i = new e.MediaStream([t]);
                  (o._streams[r.id] = i),
                    (o._reverseStreams[i.id] = r),
                    o.addStream(i);
                }
                return o.getSenders().find(function(e) {
                  return e.track === t;
                });
              }),
              ["createOffer", "createAnswer"].forEach(function(r) {
                var o = e.RTCPeerConnection.prototype[r];
                e.RTCPeerConnection.prototype[r] = function() {
                  var e = this,
                    r = arguments;
                  return arguments.length && "function" == typeof arguments[0]
                    ? o.apply(e, [
                        function(o) {
                          var n = t(e, o);
                          r[0].apply(null, [n]);
                        },
                        function(e) {
                          r[1] && r[1].apply(null, e);
                        },
                        arguments[2]
                      ])
                    : o.apply(e, arguments).then(function(r) {
                        return t(e, r);
                      });
                };
              });
            var s = e.RTCPeerConnection.prototype.setLocalDescription;
            e.RTCPeerConnection.prototype.setLocalDescription = function() {
              var e = this;
              return arguments.length && arguments[0].type
                ? ((arguments[0] = r(e, arguments[0])), s.apply(e, arguments))
                : s.apply(e, arguments);
            };
            var d = Object.getOwnPropertyDescriptor(
              e.RTCPeerConnection.prototype,
              "localDescription"
            );
            Object.defineProperty(
              e.RTCPeerConnection.prototype,
              "localDescription",
              {
                get: function() {
                  var e = this,
                    r = d.get.apply(this);
                  return "" === r.type ? r : t(e, r);
                }
              }
            ),
              (e.RTCPeerConnection.prototype.removeTrack = function(e) {
                var t = this;
                if ("closed" === t.signalingState)
                  throw new DOMException(
                    "The RTCPeerConnection's signalingState is 'closed'.",
                    "InvalidStateError"
                  );
                if (!e._pc)
                  throw new DOMException(
                    "Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.",
                    "TypeError"
                  );
                if (e._pc !== t)
                  throw new DOMException(
                    "Sender was not created by this connection.",
                    "InvalidAccessError"
                  );
                t._streams = t._streams || {};
                var r;
                Object.keys(t._streams).forEach(function(o) {
                  t._streams[o].getTracks().find(function(t) {
                    return e.track === t;
                  }) && (r = t._streams[o]);
                }),
                  r &&
                    (1 === r.getTracks().length
                      ? t.removeStream(t._reverseStreams[r.id])
                      : r.removeTrack(e.track),
                    t.dispatchEvent(new Event("negotiationneeded")));
              });
          }
        },
        shimPeerConnection: function(e) {
          var t = a.detectBrowser(e);
          if (
            (!e.RTCPeerConnection &&
              e.webkitRTCPeerConnection &&
              ((e.RTCPeerConnection = function(t, r) {
                return (
                  i("PeerConnection"),
                  t &&
                    t.iceTransportPolicy &&
                    (t.iceTransports = t.iceTransportPolicy),
                  new e.webkitRTCPeerConnection(t, r)
                );
              }),
              (e.RTCPeerConnection.prototype =
                e.webkitRTCPeerConnection.prototype),
              e.webkitRTCPeerConnection.generateCertificate &&
                Object.defineProperty(
                  e.RTCPeerConnection,
                  "generateCertificate",
                  {
                    get: function() {
                      return e.webkitRTCPeerConnection.generateCertificate;
                    }
                  }
                )),
            e.RTCPeerConnection)
          ) {
            var r = e.RTCPeerConnection.prototype.getStats;
            (e.RTCPeerConnection.prototype.getStats = function(e, t, o) {
              var n = this,
                a = arguments;
              if (arguments.length > 0 && "function" == typeof e)
                return r.apply(this, arguments);
              if (
                0 === r.length &&
                (0 === arguments.length || "function" != typeof arguments[0])
              )
                return r.apply(this, []);
              var i = function(e) {
                  var t = {};
                  return (
                    e.result().forEach(function(e) {
                      var r = {
                        id: e.id,
                        timestamp: e.timestamp,
                        type:
                          {
                            localcandidate: "local-candidate",
                            remotecandidate: "remote-candidate"
                          }[e.type] || e.type
                      };
                      e.names().forEach(function(t) {
                        r[t] = e.stat(t);
                      }),
                        (t[r.id] = r);
                    }),
                    t
                  );
                },
                c = function(e) {
                  return new Map(
                    Object.keys(e).map(function(t) {
                      return [t, e[t]];
                    })
                  );
                };
              if (arguments.length >= 2) {
                var s = function(e) {
                  a[1](c(i(e)));
                };
                return r.apply(this, [s, arguments[0]]);
              }
              return new Promise(function(e, t) {
                r.apply(n, [
                  function(t) {
                    e(c(i(t)));
                  },
                  t
                ]);
              }).then(t, o);
            }),
              t.version < 51 &&
                [
                  "setLocalDescription",
                  "setRemoteDescription",
                  "addIceCandidate"
                ].forEach(function(t) {
                  var r = e.RTCPeerConnection.prototype[t];
                  e.RTCPeerConnection.prototype[t] = function() {
                    var e = arguments,
                      t = this,
                      o = new Promise(function(o, n) {
                        r.apply(t, [e[0], o, n]);
                      });
                    return e.length < 2
                      ? o
                      : o.then(
                          function() {
                            e[1].apply(null, []);
                          },
                          function(t) {
                            e.length >= 3 && e[2].apply(null, [t]);
                          }
                        );
                  };
                }),
              t.version < 52 &&
                ["createOffer", "createAnswer"].forEach(function(t) {
                  var r = e.RTCPeerConnection.prototype[t];
                  e.RTCPeerConnection.prototype[t] = function() {
                    var e = this;
                    if (
                      arguments.length < 1 ||
                      (1 === arguments.length &&
                        "object" == typeof arguments[0])
                    ) {
                      var t = 1 === arguments.length ? arguments[0] : void 0;
                      return new Promise(function(o, n) {
                        r.apply(e, [o, n, t]);
                      });
                    }
                    return r.apply(this, arguments);
                  };
                }),
              [
                "setLocalDescription",
                "setRemoteDescription",
                "addIceCandidate"
              ].forEach(function(t) {
                var r = e.RTCPeerConnection.prototype[t];
                e.RTCPeerConnection.prototype[t] = function() {
                  return (
                    (arguments[0] = new ("addIceCandidate" === t
                      ? e.RTCIceCandidate
                      : e.RTCSessionDescription)(arguments[0])),
                    r.apply(this, arguments)
                  );
                };
              });
            var o = e.RTCPeerConnection.prototype.addIceCandidate;
            e.RTCPeerConnection.prototype.addIceCandidate = function() {
              return arguments[0]
                ? o.apply(this, arguments)
                : (arguments[1] && arguments[1].apply(null), Promise.resolve());
            };
          }
        },
        fixNegotiationNeeded: function(e) {
          a.wrapPeerConnectionEvent(e, "negotiationneeded", function(e) {
            if ("stable" === e.target.signalingState) return e;
          });
        },
        shimGetDisplayMedia: function(e, t) {
          if (
            e.navigator &&
            e.navigator.mediaDevices &&
            !("getDisplayMedia" in e.navigator.mediaDevices)
          ) {
            if ("function" != typeof t)
              return void console.error(
                "shimGetDisplayMedia: getSourceId argument is not a function"
              );
            (e.navigator.mediaDevices.getDisplayMedia = function(r) {
              return t(r).then(function(t) {
                var o = r.video && r.video.width,
                  n = r.video && r.video.height,
                  a = r.video && r.video.frameRate;
                return (
                  (r.video = {
                    mandatory: {
                      chromeMediaSource: "desktop",
                      chromeMediaSourceId: t,
                      maxFrameRate: a || 3
                    }
                  }),
                  o && (r.video.mandatory.maxWidth = o),
                  n && (r.video.mandatory.maxHeight = n),
                  e.navigator.mediaDevices.getUserMedia(r)
                );
              });
            }),
              (e.navigator.getDisplayMedia = function(t) {
                return (
                  a.deprecated(
                    "navigator.getDisplayMedia",
                    "navigator.mediaDevices.getDisplayMedia"
                  ),
                  e.navigator.mediaDevices.getDisplayMedia(t)
                );
              });
          }
        }
      };
    },
    function(e, t, r) {
      "use strict";
      var o = r(6),
        n = o.log;
      e.exports = function(e) {
        var t = o.detectBrowser(e),
          r = e && e.navigator,
          a = function(e) {
            if ("object" != typeof e || e.mandatory || e.optional) return e;
            var t = {};
            return (
              Object.keys(e).forEach(function(r) {
                if (
                  "require" !== r &&
                  "advanced" !== r &&
                  "mediaSource" !== r
                ) {
                  var o = "object" == typeof e[r] ? e[r] : { ideal: e[r] };
                  void 0 !== o.exact &&
                    "number" == typeof o.exact &&
                    (o.min = o.max = o.exact);
                  var n = function(e, t) {
                    return e
                      ? e + t.charAt(0).toUpperCase() + t.slice(1)
                      : "deviceId" === t
                      ? "sourceId"
                      : t;
                  };
                  if (void 0 !== o.ideal) {
                    t.optional = t.optional || [];
                    var a = {};
                    "number" == typeof o.ideal
                      ? ((a[n("min", r)] = o.ideal),
                        t.optional.push(a),
                        (a = {}),
                        (a[n("max", r)] = o.ideal),
                        t.optional.push(a))
                      : ((a[n("", r)] = o.ideal), t.optional.push(a));
                  }
                  void 0 !== o.exact && "number" != typeof o.exact
                    ? ((t.mandatory = t.mandatory || {}),
                      (t.mandatory[n("", r)] = o.exact))
                    : ["min", "max"].forEach(function(e) {
                        void 0 !== o[e] &&
                          ((t.mandatory = t.mandatory || {}),
                          (t.mandatory[n(e, r)] = o[e]));
                      });
                }
              }),
              e.advanced &&
                (t.optional = (t.optional || []).concat(e.advanced)),
              t
            );
          },
          i = function(e, o) {
            if (t.version >= 61) return o(e);
            if (
              (e = JSON.parse(JSON.stringify(e))) &&
              "object" == typeof e.audio
            ) {
              var i = function(e, t, r) {
                t in e && !(r in e) && ((e[r] = e[t]), delete e[t]);
              };
              (e = JSON.parse(JSON.stringify(e))),
                i(e.audio, "autoGainControl", "googAutoGainControl"),
                i(e.audio, "noiseSuppression", "googNoiseSuppression"),
                (e.audio = a(e.audio));
            }
            if (e && "object" == typeof e.video) {
              var c = e.video.facingMode;
              c = c && ("object" == typeof c ? c : { ideal: c });
              var s = t.version < 66;
              if (
                c &&
                ("user" === c.exact ||
                  "environment" === c.exact ||
                  "user" === c.ideal ||
                  "environment" === c.ideal) &&
                (!r.mediaDevices.getSupportedConstraints ||
                  !r.mediaDevices.getSupportedConstraints().facingMode ||
                  s)
              ) {
                delete e.video.facingMode;
                var d;
                if (
                  ("environment" === c.exact || "environment" === c.ideal
                    ? (d = ["back", "rear"])
                    : ("user" !== c.exact && "user" !== c.ideal) ||
                      (d = ["front"]),
                  d)
                )
                  return r.mediaDevices.enumerateDevices().then(function(t) {
                    t = t.filter(function(e) {
                      return "videoinput" === e.kind;
                    });
                    var r = t.find(function(e) {
                      return d.some(function(t) {
                        return -1 !== e.label.toLowerCase().indexOf(t);
                      });
                    });
                    return (
                      !r &&
                        t.length &&
                        -1 !== d.indexOf("back") &&
                        (r = t[t.length - 1]),
                      r &&
                        (e.video.deviceId = c.exact
                          ? { exact: r.deviceId }
                          : { ideal: r.deviceId }),
                      (e.video = a(e.video)),
                      n("chrome: " + JSON.stringify(e)),
                      o(e)
                    );
                  });
              }
              e.video = a(e.video);
            }
            return n("chrome: " + JSON.stringify(e)), o(e);
          },
          c = function(e) {
            return t.version >= 64
              ? e
              : {
                  name:
                    {
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
                    }[e.name] || e.name,
                  message: e.message,
                  constraint: e.constraint || e.constraintName,
                  toString: function() {
                    return this.name + (this.message && ": ") + this.message;
                  }
                };
          },
          s = function(e, t, o) {
            i(e, function(e) {
              r.webkitGetUserMedia(e, t, function(e) {
                o && o(c(e));
              });
            });
          };
        r.getUserMedia = s;
        var d = function(e) {
          return new Promise(function(t, o) {
            r.getUserMedia(e, t, o);
          });
        };
        if (
          (r.mediaDevices ||
            (r.mediaDevices = {
              getUserMedia: d,
              enumerateDevices: function() {
                return new Promise(function(t) {
                  var r = { audio: "audioinput", video: "videoinput" };
                  return e.MediaStreamTrack.getSources(function(e) {
                    t(
                      e.map(function(e) {
                        return {
                          label: e.label,
                          kind: r[e.kind],
                          deviceId: e.id,
                          groupId: ""
                        };
                      })
                    );
                  });
                });
              },
              getSupportedConstraints: function() {
                return {
                  deviceId: !0,
                  echoCancellation: !0,
                  facingMode: !0,
                  frameRate: !0,
                  height: !0,
                  width: !0
                };
              }
            }),
          r.mediaDevices.getUserMedia)
        ) {
          var u = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
          r.mediaDevices.getUserMedia = function(e) {
            return i(e, function(e) {
              return u(e).then(
                function(t) {
                  if (
                    (e.audio && !t.getAudioTracks().length) ||
                    (e.video && !t.getVideoTracks().length)
                  )
                    throw (t.getTracks().forEach(function(e) {
                      e.stop();
                    }),
                    new DOMException("", "NotFoundError"));
                  return t;
                },
                function(e) {
                  return Promise.reject(c(e));
                }
              );
            });
          };
        } else
          r.mediaDevices.getUserMedia = function(e) {
            return d(e);
          };
        void 0 === r.mediaDevices.addEventListener &&
          (r.mediaDevices.addEventListener = function() {
            n("Dummy mediaDevices.addEventListener called.");
          }),
          void 0 === r.mediaDevices.removeEventListener &&
            (r.mediaDevices.removeEventListener = function() {
              n("Dummy mediaDevices.removeEventListener called.");
            });
      };
    },
    function(e, t, r) {
      "use strict";
      var o = r(6),
        n = r(108),
        a = r(109);
      e.exports = {
        shimGetUserMedia: r(110),
        shimPeerConnection: function(e) {
          var t = o.detectBrowser(e);
          if (
            e.RTCIceGatherer &&
            (e.RTCIceCandidate ||
              (e.RTCIceCandidate = function(e) {
                return e;
              }),
            e.RTCSessionDescription ||
              (e.RTCSessionDescription = function(e) {
                return e;
              }),
            t.version < 15025)
          ) {
            var r = Object.getOwnPropertyDescriptor(
              e.MediaStreamTrack.prototype,
              "enabled"
            );
            Object.defineProperty(e.MediaStreamTrack.prototype, "enabled", {
              set: function(e) {
                r.set.call(this, e);
                var t = new Event("enabled");
                (t.enabled = e), this.dispatchEvent(t);
              }
            });
          }
          !e.RTCRtpSender ||
            "dtmf" in e.RTCRtpSender.prototype ||
            Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
              get: function() {
                return (
                  void 0 === this._dtmf &&
                    ("audio" === this.track.kind
                      ? (this._dtmf = new e.RTCDtmfSender(this))
                      : "video" === this.track.kind && (this._dtmf = null)),
                  this._dtmf
                );
              }
            }),
            e.RTCDtmfSender &&
              !e.RTCDTMFSender &&
              (e.RTCDTMFSender = e.RTCDtmfSender);
          var i = a(e, t.version);
          (e.RTCPeerConnection = function(e) {
            return (
              e && e.iceServers && (e.iceServers = n(e.iceServers)), new i(e)
            );
          }),
            (e.RTCPeerConnection.prototype = i.prototype);
        },
        shimReplaceTrack: function(e) {
          !e.RTCRtpSender ||
            "replaceTrack" in e.RTCRtpSender.prototype ||
            (e.RTCRtpSender.prototype.replaceTrack =
              e.RTCRtpSender.prototype.setTrack);
        },
        shimGetDisplayMedia: function(e, t) {
          if (
            "getDisplayMedia" in e.navigator &&
            e.navigator.mediaDevices &&
            !("getDisplayMedia" in e.navigator.mediaDevices)
          ) {
            var r = e.navigator.getDisplayMedia;
            (e.navigator.mediaDevices.getDisplayMedia = function(t) {
              return r.call(e.navigator, t);
            }),
              (e.navigator.getDisplayMedia = function(t) {
                return (
                  o.deprecated(
                    "navigator.getDisplayMedia",
                    "navigator.mediaDevices.getDisplayMedia"
                  ),
                  r.call(e.navigator, t)
                );
              });
          }
        }
      };
    },
    function(e, t, r) {
      "use strict";
      var o = r(6);
      e.exports = function(e, t) {
        var r = !1;
        return (
          (e = JSON.parse(JSON.stringify(e))),
          e.filter(function(e) {
            if (e && (e.urls || e.url)) {
              var n = e.urls || e.url;
              e.url &&
                !e.urls &&
                o.deprecated("RTCIceServer.url", "RTCIceServer.urls");
              var a = "string" == typeof n;
              return (
                a && (n = [n]),
                (n = n.filter(function(e) {
                  return 0 !== e.indexOf("turn:") ||
                    -1 === e.indexOf("transport=udp") ||
                    -1 !== e.indexOf("turn:[") ||
                    r
                    ? 0 === e.indexOf("stun:") &&
                        t >= 14393 &&
                        -1 === e.indexOf("?transport=udp")
                    : ((r = !0), !0);
                })),
                delete e.url,
                (e.urls = a ? n[0] : n),
                !!n.length
              );
            }
          })
        );
      };
    },
    function(e, t, r) {
      "use strict";
      function o(e) {
        return (
          {
            inboundrtp: "inbound-rtp",
            outboundrtp: "outbound-rtp",
            candidatepair: "candidate-pair",
            localcandidate: "local-candidate",
            remotecandidate: "remote-candidate"
          }[e.type] || e.type
        );
      }
      function n(e, t, r, o, n) {
        var a = u.writeRtpDescription(e.kind, t);
        if (
          ((a += u.writeIceParameters(e.iceGatherer.getLocalParameters())),
          (a += u.writeDtlsParameters(
            e.dtlsTransport.getLocalParameters(),
            "offer" === r ? "actpass" : n || "active"
          )),
          (a += "a=mid:" + e.mid + "\r\n"),
          e.rtpSender && e.rtpReceiver
            ? (a += "a=sendrecv\r\n")
            : e.rtpSender
            ? (a += "a=sendonly\r\n")
            : e.rtpReceiver
            ? (a += "a=recvonly\r\n")
            : (a += "a=inactive\r\n"),
          e.rtpSender)
        ) {
          var i = e.rtpSender._initialTrackId || e.rtpSender.track.id;
          e.rtpSender._initialTrackId = i;
          var c = "msid:" + (o ? o.id : "-") + " " + i + "\r\n";
          (a += "a=" + c),
            (a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + c),
            e.sendEncodingParameters[0].rtx &&
              ((a +=
                "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + c),
              (a +=
                "a=ssrc-group:FID " +
                e.sendEncodingParameters[0].ssrc +
                " " +
                e.sendEncodingParameters[0].rtx.ssrc +
                "\r\n"));
        }
        return (
          (a +=
            "a=ssrc:" +
            e.sendEncodingParameters[0].ssrc +
            " cname:" +
            u.localCName +
            "\r\n"),
          e.rtpSender &&
            e.sendEncodingParameters[0].rtx &&
            (a +=
              "a=ssrc:" +
              e.sendEncodingParameters[0].rtx.ssrc +
              " cname:" +
              u.localCName +
              "\r\n"),
          a
        );
      }
      function a(e, t) {
        var r = !1;
        return (
          (e = JSON.parse(JSON.stringify(e))),
          e.filter(function(e) {
            if (e && (e.urls || e.url)) {
              var o = e.urls || e.url;
              e.url &&
                !e.urls &&
                console.warn(
                  "RTCIceServer.url is deprecated! Use urls instead."
                );
              var n = "string" == typeof o;
              return (
                n && (o = [o]),
                (o = o.filter(function(e) {
                  return 0 !== e.indexOf("turn:") ||
                    -1 === e.indexOf("transport=udp") ||
                    -1 !== e.indexOf("turn:[") ||
                    r
                    ? 0 === e.indexOf("stun:") &&
                        t >= 14393 &&
                        -1 === e.indexOf("?transport=udp")
                    : ((r = !0), !0);
                })),
                delete e.url,
                (e.urls = n ? o[0] : o),
                !!o.length
              );
            }
          })
        );
      }
      function i(e, t) {
        var r = { codecs: [], headerExtensions: [], fecMechanisms: [] },
          o = function(e, t) {
            e = parseInt(e, 10);
            for (var r = 0; r < t.length; r++)
              if (t[r].payloadType === e || t[r].preferredPayloadType === e)
                return t[r];
          },
          n = function(e, t, r, n) {
            var a = o(e.parameters.apt, r),
              i = o(t.parameters.apt, n);
            return a && i && a.name.toLowerCase() === i.name.toLowerCase();
          };
        return (
          e.codecs.forEach(function(o) {
            for (var a = 0; a < t.codecs.length; a++) {
              var i = t.codecs[a];
              if (
                o.name.toLowerCase() === i.name.toLowerCase() &&
                o.clockRate === i.clockRate
              ) {
                if (
                  "rtx" === o.name.toLowerCase() &&
                  o.parameters &&
                  i.parameters.apt &&
                  !n(o, i, e.codecs, t.codecs)
                )
                  continue;
                (i = JSON.parse(JSON.stringify(i))),
                  (i.numChannels = Math.min(o.numChannels, i.numChannels)),
                  r.codecs.push(i),
                  (i.rtcpFeedback = i.rtcpFeedback.filter(function(e) {
                    for (var t = 0; t < o.rtcpFeedback.length; t++)
                      if (
                        o.rtcpFeedback[t].type === e.type &&
                        o.rtcpFeedback[t].parameter === e.parameter
                      )
                        return !0;
                    return !1;
                  }));
                break;
              }
            }
          }),
          e.headerExtensions.forEach(function(e) {
            for (var o = 0; o < t.headerExtensions.length; o++) {
              var n = t.headerExtensions[o];
              if (e.uri === n.uri) {
                r.headerExtensions.push(n);
                break;
              }
            }
          }),
          r
        );
      }
      function c(e, t, r) {
        return (
          -1 !==
          {
            offer: {
              setLocalDescription: ["stable", "have-local-offer"],
              setRemoteDescription: ["stable", "have-remote-offer"]
            },
            answer: {
              setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
              setRemoteDescription: ["have-local-offer", "have-remote-pranswer"]
            }
          }[t][e].indexOf(r)
        );
      }
      function s(e, t) {
        var r = e.getRemoteCandidates().find(function(e) {
          return (
            t.foundation === e.foundation &&
            t.ip === e.ip &&
            t.port === e.port &&
            t.priority === e.priority &&
            t.protocol === e.protocol &&
            t.type === e.type
          );
        });
        return r || e.addRemoteCandidate(t), !r;
      }
      function d(e, t) {
        var r = new Error(t);
        return (
          (r.name = e),
          (r.code = {
            NotSupportedError: 9,
            InvalidStateError: 11,
            InvalidAccessError: 15,
            TypeError: void 0,
            OperationError: void 0
          }[e]),
          r
        );
      }
      var u = r(64);
      e.exports = function(e, t) {
        function r(t, r) {
          r.addTrack(t),
            r.dispatchEvent(
              new e.MediaStreamTrackEvent("addtrack", { track: t })
            );
        }
        function l(t, r) {
          r.removeTrack(t),
            r.dispatchEvent(
              new e.MediaStreamTrackEvent("removetrack", { track: t })
            );
        }
        function f(t, r, o, n) {
          var a = new Event("track");
          (a.track = r),
            (a.receiver = o),
            (a.transceiver = { receiver: o }),
            (a.streams = n),
            e.setTimeout(function() {
              t._dispatchEvent("track", a);
            });
        }
        var p = function(r) {
          var o = this,
            n = document.createDocumentFragment();
          if (
            ([
              "addEventListener",
              "removeEventListener",
              "dispatchEvent"
            ].forEach(function(e) {
              o[e] = n[e].bind(n);
            }),
            (this.canTrickleIceCandidates = null),
            (this.needNegotiation = !1),
            (this.localStreams = []),
            (this.remoteStreams = []),
            (this._localDescription = null),
            (this._remoteDescription = null),
            (this.signalingState = "stable"),
            (this.iceConnectionState = "new"),
            (this.connectionState = "new"),
            (this.iceGatheringState = "new"),
            (r = JSON.parse(JSON.stringify(r || {}))),
            (this.usingBundle = "max-bundle" === r.bundlePolicy),
            "negotiate" === r.rtcpMuxPolicy)
          )
            throw d(
              "NotSupportedError",
              "rtcpMuxPolicy 'negotiate' is not supported"
            );
          switch (
            (r.rtcpMuxPolicy || (r.rtcpMuxPolicy = "require"),
            r.iceTransportPolicy)
          ) {
            case "all":
            case "relay":
              break;
            default:
              r.iceTransportPolicy = "all";
          }
          switch (r.bundlePolicy) {
            case "balanced":
            case "max-compat":
            case "max-bundle":
              break;
            default:
              r.bundlePolicy = "balanced";
          }
          if (
            ((r.iceServers = a(r.iceServers || [], t)),
            (this._iceGatherers = []),
            r.iceCandidatePoolSize)
          )
            for (var i = r.iceCandidatePoolSize; i > 0; i--)
              this._iceGatherers.push(
                new e.RTCIceGatherer({
                  iceServers: r.iceServers,
                  gatherPolicy: r.iceTransportPolicy
                })
              );
          else r.iceCandidatePoolSize = 0;
          (this._config = r),
            (this.transceivers = []),
            (this._sdpSessionId = u.generateSessionId()),
            (this._sdpSessionVersion = 0),
            (this._dtlsRole = void 0),
            (this._isClosed = !1);
        };
        Object.defineProperty(p.prototype, "localDescription", {
          configurable: !0,
          get: function() {
            return this._localDescription;
          }
        }),
          Object.defineProperty(p.prototype, "remoteDescription", {
            configurable: !0,
            get: function() {
              return this._remoteDescription;
            }
          }),
          (p.prototype.onicecandidate = null),
          (p.prototype.onaddstream = null),
          (p.prototype.ontrack = null),
          (p.prototype.onremovestream = null),
          (p.prototype.onsignalingstatechange = null),
          (p.prototype.oniceconnectionstatechange = null),
          (p.prototype.onconnectionstatechange = null),
          (p.prototype.onicegatheringstatechange = null),
          (p.prototype.onnegotiationneeded = null),
          (p.prototype.ondatachannel = null),
          (p.prototype._dispatchEvent = function(e, t) {
            this._isClosed ||
              (this.dispatchEvent(t),
              "function" == typeof this["on" + e] && this["on" + e](t));
          }),
          (p.prototype._emitGatheringStateChange = function() {
            var e = new Event("icegatheringstatechange");
            this._dispatchEvent("icegatheringstatechange", e);
          }),
          (p.prototype.getConfiguration = function() {
            return this._config;
          }),
          (p.prototype.getLocalStreams = function() {
            return this.localStreams;
          }),
          (p.prototype.getRemoteStreams = function() {
            return this.remoteStreams;
          }),
          (p.prototype._createTransceiver = function(e, t) {
            var r = this.transceivers.length > 0,
              o = {
                track: null,
                iceGatherer: null,
                iceTransport: null,
                dtlsTransport: null,
                localCapabilities: null,
                remoteCapabilities: null,
                rtpSender: null,
                rtpReceiver: null,
                kind: e,
                mid: null,
                sendEncodingParameters: null,
                recvEncodingParameters: null,
                stream: null,
                associatedRemoteMediaStreams: [],
                wantReceive: !0
              };
            if (this.usingBundle && r)
              (o.iceTransport = this.transceivers[0].iceTransport),
                (o.dtlsTransport = this.transceivers[0].dtlsTransport);
            else {
              var n = this._createIceAndDtlsTransports();
              (o.iceTransport = n.iceTransport),
                (o.dtlsTransport = n.dtlsTransport);
            }
            return t || this.transceivers.push(o), o;
          }),
          (p.prototype.addTrack = function(t, r) {
            if (this._isClosed)
              throw d(
                "InvalidStateError",
                "Attempted to call addTrack on a closed peerconnection."
              );
            if (
              this.transceivers.find(function(e) {
                return e.track === t;
              })
            )
              throw d("InvalidAccessError", "Track already exists.");
            for (var o, n = 0; n < this.transceivers.length; n++)
              this.transceivers[n].track ||
                this.transceivers[n].kind !== t.kind ||
                (o = this.transceivers[n]);
            return (
              o || (o = this._createTransceiver(t.kind)),
              this._maybeFireNegotiationNeeded(),
              -1 === this.localStreams.indexOf(r) && this.localStreams.push(r),
              (o.track = t),
              (o.stream = r),
              (o.rtpSender = new e.RTCRtpSender(t, o.dtlsTransport)),
              o.rtpSender
            );
          }),
          (p.prototype.addStream = function(e) {
            var r = this;
            if (t >= 15025)
              e.getTracks().forEach(function(t) {
                r.addTrack(t, e);
              });
            else {
              var o = e.clone();
              e.getTracks().forEach(function(e, t) {
                var r = o.getTracks()[t];
                e.addEventListener("enabled", function(e) {
                  r.enabled = e.enabled;
                });
              }),
                o.getTracks().forEach(function(e) {
                  r.addTrack(e, o);
                });
            }
          }),
          (p.prototype.removeTrack = function(t) {
            if (this._isClosed)
              throw d(
                "InvalidStateError",
                "Attempted to call removeTrack on a closed peerconnection."
              );
            if (!(t instanceof e.RTCRtpSender))
              throw new TypeError(
                "Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender."
              );
            var r = this.transceivers.find(function(e) {
              return e.rtpSender === t;
            });
            if (!r)
              throw d(
                "InvalidAccessError",
                "Sender was not created by this connection."
              );
            var o = r.stream;
            r.rtpSender.stop(),
              (r.rtpSender = null),
              (r.track = null),
              (r.stream = null),
              -1 ===
                this.transceivers
                  .map(function(e) {
                    return e.stream;
                  })
                  .indexOf(o) &&
                this.localStreams.indexOf(o) > -1 &&
                this.localStreams.splice(this.localStreams.indexOf(o), 1),
              this._maybeFireNegotiationNeeded();
          }),
          (p.prototype.removeStream = function(e) {
            var t = this;
            e.getTracks().forEach(function(e) {
              var r = t.getSenders().find(function(t) {
                return t.track === e;
              });
              r && t.removeTrack(r);
            });
          }),
          (p.prototype.getSenders = function() {
            return this.transceivers
              .filter(function(e) {
                return !!e.rtpSender;
              })
              .map(function(e) {
                return e.rtpSender;
              });
          }),
          (p.prototype.getReceivers = function() {
            return this.transceivers
              .filter(function(e) {
                return !!e.rtpReceiver;
              })
              .map(function(e) {
                return e.rtpReceiver;
              });
          }),
          (p.prototype._createIceGatherer = function(t, r) {
            var o = this;
            if (r && t > 0) return this.transceivers[0].iceGatherer;
            if (this._iceGatherers.length) return this._iceGatherers.shift();
            var n = new e.RTCIceGatherer({
              iceServers: this._config.iceServers,
              gatherPolicy: this._config.iceTransportPolicy
            });
            return (
              Object.defineProperty(n, "state", { value: "new", writable: !0 }),
              (this.transceivers[t].bufferedCandidateEvents = []),
              (this.transceivers[t].bufferCandidates = function(e) {
                var r = !e.candidate || 0 === Object.keys(e.candidate).length;
                (n.state = r ? "completed" : "gathering"),
                  null !== o.transceivers[t].bufferedCandidateEvents &&
                    o.transceivers[t].bufferedCandidateEvents.push(e);
              }),
              n.addEventListener(
                "localcandidate",
                this.transceivers[t].bufferCandidates
              ),
              n
            );
          }),
          (p.prototype._gather = function(t, r) {
            var o = this,
              n = this.transceivers[r].iceGatherer;
            if (!n.onlocalcandidate) {
              var a = this.transceivers[r].bufferedCandidateEvents;
              (this.transceivers[r].bufferedCandidateEvents = null),
                n.removeEventListener(
                  "localcandidate",
                  this.transceivers[r].bufferCandidates
                ),
                (n.onlocalcandidate = function(e) {
                  if (!(o.usingBundle && r > 0)) {
                    var a = new Event("icecandidate");
                    a.candidate = { sdpMid: t, sdpMLineIndex: r };
                    var i = e.candidate,
                      c = !i || 0 === Object.keys(i).length;
                    if (c)
                      ("new" !== n.state && "gathering" !== n.state) ||
                        (n.state = "completed");
                    else {
                      "new" === n.state && (n.state = "gathering"),
                        (i.component = 1),
                        (i.ufrag = n.getLocalParameters().usernameFragment);
                      var s = u.writeCandidate(i);
                      (a.candidate = Object.assign(
                        a.candidate,
                        u.parseCandidate(s)
                      )),
                        (a.candidate.candidate = s),
                        (a.candidate.toJSON = function() {
                          return {
                            candidate: a.candidate.candidate,
                            sdpMid: a.candidate.sdpMid,
                            sdpMLineIndex: a.candidate.sdpMLineIndex,
                            usernameFragment: a.candidate.usernameFragment
                          };
                        });
                    }
                    var d = u.getMediaSections(o._localDescription.sdp);
                    (d[a.candidate.sdpMLineIndex] += c
                      ? "a=end-of-candidates\r\n"
                      : "a=" + a.candidate.candidate + "\r\n"),
                      (o._localDescription.sdp =
                        u.getDescription(o._localDescription.sdp) + d.join(""));
                    var l = o.transceivers.every(function(e) {
                      return (
                        e.iceGatherer && "completed" === e.iceGatherer.state
                      );
                    });
                    "gathering" !== o.iceGatheringState &&
                      ((o.iceGatheringState = "gathering"),
                      o._emitGatheringStateChange()),
                      c || o._dispatchEvent("icecandidate", a),
                      l &&
                        (o._dispatchEvent(
                          "icecandidate",
                          new Event("icecandidate")
                        ),
                        (o.iceGatheringState = "complete"),
                        o._emitGatheringStateChange());
                  }
                }),
                e.setTimeout(function() {
                  a.forEach(function(e) {
                    n.onlocalcandidate(e);
                  });
                }, 0);
            }
          }),
          (p.prototype._createIceAndDtlsTransports = function() {
            var t = this,
              r = new e.RTCIceTransport(null);
            r.onicestatechange = function() {
              t._updateIceConnectionState(), t._updateConnectionState();
            };
            var o = new e.RTCDtlsTransport(r);
            return (
              (o.ondtlsstatechange = function() {
                t._updateConnectionState();
              }),
              (o.onerror = function() {
                Object.defineProperty(o, "state", {
                  value: "failed",
                  writable: !0
                }),
                  t._updateConnectionState();
              }),
              { iceTransport: r, dtlsTransport: o }
            );
          }),
          (p.prototype._disposeIceAndDtlsTransports = function(e) {
            var t = this.transceivers[e].iceGatherer;
            t &&
              (delete t.onlocalcandidate,
              delete this.transceivers[e].iceGatherer);
            var r = this.transceivers[e].iceTransport;
            r &&
              (delete r.onicestatechange,
              delete this.transceivers[e].iceTransport);
            var o = this.transceivers[e].dtlsTransport;
            o &&
              (delete o.ondtlsstatechange,
              delete o.onerror,
              delete this.transceivers[e].dtlsTransport);
          }),
          (p.prototype._transceive = function(e, r, o) {
            var n = i(e.localCapabilities, e.remoteCapabilities);
            r &&
              e.rtpSender &&
              ((n.encodings = e.sendEncodingParameters),
              (n.rtcp = {
                cname: u.localCName,
                compound: e.rtcpParameters.compound
              }),
              e.recvEncodingParameters.length &&
                (n.rtcp.ssrc = e.recvEncodingParameters[0].ssrc),
              e.rtpSender.send(n)),
              o &&
                e.rtpReceiver &&
                n.codecs.length > 0 &&
                ("video" === e.kind &&
                  e.recvEncodingParameters &&
                  t < 15019 &&
                  e.recvEncodingParameters.forEach(function(e) {
                    delete e.rtx;
                  }),
                e.recvEncodingParameters.length
                  ? (n.encodings = e.recvEncodingParameters)
                  : (n.encodings = [{}]),
                (n.rtcp = { compound: e.rtcpParameters.compound }),
                e.rtcpParameters.cname &&
                  (n.rtcp.cname = e.rtcpParameters.cname),
                e.sendEncodingParameters.length &&
                  (n.rtcp.ssrc = e.sendEncodingParameters[0].ssrc),
                e.rtpReceiver.receive(n));
          }),
          (p.prototype.setLocalDescription = function(e) {
            var t = this;
            if (-1 === ["offer", "answer"].indexOf(e.type))
              return Promise.reject(
                d("TypeError", 'Unsupported type "' + e.type + '"')
              );
            if (
              !c("setLocalDescription", e.type, t.signalingState) ||
              t._isClosed
            )
              return Promise.reject(
                d(
                  "InvalidStateError",
                  "Can not set local " +
                    e.type +
                    " in state " +
                    t.signalingState
                )
              );
            var r, o;
            if ("offer" === e.type)
              (r = u.splitSections(e.sdp)),
                (o = r.shift()),
                r.forEach(function(e, r) {
                  var o = u.parseRtpParameters(e);
                  t.transceivers[r].localCapabilities = o;
                }),
                t.transceivers.forEach(function(e, r) {
                  t._gather(e.mid, r);
                });
            else if ("answer" === e.type) {
              (r = u.splitSections(t._remoteDescription.sdp)), (o = r.shift());
              var n = u.matchPrefix(o, "a=ice-lite").length > 0;
              r.forEach(function(e, r) {
                var a = t.transceivers[r],
                  c = a.iceGatherer,
                  s = a.iceTransport,
                  d = a.dtlsTransport,
                  l = a.localCapabilities,
                  f = a.remoteCapabilities;
                if (
                  !(
                    (u.isRejected(e) &&
                      0 === u.matchPrefix(e, "a=bundle-only").length) ||
                    a.rejected
                  )
                ) {
                  var p = u.getIceParameters(e, o),
                    m = u.getDtlsParameters(e, o);
                  n && (m.role = "server"),
                    (t.usingBundle && 0 !== r) ||
                      (t._gather(a.mid, r),
                      "new" === s.state &&
                        s.start(c, p, n ? "controlling" : "controlled"),
                      "new" === d.state && d.start(m));
                  var v = i(l, f);
                  t._transceive(a, v.codecs.length > 0, !1);
                }
              });
            }
            return (
              (t._localDescription = { type: e.type, sdp: e.sdp }),
              "offer" === e.type
                ? t._updateSignalingState("have-local-offer")
                : t._updateSignalingState("stable"),
              Promise.resolve()
            );
          }),
          (p.prototype.setRemoteDescription = function(o) {
            var n = this;
            if (-1 === ["offer", "answer"].indexOf(o.type))
              return Promise.reject(
                d("TypeError", 'Unsupported type "' + o.type + '"')
              );
            if (
              !c("setRemoteDescription", o.type, n.signalingState) ||
              n._isClosed
            )
              return Promise.reject(
                d(
                  "InvalidStateError",
                  "Can not set remote " +
                    o.type +
                    " in state " +
                    n.signalingState
                )
              );
            var a = {};
            n.remoteStreams.forEach(function(e) {
              a[e.id] = e;
            });
            var p = [],
              m = u.splitSections(o.sdp),
              v = m.shift(),
              h = u.matchPrefix(v, "a=ice-lite").length > 0,
              k = u.matchPrefix(v, "a=group:BUNDLE ").length > 0;
            n.usingBundle = k;
            var C = u.matchPrefix(v, "a=ice-options:")[0];
            return (
              (n.canTrickleIceCandidates =
                !!C &&
                C.substr(14)
                  .split(" ")
                  .indexOf("trickle") >= 0),
              m.forEach(function(c, d) {
                var f = u.splitLines(c),
                  m = u.getKind(c),
                  C =
                    u.isRejected(c) &&
                    0 === u.matchPrefix(c, "a=bundle-only").length,
                  y = f[0].substr(2).split(" ")[2],
                  g = u.getDirection(c, v),
                  B = u.parseMsid(c),
                  w = u.getMid(c) || u.generateIdentifier();
                if (
                  C ||
                  ("application" === m &&
                    ("DTLS/SCTP" === y || "UDP/DTLS/SCTP" === y))
                )
                  return void (n.transceivers[d] = {
                    mid: w,
                    kind: m,
                    protocol: y,
                    rejected: !0
                  });
                !C &&
                  n.transceivers[d] &&
                  n.transceivers[d].rejected &&
                  (n.transceivers[d] = n._createTransceiver(m, !0));
                var P,
                  b,
                  S,
                  T,
                  x,
                  R,
                  _,
                  E,
                  M,
                  O,
                  L,
                  j = u.parseRtpParameters(c);
                C ||
                  ((O = u.getIceParameters(c, v)),
                  (L = u.getDtlsParameters(c, v)),
                  (L.role = "client")),
                  (_ = u.parseRtpEncodingParameters(c));
                var D = u.parseRtcpParameters(c),
                  I = u.matchPrefix(c, "a=end-of-candidates", v).length > 0,
                  N = u
                    .matchPrefix(c, "a=candidate:")
                    .map(function(e) {
                      return u.parseCandidate(e);
                    })
                    .filter(function(e) {
                      return 1 === e.component;
                    });
                if (
                  (("offer" === o.type || "answer" === o.type) &&
                    !C &&
                    k &&
                    d > 0 &&
                    n.transceivers[d] &&
                    (n._disposeIceAndDtlsTransports(d),
                    (n.transceivers[d].iceGatherer =
                      n.transceivers[0].iceGatherer),
                    (n.transceivers[d].iceTransport =
                      n.transceivers[0].iceTransport),
                    (n.transceivers[d].dtlsTransport =
                      n.transceivers[0].dtlsTransport),
                    n.transceivers[d].rtpSender &&
                      n.transceivers[d].rtpSender.setTransport(
                        n.transceivers[0].dtlsTransport
                      ),
                    n.transceivers[d].rtpReceiver &&
                      n.transceivers[d].rtpReceiver.setTransport(
                        n.transceivers[0].dtlsTransport
                      )),
                  "offer" !== o.type || C)
                ) {
                  if ("answer" === o.type && !C) {
                    (P = n.transceivers[d]),
                      (b = P.iceGatherer),
                      (S = P.iceTransport),
                      (T = P.dtlsTransport),
                      (x = P.rtpReceiver),
                      (R = P.sendEncodingParameters),
                      (E = P.localCapabilities),
                      (n.transceivers[d].recvEncodingParameters = _),
                      (n.transceivers[d].remoteCapabilities = j),
                      (n.transceivers[d].rtcpParameters = D),
                      N.length &&
                        "new" === S.state &&
                        ((!h && !I) || (k && 0 !== d)
                          ? N.forEach(function(e) {
                              s(P.iceTransport, e);
                            })
                          : S.setRemoteCandidates(N)),
                      (k && 0 !== d) ||
                        ("new" === S.state && S.start(b, O, "controlling"),
                        "new" === T.state && T.start(L));
                    var A = i(P.localCapabilities, P.remoteCapabilities),
                      F = A.codecs.filter(function(e) {
                        return "rtx" === e.name.toLowerCase();
                      }).length;
                    !F &&
                      P.sendEncodingParameters[0].rtx &&
                      delete P.sendEncodingParameters[0].rtx,
                      n._transceive(
                        P,
                        "sendrecv" === g || "recvonly" === g,
                        "sendrecv" === g || "sendonly" === g
                      ),
                      !x || ("sendrecv" !== g && "sendonly" !== g)
                        ? delete P.rtpReceiver
                        : ((M = x.track),
                          B
                            ? (a[B.stream] ||
                                (a[B.stream] = new e.MediaStream()),
                              r(M, a[B.stream]),
                              p.push([M, x, a[B.stream]]))
                            : (a.default || (a.default = new e.MediaStream()),
                              r(M, a.default),
                              p.push([M, x, a.default])));
                  }
                } else {
                  (P = n.transceivers[d] || n._createTransceiver(m)),
                    (P.mid = w),
                    P.iceGatherer ||
                      (P.iceGatherer = n._createIceGatherer(d, k)),
                    N.length &&
                      "new" === P.iceTransport.state &&
                      (!I || (k && 0 !== d)
                        ? N.forEach(function(e) {
                            s(P.iceTransport, e);
                          })
                        : P.iceTransport.setRemoteCandidates(N)),
                    (E = e.RTCRtpReceiver.getCapabilities(m)),
                    t < 15019 &&
                      (E.codecs = E.codecs.filter(function(e) {
                        return "rtx" !== e.name;
                      })),
                    (R = P.sendEncodingParameters || [
                      { ssrc: 1001 * (2 * d + 2) }
                    ]);
                  var U = !1;
                  if ("sendrecv" === g || "sendonly" === g) {
                    if (
                      ((U = !P.rtpReceiver),
                      (x =
                        P.rtpReceiver ||
                        new e.RTCRtpReceiver(P.dtlsTransport, m)),
                      U)
                    ) {
                      var G;
                      (M = x.track),
                        (B && "-" === B.stream) ||
                          (B
                            ? (a[B.stream] ||
                                ((a[B.stream] = new e.MediaStream()),
                                Object.defineProperty(a[B.stream], "id", {
                                  get: function() {
                                    return B.stream;
                                  }
                                })),
                              Object.defineProperty(M, "id", {
                                get: function() {
                                  return B.track;
                                }
                              }),
                              (G = a[B.stream]))
                            : (a.default || (a.default = new e.MediaStream()),
                              (G = a.default))),
                        G && (r(M, G), P.associatedRemoteMediaStreams.push(G)),
                        p.push([M, x, G]);
                    }
                  } else
                    P.rtpReceiver &&
                      P.rtpReceiver.track &&
                      (P.associatedRemoteMediaStreams.forEach(function(e) {
                        var t = e.getTracks().find(function(e) {
                          return e.id === P.rtpReceiver.track.id;
                        });
                        t && l(t, e);
                      }),
                      (P.associatedRemoteMediaStreams = []));
                  (P.localCapabilities = E),
                    (P.remoteCapabilities = j),
                    (P.rtpReceiver = x),
                    (P.rtcpParameters = D),
                    (P.sendEncodingParameters = R),
                    (P.recvEncodingParameters = _),
                    n._transceive(n.transceivers[d], !1, U);
                }
              }),
              void 0 === n._dtlsRole &&
                (n._dtlsRole = "offer" === o.type ? "active" : "passive"),
              (n._remoteDescription = { type: o.type, sdp: o.sdp }),
              "offer" === o.type
                ? n._updateSignalingState("have-remote-offer")
                : n._updateSignalingState("stable"),
              Object.keys(a).forEach(function(t) {
                var r = a[t];
                if (r.getTracks().length) {
                  if (-1 === n.remoteStreams.indexOf(r)) {
                    n.remoteStreams.push(r);
                    var o = new Event("addstream");
                    (o.stream = r),
                      e.setTimeout(function() {
                        n._dispatchEvent("addstream", o);
                      });
                  }
                  p.forEach(function(e) {
                    var t = e[0],
                      o = e[1];
                    r.id === e[2].id && f(n, t, o, [r]);
                  });
                }
              }),
              p.forEach(function(e) {
                e[2] || f(n, e[0], e[1], []);
              }),
              e.setTimeout(function() {
                n &&
                  n.transceivers &&
                  n.transceivers.forEach(function(e) {
                    e.iceTransport &&
                      "new" === e.iceTransport.state &&
                      e.iceTransport.getRemoteCandidates().length > 0 &&
                      (console.warn(
                        "Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"
                      ),
                      e.iceTransport.addRemoteCandidate({}));
                  });
              }, 4e3),
              Promise.resolve()
            );
          }),
          (p.prototype.close = function() {
            this.transceivers.forEach(function(e) {
              e.iceTransport && e.iceTransport.stop(),
                e.dtlsTransport && e.dtlsTransport.stop(),
                e.rtpSender && e.rtpSender.stop(),
                e.rtpReceiver && e.rtpReceiver.stop();
            }),
              (this._isClosed = !0),
              this._updateSignalingState("closed");
          }),
          (p.prototype._updateSignalingState = function(e) {
            this.signalingState = e;
            var t = new Event("signalingstatechange");
            this._dispatchEvent("signalingstatechange", t);
          }),
          (p.prototype._maybeFireNegotiationNeeded = function() {
            var t = this;
            "stable" === this.signalingState &&
              !0 !== this.needNegotiation &&
              ((this.needNegotiation = !0),
              e.setTimeout(function() {
                if (t.needNegotiation) {
                  t.needNegotiation = !1;
                  var e = new Event("negotiationneeded");
                  t._dispatchEvent("negotiationneeded", e);
                }
              }, 0));
          }),
          (p.prototype._updateIceConnectionState = function() {
            var e,
              t = {
                new: 0,
                closed: 0,
                checking: 0,
                connected: 0,
                completed: 0,
                disconnected: 0,
                failed: 0
              };
            if (
              (this.transceivers.forEach(function(e) {
                e.iceTransport && !e.rejected && t[e.iceTransport.state]++;
              }),
              (e = "new"),
              t.failed > 0
                ? (e = "failed")
                : t.checking > 0
                ? (e = "checking")
                : t.disconnected > 0
                ? (e = "disconnected")
                : t.new > 0
                ? (e = "new")
                : t.connected > 0
                ? (e = "connected")
                : t.completed > 0 && (e = "completed"),
              e !== this.iceConnectionState)
            ) {
              this.iceConnectionState = e;
              var r = new Event("iceconnectionstatechange");
              this._dispatchEvent("iceconnectionstatechange", r);
            }
          }),
          (p.prototype._updateConnectionState = function() {
            var e,
              t = {
                new: 0,
                closed: 0,
                connecting: 0,
                connected: 0,
                completed: 0,
                disconnected: 0,
                failed: 0
              };
            if (
              (this.transceivers.forEach(function(e) {
                e.iceTransport &&
                  e.dtlsTransport &&
                  !e.rejected &&
                  (t[e.iceTransport.state]++, t[e.dtlsTransport.state]++);
              }),
              (t.connected += t.completed),
              (e = "new"),
              t.failed > 0
                ? (e = "failed")
                : t.connecting > 0
                ? (e = "connecting")
                : t.disconnected > 0
                ? (e = "disconnected")
                : t.new > 0
                ? (e = "new")
                : t.connected > 0 && (e = "connected"),
              e !== this.connectionState)
            ) {
              this.connectionState = e;
              var r = new Event("connectionstatechange");
              this._dispatchEvent("connectionstatechange", r);
            }
          }),
          (p.prototype.createOffer = function() {
            var r = this;
            if (r._isClosed)
              return Promise.reject(
                d("InvalidStateError", "Can not call createOffer after close")
              );
            var o = r.transceivers.filter(function(e) {
                return "audio" === e.kind;
              }).length,
              a = r.transceivers.filter(function(e) {
                return "video" === e.kind;
              }).length,
              i = arguments[0];
            if (i) {
              if (i.mandatory || i.optional)
                throw new TypeError(
                  "Legacy mandatory/optional constraints not supported."
                );
              void 0 !== i.offerToReceiveAudio &&
                (o =
                  !0 === i.offerToReceiveAudio
                    ? 1
                    : !1 === i.offerToReceiveAudio
                    ? 0
                    : i.offerToReceiveAudio),
                void 0 !== i.offerToReceiveVideo &&
                  (a =
                    !0 === i.offerToReceiveVideo
                      ? 1
                      : !1 === i.offerToReceiveVideo
                      ? 0
                      : i.offerToReceiveVideo);
            }
            for (
              r.transceivers.forEach(function(e) {
                "audio" === e.kind
                  ? --o < 0 && (e.wantReceive = !1)
                  : "video" === e.kind && --a < 0 && (e.wantReceive = !1);
              });
              o > 0 || a > 0;

            )
              o > 0 && (r._createTransceiver("audio"), o--),
                a > 0 && (r._createTransceiver("video"), a--);
            var c = u.writeSessionBoilerplate(
              r._sdpSessionId,
              r._sdpSessionVersion++
            );
            r.transceivers.forEach(function(o, n) {
              var a = o.track,
                i = o.kind,
                c = o.mid || u.generateIdentifier();
              (o.mid = c),
                o.iceGatherer ||
                  (o.iceGatherer = r._createIceGatherer(n, r.usingBundle));
              var s = e.RTCRtpSender.getCapabilities(i);
              t < 15019 &&
                (s.codecs = s.codecs.filter(function(e) {
                  return "rtx" !== e.name;
                })),
                s.codecs.forEach(function(e) {
                  "H264" === e.name &&
                    void 0 === e.parameters["level-asymmetry-allowed"] &&
                    (e.parameters["level-asymmetry-allowed"] = "1"),
                    o.remoteCapabilities &&
                      o.remoteCapabilities.codecs &&
                      o.remoteCapabilities.codecs.forEach(function(t) {
                        e.name.toLowerCase() === t.name.toLowerCase() &&
                          e.clockRate === t.clockRate &&
                          (e.preferredPayloadType = t.payloadType);
                      });
                }),
                s.headerExtensions.forEach(function(e) {
                  (
                    (o.remoteCapabilities &&
                      o.remoteCapabilities.headerExtensions) ||
                    []
                  ).forEach(function(t) {
                    e.uri === t.uri && (e.id = t.id);
                  });
                });
              var d = o.sendEncodingParameters || [
                { ssrc: 1001 * (2 * n + 1) }
              ];
              a &&
                t >= 15019 &&
                "video" === i &&
                !d[0].rtx &&
                (d[0].rtx = { ssrc: d[0].ssrc + 1 }),
                o.wantReceive &&
                  (o.rtpReceiver = new e.RTCRtpReceiver(o.dtlsTransport, i)),
                (o.localCapabilities = s),
                (o.sendEncodingParameters = d);
            }),
              "max-compat" !== r._config.bundlePolicy &&
                (c +=
                  "a=group:BUNDLE " +
                  r.transceivers
                    .map(function(e) {
                      return e.mid;
                    })
                    .join(" ") +
                  "\r\n"),
              (c += "a=ice-options:trickle\r\n"),
              r.transceivers.forEach(function(e, t) {
                (c += n(
                  e,
                  e.localCapabilities,
                  "offer",
                  e.stream,
                  r._dtlsRole
                )),
                  (c += "a=rtcp-rsize\r\n"),
                  !e.iceGatherer ||
                    "new" === r.iceGatheringState ||
                    (0 !== t && r.usingBundle) ||
                    (e.iceGatherer.getLocalCandidates().forEach(function(e) {
                      (e.component = 1),
                        (c += "a=" + u.writeCandidate(e) + "\r\n");
                    }),
                    "completed" === e.iceGatherer.state &&
                      (c += "a=end-of-candidates\r\n"));
              });
            var s = new e.RTCSessionDescription({ type: "offer", sdp: c });
            return Promise.resolve(s);
          }),
          (p.prototype.createAnswer = function() {
            var r = this;
            if (r._isClosed)
              return Promise.reject(
                d("InvalidStateError", "Can not call createAnswer after close")
              );
            if (
              "have-remote-offer" !== r.signalingState &&
              "have-local-pranswer" !== r.signalingState
            )
              return Promise.reject(
                d(
                  "InvalidStateError",
                  "Can not call createAnswer in signalingState " +
                    r.signalingState
                )
              );
            var o = u.writeSessionBoilerplate(
              r._sdpSessionId,
              r._sdpSessionVersion++
            );
            r.usingBundle &&
              (o +=
                "a=group:BUNDLE " +
                r.transceivers
                  .map(function(e) {
                    return e.mid;
                  })
                  .join(" ") +
                "\r\n"),
              (o += "a=ice-options:trickle\r\n");
            var a = u.getMediaSections(r._remoteDescription.sdp).length;
            r.transceivers.forEach(function(e, c) {
              if (!(c + 1 > a)) {
                if (e.rejected)
                  return (
                    "application" === e.kind
                      ? "DTLS/SCTP" === e.protocol
                        ? (o += "m=application 0 DTLS/SCTP 5000\r\n")
                        : (o +=
                            "m=application 0 " +
                            e.protocol +
                            " webrtc-datachannel\r\n")
                      : "audio" === e.kind
                      ? (o +=
                          "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n")
                      : "video" === e.kind &&
                        (o +=
                          "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"),
                    void (o +=
                      "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" +
                      e.mid +
                      "\r\n")
                  );
                if (e.stream) {
                  var s;
                  "audio" === e.kind
                    ? (s = e.stream.getAudioTracks()[0])
                    : "video" === e.kind && (s = e.stream.getVideoTracks()[0]),
                    s &&
                      t >= 15019 &&
                      "video" === e.kind &&
                      !e.sendEncodingParameters[0].rtx &&
                      (e.sendEncodingParameters[0].rtx = {
                        ssrc: e.sendEncodingParameters[0].ssrc + 1
                      });
                }
                var d = i(e.localCapabilities, e.remoteCapabilities);
                !d.codecs.filter(function(e) {
                  return "rtx" === e.name.toLowerCase();
                }).length &&
                  e.sendEncodingParameters[0].rtx &&
                  delete e.sendEncodingParameters[0].rtx,
                  (o += n(e, d, "answer", e.stream, r._dtlsRole)),
                  e.rtcpParameters &&
                    e.rtcpParameters.reducedSize &&
                    (o += "a=rtcp-rsize\r\n");
              }
            });
            var c = new e.RTCSessionDescription({ type: "answer", sdp: o });
            return Promise.resolve(c);
          }),
          (p.prototype.addIceCandidate = function(e) {
            var t,
              r = this;
            return e && void 0 === e.sdpMLineIndex && !e.sdpMid
              ? Promise.reject(
                  new TypeError("sdpMLineIndex or sdpMid required")
                )
              : new Promise(function(o, n) {
                  if (!r._remoteDescription)
                    return n(
                      d(
                        "InvalidStateError",
                        "Can not add ICE candidate without a remote description"
                      )
                    );
                  if (e && "" !== e.candidate) {
                    var a = e.sdpMLineIndex;
                    if (e.sdpMid)
                      for (var i = 0; i < r.transceivers.length; i++)
                        if (r.transceivers[i].mid === e.sdpMid) {
                          a = i;
                          break;
                        }
                    var c = r.transceivers[a];
                    if (!c)
                      return n(
                        d("OperationError", "Can not add ICE candidate")
                      );
                    if (c.rejected) return o();
                    var l =
                      Object.keys(e.candidate).length > 0
                        ? u.parseCandidate(e.candidate)
                        : {};
                    if ("tcp" === l.protocol && (0 === l.port || 9 === l.port))
                      return o();
                    if (l.component && 1 !== l.component) return o();
                    if (
                      (0 === a ||
                        (a > 0 &&
                          c.iceTransport !== r.transceivers[0].iceTransport)) &&
                      !s(c.iceTransport, l)
                    )
                      return n(
                        d("OperationError", "Can not add ICE candidate")
                      );
                    var f = e.candidate.trim();
                    0 === f.indexOf("a=") && (f = f.substr(2)),
                      (t = u.getMediaSections(r._remoteDescription.sdp)),
                      (t[a] +=
                        "a=" + (l.type ? f : "end-of-candidates") + "\r\n"),
                      (r._remoteDescription.sdp =
                        u.getDescription(r._remoteDescription.sdp) +
                        t.join(""));
                  } else for (var p = 0; p < r.transceivers.length && (r.transceivers[p].rejected || (r.transceivers[p].iceTransport.addRemoteCandidate({}), (t = u.getMediaSections(r._remoteDescription.sdp)), (t[p] += "a=end-of-candidates\r\n"), (r._remoteDescription.sdp = u.getDescription(r._remoteDescription.sdp) + t.join("")), !r.usingBundle)); p++);
                  o();
                });
          }),
          (p.prototype.getStats = function(t) {
            if (t && t instanceof e.MediaStreamTrack) {
              var r = null;
              if (
                (this.transceivers.forEach(function(e) {
                  e.rtpSender && e.rtpSender.track === t
                    ? (r = e.rtpSender)
                    : e.rtpReceiver &&
                      e.rtpReceiver.track === t &&
                      (r = e.rtpReceiver);
                }),
                !r)
              )
                throw d("InvalidAccessError", "Invalid selector.");
              return r.getStats();
            }
            var o = [];
            return (
              this.transceivers.forEach(function(e) {
                [
                  "rtpSender",
                  "rtpReceiver",
                  "iceGatherer",
                  "iceTransport",
                  "dtlsTransport"
                ].forEach(function(t) {
                  e[t] && o.push(e[t].getStats());
                });
              }),
              Promise.all(o).then(function(e) {
                var t = new Map();
                return (
                  e.forEach(function(e) {
                    e.forEach(function(e) {
                      t.set(e.id, e);
                    });
                  }),
                  t
                );
              })
            );
          }),
          [
            "RTCRtpSender",
            "RTCRtpReceiver",
            "RTCIceGatherer",
            "RTCIceTransport",
            "RTCDtlsTransport"
          ].forEach(function(t) {
            var r = e[t];
            if (r && r.prototype && r.prototype.getStats) {
              var n = r.prototype.getStats;
              r.prototype.getStats = function() {
                return n.apply(this).then(function(e) {
                  var t = new Map();
                  return (
                    Object.keys(e).forEach(function(r) {
                      (e[r].type = o(e[r])), t.set(r, e[r]);
                    }),
                    t
                  );
                });
              };
            }
          });
        var m = ["createOffer", "createAnswer"];
        return (
          m.forEach(function(e) {
            var t = p.prototype[e];
            p.prototype[e] = function() {
              var e = arguments;
              return "function" == typeof e[0] || "function" == typeof e[1]
                ? t.apply(this, [arguments[2]]).then(
                    function(t) {
                      "function" == typeof e[0] && e[0].apply(null, [t]);
                    },
                    function(t) {
                      "function" == typeof e[1] && e[1].apply(null, [t]);
                    }
                  )
                : t.apply(this, arguments);
            };
          }),
          (m = [
            "setLocalDescription",
            "setRemoteDescription",
            "addIceCandidate"
          ]),
          m.forEach(function(e) {
            var t = p.prototype[e];
            p.prototype[e] = function() {
              var e = arguments;
              return "function" == typeof e[1] || "function" == typeof e[2]
                ? t.apply(this, arguments).then(
                    function() {
                      "function" == typeof e[1] && e[1].apply(null);
                    },
                    function(t) {
                      "function" == typeof e[2] && e[2].apply(null, [t]);
                    }
                  )
                : t.apply(this, arguments);
            };
          }),
          ["getStats"].forEach(function(e) {
            var t = p.prototype[e];
            p.prototype[e] = function() {
              var e = arguments;
              return "function" == typeof e[1]
                ? t.apply(this, arguments).then(function() {
                    "function" == typeof e[1] && e[1].apply(null);
                  })
                : t.apply(this, arguments);
            };
          }),
          p
        );
      };
    },
    function(e, t, r) {
      "use strict";
      e.exports = function(e) {
        var t = e && e.navigator,
          r = function(e) {
            return {
              name:
                { PermissionDeniedError: "NotAllowedError" }[e.name] || e.name,
              message: e.message,
              constraint: e.constraint,
              toString: function() {
                return this.name;
              }
            };
          },
          o = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
        t.mediaDevices.getUserMedia = function(e) {
          return o(e).catch(function(e) {
            return Promise.reject(r(e));
          });
        };
      };
    },
    function(e, t, r) {
      "use strict";
      var o = r(6);
      e.exports = {
        shimGetUserMedia: r(112),
        shimOnTrack: function(e) {
          "object" != typeof e ||
            !e.RTCPeerConnection ||
            "ontrack" in e.RTCPeerConnection.prototype ||
            Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
              get: function() {
                return this._ontrack;
              },
              set: function(e) {
                this._ontrack &&
                  (this.removeEventListener("track", this._ontrack),
                  this.removeEventListener("addstream", this._ontrackpoly)),
                  this.addEventListener("track", (this._ontrack = e)),
                  this.addEventListener(
                    "addstream",
                    (this._ontrackpoly = function(e) {
                      e.stream.getTracks().forEach(
                        function(t) {
                          var r = new Event("track");
                          (r.track = t),
                            (r.receiver = { track: t }),
                            (r.transceiver = { receiver: r.receiver }),
                            (r.streams = [e.stream]),
                            this.dispatchEvent(r);
                        }.bind(this)
                      );
                    }.bind(this))
                  );
              },
              enumerable: !0,
              configurable: !0
            }),
            "object" == typeof e &&
              e.RTCTrackEvent &&
              "receiver" in e.RTCTrackEvent.prototype &&
              !("transceiver" in e.RTCTrackEvent.prototype) &&
              Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
                get: function() {
                  return { receiver: this.receiver };
                }
              });
        },
        shimSourceObject: function(e) {
          "object" == typeof e &&
            (!e.HTMLMediaElement ||
              "srcObject" in e.HTMLMediaElement.prototype ||
              Object.defineProperty(e.HTMLMediaElement.prototype, "srcObject", {
                get: function() {
                  return this.mozSrcObject;
                },
                set: function(e) {
                  this.mozSrcObject = e;
                }
              }));
        },
        shimPeerConnection: function(e) {
          var t = o.detectBrowser(e);
          if (
            "object" == typeof e &&
            (e.RTCPeerConnection || e.mozRTCPeerConnection)
          ) {
            e.RTCPeerConnection ||
              ((e.RTCPeerConnection = function(r, o) {
                if (t.version < 38 && r && r.iceServers) {
                  for (var n = [], a = 0; a < r.iceServers.length; a++) {
                    var i = r.iceServers[a];
                    if (i.hasOwnProperty("urls"))
                      for (var c = 0; c < i.urls.length; c++) {
                        var s = { url: i.urls[c] };
                        0 === i.urls[c].indexOf("turn") &&
                          ((s.username = i.username),
                          (s.credential = i.credential)),
                          n.push(s);
                      }
                    else n.push(r.iceServers[a]);
                  }
                  r.iceServers = n;
                }
                return new e.mozRTCPeerConnection(r, o);
              }),
              (e.RTCPeerConnection.prototype =
                e.mozRTCPeerConnection.prototype),
              e.mozRTCPeerConnection.generateCertificate &&
                Object.defineProperty(
                  e.RTCPeerConnection,
                  "generateCertificate",
                  {
                    get: function() {
                      return e.mozRTCPeerConnection.generateCertificate;
                    }
                  }
                ),
              (e.RTCSessionDescription = e.mozRTCSessionDescription),
              (e.RTCIceCandidate = e.mozRTCIceCandidate)),
              [
                "setLocalDescription",
                "setRemoteDescription",
                "addIceCandidate"
              ].forEach(function(t) {
                var r = e.RTCPeerConnection.prototype[t];
                e.RTCPeerConnection.prototype[t] = function() {
                  return (
                    (arguments[0] = new ("addIceCandidate" === t
                      ? e.RTCIceCandidate
                      : e.RTCSessionDescription)(arguments[0])),
                    r.apply(this, arguments)
                  );
                };
              });
            var r = e.RTCPeerConnection.prototype.addIceCandidate;
            e.RTCPeerConnection.prototype.addIceCandidate = function() {
              return arguments[0]
                ? r.apply(this, arguments)
                : (arguments[1] && arguments[1].apply(null), Promise.resolve());
            };
            var n = function(e) {
                var t = new Map();
                return (
                  Object.keys(e).forEach(function(r) {
                    t.set(r, e[r]), (t[r] = e[r]);
                  }),
                  t
                );
              },
              a = {
                inboundrtp: "inbound-rtp",
                outboundrtp: "outbound-rtp",
                candidatepair: "candidate-pair",
                localcandidate: "local-candidate",
                remotecandidate: "remote-candidate"
              },
              i = e.RTCPeerConnection.prototype.getStats;
            e.RTCPeerConnection.prototype.getStats = function(e, r, o) {
              return i
                .apply(this, [e || null])
                .then(function(e) {
                  if ((t.version < 48 && (e = n(e)), t.version < 53 && !r))
                    try {
                      e.forEach(function(e) {
                        e.type = a[e.type] || e.type;
                      });
                    } catch (t) {
                      if ("TypeError" !== t.name) throw t;
                      e.forEach(function(t, r) {
                        e.set(
                          r,
                          Object.assign({}, t, { type: a[t.type] || t.type })
                        );
                      });
                    }
                  return e;
                })
                .then(r, o);
            };
          }
        },
        shimSenderGetStats: function(e) {
          if (
            "object" == typeof e &&
            e.RTCPeerConnection &&
            e.RTCRtpSender &&
            !(e.RTCRtpSender && "getStats" in e.RTCRtpSender.prototype)
          ) {
            var t = e.RTCPeerConnection.prototype.getSenders;
            t &&
              (e.RTCPeerConnection.prototype.getSenders = function() {
                var e = this,
                  r = t.apply(e, []);
                return (
                  r.forEach(function(t) {
                    t._pc = e;
                  }),
                  r
                );
              });
            var r = e.RTCPeerConnection.prototype.addTrack;
            r &&
              (e.RTCPeerConnection.prototype.addTrack = function() {
                var e = r.apply(this, arguments);
                return (e._pc = this), e;
              }),
              (e.RTCRtpSender.prototype.getStats = function() {
                return this.track
                  ? this._pc.getStats(this.track)
                  : Promise.resolve(new Map());
              });
          }
        },
        shimReceiverGetStats: function(e) {
          if (
            "object" == typeof e &&
            e.RTCPeerConnection &&
            e.RTCRtpSender &&
            !(e.RTCRtpSender && "getStats" in e.RTCRtpReceiver.prototype)
          ) {
            var t = e.RTCPeerConnection.prototype.getReceivers;
            t &&
              (e.RTCPeerConnection.prototype.getReceivers = function() {
                var e = this,
                  r = t.apply(e, []);
                return (
                  r.forEach(function(t) {
                    t._pc = e;
                  }),
                  r
                );
              }),
              o.wrapPeerConnectionEvent(e, "track", function(e) {
                return (e.receiver._pc = e.srcElement), e;
              }),
              (e.RTCRtpReceiver.prototype.getStats = function() {
                return this._pc.getStats(this.track);
              });
          }
        },
        shimRemoveStream: function(e) {
          !e.RTCPeerConnection ||
            "removeStream" in e.RTCPeerConnection.prototype ||
            (e.RTCPeerConnection.prototype.removeStream = function(e) {
              var t = this;
              o.deprecated("removeStream", "removeTrack"),
                this.getSenders().forEach(function(r) {
                  r.track &&
                    -1 !== e.getTracks().indexOf(r.track) &&
                    t.removeTrack(r);
                });
            });
        },
        shimRTCDataChannel: function(e) {
          e.DataChannel &&
            !e.RTCDataChannel &&
            (e.RTCDataChannel = e.DataChannel);
        },
        shimGetDisplayMedia: function(e, t) {
          !e.navigator ||
            !e.navigator.mediaDevices ||
            "getDisplayMedia" in e.navigator.mediaDevices ||
            ((e.navigator.mediaDevices.getDisplayMedia = function(r) {
              if (!r || !r.video) {
                var o = new DOMException(
                  "getDisplayMedia without video constraints is undefined"
                );
                return (
                  (o.name = "NotFoundError"), (o.code = 8), Promise.reject(o)
                );
              }
              return (
                !0 === r.video
                  ? (r.video = { mediaSource: t })
                  : (r.video.mediaSource = t),
                e.navigator.mediaDevices.getUserMedia(r)
              );
            }),
            (e.navigator.getDisplayMedia = function(t) {
              return (
                o.deprecated(
                  "navigator.getDisplayMedia",
                  "navigator.mediaDevices.getDisplayMedia"
                ),
                e.navigator.mediaDevices.getDisplayMedia(t)
              );
            }));
        }
      };
    },
    function(e, t, r) {
      "use strict";
      var o = r(6),
        n = o.log;
      e.exports = function(e) {
        var t = o.detectBrowser(e),
          r = e && e.navigator,
          a = e && e.MediaStreamTrack,
          i = function(e) {
            return {
              name:
                {
                  InternalError: "NotReadableError",
                  NotSupportedError: "TypeError",
                  PermissionDeniedError: "NotAllowedError",
                  SecurityError: "NotAllowedError"
                }[e.name] || e.name,
              message:
                {
                  "The operation is insecure.":
                    "The request is not allowed by the user agent or the platform in the current context."
                }[e.message] || e.message,
              constraint: e.constraint,
              toString: function() {
                return this.name + (this.message && ": ") + this.message;
              }
            };
          },
          c = function(e, o, a) {
            var c = function(e) {
              if ("object" != typeof e || e.require) return e;
              var t = [];
              return (
                Object.keys(e).forEach(function(r) {
                  if (
                    "require" !== r &&
                    "advanced" !== r &&
                    "mediaSource" !== r
                  ) {
                    var o = (e[r] =
                      "object" == typeof e[r] ? e[r] : { ideal: e[r] });
                    if (
                      ((void 0 === o.min &&
                        void 0 === o.max &&
                        void 0 === o.exact) ||
                        t.push(r),
                      void 0 !== o.exact &&
                        ("number" == typeof o.exact
                          ? (o.min = o.max = o.exact)
                          : (e[r] = o.exact),
                        delete o.exact),
                      void 0 !== o.ideal)
                    ) {
                      e.advanced = e.advanced || [];
                      var n = {};
                      "number" == typeof o.ideal
                        ? (n[r] = { min: o.ideal, max: o.ideal })
                        : (n[r] = o.ideal),
                        e.advanced.push(n),
                        delete o.ideal,
                        Object.keys(o).length || delete e[r];
                    }
                  }
                }),
                t.length && (e.require = t),
                e
              );
            };
            return (
              (e = JSON.parse(JSON.stringify(e))),
              t.version < 38 &&
                (n("spec: " + JSON.stringify(e)),
                e.audio && (e.audio = c(e.audio)),
                e.video && (e.video = c(e.video)),
                n("ff37: " + JSON.stringify(e))),
              r.mozGetUserMedia(e, o, function(e) {
                a(i(e));
              })
            );
          },
          s = function(e) {
            return new Promise(function(t, r) {
              c(e, t, r);
            });
          };
        if (
          (r.mediaDevices ||
            (r.mediaDevices = {
              getUserMedia: s,
              addEventListener: function() {},
              removeEventListener: function() {}
            }),
          (r.mediaDevices.enumerateDevices =
            r.mediaDevices.enumerateDevices ||
            function() {
              return new Promise(function(e) {
                e([
                  {
                    kind: "audioinput",
                    deviceId: "default",
                    label: "",
                    groupId: ""
                  },
                  {
                    kind: "videoinput",
                    deviceId: "default",
                    label: "",
                    groupId: ""
                  }
                ]);
              });
            }),
          t.version < 41)
        ) {
          var d = r.mediaDevices.enumerateDevices.bind(r.mediaDevices);
          r.mediaDevices.enumerateDevices = function() {
            return d().then(void 0, function(e) {
              if ("NotFoundError" === e.name) return [];
              throw e;
            });
          };
        }
        if (t.version < 49) {
          var u = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
          r.mediaDevices.getUserMedia = function(e) {
            return u(e).then(
              function(t) {
                if (
                  (e.audio && !t.getAudioTracks().length) ||
                  (e.video && !t.getVideoTracks().length)
                )
                  throw (t.getTracks().forEach(function(e) {
                    e.stop();
                  }),
                  new DOMException(
                    "The object can not be found here.",
                    "NotFoundError"
                  ));
                return t;
              },
              function(e) {
                return Promise.reject(i(e));
              }
            );
          };
        }
        if (
          !(
            t.version > 55 &&
            "autoGainControl" in r.mediaDevices.getSupportedConstraints()
          )
        ) {
          var l = function(e, t, r) {
              t in e && !(r in e) && ((e[r] = e[t]), delete e[t]);
            },
            f = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
          if (
            ((r.mediaDevices.getUserMedia = function(e) {
              return (
                "object" == typeof e &&
                  "object" == typeof e.audio &&
                  ((e = JSON.parse(JSON.stringify(e))),
                  l(e.audio, "autoGainControl", "mozAutoGainControl"),
                  l(e.audio, "noiseSuppression", "mozNoiseSuppression")),
                f(e)
              );
            }),
            a && a.prototype.getSettings)
          ) {
            var p = a.prototype.getSettings;
            a.prototype.getSettings = function() {
              var e = p.apply(this, arguments);
              return (
                l(e, "mozAutoGainControl", "autoGainControl"),
                l(e, "mozNoiseSuppression", "noiseSuppression"),
                e
              );
            };
          }
          if (a && a.prototype.applyConstraints) {
            var m = a.prototype.applyConstraints;
            a.prototype.applyConstraints = function(e) {
              return (
                "audio" === this.kind &&
                  "object" == typeof e &&
                  ((e = JSON.parse(JSON.stringify(e))),
                  l(e, "autoGainControl", "mozAutoGainControl"),
                  l(e, "noiseSuppression", "mozNoiseSuppression")),
                m.apply(this, [e])
              );
            };
          }
        }
        r.getUserMedia = function(e, n, a) {
          if (t.version < 44) return c(e, n, a);
          o.deprecated(
            "navigator.getUserMedia",
            "navigator.mediaDevices.getUserMedia"
          ),
            r.mediaDevices.getUserMedia(e).then(n, a);
        };
      };
    },
    function(e, t, r) {
      "use strict";
      var o = r(6);
      e.exports = {
        shimLocalStreamsAPI: function(e) {
          if ("object" == typeof e && e.RTCPeerConnection) {
            if (
              ("getLocalStreams" in e.RTCPeerConnection.prototype ||
                (e.RTCPeerConnection.prototype.getLocalStreams = function() {
                  return (
                    this._localStreams || (this._localStreams = []),
                    this._localStreams
                  );
                }),
              "getStreamById" in e.RTCPeerConnection.prototype ||
                (e.RTCPeerConnection.prototype.getStreamById = function(e) {
                  var t = null;
                  return (
                    this._localStreams &&
                      this._localStreams.forEach(function(r) {
                        r.id === e && (t = r);
                      }),
                    this._remoteStreams &&
                      this._remoteStreams.forEach(function(r) {
                        r.id === e && (t = r);
                      }),
                    t
                  );
                }),
              !("addStream" in e.RTCPeerConnection.prototype))
            ) {
              var t = e.RTCPeerConnection.prototype.addTrack;
              (e.RTCPeerConnection.prototype.addStream = function(e) {
                this._localStreams || (this._localStreams = []),
                  -1 === this._localStreams.indexOf(e) &&
                    this._localStreams.push(e);
                var r = this;
                e.getTracks().forEach(function(o) {
                  t.call(r, o, e);
                });
              }),
                (e.RTCPeerConnection.prototype.addTrack = function(e, r) {
                  return (
                    r &&
                      (this._localStreams
                        ? -1 === this._localStreams.indexOf(r) &&
                          this._localStreams.push(r)
                        : (this._localStreams = [r])),
                    t.call(this, e, r)
                  );
                });
            }
            "removeStream" in e.RTCPeerConnection.prototype ||
              (e.RTCPeerConnection.prototype.removeStream = function(e) {
                this._localStreams || (this._localStreams = []);
                var t = this._localStreams.indexOf(e);
                if (-1 !== t) {
                  this._localStreams.splice(t, 1);
                  var r = this,
                    o = e.getTracks();
                  this.getSenders().forEach(function(e) {
                    -1 !== o.indexOf(e.track) && r.removeTrack(e);
                  });
                }
              });
          }
        },
        shimRemoteStreamsAPI: function(e) {
          if (
            "object" == typeof e &&
            e.RTCPeerConnection &&
            ("getRemoteStreams" in e.RTCPeerConnection.prototype ||
              (e.RTCPeerConnection.prototype.getRemoteStreams = function() {
                return this._remoteStreams ? this._remoteStreams : [];
              }),
            !("onaddstream" in e.RTCPeerConnection.prototype))
          ) {
            Object.defineProperty(
              e.RTCPeerConnection.prototype,
              "onaddstream",
              {
                get: function() {
                  return this._onaddstream;
                },
                set: function(e) {
                  this._onaddstream &&
                    this.removeEventListener("addstream", this._onaddstream),
                    this.addEventListener("addstream", (this._onaddstream = e));
                }
              }
            );
            var t = e.RTCPeerConnection.prototype.setRemoteDescription;
            e.RTCPeerConnection.prototype.setRemoteDescription = function() {
              var e = this;
              return (
                this._onaddstreampoly ||
                  this.addEventListener(
                    "track",
                    (this._onaddstreampoly = function(t) {
                      t.streams.forEach(function(t) {
                        if (
                          (e._remoteStreams || (e._remoteStreams = []),
                          !(e._remoteStreams.indexOf(t) >= 0))
                        ) {
                          e._remoteStreams.push(t);
                          var r = new Event("addstream");
                          (r.stream = t), e.dispatchEvent(r);
                        }
                      });
                    })
                  ),
                t.apply(e, arguments)
              );
            };
          }
        },
        shimCallbacksAPI: function(e) {
          if ("object" == typeof e && e.RTCPeerConnection) {
            var t = e.RTCPeerConnection.prototype,
              r = t.createOffer,
              o = t.createAnswer,
              n = t.setLocalDescription,
              a = t.setRemoteDescription,
              i = t.addIceCandidate;
            (t.createOffer = function(e, t) {
              var o = arguments.length >= 2 ? arguments[2] : arguments[0],
                n = r.apply(this, [o]);
              return t ? (n.then(e, t), Promise.resolve()) : n;
            }),
              (t.createAnswer = function(e, t) {
                var r = arguments.length >= 2 ? arguments[2] : arguments[0],
                  n = o.apply(this, [r]);
                return t ? (n.then(e, t), Promise.resolve()) : n;
              });
            var c = function(e, t, r) {
              var o = n.apply(this, [e]);
              return r ? (o.then(t, r), Promise.resolve()) : o;
            };
            (t.setLocalDescription = c),
              (c = function(e, t, r) {
                var o = a.apply(this, [e]);
                return r ? (o.then(t, r), Promise.resolve()) : o;
              }),
              (t.setRemoteDescription = c),
              (c = function(e, t, r) {
                var o = i.apply(this, [e]);
                return r ? (o.then(t, r), Promise.resolve()) : o;
              }),
              (t.addIceCandidate = c);
          }
        },
        shimGetUserMedia: function(e) {
          var t = e && e.navigator;
          t.getUserMedia ||
            (t.webkitGetUserMedia
              ? (t.getUserMedia = t.webkitGetUserMedia.bind(t))
              : t.mediaDevices &&
                t.mediaDevices.getUserMedia &&
                (t.getUserMedia = function(e, r, o) {
                  t.mediaDevices.getUserMedia(e).then(r, o);
                }.bind(t)));
        },
        shimRTCIceServerUrls: function(e) {
          var t = e.RTCPeerConnection;
          (e.RTCPeerConnection = function(e, r) {
            if (e && e.iceServers) {
              for (var n = [], a = 0; a < e.iceServers.length; a++) {
                var i = e.iceServers[a];
                !i.hasOwnProperty("urls") && i.hasOwnProperty("url")
                  ? (o.deprecated("RTCIceServer.url", "RTCIceServer.urls"),
                    (i = JSON.parse(JSON.stringify(i))),
                    (i.urls = i.url),
                    delete i.url,
                    n.push(i))
                  : n.push(e.iceServers[a]);
              }
              e.iceServers = n;
            }
            return new t(e, r);
          }),
            (e.RTCPeerConnection.prototype = t.prototype),
            "generateCertificate" in e.RTCPeerConnection &&
              Object.defineProperty(
                e.RTCPeerConnection,
                "generateCertificate",
                {
                  get: function() {
                    return t.generateCertificate;
                  }
                }
              );
        },
        shimTrackEventTransceiver: function(e) {
          "object" == typeof e &&
            e.RTCPeerConnection &&
            "receiver" in e.RTCTrackEvent.prototype &&
            !e.RTCTransceiver &&
            Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
              get: function() {
                return { receiver: this.receiver };
              }
            });
        },
        shimCreateOfferLegacy: function(e) {
          var t = e.RTCPeerConnection.prototype.createOffer;
          e.RTCPeerConnection.prototype.createOffer = function(e) {
            var r = this;
            if (e) {
              void 0 !== e.offerToReceiveAudio &&
                (e.offerToReceiveAudio = !!e.offerToReceiveAudio);
              var o = r.getTransceivers().find(function(e) {
                return e.sender.track && "audio" === e.sender.track.kind;
              });
              !1 === e.offerToReceiveAudio && o
                ? "sendrecv" === o.direction
                  ? o.setDirection
                    ? o.setDirection("sendonly")
                    : (o.direction = "sendonly")
                  : "recvonly" === o.direction &&
                    (o.setDirection
                      ? o.setDirection("inactive")
                      : (o.direction = "inactive"))
                : !0 !== e.offerToReceiveAudio ||
                  o ||
                  r.addTransceiver("audio"),
                void 0 !== e.offerToReceiveVideo &&
                  (e.offerToReceiveVideo = !!e.offerToReceiveVideo);
              var n = r.getTransceivers().find(function(e) {
                return e.sender.track && "video" === e.sender.track.kind;
              });
              !1 === e.offerToReceiveVideo && n
                ? "sendrecv" === n.direction
                  ? n.setDirection("sendonly")
                  : "recvonly" === n.direction && n.setDirection("inactive")
                : !0 !== e.offerToReceiveVideo ||
                  n ||
                  r.addTransceiver("video");
            }
            return t.apply(r, arguments);
          };
        }
      };
    },
    function(e, t, r) {
      "use strict";
      var o = r(64),
        n = r(6);
      e.exports = {
        shimRTCIceCandidate: function(e) {
          if (
            e.RTCIceCandidate &&
            !(e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype)
          ) {
            var t = e.RTCIceCandidate;
            (e.RTCIceCandidate = function(e) {
              if (
                ("object" == typeof e &&
                  e.candidate &&
                  0 === e.candidate.indexOf("a=") &&
                  ((e = JSON.parse(JSON.stringify(e))),
                  (e.candidate = e.candidate.substr(2))),
                e.candidate && e.candidate.length)
              ) {
                var r = new t(e),
                  n = o.parseCandidate(e.candidate),
                  a = Object.assign(r, n);
                return (
                  (a.toJSON = function() {
                    return {
                      candidate: a.candidate,
                      sdpMid: a.sdpMid,
                      sdpMLineIndex: a.sdpMLineIndex,
                      usernameFragment: a.usernameFragment
                    };
                  }),
                  a
                );
              }
              return new t(e);
            }),
              (e.RTCIceCandidate.prototype = t.prototype),
              n.wrapPeerConnectionEvent(e, "icecandidate", function(t) {
                return (
                  t.candidate &&
                    Object.defineProperty(t, "candidate", {
                      value: new e.RTCIceCandidate(t.candidate),
                      writable: "false"
                    }),
                  t
                );
              });
          }
        },
        shimCreateObjectURL: function(e) {
          var t = e && e.URL;
          if (
            "object" == typeof e &&
            e.HTMLMediaElement &&
            "srcObject" in e.HTMLMediaElement.prototype &&
            t.createObjectURL &&
            t.revokeObjectURL
          ) {
            var r = t.createObjectURL.bind(t),
              o = t.revokeObjectURL.bind(t),
              a = new Map(),
              i = 0;
            (t.createObjectURL = function(e) {
              if ("getTracks" in e) {
                var t = "polyblob:" + ++i;
                return (
                  a.set(t, e),
                  n.deprecated(
                    "URL.createObjectURL(stream)",
                    "elem.srcObject = stream"
                  ),
                  t
                );
              }
              return r(e);
            }),
              (t.revokeObjectURL = function(e) {
                o(e), a.delete(e);
              });
            var c = Object.getOwnPropertyDescriptor(
              e.HTMLMediaElement.prototype,
              "src"
            );
            Object.defineProperty(e.HTMLMediaElement.prototype, "src", {
              get: function() {
                return c.get.apply(this);
              },
              set: function(e) {
                return (
                  (this.srcObject = a.get(e) || null), c.set.apply(this, [e])
                );
              }
            });
            var s = e.HTMLMediaElement.prototype.setAttribute;
            e.HTMLMediaElement.prototype.setAttribute = function() {
              return (
                2 === arguments.length &&
                  "src" === ("" + arguments[0]).toLowerCase() &&
                  (this.srcObject = a.get(arguments[1]) || null),
                s.apply(this, arguments)
              );
            };
          }
        },
        shimMaxMessageSize: function(e) {
          if (!e.RTCSctpTransport && e.RTCPeerConnection) {
            var t = n.detectBrowser(e);
            "sctp" in e.RTCPeerConnection.prototype ||
              Object.defineProperty(e.RTCPeerConnection.prototype, "sctp", {
                get: function() {
                  return void 0 === this._sctp ? null : this._sctp;
                }
              });
            var r = function(e) {
                var t = o.splitSections(e.sdp);
                return (
                  t.shift(),
                  t.some(function(e) {
                    var t = o.parseMLine(e);
                    return (
                      t &&
                      "application" === t.kind &&
                      -1 !== t.protocol.indexOf("SCTP")
                    );
                  })
                );
              },
              a = function(e) {
                var t = e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
                if (null === t || t.length < 2) return -1;
                var r = parseInt(t[1], 10);
                return r !== r ? -1 : r;
              },
              i = function(e) {
                var r = 65536;
                return (
                  "firefox" === t.browser &&
                    (r =
                      t.version < 57
                        ? -1 === e
                          ? 16384
                          : 2147483637
                        : t.version < 60
                        ? 57 === t.version
                          ? 65535
                          : 65536
                        : 2147483637),
                  r
                );
              },
              c = function(e, r) {
                var n = 65536;
                "firefox" === t.browser && 57 === t.version && (n = 65535);
                var a = o.matchPrefix(e.sdp, "a=max-message-size:");
                return (
                  a.length > 0
                    ? (n = parseInt(a[0].substr(19), 10))
                    : "firefox" === t.browser && -1 !== r && (n = 2147483637),
                  n
                );
              },
              s = e.RTCPeerConnection.prototype.setRemoteDescription;
            e.RTCPeerConnection.prototype.setRemoteDescription = function() {
              var e = this;
              if (((e._sctp = null), r(arguments[0]))) {
                var t,
                  o = a(arguments[0]),
                  n = i(o),
                  d = c(arguments[0], o);
                t =
                  0 === n && 0 === d
                    ? Number.POSITIVE_INFINITY
                    : 0 === n || 0 === d
                    ? Math.max(n, d)
                    : Math.min(n, d);
                var u = {};
                Object.defineProperty(u, "maxMessageSize", {
                  get: function() {
                    return t;
                  }
                }),
                  (e._sctp = u);
              }
              return s.apply(e, arguments);
            };
          }
        },
        shimSendThrowTypeError: function(e) {
          function t(e, t) {
            var r = e.send;
            e.send = function() {
              var o = arguments[0],
                n = o.length || o.size || o.byteLength;
              if (
                "open" === e.readyState &&
                t.sctp &&
                n > t.sctp.maxMessageSize
              )
                throw new TypeError(
                  "Message too large (can send a maximum of " +
                    t.sctp.maxMessageSize +
                    " bytes)"
                );
              return r.apply(e, arguments);
            };
          }
          if (
            e.RTCPeerConnection &&
            "createDataChannel" in e.RTCPeerConnection.prototype
          ) {
            var r = e.RTCPeerConnection.prototype.createDataChannel;
            (e.RTCPeerConnection.prototype.createDataChannel = function() {
              var e = this,
                o = r.apply(e, arguments);
              return t(o, e), o;
            }),
              n.wrapPeerConnectionEvent(e, "datachannel", function(e) {
                return t(e.channel, e.target), e;
              });
          }
        }
      };
    },
    function(e, t, r) {
      e.exports = { default: r(116), __esModule: !0 };
    },
    function(e, t, r) {
      r(117), (e.exports = r(0).Object.getPrototypeOf);
    },
    function(e, t, r) {
      var o = r(24),
        n = r(52);
      r(118)("getPrototypeOf", function() {
        return function(e) {
          return n(o(e));
        };
      });
    },
    function(e, t, r) {
      var o = r(3),
        n = r(0),
        a = r(16);
      e.exports = function(e, t) {
        var r = (n.Object || {})[e] || Object[e],
          i = {};
        (i[e] = t(r)),
          o(
            o.S +
              o.F *
                a(function() {
                  r(1);
                }),
            "Object",
            i
          );
      };
    },
    function(e, t, r) {
      "use strict";
      t.__esModule = !0;
      var o = r(66),
        n = (function(e) {
          return e && e.__esModule ? e : { default: e };
        })(o);
      t.default = function(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t ||
          ("object" !== (void 0 === t ? "undefined" : (0, n.default)(t)) &&
            "function" != typeof t)
          ? e
          : t;
      };
    },
    function(e, t, r) {
      e.exports = { default: r(121), __esModule: !0 };
    },
    function(e, t, r) {
      r(25), r(53), (e.exports = r(39).f("iterator"));
    },
    function(e, t, r) {
      e.exports = { default: r(123), __esModule: !0 };
    },
    function(e, t, r) {
      r(124), r(46), r(129), r(130), (e.exports = r(0).Symbol);
    },
    function(e, t, r) {
      "use strict";
      var o = r(1),
        n = r(10),
        a = r(8),
        i = r(3),
        c = r(49),
        s = r(125).KEY,
        d = r(16),
        u = r(34),
        l = r(23),
        f = r(22),
        p = r(2),
        m = r(39),
        v = r(40),
        h = r(126),
        k = r(127),
        C = r(5),
        y = r(7),
        g = r(24),
        B = r(14),
        w = r(29),
        P = r(17),
        b = r(30),
        S = r(128),
        T = r(69),
        x = r(67),
        R = r(4),
        _ = r(31),
        E = T.f,
        M = R.f,
        O = S.f,
        L = o.Symbol,
        j = o.JSON,
        D = j && j.stringify,
        I = p("_hidden"),
        N = p("toPrimitive"),
        A = {}.propertyIsEnumerable,
        F = u("symbol-registry"),
        U = u("symbols"),
        G = u("op-symbols"),
        z = Object.prototype,
        X = "function" == typeof L && !!x.f,
        V = o.QObject,
        J = !V || !V.prototype || !V.prototype.findChild,
        H =
          a &&
          d(function() {
            return (
              7 !=
              b(
                M({}, "a", {
                  get: function() {
                    return M(this, "a", { value: 7 }).a;
                  }
                })
              ).a
            );
          })
            ? function(e, t, r) {
                var o = E(z, t);
                o && delete z[t], M(e, t, r), o && e !== z && M(z, t, o);
              }
            : M,
        W = function(e) {
          var t = (U[e] = b(L.prototype));
          return (t._k = e), t;
        },
        q =
          X && "symbol" == typeof L.iterator
            ? function(e) {
                return "symbol" == typeof e;
              }
            : function(e) {
                return e instanceof L;
              },
        K = function(e, t, r) {
          return (
            e === z && K(G, t, r),
            C(e),
            (t = w(t, !0)),
            C(r),
            n(U, t)
              ? (r.enumerable
                  ? (n(e, I) && e[I][t] && (e[I][t] = !1),
                    (r = b(r, { enumerable: P(0, !1) })))
                  : (n(e, I) || M(e, I, P(1, {})), (e[I][t] = !0)),
                H(e, t, r))
              : M(e, t, r)
          );
        },
        $ = function(e, t) {
          C(e);
          for (var r, o = h((t = B(t))), n = 0, a = o.length; a > n; )
            K(e, (r = o[n++]), t[r]);
          return e;
        },
        Z = function(e, t) {
          return void 0 === t ? b(e) : $(b(e), t);
        },
        Q = function(e) {
          var t = A.call(this, (e = w(e, !0)));
          return (
            !(this === z && n(U, e) && !n(G, e)) &&
            (!(t || !n(this, e) || !n(U, e) || (n(this, I) && this[I][e])) || t)
          );
        },
        Y = function(e, t) {
          if (((e = B(e)), (t = w(t, !0)), e !== z || !n(U, t) || n(G, t))) {
            var r = E(e, t);
            return (
              !r || !n(U, t) || (n(e, I) && e[I][t]) || (r.enumerable = !0), r
            );
          }
        },
        ee = function(e) {
          for (var t, r = O(B(e)), o = [], a = 0; r.length > a; )
            n(U, (t = r[a++])) || t == I || t == s || o.push(t);
          return o;
        },
        te = function(e) {
          for (
            var t, r = e === z, o = O(r ? G : B(e)), a = [], i = 0;
            o.length > i;

          )
            !n(U, (t = o[i++])) || (r && !n(z, t)) || a.push(U[t]);
          return a;
        };
      X ||
        ((L = function() {
          if (this instanceof L)
            throw TypeError("Symbol is not a constructor!");
          var e = f(arguments.length > 0 ? arguments[0] : void 0),
            t = function(r) {
              this === z && t.call(G, r),
                n(this, I) && n(this[I], e) && (this[I][e] = !1),
                H(this, e, P(1, r));
            };
          return a && J && H(z, e, { configurable: !0, set: t }), W(e);
        }),
        c(L.prototype, "toString", function() {
          return this._k;
        }),
        (T.f = Y),
        (R.f = K),
        (r(68).f = S.f = ee),
        (r(41).f = Q),
        (x.f = te),
        a && !r(15) && c(z, "propertyIsEnumerable", Q, !0),
        (m.f = function(e) {
          return W(p(e));
        })),
        i(i.G + i.W + i.F * !X, { Symbol: L });
      for (
        var re = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(
            ","
          ),
          oe = 0;
        re.length > oe;

      )
        p(re[oe++]);
      for (var ne = _(p.store), ae = 0; ne.length > ae; ) v(ne[ae++]);
      i(i.S + i.F * !X, "Symbol", {
        for: function(e) {
          return n(F, (e += "")) ? F[e] : (F[e] = L(e));
        },
        keyFor: function(e) {
          if (!q(e)) throw TypeError(e + " is not a symbol!");
          for (var t in F) if (F[t] === e) return t;
        },
        useSetter: function() {
          J = !0;
        },
        useSimple: function() {
          J = !1;
        }
      }),
        i(i.S + i.F * !X, "Object", {
          create: Z,
          defineProperty: K,
          defineProperties: $,
          getOwnPropertyDescriptor: Y,
          getOwnPropertyNames: ee,
          getOwnPropertySymbols: te
        });
      var ie = d(function() {
        x.f(1);
      });
      i(i.S + i.F * ie, "Object", {
        getOwnPropertySymbols: function(e) {
          return x.f(g(e));
        }
      }),
        j &&
          i(
            i.S +
              i.F *
                (!X ||
                  d(function() {
                    var e = L();
                    return (
                      "[null]" != D([e]) ||
                      "{}" != D({ a: e }) ||
                      "{}" != D(Object(e))
                    );
                  })),
            "JSON",
            {
              stringify: function(e) {
                for (var t, r, o = [e], n = 1; arguments.length > n; )
                  o.push(arguments[n++]);
                if (((r = t = o[1]), (y(t) || void 0 !== e) && !q(e)))
                  return (
                    k(t) ||
                      (t = function(e, t) {
                        if (
                          ("function" == typeof r && (t = r.call(this, e, t)),
                          !q(t))
                        )
                          return t;
                      }),
                    (o[1] = t),
                    D.apply(j, o)
                  );
              }
            }
          ),
        L.prototype[N] || r(9)(L.prototype, N, L.prototype.valueOf),
        l(L, "Symbol"),
        l(Math, "Math", !0),
        l(o.JSON, "JSON", !0);
    },
    function(e, t, r) {
      var o = r(22)("meta"),
        n = r(7),
        a = r(10),
        i = r(4).f,
        c = 0,
        s =
          Object.isExtensible ||
          function() {
            return !0;
          },
        d = !r(16)(function() {
          return s(Object.preventExtensions({}));
        }),
        u = function(e) {
          i(e, o, { value: { i: "O" + ++c, w: {} } });
        },
        l = function(e, t) {
          if (!n(e))
            return "symbol" == typeof e
              ? e
              : ("string" == typeof e ? "S" : "P") + e;
          if (!a(e, o)) {
            if (!s(e)) return "F";
            if (!t) return "E";
            u(e);
          }
          return e[o].i;
        },
        f = function(e, t) {
          if (!a(e, o)) {
            if (!s(e)) return !0;
            if (!t) return !1;
            u(e);
          }
          return e[o].w;
        },
        p = function(e) {
          return d && m.NEED && s(e) && !a(e, o) && u(e), e;
        },
        m = (e.exports = {
          KEY: o,
          NEED: !1,
          fastKey: l,
          getWeak: f,
          onFreeze: p
        });
    },
    function(e, t, r) {
      var o = r(31),
        n = r(67),
        a = r(41);
      e.exports = function(e) {
        var t = o(e),
          r = n.f;
        if (r)
          for (var i, c = r(e), s = a.f, d = 0; c.length > d; )
            s.call(e, (i = c[d++])) && t.push(i);
        return t;
      };
    },
    function(e, t, r) {
      var o = r(19);
      e.exports =
        Array.isArray ||
        function(e) {
          return "Array" == o(e);
        };
    },
    function(e, t, r) {
      var o = r(14),
        n = r(68).f,
        a = {}.toString,
        i =
          "object" == typeof window && window && Object.getOwnPropertyNames
            ? Object.getOwnPropertyNames(window)
            : [],
        c = function(e) {
          try {
            return n(e);
          } catch (e) {
            return i.slice();
          }
        };
      e.exports.f = function(e) {
        return i && "[object Window]" == a.call(e) ? c(e) : n(o(e));
      };
    },
    function(e, t, r) {
      r(40)("asyncIterator");
    },
    function(e, t, r) {
      r(40)("observable");
    },
    function(e, t, r) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.__esModule = !0;
      var n = r(132),
        a = o(n),
        i = r(136),
        c = o(i),
        s = r(66),
        d = o(s);
      t.default = function(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              (void 0 === t ? "undefined" : (0, d.default)(t))
          );
        (e.prototype = (0, c.default)(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          t && (a.default ? (0, a.default)(e, t) : (e.__proto__ = t));
      };
    },
    function(e, t, r) {
      e.exports = { default: r(133), __esModule: !0 };
    },
    function(e, t, r) {
      r(134), (e.exports = r(0).Object.setPrototypeOf);
    },
    function(e, t, r) {
      var o = r(3);
      o(o.S, "Object", { setPrototypeOf: r(135).set });
    },
    function(e, t, r) {
      var o = r(7),
        n = r(5),
        a = function(e, t) {
          if ((n(e), !o(t) && null !== t))
            throw TypeError(t + ": can't set as prototype!");
        };
      e.exports = {
        set:
          Object.setPrototypeOf ||
          ("__proto__" in {}
            ? (function(e, t, o) {
                try {
                  (o = r(13)(
                    Function.call,
                    r(69).f(Object.prototype, "__proto__").set,
                    2
                  )),
                    o(e, []),
                    (t = !(e instanceof Array));
                } catch (e) {
                  t = !0;
                }
                return function(e, r) {
                  return a(e, r), t ? (e.__proto__ = r) : o(e, r), e;
                };
              })({}, !1)
            : void 0),
        check: a
      };
    },
    function(e, t, r) {
      e.exports = { default: r(137), __esModule: !0 };
    },
    function(e, t, r) {
      r(138);
      var o = r(0).Object;
      e.exports = function(e, t) {
        return o.create(e, t);
      };
    },
    function(e, t, r) {
      var o = r(3);
      o(o.S, "Object", { create: r(30) });
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var o = r(11),
        n = r.n(o),
        a = r(12),
        i = r.n(a);
      t.default = {
        methods: {
          onDetect: function(e) {
            var t = this;
            return i()(
              n.a.mark(function r() {
                var o, a;
                return n.a.wrap(
                  function(r) {
                    for (;;)
                      switch ((r.prev = r.next)) {
                        case 0:
                          return (
                            t.$emit("detect", e), (r.prev = 1), (r.next = 4), e
                          );
                        case 4:
                          (o = r.sent),
                            (a = o.content),
                            null !== a && t.$emit("decode", a),
                            (r.next = 11);
                          break;
                        case 9:
                          (r.prev = 9), (r.t0 = r.catch(1));
                        case 11:
                        case "end":
                          return r.stop();
                      }
                  },
                  r,
                  t,
                  [[1, 9]]
                );
              })
            )();
          }
        }
      };
    },
    function(e, t, r) {
      "use strict";
      var o = window.URL || window.webkitURL;
      e.exports = function(e, t) {
        try {
          try {
            var r;
            try {
              var n =
                window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;
              (r = new n()), r.append(e), (r = r.getBlob());
            } catch (t) {
              r = new Blob([e]);
            }
            return new Worker(o.createObjectURL(r));
          } catch (t) {
            return new Worker(
              "data:application/javascript," + encodeURIComponent(e)
            );
          }
        } catch (e) {
          if (!t) throw Error("Inline worker is not supported");
          return new Worker(t);
        }
      };
    },
    function(e, t) {
      e.exports = {
        render: function() {
          var e = this,
            t = e.$createElement,
            r = e._self._c || t;
          return r("div", { staticClass: "wrapper" }, [
            r("video", {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: e.shouldScan,
                  expression: "shouldScan"
                }
              ],
              ref: "video",
              staticClass: "camera",
              attrs: { autoplay: "", muted: "", playsinline: "" },
              domProps: { muted: !0 }
            }),
            e._v(" "),
            r("canvas", {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !e.shouldScan,
                  expression: "!shouldScan"
                }
              ],
              ref: "pauseFrame",
              staticClass: "pause-frame"
            }),
            e._v(" "),
            r("canvas", {
              ref: "trackingLayer",
              staticClass: "tracking-layer"
            }),
            e._v(" "),
            r("div", { staticClass: "overlay" }, [e._t("default")], 2)
          ]);
        },
        staticRenderFns: []
      };
    },
    function(e, t, r) {
      var o = r(20)(r(143), r(148), null, null);
      e.exports = o.exports;
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var o = r(11),
        n = r.n(o),
        a = r(12),
        i = r.n(a),
        c = r(70),
        s = r.n(c),
        d = r(37),
        u = r(42),
        l = r(43),
        f = r.n(l),
        p = r(44),
        m = r.n(p);
      t.default = {
        name: "qrcode-capture",
        mixins: [f.a],
        props: { worker: { type: Function, default: m.a } },
        methods: {
          onChangeInput: function(e) {
            []
              .concat(s()(e.target.files))
              .map(this.processFile)
              .forEach(this.onDetect);
          },
          processFile: function(e) {
            var t = this;
            return i()(
              n.a.mark(function r() {
                var o, a;
                return n.a.wrap(
                  function(r) {
                    for (;;)
                      switch ((r.prev = r.next)) {
                        case 0:
                          return (r.next = 2), Object(u.a)(e);
                        case 2:
                          return (
                            (o = r.sent), (r.next = 5), Object(d.b)(t.worker, o)
                          );
                        case 5:
                          return (a = r.sent), r.abrupt("return", a);
                        case 7:
                        case "end":
                          return r.stop();
                      }
                  },
                  r,
                  t
                );
              })
            )();
          }
        }
      };
    },
    function(e, t, r) {
      e.exports = { default: r(145), __esModule: !0 };
    },
    function(e, t, r) {
      r(25), r(146), (e.exports = r(0).Array.from);
    },
    function(e, t, r) {
      "use strict";
      var o = r(13),
        n = r(3),
        a = r(24),
        i = r(55),
        c = r(56),
        s = r(32),
        d = r(147),
        u = r(57);
      n(
        n.S +
          n.F *
            !r(62)(function(e) {
              Array.from(e);
            }),
        "Array",
        {
          from: function(e) {
            var t,
              r,
              n,
              l,
              f = a(e),
              p = "function" == typeof this ? this : Array,
              m = arguments.length,
              v = m > 1 ? arguments[1] : void 0,
              h = void 0 !== v,
              k = 0,
              C = u(f);
            if (
              (h && (v = o(v, m > 2 ? arguments[2] : void 0, 2)),
              void 0 == C || (p == Array && c(C)))
            )
              for (t = s(f.length), r = new p(t); t > k; k++)
                d(r, k, h ? v(f[k], k) : f[k]);
            else
              for (l = C.call(f), r = new p(); !(n = l.next()).done; k++)
                d(r, k, h ? i(l, v, [n.value, k], !0) : n.value);
            return (r.length = k), r;
          }
        }
      );
    },
    function(e, t, r) {
      "use strict";
      var o = r(4),
        n = r(17);
      e.exports = function(e, t, r) {
        t in e ? o.f(e, t, n(0, r)) : (e[t] = r);
      };
    },
    function(e, t) {
      e.exports = {
        render: function() {
          var e = this,
            t = e.$createElement;
          return (e._self._c || t)("input", {
            attrs: {
              type: "file",
              name: "image",
              accept: "image/*",
              capture: "environment",
              multiple: ""
            },
            on: { change: e.onChangeInput }
          });
        },
        staticRenderFns: []
      };
    },
    function(e, t, r) {
      var o = r(20)(r(150), r(151), null, null);
      e.exports = o.exports;
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var o = r(11),
        n = r.n(o),
        a = r(12),
        i = r.n(a),
        c = r(70),
        s = r.n(c),
        d = r(37),
        u = r(42),
        l = r(43),
        f = r.n(l),
        p = r(44),
        m = r.n(p);
      t.default = {
        name: "qrcode-drop-zone",
        mixins: [f.a],
        props: { worker: { type: Function, default: m.a } },
        methods: {
          onDragOver: function(e) {
            this.$emit("dragover", e);
          },
          onDrop: function(e) {
            var t = this,
              r = e.dataTransfer;
            this.onDragOver(!1);
            var o = [].concat(s()(r.files)),
              n = r.getData("text/uri-list");
            o.forEach(function(e) {
              t.onDetect(t.processFile(e));
            }),
              "" !== n && this.onDetect(this.processUrl(n));
          },
          processFile: function(e) {
            var t = this;
            return i()(
              n.a.mark(function r() {
                var o, a;
                return n.a.wrap(
                  function(r) {
                    for (;;)
                      switch ((r.prev = r.next)) {
                        case 0:
                          return (r.next = 2), Object(u.a)(e);
                        case 2:
                          return (
                            (o = r.sent), (r.next = 5), Object(d.b)(t.worker, o)
                          );
                        case 5:
                          return (a = r.sent), r.abrupt("return", a);
                        case 7:
                        case "end":
                          return r.stop();
                      }
                  },
                  r,
                  t
                );
              })
            )();
          },
          processUrl: function(e) {
            var t = this;
            return i()(
              n.a.mark(function r() {
                var o, a;
                return n.a.wrap(
                  function(r) {
                    for (;;)
                      switch ((r.prev = r.next)) {
                        case 0:
                          return (r.next = 2), Object(u.b)(e);
                        case 2:
                          return (
                            (o = r.sent), (r.next = 5), Object(d.b)(t.worker, o)
                          );
                        case 5:
                          return (a = r.sent), r.abrupt("return", a);
                        case 7:
                        case "end":
                          return r.stop();
                      }
                  },
                  r,
                  t
                );
              })
            )();
          }
        }
      };
    },
    function(e, t) {
      e.exports = {
        render: function() {
          var e = this,
            t = e.$createElement;
          return (e._self._c || t)(
            "div",
            {
              on: {
                drop: function(t) {
                  return t.preventDefault(), t.stopPropagation(), e.onDrop(t);
                },
                dragenter: function(t) {
                  return (
                    t.preventDefault(), t.stopPropagation(), e.onDragOver(!0)
                  );
                },
                dragleave: function(t) {
                  return (
                    t.preventDefault(), t.stopPropagation(), e.onDragOver(!1)
                  );
                },
                dragover: function(e) {
                  e.preventDefault(), e.stopPropagation();
                }
              }
            },
            [e._t("default")],
            2
          );
        },
        staticRenderFns: []
      };
    }
  ]);
});
