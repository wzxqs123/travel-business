import useFetch from "@/fetch/use-fetch";
import { Result } from "@/types/fetch";
import { PageResult } from "@/types/page";
import { FormQuery, AdCodeProvinceDTO } from "./buyer-register.d";
import { B2B_GATEWAY } from "../constant";

const fetch = useFetch();

export const useBuyerRegister = () => {
  // 注册公司信息
  const companyRegister = (params: Partial<FormQuery>) => {
    return fetch.post<Result<boolean>>(
      `/app/${B2B_GATEWAY}/command/profile/company/register`,
      params
    );
  };
  // 获取行政区划层级信息
  const adCodeAll = () => {
    return fetch.get<PageResult<AdCodeProvinceDTO>>(
      `/app/${B2B_GATEWAY}/query/adCode/all`
    );
  };

  return {
    companyRegister,
    adCodeAll,
  };
};
