import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Form, Row, Col, Input, Select, DatePicker, Table, Button, Divider, message, Popconfirm } from 'antd';
import { formItemLayout, showTotal, REGIST_CHANNEL, USER_ACCOUNT_STATUS } from '../../utils/constant';
import listColumns from './columns/list';
import { getUsertList, updateUser } from '../../action/user';
import './index.css'

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

@connect(({ user }) => ({
  userList: user.userList
}), {
  getUsertList
})
@Form.create()
export default class UserList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      ...listColumns,
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        align: 'center',
        render: (text, record) => {
          return (
            <div>
              <Link to={`/user/detail/${record.id}`}>查看</Link>
              <Divider type="vertical" />
              <Popconfirm placement="topLeft" title="请确定是否禁用该用户？" onConfirm={() => this.updateStatus(record)} okText="确定" cancelText="取消">
                <a href="javascript:;">{record.status === "0" ? '禁用' : '解禁'}</a>
              </Popconfirm>
              <Divider type="vertical" />
              <Link to={`/user/upgrade/${record.id}`}>升级代理商</Link>
            </div>
          )
        }
      },
    ];
  }

  state = {
    selectedRowKeys: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
    },
    loading: false,
  };

  componentDidMount() {
    this.getUsertList();
  }

  updateStatus = async(record) => {
    const result = await updateUser({
      id: record.id,
      status: record.status === "0" ? "1" : "0",
    });
    const info = record.status === "1" ? '禁用' : '解禁'
    if (result && result.code === 0) {
      message.success(`用户${record.phoneNumber}${info}成功`);
      const pager = { ...this.state.pagination };
      this.getUsertList({
        limit: pager.pageSize,
        page: pager.current,
      });
    } else {
      message.error('变更用户状态失败');
    }
  }

  getUsertList = async (params) => {
    this.setState({ loading: true });
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        const { createTime, ...newParams } = values;
        const beginTime = values.createTime ? values.createTime[0].format('YYYY-MM-DD') : undefined;
        const endTime = values.createTime ? values.createTime[1].format('YYYY-MM-DD') : undefined;
        await this.props.getUsertList({ ...newParams, ...params, beginTime, endTime});
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getUsertList();
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
    this.setState({ pagination: pager });
    this.getUsertList({
      page: pagination.current,
      limit: pagination.pageSize,
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { form: { getFieldDecorator }, userList: { records = [], total } } = this.props;
    const { selectedRowKeys, pagination, loading } = this.state;
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
                  {getFieldDecorator('phoneNumber')(
                    <Input placeholder="请输入用户账号" />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="姓名">
                  {getFieldDecorator('name')(
                    <Input placeholder="请输入姓名" />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="用户来源">
                  {getFieldDecorator('registChannel')(
                    <Select allowClear placeholder="请选择用户来源">
                      {Object.keys(REGIST_CHANNEL).map(item => (
                        <Option key={item} value={item}>{REGIST_CHANNEL[item]}</Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="用户状态">
                  {getFieldDecorator('status')(
                    <Select allowClear placeholder="请选择用户状态">
                      {Object.keys(USER_ACCOUNT_STATUS).map(item => (
                        <Option key={item} value={item}>{USER_ACCOUNT_STATUS[item]}</Option>
                      ))}
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
                <Button style={{ marginLeft: '8px', marginRight: '8px' }} onClick={this.handleReset}>
                  清空
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card bordered={false}>
          <Table
            rowKey="id"
            rowSelection={rowSelection}
            columns={this.columns}
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
