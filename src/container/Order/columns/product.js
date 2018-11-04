import React from 'react';

const columns = [
  {
    title: '产品图片',
    dataIndex: 'mainPicture',
    key: 'mainPicture',
    align: 'center',
    render: (text) => <img src={text} alt="产品图片" />
  },
  {
    title: '产品名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '价格（元）',
    dataIndex: 'productPrice',
    key: 'productPrice',
    align: 'center',
  },
  {
    title: '计价单位',
    dataIndex: 'unit',
    key: 'unit',
    align: 'center',
  },
  {
    title: '颜色',
    dataIndex: 'colour',
    key: 'colour',
    align: 'center',
  },
  {
    title: '数量',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
  },
  {
    title: '小计',
    dataIndex: 'total',
    key: 'total',
    align: 'center',
  }
];
export default columns;
