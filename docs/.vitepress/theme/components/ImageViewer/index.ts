import ImageViewer, { type ImageViewerProps } from "./src/index.vue";
import { createVNode, render, type VNode } from "vue";

export { ImageViewer };

let instance: VNode | null = null;

export const createImageViewer = (options: ImageViewerProps) => {
  if (typeof window === "undefined") return;

  const { modelValue = true } = options;

  options.modelValue = modelValue;

  document.body.style.overflow = "hidden";
  const container = document.createElement("div");
  document.body.appendChild(container);
  instance = createVNode(ImageViewer, options);
  render(instance, container);
};
