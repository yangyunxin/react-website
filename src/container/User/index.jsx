import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Row, Col, Input, Select, DatePicker, Table, Button } from 'antd';
import listColumns from './columns/list';
import { getUsertList } from '../../action/user';
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

@connect(({ user }) => ({
  userList: user.userList
}), {
  getUsertList
})
@Form.create()
export default class UserList extends React.PureComponent {
  state = {
    selectedRowKeys: [],
  };

  componentDidMount() {
    this.props.getUsertList();
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const { form: { getFieldDecorator }, userList: { records = [] } } = this.props;
    const { selectedRowKeys } = this.state;
    console.log(records)
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
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
                <FormItem {...formItemLayout} label="姓名">
                  {getFieldDecorator('username')(
                    <Input placeholder="请输入姓名" />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="用户来源">
                  {getFieldDecorator('registChannel')(
                    <Select allowClear placeholder="请选择用户来源">
                      <Option value="0">公众号</Option>
                      <Option value="1">小程序</Option>
                      <Option value="2">APP</Option>
                      <Option value="3">网站</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="用户状态">
                  {getFieldDecorator('status')(
                    <Select allowClear placeholder="请选择用户状态">
                      <Option value="0">正常</Option>
                      <Option value="1">封号</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="注册起止时间">
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
          <Table rowKey="id" rowSelection={rowSelection} columns={listColumns} dataSource={records} />
        </Card>
      </div>
    )
  }
}
