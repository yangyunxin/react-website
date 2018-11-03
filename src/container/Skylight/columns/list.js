import { formatDateMinute } from '../../../utils/utils';
import { nullString, SKY_TYPE } from '../../../utils/constant';

const columns = [
  {
    title: '天窗ID',
    dataIndex: 'skyId',
    key: 'skyId',
    align: 'center',
  },
  {
    title: '天窗类型',
    dataIndex: 'skyType',
    key: 'skyType',
    align: 'center',
    render: (text) => SKY_TYPE[text] || nullString
  },
  {
    title: '天窗标题',
    dataIndex: 'skyTitle',
    key: 'skyTitle',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    render: (text) => text ? formatDateMinute(text) : nullString
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
    align: 'center',
  },
];
export default columns;
