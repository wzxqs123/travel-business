/*
 * @Author: Czy
 * @Date: 2025-04-23 15:26:12
 * @FilePath: /b2b-official-website/src/composable/order/order.ts
 *
 */
import useFetch from '@/fetch/use-fetch'
import { Result } from '@/types/fetch'
import { PageResult } from '@/types/page'
import { OrderListRequest, B2BHotelOrderVO, OrderStatusEnum } from './order.d'
import { ORDER_GATEWAY } from '../constant'
export type { OrderListRequest, OrderStatusEnum, B2BHotelOrderVO }
const fetch = useFetch()
export const useHotelOrder = () => {
  // 酒店订单列表
  const getHotelOrderList = (params: OrderListRequest) => {
    return fetch.post<PageResult<B2BHotelOrderVO>>(`/app/${ORDER_GATEWAY}/query/b2b/hotel-order/list`, params)
  }
  // 酒店订单详情
  const getHotelDetail = (params: { id: string }) => {
    return fetch.get<Result<B2BHotelOrderVO>>(`/app/${ORDER_GATEWAY}/query/b2b/hotel-order/get`, {
      params,
    })
  }

  return {
    getHotelOrderList,
    getHotelDetail,
  }
}
