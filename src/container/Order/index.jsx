import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Row, Col, Input, Select, DatePicker, Table, Button } from 'antd';
import { getOrderList } from '../../action/order';
import listColumns from './columns/list';
import './index.css'

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

@connect(({ order }) => ({
  orderList: order.orderList
}), {
  getOrderList
})
@Form.create()
export default class OrderList extends React.PureComponent {
  state = {
    selectedRowKeys: [],
  };

  componentDidMount() {
    this.props.getOrderList();
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const { form: { getFieldDecorator }, orderList } = this.props;
    const { selectedRowKeys } = this.state;
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
                      <Option value="1">类别1</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="订单来源">
                  {getFieldDecorator('productSubcategory')(
                    <Select allowClear placeholder="请选择订单来源">
                      <Option value="1">类别1</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="用户账户">
                  {getFieldDecorator('accountId')(
                    <Input placeholder="请输入用户账户" />
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
                  {getFieldDecorator('createdTime')(
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
            columns={listColumns}
            dataSource={orderList.records}
          />
        </Card>
      </div>
    )
  }
}
