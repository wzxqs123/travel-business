import { TableColumnData } from '@arco-design/web-vue'
import { Result } from '@/types/fetch'
import useFetch from '@/fetch/use-fetch'
import { ReconciliationDetailVO } from './type'
import { RECONCILIATION_GATEWAY } from '@/composable/constant'
const fetch = useFetch()

export const useFinanceReconciliation = () => {
  // 金额看板
  const getDashboard = () => {
    return fetch.get<Result<ReconciliationDetailVO>>(`/app/${RECONCILIATION_GATEWAY}/query/b2b/reconciliation/dashboard`)
  }

  // 申请导出账单
  const billExport = (no: string) => {
    return fetch.post<Result<any>>(`/app/${RECONCILIATION_GATEWAY}/command/b2b/bill-export/${no}`, {})
  }

  // 平台确认账单已付款
  const billPaymentConfirm = (no: string) => {
    return fetch.post<Result<any>>(`/app/${RECONCILIATION_GATEWAY}/command/b2b/bill-paid/${no}`, {})
  }

  const columns: TableColumnData[] = [
    {
      title: '账单周期',
      slotName: 'billingCycle',
      width: 130,
    },
    {
      title: '账单号',
      dataIndex: 'no',
    },
    {
      title: '业务类型',
      slotName: 'billType',
    },
    {
      title: '结算周期',
      dataIndex: 'periodType',
      width: 100,
    },
    {
      title: '结算金额',
      slotName: 'amount',
      minWidth: 100,
      align: 'center',
    },
    {
      title: '账单状态',
      slotName: 'billState',
      width: 100,
    },
    {
      title: '操作',
      slotName: 'operate',
      width: 120,
      align: 'center',
      fixed: 'right',
    },
  ]

  return {
    columns,
    getDashboard,
    billExport,
    billPaymentConfirm,
  }
}
