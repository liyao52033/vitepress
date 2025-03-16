export interface Paging {
  pageNum?: number; // 当前页
  pageSizes?: number[]; // 页数数组
  pageSize?: number; // 一页显示多少条数据
  total?: number; // 总数
}

export interface PaginationProps {
  background?: boolean; // 是否开启背景色
  autoScroll?: boolean; // 切换页数，是否自动滚动到最上面
  hidden?: boolean; // 是否不显示分页
  reset?: boolean; // 切换 pageSize，pageNum 重置为 1
}

export type PaginationEmits = {
  pagination: [value: Paging];
};
