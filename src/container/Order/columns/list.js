
import { formatDateMinute } from '../../../utils/utils';
import { nullString, PAYMENT_METHOD, ORDER_STATUS, REGIST_CHANNEL } from '../../../utils/constant';

const columns = [
  {
    title: '订单编号',
    dataIndex: 'expressTrackingNo',
    key: 'expressTrackingNo',
    align: 'center',
    fixed: 'left',
    render: (text) => text || nullString,
  },
  {
    title: '提交时间',
    dataIndex: 'createdTime',
    key: 'createdTime',
    align: 'center',
    render: (text) => text ? formatDateMinute(text) : nullString,
  },
  {
    title: '用户账号',
    dataIndex: 'accountId',
    key: 'accountId',
    align: 'center',
    render: (text) => text || nullString,
  },
  {
    title: '订单金额（元）',
    dataIndex: 'orderAmountPayment',
    key: 'orderAmountPayment',
    align: 'center',
    render: (text) => text || nullString,
  },
  {
    title: '代理商',
    dataIndex: 'agentId',
    key: 'agentId',
    align: 'center',
    render: (text) => text || nullString,
  },
  {
    title: '返点金额（元）',
    dataIndex: 'rebateTotal',
    key: 'rebateTotal',
    align: 'center',
    render: (text) => text || nullString,
  },
  {
    title: '支付方式',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
    align: 'center',
    render: (text) => PAYMENT_METHOD[text] || nullString,
  },
  {
    title: '订单来源',
    dataIndex: 'registChannel',
    key: 'registChannel',
    align: 'center',
    render: (text) => REGIST_CHANNEL[text] || nullString,
  },
  {
    title: '订单状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: (text) => ORDER_STATUS[text] || nullString,
  },
];
export default columns;
