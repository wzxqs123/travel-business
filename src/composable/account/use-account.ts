import useFetch from "@/fetch/use-fetch";
import { Result } from "@/types/fetch";
import { UserInfo, CustomerDetailVO } from "./info";
import { B2B_GATEWAY, BUSINESS_GATEWAY } from "../constant";

const fetch = useFetch();

export const useAccount = () => {
  // 获取账户信息
  const getInfo = () => {
    return fetch.get<Result<UserInfo>>(`/app/${B2B_GATEWAY}/uaa/auth/userinfo`);
  };
  // 获取联系客服配置
  const customerDetail = () => {
    return fetch.get<Result<CustomerDetailVO>>(
      `/app/${BUSINESS_GATEWAY}/query/customer/detail/query`
    );
  };

  return {
    getInfo,
    customerDetail,
  };
};
