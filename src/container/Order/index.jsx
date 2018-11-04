import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Form, Row, Col, Input, Select, DatePicker, Table, Button, Divider, message } from 'antd';
import { ORDER_OPERATE, formItemLayout, showTotal, ORDER_STATUS, REGIST_CHANNEL } from '../../utils/constant';
import { getOrderList, updateOrder } from '../../action/order';
import listColumns from './columns/list';
import './index.css'

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

@connect(({ order }) => ({
  orderList: order.orderList
}), {
  getOrderList
})
@Form.create()
export default class OrderList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      ...listColumns,
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        align: 'center',
        fixed: 'right',
        render: (text, record) => {
          return (
            <div>
              <Link to={`/order/detail/${record.id}`}>查看</Link>
              {ORDER_OPERATE[record.status] ? (
                <span>
                  <Divider type="vertical" />
                  <a onClick={() => this.updateStatus(record)} href="javascript:;">{ORDER_OPERATE[record.status]}</a>
                </span>
              ) : null}
            </div>
          )
        }
      },
    ];
  }

  state = {
    selectedRowKeys: [],
    loading: false,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
    },
  };

  componentDidMount() {
    this.getOrderList();
  }

  getOrderList = async (params) => {
    this.setState({ loading: true });
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        const { createTime, ...newParams } = values;
        const beginTime = values.createTime ? values.createTime[0].format('YYYY-MM-DD') : undefined;
        const endTime = values.createTime ? values.createTime[1].format('YYYY-MM-DD') : undefined;
        await this.props.getOrderList({ ...newParams, ...params, beginTime, endTime});
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getOrderList();
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
    this.setState({ pagination: pager });
    this.getOrderList({
      limit: pagination.pageSize,
      page: pagination.current,
    });
  }

  updateStatus = async ({ id, accountId, status }) => {
    let nextStatus = '0';
    switch (status) {
      case '0': nextStatus = '4';
        break;
      case '1': nextStatus = '2';
        break;
      case '2': nextStatus = '3'
        break;
      default: nextStatus = '0';
    }
    const result = await updateOrder({
      id,
      accountId,
      status: nextStatus,
    });
    if (result && result.code === 0) {
      message.success(`订单ID为${id}的产品${ORDER_OPERATE[status]}变更成功`);
      const pager = { ...this.state.pagination };
      this.getOrderList({
        limit: pager.pageSize,
        page: pager.current,
      });
    } else {
      message.error('产品状态变更失败，请稍后重试');
    }
  }

  render() {
    const { form: { getFieldDecorator }, orderList } = this.props;
    const { selectedRowKeys, loading } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return (
      <div className="page-list order-list">
        <Card bordered={false} className="form-container">
          <Form onSubmit={this.handleSubmit}>
            <Row gutter={12}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="订单编号">
                  {getFieldDecorator('expressTrackingNo')(
                    <Input placeholder="请输入订单编号" />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="订单状态">
                  {getFieldDecorator('status')(
                    <Select allowClear placeholder="请选择订单状态">
                    {Object.keys(ORDER_STATUS).map(item => (
                      <Option key={item} value={item}>{ORDER_STATUS[item]}</Option>
                    ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="订单来源">
                  {getFieldDecorator('registChannel')(
                    <Select allowClear placeholder="请选择订单来源">
                      {Object.keys(REGIST_CHANNEL).map(item => (
                        <Option key={item} value={item}>{REGIST_CHANNEL[item]}</Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="用户账户">
                  {getFieldDecorator('accountId')(
                    <Input placeholder="请输入用户账户ID" />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="代理商">
                  {getFieldDecorator('agentId')(
                    <Input placeholder="请输入代理商" />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="提交起止时间">
                  {getFieldDecorator('createTime')(
                    <RangePicker format={dateFormat} />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 8, push: 16 }} sm={{ span: 12, push: 12 }} lg={{ span: 8, push: 16 }} style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">搜索</Button>
                <Button
                  style={{ marginLeft: '8px', marginRight: '8px' }}
                  onClick={this.handleReset}
                >
                  清空
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card bordered={false}>
          <Table
            rowKey="id"
            scroll={{ x: 1100 }}
            rowSelection={rowSelection}
            columns={this.columns}
            dataSource={orderList.records}
            onChange={this.handleTableChange}
            pagination={{ showTotal: showTotal, total: orderList.total, ...this.state.pagination }}
            loading={loading}
          />
        </Card>
      </div>
    )
  }
}
