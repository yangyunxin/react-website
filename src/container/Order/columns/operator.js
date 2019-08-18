import { ORDER_STATUS  } from '../../../utils/constant';
import { formatDateSecond  } from '../../../utils/utils';

const paymentStatus = ['支付成功', '支付失败'];

const columns = [
  {
    title: '快递公司',
    dataIndex: 'expressCompanyName',
    key: 'expressCompanyName',
    align: 'center',
  },
  {
    title: '操作时间',
    dataIndex: 'shippingTime',
    key: 'shippingTime',
    align: 'center',
    render: text => text && formatDateSecond(text)
  },
  {
    title: '订单状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: text => ORDER_STATUS[text] || '未支付'
  },
  {
    title: '支付状态',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
    align: 'center',
    render: text => paymentStatus[text],
  },
  {
    title: '发货状态',
    dataIndex: 'expressTrackingNo',
    key: 'expressTrackingNo',
    align: 'center',
    render: text => text ? '已发货' : '未发货',
  },
  {
    title: '备注',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
  }
];
export default columns;
