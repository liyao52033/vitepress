import { InjectionKey } from "vue";

export interface BreadcrumbProps {
  separator?: string;
}

export const breadcrumbKey: InjectionKey<BreadcrumbProps> = Symbol("breadcrumbKey");
