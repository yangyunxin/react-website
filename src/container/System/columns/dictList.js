import { formatDateSecond } from '../../../utils/utils';

const columns = [
  {
    title: '字典编码',
    dataIndex: 'label',
    key: 'label',
    align: 'center',
  },
  {
    title: '字典值',
    dataIndex: 'value',
    key: 'value',
    align: 'center',
  },
  {
    title: '字典名称',
    dataIndex: 'description',
    key: 'description',
    align: 'center',
  },
  {
    title: '层级',
    dataIndex: 'level',
    key: 'level',
    align: 'center',
  },
  {
    title: '上级编码',
    dataIndex: 'parentLabel',
    key: 'parentLabel',
    align: 'center',
  },
  {
    title: '顺序',
    dataIndex: 'sort',
    key: 'sort',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    render: (text) => formatDateSecond(text)
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
    align: 'center',
  },
];
export default columns;
