//@ts-nocheck
// export interface BusuanziData {
//   site_pv?: number;
//   page_pv?: number;
//   site_uv?: number;
//   page_uv?: number;
// }
//
// interface BusuanziCaller {
//   fetch: (url: string, callback: (data: BusuanziData) => void) => void;
//   evalCall: (callback: (data: BusuanziData) => void) => (data: BusuanziData) => void;
// }
//
// let bszCaller: BusuanziCaller;
// let scriptTag: HTMLScriptElement | null = null;
// let ready: (callback: () => void) => void;
// let e: () => void;
// let n: () => void;
// let a = false;
// let c: Array<() => void> = [];
//
// // 修复Node同构代码的问题
// if (typeof document !== "undefined") {
//   ready = function (t: () => void) {
//     return (
//       a || document.readyState === "interactive" || document.readyState === "complete"
//         ? t.call(document)
//         : c.push(function () {
//             return t.call(this);
//           }),
//       this
//     );
//   };
//   e = function () {
//     for (let t = 0, e = c.length; t < e; t++) c[t].apply(document);
//     c = [];
//   };
//   n = function () {
//     if (!a) {
//       a = true;
//       e.call(window);
//       if (document.removeEventListener) {
//         document.removeEventListener("DOMContentLoaded", n, false);
//       } else if (document.attachEvent) {
//         document.detachEvent("onreadystatechange", n);
//         if (window === window.top) {
//           clearInterval(t);
//           t = null;
//         }
//       }
//     }
//   };
//   if (document.addEventListener) {
//     document.addEventListener("DOMContentLoaded", n, false);
//   } else if (document.attachEvent) {
//     document.attachEvent("onreadystatechange", function () {
//       if (/loaded|complete/.test(document.readyState)) n();
//     });
//     if (window === window.top) {
//       let t = setInterval(function () {
//         try {
//           if (!a) document.documentElement.doScroll("left");
//         } catch (t) {
//           return;
//         }
//         n();
//       }, 5);
//     }
//   }
// }
//
// bszCaller = {
//   fetch: function (t: string, e: (data: BusuanziData) => void) {
//     const n = "BusuanziCallback_" + Math.floor(1099511627776 * Math.random());
//     t = t.replace("=BusuanziCallback", "=" + n);
//     scriptTag = document.createElement("SCRIPT");
//     scriptTag.type = "text/javascript";
//     scriptTag.defer = true;
//     scriptTag.src = t;
//     document.getElementsByTagName("HEAD")[0].appendChild(scriptTag);
//     window[n] = this.evalCall(e);
//   },
//   evalCall: function (e: (data: BusuanziData) => void) {
//     return function (t: BusuanziData) {
//       ready(function () {
//         try {
//           e(t);
//           if (scriptTag && scriptTag.parentElement && scriptTag.parentElement.removeChild) {
//             scriptTag.parentElement.removeChild(scriptTag);
//           }
//         } catch (t) {
//           console.log(t);
//         }
//       });
//     };
//   },
// };
//
// const bszTag = {
//   bszs: ["site_pv", "site_uv", "page_pv", "page_uv"],
//   texts: function (n) {
//     this.bszs.map(function (t) {
//       const e = document.getElementById("busuanzi_" + t);
//       e && (e.innerHTML = n[t]);
//     });
//   },
//   hides: function () {
//     this.bszs.map(function (t) {
//       const e = document.getElementById("busuanzi_container_" + t);
//       e && (e.style.display = "none");
//     });
//   },
//   shows: function () {
//     this.bszs.map(function (t) {
//       const e = document.getElementById("busuanzi_container_" + t);
//       e && (e.style.display = "inline");
//     });
//   },
// };
//
//
// export default () => {
//     bszCaller.fetch("//busuanzi.9420.ltd/api", function (t) {
//       bszTag.texts(t)
//       bszTag.shows();
//     })
// };



/**
 *
 * 避免 SSR 期间访问 document 和 window：用 typeof window !== "undefined" 进行判断。
 * 确保 fetch 代码只在客户端运行。
 * 避免直接在模块顶层执行副作用代码（如 document.addEventListener），应该等到组件挂载后执行。
 *
 */


export interface BusuanziData {
  site_pv?: number;
  site_uv?: number;
  page_pv?: number;
  page_uv?: number;
}

interface BusuanziCaller {
  fetch: (url: string, callback: (data: BusuanziData) => void) => void;
  evalCall: (callback: (data: BusuanziData) => void) => (data: BusuanziData) => void;
}

let bszCaller: BusuanziCaller;
let scriptTag: HTMLScriptElement | null = null;

// 只在浏览器环境下执行
if (typeof window !== "undefined") {
  let ready: (callback: () => void) => void;
  let e: () => void;
  let n: () => void;
  let a = false;
  let c: Array<() => void> = [];

  ready = function (t: () => void) {
    return (
        a || document.readyState === "interactive" || document.readyState === "complete"
            ? t.call(document)
            : c.push(() => t.call(document)),
            this
    );
  };

  e = function () {
    for (let t = 0, len = c.length; t < len; t++) c[t].apply(document);
    c = [];
  };

  n = function () {
    if (!a) {
      a = true;
      e.call(window);
      document.removeEventListener("DOMContentLoaded", n, false);
    }
  };

  document.addEventListener("DOMContentLoaded", n, false);

  bszCaller = {
    fetch: function (t: string, e: (data: BusuanziData) => void) {
      const callbackName = "BusuanziCallback_" + Math.floor(1099511627776 * Math.random());
      t = t.replace("=BusuanziCallback", "=" + callbackName);
      scriptTag = document.createElement("script");
      scriptTag.type = "text/javascript";
      scriptTag.defer = true;
      scriptTag.src = t;
      document.getElementsByTagName("HEAD")[0].appendChild(scriptTag);
      (window as any)[callbackName] = this.evalCall(e);
    },
    evalCall: function (e: (data: BusuanziData) => void) {
      return function (t: BusuanziData) {
        ready(function () {
          try {
            e(t);
            if (scriptTag?.parentElement) {
              scriptTag.parentElement.removeChild(scriptTag);
            }
          } catch (err) {
            console.error(err);
          }
        });
      };
    },
  };
}

const bszTag = {
  bszs: ["site_pv", "site_uv", "page_pv", "page_uv"],
  texts(n: BusuanziData) {
    if (typeof document !== "undefined") {
      this.bszs.forEach((t) => {
        const e = document.getElementById("busuanzi_" + t);
        e && (e.innerHTML = String(n[t] ?? ""));
      });
    }
  },
  hides() {
    if (typeof document !== "undefined") {
      this.bszs.forEach((t) => {
        const e = document.getElementById("busuanzi_container_" + t);
        e && (e.style.display = "none");
      });
    }
  },
  shows() {
    if (typeof document !== "undefined") {
      this.bszs.forEach((t) => {
        const e = document.getElementById("busuanzi_container_" + t);
        e && (e.style.display = "inline");
      });
    }
  },
};

export default () => {
  if (typeof window !== "undefined") {
    bszCaller.fetch("//busuanzi.9420.ltd/js", function (t) {
      bszTag.texts(t);
      bszTag.shows();
    });
  }
};
