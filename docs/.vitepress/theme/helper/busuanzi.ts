// @ts-nocheck
export interface BusuanziData {
  site_pv?: number;
  page_pv?: number;
  site_uv?: number;
}

interface BusuanziCaller {
  fetch: (url: string, callback: (data: BusuanziData) => void) => void;
  evalCall: (callback: (data: BusuanziData) => void) => (data: BusuanziData) => void;
}

let bszCaller: BusuanziCaller;
let scriptTag: HTMLScriptElement | null = null;
let ready: (callback: () => void) => void;
let e: () => void;
let n: () => void;
let a = false;
let c: Array<() => void> = [];

// 修复Node同构代码的问题
if (typeof document !== "undefined") {
  ready = function (t: () => void) {
    return (
      a || document.readyState === "interactive" || document.readyState === "complete"
        ? t.call(document)
        : c.push(function () {
            return t.call(this);
          }),
      this
    );
  };
  e = function () {
    for (let t = 0, e = c.length; t < e; t++) c[t].apply(document);
    c = [];
  };
  n = function () {
    if (!a) {
      a = true;
      e.call(window);
      if (document.removeEventListener) {
        document.removeEventListener("DOMContentLoaded", n, false);
      } else if (document.attachEvent) {
        document.detachEvent("onreadystatechange", n);
        if (window === window.top) {
          clearInterval(t);
          t = null;
        }
      }
    }
  };
  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", n, false);
  } else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", function () {
      if (/loaded|complete/.test(document.readyState)) n();
    });
    if (window === window.top) {
      let t = setInterval(function () {
        try {
          if (!a) document.documentElement.doScroll("left");
        } catch (t) {
          return;
        }
        n();
      }, 5);
    }
  }
}

bszCaller = {
  fetch: function (t: string, e: (data: BusuanziData) => void) {
    const n = "BusuanziCallback_" + Math.floor(1099511627776 * Math.random());
    t = t.replace("=BusuanziCallback", "=" + n);
    scriptTag = document.createElement("SCRIPT");
    scriptTag.type = "text/javascript";
    scriptTag.defer = true;
    scriptTag.src = t;
    document.getElementsByTagName("HEAD")[0].appendChild(scriptTag);
    window[n] = this.evalCall(e);
  },
  evalCall: function (e: (data: BusuanziData) => void) {
    return function (t: BusuanziData) {
      ready(function () {
        try {
          e(t);
          if (scriptTag && scriptTag.parentElement && scriptTag.parentElement.removeChild) {
            scriptTag.parentElement.removeChild(scriptTag);
          }
        } catch (t) {
          console.log(t);
        }
      });
    };
  },
};

export default bszCaller;
