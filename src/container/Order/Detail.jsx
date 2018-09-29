import React from 'react';
import { connect } from 'react-redux';
import { Card, Steps, Icon, Button, Table } from 'antd';
import { getOrderById } from '../../action/order';
import EnhanceTitle from '../../component/EnhanceTitle';
import DescriptionList from '../../component/DescriptionList';
import productColumns from './columns/product';
import operatorColumns from './columns/operator';
import './index.css';

const { Step } = Steps;
const { Description } = DescriptionList;

@connect(({ order }) => ({
  orderDetail: order.orderDetail
}), {
  getOrderById
})
export default class OrderDetail extends React.PureComponent {
  componentDidMount() {
    const { match: { params } } = this.props;
    const id = params.id;
    this.props.getOrderById(id);
  }
  render() {
    const { orderDetail = {} } = this.props;
    return (
      <div className="page-detail">
        <Card bordered={false}>
          <EnhanceTitle title="订单状态流" />
          <Steps current={1}>
            <Step title="提交订单" description="2018-07-19 14:48:38" />
            <Step title="支付订单" description="未支付" />
            <Step title="平台发货" description="" />
            <Step title="确认收货" description="" />
            <Step title="完成订单" description="" />
          </Steps>
        </Card>
        <div className="order-status">
          <div style={{ color: '#f5222d' }}><Icon type="exclamation-circle" theme="outlined" /> 当前订单状态：待付款</div>
          <div>
            <Button style={{ width: '80px', marginRight: '20px' }} type="primary">关闭订单</Button>
            <Button style={{ width: '80px', marginRight: '20px' }} >备注订单</Button>
          </div>
        </div>
        <Card bordered={false}>
          <EnhanceTitle title="基本信息" />
          <DescriptionList>
            <Description term="订单编号">{orderDetail.expressTrackingNo}</Description>
            <Description term="订单金额（元）">{orderDetail.orderAmountPayment}</Description>
            <Description term="用户账号">{orderDetail.accountId}</Description>
            <Description term="支付方式">{orderDetail.paymentMethod}</Description>
            <Description term="订单来源">{orderDetail.registChannel}</Description>
            <Description term="订单类型">{orderDetail.type}</Description>
          </DescriptionList>
        </Card>
        <Card bordered={false}>
          <EnhanceTitle title="收货人信息" />
          <DescriptionList>
            <Description term="收货人">{orderDetail.name}</Description>
            <Description term="手机号码">{orderDetail.phoneNumber}</Description>
            <Description term="邮政编码">518000</Description>
            <Description term="收货地址">{orderDetail.fullAddress}</Description>
          </DescriptionList>
        </Card>
        <Card bordered={false}>
          <EnhanceTitle title="产品信息" />
          <Table bordered columns={productColumns} dataSource={[] } />
        </Card>
        <Card bordered={false}>
          <EnhanceTitle title="操作人信息" />
          <Table bordered columns={operatorColumns} dataSource={[] } />
        </Card>
      </div>
    )
  }
}
