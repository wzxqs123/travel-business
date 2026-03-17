/*
 * @Author: Czy
 * @Date: 2025-02-06 18:28:02
 * @FilePath: /b2b-official-website/src/composable/constant.ts
 *
 */
import useApp from '../app/use-app'
const apps = useApp()
const requestName = apps.requestName.value || 'b2b'
// 获取用户信息相关接口请求的网关
export const REQUEST_GATEWAY = `infra/platform`
// 公司
export const B2B_GATEWAY = `${requestName}/common`
// 业务
export const BUSINESS_GATEWAY = `${requestName}/static`
// 开放平台
export const OPENAPI_GATEWAY = `openapi/v1`

// 订单
export const ORDER_GATEWAY = `${requestName}/order`

// 财务管理
export const RECONCILIATION_GATEWAY = `${requestName}/reconciliation`

export const WEEK_TEXT_MAP = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

// 酒店星级
export const HOTEL_STAR_RATE = ['无', '一', '二', '三', '四', '五']
