import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Form, Row, Col, Input, Select, DatePicker, Table, Button, Divider, message } from 'antd';
import { formItemLayout, showTotal } from '../../utils/constant';
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
              <a onClick={() => this.updateStatus(record)} href="javascript:;">{record.status === "1" ? '禁用' : '解禁'}</a>
              <Divider type="vertical" />
              <a href="javascript:;">升级代理商</a>
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
    if (result && result.code === 0) {
      message.success('变更用户状态成功');
      this.getUsertList();
    } else {
      message.error('变更用户状态失败');
    }
  }

  getUsertList = async (params) => {
    this.setState({ loading: true });
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        const { createdTime, ...params } = values;
        const beginTime = values.createdTime ? values.createdTime[0].format('YYYY-MM-DD') : undefined;
        const endTime = values.createdTime ? values.createdTime[1].format('YYYY-MM-DD') : undefined;
        await this.props.getUsertList({ ...params, beginTime, endTime});
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.getUsertList();
  }

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const { selectedRows: orderList } = this.state;
      let newRows = [];
      if (selectedRowKeys.length === selectedRows.length) {
        newRows = [...selectedRows];
      } else if (selectedRowKeys.length > selectedRows.length) {
        const otherRowsKeys = selectedRowKeys.filter(item => selectedRows.every(row => row.id !== item));
        const otherRows = orderList.filter(item => otherRowsKeys.indexOf(item.id) !== -1);
        newRows = otherRows.concat(selectedRows);
      }
      this.setState({ selectedRows: newRows, selectedRowKeys });
    }
  }

  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
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
    const rowSelection = { selectedRowKeys, ...this.rowSelection };
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
