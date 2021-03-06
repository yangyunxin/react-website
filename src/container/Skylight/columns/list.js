import React from 'react';
import { formatDateSecond } from '../../../utils/utils';
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
    title: '天窗位置',
    dataIndex: 'position',
    key: 'position',
    align: 'center',
  },
  {
    title: '天窗图片',
    dataIndex: 'skyContent',
    key: 'skyContent',
    align: 'center',
    render: (text) => <img style={{ display: 'block' }} width="50" height="50" src={text} alt="产品图片" />
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    render: (text) => text ? formatDateSecond(text) : nullString
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
    align: 'center',
  },
];
export default columns;
