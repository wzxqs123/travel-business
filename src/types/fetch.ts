import { AxiosRequestConfig } from "axios";
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  filter?: boolean; // 添加一个可选的noFilter属性，类型为boolean
  responseType?: any;
  errorMessage?: any;
}
export interface AxiosInstance {
  <T = any>(config: CustomAxiosRequestConfig): Promise<T>;
  request<T = any>(config: CustomAxiosRequestConfig): Promise<T>;
  get<T = any>(url: string, config?: CustomAxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: CustomAxiosRequestConfig): Promise<T>;
  head<T = any>(url: string, config?: CustomAxiosRequestConfig): Promise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig
  ): Promise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig
  ): Promise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig
  ): Promise<T>;
  interceptors: any;
}

type ResponseMsg = string | null | undefined;

export interface Result<T = undefined> {
  code: number;
  data: T;
  msg: ResponseMsg;
}
export interface Results<T = undefined> {
  code: number;
  roles: T;
  msg: ResponseMsg;
}

export type ListResult<T> = Result<T[]>;

export interface Authentication {
  username: string;
  password: string;
}
