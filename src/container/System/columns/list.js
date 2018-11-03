import { formatDateSecond } from '../../../utils/utils';

const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: '操作人',
    dataIndex: 'createBy',
    key: 'createBy',
    align: 'center',
  },
  {
    title: '操作时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    render: (text) => formatDateSecond(text)
  },
  {
    title: '日志类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
  },
  {
    title: '日志详情',
    dataIndex: 'exception',
    key: 'exception',
    align: 'center',
    width: '30%',
  },
];
export default columns;
