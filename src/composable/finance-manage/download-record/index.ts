import { TableColumnData } from '@arco-design/web-vue'

export const useDownloadRecord = () => {
  const columns: TableColumnData[] = [
    {
      title: '生成时间',
      dataIndex: 'createTime',
      width: 180,
    },
    {
      title: '文件名称',
      dataIndex: 'fileName',
    },
    // {
    //   title: '操作人',
    //   dataIndex: 'operator',
    //   minWidth: 120,
    // },
    {
      title: '结算金额',
      slotName: 'amount',
      minWidth: 100,
      align: 'center',
    },
    {
      title: '状态',
      slotName: 'exportState',
      width: 120,
    },
    {
      title: '操作',
      slotName: 'operate',
      width: 100,
      align: 'center',
      fixed: 'right',
    },
  ]

  return {
    columns,
  }
}
