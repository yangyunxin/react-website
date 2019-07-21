import React from 'react';
import { connect } from 'react-redux';
import { Card, Steps, Icon, Table, Modal, Form, Input, Button, DatePicker, message, Popconfirm } from 'antd';
import { getOrderById, updateOrder } from '../../action/order';
import EnhanceTitle from '../../component/EnhanceTitle';
import DescriptionList from '../../component/DescriptionList';
import productColumns from './columns/product';
import { formatDateSecond } from '../../utils/utils';
import { ORDER_STATUS, PAYMENT_METHOD } from '../../utils/constant';
import { formItemLayout3, ORDER_TYPE, PAYMENT_CHANNEL } from '../../utils/constant';
import './index.css';

const FormItem = Form.Item;
const { Step } = Steps;
const { Description } = DescriptionList;

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

  handleOk = async (e) => {
    const { match: { params } } = this.props;
    const id = params.id;
    const { orderDetail = {} } = this.props;
    const account = orderDetail.account ? orderDetail.account: {};
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        const result = await updateOrder({
          id,
          accountId: account.id,
          ...values,
        });
        if (result && result.code === 0) {
          this.setState({
            visible: false,
          });
          message.success('快递信息录入成功');
        } else {
          message.error('快递信息录入失败，请稍后重试');
        }
      }
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  cancelOrder = async () => {
    const { match: { params } } = this.props;
    const id = params.id;
    const { orderDetail = {} } = this.props;
    const account = orderDetail.account ? orderDetail.account: {};
    const result = await updateOrder({
      id,
      accountId: account.id,
      status: 4,
    });
    if (result && result.code === 0) {
      this.setState({
        visible: false,
      });
      message.success('取消订单成功');
    } else {
      message.error('取消订单失败，请稍后重试');
    }
  }

  render() {
    const { orderDetail = {} } = this.props;
    const { productList = []  } = orderDetail;
    const account = orderDetail.account ? orderDetail.account: {};
    const address = orderDetail.address ? orderDetail.address : {};
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
            <FormItem {...formItemLayout3} label="快递公司">
              {getFieldDecorator('expressCompanyName', {
                rules: [{
                  required: true, message: '请输入快递公司',
                }],
              })(
                <Input placeholder="请输入快递公司" />
              )}
            </FormItem>
            <FormItem {...formItemLayout3} label="快递单号">
              {getFieldDecorator('expressTrackingNo', {
                rules: [{
                  required: true, message: '请输入快递单号',
                }],
              })(
                <Input placeholder="请输入快递单号" />
              )}
            </FormItem>
            <FormItem {...formItemLayout3} label="发货时间">
              {getFieldDecorator('shippingTime', {
                rules: [{
                  required: true, message: '请选择发货时间',
                }],
              })(
                <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime placeholder="请选择发货时间" />
              )}
            </FormItem>
          </Form>
        </Modal>
        <Card bordered={false}>
          <EnhanceTitle title="订单状态流" />
          <Steps current={Number(orderDetail.status) + 1}>
            <Step title="提交订单" description={formatDateSecond(orderDetail.createdTime)}/>
            <Step title="支付订单" description={ORDER_STATUS[orderDetail.status] || '未支付'} />
            <Step title="平台发货" description="" />
            <Step title="确认收货" description="" />
            <Step title="完成订单" description="" />
          </Steps>
        </Card>
        <div className="order-status">
          <div style={{ color: '#f5222d' }}>
            <Icon style={{ marginRight: 5 }} type="exclamation-circle" theme="outlined" />
            当前订单状态：{ORDER_STATUS[orderDetail.status] || '未支付'}
          </div>
          <div>
            <Button onClick={this.showModal} style={{ marginRight: '20px' }} type="primary">录入快递信息</Button>
            <Popconfirm
              placement="topRight"
              title="你确定关闭此订单吗"
              onConfirm={this.cancelOrder}
              okText="确定"
              cancelText="取消"
            >
            <Button style={{ marginRight: '20px' }} type="danger">关闭订单</Button>
            </Popconfirm>
          </div>
        </div>
        <Card bordered={false}>
          <EnhanceTitle title="基本信息" />
          <DescriptionList>
            <Description term="订单编号">{orderDetail.paymentNo}</Description>
            <Description term="订单金额">{orderDetail.orderAmountPayable / 100}（元）</Description>
            <Description term="用户账号">{account.phoneNumber}</Description>
            <Description term="支付方式">{PAYMENT_METHOD[orderDetail.paymentMethod]}</Description>
            <Description term="支付渠道">{PAYMENT_CHANNEL[orderDetail.paymentChannel]}</Description>
            <Description term="订单类型">{ORDER_TYPE[orderDetail.type]}</Description>
          </DescriptionList>
        </Card>
        <Card bordered={false}>
          <EnhanceTitle title="收货人信息" />
          <DescriptionList>
            <Description term="收货人">{address.consigneeName}</Description>
            <Description term="手机号码">{address.phoneNumber}</Description>
            {/* <Description term="邮政编码">{consigneeName}</Description> */}
            <Description term="收货地址">{address.fullAddress}</Description>
          </DescriptionList>
        </Card>
        <Card bordered={false}>
          <EnhanceTitle title="产品信息" />
          <Table rowKey="id" bordered columns={productColumns} dataSource={productList} pagination={false} />
        </Card>
        {/* <Card bordered={false}>
          <EnhanceTitle title="操作人信息" />
          <Table bordered columns={operatorColumns} dataSource={[] } />
        </Card> */}
      </div>
    )
  }
}
