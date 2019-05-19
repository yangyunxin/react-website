import React from 'react';

const columns = [
  {
    title: '产品图片',
    dataIndex: 'mainPicture',
    key: 'mainPicture',
    align: 'center',
    render: (text, record) => <img width="30" height="30" src={record.product.mainPicture} alt="产品图片" />
  },
  {
    title: '产品名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    render: (text, record) => record.product.name,
  },
  {
    title: '价格（元）',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
    render: text => text / 100,
  },
  {
    title: '计价单位',
    dataIndex: 'unit',
    key: 'unit',
    align: 'center',
    render: (text, record) => record.product.unit,
  },
  {
    title: '颜色',
    dataIndex: 'colour',
    key: 'colour',
    align: 'center',
    render: (text, record) => record.product.colour,
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
    render: (text, record) => record.price * record.quantity,
  }
];
export default columns;
