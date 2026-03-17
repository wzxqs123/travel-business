/*
 * @Author: Czy
 * @Date: 2025-05-08 16:38:14
 * @FilePath: /b2b-official-website/src/composable/finance-manage/order-record/index.ts
 *
 */
import { TableColumnData } from '@arco-design/web-vue'
// import { REQUEST_B2B_GATEWAY } from '@/composable/constant'
import useFetch from '@/fetch/use-fetch'
import { BillDetailVO, ReconciliationOrderVO, AdjustmentVO } from './type'
import { Result } from '@/types/fetch'
import { RECONCILIATION_GATEWAY } from '../../constant'
import { PageResult } from '@/types/page'

export type { BillDetailVO, ReconciliationOrderVO, AdjustmentVO }
const fetch = useFetch()

export const useOrderRecord = () => {
  const columns: TableColumnData[] = [
    {
      title: '酒店名称',
      slotName: 'hotelName',
      minWidth: 100,
    },

    {
      title: '订单号',
      dataIndex: 'orderId',
      width: 130,
    },
    {
      title: '外部订单号',
      dataIndex: 'outerOrderSerialNo',
      width: 130,
    },
    {
      title: '房型名称',
      slotName: 'roomTypeName',
      minWidth: 100,
    },
    {
      title: '入住人',
      dataIndex: 'guestName',
      width: 120,
    },
    {
      title: '入离时间',
      slotName: 'checkIn',
      width: 130,
    },
    {
      title: '订单金额',
      slotName: 'amount',
      minWidth: 120,
    },
    {
      title: '退款金额',
      slotName: 'refundAmount',
      minWidth: 120,
    },
    {
      title: '订单状态',
      slotName: 'bizStatus',
      width: 100,
    },
    {
      title: '操作',
      slotName: 'operate',
      width: 100,
      align: 'center',
      fixed: 'right',
    },
  ]
  const columns2: TableColumnData[] = [
    {
      title: '酒店名称',
      slotName: 'hotelName',
      minWidth: 100,
    },

    {
      title: '订单号',
      dataIndex: 'orderId',
      minWidth: 100,
    },
    {
      title: '外部订单号',
      dataIndex: 'outerOrderSerialNo',
      width: 130,
    },
    {
      title: '调账类型',
      slotName: 'adjustmentType',
      width: 100,
    },
    {
      title: '调账结算金额',
      slotName: 'adjustmentAmount',
      minWidth: 120,
    },
    {
      title: '原因',
      dataIndex: 'reason',
      minWidth: 100,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 100,
    },
  ]
  const GetBillOrder = (params: { no?: string }) => {
    return fetch.get<Result<BillDetailVO>>(`/app/${RECONCILIATION_GATEWAY}/query/b2b/bill/${params.no}`)
  }

  const GetAdjustmentsList = (params: any) => {
    return fetch.post<PageResult<BillDetailVO>>(`/app/${RECONCILIATION_GATEWAY}/query/b2b/bill/adjustments`, params)
  }

  return {
    columns,
    GetBillOrder,
    columns2,
    GetAdjustmentsList,
  }
}
