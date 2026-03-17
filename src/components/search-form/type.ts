/*
 * @Author: 陈淦 chengan5566@163.com
 * @Date: 2023-10-11 11:44:36
 * @LastEditors: 陈淦 chengan5566@163.com
 * @LastEditTime: 2023-12-14 19:36:59
 * @FilePath: \one-stack-app\packages\@vue\form\src\search-form\type.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { TreeNodeData, SelectOption } from '@arco-design/web-vue'

export interface SearchRule {
  // default text
  type?: 'Input' | 'InputNumber' | 'DictSelect' | 'DictRadio' | 'Select' | 'TreeSelect' | 'DatePicker' | 'MonthPicker' | 'WeekPicker' | 'TimePicker' | 'RangePicker' | 'Cascader' | 'AggregateInput'
  label?: string
  field: string
  raw?: boolean
  props?: any
  // default: 请输入对应的值
  placeholder?: string | string[]
  options?: SelectOption[] | TreeNodeData[]
  isNoShow?: boolean
  optionsAddAll?: boolean
}
