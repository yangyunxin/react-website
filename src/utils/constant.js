export const nullString = '--';
export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
export function showTotal(total, range) {
  return `共${total}条数据`;
}
export const PRODUCT_STATUS = {
  0: '待上架',
  1: '上架',
  2: '下架',
}
export const PRODUCT_PRICE_STATUS = {
  0: '未定价',
  1: '已定价',
}
export const USER_ACCOUNT_STATUS = {
  0: '正常',
  1: '封号',
}
export const REGIST_CHANNEL = {
  0: '公众号',
  1: '小程序',
  2: 'APP',
  3: '网站',
}
export const PAYMENT_METHOD = {
  0: '在线支付',
  1: '货到付款',
  2: '公司转账',
}
export const ORDER_STATUS = {
  0: '待支付',
  1: '待发货',
  2: '已发货',
  3: '已完成',
  4: '已取消',
}
export const ORDER_OPERATE = {
  0: '取消订单',
  1: '订单发货',
  2: '确认收货',
}
