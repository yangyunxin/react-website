import { formatDateSecond } from '../../../utils/utils';
import { nullString, AGENT_TYPE } from '../../../utils/constant';

const columns = [
  {
    title: '代理商类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    render: (text) => AGENT_TYPE[text] || nullString
  },
  {
    title: '代理商名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '代理商账号',
    dataIndex: 'accountId',
    key: 'accountId',
    align: 'center',
  },
  {
    title: '返点率',
    dataIndex: 'diPer',
    key: 'diPer',
    align: 'center',
  },
  {
    title: '代理商状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    render: (text) => text ? formatDateSecond(text) : nullString
  },
];
export default columns;
