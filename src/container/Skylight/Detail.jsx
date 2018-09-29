import React from 'react';
import { Card, Table } from 'antd';
import EnhanceTitle from '../../component/EnhanceTitle';
import DescriptionList from '../../component/DescriptionList';
import bannerColumns from './columns/banner';
import './index.css';

const { Description } = DescriptionList;

export default class OrderDetail extends React.PureComponent {
  render() {
    return (
      <div className="page-detail">
        <Card bordered={false}>
          <EnhanceTitle title="基本信息" />
          <DescriptionList col={1}>
            <Description term="天窗ID">201807196398345</Description>
            <Description term="天窗类型">6050.00</Description>
            <Description term="天窗标题">18822226666</Description>
            <Description term="天窗描述">订单来源</Description>
            <Description term="创建时间">公众号</Description>
            <Description term="创建人">普通订单</Description>
            <Description term="更新时间">普通订单</Description>
            <Description term="更新人">普通订单</Description>
          </DescriptionList>
        </Card>
        <Card bordered={false}>
          <EnhanceTitle title="关联banner" />
          <Table bordered columns={bannerColumns} dataSource={[] } />
        </Card>
      </div>
    )
  }
}
