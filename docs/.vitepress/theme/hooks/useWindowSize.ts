import { onMounted, onUnmounted, ref } from "vue";
import { useDebounce } from "./useDebounce";
import { inBrowser } from "vitepress";

export const useWindowSize = (sizeChangeCallback?: (width: number, height: number) => void | undefined) => {
  const width = ref(Number.POSITIVE_INFINITY);
  const height = ref(Number.POSITIVE_INFINITY);

  const updateSize = useDebounce(() => {
    if (inBrowser) {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
      sizeChangeCallback?.(width.value, height.value);
    }
  }, 100);

  onMounted(() => {
    if (inBrowser) window.addEventListener("resize", updateSize, { passive: true });
  });

  onUnmounted(() => {
    if (inBrowser) window.removeEventListener("resize", updateSize);
  });

  updateSize();
  return { width, height, updateSize };
};
