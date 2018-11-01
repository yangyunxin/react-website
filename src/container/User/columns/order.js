import { formatDateMinute } from '../../../utils/utils';
import { nullString } from '../../../utils/constant';

const columns = [
  {
    title: '订单编号',
    dataIndex: 'expressTrackingNo',
    key: 'expressTrackingNo',
    align: 'center',
  },
  {
    title: '提交时间',
    dataIndex: 'createdTime',
    key: 'createdTime',
    align: 'center',
    render: (text) => text ? formatDateMinute(text) : nullString
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
    dataIndex: 'rebateTotal',
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
    dataIndex: 'paymentChannel',
    key: 'paymentChannel',
    align: 'center',
  },
  {
    title: '订单状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
  },
];
export default columns;
