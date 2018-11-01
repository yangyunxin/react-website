import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';
import { formatDateMinute } from '../../../utils/utils';
import { nullString, PRODUCT_STATUS } from '../../../utils/constant';

const columns = [
  {
    title: '产品大类',
    dataIndex: 'productCategory',
    key: 'productCategory',
    align: 'center',
  },
  {
    title: '产品子类',
    dataIndex: 'productSubcategory',
    key: 'productSubcategory',
    align: 'center',
  },
  {
    title: '产品图片',
    dataIndex: 'mainPicture',
    key: 'mainPicture',
    align: 'center',
    render: (text) => <img width="50" height="50" src={text} alt="产品图片" />
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
    render: (text, record) => {
      const product = record.priceList && record.priceList.length ? record.priceList[0] : {}
      return product['price']
    }
  },
  {
    title: '计价单位',
    dataIndex: 'unit',
    key: 'unit',
    align: 'center',
    render: (text, record) => {
      const product = record.priceList && record.priceList.length ? record.priceList[0] : {}
      return product['unit']
    }
  },
  {
    title: '颜色',
    dataIndex: 'colour',
    key: 'colour',
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
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: (text) => text ? PRODUCT_STATUS[text] : '待上架'
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    align: 'center',
    render: (text, record) => {
      return (
        <div>
          <Link to={`/product/detail/${record.id}`}>查看</Link>
          <Divider type="vertical" />
          <Link to={`/product/edit/${record.id}`}>编辑</Link>
          <Divider type="vertical" />
          <a href="javascript:;">{record.state === 1 ? '下架' : '上架'}</a>
        </div>
      )
    }
  },
];
export default columns;