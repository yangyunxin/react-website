const columns = [
  {
    title: '订单编号',
    dataIndex: 'expressTrackingNo',
    key: 'expressTrackingNo',
    align: 'center',
  },
  {
    title: '提交时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
  },
  {
    title: '用户账号',
    dataIndex: 'accountId',
    key: 'accountId',
    align: 'center',
  },
  {
    title: '订单金额（元）',
    dataIndex: 'orderAmountPayment',
    key: 'orderAmountPayment',
    align: 'center',
  },
  {
    title: '代理商',
    dataIndex: 'agentId',
    key: 'agentId',
    align: 'center',
  },
  {
    title: '返点金额（元）',
    dataIndex: 'rebatetotal',
    key: 'rebateTotal',
    align: 'center',
  },
  {
    title: '支付方式',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
    align: 'center',
  },
  {
    title: '订单来源',
    dataIndex: 'registChannel',
    key: 'registChannel',
    align: 'center',
  },
  {
    title: '订单状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    align: 'center',
  },
];
export default columns;
