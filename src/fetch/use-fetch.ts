import { Message } from '@arco-design/web-vue'
import { AxiosInstance } from '../types/fetch'
import axios, { AxiosError, AxiosResponse, AxiosHeaders } from 'axios'
import authStore from '../auth/auth-store'
import useAuth from '../auth/use-auth'
import useApp from '../app/use-app'
import { useDebounceFn } from '@vueuse/core'

let isShowModal = false
const apps = useApp()
// 创建一个 map 用来存储请求的标识符和取消函数
const requestQueue = new Map<string, () => void>()
const debouncedSendRequest = useDebounceFn((config: any) => {
  // 实际的请求发送
  return fetch(config)
}, 300) // 设置防抖等待时间为300ms

const errorCode: any = {
  '401': '认证失败，无法访问系统资源',
  '403': '当前操作没有权限',
  '404': '访问资源不存在',
}
const fetch = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'hix-auth-app-id': apps.appId.value,
    'x-tenant-header': apps.sessionId.value,
  },
  timeout: 40 * 1000,
})

// 添加请求拦截器
fetch.interceptors.request.use(
  (config: any) => {
    if ((!apps.requestName.value || config.url.includes('app/null')) && window.location.pathname != '/' && !config.url.includes('app/infra/platform/dict/data/type')) {
      const auth = useAuth()
      auth.toLogin()
    }
    const headers = config.headers as AxiosHeaders

    if (config.headers && authStore.value.token) {
      headers.set('Authorization', 'Bearer ' + authStore.value.token)
    }

    if (!config?.filter) {
      return config
    }
    const requestKey = `${config.method}:${config.url}:${JSON.stringify(config.params)}:${JSON.stringify(config.data)}` as string
    // 如果有相同的请求正在进行，取消之前的请求
    if (requestQueue.has(requestKey)) {
      const cancelFunction = requestQueue.get(requestKey)
      if (cancelFunction) {
        cancelFunction() // 取消请求
        requestQueue.delete(requestKey) // 删除队列中的条目
      }
    }

    // 创建一个新的取消令牌，将取消函数保存在队列中
    const cancelToken = axios.CancelToken.source()
    requestQueue.set(requestKey, cancelToken.cancel)

    // 将取消令牌附加到请求配置中
    config.cancelToken = cancelToken.token
    return config
  },
  (error: any) => {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message)
      return // 直接返回，不向下传递错误
    }
    // 如果错误不是取消请求引起的，则继续传递错误
    return Promise.reject(error)
  }
)
//添加响应拦截器
fetch.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const url = response.request?.responseURL
    const code = response?.data?.code || response.status
    const msg = errorCode[code] || response.data.errorMsg || response.data.msg || response.data.message
    const auth = useAuth()
    if (code === 401 && !isShowModal) {
      isShowModal = true
      authStore.value.token = ''
      auth.logout(url)
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    }
    if (code !== 200) {
      if (response?.data?.errorCode != '1736003006') {
        Message.error(msg)
      }

      if (response?.data?.errorCode == '1988003003') {
        window.location.href = '/'
      }
      return Promise.reject(response.data || response)
    }
    return Promise.resolve(response.data)
  },
  (
    error: AxiosError<any, XMLHttpRequest> & {
      config: { errorMessage?: string }
    }
  ) => {
    const errorMessage = error.config?.errorMessage // 自定义错误提示
    const url = error.request?.responseURL
    const code = error?.response?.status || 200
    const auth = useAuth()
    const msg = errorCode[code] || error?.response?.data.errorMsg || error?.response?.data?.msg || error?.response?.data?.message
    if (code == 401 && !isShowModal) {
      isShowModal = true
      authStore.value.token = ''
      auth.logout(url)
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    }
    if (code !== 200) {
      Message.error(errorMessage ?? msg)
      // if (!authStore.value.token) {
      //   auth.logout(url)
      // }
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

const useFetch = () => {
  return fetch as AxiosInstance
}

export default useFetch
