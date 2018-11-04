import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Row, Col, Input, Select, DatePicker, Table, Button } from 'antd';
import logsColumns from './columns/logs';
import { formItemLayout, showTotal } from '../../utils/constant';
import { getUserLoginList } from '../../action/user';
import './index.css'

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

@connect(({ user }) => ({
  userLoginLogs: user.userLoginLogs
}), {
  getUserLoginList
})
@Form.create()
export default class UserLogsList extends React.PureComponent {
  state = {
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
    },
    loading: false,
  };

  componentDidMount() {
    this.getUserLoginList();
  }

  getUserLoginList = async (params) => {
    this.setState({ loading: true });
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        const { createTime, ...newParams } = values;
        const beginTime = values.createTime ? values.createTime[0].format('YYYY-MM-DD') : undefined;
        const endTime = values.createTime ? values.createTime[1].format('YYYY-MM-DD') : undefined;
        await this.props.getUserLoginList({ ...newParams, ...params, beginTime, endTime});
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getUserLoginList();
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
    this.setState({ pagination: pager });
    this.getUserLoginList({
      page: pagination.current,
      limit: pagination.pageSize,
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { form: { getFieldDecorator }, userLoginLogs: { records = [], total } } = this.props;
    const { pagination, loading } = this.state;
    return (
      <div className="page-list product-list">
        <Card bordered={false} className="form-container">
          <Form onSubmit={this.handleSubmit}>
            <Row gutter={12}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="用户账号">
                  {getFieldDecorator('account')(
                    <Input placeholder="请输入用户账号" />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="登录方式">
                  {getFieldDecorator('registChannel')(
                    <Select allowClear placeholder="请选择登录方式">
                      <Option value="0">公众号</Option>
                      <Option value="1">小程序</Option>
                      <Option value="2">APP</Option>
                      <Option value="3">网站</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="登录起止时间">
                  {getFieldDecorator('loginTime')(
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
            columns={logsColumns}
            dataSource={records}
            onChange={this.handleTableChange}
            pagination={{ showTotal: showTotal, total: total, ...pagination }}
            loading={loading}
          />
        </Card>
      </div>
    )
  }
}
