import React from 'react';
import { connect } from 'react-redux';
import { Card, Steps, Icon, Button, Table, Modal, Form, Input, } from 'antd';
import { getOrderById } from '../../action/order';
import EnhanceTitle from '../../component/EnhanceTitle';
import DescriptionList from '../../component/DescriptionList';
import productColumns from './columns/product';
import operatorColumns from './columns/operator';
import { formatDateSecond } from '../../utils/utils';
import { ORDER_STATUS } from '../../utils/constant';
import { formItemLayout3 } from '../../utils/constant';
import './index.css';

const FormItem = Form.Item;
const { Step } = Steps;
const { Description } = DescriptionList;
const { TextArea } = Input;

@connect(({ order }) => ({
  orderDetail: order.orderDetail
}), {
  getOrderById
})
@Form.create()
export default class OrderDetail extends React.PureComponent {
  state = {
    visible: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const id = params.id;
    this.props.getOrderById(id);
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { orderDetail = {} } = this.props;
    const { order = {}, address ={}, product } = orderDetail;
    let productInfo = [];
    if (product instanceof Array) {
      productInfo = product;
    } else if(product) {
      productInfo = [product];
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-detail">
        <Modal
          title="备注订单"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem {...formItemLayout3} label="操作备注">
              {getFieldDecorator('email', {
                rules: [{
                  required: true, message: '请输入操作备注',
                }],
              })(
                <TextArea rows={4} placeholder="请输入操作备注" />
              )}
            </FormItem>
          </Form>
        </Modal>
        <Card bordered={false}>
          <EnhanceTitle title="订单状态流" />
          <Steps current={Number(order.status)}>
            <Step title="提交订单" description={formatDateSecond(order.createdTime)}/>
            <Step title="支付订单" description={ORDER_STATUS[order.status] || '未支付'} />
            <Step title="平台发货" description="" />
            <Step title="确认收货" description="" />
            <Step title="完成订单" description="" />
          </Steps>
        </Card>
        <div className="order-status">
          <div style={{ color: '#f5222d' }}>
            <Icon style={{ marginRight: 5 }} type="exclamation-circle" theme="outlined" />
            当前订单状态：{ORDER_STATUS[order.status] || '未支付'}
          </div>
          {/* <div>
            <Button onClick={this.showModal} style={{ width: '80px', marginRight: '20px' }} type="primary">关闭订单</Button>
            <Button style={{ width: '80px', marginRight: '20px' }} >备注订单</Button>
          </div> */}
        </div>
        <Card bordered={false}>
          <EnhanceTitle title="基本信息" />
          <DescriptionList>
            <Description term="订单编号">{orderDetail.id}</Description>
            <Description term="订单金额（元）">{orderDetail.price}</Description>
            <Description term="用户账号">{order.accountId}</Description>
            <Description term="支付方式">{order.paymentMethod}</Description>
            <Description term="订单来源">{order.registChannel}</Description>
            <Description term="订单类型">{order.type}</Description>
          </DescriptionList>
        </Card>
        <Card bordered={false}>
          <EnhanceTitle title="收货人信息" />
          <DescriptionList>
            <Description term="收货人">{address.consigneeName}</Description>
            <Description term="手机号码">{orderDetail.phoneNumber}</Description>
            {/* <Description term="邮政编码">{consigneeName}</Description> */}
            <Description term="收货地址">{orderDetail.fullAddress}</Description>
          </DescriptionList>
        </Card>
        <Card bordered={false}>
          <EnhanceTitle title="产品信息" />
          <Table rowKe="id" bordered columns={productColumns} dataSource={productInfo} pagination={false} />
        </Card>
        {/* <Card bordered={false}>
          <EnhanceTitle title="操作人信息" />
          <Table bordered columns={operatorColumns} dataSource={[] } />
        </Card> */}
      </div>
    )
  }
}
