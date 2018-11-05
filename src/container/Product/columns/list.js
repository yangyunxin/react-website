import React from 'react';
import { formatDateSecond } from '../../../utils/utils';
import { nullString, PRODUCT_TYPE, PRODUCT_SUB, PRODUCT_STATUS } from '../../../utils/constant';

const color = {
  1: '红色',
  2: '黑色',
  3: '蓝色',
}
const columns = [
  {
    title: '产品名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    fixed: 'left',
  },
  {
    title: '产品货号',
    dataIndex: 'sameStyleNum',
    key: 'sameStyleNum',
    align: 'center',
  },
  {
    title: '产品大类',
    dataIndex: 'productCategory',
    key: 'productCategory',
    align: 'center',
    render: (text) => text ? PRODUCT_TYPE[text] : nullString
  },
  {
    title: '产品子类',
    dataIndex: 'productSubcategory',
    key: 'productSubcategory',
    align: 'center',
    render: (text) => text ? PRODUCT_SUB[text] : nullString
  },
  {
    title: '产品图片',
    dataIndex: 'mainPicture',
    key: 'mainPicture',
    align: 'center',
    render: (text) => <img style={{ display: 'block' }} width="50" height="50" src={text} alt="产品图片" />
  },
  {
    title: '价格（元）',
    dataIndex: 'productPrice',
    key: 'productPrice',
    align: 'center',
    render: (text, record) => {
      const product = record.priceList && record.priceList.length ? record.priceList[0] : {}
      return product['price'] || nullString
    }
  },
  {
    title: '计价单位',
    dataIndex: 'unit',
    key: 'unit',
    align: 'center',
    render: (text, record) => {
      const product = record.priceList && record.priceList.length ? record.priceList[0] : {}
      return product['unit'] || nullString
    }
  },
  {
    title: '颜色',
    dataIndex: 'colour',
    key: 'colour',
    align: 'center',
    render: (text) => color[text] || nullString
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    width: '14%',
    render: (text) => text ? formatDateSecond(text) : nullString
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: (text) => text ? PRODUCT_STATUS[text] : '待上架'
  },
];
export default columns;
