import useFetch from '@/fetch/use-fetch'
import { CompanyBalanceRecordVO, AdjustType } from './type'
import { RECONCILIATION_GATEWAY } from '@/composable/constant'
import { TableColumnData } from '@arco-design/web-vue'
import { Result } from '@/types/fetch'
import { PageResult } from '@/types/page'
const fetch = useFetch()
export type { CompanyBalanceRecordVO, AdjustType }
export const useEnterpriseWallet = () => {
  const getTotalBalance = () => {
    return fetch.get<Result<{ totalBalance: number }>>(`/app/${RECONCILIATION_GATEWAY}/query/b2b/company/total-balance`)
  }

  return { getTotalBalance }
}
