import { formatDateSecond } from '../../../utils/utils';
import { nullString, AGENT_TYPE, AGENT_STATUS } from '../../../utils/constant';

const columns = [
  {
    title: '代理商编号',
    dataIndex: 'sn',
    key: 'sn',
    align: 'center',
  },
  {
    title: '代理商名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '代理商类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    render: (text) => AGENT_TYPE[text] || nullString
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
    render: (text) => AGENT_STATUS[text] || nullString
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
