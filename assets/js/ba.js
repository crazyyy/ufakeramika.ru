(function (e) {
  var t = 2;
  var n = (document.location.protocol == "https:" ? "https://" : "http://") + "bitrix.info/bx_stat";
  var r = {
    host: null,
    aid: null
  };
  var o = s(r);
  var i = C();
  var a = p();
  var c = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (e) {
      var t = "";
      var n, r, o, i, a, u, d;
      var f = 0;
      e = c._utf8_encode(e);
      while (f < e.length) {
        n = e.charCodeAt(f++);
        r = e.charCodeAt(f++);
        o = e.charCodeAt(f++);
        i = n >> 2;
        a = (n & 3) << 4 | r >> 4;
        u = (r & 15) << 2 | o >> 6;
        d = o & 63;
        if (isNaN(r)) {
          u = d = 64
        } else if (isNaN(o)) {
          d = 64
        }
        t = t + this._keyStr.charAt(i) + this._keyStr.charAt(a) + this._keyStr.charAt(u) + this._keyStr.charAt(d)
      }
      return t
    },
    decode: function (e) {
      var t = "";
      var n, r, o;
      var i, a, u, d;
      var f = 0;
      e = e.replace(/[^A-Za-z0-9+\/=]/g, "");
      while (f < e.length) {
        i = this._keyStr.indexOf(e.charAt(f++));
        a = this._keyStr.indexOf(e.charAt(f++));
        u = this._keyStr.indexOf(e.charAt(f++));
        d = this._keyStr.indexOf(e.charAt(f++));
        n = i << 2 | a >> 4;
        r = (a & 15) << 4 | u >> 2;
        o = (u & 3) << 6 | d;
        t = t + String.fromCharCode(n);
        if (u != 64) {
          t = t + String.fromCharCode(r)
        }
        if (d != 64) {
          t = t + String.fromCharCode(o)
        }
      }
      t = c._utf8_decode(t);
      return t
    },
    _utf8_encode: function (e) {
      e = e.replace(/rn/g, "n");
      var t = "";
      for (var n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r)
        } else if (r > 127 && r < 2048) {
          t += String.fromCharCode(r >> 6 | 192);
          t += String.fromCharCode(r & 63 | 128)
        } else {
          t += String.fromCharCode(r >> 12 | 224);
          t += String.fromCharCode(r >> 6 & 63 | 128);
          t += String.fromCharCode(r & 63 | 128)
        }
      }
      return t
    },
    _utf8_decode: function (e) {
      var t = "";
      var n = 0;
      var r = c1 = c2 = 0;
      while (n < e.length) {
        r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r);
          n++
        } else if (r > 191 && r < 224) {
          c2 = e.charCodeAt(n + 1);
          t += String.fromCharCode((r & 31) << 6 | c2 & 63);
          n += 2
        } else {
          c2 = e.charCodeAt(n + 1);
          c3 = e.charCodeAt(n + 2);
          t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
          n += 3
        }
      }
      return t
    }
  };
  e._baq = e._baq || {};
  e._baq.setResponse = function (e) {
    var t = v("BX_USER_ID");
    if (t == undefined && !!e.uid) {
      var n = new Date((new Date).getTime() + 1e3 * 3600 * 24 * 365 * 10);
      document.cookie = "BX_USER_ID=" + e.uid + "; path=/; expires=" + n.toUTCString()
    }
  };
  if (l()) {
    if (i.domContentLoadedEventStart > 0) {
      u()
    } else if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", u, false)
    }
  }

  function u() {
    if ("withCredentials" in a) {
      f()
    } else {
      d()
    }
  }

  function d() {
    var e = document.createElement("script");
    e.type = "text/javascript";
    e.async = true;
    e.src = n + "?" + h();
    var t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(e, t)
  }

  function f() {
    a.open("POST", n, true);
    a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    a.withCredentials = true;
    a.onreadystatechange = function () {
      if (a.readyState == 4 && a.status == 200) {
        var t = JSON.parse(this.responseText);
        e._baq.setResponse(t)
      }
    };
    a.send(h())
  }

  function s(t) {
    if (!e._ba) {
      return ""
    }
    var n = "";
    for (var r = 0; r < e._ba.length; r++) {
      var o = e._ba[r];
      if (typeof t[o[0]] !== "undefined") {
        t[o[0]] = o[1]
      } else if (typeof o[1] === "function") {
        n += "&" + o[0] + "=" + encodeURIComponent(o[1]())
      } else {
        n += "&" + o[0] + "=" + encodeURIComponent(o[1])
      }
    }
    return n
  }

  function h() {
    var n = i.navigationStart;
    var a = document.title,
      u = document.getElementsByTagName("h1")[0],
      d = "";
    if (u) {
      d = g(u["textContent" in u ? "textContent" : "innerText"])
    }
    return "d=" + encodeURIComponent(e.location.host) + "&ru=" + encodeURIComponent(e.location.pathname) + "&dns=" + (i.domainLookupEnd - i.domainLookupStart) + "&tcp=" + (i.connectEnd - i.connectStart) + "&srt=" + (i.responseStart - i.requestStart) + "&pdt=" + (i.responseEnd - i.responseStart) + "&rrt=" + (i.fetchStart - n) + "&dit=" + (i.domInteractive - n) + "&clt=" + (i.domContentLoadedEventStart - n) + "&sr=" + e.screen.width + "x" + e.screen.height + "&prc=" + (i.domInteractive - i.domLoading) + "&com=" + (e.frameCacheVars ? "1" : "0") + "&tmz=" + (new Date).getTimezoneOffset() + "&xts=" + (new Date).getTime() + "&ver=" + t + "&aid=" + encodeURIComponent(r.aid) + "&ptitle_64=" + encodeURIComponent(c.encode(a)) + "&ph1_64=" + encodeURIComponent(c.encode(d)) + o
  }

  function l() {
    return a && i && i.navigationStart > 0 && e.location.host && m(r.host) && r.aid !== null && !(e.BX && e.BX.admin)
  }

  function m(t) {
    if (t === null || e.location.host === t) {
      return true
    }
    var n = _ba_punycode();
    return e.location.host === n.toUnicode(t)
  }

  function p() {
    if (e.XMLHttpRequest) {
      return new XMLHttpRequest
    } else if (e.ActiveXObject) {
      return new e.ActiveXObject("Microsoft.XMLHTTP")
    }
    return null
  }

  function C() {
    if (e.performance && e.performance.timing) {
      return e.performance.timing
    }
    return null
  }

  function v(e) {
    var t = document.cookie.match(new RegExp("(?:^|; )" + e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    return t ? decodeURIComponent(t[1]) : undefined
  }

  function g(e) {
    if (typeof e === "string") {
      e = e.replace(/^\s+|\s+$/g, "")
    }
    return e
  }
})(window);

function _ba_punycode() {
  var e = 2147483647,
    t = 36,
    n = 1,
    r = 26,
    o = 38,
    i = 700,
    a = 72,
    c = 128,
    u = "-",
    d = /^xn--/,
    f = /\x2E|\u3002|\uFF0E|\uFF61/g,
    s = t - n,
    h = Math.floor,
    l = String.fromCharCode;

  function m(e, t) {
    var n = e.length;
    while (n--) {
      e[n] = t(e[n])
    }
    return e
  }

  function p(e, t) {
    return m(e.split(f), t).join(".")
  }

  function C(e) {
    return m(e, function (e) {
      var t = "";
      if (e > 65535) {
        e -= 65536;
        t += l(e >>> 10 & 1023 | 55296);
        e = 56320 | e & 1023
      }
      t += l(e);
      return t
    }).join("")
  }

  function v(e) {
    if (e - 48 < 10) {
      return e - 22
    }
    if (e - 65 < 26) {
      return e - 65
    }
    if (e - 97 < 26) {
      return e - 97
    }
    return t
  }

  function g(e, n, a) {
    var c = 0;
    e = a ? h(e / i) : e >> 1;
    e += h(e / n);
    for (; e > s * r >> 1; c += t) {
      e = h(e / s)
    }
    return h(c + (s + 1) * e / (e + o))
  }

  function S(o) {
    var i = [],
      d = o.length,
      f, s = 0,
      l = c,
      m = a,
      p, S, _, A, y, w, x, R, E;
    p = o.lastIndexOf(u);
    if (p < 0) {
      p = 0
    }
    for (S = 0; S < p; ++S) {
      if (o.charCodeAt(S) >= 128) {
        return null
      }
      i.push(o.charCodeAt(S))
    }
    for (_ = p > 0 ? p + 1 : 0; _ < d;) {
      for (A = s, y = 1, w = t;; w += t) {
        if (_ >= d) {
          return null
        }
        x = v(o.charCodeAt(_++));
        if (x >= t || x > h((e - s) / y)) {
          return null
        }
        s += x * y;
        R = w <= m ? n : w >= m + r ? r : w - m;
        if (x < R) {
          break
        }
        E = t - R;
        if (y > h(e / E)) {
          return null
        }
        y *= E
      }
      f = i.length + 1;
      m = g(s - A, f, A == 0);
      if (h(s / f) > e - l) {
        return null
      }
      l += h(s / f);
      s %= f;
      i.splice(s++, 0, l)
    }
    return C(i)
  }

  function _(e) {
    return p(e, function (e) {
      return d.test(e) ? S(e.slice(4).toLowerCase()) : e
    })
  }
  return {
    toUnicode: _
  }
}
