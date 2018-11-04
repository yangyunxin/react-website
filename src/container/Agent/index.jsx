import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Form, Row, Col, Input, Select, DatePicker, Table, Button, Divider, Popconfirm, message } from 'antd';
import { getAgentList, deleteAgentById } from '../../action/agent';
import listColumns from './columns/list';
import { formItemLayout, showTotal, AGENT_TYPE } from '../../utils/constant';
import './index.css';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

@connect(({ agent }) => ({
  agentList: agent.agentList
}), {
  getAgentList
})
@Form.create()
export default class AgentList extends React.PureComponent {
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
              <Link to={`/agent/detail/${record.id}`}>查看</Link>
              <Divider type="vertical" />
              <Link to={`/agent/edit/${record.id}`}>编辑</Link>
              <Divider type="vertical" />
              <Popconfirm placement="topLeft" title={`请确定是否删除该代理商？`} onConfirm={() => this.deleteAgentById(record)} okText="确定" cancelText="取消">
                <a href="javascript:;">删除</a>
              </Popconfirm>
              <Divider type="vertical" />
              <Link to={`/agent/product/${record.id}`}>产品列表</Link>
            </div>
          )
        }
      },
    ];
  }

  state = {
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
    },
    selectedRowKeys: [],
    loading: false,
  };

  componentDidMount() {
    this.getAgentList();
  }

  componentWillUnmount() {
    this.setState = (state,callback) => { };
  }

  deleteAgent = async (record) => {
    const result = await deleteAgentById(record.id);
    if (result && result.code === 0) {
      message.success(`代理商商ID为${record.name}删除成功`);
      const pager = { ...this.props.pagination };
      this.getAgentList({
        limit: pager.pageSize,
        page: pager.current,
      });
    } else {
      message.error('删除失败，请稍后重试');
    }
  }

  getAgentList = async (params) => {
    this.setState({ loading: true });
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        const { createTime, ...newParams } = values;
        const beginTime = values.createTime ? values.createTime[0].format('YYYY-MM-DD') : undefined;
        const endTime = values.createTime ? values.createTime[1].format('YYYY-MM-DD') : undefined;
        await this.props.getAgentList({ ...newParams, ...params, beginTime, endTime});
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getAgentList();
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
    this.getAgentList({
      limit: pagination.pageSize,
      page: pagination.current,
    });
  }

  render() {
    const { form: { getFieldDecorator }, agentList } = this.props;
    const { selectedRowKeys, loading } = this.state;
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
                <FormItem {...formItemLayout} label="代理商名称">
                  {getFieldDecorator('name')(
                    <Input placeholder="请输入代理商名称" />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="代理商类型">
                  {getFieldDecorator('type')(
                    <Select allowClear placeholder="请选择代理商类型">
                      {Object.keys(AGENT_TYPE).map(item => (
                        <Option key={item} value={item}>{AGENT_TYPE[item]}</Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="代理商状态">
                  {getFieldDecorator('status')(
                    <Select allowClear placeholder="请选择代理商状态">
                      <Option value="0">正常</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="代理商账号">
                  {getFieldDecorator('accountId')(
                    <Input placeholder="请输入代理商账号" />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="创建起止时间">
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
            title={this.title}
            rowKey="id"
            onChange={this.handleTableChange}
            pagination={{ showTotal: showTotal, total: agentList.total, ...this.state.pagination }}
            rowSelection={rowSelection}
            columns={this.columns}
            dataSource={agentList.records}
            loading={loading}
          />
        </Card>
      </div>
    )
  }
}
