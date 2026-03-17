/*
 * @Author: 陈淦 chengan5566@163.com
 * @Date: 2023-10-11 11:44:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-05-09 14:27:45
 * @FilePath: /b2b-official-website/src/fetch/use-page-query.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import useFetch from '../fetch/use-fetch'
import { ref, watch, computed, Ref, isRef } from 'vue'
import { Page, PageQueryOption, PageResult } from '../types/page'

export const usePageQuery = <T = any>(url: Ref<string> | string, params?: Ref<any>, option?: PageQueryOption) => {
  const fetch = useFetch()
  const data = ref<T[]>([]) as Ref<T[]>
  const total = ref<number>(0)
  const loading = ref<boolean>(false)
  const immediate = option?.immediate ?? true
  const method = option?.method ?? 'post'
  const page = ref<Page>({
    pageNum: 1,
    pageSize: 10,
  })

  const query = () => {
    loading.value = true
    const uri = isRef(url) ? url.value : url
    if (method === 'post') {
      return fetch
        .post<PageResult<T>>(uri, { ...params?.value, ...page.value })
        .then((result) => {
          data.value = result.rows as T[]
          total.value = result.total
        })
        .finally(() => {
          option?.onQueryFinish?.()
          loading.value = false
        })
    } else {
      return fetch
        .get<PageResult<T>>(uri, { params: { ...params?.value, ...page.value } })
        .then((result) => {
          data.value = result.rows as T[]
          total.value = result.total
        })
        .finally(() => {
          option?.onQueryFinish?.()
          loading.value = false
        })
    }
  }

  const pageChange = (current: number) => {
    page.value.pageNum = current || 1
  }

  watch(
    [page.value, params],
    () => {
      if (immediate) {
        query()
      }
    },
    {
      immediate: immediate,
    }
  )

  return {
    loading: computed(() => loading.value),
    total: computed(() => total.value),
    data,
    page,
    query,
    pageChange,
  }
}

export default usePageQuery
