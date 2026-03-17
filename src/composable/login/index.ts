import useFetch from '@/fetch/use-fetch'
import { Result } from '@/types/fetch'
import { LoginQuery, LoginForm } from './type'
const fetch = useFetch()
export const useHotelOrder = () => {
  // 密码方式登录（B2B 调试）
  const doLogin = (params: LoginQuery) => {
    return fetch.get<Result<LoginForm>>(`/app/sso/sztripwise/login`, {
      params,
    })
  }

  return {
    doLogin,
  }
}
