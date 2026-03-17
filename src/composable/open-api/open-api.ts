/*
 * @Author: Czy
 * @Date: 2025-02-07 10:07:57
 * @FilePath: /b2b-official-website/src/composable/open-api/open-api.ts
 *
 */
/*
 * @Author: Czy
 * @Date: 2025-02-07 10:07:57
 * @FilePath: /b2b-official-website/src/composable/company/company.ts
 *
 */
import useFetch from "@/fetch/use-fetch";
import { Result } from "@/types/fetch";
import { OpenClientDTO } from "./open-api.d";
import { OPENAPI_GATEWAY } from "../constant";
export type { OpenClientDTO };
const fetch = useFetch();

export const useOpenApi = () => {
  // 使用用户凭据查询指定业务的客户端详情
  const getClientDetail = (params: { bizCode: string }) => {
    return fetch.get<Result<OpenClientDTO>>(
      `/app/${OPENAPI_GATEWAY}/query/open-api/client/detail?bizCode=${params?.bizCode}`
    );
  };

  // 生成开放平台客户端密钥刷新验证码
  const generateCaptcha = (params: { apiId?: string }) => {
    return fetch.post<Result>(
      `/app/${OPENAPI_GATEWAY}/command/open-api/secret-captcha/generate?apiId=${params?.apiId}`
    );
  };

  // 刷新开放平台客户端密钥
  const refreshSecret = (params: { apiId?: string; operateToken: string }) => {
    return fetch.post<Result<{ apiId: string; secret: string }>>(
      `/app/${OPENAPI_GATEWAY}/command/open-api/secret/refresh`,
      params
    );
  };

  //创建开放平台客户端
  const createClient = () => {
    return fetch.post<Result<OpenClientDTO>>(
      `/app/${OPENAPI_GATEWAY}/command/open-api/client/create`
    );
  };

  return {
    getClientDetail,
    generateCaptcha,
    refreshSecret,
    createClient,
  };
};
