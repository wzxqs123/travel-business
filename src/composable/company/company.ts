/*
 * @Author: Czy
 * @Date: 2025-02-07 10:07:57
 * @FilePath: /b2b-official-website/src/composable/company/company.ts
 *
 */
import useFetch from "@/fetch/use-fetch";
import { Result } from "@/types/fetch";
import { B2BCompanyInfoVO } from "./company.d";
import { B2B_GATEWAY } from "../constant";
export type { B2BCompanyInfoVO };
const fetch = useFetch();

export const useCompony = () => {
  // 获取公司信息
  const getCompanyInfo = () => {
    return fetch.get<Result<B2BCompanyInfoVO>>(
      `/app/${B2B_GATEWAY}/query/profile/company/query`
    );
  };

  // 更新公司信息
  const updateCompanyInfo = (
    params: Partial<{ fullName?: string; phone?: string; email?: string }>
  ) => {
    return fetch.post<Result>(
      `/app/${B2B_GATEWAY}/command/profile/company-contact/update`,
      params
    );
  };

  return {
    getCompanyInfo,
    updateCompanyInfo,
  };
};
