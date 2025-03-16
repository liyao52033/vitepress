// import { onBeforeUnmount, ref, unref } from "vue";
// import bszCaller from "../helper/busuanzi";
//
// export interface BusuanziData {
//   site_pv: number;
//   page_pv: number;
//   site_uv: number;
// }
//
// export const useBuSunZi = (iterationTime = 2000) => {
//   const sitePv = ref(9999);
//   const siteUv = ref(9999);
//   const pagePv = ref(9999);
//   const isGet = ref(false);
//
//   const request = () => {
//     // 调用不蒜子接口
//     bszCaller.fetch("//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback", data => {
//       sitePv.value = data.site_pv || unref(sitePv);
//       siteUv.value = data.site_uv || unref(siteUv);
//       pagePv.value = data.page_pv || unref(pagePv);
//       isGet.value = true;
//     });
//   };
//
//   // 第一次调用
//   request();
//
//   let interval: NodeJS.Timeout;
//   let i = 0;
//   // 如果第一次调用获取失败，每 3s 后重新调用，直至尝试 5 次或调用成功
//   interval = setInterval(() => {
//     if (!unref(isGet)) {
//       i += iterationTime;
//       if (i > iterationTime * 5) clearInterval(interval);
//       request();
//     } else clearInterval(interval);
//   }, iterationTime);
//
//   onBeforeUnmount(() => {
//     if (interval) clearInterval(interval);
//   });
//
//   return { sitePv, siteUv, pagePv, isGet };
// };

import { onBeforeUnmount, ref, unref, onMounted } from "vue";
import bszCaller from "../helper/busuanzi";

export interface BusuanziData {
  site_pv: number;
  page_pv: number;
  site_uv: number;
}

export const useBuSunZi = (iterationTime = 2000) => {
  const sitePv = ref(9999);
  const siteUv = ref(9999);
  const pagePv = ref(9999);
  const isGet = ref(false);
  let interval: NodeJS.Timeout;

  const request = () => {
    if (typeof window === "undefined") return; // 确保只在客户端执行

    bszCaller.fetch("//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback", data => {
      sitePv.value = data.site_pv || unref(sitePv);
      siteUv.value = data.site_uv || unref(siteUv);
      pagePv.value = data.page_pv || unref(pagePv);
      isGet.value = true;
    });
  };

  onMounted(() => {
    request(); // 组件挂载后才调用

    let i = 0;
    interval = setInterval(() => {
      if (!unref(isGet)) {
        i += iterationTime;
        if (i > iterationTime * 5) clearInterval(interval);
        request();
      } else clearInterval(interval);
    }, iterationTime);
  });

  onBeforeUnmount(() => {
    if (interval) clearInterval(interval);
  });

  return { sitePv, siteUv, pagePv, isGet };
};

