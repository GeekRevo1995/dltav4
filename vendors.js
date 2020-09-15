require = function e(a, b, d) {
  function g(k, m) {
    if (!b[k]) {
      if (!a[k]) {
        var q = 'function' == typeof require && require;
        if (!m && q) return q(k, true);
        if (h) return h(k, true);
        var v = new Error('Cannot find module \'' + k + '\'');
        throw (v.code = 'MODULE_NOT_FOUND', v);
      }
      var w = b[k] = {
        exports: {}
      };
      a[k][0].call(w.exports, function (x) {
        return g(a[k][1][x] || x);
      }, w, w.exports, e, a, b, d);
    }
    return b[k].exports;
  }
  for (var h = 'function' == typeof require && require, j = 0; j < d.length; j++) g(d[j]);
  return g;
}({
  1: [function (a, b, c) {
    'use strict';
    b.exports = function (d, f) {
      var g = new Array(arguments.length - 1),
        h = 0,
        j = 2,
        k = true;
      for (; j < arguments.length;) g[h++] = arguments[j++];
      return new Promise(function (l, m) {
        g[h] = function (p) {
          if (k)
            if (k = false, p) m(p);
            else {
              for (var q = new Array(arguments.length - 1), u = 0; u < q.length;) q[u++] = arguments[u];
              l.apply(null, q);
            }
        };
        try {
          d.apply(f || null, g);
        } catch (p) {
          if (k) {
            k = false;
            m(p);
          }
        }
      });
    };
  }, {}],
  2: [function (a, b, c) {
    'use strict';
    var d = c;
    d.length = function (j) {
      var k = j.length;
      if (!k) return 0;
      for (var l = 0; --k % 4 > 1 && j.charAt(k) === '=';) ++l;
      return Math.ceil(3 * j.length) / 4 - l;
    };
    for (var f = new Array(64), g = new Array(123), h = 0; h < 64;) g[f[h] = h < 26 ? h + 65 : h < 52 ? h + 71 : h < 62 ? h - 4 : h - 59 | 43] = h++;
    d.encode = function (j, k, l) {
      for (var m, p = null, q = [], v = 0, w = 0; k < l;) {
        var x = j[k++];
        switch (w) {
        case 0:
          q[v++] = f[x >> 2];
          m = (3 & x) << 4;
          w = 1;
          break;
        case 1:
          q[v++] = f[m | x >> 4];
          m = (15 & x) << 2;
          w = 2;
          break;
        case 2:
          q[v++] = f[m | x >> 6];
          q[v++] = f[63 & x];
          w = 0;
        }

        if (v > 8191) {
          (p || (p = [])).push(String.fromCharCode.apply(String, q));
          v = 0;
        }
      }

      if (w) {
        q[v++] = f[m];
        q[v++] = 61;

        if (w === 1)
          q[v++] = 61;
      }

      return p ? (v && p.push(String.fromCharCode.apply(String, q.slice(0, v))), p.join('')) : String.fromCharCode.apply(String, q.slice(0, v));
    };

    d.decode = function (j, k, l) {
      for (var m, p = l, q = 0, v = 0; v < j.length;) {
        var w = j.charCodeAt(v++);
        if (w === 61 && q > 1) break;
        if (undefined === (w = g[w])) throw Error('invalid encoding');
        switch (q) {
        case 0:
          m = w;
          q = 1;
          break;
        case 1:
          k[l++] = m << 2 | (48 & w) >> 4;
          m = w;
          q = 2;
          break;
        case 2:
          k[l++] = (15 & m) << 4 | (60 & w) >> 2;
          m = w;
          q = 3;
          break;
        case 3:
          k[l++] = (3 & m) << 6 | w;
          q = 0;
        }
      }
      if (q === 1) throw Error('invalid encoding');
      return l - p;
    };

    d.test = function (j) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(j);
    };
  }, {}],
  3: [function (a, b, c) {
    'use strict';

    function d(f, g) {
      if ('string' == typeof f) {
        g = f;
        f = undefined;
      }

      var h = [];

      function j(m) {
        if ('string' != typeof m) {
          var p = k();
          if (d.verbose && console.log('codegen: ' + p), p = 'return ' + p, m) {
            for (var q = Object.keys(m), v = new Array(q.length + 1), w = new Array(q.length), x = 0; x < q.length;) {
              v[x] = q[x];
              w[x] = m[q[x++]];
            }
            v[x] = p;
            return Function.apply(null, v).apply(null, w);
          }
          return Function(p)();
        }
        for (var y = new Array(arguments.length - 1), z = 0; z < y.length;) y[z] = arguments[++z];
        if (z = 0, m = m.replace(/%([%dfijs])/g, function (A, B) {
            var C = y[z++];
            switch (B) {
            case 'd':
            case 'f':
              return String(Number(C));
            case 'i':
              return String(Math.floor(C));
            case 'j':
              return JSON.stringify(C);
            case 's':
              return String(C);
            }
            return '%';
          }), z !== y.length) throw Error('parameter count mismatch');
        h.push(m);
        return j;
      }

      function k(l) {
        return 'function ' + (l || g || '') + '(' + (f && f.join(',') || '') + '){\x0a  ' + h.join('\x0a  ') + '\x0a}';
      }
      j.toString = k;
      return j;
    }
    b.exports = d;
    d.verbose = false;
  }, {}],
  4: [function (a, b, c) {
    'use strict';

    function d() {
      this._listeners = {};
    }
    b.exports = d;

    d.prototype.on = function (f, g, h) {
      (this._listeners[f] || (this._listeners[f] = [])).push({
        fn: g,
        ctx: h || this
      });

      return this;
    };

    d.prototype.off = function (f, g) {
      if (undefined === f) this._listeners = {};
      else if (undefined === g) this._listeners[f] = [];
      else
        for (var h = this._listeners[f], j = 0; j < h.length;) h[j].fn === g ? h.splice(j, 1) : ++j;
      return this;
    };

    d.prototype.emit = function (f) {
      var g = this._listeners[f];
      if (g) {
        for (var h = [], j = 1; j < arguments.length;) h.push(arguments[j++]);
        for (j = 0; j < g.length;) g[j].fn.apply(g[j++].ctx, h);
      }
      return this;
    };
  }, {}],
  5: [function (a, b, c) {
    'use strict';
    b.exports = g;
    var d = a('@protobufjs/aspromise'),
      f = a('@protobufjs/inquire')('fs');

    function g(h, j, k) {
      'function' == typeof j ? (k = j, j = {}) : j || (j = {});

      return k ? !j.xhr && f && f.readFile ? f.readFile(h, function (l, m) {
        return l && 'undefined' != typeof XMLHttpRequest ? g.xhr(h, j, k) : l ? k(l) : k(null, j.binary ? m : m.toString('utf8'));
      }) : g.xhr(h, j, k) : d(g, this, h, j);
    }
    g.xhr = function (h, j, k) {
      var l = new XMLHttpRequest();

      l.onreadystatechange = function () {
        if (l.readyState === 4) {
          if (l.status !== 0 && l.status !== 200) return k(Error('status ' + l.status));
          if (j.binary) {
            var m = l.response;
            if (!m) {
              m = [];
              for (var p = 0; p < l.responseText.length; ++p) m.push(255 & l.responseText.charCodeAt(p));
            }
            return k(null, 'undefined' != typeof Uint8Array ? new Uint8Array(m) : m);
          }
          return k(null, l.responseText);
        }
      };

      if (j.binary) {
        if ('overrideMimeType' in l)
          l.overrideMimeType('text/plain; charset=x-user-defined');

        l.responseType = 'arraybuffer';
      }

      l.open('GET', h);
      l.send();
    };
  }, {
    '@protobufjs/aspromise': 1,
    '@protobufjs/inquire': 7
  }],
  6: [function (b, c, d) {
    'use strict';

    function f(l) {
      'undefined' != typeof Float32Array ? function () {
        var m = new Float32Array([-0]),
          p = new Uint8Array(m.buffer),
          q = p[3] === 128;

        function u(y, z, A) {
          m[0] = y;
          z[A] = p[0];
          z[A + 1] = p[1];
          z[A + 2] = p[2];
          z[A + 3] = p[3];
        }

        function v(y, z, A) {
          m[0] = y;
          z[A] = p[3];
          z[A + 1] = p[2];
          z[A + 2] = p[1];
          z[A + 3] = p[0];
        }

        function w(y, z) {
          p[0] = y[z];
          p[1] = y[z + 1];
          p[2] = y[z + 2];
          p[3] = y[z + 3];
          return m[0];
        }

        function x(y, z) {
          p[3] = y[z];
          p[2] = y[z + 1];
          p[1] = y[z + 2];
          p[0] = y[z + 3];
          return m[0];
        }
        l.writeFloatLE = q ? u : v;
        l.writeFloatBE = q ? v : u;
        l.readFloatLE = q ? w : x;
        l.readFloatBE = q ? x : w;
      }() : function () {
        function m(q, u, v, w) {
          var x = u < 0 ? 1 : 0;
          if (x && (u = -u), u === 0) q(1 / u > 0 ? 0 : 2147483648, v, w);
          else if (isNaN(u)) q(2143289344, v, w);
          else if (u > 3.4028234663852886e+38) q((x << 31 | 2139095040) >>> 0, v, w);
          else if (u < 1.1754943508222875e-38) q((x << 31 | Math.round(u / 1.401298464324817e-45)) >>> 0, v, w);
          else {
            var y = Math.floor(Math.log(u) / Math.LN2);
            q((x << 31 | y + 127 << 23 | 8388607 & Math.round(u * Math.pow(2, -y) * 8388608)) >>> 0, v, w);
          }
        }

        function p(q, u, v) {
          var w = q(u, v),
            x = 2 * (w >> 31) + 1,
            y = w >>> 23 & 255,
            z = 8388607 & w;
          return y === 255 ? z ? NaN : x * (1 / 0) : y === 0 ? 1.401298464324817e-45 * x * z : x * Math.pow(2, y - 150) * (z + 8388608);
        }
        l.writeFloatLE = m.bind(null, g);
        l.writeFloatBE = m.bind(null, h);
        l.readFloatLE = p.bind(null, j);
        l.readFloatBE = p.bind(null, k);
      }();

      'undefined' != typeof Float64Array ? function () {
        var m = new Float64Array([-0]),
          p = new Uint8Array(m.buffer),
          q = p[7] === 128;

        function u(y, z, A) {
          m[0] = y;
          z[A] = p[0];
          z[A + 1] = p[1];
          z[A + 2] = p[2];
          z[A + 3] = p[3];
          z[A + 4] = p[4];
          z[A + 5] = p[5];
          z[A + 6] = p[6];
          z[A + 7] = p[7];
        }

        function v(y, z, A) {
          m[0] = y;
          z[A] = p[7];
          z[A + 1] = p[6];
          z[A + 2] = p[5];
          z[A + 3] = p[4];
          z[A + 4] = p[3];
          z[A + 5] = p[2];
          z[A + 6] = p[1];
          z[A + 7] = p[0];
        }

        function w(y, z) {
          p[0] = y[z];
          p[1] = y[z + 1];
          p[2] = y[z + 2];
          p[3] = y[z + 3];
          p[4] = y[z + 4];
          p[5] = y[z + 5];
          p[6] = y[z + 6];
          p[7] = y[z + 7];
          return m[0];
        }

        function x(y, z) {
          p[7] = y[z];
          p[6] = y[z + 1];
          p[5] = y[z + 2];
          p[4] = y[z + 3];
          p[3] = y[z + 4];
          p[2] = y[z + 5];
          p[1] = y[z + 6];
          p[0] = y[z + 7];
          return m[0];
        }
        l.writeDoubleLE = q ? u : v;
        l.writeDoubleBE = q ? v : u;
        l.readDoubleLE = q ? w : x;
        l.readDoubleBE = q ? x : w;
      }() : function () {
        function m(q, v, w, x, y, z) {
          var A = x < 0 ? 1 : 0;
          if ((A && (x = -x), x === 0)) {
            q(0, y, z + v);
            q(1 / x > 0 ? 0 : 2147483648, y, z + w);
          } else if (isNaN(x)) {
            q(0, y, z + v);
            q(2146959360, y, z + w);
          } else if (x > 1.7976931348623157e+308) {
            q(0, y, z + v);
            q((A << 31 | 2146435072) >>> 0, y, z + w);
          } else {
            var B;
            if (x < 2.2250738585072014e-308) {
              q((B = x / 5e-324) >>> 0, y, z + v);
              q((A << 31 | B / 4294967296) >>> 0, y, z + w);
            } else {
              var C = Math.floor(Math.log(x) / Math.LN2);

              if (C === 1024)
                C = 1023;

              q(4503599627370496 * (B = x * Math.pow(2, -C)) >>> 0, y, z + v);
              q((A << 31 | C + 1023 << 20 | 1048576 * B & 1048575) >>> 0, y, z + w);
            }
          }
        }

        function p(q, v, w, x, y) {
          var z = q(x, y + v),
            A = q(x, y + w),
            B = 2 * (A >> 31) + 1,
            C = A >>> 20 & 2047,
            D = 4294967296 * (1048575 & A) + z;
          return C === 2047 ? D ? NaN : B * (1 / 0) : C === 0 ? 5e-324 * B * D : B * Math.pow(2, C - 1075) * (D + 4503599627370496);
        }
        l.writeDoubleLE = m.bind(null, g, 0, 4);
        l.writeDoubleBE = m.bind(null, h, 4, 0);
        l.readDoubleLE = p.bind(null, j, 0, 4);
        l.readDoubleBE = p.bind(null, k, 4, 0);
      }();

      return l;
    }

    function g(l, m, p) {
      m[p] = 255 & l;
      m[p + 1] = l >>> 8 & 255;
      m[p + 2] = l >>> 16 & 255;
      m[p + 3] = l >>> 24;
    }

    function h(l, m, p) {
      m[p] = l >>> 24;
      m[p + 1] = l >>> 16 & 255;
      m[p + 2] = l >>> 8 & 255;
      m[p + 3] = 255 & l;
    }

    function j(l, m) {
      return (l[m] | l[m + 1] << 8 | l[m + 2] << 16 | l[m + 3] << 24) >>> 0;
    }

    function k(l, m) {
      return (l[m] << 24 | l[m + 1] << 16 | l[m + 2] << 8 | l[m + 3]) >>> 0;
    }
    c.exports = f(f);
  }, {}],
  7: [function (a, b, c) {
    'use strict';

    function d(f) {
      try {
        var g = eval('quire'.replace(/^/, 're'))(f);
        if (g && (g.length || Object.keys(g).length)) return g;
      } catch (h) {}
      return null;
    }
    b.exports = d;
  }, {}],
  8: [function (a, b, c) {
    'use strict';
    var d = c,
      f = d.isAbsolute = function (h) {
        return /^(?:\/|\w+:)/.test(h);
      },
      g = d.normalize = function (h) {
        var j = (h = h.replace(/\\/g, '/').replace(/\/{2,}/g, '/')).split('/'),
          k = f(h),
          l = '';

        if (k)
          l = j.shift() + '/';

        for (var m = 0; m < j.length;) j[m] === '..' ? m > 0 && j[m - 1] !== '..' ? j.splice(--m, 2) : k ? j.splice(m, 1) : ++m : j[m] === '.' ? j.splice(m, 1) : ++m;
        return l + j.join('/');
      };
    d.resolve = function (h, j, k) {
      k || (j = g(j));
      return f(j) ? j : (k || (h = g(h)), (h = h.replace(/(?:\/|^)[^/]+$/, '')).length ? g(h + '/' + j) : j);
    };
  }, {}],
  9: [function (a, b, c) {
    'use strict';
    b.exports = function (d, f, g) {
      var h = g || 8192,
        j = h >>> 1,
        k = null,
        l = h;
      return function (m) {
        if (m < 1 || m > j) return d(m);

        if (l + m > h) {
          k = d(h);
          l = 0;
        }

        var p = f.call(k, l, l += m);

        if (7 & l)
          l = 1 + (7 | l);

        return p;
      };
    };
  }, {}],
  10: [function (a, b, c) {
    'use strict';
    var d = c;

    d.length = function (f) {
      for (var g = 0, h = 0, j = 0; j < f.length; ++j)(h = f.charCodeAt(j)) < 128 ? g += 1 : h < 2048 ? g += 2 : 55296 == (64512 & h) && 56320 == (64512 & f.charCodeAt(j + 1)) ? (++j, g += 4) : g += 3;
      return g;
    };

    d.read = function (f, g, h) {
      if (h - g < 1) return '';
      for (var j, k = null, l = [], m = 0; g < h;) {
        (j = f[g++]) < 128 ? l[m++] = j : j > 191 && j < 224 ? l[m++] = (31 & j) << 6 | 63 & f[g++] : j > 239 && j < 365 ? (j = ((7 & j) << 18 | (63 & f[g++]) << 12 | (63 & f[g++]) << 6 | 63 & f[g++]) - 65536, l[m++] = 55296 + (j >> 10), l[m++] = 56320 + (1023 & j)) : l[m++] = (15 & j) << 12 | (63 & f[g++]) << 6 | 63 & f[g++];

        if (m > 8191) {
          (k || (k = [])).push(String.fromCharCode.apply(String, l));
          m = 0;
        }
      }
      return k ? (m && k.push(String.fromCharCode.apply(String, l.slice(0, m))), k.join('')) : String.fromCharCode.apply(String, l.slice(0, m));
    };

    d.write = function (f, g, h) {
      for (var j, k, l = h, m = 0; m < f.length; ++m)(j = f.charCodeAt(m)) < 128 ? g[h++] = j : j < 2048 ? (g[h++] = j >> 6 | 192, g[h++] = 63 & j | 128) : 55296 == (64512 & j) && 56320 == (64512 & (k = f.charCodeAt(m + 1))) ? (j = 65536 + ((1023 & j) << 10) + (1023 & k), ++m, g[h++] = j >> 18 | 240, g[h++] = j >> 12 & 63 | 128, g[h++] = j >> 6 & 63 | 128, g[h++] = 63 & j | 128) : (g[h++] = j >> 12 | 224, g[h++] = j >> 6 & 63 | 128, g[h++] = 63 & j | 128);
      return h - l;
    };
  }, {}],
  11: [function (a, b, c) {
    'use strict';
    b.exports = g;
    var d, f = /\/|\./;

    function g(h, j) {
      f.test(h) || (h = 'google/protobuf/' + h + '.proto', j = {
        nested: {
          google: {
            nested: {
              protobuf: {
                nested: j
              }
            }
          }
        }
      });

      g[h] = j;
    }

    g('any', {
      Any: {
        fields: {
          type_url: {
            type: 'string',
            id: 1
          },
          value: {
            type: 'bytes',
            id: 2
          }
        }
      }
    });

    g('duration', {
      Duration: d = {
        fields: {
          seconds: {
            type: 'int64',
            id: 1
          },
          nanos: {
            type: 'int32',
            id: 2
          }
        }
      }
    });

    g('timestamp', {
      Timestamp: d
    });

    g('empty', {
      Empty: {
        fields: {}
      }
    });

    g('struct', {
      Struct: {
        fields: {
          fields: {
            keyType: 'string',
            type: 'Value',
            id: 1
          }
        }
      },
      Value: {
        oneofs: {
          kind: {
            oneof: ['nullValue', 'numberValue', 'stringValue', 'boolValue', 'structValue', 'listValue']
          }
        },
        fields: {
          nullValue: {
            type: 'NullValue',
            id: 1
          },
          numberValue: {
            type: 'double',
            id: 2
          },
          stringValue: {
            type: 'string',
            id: 3
          },
          boolValue: {
            type: 'bool',
            id: 4
          },
          structValue: {
            type: 'Struct',
            id: 5
          },
          listValue: {
            type: 'ListValue',
            id: 6
          }
        }
      },
      NullValue: {
        values: {
          NULL_VALUE: 0
        }
      },
      ListValue: {
        fields: {
          values: {
            rule: 'repeated',
            type: 'Value',
            id: 1
          }
        }
      }
    });

    g('wrappers', {
      DoubleValue: {
        fields: {
          value: {
            type: 'double',
            id: 1
          }
        }
      },
      FloatValue: {
        fields: {
          value: {
            type: 'float',
            id: 1
          }
        }
      },
      Int64Value: {
        fields: {
          value: {
            type: 'int64',
            id: 1
          }
        }
      },
      UInt64Value: {
        fields: {
          value: {
            type: 'uint64',
            id: 1
          }
        }
      },
      Int32Value: {
        fields: {
          value: {
            type: 'int32',
            id: 1
          }
        }
      },
      UInt32Value: {
        fields: {
          value: {
            type: 'uint32',
            id: 1
          }
        }
      },
      BoolValue: {
        fields: {
          value: {
            type: 'bool',
            id: 1
          }
        }
      },
      StringValue: {
        fields: {
          value: {
            type: 'string',
            id: 1
          }
        }
      },
      BytesValue: {
        fields: {
          value: {
            type: 'bytes',
            id: 1
          }
        }
      }
    });

    g('field_mask', {
      FieldMask: {
        fields: {
          paths: {
            rule: 'repeated',
            type: 'string',
            id: 1
          }
        }
      }
    });

    g.get = function (h) {
      return g[h] || null;
    };
  }, {}],
  12: [function (b, c, d) {
    'use strict';
    var f = d,
      g = b('./enum'),
      h = b('./util');

    function j(l, m, p, q) {
      if (m.resolvedType)
        if (m.resolvedType instanceof g) {
          l('switch(d%s){', q);
          for (var v = m.resolvedType.values, w = Object.keys(v), x = 0; x < w.length; ++x) {
            if (m.repeated && v[w[x]] === m.typeDefault)
              l('default:');

            l('case%j:', w[x])('case %i:', v[w[x]])('m%s=%j', q, v[w[x]])('break');
          }
          l('}');
        } else l('if(typeof d%s!==\"object\")', q)('throw TypeError(%j)', m.fullName + ': object expected')('m%s=types[%i].fromObject(d%s)', q, p, q);
      else {
        var y = false;
        switch (m.type) {
        case 'double':
        case 'float':
          l('m%s=Number(d%s)', q, q);
          break;
        case 'uint32':
        case 'fixed32':
          l('m%s=d%s>>>0', q, q);
          break;
        case 'int32':
        case 'sint32':
        case 'sfixed32':
          l('m%s=d%s|0', q, q);
          break;
        case 'uint64':
          y = true;
        case 'int64':
        case 'sint64':
        case 'fixed64':
        case 'sfixed64':
          l('if(util.Long)')('(m%s=util.Long.fromValue(d%s)).unsigned=%j', q, q, y)('else if(typeof d%s===\"string\")', q)('m%s=parseInt(d%s,10)', q, q)('else if(typeof d%s===\"number\")', q)('m%s=d%s', q, q)('else if(typeof d%s===\"object\")', q)('m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)', q, q, q, y ? 'true' : '');
          break;
        case 'bytes':
          l('if(typeof d%s===\"string\")', q)('util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)', q, q, q)('else if(d%s.length)', q)('m%s=d%s', q, q);
          break;
        case 'string':
          l('m%s=String(d%s)', q, q);
          break;
        case 'bool':
          l('m%s=Boolean(d%s)', q, q);
        }
      }
      return l;
    }

    function k(l, m, p, q) {
      if (m.resolvedType) m.resolvedType instanceof g ? l('d%s=o.enums===String?types[%i].values[m%s]:m%s', q, p, q, q) : l('d%s=types[%i].toObject(m%s,o)', q, p, q);
      else {
        var u = false;
        switch (m.type) {
        case 'double':
        case 'float':
          l('d%s=o.json&&!isFinite(m%s)?String(m%s):m%s', q, q, q, q);
          break;
        case 'uint64':
          u = true;
        case 'int64':
        case 'sint64':
        case 'fixed64':
        case 'sfixed64':
          l('if(typeof m%s===\"number\")', q)('d%s=o.longs===String?String(m%s):m%s', q, q, q)('else')('d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s', q, q, q, q, u ? 'true' : '', q);
          break;
        case 'bytes':
          l('d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s', q, q, q, q, q);
          break;
        default:
          l('d%s=m%s', q, q);
        }
      }
      return l;
    }

    f.fromObject = function (l) {
      var m = l.fieldsArray,
        p = h.codegen(['d'], l.name + '$fromObject')('if(d instanceof this.ctor)')('return d');
      if (!m.length) return p('return new this.ctor');
      p('var m=new this.ctor');
      for (var q = 0; q < m.length; ++q) {
        var v = m[q].resolve(),
          w = h.safeProp(v.name);
        v.map ? (p('if(d%s){', w)('if(typeof d%s!==\"object\")', w)('throw TypeError(%j)', v.fullName + ': object expected')('m%s={}', w)('for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){', w), j(p, v, q, w + '[ks[i]]')('}')('}')) : v.repeated ? (p('if(d%s){', w)('if(!Array.isArray(d%s))', w)('throw TypeError(%j)', v.fullName + ': array expected')('m%s=[]', w)('for(var i=0;i<d%s.length;++i){', w), j(p, v, q, w + '[i]')('}')('}')) : (v.resolvedType instanceof g || p('if(d%s!=null){', w), j(p, v, q, w), v.resolvedType instanceof g || p('}'));
      }
      return p('return m');
    };

    f.toObject = function (m) {
      var q = m.fieldsArray.slice().sort(h.compareFieldsById);
      if (!q.length) return h.codegen()('return {}');
      for (var v = h.codegen(['m', 'o'], m.name + '$toObject')('if(!o)')('o={}')('var d={}'), w = [], x = [], y = [], z = 0; z < q.length; ++z) q[z].partOf || (q[z].resolve().repeated ? w : q[z].map ? x : y).push(q[z]);
      if (w.length) {
        for (v('if(o.arrays||o.defaults){'), z = 0; z < w.length; ++z) v('d%s=[]', h.safeProp(w[z].name));
        v('}');
      }
      if (x.length) {
        for (v('if(o.objects||o.defaults){'), z = 0; z < x.length; ++z) v('d%s={}', h.safeProp(x[z].name));
        v('}');
      }
      if (y.length) {
        for (v('if(o.defaults){'), z = 0; z < y.length; ++z) {
          var A = y[z],
            B = h.safeProp(A.name);
          if (A.resolvedType instanceof g) v('d%s=o.enums===String?%j:%j', B, A.resolvedType.valuesById[A.typeDefault], A.typeDefault);
          else if (A.long) v('if(util.Long){')('var n=new util.Long(%i,%i,%j)', A.typeDefault.low, A.typeDefault.high, A.typeDefault.unsigned)('d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n', B)('}else')('d%s=o.longs===String?%j:%i', B, A.typeDefault.toString(), A.typeDefault.toNumber());
          else if (A.bytes) {
            var C = '[' + Array.prototype.slice.call(A.typeDefault).join(',') + ']';
            v('if(o.bytes===String)d%s=%j', B, String.fromCharCode.apply(String, A.typeDefault))('else{')('d%s=%s', B, C)('if(o.bytes!==Array)d%s=util.newBuffer(d%s)', B, B)('}');
          } else v('d%s=%j', B, A.typeDefault);
        }
        v('}');
      }
      var D = false;
      for (z = 0; z < q.length; ++z) {
        A = q[z];
        var E = m._fieldsArray.indexOf(A);
        B = h.safeProp(A.name);
        A.map ? (D || (D = true, v('var ks2')), v('if(m%s&&(ks2=Object.keys(m%s)).length){', B, B)('d%s={}', B)('for(var j=0;j<ks2.length;++j){'), k(v, A, E, B + '[ks2[j]]')('}')) : A.repeated ? (v('if(m%s&&m%s.length){', B, B)('d%s=[]', B)('for(var j=0;j<m%s.length;++j){', B), k(v, A, E, B + '[j]')('}')) : (v('if(m%s!=null&&m.hasOwnProperty(%j)){', B, A.name), k(v, A, E, B), A.partOf && v('if(o.oneofs)')('d%s=%j', h.safeProp(A.partOf.name), A.name));
        v('}');
      }
      return v('return d');
    };
  }, {
    './enum': 15,
    './util': 37
  }],
  13: [function (a, b, c) {
    'use strict';
    b.exports = function (j) {
      var k = g.codegen(['r', 'l'], j.name + '$decode')('if(!(r instanceof Reader))')('r=Reader.create(r)')('var c=l===undefined?r.len:r.pos+l,m=new this.ctor' + (j.fieldsArray.filter(function (x) {
        return x.map;
      }).length ? ',k' : ''))('while(r.pos<c){')('var t=r.uint32()');

      if (j.group)
        k('if((t&7)===4)')('break');

      k('switch(t>>>3){');
      for (var m = 0; m < j.fieldsArray.length; ++m) {
        var p = j._fieldsArray[m].resolve(),
          q = p.resolvedType instanceof d ? 'int32' : p.type,
          v = 'm' + g.safeProp(p.name);
        k('case %i:', p.id);
        p.map ? (k('r.skip().pos++')('if(%s===util.emptyObject)', v)('%s={}', v)('k=r.%s()', p.keyType)('r.pos++'), undefined !== f.long[p.keyType] ? undefined === f.basic[q] ? k('%s[typeof k===\"object\"?util.longToHash(k):k]=types[%i].decode(r,r.uint32())', v, m) : k('%s[typeof k===\"object\"?util.longToHash(k):k]=r.%s()', v, q) : undefined === f.basic[q] ? k('%s[k]=types[%i].decode(r,r.uint32())', v, m) : k('%s[k]=r.%s()', v, q)) : p.repeated ? (k('if(!(%s&&%s.length))', v, v)('%s=[]', v), undefined !== f.packed[q] && k('if((t&7)===2){')('var c2=r.uint32()+r.pos')('while(r.pos<c2)')('%s.push(r.%s())', v, q)('}else'), undefined === f.basic[q] ? k(p.resolvedType.group ? '%s.push(types[%i].decode(r))' : '%s.push(types[%i].decode(r,r.uint32()))', v, m) : k('%s.push(r.%s())', v, q)) : undefined === f.basic[q] ? k(p.resolvedType.group ? '%s=types[%i].decode(r)' : '%s=types[%i].decode(r,r.uint32())', v, m) : k('%s=r.%s()', v, q);
        k('break');
      }
      for (k('default:')('r.skipType(t&7)')('break')('}')('}'), m = 0; m < j._fieldsArray.length; ++m) {
        var w = j._fieldsArray[m];

        if (w.required)
          k('if(!m.hasOwnProperty(%j))', w.name)('throw util.ProtocolError(%j,{instance:m})', h(w));
      }
      return k('return m');
    };
    var d = a('./enum'),
      f = a('./types'),
      g = a('./util');

    function h(j) {
      return 'missing required \'' + j.name + '\'';
    }
  }, {
    './enum': 15,
    './types': 36,
    './util': 37
  }],
  14: [function (a, b, c) {
    'use strict';
    b.exports = function (j) {
      for (var k, m = g.codegen(['m', 'w'], j.name + '$encode')('if(!w)')('w=Writer.create()'), q = j.fieldsArray.slice().sort(g.compareFieldsById), v = 0; v < q.length; ++v) {
        var w = q[v].resolve(),
          x = j._fieldsArray.indexOf(w),
          y = w.resolvedType instanceof d ? 'int32' : w.type,
          z = f.basic[y];
        k = 'm' + g.safeProp(w.name);
        w.map ? (m('if(%s!=null&&m.hasOwnProperty(%j)){', k, w.name)('for(var ks=Object.keys(%s),i=0;i<ks.length;++i){', k)('w.uint32(%i).fork().uint32(%i).%s(ks[i])', (w.id << 3 | 2) >>> 0, 8 | f.mapKey[w.keyType], w.keyType), undefined === z ? m('types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()', x, k) : m('.uint32(%i).%s(%s[ks[i]]).ldelim()', 16 | z, y, k), m('}')('}')) : w.repeated ? (m('if(%s!=null&&%s.length){', k, k), w.packed && undefined !== f.packed[y] ? m('w.uint32(%i).fork()', (w.id << 3 | 2) >>> 0)('for(var i=0;i<%s.length;++i)', k)('w.%s(%s[i])', y, k)('w.ldelim()') : (m('for(var i=0;i<%s.length;++i)', k), undefined === z ? h(m, w, x, k + '[i]') : m('w.uint32(%i).%s(%s[i])', (w.id << 3 | z) >>> 0, y, k)), m('}')) : (w.optional && m('if(%s!=null&&m.hasOwnProperty(%j))', k, w.name), undefined === z ? h(m, w, x, k) : m('w.uint32(%i).%s(%s)', (w.id << 3 | z) >>> 0, y, k));
      }
      return m('return w');
    };
    var d = a('./enum'),
      f = a('./types'),
      g = a('./util');

    function h(j, k, l, m) {
      return k.resolvedType.group ? j('types[%i].encode(%s,w.uint32(%i)).uint32(%i)', l, m, (k.id << 3 | 3) >>> 0, (k.id << 3 | 4) >>> 0) : j('types[%i].encode(%s,w.uint32(%i).fork()).ldelim()', l, m, (k.id << 3 | 2) >>> 0);
    }
  }, {
    './enum': 15,
    './types': 36,
    './util': 37
  }],
  15: [function (a, b, c) {
    'use strict';
    b.exports = h;
    var d = a('./object');
    ((h.prototype = Object.create(d.prototype)).constructor = h).className = 'Enum';
    var f = a('./namespace'),
      g = a('./util');

    function h(j, k, l, m, p) {
      if (d.call(this, j, l), k && 'object' != typeof k) throw TypeError('values must be an object');
      if (this.valuesById = {}, this.values = Object.create(this.valuesById), this.comment = m, this.comments = p || {}, this.reserved = undefined, k)
        for (var q = Object.keys(k), u = 0; u < q.length; ++u)
          if ('number' == typeof k[q[u]])
            this.valuesById[this.values[q[u]] = k[q[u]]] = q[u];
    }

    h.fromJSON = function (j, k) {
      var l = new h(j, k.values, k.options, k.comment, k.comments);
      l.reserved = k.reserved;
      return l;
    };

    h.prototype.toJSON = function (j) {
      var k = !!j && Boolean(j.keepComments);
      return g.toObject(['options', this.options, 'values', this.values, 'reserved', this.reserved && this.reserved.length ? this.reserved : undefined, 'comment', k ? this.comment : undefined, 'comments', k ? this.comments : undefined]);
    };

    h.prototype.add = function (j, k, l) {
      if (!g.isString(j)) throw TypeError('name must be a string');
      if (!g.isInteger(k)) throw TypeError('id must be an integer');
      if (undefined !== this.values[j]) throw Error('duplicate name \'' + j + '\' in ' + this);
      if (this.isReservedId(k)) throw Error('id ' + k + ' is reserved in ' + this);
      if (this.isReservedName(j)) throw Error('name \'' + j + '\' is reserved in ' + this);
      if (undefined !== this.valuesById[k]) {
        if (!this.options || !this.options.allow_alias) throw Error('duplicate id ' + k + ' in ' + this);
        this.values[j] = k;
      } else this.valuesById[this.values[j] = k] = j;
      this.comments[j] = l || null;
      return this;
    };

    h.prototype.remove = function (j) {
      if (!g.isString(j)) throw TypeError('name must be a string');
      var k = this.values[j];
      if (null == k) throw Error('name \'' + j + '\' does not exist in ' + this);
      delete this.valuesById[k];
      delete this.values[j];
      delete this.comments[j];
      return this;
    };

    h.prototype.isReservedId = function (j) {
      return f.isReservedId(this.reserved, j);
    };

    h.prototype.isReservedName = function (j) {
      return f.isReservedName(this.reserved, j);
    };
  }, {
    './namespace': 23,
    './object': 24,
    './util': 37
  }],
  16: [function (b, c, d) {
    'use strict';
    c.exports = p;
    var g = b('./object');
    ((p.prototype = Object.create(g.prototype)).constructor = p).className = 'Field';
    var h, j = b('./enum'),
      k = b('./types'),
      l = b('./util'),
      m = /^required|optional|repeated$/;

    function p(q, v, w, x, y, z, A) {
      if (l.isObject(x) ? (A = y, z = x, x = y = undefined) : l.isObject(y) && (A = z, z = y, y = undefined), g.call(this, q, z), !l.isInteger(v) || v < 0) throw TypeError('id must be a non-negative integer');
      if (!l.isString(w)) throw TypeError('type must be a string');
      if (undefined !== x && !m.test(x = x.toString().toLowerCase())) throw TypeError('rule must be a string rule');
      if (undefined !== y && !l.isString(y)) throw TypeError('extend must be a string');
      this.rule = x && x !== 'optional' ? x : undefined;
      this.type = w;
      this.id = v;
      this.extend = y || undefined;
      this.required = x === 'required';
      this.optional = !this.required;
      this.repeated = x === 'repeated';
      this.map = false;
      this.message = null;
      this.partOf = null;
      this.typeDefault = null;
      this.defaultValue = null;
      this.long = !!l.Long && undefined !== k.long[w];
      this.bytes = w === 'bytes';
      this.resolvedType = null;
      this.extensionField = null;
      this.declaringField = null;
      this._packed = null;
      this.comment = A;
    }

    p.fromJSON = function (q, v) {
      return new p(q, v.id, v.type, v.rule, v.extend, v.options, v.comment);
    };

    Object.defineProperty(p.prototype, 'packed', {
      get: function () {
        if (this._packed === null)
          this._packed = false !== this.getOption('packed');

        return this._packed;
      }
    });

    p.prototype.setOption = function (q, v, w) {
      if (q === 'packed')
        this._packed = null;

      return g.prototype.setOption.call(this, q, v, w);
    };

    p.prototype.toJSON = function (q) {
      var v = !!q && Boolean(q.keepComments);
      return l.toObject(['rule', this.rule !== 'optional' && this.rule || undefined, 'type', this.type, 'id', this.id, 'extend', this.extend, 'options', this.options, 'comment', v ? this.comment : undefined]);
    };

    p.prototype.resolve = function () {
      if (this.resolved) return this;
      if ((undefined === (this.typeDefault = k.defaults[this.type]) && (this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type), this.resolvedType instanceof h ? this.typeDefault = null : this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]]), this.options && null != this.options.default && (this.typeDefault = this.options.default, this.resolvedType instanceof j && 'string' == typeof this.typeDefault && (this.typeDefault = this.resolvedType.values[this.typeDefault])), this.options && (true !== this.options.packed && (undefined === this.options.packed || !this.resolvedType || this.resolvedType instanceof j) || delete this.options.packed, Object.keys(this.options).length || (this.options = undefined)), this.long)) {
        this.typeDefault = l.Long.fromNumber(this.typeDefault, this.type.charAt(0) === 'u');

        if (Object.freeze)
          Object.freeze(this.typeDefault);
      } else if (this.bytes && 'string' == typeof this.typeDefault) {
        var q;
        l.base64.test(this.typeDefault) ? l.base64.decode(this.typeDefault, q = l.newBuffer(l.base64.length(this.typeDefault)), 0) : l.utf8.write(this.typeDefault, q = l.newBuffer(l.utf8.length(this.typeDefault)), 0);
        this.typeDefault = q;
      }
      this.map ? this.defaultValue = l.emptyObject : this.repeated ? this.defaultValue = l.emptyArray : this.defaultValue = this.typeDefault;

      if (this.parent instanceof h)
        this.parent.ctor.prototype[this.name] = this.defaultValue;

      return g.prototype.resolve.call(this);
    };

    p.d = function (q, v, w, x) {
      'function' == typeof v ? v = l.decorateType(v).name : v && 'object' == typeof v && (v = l.decorateEnum(v).name);

      return function (y, z) {
        l.decorateType(y.constructor).add(new p(z, q, v, w, {
          default: x
        }));
      };
    };

    p._configure = function (q) {
      h = q;
    };
  }, {
    './enum': 15,
    './object': 24,
    './types': 36,
    './util': 37
  }],
  17: [function (a, b, c) {
    'use strict';
    var d = b.exports = a('./index-minimal');
    d.build = 'light';

    d.load = function (f, g, h) {
      'function' == typeof g ? (h = g, g = new d.Root()) : g || (g = new d.Root());
      return g.load(f, h);
    };

    d.loadSync = function (f, g) {
      g || (g = new d.Root());
      return g.loadSync(f);
    };

    d.encoder = a('./encoder');
    d.decoder = a('./decoder');
    d.verifier = a('./verifier');
    d.converter = a('./converter');
    d.ReflectionObject = a('./object');
    d.Namespace = a('./namespace');
    d.Root = a('./root');
    d.Enum = a('./enum');
    d.Type = a('./type');
    d.Field = a('./field');
    d.OneOf = a('./oneof');
    d.MapField = a('./mapfield');
    d.Service = a('./service');
    d.Method = a('./method');
    d.Message = a('./message');
    d.wrappers = a('./wrappers');
    d.types = a('./types');
    d.util = a('./util');
    d.ReflectionObject._configure(d.Root);
    d.Namespace._configure(d.Type, d.Service, d.Enum);
    d.Root._configure(d.Type);
    d.Field._configure(d.Type);
  }, {
    './converter': 12,
    './decoder': 13,
    './encoder': 14,
    './enum': 15,
    './field': 16,
    './index-minimal': 18,
    './mapfield': 20,
    './message': 21,
    './method': 22,
    './namespace': 23,
    './object': 24,
    './oneof': 25,
    './root': 29,
    './service': 33,
    './type': 35,
    './types': 36,
    './util': 37,
    './verifier': 40,
    './wrappers': 41
  }],
  18: [function (a, b, c) {
    'use strict';
    var d = c;

    function f() {
      d.Reader._configure(d.BufferReader);
      d.util._configure();
    }
    d.build = 'minimal';
    d.Writer = a('./writer');
    d.BufferWriter = a('./writer_buffer');
    d.Reader = a('./reader');
    d.BufferReader = a('./reader_buffer');
    d.util = a('./util/minimal');
    d.rpc = a('./rpc');
    d.roots = a('./roots');
    d.configure = f;
    d.Writer._configure(d.BufferWriter);
    f();
  }, {
    './reader': 27,
    './reader_buffer': 28,
    './roots': 30,
    './rpc': 31,
    './util/minimal': 39,
    './writer': 42,
    './writer_buffer': 43
  }],
  19: [function (a, b, c) {
    'use strict';
    var d = b.exports = a('./index-light');
    d.build = 'full';
    d.tokenize = a('./tokenize');
    d.parse = a('./parse');
    d.common = a('./common');
    d.Root._configure(d.Type, d.parse, d.common);
  }, {
    './common': 11,
    './index-light': 17,
    './parse': 26,
    './tokenize': 34
  }],
  20: [function (a, b, c) {
    'use strict';
    b.exports = h;
    var d = a('./field');
    ((h.prototype = Object.create(d.prototype)).constructor = h).className = 'MapField';
    var f = a('./types'),
      g = a('./util');

    function h(j, k, l, m, p, q) {
      if (d.call(this, j, k, m, undefined, undefined, p, q), !g.isString(l)) throw TypeError('keyType must be a string');
      this.keyType = l;
      this.resolvedKeyType = null;
      this.map = true;
    }

    h.fromJSON = function (j, k) {
      return new h(j, k.id, k.keyType, k.type, k.options, k.comment);
    };

    h.prototype.toJSON = function (j) {
      var k = !!j && Boolean(j.keepComments);
      return g.toObject(['keyType', this.keyType, 'type', this.type, 'id', this.id, 'extend', this.extend, 'options', this.options, 'comment', k ? this.comment : undefined]);
    };

    h.prototype.resolve = function () {
      if (this.resolved) return this;
      if (undefined === f.mapKey[this.keyType]) throw Error('invalid key type: ' + this.keyType);
      return d.prototype.resolve.call(this);
    };

    h.d = function (j, k, l) {
      'function' == typeof l ? l = g.decorateType(l).name : l && 'object' == typeof l && (l = g.decorateEnum(l).name);

      return function (m, p) {
        g.decorateType(m.constructor).add(new h(p, j, k, l));
      };
    };
  }, {
    './field': 16,
    './types': 36,
    './util': 37
  }],
  21: [function (a, b, c) {
    'use strict';
    b.exports = f;
    var d = a('./util/minimal');

    function f(g) {
      if (g)
        for (var h = Object.keys(g), j = 0; j < h.length; ++j) this[h[j]] = g[h[j]];
    }

    f.create = function (g) {
      return this.$type.create(g);
    };

    f.encode = function (g, h) {
      return this.$type.encode(g, h);
    };

    f.encodeDelimited = function (g, h) {
      return this.$type.encodeDelimited(g, h);
    };

    f.decode = function (g) {
      return this.$type.decode(g);
    };

    f.decodeDelimited = function (g) {
      return this.$type.decodeDelimited(g);
    };

    f.verify = function (g) {
      return this.$type.verify(g);
    };

    f.fromObject = function (g) {
      return this.$type.fromObject(g);
    };

    f.toObject = function (g, h) {
      return this.$type.toObject(g, h);
    };

    f.prototype.toJSON = function () {
      return this.$type.toObject(this, d.toJSONOptions);
    };
  }, {
    './util/minimal': 39
  }],
  22: [function (a, b, c) {
    'use strict';
    b.exports = g;
    var d = a('./object');
    ((g.prototype = Object.create(d.prototype)).constructor = g).className = 'Method';
    var f = a('./util');

    function g(h, j, k, l, m, p, q, v) {
      if (f.isObject(m) ? (q = m, m = p = undefined) : f.isObject(p) && (q = p, p = undefined), undefined !== j && !f.isString(j)) throw TypeError('type must be a string');
      if (!f.isString(k)) throw TypeError('requestType must be a string');
      if (!f.isString(l)) throw TypeError('responseType must be a string');
      d.call(this, h, q);
      this.type = j || 'rpc';
      this.requestType = k;
      this.requestStream = !!m || undefined;
      this.responseType = l;
      this.responseStream = !!p || undefined;
      this.resolvedRequestType = null;
      this.resolvedResponseType = null;
      this.comment = v;
    }

    g.fromJSON = function (h, j) {
      return new g(h, j.type, j.requestType, j.responseType, j.requestStream, j.responseStream, j.options, j.comment);
    };

    g.prototype.toJSON = function (h) {
      var j = !!h && Boolean(h.keepComments);
      return f.toObject(['type', this.type !== 'rpc' && this.type || undefined, 'requestType', this.requestType, 'requestStream', this.requestStream, 'responseType', this.responseType, 'responseStream', this.responseStream, 'options', this.options, 'comment', j ? this.comment : undefined]);
    };

    g.prototype.resolve = function () {
      return this.resolved ? this : (this.resolvedRequestType = this.parent.lookupType(this.requestType), this.resolvedResponseType = this.parent.lookupType(this.responseType), d.prototype.resolve.call(this));
    };
  }, {
    './object': 24,
    './util': 37
  }],
  23: [function (b, d, g) {
    'use strict';
    d.exports = w;
    var h = b('./object');
    ((w.prototype = Object.create(h.prototype)).constructor = w).className = 'Namespace';
    var j, k, m, p = b('./field'),
      q = b('./util');

    function v(y, z) {
      if (y && y.length) {
        for (var A = {}, B = 0; B < y.length; ++B) A[y[B].name] = y[B].toJSON(z);
        return A;
      }
    }

    function w(y, z) {
      h.call(this, y, z);
      this.nested = undefined;
      this._nestedArray = null;
    }

    function x(y) {
      y._nestedArray = null;
      return y;
    }

    w.fromJSON = function (y, z) {
      return new w(y, z.options).addJSON(z.nested);
    };

    w.arrayToJSON = v;

    w.isReservedId = function (y, z) {
      if (y)
        for (var A = 0; A < y.length; ++A)
          if ('string' != typeof y[A] && y[A][0] <= z && y[A][1] >= z) return true;
      return false;
    };

    w.isReservedName = function (y, z) {
      if (y)
        for (var A = 0; A < y.length; ++A)
          if (y[A] === z) return true;
      return false;
    };

    Object.defineProperty(w.prototype, 'nestedArray', {
      get: function () {
        return this._nestedArray || (this._nestedArray = q.toArray(this.nested));
      }
    });

    w.prototype.toJSON = function (y) {
      return q.toObject(['options', this.options, 'nested', v(this.nestedArray, y)]);
    };

    w.prototype.addJSON = function (y) {
      if (y)
        for (var z, A = Object.keys(y), B = 0; B < A.length; ++B) {
          z = y[A[B]];
          this.add((undefined !== z.fields ? j.fromJSON : undefined !== z.values ? m.fromJSON : undefined !== z.methods ? k.fromJSON : undefined !== z.id ? p.fromJSON : w.fromJSON)(A[B], z));
        }
      return this;
    };

    w.prototype.get = function (y) {
      return this.nested && this.nested[y] || null;
    };

    w.prototype.getEnum = function (y) {
      if (this.nested && this.nested[y] instanceof m) return this.nested[y].values;
      throw Error('no such enum: ' + y);
    };

    w.prototype.add = function (y) {
      if (!(y instanceof p && undefined !== y.extend || y instanceof j || y instanceof m || y instanceof k || y instanceof w)) throw TypeError('object must be a valid nested object');
      if (this.nested) {
        var z = this.get(y.name);
        if (z) {
          if (!(z instanceof w && y instanceof w) || z instanceof j || z instanceof k) throw Error('duplicate name \'' + y.name + '\' in ' + this);
          for (var A = z.nestedArray, B = 0; B < A.length; ++B) y.add(A[B]);
          this.remove(z);
          this.nested || (this.nested = {});
          y.setOptions(z.options, true);
        }
      } else this.nested = {};
      this.nested[y.name] = y;
      y.onAdd(this);
      return x(this);
    };

    w.prototype.remove = function (y) {
      if (!(y instanceof h)) throw TypeError('object must be a ReflectionObject');
      if (y.parent !== this) throw Error(y + ' is not a member of ' + this);
      delete this.nested[y.name];
      Object.keys(this.nested).length || (this.nested = undefined);
      y.onRemove(this);
      return x(this);
    };

    w.prototype.define = function (y, z) {
      if (q.isString(y)) y = y.split('.');
      else if (!Array.isArray(y)) throw TypeError('illegal path');
      if (y && y.length && y[0] === '') throw Error('path must be relative');
      for (var A = this; y.length > 0;) {
        var B = y.shift();
        if (A.nested && A.nested[B]) {
          if (!((A = A.nested[B]) instanceof w)) throw Error('path conflicts with non-namespace objects');
        } else A.add(A = new w(B));
      }

      if (z)
        A.addJSON(z);

      return A;
    };

    w.prototype.resolveAll = function () {
      for (var y = this.nestedArray, z = 0; z < y.length;) y[z] instanceof w ? y[z++].resolveAll() : y[z++].resolve();
      return this.resolve();
    };

    w.prototype.lookup = function (y, z, A) {
      if ('boolean' == typeof z ? (A = z, z = undefined) : z && !Array.isArray(z) && (z = [z]), q.isString(y) && y.length) {
        if (y === '.') return this.root;
        y = y.split('.');
      } else if (!y.length) return this;
      if (y[0] === '') return this.root.lookup(y.slice(1), z);
      var B = this.get(y[0]);
      if (B) {
        if (y.length === 1) {
          if (!z || z.indexOf(B.constructor) > -1) return B;
        } else if (B instanceof w && (B = B.lookup(y.slice(1), z, true))) return B;
      } else
        for (var C = 0; C < this.nestedArray.length; ++C)
          if (this._nestedArray[C] instanceof w && (B = this._nestedArray[C].lookup(y, z, true))) return B;
      return this.parent === null || A ? null : this.parent.lookup(y, z);
    };

    w.prototype.lookupType = function (y) {
      var z = this.lookup(y, [j]);
      if (!z) throw Error('no such type: ' + y);
      return z;
    };

    w.prototype.lookupEnum = function (y) {
      var z = this.lookup(y, [m]);
      if (!z) throw Error('no such Enum \'' + y + '\' in ' + this);
      return z;
    };

    w.prototype.lookupTypeOrEnum = function (y) {
      var z = this.lookup(y, [j, m]);
      if (!z) throw Error('no such Type or Enum \'' + y + '\' in ' + this);
      return z;
    };

    w.prototype.lookupService = function (y) {
      var z = this.lookup(y, [k]);
      if (!z) throw Error('no such Service \'' + y + '\' in ' + this);
      return z;
    };

    w._configure = function (y, z, A) {
      j = y;
      k = z;
      m = A;
    };
  }, {
    './field': 16,
    './object': 24,
    './util': 37
  }],
  24: [function (a, b, c) {
    'use strict';
    b.exports = g;
    g.className = 'ReflectionObject';
    var d, f = a('./util');

    function g(h, j) {
      if (!f.isString(h)) throw TypeError('name must be a string');
      if (j && !f.isObject(j)) throw TypeError('options must be an object');
      this.options = j;
      this.name = h;
      this.parent = null;
      this.resolved = false;
      this.comment = null;
      this.filename = null;
    }

    Object.defineProperties(g.prototype, {
      root: {
        get: function () {
          for (var h = this; h.parent !== null;) h = h.parent;
          return h;
        }
      },
      fullName: {
        get: function () {
          for (var h = [this.name], j = this.parent; j;) {
            h.unshift(j.name);
            j = j.parent;
          }
          return h.join('.');
        }
      }
    });

    g.prototype.toJSON = function () {
      throw Error();
    };

    g.prototype.onAdd = function (h) {
      if (this.parent && this.parent !== h)
        this.parent.remove(this);

      this.parent = h;
      this.resolved = false;
      var j = h.root;

      if (j instanceof d)
        j._handleAdd(this);
    };

    g.prototype.onRemove = function (h) {
      var j = h.root;

      if (j instanceof d)
        j._handleRemove(this);

      this.parent = null;
      this.resolved = false;
    };

    g.prototype.resolve = function () {
      return this.resolved ? this : (this.root instanceof d && (this.resolved = true), this);
    };

    g.prototype.getOption = function (h) {
      if (this.options) return this.options[h];
    };

    g.prototype.setOption = function (h, j, k) {
      k && this.options && undefined !== this.options[h] || ((this.options || (this.options = {}))[h] = j);
      return this;
    };

    g.prototype.setOptions = function (h, j) {
      if (h)
        for (var k = Object.keys(h), l = 0; l < k.length; ++l) this.setOption(k[l], h[k[l]], j);
      return this;
    };

    g.prototype.toString = function () {
      var h = this.constructor.className,
        j = this.fullName;
      return j.length ? h + ' ' + j : h;
    };

    g._configure = function (h) {
      d = h;
    };
  }, {
    './util': 37
  }],
  25: [function (b, c, d) {
    'use strict';
    c.exports = j;
    var f = b('./object');
    ((j.prototype = Object.create(f.prototype)).constructor = j).className = 'OneOf';
    var g = b('./field'),
      h = b('./util');

    function j(l, m, p, q) {
      if (Array.isArray(m) || (p = m, m = undefined), f.call(this, l, p), undefined !== m && !Array.isArray(m)) throw TypeError('fieldNames must be an Array');
      this.oneof = m || [];
      this.fieldsArray = [];
      this.comment = q;
    }

    function k(l) {
      if (l.parent)
        for (var m = 0; m < l.fieldsArray.length; ++m) l.fieldsArray[m].parent || l.parent.add(l.fieldsArray[m]);
    }

    j.fromJSON = function (l, m) {
      return new j(l, m.oneof, m.options, m.comment);
    };

    j.prototype.toJSON = function (l) {
      var m = !!l && Boolean(l.keepComments);
      return h.toObject(['options', this.options, 'oneof', this.oneof, 'comment', m ? this.comment : undefined]);
    };

    j.prototype.add = function (l) {
      if (!(l instanceof g)) throw TypeError('field must be a Field');

      if (l.parent && l.parent !== this.parent)
        l.parent.remove(l);

      this.oneof.push(l.name);
      this.fieldsArray.push(l);
      l.partOf = this;
      k(this);
      return this;
    };

    j.prototype.remove = function (l) {
      if (!(l instanceof g)) throw TypeError('field must be a Field');
      var m = this.fieldsArray.indexOf(l);
      if (m < 0) throw Error(l + ' is not a member of ' + this);
      this.fieldsArray.splice(m, 1);

      if ((m = this.oneof.indexOf(l.name)) > -1)
        this.oneof.splice(m, 1);

      l.partOf = null;
      return this;
    };

    j.prototype.onAdd = function (l) {
      f.prototype.onAdd.call(this, l);
      for (var m = 0; m < this.oneof.length; ++m) {
        var p = l.get(this.oneof[m]);

        if (p && !p.partOf) {
          p.partOf = this;
          this.fieldsArray.push(p);
        }
      }
      k(this);
    };

    j.prototype.onRemove = function (l) {
      for (var m, p = 0; p < this.fieldsArray.length; ++p)
        if ((m = this.fieldsArray[p]).parent)
          m.parent.remove(m);
      f.prototype.onRemove.call(this, l);
    };

    j.d = function () {
      for (var l = new Array(arguments.length), m = 0; m < arguments.length;) l[m] = arguments[m++];
      return function (p, q) {
        h.decorateType(p.constructor).add(new j(q, l));

        Object.defineProperty(p, q, {
          get: h.oneOfGetter(l),
          set: h.oneOfSetter(l)
        });
      };
    };
  }, {
    './field': 16,
    './object': 24,
    './util': 37
  }],
  26: [function (q, x, z) {
    'use strict';
    x.exports = X;
    X.filename = null;

    X.defaults = {
      keepCase: false
    };

    var B = q('./tokenize'),
      C = q('./root'),
      D = q('./type'),
      E = q('./field'),
      F = q('./mapfield'),
      G = q('./oneof'),
      H = q('./enum'),
      I = q('./service'),
      J = q('./method'),
      K = q('./types'),
      L = q('./util'),
      M = /^[1-9][0-9]*$/,
      N = /^-?[1-9][0-9]*$/,
      P = /^0[x][0-9a-fA-F]+$/,
      Q = /^-?0[x][0-9a-fA-F]+$/,
      R = /^0[0-7]+$/,
      S = /^-?0[0-7]+$/,
      T = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,
      U = /^[a-zA-Z_][a-zA-Z_0-9]*$/,
      V = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/,
      W = /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/;

    function X(a0, a1, a2) {
      a1 instanceof C || (a2 = a1, a1 = new C());
      a2 || (a2 = X.defaults);
      var a3, a4, a5, a6, a7, a8 = B(a0, a2.alternateCommentMode || false),
        a9 = a8.next,
        aa = a8.push,
        ab = a8.peek,
        ac = a8.skip,
        ad = a8.cmnt,
        ae = true,
        af = false,
        ag = a1,
        ah = a2.keepCase ? function (ax) {
          return ax;
        } : L.camelCase;

      function ai(ax, ay, az) {
        var aA = X.filename;
        az || (X.filename = null);
        return Error('illegal ' + (ay || 'token') + ' \'' + ax + '\' (' + (aA ? aA + ', ' : '') + 'line ' + a8.line + ')');
      }

      function aj() {
        var ax, ay = [];
        do {
          if ((ax = a9()) !== ('\"') && ax !== '\'') throw ai(ax);
          ay.push(a9());
          ac(ax);
          ax = ab();
        } while (ax === '\"' || ax === '\'');
        return ay.join('');
      }

      function ak(ax) {
        var ay = a9();
        switch (ay) {
        case '\'':
        case '\"':
          aa(ay);
          return aj();
        case 'true':
        case 'TRUE':
          return true;
        case 'false':
        case 'FALSE':
          return false;
        }
        try {
          return function (az, aA) {
            var aB = 1;

            if (az.charAt(0) === '-') {
              aB = -1;
              az = az.substring(1);
            }

            switch (az) {
            case 'inf':
            case 'INF':
            case 'Inf':
              return aB * (1 / 0);
            case 'nan':
            case 'NAN':
            case 'Nan':
            case 'NaN':
              return NaN;
            case '0':
              return 0;
            }
            if (M.test(az)) return aB * parseInt(az, 10);
            if (P.test(az)) return aB * parseInt(az, 16);
            if (R.test(az)) return aB * parseInt(az, 8);
            if (T.test(az)) return aB * parseFloat(az);
            throw ai(az, 'number', aA);
          }(ay, true);
        } catch (az) {
          if (ax && V.test(ay)) return ay;
          throw ai(ay, 'value');
        }
      }

      function al(ax, ay) {
        var az, aA;
        do {
          !ay || (az = ab()) !== ('\"') && az !== '\'' ? ax.push([aA = am(a9()), ac('to', true) ? am(a9()) : aA]) : ax.push(aj());
        } while (ac(',', true));
        ac(';');
      }

      function am(ax, ay) {
        switch (ax) {
        case 'max':
        case 'MAX':
        case 'Max':
          return 536870911;
        case '0':
          return 0;
        }
        if (!ay && ax.charAt(0) === '-') throw ai(ax, 'id');
        if (N.test(ax)) return parseInt(ax, 10);
        if (Q.test(ax)) return parseInt(ax, 16);
        if (S.test(ax)) return parseInt(ax, 8);
        throw ai(ax, 'id');
      }

      function an() {
        if (undefined !== a3) throw ai('package');
        if (a3 = a9(), !V.test(a3)) throw ai(a3, 'name');
        ag = ag.define(a3);
        ac(';');
      }

      function ao() {
        var ax, ay = ab();
        switch (ay) {
        case 'weak':
          ax = a5 || (a5 = []);
          a9();
          break;
        case 'public':
          a9();
        default:
          ax = a4 || (a4 = []);
        }
        ay = aj();
        ac(';');
        ax.push(ay);
      }

      function ap() {
        if (ac('='), a6 = aj(), !(af = a6 === 'proto3') && a6 !== 'proto2') throw ai(a6, 'syntax');
        ac(';');
      }

      function aq(ax, ay) {
        switch (ay) {
        case 'option':
          at(ax, ay);
          ac(';');
          return true;
        case 'message':
          (function (az, aA) {
            if (!U.test(aA = a9())) throw ai(aA, 'type name');
            var aB = new D(aA);

            ar(aB, function (aC) {
              if (!aq(aB, aC)) switch (aC) {
              case 'map':
                ! function (aD) {
                  ac('<');
                  var aE = a9();
                  if (undefined === K.mapKey[aE]) throw ai(aE, 'type');
                  ac(',');
                  var aF = a9();
                  if (!V.test(aF)) throw ai(aF, 'type');
                  ac('>');
                  var aG = a9();
                  if (!U.test(aG)) throw ai(aG, 'name');
                  ac('=');
                  var aH = new F(ah(aG), am(a9()), aE, aF);

                  ar(aH, function (aI) {
                    if (aI !== 'option') throw ai(aI);
                    at(aH, aI);
                    ac(';');
                  }, function () {
                    aw(aH);
                  });

                  aD.add(aH);
                }(aB);
                break;
              case 'required':
              case 'optional':
              case 'repeated':
                as(aB, aC);
                break;
              case 'oneof':
                ! function (aD, aE) {
                  if (!U.test(aE = a9())) throw ai(aE, 'name');
                  var aF = new G(ah(aE));

                  ar(aF, function (aG) {
                    aG === 'option' ? (at(aF, aG), ac(';')) : (aa(aG), as(aF, 'optional'));
                  });

                  aD.add(aF);
                }(aB, aC);
                break;
              case 'extensions':
                al(aB.extensions || (aB.extensions = []));
                break;
              case 'reserved':
                al(aB.reserved || (aB.reserved = []), true);
                break;
              default:
                if (!af || !V.test(aC)) throw ai(aC);
                aa(aC);
                as(aB, 'optional');
              }
            });

            az.add(aB);
          })(ax, ay);

          return true;
        case 'enum':
          (function (az, aA) {
            if (!U.test(aA = a9())) throw ai(aA, 'name');
            var aB = new H(aA);

            ar(aB, function (aC) {
              switch (aC) {
              case 'option':
                at(aB, aC);
                ac(';');
                break;
              case 'reserved':
                al(aB.reserved || (aB.reserved = []), true);
                break;
              default:
                ! function (aD, aE) {
                  if (!U.test(aE)) throw ai(aE, 'name');
                  ac('=');
                  var aF = am(a9(), true),
                    aG = {};

                  ar(aG, function (aH) {
                    if (aH !== 'option') throw ai(aH);
                    at(aG, aH);
                    ac(';');
                  }, function () {
                    aw(aG);
                  });

                  aD.add(aE, aF, aG.comment);
                }(aB, aC);
              }
            });

            az.add(aB);
          })(ax, ay);

          return true;
        case 'service':
          (function (az, aA) {
            if (!U.test(aA = a9())) throw ai(aA, 'service name');
            var aB = new I(aA);

            ar(aB, function (aC) {
              if (!aq(aB, aC)) {
                if (aC !== 'rpc') throw ai(aC);
                ! function (aD, aE) {
                  var aF = aE;
                  if (!U.test(aE = a9())) throw ai(aE, 'name');
                  var aG, aH, aI, aJ, aK = aE;
                  ac('(');

                  if (ac('stream', true))
                    aH = true;

                  if (!V.test(aE = a9())) throw ai(aE);
                  aG = aE;
                  ac(')');
                  ac('returns');
                  ac('(');

                  if (ac('stream', true))
                    aJ = true;

                  if (!V.test(aE = a9())) throw ai(aE);
                  aI = aE;
                  ac(')');
                  var aL = new J(aK, aF, aG, aI, aH, aJ);

                  ar(aL, function (aM) {
                    if (aM !== 'option') throw ai(aM);
                    at(aL, aM);
                    ac(';');
                  });

                  aD.add(aL);
                }(aB, aC);
              }
            });

            az.add(aB);
          })(ax, ay);

          return true;
        case 'extend':
          (function (az, aA) {
            if (!V.test(aA = a9())) throw ai(aA, 'reference');
            var aB = aA;
            ar(null, function (aC) {
              switch (aC) {
              case 'required':
              case 'repeated':
              case 'optional':
                as(az, aC, aB);
                break;
              default:
                if (!af || !V.test(aC)) throw ai(aC);
                aa(aC);
                as(az, 'optional', aB);
              }
            });
          })(ax, ay);

          return true;
        }
        return false;
      }

      function ar(ax, ay, az) {
        var aA = a8.line;
        if ((ax && (ax.comment = ad(), ax.filename = X.filename), ac('{', true))) {
          for (var aB;
            (aB = a9()) !== ('}');) ay(aB);
          ac(';', true);
        } else {
          if (az)
            az();

          ac(';');

          if (ax && 'string' != typeof ax.comment)
            ax.comment = ad(aA);
        }
      }

      function as(ax, ay, az) {
        var aA = a9();
        if (aA !== 'group') {
          if (!V.test(aA)) throw ai(aA, 'type');
          var aB = a9();
          if (!U.test(aB)) throw ai(aB, 'name');
          aB = ah(aB);
          ac('=');
          var aC = new E(aB, am(a9()), aA, ay, az);

          ar(aC, function (aD) {
            if (aD !== 'option') throw ai(aD);
            at(aC, aD);
            ac(';');
          }, function () {
            aw(aC);
          });

          ax.add(aC);
          af || !aC.repeated || undefined === K.packed[aA] && undefined !== K.basic[aA] || aC.setOption('packed', false, true);
        } else ! function (aD, aE) {
          var aF = a9();
          if (!U.test(aF)) throw ai(aF, 'name');
          var aG = L.lcFirst(aF);

          if (aF === aG)
            aF = L.ucFirst(aF);

          ac('=');
          var aH = am(a9()),
            aI = new D(aF);
          aI.group = true;
          var aJ = new E(aG, aH, aF, aE);
          aJ.filename = X.filename;

          ar(aI, function (aK) {
            switch (aK) {
            case 'option':
              at(aI, aK);
              ac(';');
              break;
            case 'required':
            case 'optional':
            case 'repeated':
              as(aI, aK);
              break;
            default:
              throw ai(aK);
            }
          });

          aD.add(aI).add(aJ);
        }(ax, ay);
      }

      function at(ax, ay) {
        var az = ac('(', true);
        if (!V.test(ay = a9())) throw ai(ay, 'name');
        var aA = ay;

        if (az) {
          ac(')');
          aA = '(' + aA + ')';
          ay = ab();

          if (W.test(ay)) {
            aA += ay;
            a9();
          }
        }

        ac('=');
        au(ax, aA);
      }

      function au(ax, ay) {
        if (ac('{', true))
          do {
            if (!U.test(a7 = a9())) throw ai(a7, 'name');
            ab() === '{' ? au(ax, ay + '.' + a7) : (ac(':'), ab() === '{' ? au(ax, ay + '.' + a7) : av(ax, ay + '.' + a7, ak(true)));
            ac(',', true);
          } while (!ac('}', true));
        else av(ax, ay, ak(true));
      }

      function av(ax, ay, az) {
        if (ax.setOption)
          ax.setOption(ay, az);
      }

      function aw(ax) {
        if (ac('[', true)) {
          do {
            at(ax, 'option');
          } while (ac(',', true));
          ac(']');
        }
        return ax;
      }
      for (;
        (a7 = a9()) !== (null);) switch (a7) {
      case 'package':
        if (!ae) throw ai(a7);
        an();
        break;
      case 'import':
        if (!ae) throw ai(a7);
        ao();
        break;
      case 'syntax':
        if (!ae) throw ai(a7);
        ap();
        break;
      case 'option':
        if (!ae) throw ai(a7);
        at(ag, a7);
        ac(';');
        break;
      default:
        if (aq(ag, a7)) {
          ae = false;
          continue;
        }
        throw ai(a7);
      }
      X.filename = null;

      return {
        package: a3,
        imports: a4,
        weakImports: a5,
        syntax: a6,
        root: a1
      };
    }
  }, {
    './enum': 15,
    './field': 16,
    './mapfield': 20,
    './method': 22,
    './oneof': 25,
    './root': 29,
    './service': 33,
    './tokenize': 34,
    './type': 35,
    './types': 36,
    './util': 37
  }],
  27: [function (b, d, g) {
    'use strict';
    d.exports = w;
    var j, k = b('./util/minimal'),
      m = k.LongBits,
      q = k.utf8;

    function v(C, D) {
      return RangeError('index out of range: ' + C.pos + ' + ' + (D || 1) + ' > ' + C.len);
    }

    function w(C) {
      this.buf = C;
      this.pos = 0;
      this.len = C.length;
    }
    var x, y = 'undefined' != typeof Uint8Array ? function (C) {
      if (C instanceof Uint8Array || Array.isArray(C)) return new w(C);
      throw Error('illegal buffer');
    } : function (C) {
      if (Array.isArray(C)) return new w(C);
      throw Error('illegal buffer');
    };

    function z() {
      var C = new m(0, 0),
        D = 0;
      if (!(this.len - this.pos > 4)) {
        for (; D < 3; ++D) {
          if (this.pos >= this.len) throw v(this);
          if (C.lo = (C.lo | (127 & this.buf[this.pos]) << 7 * D) >>> 0, this.buf[this.pos++] < 128) return C;
        }
        C.lo = (C.lo | (127 & this.buf[this.pos++]) << 7 * D) >>> 0;
        return C;
      }
      for (; D < 4; ++D)
        if (C.lo = (C.lo | (127 & this.buf[this.pos]) << 7 * D) >>> 0, this.buf[this.pos++] < 128) return C;
      if (C.lo = (C.lo | (127 & this.buf[this.pos]) << 28) >>> 0, C.hi = (C.hi | (127 & this.buf[this.pos]) >> 4) >>> 0, this.buf[this.pos++] < 128) return C;
      if (D = 0, this.len - this.pos > 4) {
        for (; D < 5; ++D)
          if (C.hi = (C.hi | (127 & this.buf[this.pos]) << 7 * D + 3) >>> 0, this.buf[this.pos++] < 128) return C;
      } else
        for (; D < 5; ++D) {
          if (this.pos >= this.len) throw v(this);
          if (C.hi = (C.hi | (127 & this.buf[this.pos]) << 7 * D + 3) >>> 0, this.buf[this.pos++] < 128) return C;
        }
      throw Error('invalid varint encoding');
    }

    function A(C, D) {
      return (C[D - 4] | C[D - 3] << 8 | C[D - 2] << 16 | C[D - 1] << 24) >>> 0;
    }

    function B() {
      if (this.pos + 8 > this.len) throw v(this, 8);
      return new m(A(this.buf, this.pos += 4), A(this.buf, this.pos += 4));
    }

    w.create = k.Buffer ? function (C) {
      return (w.create = function (D) {
        return k.Buffer.isBuffer(D) ? new j(D) : y(D);
      })(C);
    } : y;

    w.prototype._slice = k.Array.prototype.subarray || k.Array.prototype.slice;

    w.prototype.uint32 = (x = 4294967295, function () {
      if (x = (127 & this.buf[this.pos]) >>> 0, this.buf[this.pos++] < 128) return x;
      if (x = (x | (127 & this.buf[this.pos]) << 7) >>> 0, this.buf[this.pos++] < 128) return x;
      if (x = (x | (127 & this.buf[this.pos]) << 14) >>> 0, this.buf[this.pos++] < 128) return x;
      if (x = (x | (127 & this.buf[this.pos]) << 21) >>> 0, this.buf[this.pos++] < 128) return x;
      if (x = (x | (15 & this.buf[this.pos]) << 28) >>> 0, this.buf[this.pos++] < 128) return x;
      if ((this.pos += 5) > this.len) throw (this.pos = this.len, v(this, 10));
      return x;
    });

    w.prototype.int32 = function () {
      return 0 | this.uint32();
    };

    w.prototype.sint32 = function () {
      var C = this.uint32();
      return C >>> 1 ^ -(1 & C) | 0;
    };

    w.prototype.bool = function () {
      return this.uint32() !== 0;
    };

    w.prototype.fixed32 = function () {
      if (this.pos + 4 > this.len) throw v(this, 4);
      return A(this.buf, this.pos += 4);
    };

    w.prototype.sfixed32 = function () {
      if (this.pos + 4 > this.len) throw v(this, 4);
      return 0 | A(this.buf, this.pos += 4);
    };

    w.prototype.float = function () {
      if (this.pos + 4 > this.len) throw v(this, 4);
      var C = k.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return C;
    };

    w.prototype.double = function () {
      if (this.pos + 8 > this.len) throw v(this, 4);
      var C = k.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return C;
    };

    w.prototype.bytes = function () {
      var C = this.uint32(),
        D = this.pos,
        E = this.pos + C;
      if (E > this.len) throw v(this, C);
      this.pos += C;
      return Array.isArray(this.buf) ? this.buf.slice(D, E) : D === E ? new this.buf.constructor(0) : this._slice.call(this.buf, D, E);
    };

    w.prototype.string = function () {
      var C = this.bytes();
      return q.read(C, 0, C.length);
    };

    w.prototype.skip = function (C) {
      if ('number' == typeof C) {
        if (this.pos + C > this.len) throw v(this, C);
        this.pos += C;
      } else
        do {
          if (this.pos >= this.len) throw v(this);
        } while (128 & this.buf[this.pos++]);
      return this;
    };

    w.prototype.skipType = function (C) {
      switch (C) {
      case 0:
        this.skip();
        break;
      case 1:
        this.skip(8);
        break;
      case 2:
        this.skip(this.uint32());
        break;
      case 3:
        for (; 4 != (C = 7 & this.uint32());) this.skipType(C);
        break;
      case 5:
        this.skip(4);
        break;
      default:
        throw Error('invalid wire type ' + C + ' at offset ' + this.pos);
      }
      return this;
    };

    w._configure = function (C) {
      j = C;
      var D = k.Long ? 'toLong' : 'toNumber';
      k.merge(w.prototype, {
        int64: function () {
          return z.call(this)[D](false);
        },
        uint64: function () {
          return z.call(this)[D](true);
        },
        sint64: function () {
          return z.call(this).zzDecode()[D](false);
        },
        fixed64: function () {
          return B.call(this)[D](true);
        },
        sfixed64: function () {
          return B.call(this)[D](false);
        }
      });
    };
  }, {
    './util/minimal': 39
  }],
  28: [function (a, b, c) {
    'use strict';
    b.exports = g;
    var d = a('./reader');
    (g.prototype = Object.create(d.prototype)).constructor = g;
    var f = a('./util/minimal');

    function g(h) {
      d.call(this, h);
    }

    if (f.Buffer)
      g.prototype._slice = f.Buffer.prototype.slice;

    g.prototype.string = function () {
      var h = this.uint32();
      return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + h, this.len));
    };
  }, {
    './reader': 27,
    './util/minimal': 39
  }],
  29: [function (b, g, j) {
    'use strict';
    g.exports = A;
    var k = b('./namespace');
    ((A.prototype = Object.create(k.prototype)).constructor = A).className = 'Root';
    var m, q, v, w = b('./field'),
      x = b('./enum'),
      y = b('./oneof'),
      z = b('./util');

    function A(E) {
      k.call(this, '', E);
      this.deferred = [];
      this.files = [];
    }

    function B() {}

    A.fromJSON = function (E, F) {
      F || (F = new A());

      if (E.options)
        F.setOptions(E.options);

      return F.addJSON(E.nested);
    };

    A.prototype.resolvePath = z.path.resolve;

    A.prototype.load = function E(F, G, H) {
      if ('function' == typeof G) {
        H = G;
        G = undefined;
      }

      var I = this;
      if (!H) return z.asPromise(E, I, F, G);
      var J = H === B;

      function K(Q, R) {
        if (H) {
          var S = H;
          if (H = null, J) throw Q;
          S(Q, R);
        }
      }

      function L(Q, R) {
        try {
          if (z.isString(R) && R.charAt(0) === '{' && (R = JSON.parse(R)), z.isString(R)) {
            q.filename = Q;
            var S, T = q(R, I, G),
              U = 0;
            if (T.imports)
              for (; U < T.imports.length; ++U)
                if (S = I.resolvePath(Q, T.imports[U]))
                  M(S);
            if (T.weakImports)
              for (U = 0; U < T.weakImports.length; ++U)
                if (S = I.resolvePath(Q, T.weakImports[U]))
                  M(S, true);
          } else I.setOptions(R.options).addJSON(R.nested);
        } catch (V) {
          K(V);
        }
        J || N || K(null, I);
      }

      function M(Q, R) {
        var S = Q.lastIndexOf('google/protobuf/');
        if (S > -1) {
          var T = Q.substring(S);

          if (T in v)
            Q = T;
        }
        if (!(I.files.indexOf(Q) > -1))
          if (I.files.push(Q), Q in v) J ? L(Q, v[Q]) : (++N, setTimeout(function () {
            --N;
            L(Q, v[Q]);
          }));
          else if (J) {
          var U;
          try {
            U = z.fs.readFileSync(Q).toString('utf8');
          } catch (V) {
            return void(R || K(V));
          }
          L(Q, U);
        } else {
          ++N;

          z.fetch(Q, function (W, X) {
            --N;

            if (H)
              W ? R ? N || K(null, I) : K(W) : L(Q, X);
          });
        }
      }
      var N = 0;

      if (z.isString(F))
        F = [F];

      for (var O, P = 0; P < F.length; ++P)
        if (O = I.resolvePath('', F[P]))
          M(O);
      if (J) return I;
      N || K(null, I);
    };

    A.prototype.loadSync = function (F, G) {
      if (!z.isNode) throw Error('not supported');
      return this.load(F, G, B);
    };

    A.prototype.resolveAll = function () {
      if (this.deferred.length) throw Error('unresolvable extensions: ' + this.deferred.map(function (F) {
        return '\'extend ' + F.extend + '\' in ' + F.parent.fullName;
      }).join(', '));
      return k.prototype.resolveAll.call(this);
    };

    var C = /^[A-Z]/;

    function D(F, G) {
      var H = G.parent.lookup(G.extend);
      if (H) {
        var I = new w(G.fullName, G.id, G.type, G.rule, undefined, G.options);
        I.declaringField = G;
        G.extensionField = I;
        H.add(I);
        return true;
      }
      return false;
    }

    A.prototype._handleAdd = function (F) {
      if (F instanceof w) undefined === F.extend || F.extensionField || D(0, F) || this.deferred.push(F);
      else if (F instanceof x)
        if (C.test(F.name))
          F.parent[F.name] = F.values;
        else if (!(F instanceof y)) {
        if (F instanceof m)
          for (var G = 0; G < this.deferred.length;) D(0, this.deferred[G]) ? this.deferred.splice(G, 1) : ++G;
        for (var H = 0; H < F.nestedArray.length; ++H) this._handleAdd(F._nestedArray[H]);

        if (C.test(F.name))
          F.parent[F.name] = F;
      }
    };

    A.prototype._handleRemove = function (F) {
      if (F instanceof w) {
        if (undefined !== F.extend)
          if (F.extensionField) {
            F.extensionField.parent.remove(F.extensionField);
            F.extensionField = null;
          } else {
            var G = this.deferred.indexOf(F);

            if (G > -1)
              this.deferred.splice(G, 1);
          }
      } else if (F instanceof x)
        if (C.test(F.name))
          delete F.parent[F.name];
        else if (F instanceof k) {
        for (var H = 0; H < F.nestedArray.length; ++H) this._handleRemove(F._nestedArray[H]);

        if (C.test(F.name))
          delete F.parent[F.name];
      }
    };

    A._configure = function (F, G, H) {
      m = F;
      q = G;
      v = H;
    };
  }, {
    './enum': 15,
    './field': 16,
    './namespace': 23,
    './oneof': 25,
    './util': 37
  }],
  30: [function (a, b, c) {
    'use strict';
    b.exports = {};
  }, {}],
  31: [function (a, b, c) {
    'use strict';
    c.Service = a('./rpc/service');
  }, {
    './rpc/service': 32
  }],
  32: [function (a, b, c) {
    'use strict';
    b.exports = f;
    var d = a('../util/minimal');

    function f(g, h, j) {
      if ('function' != typeof g) throw TypeError('rpcImpl must be a function');
      d.EventEmitter.call(this);
      this.rpcImpl = g;
      this.requestDelimited = Boolean(h);
      this.responseDelimited = Boolean(j);
    }
    (f.prototype = Object.create(d.EventEmitter.prototype)).constructor = f;

    f.prototype.rpcCall = function g(h, j, k, l, m) {
      if (!l) throw TypeError('request must be specified');
      var p = this;
      if (!m) return d.asPromise(g, p, h, j, k, l);
      if (p.rpcImpl) try {
        return p.rpcImpl(h, j[p.requestDelimited ? 'encodeDelimited' : 'encode'](l).finish(), function (q, u) {
          if (q) {
            p.emit('error', q, h);
            return m(q);
          }
          if (u !== null) {
            if (!(u instanceof k)) try {
              u = k[p.responseDelimited ? 'decodeDelimited' : 'decode'](u);
            } catch (v) {
              p.emit('error', v, h);
              return m(v);
            }
            p.emit('data', u, h);
            return m(null, u);
          }
          p.end(true);
        });
      } catch (q) {
        p.emit('error', q, h);

        return void setTimeout(function () {
          m(q);
        }, 0);
      } else setTimeout(function () {
        m(Error('already ended'));
      }, 0);
    };

    f.prototype.end = function (h) {
      if (this.rpcImpl) {
        h || this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit('end').off();
      }

      return this;
    };
  }, {
    '../util/minimal': 39
  }],
  33: [function (b, c, d) {
    'use strict';
    c.exports = k;
    var f = b('./namespace');
    ((k.prototype = Object.create(f.prototype)).constructor = k).className = 'Service';
    var g = b('./method'),
      h = b('./util'),
      j = b('./rpc');

    function k(m, p) {
      f.call(this, m, p);
      this.methods = {};
      this._methodsArray = null;
    }

    function l(m) {
      m._methodsArray = null;
      return m;
    }

    k.fromJSON = function (m, p) {
      var q = new k(m, p.options);
      if (p.methods)
        for (var v = Object.keys(p.methods), w = 0; w < v.length; ++w) q.add(g.fromJSON(v[w], p.methods[v[w]]));

      if (p.nested)
        q.addJSON(p.nested);

      q.comment = p.comment;
      return q;
    };

    k.prototype.toJSON = function (m) {
      var p = f.prototype.toJSON.call(this, m),
        q = !!m && Boolean(m.keepComments);
      return h.toObject(['options', p && p.options || undefined, 'methods', f.arrayToJSON(this.methodsArray, m) || {}, 'nested', p && p.nested || undefined, 'comment', q ? this.comment : undefined]);
    };

    Object.defineProperty(k.prototype, 'methodsArray', {
      get: function () {
        return this._methodsArray || (this._methodsArray = h.toArray(this.methods));
      }
    });

    k.prototype.get = function (m) {
      return this.methods[m] || f.prototype.get.call(this, m);
    };

    k.prototype.resolveAll = function () {
      for (var m = this.methodsArray, p = 0; p < m.length; ++p) m[p].resolve();
      return f.prototype.resolve.call(this);
    };

    k.prototype.add = function (m) {
      if (this.get(m.name)) throw Error('duplicate name \'' + m.name + '\' in ' + this);
      return m instanceof g ? (this.methods[m.name] = m, m.parent = this, l(this)) : f.prototype.add.call(this, m);
    };

    k.prototype.remove = function (m) {
      if (m instanceof g) {
        if (this.methods[m.name] !== m) throw Error(m + ' is not a member of ' + this);
        delete this.methods[m.name];
        m.parent = null;
        return l(this);
      }
      return f.prototype.remove.call(this, m);
    };

    k.prototype.create = function (m, p, q) {
      for (var v, w = new j.Service(m, p, q), x = 0; x < this.methodsArray.length; ++x) {
        var y = h.lcFirst((v = this._methodsArray[x]).resolve().name).replace(/[^$\w_]/g, '');
        w[y] = h.codegen(['r', 'c'], h.isReserved(y) ? y + '_' : y)('return this.rpcCall(m,q,s,r,c)')({
          m: v,
          q: v.resolvedRequestType.ctor,
          s: v.resolvedResponseType.ctor
        });
      }
      return w;
    };
  }, {
    './method': 22,
    './namespace': 23,
    './rpc': 31,
    './util': 37
  }],
  34: [function (b, d, g) {
    'use strict';
    d.exports = B;
    var j = /[\s{}=;:[\],'"()<>]/g,
      k = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
      m = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
      q = /^ *[*/]+ */,
      v = /^\s*\*?\/*/,
      w = /\n/g,
      x = /\s/,
      y = /\\(.?)/g,
      z = {
        0: ' ',
        r: '\x0d',
        n: '\x0a',
        t: '\x09'
      };

    function A(C) {
      return C.replace(y, function (D, E) {
        switch (E) {
        case '\\':
        case '':
          return E;
        default:
          return z[E] || '';
        }
      });
    }

    function B(C, D) {
      C = C.toString();
      var E = 0,
        F = C.length,
        G = 1,
        H = null,
        I = null,
        J = 0,
        K = false,
        L = [],
        M = null;

      function N(X) {
        return Error('illegal ' + X + ' (line ' + G + ')');
      }

      function P(X) {
        return C.charAt(X);
      }

      function Q(X, Y) {
        H = C.charAt(X++);
        J = G;
        K = false;
        var Z, a0 = X - (D ? 2 : 3);
        do {
          if (--a0 < 0 || (Z = C.charAt(a0)) === ('\x0a')) {
            K = true;
            break;
          }
        } while (Z === ' ' || Z === '\x09');
        for (var a1 = C.substring(X, Y).split(w), a2 = 0; a2 < a1.length; ++a2) a1[a2] = a1[a2].replace(D ? v : q, '').trim();
        I = a1.join('\x0a').trim();
      }

      function R(X) {
        var Y = T(X),
          Z = C.substring(X, Y);
        return /^\s*\/{1,2}/.test(Z);
      }

      function T(X) {
        for (var Y = X; Y < F && P(Y) !== '\x0a';) Y++;
        return Y;
      }

      function U() {
        if (L.length > 0) return L.shift();
        if (M) return function () {
          var a4 = M === '\'' ? m : k;
          a4.lastIndex = E - 1;
          var a5 = a4.exec(C);
          if (!a5) throw N('string');
          E = a4.lastIndex;
          V(M);
          M = null;
          return A(a5[1]);
        }();
        var X, Y, Z, a0, a1;
        do {
          if (E === F) return null;
          for (X = false; x.test(Z = P(E));)
            if (Z === '\x0a' && ++G, ++E === F) return null;
          if (P(E) === '/') {
            if (++E === F) throw N('comment');
            if (P(E) === '/')
              if (D) {
                if (a0 = E, a1 = false, R(E)) {
                  a1 = true;
                  do {
                    if ((E = T(E)) === F) break;
                    E++;
                  } while (R(E));
                } else E = Math.min(F, T(E) + 1);

                if (a1)
                  Q(a0, E);

                G++;
                X = true;
              } else {
                for (a1 = P(a0 = E + 1) === '/'; P(++E) !== '\x0a';)
                  if (E === F) return null;
                ++E;

                if (a1)
                  Q(a0, E - 1);

                ++G;
                X = true;
              }
            else {
              if ((Z = P(E)) !== ('*')) return '/';
              a0 = E + 1;
              a1 = D || P(a0) === '*';
              do {
                if (Z === '\x0a' && ++G, ++E === F) throw N('comment');
                Y = Z;
                Z = P(E);
              } while (Y !== '*' || Z !== '/');
              ++E;

              if (a1)
                Q(a0, E - 2);

              X = true;
            }
          }
        } while (X);
        var a2 = E;
        if (j.lastIndex = 0, !j.test(P(a2++)))
          for (; a2 < F && !j.test(P(a2));) ++a2;
        var a3 = C.substring(E, E = a2);
        a3 !== '\"' && a3 !== '\'' || (M = a3);
        return a3;
      }

      function V(X) {
        L.push(X);
      }

      function W() {
        if (!L.length) {
          var X = U();
          if (X === null) return null;
          V(X);
        }
        return L[0];
      }
      return Object.defineProperty({
        next: U,
        peek: W,
        push: V,
        skip: function (X, Y) {
          var Z = W();
          if (Z === X) {
            U();
            return true;
          }
          if (!Y) throw N('token \'' + Z + '\', \'' + X + '\' expected');
          return false;
        },
        cmnt: function (X) {
          var Y = null;
          undefined === X ? J === G - 1 && (D || H === '*' || K) && (Y = I) : (J < X && W(), J !== X || K || !D && H !== '/' || (Y = I));
          return Y;
        }
      }, 'line', {
        get: function () {
          return G;
        }
      });
    }
    B.unescape = A;
  }, {}],
  35: [function (j, k, q) {
    'use strict';
    k.exports = M;
    var w = j('./namespace');
    ((M.prototype = Object.create(w.prototype)).constructor = M).className = 'Type';
    var x = j('./enum'),
      z = j('./oneof'),
      A = j('./field'),
      B = j('./mapfield'),
      C = j('./service'),
      D = j('./message'),
      E = j('./reader'),
      F = j('./writer'),
      G = j('./util'),
      H = j('./encoder'),
      I = j('./decoder'),
      J = j('./verifier'),
      K = j('./converter'),
      L = j('./wrappers');

    function M(O, P) {
      w.call(this, O, P);
      this.fields = {};
      this.oneofs = undefined;
      this.extensions = undefined;
      this.reserved = undefined;
      this.group = undefined;
      this._fieldsById = null;
      this._fieldsArray = null;
      this._oneofsArray = null;
      this._ctor = null;
    }

    function N(O) {
      O._fieldsById = O._fieldsArray = O._oneofsArray = null;
      delete O.encode;
      delete O.decode;
      delete O.verify;
      return O;
    }

    Object.defineProperties(M.prototype, {
      fieldsById: {
        get: function () {
          if (this._fieldsById) return this._fieldsById;
          this._fieldsById = {};
          for (var O = Object.keys(this.fields), P = 0; P < O.length; ++P) {
            var Q = this.fields[O[P]],
              R = Q.id;
            if (this._fieldsById[R]) throw Error('duplicate id ' + R + ' in ' + this);
            this._fieldsById[R] = Q;
          }
          return this._fieldsById;
        }
      },
      fieldsArray: {
        get: function () {
          return this._fieldsArray || (this._fieldsArray = G.toArray(this.fields));
        }
      },
      oneofsArray: {
        get: function () {
          return this._oneofsArray || (this._oneofsArray = G.toArray(this.oneofs));
        }
      },
      ctor: {
        get: function () {
          return this._ctor || (this.ctor = M.generateConstructor(this)());
        },
        set: function (O) {
          var P = O.prototype;
          P instanceof D || ((O.prototype = new D()).constructor = O, G.merge(O.prototype, P));
          O.$type = O.prototype.$type = this;
          G.merge(O, D, true);
          this._ctor = O;
          for (var Q = 0; Q < this.fieldsArray.length; ++Q) this._fieldsArray[Q].resolve();
          var R = {};
          for (Q = 0; Q < this.oneofsArray.length; ++Q) R[this._oneofsArray[Q].resolve().name] = {
            get: G.oneOfGetter(this._oneofsArray[Q].oneof),
            set: G.oneOfSetter(this._oneofsArray[Q].oneof)
          };

          if (Q)
            Object.defineProperties(O.prototype, R);
        }
      }
    });

    M.generateConstructor = function (O) {
      for (var P, Q = G.codegen(['p'], O.name), R = 0; R < O.fieldsArray.length; ++R)(P = O._fieldsArray[R]).map ? Q('this%s={}', G.safeProp(P.name)) : P.repeated && Q('this%s=[]', G.safeProp(P.name));
      return Q('if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)')('this[ks[i]]=p[ks[i]]');
    };

    M.fromJSON = function (O, P) {
      var Q = new M(O, P.options);
      Q.extensions = P.extensions;
      Q.reserved = P.reserved;
      for (var R = Object.keys(P.fields), S = 0; S < R.length; ++S) Q.add((undefined !== P.fields[R[S]].keyType ? B.fromJSON : A.fromJSON)(R[S], P.fields[R[S]]));
      if (P.oneofs)
        for (R = Object.keys(P.oneofs), S = 0; S < R.length; ++S) Q.add(z.fromJSON(R[S], P.oneofs[R[S]]));
      if (P.nested)
        for (R = Object.keys(P.nested), S = 0; S < R.length; ++S) {
          var T = P.nested[R[S]];
          Q.add((undefined !== T.id ? A.fromJSON : undefined !== T.fields ? M.fromJSON : undefined !== T.values ? x.fromJSON : undefined !== T.methods ? C.fromJSON : w.fromJSON)(R[S], T));
        }

      if (P.extensions && P.extensions.length)
        Q.extensions = P.extensions;

      if (P.reserved && P.reserved.length)
        Q.reserved = P.reserved;

      if (P.group)
        Q.group = true;

      if (P.comment)
        Q.comment = P.comment;

      return Q;
    };

    M.prototype.toJSON = function (O) {
      var P = w.prototype.toJSON.call(this, O),
        Q = !!O && Boolean(O.keepComments);
      return G.toObject(['options', P && P.options || undefined, 'oneofs', w.arrayToJSON(this.oneofsArray, O), 'fields', w.arrayToJSON(this.fieldsArray.filter(function (R) {
        return !R.declaringField;
      }), O) || {}, 'extensions', this.extensions && this.extensions.length ? this.extensions : undefined, 'reserved', this.reserved && this.reserved.length ? this.reserved : undefined, 'group', this.group || undefined, 'nested', P && P.nested || undefined, 'comment', Q ? this.comment : undefined]);
    };

    M.prototype.resolveAll = function () {
      for (var O = this.fieldsArray, P = 0; P < O.length;) O[P++].resolve();
      var Q = this.oneofsArray;
      for (P = 0; P < Q.length;) Q[P++].resolve();
      return w.prototype.resolveAll.call(this);
    };

    M.prototype.get = function (O) {
      return this.fields[O] || this.oneofs && this.oneofs[O] || this.nested && this.nested[O] || null;
    };

    M.prototype.add = function (O) {
      if (this.get(O.name)) throw Error('duplicate name \'' + O.name + '\' in ' + this);
      if (O instanceof A && undefined === O.extend) {
        if (this._fieldsById ? this._fieldsById[O.id] : this.fieldsById[O.id]) throw Error('duplicate id ' + O.id + ' in ' + this);
        if (this.isReservedId(O.id)) throw Error('id ' + O.id + ' is reserved in ' + this);
        if (this.isReservedName(O.name)) throw Error('name \'' + O.name + '\' is reserved in ' + this);

        if (O.parent)
          O.parent.remove(O);

        this.fields[O.name] = O;
        O.message = this;
        O.onAdd(this);
        return N(this);
      }
      return O instanceof z ? (this.oneofs || (this.oneofs = {}), this.oneofs[O.name] = O, O.onAdd(this), N(this)) : w.prototype.add.call(this, O);
    };

    M.prototype.remove = function (O) {
      if (O instanceof A && undefined === O.extend) {
        if (!this.fields || this.fields[O.name] !== O) throw Error(O + ' is not a member of ' + this);
        delete this.fields[O.name];
        O.parent = null;
        O.onRemove(this);
        return N(this);
      }
      if (O instanceof z) {
        if (!this.oneofs || this.oneofs[O.name] !== O) throw Error(O + ' is not a member of ' + this);
        delete this.oneofs[O.name];
        O.parent = null;
        O.onRemove(this);
        return N(this);
      }
      return w.prototype.remove.call(this, O);
    };

    M.prototype.isReservedId = function (O) {
      return w.isReservedId(this.reserved, O);
    };

    M.prototype.isReservedName = function (O) {
      return w.isReservedName(this.reserved, O);
    };

    M.prototype.create = function (O) {
      return new this.ctor(O);
    };

    M.prototype.setup = function () {
      for (var O = this.fullName, P = [], Q = 0; Q < this.fieldsArray.length; ++Q) P.push(this._fieldsArray[Q].resolve().resolvedType);

      this.encode = H(this)({
        Writer: F,
        types: P,
        util: G
      });

      this.decode = I(this)({
        Reader: E,
        types: P,
        util: G
      });

      this.verify = J(this)({
        types: P,
        util: G
      });

      this.fromObject = K.fromObject(this)({
        types: P,
        util: G
      });

      this.toObject = K.toObject(this)({
        types: P,
        util: G
      });

      var R = L[O];
      if (R) {
        var S = Object.create(this);
        S.fromObject = this.fromObject;
        this.fromObject = R.fromObject.bind(S);
        S.toObject = this.toObject;
        this.toObject = R.toObject.bind(S);
      }
      return this;
    };

    M.prototype.encode = function (O, P) {
      return this.setup().encode(O, P);
    };

    M.prototype.encodeDelimited = function (O, P) {
      return this.encode(O, P && P.len ? P.fork() : P).ldelim();
    };

    M.prototype.decode = function (O, P) {
      return this.setup().decode(O, P);
    };

    M.prototype.decodeDelimited = function (O) {
      O instanceof E || (O = E.create(O));
      return this.decode(O, O.uint32());
    };

    M.prototype.verify = function (O) {
      return this.setup().verify(O);
    };

    M.prototype.fromObject = function (O) {
      return this.setup().fromObject(O);
    };

    M.prototype.toObject = function (O, P) {
      return this.setup().toObject(O, P);
    };

    M.d = function (O) {
      return function (P) {
        G.decorateType(P, O);
      };
    };
  }, {
    './converter': 12,
    './decoder': 13,
    './encoder': 14,
    './enum': 15,
    './field': 16,
    './mapfield': 20,
    './message': 21,
    './namespace': 23,
    './oneof': 25,
    './reader': 27,
    './service': 33,
    './util': 37,
    './verifier': 40,
    './wrappers': 41,
    './writer': 42
  }],
  36: [function (a, b, c) {
    'use strict';
    var d = c,
      f = a('./util'),
      g = ['double', 'float', 'int32', 'uint32', 'sint32', 'fixed32', 'sfixed32', 'int64', 'uint64', 'sint64', 'fixed64', 'sfixed64', 'bool', 'string', 'bytes'];

    function h(j, k) {
      var l = 0,
        m = {};
      for (k |= 0; l < j.length;) m[g[l + k]] = j[l++];
      return m;
    }
    d.basic = h([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2, 2]);
    d.defaults = h([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, '', f.emptyArray, null]);
    d.long = h([0, 0, 0, 1, 1], 7);
    d.mapKey = h([0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2], 2);
    d.packed = h([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0]);
  }, {
    './util': 37
  }],
  37: [function (b, c, d) {
    'use strict';
    var g, h, j = c.exports = b('./util/minimal'),
      k = b('./roots');
    j.codegen = b('@protobufjs/codegen');
    j.fetch = b('@protobufjs/fetch');
    j.path = b('@protobufjs/path');
    j.fs = j.inquire('fs');

    j.toArray = function (w) {
      if (w) {
        for (var x = Object.keys(w), y = new Array(x.length), z = 0; z < x.length;) y[z] = w[x[z++]];
        return y;
      }
      return [];
    };

    j.toObject = function (w) {
      for (var x = {}, y = 0; y < w.length;) {
        var z = w[y++],
          A = w[y++];

        if (undefined !== A)
          x[z] = A;
      }
      return x;
    };

    var m = /\\/g,
      p = /"/g;

    j.isReserved = function (w) {
      return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(w);
    };

    j.safeProp = function (w) {
      return !/^[$\w_]+$/.test(w) || j.isReserved(w) ? '[\"' + w.replace(m, '\\\\').replace(p, '\\\"') + '\"]' : '.' + w;
    };

    j.ucFirst = function (w) {
      return w.charAt(0).toUpperCase() + w.substring(1);
    };

    var q = /_([a-z])/g;

    j.camelCase = function (w) {
      return w.substring(0, 1) + w.substring(1).replace(q, function (x, y) {
        return y.toUpperCase();
      });
    };

    j.compareFieldsById = function (w, x) {
      return w.id - x.id;
    };

    j.decorateType = function (w, x) {
      if (w.$type) {
        if (x && w.$type.name !== x) {
          j.decorateRoot.remove(w.$type);
          w.$type.name = x;
          j.decorateRoot.add(w.$type);
        }

        return w.$type;
      }
      g || (g = b('./type'));
      var y = new g(x || w.name);
      j.decorateRoot.add(y);
      y.ctor = w;

      Object.defineProperty(w, '$type', {
        value: y,
        enumerable: false
      });

      Object.defineProperty(w.prototype, '$type', {
        value: y,
        enumerable: false
      });

      return y;
    };

    var v = 0;

    j.decorateEnum = function (w) {
      if (w.$type) return w.$type;
      h || (h = b('./enum'));
      var x = new h('Enum' + v++, w);
      j.decorateRoot.add(x);

      Object.defineProperty(w, '$type', {
        value: x,
        enumerable: false
      });

      return x;
    };

    Object.defineProperty(j, 'decorateRoot', {
      get: function () {
        return k.decorated || (k.decorated = new(b('./root'))());
      }
    });
  }, {
    './enum': 15,
    './root': 29,
    './roots': 30,
    './type': 35,
    './util/minimal': 39,
    '@protobufjs/codegen': 3,
    '@protobufjs/fetch': 5,
    '@protobufjs/path': 8
  }],
  38: [function (b, c, d) {
    'use strict';
    c.exports = g;
    var f = b('../util/minimal');

    function g(l, m) {
      this.lo = l >>> 0;
      this.hi = m >>> 0;
    }
    var h = g.zero = new g(0, 0);

    h.toNumber = function () {
      return 0;
    };

    h.zzEncode = h.zzDecode = function () {
      return this;
    };

    h.length = function () {
      return 1;
    };

    var j = g.zeroHash = '        ';

    g.fromNumber = function (l) {
      if (l === 0) return h;
      var m = l < 0;

      if (m)
        l = -l;

      var p = l >>> 0,
        q = (l - p) / 4294967296 >>> 0;

      if (m) {
        q = ~q >>> 0;
        p = ~p >>> 0;

        if (++p > 4294967295) {
          p = 0;

          if (++q > 4294967295)
            q = 0;
        }
      }

      return new g(p, q);
    };

    g.from = function (l) {
      if ('number' == typeof l) return g.fromNumber(l);
      if (f.isString(l)) {
        if (!f.Long) return g.fromNumber(parseInt(l, 10));
        l = f.Long.fromString(l);
      }
      return l.low || l.high ? new g(l.low >>> 0, l.high >>> 0) : h;
    };

    g.prototype.toNumber = function (l) {
      if (!l && this.hi >>> 31) {
        var m = 1 + ~this.lo >>> 0,
          p = ~this.hi >>> 0;
        m || (p = p + 1 >>> 0);
        return -(m + 4294967296 * p);
      }
      return this.lo + 4294967296 * this.hi;
    };

    g.prototype.toLong = function (l) {
      return f.Long ? new f.Long(0 | this.lo, 0 | this.hi, Boolean(l)) : {
        low: 0 | this.lo,
        high: 0 | this.hi,
        unsigned: Boolean(l)
      };
    };

    var k = String.prototype.charCodeAt;

    g.fromHash = function (l) {
      return l === j ? h : new g((k.call(l, 0) | k.call(l, 1) << 8 | k.call(l, 2) << 16 | k.call(l, 3) << 24) >>> 0, (k.call(l, 4) | k.call(l, 5) << 8 | k.call(l, 6) << 16 | k.call(l, 7) << 24) >>> 0);
    };

    g.prototype.toHash = function () {
      return String.fromCharCode(255 & this.lo, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, 255 & this.hi, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
    };

    g.prototype.zzEncode = function () {
      var l = this.hi >> 31;
      this.hi = ((this.hi << 1 | this.lo >>> 31) ^ l) >>> 0;
      this.lo = (this.lo << 1 ^ l) >>> 0;
      return this;
    };

    g.prototype.zzDecode = function () {
      var l = -(1 & this.lo);
      this.lo = ((this.lo >>> 1 | this.hi << 31) ^ l) >>> 0;
      this.hi = (this.hi >>> 1 ^ l) >>> 0;
      return this;
    };

    g.prototype.length = function () {
      var l = this.lo,
        m = (this.lo >>> 28 | this.hi << 4) >>> 0,
        p = this.hi >>> 24;
      return p === 0 ? m === 0 ? l < 16384 ? l < 128 ? 1 : 2 : l < 2097152 ? 3 : 4 : m < 16384 ? m < 128 ? 5 : 6 : m < 2097152 ? 7 : 8 : p < 128 ? 9 : 10;
    };
  }, {
    '../util/minimal': 39
  }],
  39: [function (a, b, c) {
    ((function (d) {
      'use strict';
      var f = c;

      function g(j, k, l) {
        for (var m = Object.keys(k), p = 0; p < m.length; ++p) undefined !== j[m[p]] && l || (j[m[p]] = k[m[p]]);
        return j;
      }

      function h(j) {
        function k(l, m) {
          if (!(this instanceof k)) return new k(l, m);

          Object.defineProperty(this, 'message', {
            get: function () {
              return l;
            }
          });

          Error.captureStackTrace ? Error.captureStackTrace(this, k) : Object.defineProperty(this, 'stack', {
            value: new Error().stack || ''
          });

          if (m)
            g(this, m);
        }
        (k.prototype = Object.create(Error.prototype)).constructor = k;

        Object.defineProperty(k.prototype, 'name', {
          get: function () {
            return j;
          }
        });

        k.prototype.toString = function () {
          return this.name + ': ' + this.message;
        };

        return k;
      }
      f.asPromise = a('@protobufjs/aspromise');
      f.base64 = a('@protobufjs/base64');
      f.EventEmitter = a('@protobufjs/eventemitter');
      f.float = a('@protobufjs/float');
      f.inquire = a('@protobufjs/inquire');
      f.utf8 = a('@protobufjs/utf8');
      f.pool = a('@protobufjs/pool');
      f.LongBits = a('./longbits');
      f.global = 'undefined' != typeof window && window || undefined !== d && d || 'undefined' != typeof self && self || this;
      f.emptyArray = Object.freeze ? Object.freeze([]) : [];
      f.emptyObject = Object.freeze ? Object.freeze({}) : {};
      f.isNode = Boolean(f.global.process && f.global.process.versions && f.global.process.versions.node);

      f.isInteger = Number.isInteger || function (j) {
        return 'number' == typeof j && isFinite(j) && Math.floor(j) === j;
      };

      f.isString = function (j) {
        return 'string' == typeof j || j instanceof String;
      };

      f.isObject = function (j) {
        return j && 'object' == typeof j;
      };

      f.isset = f.isSet = function (j, k) {
        var l = j[k];
        return !(null == l || !j.hasOwnProperty(k)) && ('object' != typeof l || (Array.isArray(l) ? l.length : Object.keys(l).length) > 0);
      };

      f.Buffer = function () {
        try {
          var j = f.inquire('buffer').Buffer;
          return j.prototype.utf8Write ? j : null;
        } catch (k) {
          return null;
        }
      }();

      f._Buffer_from = null;
      f._Buffer_allocUnsafe = null;

      f.newBuffer = function (j) {
        return 'number' == typeof j ? f.Buffer ? f._Buffer_allocUnsafe(j) : new f.Array(j) : f.Buffer ? f._Buffer_from(j) : 'undefined' == typeof Uint8Array ? j : new Uint8Array(j);
      };

      f.Array = 'undefined' != typeof Uint8Array ? Uint8Array : Array;
      f.Long = f.global.dcodeIO && f.global.dcodeIO.Long || f.global.Long || f.inquire('long');
      f.key2Re = /^true|false|0|1$/;
      f.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
      f.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

      f.longToHash = function (j) {
        return j ? f.LongBits.from(j).toHash() : f.LongBits.zeroHash;
      };

      f.longFromHash = function (j, k) {
        var l = f.LongBits.fromHash(j);
        return f.Long ? f.Long.fromBits(l.lo, l.hi, k) : l.toNumber(Boolean(k));
      };

      f.merge = g;

      f.lcFirst = function (j) {
        return j.charAt(0).toLowerCase() + j.substring(1);
      };

      f.newError = h;
      f.ProtocolError = h('ProtocolError');

      f.oneOfGetter = function (j) {
        for (var k = {}, l = 0; l < j.length; ++l) k[j[l]] = 1;
        return function () {
          for (var m = Object.keys(this), p = m.length - 1; p > -1; --p)
            if (k[m[p]] === 1 && undefined !== this[m[p]] && this[m[p]] !== null) return m[p];
        };
      };

      f.oneOfSetter = function (j) {
        return function (k) {
          for (var l = 0; l < j.length; ++l)
            if (j[l] !== k)
              delete this[j[l]];
        };
      };

      f.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: true
      };

      f._configure = function () {
        var j = f.Buffer;
        j ? (f._Buffer_from = j.from !== Uint8Array.from && j.from || function (k, l) {
          return new j(k, l);
        }, f._Buffer_allocUnsafe = j.allocUnsafe || function (k) {
          return new j(k);
        }) : f._Buffer_from = f._Buffer_allocUnsafe = null;
      };
    }).call(this, 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : 'undefined' != typeof window ? window : {}));
  }, {
    './longbits': 38,
    '@protobufjs/aspromise': 1,
    '@protobufjs/base64': 2,
    '@protobufjs/eventemitter': 4,
    '@protobufjs/float': 6,
    '@protobufjs/inquire': 7,
    '@protobufjs/pool': 9,
    '@protobufjs/utf8': 10
  }],
  40: [function (b, c, d) {
    'use strict';
    c.exports = function (m) {
      var p = g.codegen(['m'], m.name + '$verify')('if(typeof m!==\"object\"||m===null)')('return%j', 'object expected'),
        q = m.oneofsArray,
        v = {};

      if (q.length)
        p('var p={}');

      for (var w = 0; w < m.fieldsArray.length; ++w) {
        var x = m._fieldsArray[w].resolve(),
          y = 'm' + g.safeProp(x.name);
        if ((x.optional && p('if(%s!=null&&m.hasOwnProperty(%j)){', y, x.name), x.map)) {
          p('if(!util.isObject(%s))', y)('return%j', h(x, 'object'))('var k=Object.keys(%s)', y)('for(var i=0;i<k.length;++i){');
          k(p, x, 'k[i]');
          j(p, x, w, y + '[k[i]]')('}');
        } else if (x.repeated) {
          p('if(!Array.isArray(%s))', y)('return%j', h(x, 'array'))('for(var i=0;i<%s.length;++i){', y);
          j(p, x, w, y + '[i]')('}');
        } else {
          if (x.partOf) {
            var z = g.safeProp(x.partOf.name);

            if (v[x.partOf.name] === 1)
              p('if(p%s===1)', z)('return%j', x.partOf.name + ': multiple values');

            v[x.partOf.name] = 1;
            p('p%s=1', z);
          }
          j(p, x, w, y);
        }

        if (x.optional)
          p('}');
      }
      return p('return null');
    };
    var f = b('./enum'),
      g = b('./util');

    function h(l, m) {
      return l.name + ': ' + m + (l.repeated && m !== 'array' ? '[]' : l.map && m !== 'object' ? '{k:' + l.keyType + '}' : '') + ' expected';
    }

    function j(l, m, p, q) {
      if (m.resolvedType)
        if (m.resolvedType instanceof f) {
          l('switch(%s){', q)('default:')('return%j', h(m, 'enum value'));
          for (var u = Object.keys(m.resolvedType.values), v = 0; v < u.length; ++v) l('case %i:', m.resolvedType.values[u[v]]);
          l('break')('}');
        } else l('{')('var e=types[%i].verify(%s);', p, q)('if(e)')('return%j+e', m.name + '.')('}');
      else switch (m.type) {
      case 'int32':
      case 'uint32':
      case 'sint32':
      case 'fixed32':
      case 'sfixed32':
        l('if(!util.isInteger(%s))', q)('return%j', h(m, 'integer'));
        break;
      case 'int64':
      case 'uint64':
      case 'sint64':
      case 'fixed64':
      case 'sfixed64':
        l('if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))', q, q, q, q)('return%j', h(m, 'integer|Long'));
        break;
      case 'float':
      case 'double':
        l('if(typeof %s!==\"number\")', q)('return%j', h(m, 'number'));
        break;
      case 'bool':
        l('if(typeof %s!==\"boolean\")', q)('return%j', h(m, 'boolean'));
        break;
      case 'string':
        l('if(!util.isString(%s))', q)('return%j', h(m, 'string'));
        break;
      case 'bytes':
        l('if(!(%s&&typeof %s.length===\"number\"||util.isString(%s)))', q, q, q)('return%j', h(m, 'buffer'));
      }
      return l;
    }

    function k(l, m, p) {
      switch (m.keyType) {
      case 'int32':
      case 'uint32':
      case 'sint32':
      case 'fixed32':
      case 'sfixed32':
        l('if(!util.key32Re.test(%s))', p)('return%j', h(m, 'integer key'));
        break;
      case 'int64':
      case 'uint64':
      case 'sint64':
      case 'fixed64':
      case 'sfixed64':
        l('if(!util.key64Re.test(%s))', p)('return%j', h(m, 'integer|Long key'));
        break;
      case 'bool':
        l('if(!util.key2Re.test(%s))', p)('return%j', h(m, 'boolean key'));
      }
      return l;
    }
  }, {
    './enum': 15,
    './util': 37
  }],
  41: [function (a, b, c) {
    'use strict';
    var d = c,
      f = a('./message');
    d['.google.protobuf.Any'] = {
      fromObject: function (g) {
        if (g && g['@type']) {
          var h = this.lookup(g['@type']);
          if (h) {
            var j = g['@type'].charAt(0) === '.' ? g['@type'].substr(1) : g['@type'];
            return this.create({
              type_url: '/' + j,
              value: h.encode(h.fromObject(g)).finish()
            });
          }
        }
        return this.fromObject(g);
      },
      toObject: function (g, h) {
        if (h && h.json && g.type_url && g.value) {
          var j = g.type_url.substring(g.type_url.lastIndexOf('/') + 1),
            k = this.lookup(j);

          if (k)
            g = k.decode(g.value);
        }
        if (!(g instanceof this.ctor) && g instanceof f) {
          var l = g.$type.toObject(g, h);
          l['@type'] = g.$type.fullName;
          return l;
        }
        return this.toObject(g, h);
      }
    };
  }, {
    './message': 21
  }],
  42: [function (b, g, j) {
    'use strict';
    g.exports = C;
    var k, q = b('./util/minimal'),
      v = q.LongBits,
      w = q.base64,
      x = q.utf8;

    function z(I, J, K) {
      this.fn = I;
      this.len = J;
      this.next = undefined;
      this.val = K;
    }

    function A() {}

    function B(I) {
      this.head = I.head;
      this.tail = I.tail;
      this.len = I.len;
      this.next = I.states;
    }

    function C() {
      this.len = 0;
      this.head = new z(A, 0, 0);
      this.tail = this.head;
      this.states = null;
    }

    function D(I, J, K) {
      J[K] = 255 & I;
    }

    function E(I, J) {
      this.len = I;
      this.next = undefined;
      this.val = J;
    }

    function F(I, J, K) {
      for (; I.hi;) {
        J[K++] = 127 & I.lo | 128;
        I.lo = (I.lo >>> 7 | I.hi << 25) >>> 0;
        I.hi >>>= 7;
      }
      for (; I.lo > 127;) {
        J[K++] = 127 & I.lo | 128;
        I.lo = I.lo >>> 7;
      }
      J[K++] = I.lo;
    }

    function G(I, J, K) {
      J[K] = 255 & I;
      J[K + 1] = I >>> 8 & 255;
      J[K + 2] = I >>> 16 & 255;
      J[K + 3] = I >>> 24;
    }

    C.create = q.Buffer ? function () {
      return (C.create = function () {
        return new k();
      })();
    } : function () {
      return new C();
    };

    C.alloc = function (I) {
      return new q.Array(I);
    };

    if (q.Array !== Array)
      C.alloc = q.pool(C.alloc, q.Array.prototype.subarray);

    C.prototype._push = function (I, J, K) {
      this.tail = this.tail.next = new z(I, J, K);
      this.len += J;
      return this;
    };

    E.prototype = Object.create(z.prototype);

    E.prototype.fn = function (I, J, K) {
      for (; I > 127;) {
        J[K++] = 127 & I | 128;
        I >>>= 7;
      }
      J[K] = I;
    };

    C.prototype.uint32 = function (I) {
      this.len += (this.tail = this.tail.next = new E((I >>>= 0) < 128 ? 1 : I < 16384 ? 2 : I < 2097152 ? 3 : I < 268435456 ? 4 : 5, I)).len;
      return this;
    };

    C.prototype.int32 = function (I) {
      return I < 0 ? this._push(F, 10, v.fromNumber(I)) : this.uint32(I);
    };

    C.prototype.sint32 = function (I) {
      return this.uint32((I << 1 ^ I >> 31) >>> 0);
    };

    C.prototype.uint64 = function (I) {
      var J = v.from(I);
      return this._push(F, J.length(), J);
    };

    C.prototype.int64 = C.prototype.uint64;

    C.prototype.sint64 = function (I) {
      var J = v.from(I).zzEncode();
      return this._push(F, J.length(), J);
    };

    C.prototype.bool = function (I) {
      return this._push(D, 1, I ? 1 : 0);
    };

    C.prototype.fixed32 = function (I) {
      return this._push(G, 4, I >>> 0);
    };

    C.prototype.sfixed32 = C.prototype.fixed32;

    C.prototype.fixed64 = function (I) {
      var J = v.from(I);
      return this._push(G, 4, J.lo)._push(G, 4, J.hi);
    };

    C.prototype.sfixed64 = C.prototype.fixed64;

    C.prototype.float = function (I) {
      return this._push(q.float.writeFloatLE, 4, I);
    };

    C.prototype.double = function (I) {
      return this._push(q.float.writeDoubleLE, 8, I);
    };

    var H = q.Array.prototype.set ? function (I, J, K) {
      J.set(I, K);
    } : function (I, J, K) {
      for (var L = 0; L < I.length; ++L) J[K + L] = I[L];
    };

    C.prototype.bytes = function (I) {
      var J = I.length >>> 0;
      if (!J) return this._push(D, 1, 0);
      if (q.isString(I)) {
        var K = C.alloc(J = w.length(I));
        w.decode(I, K, 0);
        I = K;
      }
      return this.uint32(J)._push(H, J, I);
    };

    C.prototype.string = function (I) {
      var J = x.length(I);
      return J ? this.uint32(J)._push(x.write, J, I) : this._push(D, 1, 0);
    };

    C.prototype.fork = function () {
      this.states = new B(this);
      this.head = this.tail = new z(A, 0, 0);
      this.len = 0;
      return this;
    };

    C.prototype.reset = function () {
      this.states ? (this.head = this.states.head, this.tail = this.states.tail, this.len = this.states.len, this.states = this.states.next) : (this.head = this.tail = new z(A, 0, 0), this.len = 0);
      return this;
    };

    C.prototype.ldelim = function () {
      var I = this.head,
        J = this.tail,
        K = this.len;
      this.reset().uint32(K);

      if (K) {
        this.tail.next = I.next;
        this.tail = J;
        this.len += K;
      }

      return this;
    };

    C.prototype.finish = function () {
      for (var I = this.head.next, J = this.constructor.alloc(this.len), K = 0; I;) {
        I.fn(I.val, J, K);
        K += I.len;
        I = I.next;
      }
      return J;
    };

    C._configure = function (I) {
      k = I;
    };
  }, {
    './util/minimal': 39
  }],
  43: [function (b, c, d) {
    'use strict';
    c.exports = j;
    var f = b('./writer');
    (j.prototype = Object.create(f.prototype)).constructor = j;
    var g = b('./util/minimal'),
      h = g.Buffer;

    function j() {
      f.call(this);
    }
    j.alloc = function (m) {
      return (j.alloc = g._Buffer_allocUnsafe)(m);
    };
    var k = h && h.prototype instanceof Uint8Array && h.prototype.set.name === 'set' ? function (m, p, q) {
      p.set(m, q);
    } : function (m, p, q) {
      if (m.copy) m.copy(p, q, 0, m.length);
      else
        for (var v = 0; v < m.length;) p[q++] = m[v++];
    };

    function l(m, p, q) {
      m.length < 40 ? g.utf8.write(m, p, q) : p.utf8Write(m, q);
    }

    j.prototype.bytes = function (m) {
      if (g.isString(m))
        m = g._Buffer_from(m, 'base64');

      var p = m.length >>> 0;
      this.uint32(p);

      if (p)
        this._push(k, p, m);

      return this;
    };

    j.prototype.string = function (m) {
      var p = h.byteLength(m);
      this.uint32(p);

      if (p)
        this._push(l, p, m);

      return this;
    };
  }, {
    './util/minimal': 39,
    './writer': 42
  }],
  protobufjs: [function (a, b, c) {
    'use strict';
    b.exports = a('./src/index');
  }, {
    './src/index': 19
  }]
}, {}, []);
var protobuf = require('protobufjs');
! function (a, b) {
  'object' == typeof exports && 'undefined' != typeof module ? module.exports = b() : 'function' == typeof define && define.amd ? define(b) : (a = a || self).polygonClipping = b();
}(this, function () {
  'use strict';

  function j(ah, ai) {
    if (!(ah instanceof ai)) throw new TypeError('Cannot call a class as a function');
  }

  function q(ah, ai) {
    for (var aj = 0; aj < ai.length; aj++) {
      var ak = ai[aj];
      ak.enumerable = ak.enumerable || false;
      ak.configurable = true;

      if ('value' in ak)
        ak.writable = true;

      Object.defineProperty(ah, ak.key, ak);
    }
  }

  function C(ah, ai, aj) {
    if (ai)
      q(ah.prototype, ai);

    if (aj)
      q(ah, aj);

    return ah;
  }
  var D = function ah(ai, aj) {
    j(this, ah);
    this.next = null;
    this.key = ai;
    this.data = aj;
    this.left = null;
    this.right = null;
  };

  function F(ai, aj) {
    return ai > aj ? 1 : ai < aj ? -1 : 0;
  }

  function G(ai, aj, ak) {
    for (var al = new D(null, null), am = al, an = al;;) {
      var ao = ak(ai, aj.key);
      if (ao < 0) {
        if (aj.left === null) break;
        if (ak(ai, aj.left.key) < 0) {
          var ap = aj.left;
          if (aj.left = ap.right, ap.right = aj, (aj = ap).left === null) break;
        }
        an.left = aj;
        an = aj;
        aj = aj.left;
      } else {
        if (!(ao > 0)) break;
        if (aj.right === null) break;
        if (ak(ai, aj.right.key) > 0) {
          var aq = aj.right;
          if (aj.right = aq.left, aq.left = aj, (aj = aq).right === null) break;
        }
        am.right = aj;
        am = aj;
        aj = aj.right;
      }
    }
    am.right = aj.left;
    an.left = aj.right;
    aj.left = al.right;
    aj.right = al.left;
    return aj;
  }

  function H(ai, aj, ak, al) {
    var am = new D(ai, aj);
    if (ak === null) {
      am.left = am.right = null;
      return am;
    }
    var an = al(ai, (ak = G(ai, ak, al)).key);
    an < 0 ? (am.left = ak.left, am.right = ak, ak.left = null) : an >= 0 && (am.right = ak.right, am.left = ak, ak.right = null);
    return am;
  }

  function J(ai, aj, ak) {
    var al = null,
      am = null;
    if (aj) {
      var an = ak((aj = G(ai, aj, ak)).key, ai);
      an === 0 ? (al = aj.left, am = aj.right) : an < 0 ? (am = aj.right, aj.right = null, al = aj) : (al = aj.left, aj.left = null, am = aj);
    }
    return {
      left: al,
      right: am
    };
  }
  var K = function () {
    function ai() {
      var aj = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : F;
      j(this, ai);
      this._root = null;
      this._size = 0;
      this._comparator = aj;
    }

    C(ai, [{
      key: 'insert',
      value: function (aj, ak) {
        this._size++;
        return this._root = H(aj, ak, this._root, this._comparator);
      }
    }, {
      key: 'add',
      value: function (aj, ak) {
        var al = new D(aj, ak);

        if (this._root === null) {
          al.left = al.right = null;
          this._size++;
          this._root = al;
        }

        var am = this._comparator,
          an = G(aj, this._root, am),
          ao = am(aj, an.key);
        ao === 0 ? this._root = an : (ao < 0 ? (al.left = an.left, al.right = an, an.left = null) : ao > 0 && (al.right = an.right, al.left = an, an.right = null), this._size++, this._root = al);
        return this._root;
      }
    }, {
      key: 'remove',
      value: function (aj) {
        this._root = this._remove(aj, this._root, this._comparator);
      }
    }, {
      key: '_remove',
      value: function (aj, ak, al) {
        var am;
        return ak === null ? null : al(aj, (ak = G(aj, ak, al)).key) === 0 ? (ak.left === null ? am = ak.right : (am = G(aj, ak.left, al)).right = ak.right, this._size--, am) : ak;
      }
    }, {
      key: 'pop',
      value: function () {
        var aj = this._root;
        if (aj) {
          for (; aj.left;) aj = aj.left;
          this._root = G(aj.key, this._root, this._comparator);
          this._root = this._remove(aj.key, this._root, this._comparator);

          return {
            key: aj.key,
            data: aj.data
          };
        }
        return null;
      }
    }, {
      key: 'findStatic',
      value: function (aj) {
        for (var ak = this._root, al = this._comparator; ak;) {
          var am = al(aj, ak.key);
          if (am === 0) return ak;
          ak = am < 0 ? ak.left : ak.right;
        }
        return null;
      }
    }, {
      key: 'find',
      value: function (aj) {
        return this._root && (this._root = G(aj, this._root, this._comparator), this._comparator(aj, this._root.key) !== 0) ? null : this._root;
      }
    }, {
      key: 'contains',
      value: function (aj) {
        for (var ak = this._root, al = this._comparator; ak;) {
          var am = al(aj, ak.key);
          if (am === 0) return true;
          ak = am < 0 ? ak.left : ak.right;
        }
        return false;
      }
    }, {
      key: 'forEach',
      value: function (aj, ak) {
        for (var al = this._root, am = [], an = false; !an;) al !== null ? (am.push(al), al = al.left) : am.length !== 0 ? (al = am.pop(), aj.call(ak, al), al = al.right) : an = true;
        return this;
      }
    }, {
      key: 'range',
      value: function (aj, ak, al, am) {
        for (var an = [], ao = this._comparator, ap = this._root; an.length !== 0 || ap;)
          if (ap) {
            an.push(ap);
            ap = ap.left;
          } else {
            if (ao((ap = an.pop()).key, ak) > 0) break;
            if (ao(ap.key, aj) >= 0 && al.call(am, ap)) return this;
            ap = ap.right;
          } return this;
      }
    }, {
      key: 'keys',
      value: function () {
        var aj = [];

        this.forEach(function (ak) {
          var al = ak.key;
          return aj.push(al);
        });

        return aj;
      }
    }, {
      key: 'values',
      value: function () {
        var aj = [];

        this.forEach(function (ak) {
          var al = ak.data;
          return aj.push(al);
        });

        return aj;
      }
    }, {
      key: 'min',
      value: function () {
        return this._root ? this.minNode(this._root).key : null;
      }
    }, {
      key: 'max',
      value: function () {
        return this._root ? this.maxNode(this._root).key : null;
      }
    }, {
      key: 'minNode',
      value: function () {
        var aj = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : this._root;
        if (aj)
          for (; aj.left;) aj = aj.left;
        return aj;
      }
    }, {
      key: 'maxNode',
      value: function () {
        var aj = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : this._root;
        if (aj)
          for (; aj.right;) aj = aj.right;
        return aj;
      }
    }, {
      key: 'at',
      value: function (aj) {
        for (var ak = this._root, al = false, am = 0, an = []; !al;)
          if (ak) {
            an.push(ak);
            ak = ak.left;
          } else if (an.length > 0) {
          if (ak = an.pop(), am === aj) return ak;
          am++;
          ak = ak.right;
        } else al = true;
        return null;
      }
    }, {
      key: 'next',
      value: function (aj) {
        var ak = this._root,
          al = null;
        if (aj.right) {
          for (al = aj.right; al.left;) al = al.left;
          return al;
        }
        for (var am = this._comparator; ak;) {
          var an = am(aj.key, ak.key);
          if (an === 0) break;
          an < 0 ? (al = ak, ak = ak.left) : ak = ak.right;
        }
        return al;
      }
    }, {
      key: 'prev',
      value: function (aj) {
        var ak = this._root,
          al = null;
        if (aj.left !== null) {
          for (al = aj.left; al.right;) al = al.right;
          return al;
        }
        for (var am = this._comparator; ak;) {
          var an = am(aj.key, ak.key);
          if (an === 0) break;
          an < 0 ? ak = ak.left : (al = ak, ak = ak.right);
        }
        return al;
      }
    }, {
      key: 'clear',
      value: function () {
        this._root = null;
        this._size = 0;
        return this;
      }
    }, {
      key: 'toList',
      value: function () {
        return function (aj) {
          var ak = aj,
            al = [],
            am = false,
            an = new D(null, null),
            ao = an;
          for (; !am;) ak ? (al.push(ak), ak = ak.left) : al.length > 0 ? ak = (ak = ao = ao.next = al.pop()).right : am = true;
          ao.next = null;
          return an.next;
        }(this._root);
      }
    }, {
      key: 'load',
      value: function (aj) {
        var ak = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : [],
          al = arguments.length > 2 && undefined !== arguments[2] && arguments[2],
          am = aj.length,
          an = this._comparator;
        if ((al && function ap(aq, ar, as, at, au) {
            if (as >= at) return;
            var av = aq[as + at >> 1];
            var aw = as - 1;
            var ax = at + 1;
            for (;;) {
              do {
                aw++;
              } while (au(aq[aw], av) < 0);
              do {
                ax--;
              } while (au(aq[ax], av) > 0);
              if (aw >= ax) break;
              var ay = aq[aw];
              aq[aw] = aq[ax];
              aq[ax] = ay;
              ay = ar[aw];
              ar[aw] = ar[ax];
              ar[ax] = ay;
            }
            ap(aq, ar, as, ax, au);
            ap(aq, ar, ax + 1, at, au);
          }(aj, ak, 0, am - 1, an), this._root === null)) {
          this._root = function aq(ar, as, at, au) {
            var av = au - at;
            if (av > 0) {
              var aw = at + Math.floor(av / 2),
                ax = ar[aw],
                ay = as[aw],
                az = new D(ax, ay);
              az.left = aq(ar, as, at, aw);
              az.right = aq(ar, as, aw + 1, au);
              return az;
            }
            return null;
          }(aj, ak, 0, am);

          this._size = am;
        } else {
          var ao = function (ar, as, at) {
            var au = new D(null, null),
              av = au,
              aw = ar,
              ax = as;
            for (; aw !== null && ax !== null;) {
              at(aw.key, ax.key) < 0 ? (av.next = aw, aw = aw.next) : (av.next = ax, ax = ax.next);
              av = av.next;
            }
            aw !== null ? av.next = aw : ax !== null && (av.next = ax);
            return au.next;
          }(this.toList(), function (ar, as) {
            for (var at = new D(null, null), au = at, av = 0; av < ar.length; av++) au = au.next = new D(ar[av], as[av]);
            au.next = null;
            return at.next;
          }(aj, ak), an);
          am = this._size + am;

          this._root = function ar(as, at, au) {
            var av = au - at;
            if (av > 0) {
              var aw = at + Math.floor(av / 2),
                ax = ar(as, at, aw),
                ay = as.head;
              ay.left = ax;
              as.head = as.head.next;
              ay.right = ar(as, aw + 1, au);
              return ay;
            }
            return null;
          }({
            head: ao
          }, 0, am);
        }
        return this;
      }
    }, {
      key: 'isEmpty',
      value: function () {
        return this._root === null;
      }
    }, {
      key: 'toString',
      value: function () {
        var aj = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : function (al) {
            return String(al.key);
          },
          ak = [];

        (function al(am, an, ao, ap, aq) {
          if (am) {
            ap(''.concat(an).concat(ao ? '└── ' : '├── ').concat(aq(am), '\x0a'));
            var ar = an + (ao ? '    ' : '│   ');

            if (am.left)
              al(am.left, ar, false, ap, aq);

            if (am.right)
              al(am.right, ar, true, ap, aq);
          }
        })(this._root, '', true, function (am) {
          return ak.push(am);
        }, aj);

        return ak.join('');
      }
    }, {
      key: 'update',
      value: function (aj, ak, al) {
        var am = this._comparator,
          an = J(aj, this._root, am),
          ao = an.left,
          ap = an.right;
        am(aj, ak) < 0 ? ap = H(ak, al, ap, am) : ao = H(ak, al, ao, am);

        this._root = function (aq, ar, as) {
          return ar === null ? aq : aq === null ? ar : ((ar = G(aq.key, ar, as)).left = aq, ar);
        }(ao, ap, am);
      }
    }, {
      key: 'split',
      value: function (aj) {
        return J(aj, this._root, this._comparator);
      }
    }, {
      key: 'size',
      get: function () {
        return this._size;
      }
    }, {
      key: 'root',
      get: function () {
        return this._root;
      }
    }]);

    return ai;
  }();
  var M = function (ai, aj) {
      return ai.ll.x <= aj.x && aj.x <= ai.ur.x && ai.ll.y <= aj.y && aj.y <= ai.ur.y;
    },
    Q = function (ai, aj) {
      if (aj.ur.x < ai.ll.x || ai.ur.x < aj.ll.x || aj.ur.y < ai.ll.y || ai.ur.y < aj.ll.y) return null;
      var ak = ai.ll.x < aj.ll.x ? aj.ll.x : ai.ll.x,
        al = ai.ur.x < aj.ur.x ? ai.ur.x : aj.ur.x;
      return {
        ll: {
          x: ak,
          y: ai.ll.y < aj.ll.y ? aj.ll.y : ai.ll.y
        },
        ur: {
          x: al,
          y: ai.ur.y < aj.ur.y ? ai.ur.y : aj.ur.y
        }
      };
    },
    T = Number.EPSILON;

  if (undefined === T)
    T = Math.pow(2, -52);

  var U = T * T,
    V = function (ai, aj) {
      if (-T < ai && ai < T && -T < aj && aj < T) return 0;
      var ak = ai - aj;
      return ak * ak < U * ai * aj ? 0 : ai < aj ? -1 : 1;
    },
    W = function () {
      function ai() {
        j(this, ai);
        this.reset();
      }

      C(ai, [{
        key: 'reset',
        value: function () {
          this.xRounder = new X();
          this.yRounder = new X();
        }
      }, {
        key: 'round',
        value: function (aj, ak) {
          return {
            x: this.xRounder.round(aj),
            y: this.yRounder.round(ak)
          };
        }
      }]);

      return ai;
    }(),
    X = function () {
      function ai() {
        j(this, ai);
        this.tree = new K();
        this.round(0);
      }

      C(ai, [{
        key: 'round',
        value: function (aj) {
          var ak = this.tree.add(aj),
            al = this.tree.prev(ak);
          if (al !== null && V(ak.key, al.key) === 0) {
            this.tree.remove(aj);
            return al.key;
          }
          var am = this.tree.next(ak);
          return am !== null && V(ak.key, am.key) === 0 ? (this.tree.remove(aj), am.key) : aj;
        }
      }]);

      return ai;
    }(),
    Y = new W(),
    Z = function (ai, aj) {
      return ai.x * aj.y - ai.y * aj.x;
    },
    a0 = function (ai, aj) {
      return ai.x * aj.x + ai.y * aj.y;
    },
    a1 = function (ai, aj, ak) {
      var al = {
          x: aj.x - ai.x,
          y: aj.y - ai.y
        },
        am = {
          x: ak.x - ai.x,
          y: ak.y - ai.y
        },
        an = Z(al, am);
      return V(an, 0);
    },
    a2 = function (ai) {
      return Math.sqrt(a0(ai, ai));
    },
    a3 = function (ai, aj, ak) {
      var al = {
          x: aj.x - ai.x,
          y: aj.y - ai.y
        },
        am = {
          x: ak.x - ai.x,
          y: ak.y - ai.y
        };
      return a0(am, al) / a2(am) / a2(al);
    },
    a4 = function (ai, aj, ak) {
      return aj.y === 0 ? null : {
        x: ai.x + aj.x / aj.y * (ak - ai.y),
        y: ak
      };
    },
    a5 = function (ai, aj, ak) {
      return aj.x === 0 ? null : {
        x: ak,
        y: ai.y + aj.y / aj.x * (ak - ai.x)
      };
    },
    a6 = function () {
      function ai(aj, ak) {
        j(this, ai);
        undefined === aj.events ? aj.events = [this] : aj.events.push(this);
        this.point = aj;
        this.isLeft = ak;
      }

      C(ai, null, [{
        key: 'compare',
        value: function (aj, ak) {
          var al = ai.comparePoints(aj.point, ak.point);
          return al !== 0 ? al : (aj.point !== ak.point && aj.link(ak), aj.isLeft !== ak.isLeft ? aj.isLeft ? 1 : -1 : a8.compare(aj.segment, ak.segment));
        }
      }, {
        key: 'comparePoints',
        value: function (aj, ak) {
          return aj.x < ak.x ? -1 : aj.x > ak.x ? 1 : aj.y < ak.y ? -1 : aj.y > ak.y ? 1 : 0;
        }
      }]);

      C(ai, [{
        key: 'link',
        value: function (aj) {
          if (aj.point === this.point) throw new Error('Tried to link already linked events');
          for (var ak = aj.point.events, al = 0, am = ak.length; al < am; al++) {
            var an = ak[al];
            this.point.events.push(an);
            an.point = this.point;
          }
          this.checkForConsuming();
        }
      }, {
        key: 'checkForConsuming',
        value: function () {
          for (var aj = this.point.events.length, ak = 0; ak < aj; ak++) {
            var al = this.point.events[ak];
            if (undefined === al.segment.consumedBy)
              for (var am = ak + 1; am < aj; am++) {
                var an = this.point.events[am];

                if (undefined === an.consumedBy)
                  if (al.otherSE.point.events === an.otherSE.point.events)
                    al.segment.consume(an.segment);
              }
          }
        }
      }, {
        key: 'getAvailableLinkedEvents',
        value: function () {
          for (var aj = [], ak = 0, al = this.point.events.length; ak < al; ak++) {
            var am = this.point.events[ak];

            if (am !== this && !am.segment.ringOut && am.segment.isInResult())
              aj.push(am);
          }
          return aj;
        }
      }, {
        key: 'getLeftmostComparator',
        value: function (aj) {
          var ak = this,
            al = new Map(),
            am = function (an) {
              var ao, ap, aq, ar, as, at = an.otherSE;
              al.set(an, {
                sine: (ao = ak.point, ap = aj.point, aq = at.point, ar = {
                  x: ap.x - ao.x,
                  y: ap.y - ao.y
                }, as = {
                  x: aq.x - ao.x,
                  y: aq.y - ao.y
                }, Z(as, ar) / a2(as) / a2(ar)),
                cosine: a3(ak.point, aj.point, at.point)
              });
            };
          return function (an, ao) {
            al.has(an) || am(an);
            al.has(ao) || am(ao);
            var ap = al.get(an),
              aq = ap.sine,
              ar = ap.cosine,
              as = al.get(ao),
              at = as.sine,
              au = as.cosine;
            return aq >= 0 && at >= 0 ? ar < au ? 1 : ar > au ? -1 : 0 : aq < 0 && at < 0 ? ar < au ? -1 : ar > au ? 1 : 0 : at < aq ? -1 : at > aq ? 1 : 0;
          };
        }
      }]);

      return ai;
    }(),
    a7 = 0,
    a8 = function () {
      function ai(aj, ak, al, am) {
        j(this, ai);
        this.id = ++a7;
        this.leftSE = aj;
        aj.segment = this;
        aj.otherSE = ak;
        this.rightSE = ak;
        ak.segment = this;
        ak.otherSE = aj;
        this.rings = al;
        this.windings = am;
      }

      C(ai, null, [{
        key: 'compare',
        value: function (aj, ak) {
          var al = aj.leftSE.point.x,
            am = ak.leftSE.point.x,
            an = aj.rightSE.point.x,
            ao = ak.rightSE.point.x;
          if (ao < al) return 1;
          if (an < am) return -1;
          var ap = aj.leftSE.point.y,
            aq = ak.leftSE.point.y,
            ar = aj.rightSE.point.y,
            as = ak.rightSE.point.y;
          if (al < am) {
            if (aq < ap && aq < ar) return 1;
            if (aq > ap && aq > ar) return -1;
            var at = aj.comparePoint(ak.leftSE.point);
            if (at < 0) return 1;
            if (at > 0) return -1;
            var au = ak.comparePoint(aj.rightSE.point);
            return au !== 0 ? au : -1;
          }
          if (al > am) {
            if (ap < aq && ap < as) return -1;
            if (ap > aq && ap > as) return 1;
            var av = ak.comparePoint(aj.leftSE.point);
            if (av !== 0) return av;
            var aw = aj.comparePoint(ak.rightSE.point);
            return aw < 0 ? 1 : aw > 0 ? -1 : 1;
          }
          if (ap < aq) return -1;
          if (ap > aq) return 1;
          if (an < ao) {
            var ax = ak.comparePoint(aj.rightSE.point);
            if (ax !== 0) return ax;
          }
          if (an > ao) {
            var ay = aj.comparePoint(ak.rightSE.point);
            if (ay < 0) return 1;
            if (ay > 0) return -1;
          }
          if (an !== ao) {
            var az = ar - ap,
              aA = an - al,
              aB = as - aq,
              aC = ao - am;
            if (az > aA && aB < aC) return 1;
            if (az < aA && aB > aC) return -1;
          }
          return an > ao ? 1 : an < ao ? -1 : ar < as ? -1 : ar > as ? 1 : aj.id < ak.id ? -1 : aj.id > ak.id ? 1 : 0;
        }
      }]);

      C(ai, [{
        key: 'replaceRightSE',
        value: function (aj) {
          this.rightSE = aj;
          this.rightSE.segment = this;
          this.rightSE.otherSE = this.leftSE;
          this.leftSE.otherSE = this.rightSE;
        }
      }, {
        key: 'bbox',
        value: function () {
          var aj = this.leftSE.point.y,
            ak = this.rightSE.point.y;
          return {
            ll: {
              x: this.leftSE.point.x,
              y: aj < ak ? aj : ak
            },
            ur: {
              x: this.rightSE.point.x,
              y: aj > ak ? aj : ak
            }
          };
        }
      }, {
        key: 'vector',
        value: function () {
          return {
            x: this.rightSE.point.x - this.leftSE.point.x,
            y: this.rightSE.point.y - this.leftSE.point.y
          };
        }
      }, {
        key: 'isAnEndpoint',
        value: function (aj) {
          return aj.x === this.leftSE.point.x && aj.y === this.leftSE.point.y || aj.x === this.rightSE.point.x && aj.y === this.rightSE.point.y;
        }
      }, {
        key: 'comparePoint',
        value: function (aj) {
          if (this.isAnEndpoint(aj)) return 0;
          var ak = this.leftSE.point,
            al = this.rightSE.point,
            am = this.vector();
          if (ak.x === al.x) return aj.x === ak.x ? 0 : aj.x < ak.x ? 1 : -1;
          var an = (aj.y - ak.y) / am.y,
            ao = ak.x + an * am.x;
          if (aj.x === ao) return 0;
          var ap = (aj.x - ak.x) / am.x,
            aq = ak.y + ap * am.y;
          return aj.y === aq ? 0 : aj.y < aq ? -1 : 1;
        }
      }, {
        key: 'getIntersection',
        value: function (aj) {
          var ak = this.bbox(),
            al = aj.bbox(),
            am = Q(ak, al);
          if (am === null) return null;
          var an = this.leftSE.point,
            ao = this.rightSE.point,
            ap = aj.leftSE.point,
            aq = aj.rightSE.point,
            ar = M(ak, ap) && this.comparePoint(ap) === 0,
            as = M(al, an) && aj.comparePoint(an) === 0,
            at = M(ak, aq) && this.comparePoint(aq) === 0,
            au = M(al, ao) && aj.comparePoint(ao) === 0;
          if (as && ar) return au && !at ? ao : !au && at ? aq : null;
          if (as) return at && an.x === aq.x && an.y === aq.y ? null : an;
          if (ar) return au && ao.x === ap.x && ao.y === ap.y ? null : ap;
          if (au && at) return null;
          if (au) return ao;
          if (at) return aq;
          var av = function (aw, ax, ay, az) {
            if (ax.x === 0) return a5(ay, az, aw.x);
            if (az.x === 0) return a5(aw, ax, ay.x);
            if (ax.y === 0) return a4(ay, az, aw.y);
            if (az.y === 0) return a4(aw, ax, ay.y);
            var aA = Z(ax, az);
            if (0 == aA) return null;
            var aB = {
                x: ay.x - aw.x,
                y: ay.y - aw.y
              },
              aC = Z(aB, ax) / aA,
              aD = Z(aB, az) / aA;
            return {
              x: (aw.x + aD * ax.x + (ay.x + aC * az.x)) / 2,
              y: (aw.y + aD * ax.y + (ay.y + aC * az.y)) / 2
            };
          }(an, this.vector(), ap, aj.vector());
          return av === null ? null : M(am, av) ? Y.round(av.x, av.y) : null;
        }
      }, {
        key: 'split',
        value: function (aj) {
          var ak = [],
            al = undefined !== aj.events,
            am = new a6(aj, true),
            an = new a6(aj, false),
            ao = this.rightSE;
          this.replaceRightSE(an);
          ak.push(an);
          ak.push(am);
          var ap = new ai(am, ao, this.rings.slice(), this.windings.slice());

          if (a6.comparePoints(ap.leftSE.point, ap.rightSE.point) > 0)
            ap.swapEvents();

          if (a6.comparePoints(this.leftSE.point, this.rightSE.point) > 0)
            this.swapEvents();

          if (al) {
            am.checkForConsuming();
            an.checkForConsuming();
          }

          return ak;
        }
      }, {
        key: 'swapEvents',
        value: function () {
          var aj = this.rightSE;
          this.rightSE = this.leftSE;
          this.leftSE = aj;
          this.leftSE.isLeft = true;
          this.rightSE.isLeft = false;
          for (var ak = 0, al = this.windings.length; ak < al; ak++) this.windings[ak] *= -1;
        }
      }, {
        key: 'consume',
        value: function (aj) {
          for (var ak = this, al = aj; ak.consumedBy;) ak = ak.consumedBy;
          for (; al.consumedBy;) al = al.consumedBy;
          var am = ai.compare(ak, al);
          if (am !== 0) {
            if (am > 0) {
              var an = ak;
              ak = al;
              al = an;
            }
            if (ak.prev === al) {
              var ao = ak;
              ak = al;
              al = ao;
            }
            for (var ap = 0, aq = al.rings.length; ap < aq; ap++) {
              var ar = al.rings[ap],
                as = al.windings[ap],
                at = ak.rings.indexOf(ar); - 1 === at ? (ak.rings.push(ar), ak.windings.push(as)) : ak.windings[at] += as;
            }
            al.rings = null;
            al.windings = null;
            al.consumedBy = ak;
            al.leftSE.consumedBy = ak.leftSE;
            al.rightSE.consumedBy = ak.rightSE;
          }
        }
      }, {
        key: 'prevInResult',
        value: function () {
          return undefined !== this._prevInResult ? this._prevInResult : (this.prev ? this.prev.isInResult() ? this._prevInResult = this.prev : this._prevInResult = this.prev.prevInResult() : this._prevInResult = null, this._prevInResult);
        }
      }, {
        key: 'beforeState',
        value: function () {
          if (undefined !== this._beforeState) return this._beforeState;
          if (this.prev) {
            var aj = this.prev.consumedBy || this.prev;
            this._beforeState = aj.afterState();
          } else this._beforeState = {
            rings: [],
            windings: [],
            multiPolys: []
          };
          return this._beforeState;
        }
      }, {
        key: 'afterState',
        value: function () {
          if (undefined !== this._afterState) return this._afterState;
          var aj = this.beforeState();
          this._afterState = {
            rings: aj.rings.slice(0),
            windings: aj.windings.slice(0),
            multiPolys: []
          };
          for (var ak = this._afterState.rings, al = this._afterState.windings, am = this._afterState.multiPolys, an = 0, ao = this.rings.length; an < ao; an++) {
            var ap = this.rings[an],
              aq = this.windings[an],
              ar = ak.indexOf(ap); - 1 === ar ? (ak.push(ap), al.push(aq)) : al[ar] += aq;
          }
          for (var as = [], at = [], au = 0, av = ak.length; au < av; au++)
            if (al[au] !== 0) {
              var aw = ak[au],
                ax = aw.poly;
              if (-1 === at.indexOf(ax))
                if (aw.isExterior) as.push(ax);
                else {
                  if (-1 === at.indexOf(ax))
                    at.push(ax);

                  var ay = as.indexOf(aw.poly);

                  if (-1 !== ay)
                    as.splice(ay, 1);
                }
            } for (var az = 0, aA = as.length; az < aA; az++) {
            var aB = as[az].multiPoly;

            if (-1 === am.indexOf(aB))
              am.push(aB);
          }
          return this._afterState;
        }
      }, {
        key: 'isInResult',
        value: function () {
          if (this.consumedBy) return false;
          if (undefined !== this._isInResult) return this._isInResult;
          var aj = this.beforeState().multiPolys,
            ak = this.afterState().multiPolys;
          switch (ag.type) {
          case 'union':
            var al = aj.length === 0,
              am = ak.length === 0;
            this._isInResult = al !== am;
            break;
          case 'intersection':
            var an, ao;
            aj.length < ak.length ? (an = aj.length, ao = ak.length) : (an = ak.length, ao = aj.length);
            this._isInResult = ao === ag.numMultiPolys && an < ao;
            break;
          case 'xor':
            var ap = Math.abs(aj.length - ak.length);
            this._isInResult = ap % 2 == 1;
            break;
          case 'difference':
            var aq = function (ar) {
              return ar.length === 1 && ar[0].isSubject;
            };
            this._isInResult = aq(aj) !== aq(ak);
            break;
          default:
            throw new Error('Unrecognized operation type found '.concat(ag.type));
          }
          return this._isInResult;
        }
      }], [{
        key: 'fromRing',
        value: function (aj, ak, al) {
          var am, an, ao, ap = a6.comparePoints(aj, ak);
          if (ap < 0) {
            am = aj;
            an = ak;
            ao = 1;
          } else {
            if (!(ap > 0)) throw new Error('Tried to create degenerate segment at ['.concat(aj.x, ', ').concat(aj.y, ']'));
            am = ak;
            an = aj;
            ao = -1;
          }
          return new ai(new a6(am, true), new a6(an, false), [al], [ao]);
        }
      }]);

      return ai;
    }(),
    a9 = function () {
      function ai(aj, ak, al) {
        if (j(this, ai), !Array.isArray(aj) || aj.length === 0) throw new Error('Input geometry is not a valid Polygon or MultiPolygon');
        if (this.poly = ak, this.isExterior = al, this.segments = [], 'number' != typeof aj[0][0] || 'number' != typeof aj[0][1]) throw new Error('Input geometry is not a valid Polygon or MultiPolygon');
        var am = Y.round(aj[0][0], aj[0][1]);
        this.bbox = {
          ll: {
            x: am.x,
            y: am.y
          },
          ur: {
            x: am.x,
            y: am.y
          }
        };
        for (var an = am, ao = 1, ap = aj.length; ao < ap; ao++) {
          if ('number' != typeof aj[ao][0] || 'number' != typeof aj[ao][1]) throw new Error('Input geometry is not a valid Polygon or MultiPolygon');
          var aq = Y.round(aj[ao][0], aj[ao][1]);
          aq.x === an.x && aq.y === an.y || (this.segments.push(a8.fromRing(an, aq, this)), aq.x < this.bbox.ll.x && (this.bbox.ll.x = aq.x), aq.y < this.bbox.ll.y && (this.bbox.ll.y = aq.y), aq.x > this.bbox.ur.x && (this.bbox.ur.x = aq.x), aq.y > this.bbox.ur.y && (this.bbox.ur.y = aq.y), an = aq);
        }
        am.x === an.x && am.y === an.y || this.segments.push(a8.fromRing(an, am, this));
      }

      C(ai, [{
        key: 'getSweepEvents',
        value: function () {
          for (var aj = [], ak = 0, al = this.segments.length; ak < al; ak++) {
            var am = this.segments[ak];
            aj.push(am.leftSE);
            aj.push(am.rightSE);
          }
          return aj;
        }
      }]);

      return ai;
    }(),
    aa = function () {
      function ai(aj, ak) {
        if (j(this, ai), !Array.isArray(aj)) throw new Error('Input geometry is not a valid Polygon or MultiPolygon');
        this.exteriorRing = new a9(aj[0], this, true);

        this.bbox = {
          ll: {
            x: this.exteriorRing.bbox.ll.x,
            y: this.exteriorRing.bbox.ll.y
          },
          ur: {
            x: this.exteriorRing.bbox.ur.x,
            y: this.exteriorRing.bbox.ur.y
          }
        };

        this.interiorRings = [];
        for (var al = 1, am = aj.length; al < am; al++) {
          var an = new a9(aj[al], this, false);

          if (an.bbox.ll.x < this.bbox.ll.x)
            this.bbox.ll.x = an.bbox.ll.x;

          if (an.bbox.ll.y < this.bbox.ll.y)
            this.bbox.ll.y = an.bbox.ll.y;

          if (an.bbox.ur.x > this.bbox.ur.x)
            this.bbox.ur.x = an.bbox.ur.x;

          if (an.bbox.ur.y > this.bbox.ur.y)
            this.bbox.ur.y = an.bbox.ur.y;

          this.interiorRings.push(an);
        }
        this.multiPoly = ak;
      }

      C(ai, [{
        key: 'getSweepEvents',
        value: function () {
          for (var aj = this.exteriorRing.getSweepEvents(), ak = 0, al = this.interiorRings.length; ak < al; ak++)
            for (var am = this.interiorRings[ak].getSweepEvents(), an = 0, ao = am.length; an < ao; an++) aj.push(am[an]);
          return aj;
        }
      }]);

      return ai;
    }(),
    ab = function () {
      function ai(aj, ak) {
        if (j(this, ai), !Array.isArray(aj)) throw new Error('Input geometry is not a valid Polygon or MultiPolygon');
        try {
          if ('number' == typeof aj[0][0][0])
            aj = [aj];
        } catch (ao) {}
        this.polys = [];

        this.bbox = {
          ll: {
            x: Number.POSITIVE_INFINITY,
            y: Number.POSITIVE_INFINITY
          },
          ur: {
            x: Number.NEGATIVE_INFINITY,
            y: Number.NEGATIVE_INFINITY
          }
        };

        for (var al = 0, am = aj.length; al < am; al++) {
          var an = new aa(aj[al], this);

          if (an.bbox.ll.x < this.bbox.ll.x)
            this.bbox.ll.x = an.bbox.ll.x;

          if (an.bbox.ll.y < this.bbox.ll.y)
            this.bbox.ll.y = an.bbox.ll.y;

          if (an.bbox.ur.x > this.bbox.ur.x)
            this.bbox.ur.x = an.bbox.ur.x;

          if (an.bbox.ur.y > this.bbox.ur.y)
            this.bbox.ur.y = an.bbox.ur.y;

          this.polys.push(an);
        }
        this.isSubject = ak;
      }

      C(ai, [{
        key: 'getSweepEvents',
        value: function () {
          for (var aj = [], ak = 0, al = this.polys.length; ak < al; ak++)
            for (var am = this.polys[ak].getSweepEvents(), an = 0, ao = am.length; an < ao; an++) aj.push(am[an]);
          return aj;
        }
      }]);

      return ai;
    }(),
    ac = function () {
      function ai(aj) {
        j(this, ai);
        this.events = aj;
        for (var ak = 0, al = aj.length; ak < al; ak++) aj[ak].segment.ringOut = this;
        this.poly = null;
      }

      C(ai, null, [{
        key: 'factory',
        value: function (aj) {
          for (var ak = [], al = 0, am = aj.length; al < am; al++) {
            var an = aj[al];
            if (an.isInResult() && !an.ringOut) {
              for (var ao = null, ap = an.leftSE, aq = an.rightSE, ar = [ap], as = ap.point, at = []; ao = ap, ap = aq, ar.push(ap), ap.point !== as;)
                for (;;) {
                  var au = ap.getAvailableLinkedEvents();
                  if (au.length === 0) {
                    var av = ar[0].point,
                      aw = ar[ar.length - 1].point;
                    throw new Error('Unable to complete output ring starting at ['.concat(av.x, ',') + ' '.concat(av.y, ']. Last matching segment found ends at') + ' ['.concat(aw.x, ', ').concat(aw.y, '].'));
                  }
                  if (au.length === 1) {
                    aq = au[0].otherSE;
                    break;
                  }
                  for (var ax = null, ay = 0, az = at.length; ay < az; ay++)
                    if (at[ay].point === ap.point) {
                      ax = ay;
                      break;
                    } if (ax === null) {
                    at.push({
                      index: ar.length,
                      point: ap.point
                    });
                    var aA = ap.getLeftmostComparator(ao);
                    aq = au.sort(aA)[0].otherSE;
                    break;
                  }
                  var aB = at.splice(ax)[0],
                    aC = ar.splice(aB.index);
                  aC.unshift(aC[0].otherSE);
                  ak.push(new ai(aC.reverse()));
                }
              ak.push(new ai(ar));
            }
          }
          return ak;
        }
      }]);

      C(ai, [{
        key: 'getGeom',
        value: function () {
          for (var aj = this.events[0].point, ak = [aj], al = 1, am = this.events.length - 1; al < am; al++) {
            var an = this.events[al].point,
              ao = this.events[al + 1].point;

            if (a1(an, aj, ao) !== 0) {
              ak.push(an);
              aj = an;
            }
          }
          if (ak.length === 1) return null;
          var ap = ak[0],
            aq = ak[1];

          if (a1(ap, aj, aq) === 0)
            ak.shift();

          ak.push(ak[0]);
          for (var ar = this.isExteriorRing() ? 1 : -1, as = this.isExteriorRing() ? 0 : ak.length - 1, at = this.isExteriorRing() ? ak.length : -1, au = [], av = as; av != at; av += ar) au.push([ak[av].x, ak[av].y]);
          return au;
        }
      }, {
        key: 'isExteriorRing',
        value: function () {
          if (undefined === this._isExteriorRing) {
            var aj = this.enclosingRing();
            this._isExteriorRing = !aj || !aj.isExteriorRing();
          }
          return this._isExteriorRing;
        }
      }, {
        key: 'enclosingRing',
        value: function () {
          if (undefined === this._enclosingRing)
            this._enclosingRing = this._calcEnclosingRing();

          return this._enclosingRing;
        }
      }, {
        key: '_calcEnclosingRing',
        value: function () {
          for (var aj = this.events[0], ak = 1, al = this.events.length; ak < al; ak++) {
            var am = this.events[ak];

            if (a6.compare(aj, am) > 0)
              aj = am;
          }
          for (var an = aj.segment.prevInResult(), ao = an ? an.prevInResult() : null;;) {
            if (!an) return null;
            if (!ao) return an.ringOut;
            if (ao.ringOut !== an.ringOut) return ao.ringOut.enclosingRing() !== an.ringOut ? an.ringOut : an.ringOut.enclosingRing();
            an = ao.prevInResult();
            ao = an ? an.prevInResult() : null;
          }
        }
      }]);

      return ai;
    }(),
    ad = function () {
      function ai(aj) {
        j(this, ai);
        this.exteriorRing = aj;
        aj.poly = this;
        this.interiorRings = [];
      }

      C(ai, [{
        key: 'addInterior',
        value: function (aj) {
          this.interiorRings.push(aj);
          aj.poly = this;
        }
      }, {
        key: 'getGeom',
        value: function () {
          var aj = [this.exteriorRing.getGeom()];
          if (aj[0] === null) return null;
          for (var ak = 0, al = this.interiorRings.length; ak < al; ak++) {
            var am = this.interiorRings[ak].getGeom();

            if (am !== null)
              aj.push(am);
          }
          return aj;
        }
      }]);

      return ai;
    }(),
    ae = function () {
      function ai(aj) {
        j(this, ai);
        this.rings = aj;
        this.polys = this._composePolys(aj);
      }

      C(ai, [{
        key: 'getGeom',
        value: function () {
          for (var aj = [], ak = 0, al = this.polys.length; ak < al; ak++) {
            var am = this.polys[ak].getGeom();

            if (am !== null)
              aj.push(am);
          }
          return aj;
        }
      }, {
        key: '_composePolys',
        value: function (aj) {
          for (var ak = [], al = 0, am = aj.length; al < am; al++) {
            var an = aj[al];
            if (!an.poly)
              if (an.isExteriorRing()) ak.push(new ad(an));
              else {
                var ao = an.enclosingRing();
                ao.poly || ak.push(new ad(ao));
                ao.poly.addInterior(an);
              }
          }
          return ak;
        }
      }]);

      return ai;
    }(),
    af = function () {
      function ai(aj) {
        var ak = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : a8.compare;
        j(this, ai);
        this.queue = aj;
        this.tree = new K(ak);
        this.segments = [];
      }

      C(ai, [{
        key: 'process',
        value: function (aj) {
          var ak = aj.segment,
            al = [];
          if (aj.consumedBy) {
            aj.isLeft ? this.queue.remove(aj.otherSE) : this.tree.remove(ak);
            return al;
          }
          var am = aj.isLeft ? this.tree.insert(ak) : this.tree.find(ak);
          if (!am) throw new Error('Unable to find segment #'.concat(ak.id, ' ') + '['.concat(ak.leftSE.point.x, ', ').concat(ak.leftSE.point.y, '] -> ') + '['.concat(ak.rightSE.point.x, ', ').concat(ak.rightSE.point.y, '] ') + 'in SweepLine tree. Please submit a bug report.');
          for (var an = am, ao = am, ap = undefined, aq = undefined; undefined === ap;)(an = this.tree.prev(an)) === (null) ? ap = null : undefined === an.key.consumedBy && (ap = an.key);
          for (; undefined === aq;)(ao = this.tree.next(ao)) === (null) ? aq = null : undefined === ao.key.consumedBy && (aq = ao.key);
          if (aj.isLeft) {
            var ar = null;
            if (ap) {
              var as = ap.getIntersection(ak);
              if (as !== null && (ak.isAnEndpoint(as) || (ar = as), !ap.isAnEndpoint(as)))
                for (var at = this._splitSafely(ap, as), au = 0, av = at.length; au < av; au++) al.push(at[au]);
            }
            var aw = null;
            if (aq) {
              var ax = aq.getIntersection(ak);
              if (ax !== null && (ak.isAnEndpoint(ax) || (aw = ax), !aq.isAnEndpoint(ax)))
                for (var ay = this._splitSafely(aq, ax), az = 0, aA = ay.length; az < aA; az++) al.push(ay[az]);
            }
            if (ar !== null || aw !== null) {
              var aB = null;
              if (ar === null) aB = aw;
              else if (aw === null) aB = ar;
              else {
                aB = a6.comparePoints(ar, aw) <= 0 ? ar : aw;
              }
              this.queue.remove(ak.rightSE);
              al.push(ak.rightSE);
              for (var aC = ak.split(aB), aD = 0, aE = aC.length; aD < aE; aD++) al.push(aC[aD]);
            }
            al.length > 0 ? (this.tree.remove(ak), al.push(aj)) : (this.segments.push(ak), ak.prev = ap);
          } else {
            if (ap && aq) {
              var aF = ap.getIntersection(aq);
              if (aF !== null) {
                if (!ap.isAnEndpoint(aF))
                  for (var aG = this._splitSafely(ap, aF), aH = 0, aI = aG.length; aH < aI; aH++) al.push(aG[aH]);
                if (!aq.isAnEndpoint(aF))
                  for (var aJ = this._splitSafely(aq, aF), aK = 0, aL = aJ.length; aK < aL; aK++) al.push(aJ[aK]);
              }
            }
            this.tree.remove(ak);
          }
          return al;
        }
      }, {
        key: '_splitSafely',
        value: function (aj, ak) {
          this.tree.remove(aj);
          var al = aj.rightSE;
          this.queue.remove(al);
          var am = aj.split(ak);
          am.push(al);

          if (undefined === aj.consumedBy)
            this.tree.insert(aj);

          return am;
        }
      }]);

      return ai;
    }(),
    ag = new(function () {
      function ai() {
        j(this, ai);
      }

      C(ai, [{
        key: 'run',
        value: function (aj, ak, al) {
          ag.type = aj;
          Y.reset();
          for (var am = [new ab(ak, true)], an = 0, ao = al.length; an < ao; an++) am.push(new ab(al[an], false));
          if (ag.numMultiPolys = am.length, ag.type === 'difference')
            for (var ap = am[0], aq = 1; aq < am.length;) Q(am[aq].bbox, ap.bbox) !== null ? aq++ : am.splice(aq, 1);
          if (ag.type === 'intersection')
            for (var ar = 0, as = am.length; ar < as; ar++)
              for (var at = am[ar], au = ar + 1, av = am.length; au < av; au++)
                if (Q(at.bbox, am[au].bbox) === null) return [];
          for (var aw = new K(a6.compare), ax = 0, ay = am.length; ax < ay; ax++)
            for (var az = am[ax].getSweepEvents(), aA = 0, aB = az.length; aA < aB; aA++) aw.insert(az[aA]);
          for (var aC = new af(aw), aD = aw.size, aE = aw.pop(); aE;) {
            var aF = aE.key;
            if (aw.size === aD) {
              var aG = aF.segment;
              throw new Error('Unable to pop() '.concat(aF.isLeft ? 'left' : 'right', ' SweepEvent ') + '['.concat(aF.point.x, ', ').concat(aF.point.y, '] from segment #').concat(aG.id, ' ') + '['.concat(aG.leftSE.point.x, ', ').concat(aG.leftSE.point.y, '] -> ') + '['.concat(aG.rightSE.point.x, ', ').concat(aG.rightSE.point.y, '] from queue. ') + 'Please file a bug report.');
            }
            for (var aH = aC.process(aF), aI = 0, aJ = aH.length; aI < aJ; aI++) {
              var aK = aH[aI];

              if (undefined === aK.consumedBy)
                aw.insert(aK);
            }
            aD = aw.size;
            aE = aw.pop();
          }
          Y.reset();
          var aL = ac.factory(aC.segments);
          return new ae(aL).getGeom();
        }
      }]);

      return ai;
    }())();
  return {
    union: function (ai) {
      for (var aj = arguments.length, ak = new Array(aj > 1 ? aj - 1 : 0), al = 1; al < aj; al++) ak[al - 1] = arguments[al];
      return ag.run('union', ai, ak);
    },
    intersection: function (ai) {
      for (var aj = arguments.length, ak = new Array(aj > 1 ? aj - 1 : 0), al = 1; al < aj; al++) ak[al - 1] = arguments[al];
      return ag.run('intersection', ai, ak);
    },
    xor: function (ai) {
      for (var aj = arguments.length, ak = new Array(aj > 1 ? aj - 1 : 0), al = 1; al < aj; al++) ak[al - 1] = arguments[al];
      return ag.run('xor', ai, ak);
    },
    difference: function (ai) {
      for (var aj = arguments.length, ak = new Array(aj > 1 ? aj - 1 : 0), al = 1; al < aj; al++) ak[al - 1] = arguments[al];
      return ag.run('difference', ai, ak);
    }
  };
});
! function (c, d) {
  'object' == typeof exports ? module.exports = d(c) : 'function' == typeof define && define.amd ? define('colors', [], function () {
    return d(c);
  }) : c.Colors = d(c);
}(this, function (w, x) {
  'use strict';

  function y(S, T, U, V, W) {
    if ('string' == typeof T) {
      var T = R.txt2color(T);
      U = T.type;
      L[U] = T[U];
      W = W !== x ? W : T.alpha;
    } else if (T)
      for (var X in T) S[U][X] = G(T[X] / H[U][X][1], 0, 1);

    if (W !== x)
      S.alpha = G(+W, 0, 1);

    return A(U, V ? S : x);
  }

  function z(S, T, U) {
    var V = K.options.grey,
      W = {};

    W.RGB = {
      r: S.r,
      g: S.g,
      b: S.b
    };

    W.rgb = {
      r: T.r,
      g: T.g,
      b: T.b
    };

    W.alpha = U;
    W.equivalentGrey = J(V.r * S.r + V.g * S.g + V.b * S.b);

    W.rgbaMixBlack = E(T, {
      r: 0,
      g: 0,
      b: 0
    }, U, 1);

    W.rgbaMixWhite = E(T, {
      r: 1,
      g: 1,
      b: 1
    }, U, 1);

    W.rgbaMixBlack.luminance = D(W.rgbaMixBlack, true);
    W.rgbaMixWhite.luminance = D(W.rgbaMixWhite, true);

    if (K.options.customBG) {
      W.rgbaMixCustom = E(T, K.options.customBG, U, 1);
      W.rgbaMixCustom.luminance = D(W.rgbaMixCustom, true);
      K.options.customBG.luminance = D(K.options.customBG, true);
    }

    return W;
  }

  function A(S, T) {
    var U, V, W, X = T || L,
      Y = R,
      Z = K.options,
      a0 = H,
      a1 = X.RND,
      a2 = '',
      a3 = '',
      a4 = {
        hsl: 'hsv',
        rgb: S
      },
      a5 = a1.rgb;
    if (S !== 'alpha') {
      for (var a6 in a0)
        if (!a0[a6][a6]) {
          if (S !== a6) {
            a3 = a4[a6] || 'rgb';
            X[a6] = Y[a3 + '2' + a6](X[a3]);
          }

          a1[a6] || (a1[a6] = {});
          U = X[a6];
          for (a2 in U) a1[a6][a2] = J(U[a2] * a0[a6][a2][1]);
        }
      a5 = a1.rgb;
      X.HEX = Y.RGB2HEX(a5);
      X.equivalentGrey = Z.grey.r * X.rgb.r + Z.grey.g * X.rgb.g + Z.grey.b * X.rgb.b;
      X.webSave = V = B(a5, 51);
      X.webSmart = W = B(a5, 17);
      X.saveColor = a5.r === V.r && a5.g === V.g && a5.b === V.b ? 'web save' : a5.r === W.r && a5.g === W.g && a5.b === W.b ? 'web smart' : '';
      X.hueRGB = R.hue2RGB(X.hsv.h);

      if (T)
        X.background = z(a5, X.rgb, X.alpha);
    }
    var a7, a8, a9, aa = X.rgb,
      ab = X.alpha,
      ac = 'luminance',
      ad = X.background;

    a7 = E(aa, {
      r: 0,
      g: 0,
      b: 0
    }, ab, 1);

    a7[ac] = D(a7, true);
    X.rgbaMixBlack = a7;

    a8 = E(aa, {
      r: 1,
      g: 1,
      b: 1
    }, ab, 1);

    a8[ac] = D(a8, true);
    X.rgbaMixWhite = a8;

    if (Z.customBG) {
      a9 = E(aa, ad.rgbaMixCustom, ab, 1);
      a9[ac] = D(a9, true);
      a9.WCAG2Ratio = F(a9[ac], ad.rgbaMixCustom[ac]);
      X.rgbaMixBGMixCustom = a9;
      a9.luminanceDelta = I.abs(a9[ac] - ad.rgbaMixCustom[ac]);
      a9.hueDelta = C(ad.rgbaMixCustom, a9, true);
    }

    X.RGBLuminance = D(a5);
    X.HUELuminance = D(X.hueRGB);

    if (Z.convertCallback)
      Z.convertCallback(X, S);

    return X;
  }

  function B(S, T) {
    var U = {},
      V = 0,
      W = T / 2;
    for (var X in S) V = S[X] % T, U[X] = S[X] + (V > W ? T - V : -V);
    return U;
  }

  function C(S, T, U) {
    return (I.max(S.r - T.r, T.r - S.r) + I.max(S.g - T.g, T.g - S.g) + I.max(S.b - T.b, T.b - S.b)) * (U ? 255 : 1) / 765;
  }

  function D(S, T) {
    for (var U = T ? 1 : 255, V = [S.r / U, S.g / U, S.b / U], W = K.options.luminance, X = V.length; X--;) V[X] = V[X] <= 0.03928 ? V[X] / 12.92 : I.pow((V[X] + 0.055) / 1.055, 2.4);
    return W.r * V[0] + W.g * V[1] + W.b * V[2];
  }

  function E(S, T, U, V) {
    var W = {},
      X = U !== x ? U : 1,
      Y = V !== x ? V : 1,
      Z = X + Y * (1 - X);
    for (var a0 in S) W[a0] = (S[a0] * X + T[a0] * Y * (1 - X)) / Z;
    W.a = Z;
    return W;
  }

  function F(S, T) {
    var U = 1;
    U = S >= T ? (S + 0.05) / (T + 0.05) : (T + 0.05) / (S + 0.05);
    return J(100 * U) / 100;
  }

  function G(S, T, U) {
    return S > U ? U : T > S ? T : S;
  }
  var H = {
      rgb: {
        r: [0, 255],
        g: [0, 255],
        b: [0, 255]
      },
      hsv: {
        h: [0, 360],
        s: [0, 100],
        v: [0, 100]
      },
      hsl: {
        h: [0, 360],
        s: [0, 100],
        l: [0, 100]
      },
      alpha: {
        alpha: [0, 1]
      },
      HEX: {
        HEX: [0, 16777215]
      }
    },
    I = w.Math,
    J = I.round,
    K = {},
    L = {},
    M = {
      r: 0.298954,
      g: 0.586434,
      b: 0.114612
    },
    N = {
      r: 0.2126,
      g: 0.7152,
      b: 0.0722
    },
    O = function (S) {
      this.colors = {
        RND: {}
      };

      this.options = {
        color: 'rgba(0,0,0,0)',
        grey: M,
        luminance: N,
        valueRanges: H
      };

      P(this, S || {});
    },
    P = function (S, T) {
      var U, V = S.options;
      Q(S);
      for (var W in T)
        if (T[W] !== x)
          V[W] = T[W];
      U = V.customBG;
      V.customBG = 'string' == typeof U ? R.txt2color(U).rgb : U;
      L = y(S.colors, V.color, x, true);
    },
    Q = function (S) {
      if (K !== S) {
        K = S;
        L = S.colors;
      }
    };

  O.prototype.setColor = function (S, T, U) {
    Q(this);
    return S ? y(this.colors, S, T, x, U) : (U !== x && (this.colors.alpha = G(U, 0, 1)), A(T));
  };

  O.prototype.setCustomBackground = function (S) {
    Q(this);
    this.options.customBG = 'string' == typeof S ? R.txt2color(S).rgb : S;
    return y(this.colors, x, 'rgb');
  };

  O.prototype.saveAsBackground = function () {
    Q(this);
    return y(this.colors, x, 'rgb', true);
  };

  O.prototype.toString = function (S, T) {
    return R.color2text((S || 'rgb').toLowerCase(), this.colors, T);
  };

  var R = {
    txt2color: function (S) {
      var T = {},
        U = S.replace(/(?:#|\)|%)/g, '').split('('),
        V = (U[1] || '').split(/,\s*/),
        W = U[1] ? U[0].substr(0, 3) : 'rgb',
        X = '';
      if (T.type = W, T[W] = {}, U[1])
        for (var Y = 3; Y--;) {
          X = W[Y] || W.charAt(Y);
          T[W][X] = +V[Y] / H[W][X][1];
        }
      else T.rgb = R.HEX2rgb(U[0]);
      T.alpha = V[3] ? +V[3] : 1;
      return T;
    },
    color2text: function (S, T, U) {
      var V = U !== false && J(100 * T.alpha) / 100,
        W = 'number' == typeof V && U !== false && (U || V !== 1),
        X = T.RND.rgb,
        Y = T.RND.hsl,
        Z = S === 'hex' && W,
        a0 = S === 'hex' && !Z,
        a1 = S === 'rgb' || Z,
        a2 = a1 ? X.r + ', ' + X.g + ', ' + X.b : a0 ? '#' + T.HEX : Y.h + ', ' + Y.s + '%, ' + Y.l + '%';
      return a0 ? a2 : (Z ? 'rgb' : S) + (W ? 'a' : '') + '(' + a2 + (W ? ', ' + V : '') + ')';
    },
    RGB2HEX: function (S) {
      return ((S.r < 16 ? '0' : '') + S.r.toString(16) + (S.g < 16 ? '0' : '') + S.g.toString(16) + (S.b < 16 ? '0' : '') + S.b.toString(16)).toUpperCase();
    },
    HEX2rgb: function (S) {
      S = S.split('');

      return {
        r: +('0x' + S[0] + S[S[3] ? 1 : 0]) / 255,
        g: +('0x' + S[S[3] ? 2 : 1] + (S[3] || S[1])) / 255,
        b: +('0x' + (S[4] || S[2]) + (S[5] || S[2])) / 255
      };
    },
    hue2RGB: function (S) {
      var T = 6 * S,
        U = ~~T % 6,
        V = T === 6 ? 0 : T - U;
      return {
        r: J(255 * [1, 1 - V, 0, 0, V, 1][U]),
        g: J(255 * [V, 1, 1, 1 - V, 0, 0][U]),
        b: J(255 * [0, 0, V, 1, 1, 1 - V][U])
      };
    },
    rgb2hsv: function (S) {
      var T, U, V, W = S.r,
        X = S.g,
        Y = S.b,
        Z = 0;

      if (Y > X) {
        X = Y + (Y = X, 0);
        Z = -1;
      }

      U = Y;

      if (X > W) {
        W = X + (X = W, 0);
        Z = -2 / 6 - Z;
        U = I.min(X, Y);
      }

      T = W - U;
      V = W ? T / W : 0;

      return {
        h: V < 1e-15 ? L && L.hsl && L.hsl.h || 0 : T ? I.abs(Z + (X - Y) / (6 * T)) : 0,
        s: W ? T / W : L && L.hsv && L.hsv.s || 0,
        v: W
      };
    },
    hsv2rgb: function (S) {
      var T = 6 * S.h,
        U = S.s,
        V = S.v,
        W = ~~T,
        X = T - W,
        Y = V * (1 - U),
        Z = V * (1 - X * U),
        a0 = V * (1 - (1 - X) * U),
        a1 = W % 6;
      return {
        r: [V, Z, Y, Y, a0, V][a1],
        g: [a0, V, V, Z, Y, Y][a1],
        b: [Y, Y, a0, V, V, Z][a1]
      };
    },
    hsv2hsl: function (S) {
      var T = (2 - S.s) * S.v,
        U = S.s * S.v;
      U = S.s ? T < 1 ? T ? U / T : 0 : U / (2 - T) : 0;

      return {
        h: S.h,
        s: S.v || U ? U : L && L.hsl && L.hsl.s || 0,
        l: T / 2
      };
    },
    rgb2hsl: function (S, T) {
      var U = R.rgb2hsv(S);
      return R.hsv2hsl(T ? U : L.hsv = U);
    },
    hsl2rgb: function (S) {
      var T = 6 * S.h,
        U = S.s,
        V = S.l,
        W = V < 0.5 ? V * (1 + U) : V + U - U * V,
        X = V + V - W,
        Y = W ? (W - X) / W : 0,
        Z = ~~T,
        a0 = T - Z,
        a1 = W * Y * a0,
        a2 = X + a1,
        a3 = W - a1,
        a4 = Z % 6;
      return {
        r: [W, a3, X, X, a2, W][a4],
        g: [a2, W, W, a3, X, X][a4],
        b: [X, X, a2, W, W, a3][a4]
      };
    }
  };
  return O;
}),
function (c, d) {
  'object' == typeof exports ? module.exports = d(c, require('jquery'), require('colors')) : 'function' == typeof define && define.amd ? define(['jquery', 'colors'], function (f, g) {
    return d(c, f, g);
  }) : d(c, c.jQuery, c.Colors);
}(this, function (K, L, M, N) {
  'use strict';

  function O(ak) {
    return ak.value || ak.getAttribute('value') || L(ak).css('background-color') || '#FFF';
  }

  function P(ak) {
    ak = ak.originalEvent && ak.originalEvent.touches ? ak.originalEvent.touches[0] : ak;
    return ak.originalEvent ? ak.originalEvent : ak;
  }

  function Q(ak) {
    return L(ak.find(a1.doRender)[0] || ak[0]);
  }

  function R(ak) {
    var al = L(this),
      am = al.offset(),
      an = L(K),
      ao = a1.gap;
    ak ? (a2 = Q(al), a2._colorMode = a2.data('colorMode'), Z.$trigger = al, (a3 || S()).css(a1.positionCallback.call(Z, al) || {
      left: (a3._left = am.left) - ((a3._left += a3._width - (an.scrollLeft() + an.width())) + ao > 0 ? a3._left + ao : 0),
      top: (a3._top = am.top + al.outerHeight()) - ((a3._top += a3._height - (an.scrollTop() + an.height())) + ao > 0 ? a3._top + ao : 0)
    }).show(a1.animationSpeed, function () {
      if (ak !== true) {
        a8.toggle(!!a1.opacity)._width = a8.width();
        a5._width = a5.width();
        a5._height = a5.height();
        a4._height = a4.height();
        a0.setColor(O(a2[0]));
        X(true);
      }
    }).off('.tcp').on(ad, '.cp-xy-slider,.cp-z-slider,.cp-alpha', T)) : Z.$trigger && L(a3).hide(a1.animationSpeed, function () {
      X(false);
      Z.$trigger = null;
    }).off('.tcp');
  }

  function S() {
    L('head')[a1.cssPrepend ? 'prepend' : 'append']('<style type=\"text/css\" id=\"tinyColorPickerStyles\">' + (a1.css || ai) + (a1.cssAddon || '') + '</style>');

    return L(ah).css({
      margin: a1.margin
    }).appendTo('body').show(0, function () {
      Z.$UI = a3 = L(this);
      af = a1.GPU && a3.css('perspective') !== N;
      a4 = L('.cp-z-slider', this);
      a5 = L('.cp-xy-slider', this);
      a6 = L('.cp-xy-cursor', this);
      a7 = L('.cp-z-cursor', this);
      a8 = L('.cp-alpha', this);
      a9 = L('.cp-alpha-cursor', this);
      a1.buildCallback.call(Z, a3);
      a3.prepend('<div>').children().eq(0).css('width', a3.children().eq(0).width());
      a3._width = this.offsetWidth;
      a3._height = this.offsetHeight;
    }).hide();
  }

  function T(ak) {
    var al = this.className.replace(/cp-(.*?)(?:\s*|$)/, '$1').replace('-', '_');
    (ak.button || ak.which) > 1 || (ak.preventDefault && ak.preventDefault(), ak.returnValue = false, a2._offset = L(this).offset(), (al = al === 'xy_slider' ? U : al === 'z_slider' ? V : W)(ak), X(), aa.on(ae, function () {
      aa.off('.tcp');
    }).on(ac, function (am) {
      al(am);
      X();
    }));
  }

  function U(ak) {
    var al = P(ak),
      am = al.pageX - a2._offset.left,
      an = al.pageY - a2._offset.top;
    a0.setColor({
      s: am / a5._width * 100,
      v: 100 - an / a5._height * 100
    }, 'hsv');
  }

  function V(ak) {
    var al = P(ak).pageY - a2._offset.top;
    a0.setColor({
      h: 360 - al / a4._height * 360
    }, 'hsv');
  }

  function W(ak) {
    var al = P(ak).pageX - a2._offset.left,
      am = al / a8._width;
    a0.setColor({}, 'rgb', am);
  }

  function X(ak) {
    var al = a0.colors,
      am = al.hueRGB,
      an = (al.RND.rgb, al.RND.hsl, a1.dark),
      ao = a1.light,
      ap = a0.toString(a2._colorMode, a1.forceAlpha),
      aq = al.HUELuminance > 0.22 ? an : ao,
      ar = al.rgbaMixBlack.luminance > 0.22 ? an : ao,
      as = (1 - al.hsv.h) * a4._height,
      at = al.hsv.s * a5._width,
      au = (1 - al.hsv.v) * a5._height,
      av = al.alpha * a8._width,
      aw = af ? 'translate3d' : '',
      ax = a2[0].value,
      ay = a2[0].hasAttribute('value') && ax === '' && ak !== N;

    a5._css = {
      backgroundColor: 'rgb(' + am.r + ',' + am.g + ',' + am.b + ')'
    };

    a6._css = {
      transform: aw + '(' + at + 'px, ' + au + 'px, 0)',
      left: af ? '' : at,
      top: af ? '' : au,
      borderColor: al.RGBLuminance > 0.22 ? an : ao
    };

    a7._css = {
      transform: aw + '(0, ' + as + 'px, 0)',
      top: af ? '' : as,
      borderColor: 'transparent ' + aq
    };

    a8._css = {
      backgroundColor: '#' + al.HEX
    };

    a9._css = {
      transform: aw + '(' + av + 'px, 0, 0)',
      left: af ? '' : av,
      borderColor: ar + ' transparent'
    };

    a2._css = {
      backgroundColor: ay ? '' : ap,
      color: ay ? '' : al.rgbaMixBGMixCustom.luminance > 0.22 ? an : ao
    };

    a2.text = ay ? '' : ax !== ap ? ap : '';
    ak !== N ? Y(ak) : ag(Y);
  }

  function Y(ak) {
    a5.css(a5._css);
    a6.css(a6._css);
    a7.css(a7._css);
    a8.css(a8._css);
    a9.css(a9._css);

    if (a1.doRender)
      a2.css(a2._css);

    if (a2.text)
      a2.val(a2.text);

    a1.renderCallback.call(Z, a2, 'boolean' == typeof ak ? ak : N);
  }
  var Z, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, aa = L(document),
    ab = L(),
    ac = 'touchmove.tcp mousemove.tcp pointermove.tcp',
    ad = 'touchstart.tcp mousedown.tcp pointerdown.tcp',
    ae = 'touchend.tcp mouseup.tcp pointerup.tcp',
    af = false,
    ag = K.requestAnimationFrame || K.webkitRequestAnimationFrame || function (ak) {
      ak();
    },
    ah = '<div class=\"cp-color-picker\"><div class=\"cp-z-slider\"><div class=\"cp-z-cursor\"></div></div><div class=\"cp-xy-slider\"><div class=\"cp-white\"></div><div class=\"cp-xy-cursor\"></div></div><div class=\"cp-alpha\"><div class=\"cp-alpha-cursor\"></div></div></div>',
    ai = '.cp-color-picker{position:absolute;overflow:hidden;padding:6px 6px 0;background-color:#444;color:#bbb;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:400;cursor:default;border-radius:5px}.cp-color-picker>div{position:relative;overflow:hidden}.cp-xy-slider{float:left;height:128px;width:128px;margin-bottom:6px;background:linear-gradient(to right,#FFF,rgba(255,255,255,0))}.cp-white{height:100%;width:100%;background:linear-gradient(rgba(0,0,0,0),#000)}.cp-xy-cursor{position:absolute;top:0;width:10px;height:10px;margin:-5px;border:1px solid #fff;border-radius:100%;box-sizing:border-box}.cp-z-slider{float:right;margin-left:6px;height:128px;width:20px;background:linear-gradient(red 0,#f0f 17%,#00f 33%,#0ff 50%,#0f0 67%,#ff0 83%,red 100%)}.cp-z-cursor{position:absolute;margin-top:-4px;width:100%;border:4px solid #fff;border-color:transparent #fff;box-sizing:border-box}.cp-alpha{clear:both;width:100%;height:16px;margin:6px 0;background:linear-gradient(to right,#444,rgba(0,0,0,0))}.cp-alpha-cursor{position:absolute;margin-left:-4px;height:100%;border:4px solid #fff;border-color:#fff transparent;box-sizing:border-box}',
    aj = function (ak) {
      a0 = this.color = new M(ak);
      a1 = a0.options;
      Z = this;
    };

  aj.prototype = {
    render: X,
    toggle: R
  };

  L.fn.colorPicker = function (ak) {
    var al = this,
      am = function () {};

    ak = L.extend({
      animationSpeed: 150,
      GPU: true,
      doRender: true,
      customBG: '#FFF',
      opacity: true,
      renderCallback: am,
      buildCallback: am,
      positionCallback: am,
      body: document.body,
      scrollResize: true,
      gap: 4,
      dark: '#222',
      light: '#DDD'
    }, ak);

    if (!Z && ak.scrollResize) L(K).on('resize.tcp scroll.tcp', function () {
      if (Z.$trigger)
        Z.toggle.call(Z.$trigger[0], true);
    });

    ab = ab.add(this);
    this.colorPicker = Z || new aj(ak);
    this.options = ak;

    L(ak.body).off('.tcp').on(ad, function (an) {
      if (-1 === ab.add(a3).add(L(a3).find(an.target)).index(an.target))
        R();
    });

    return this.on('focusin.tcp click.tcp', function (an) {
      Z.color.options = L.extend(Z.color.options, a1 = al.options);
      R.call(this, an);
    }).on('change.tcp', function () {
      a0.setColor(this.value || '#FFF');
      al.colorPicker.render(true);
    }).each(function () {
      var an = O(this),
        ao = an.split('('),
        ap = Q(L(this));
      ap.data('colorMode', ao[1] ? ao[0].substr(0, 3) : 'HEX').attr('readonly', a1.preventFocus);

      if (ak.doRender) ap.css({
        'background-color': an,
        color: function () {
          return a0.setColor(an).rgbaMixBGMixCustom.luminance > 0.22 ? ak.dark : ak.light;
        }
      });
    });
  };

  L.fn.colorPicker.destroy = function () {
    L('*').off('.tcp');
    Z.toggle(false);
    ab = L();
  };
});