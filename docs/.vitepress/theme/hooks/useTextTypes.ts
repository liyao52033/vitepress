import { ref, unref } from "vue";

export interface TypesOption {
  typesInTime?: number;
  typesOutTime?: number;
  typesNextTime?: number;
}

export const useTextTypes = (typesArray: string[], option?: TypesOption) => {
  const typesInTime = option?.typesInTime || 200;
  const typesOutTime = option?.typesOutTime || 100;
  const typesNextTime = option?.typesNextTime || 800;

  const text = ref("");
  const shouldAnimate = ref(false);

  let originText = "";
  let typesInInterval: NodeJS.Timeout;
  let typesOutInterval: NodeJS.Timeout;
  // 为 originText 的长度服务
  let index = 0;
  // 为 typesArray 组下标服务
  let length = 0;

  /**
   * 打字
   */
  const typesIn = () => {
    // 打字时，关闭动画效果
    shouldAnimate.value = false;
    originText = unref(typesArray)[length];

    // 防止 originText 为空的情况
    if (!originText) return;

    text.value = originText.substring(0, index++);

    if (index > originText.length) {
      if (typesInInterval) clearInterval(typesInInterval);
      // 打字结束，开启动画效果
      shouldAnimate.value = true;
      setTimeout(() => {
        typesOutInterval = setInterval(() => {
          typesOut();
        }, typesOutTime);
      }, typesNextTime);
    }
  };
  /**
   * 删字
   */
  const typesOut = () => {
    if (index >= 0) {
      // 删字时，关闭动画效果
      shouldAnimate.value = false;
      text.value = originText.substring(0, index--);
    } else {
      if (typesOutInterval) clearInterval(typesOutInterval);
      // 删字结束，开启动画效果
      shouldAnimate.value = true;

      setTimeout(() => {
        length++;
        // typesArray 展示完，重新开始计数
        if (length >= unref(typesArray).length) length = 0;

        typesInInterval = setInterval(() => {
          typesIn();
        }, typesInTime);
      }, typesNextTime);
    }
  };

  /**
   * 开始打字
   */
  const startTypes = () => {
    shouldAnimate.value = false;
    typesInInterval = setInterval(() => {
      typesIn();
    }, typesInTime);
  };

  /**
   * 停止打字
   */
  const stopTypes = () => {
    if (typesInInterval) clearInterval(typesInInterval);
    if (typesOutInterval) clearInterval(typesOutInterval);
    shouldAnimate.value = false;
  };

  return { text, shouldAnimate, startTypes, stopTypes };
};
