export interface Page {
  pageNum: number;
  pageSize: number;
}

export interface PageResult<T> {
  code: number;
  rows: T[];
  total: number;
  msg: string;
}
export interface PageQueryOption {
  immediate?: boolean;
  onQueryFinish?: () => void;
  method?: "get" | "post";
}
export interface Dict<T = any> {
  type: string;
  value: string;
  label: string;
  dictDataId: string;
  dictSort?: number;
  dictLabel: string;
  dictValue: string;
  dictType: string;
  cssClass?: string;
  listClass?: string;
  isDefault?: "Y" | "N";
  status: string;
  business?: T;
  remark?: string;
}
export interface DictStore<T = any> {
  [key: string]: Dict<T>[];
}
