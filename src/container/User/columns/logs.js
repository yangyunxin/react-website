const columns = [
  {
    title: '用户账号',
    dataIndex: 'account',
    key: 'account',
    align: 'center',
  },
  {
    title: '登录时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
  },
  {
    title: '登录方式',
    dataIndex: 'registChannel',
    key: 'registChannel',
    align: 'center',
  },
  {
    title: 'IP',
    dataIndex: 'remoteAddr',
    key: 'remoteAddr',
    align: 'center',
  },
  {
    title: '地区',
    dataIndex: 'location',
    key: 'location',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    align: 'center',
  },
];
export default columns;
