import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';
import { formatDateMinute } from '../../../utils/utils';
import { nullString, USER_ACCOUNT_STATUS } from '../../../utils/constant';

const columns = [
  {
    title: '用户账号',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    align: 'center',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '用户来源',
    dataIndex: 'registChannel',
    key: 'registChannel',
    align: 'center',
  },
  {
    title: '用户状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: (text) => USER_ACCOUNT_STATUS[text] || nullString
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    render: (text) => text ? formatDateMinute(text) : nullString
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    align: 'center',
    render: (text, record) => {
      return (
        <div>
          <Link to={`/user/detail/${record.id}`}>查看</Link>
          <Divider type="vertical" />
          <a href="javascript:;">禁用</a>
          <Divider type="vertical" />
          <a href="javascript:;">升级代理商</a>
        </div>
      )
    }
  },
];
export default columns;
