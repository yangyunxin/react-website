import { IS_DEFAULT, nullString } from '../../../utils/constant';

const columns = [
  {
    title: '姓名',
    dataIndex: 'consigneeName',
    key: 'consigneeName',
    align: 'center',
  },
  {
    title: '手机号码',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    align: 'center',
  },
  {
    title: '详细地址',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
    render: (text, record) => record.cityName
      ?`${record.cityName}${record.districtName}${record.fullAddress}`
      : nullString
  },
  {
    title: '邮政编码',
    dataIndex: 'zipCode',
    key: 'zipCode',
    align: 'center',
    render: (text) => text || nullString
  },
  {
    title: '默认地址',
    dataIndex: 'isDefult',
    key: 'isDefult',
    align: 'center',
    render: (text) => IS_DEFAULT[text]
  },
];
export default columns;
