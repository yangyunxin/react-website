import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Row, Col, Input, Select, DatePicker, Table, Button } from 'antd';
import { getSystemLogList } from '../../action/system';
import listColumns from './columns/list';
import { formItemLayout, showTotal } from '../../utils/constant';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

@connect(({ system }) => ({
  systemLogList: system.systemLogList
}), {
  getSystemLogList,
})
@Form.create()
export default class OperateLog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      ...listColumns,
    ];
  }
  state = {
    selectedRowKeys: [],
    loading: false,
  };

  componentDidMount() {
    this.props.getSystemLogList();
  }

  getSystemLogList = (params) => {
    this.setState({ loading: true });
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        const { createTime, ...newParams } = values;
        const beginTime = values.createTime ? values.createTime[0].format('YYYY-MM-DD') : undefined;
        const endTime = values.createTime ? values.createTime[1].format('YYYY-MM-DD') : undefined;
        await this.props.getSystemLogList({ ...newParams, ...params, beginTime, endTime});
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getSystemLogList();
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
    this.setState({ pagination: pager });
    this.getSystemLogList({
      limit: pagination.pageSize,
      page: pagination.current,
    });
  }

  render() {
    const { form: { getFieldDecorator }, systemLogList = {} } = this.props;
    const { selectedRowKeys, loading } = this.state;
    const rowSelection = { selectedRowKeys, ...this.rowSelection };
    return (
      <div className="page-list operateLog-list">
        <Card bordered={false} className="form-container">
          <Form onSubmit={this.handleSubmit}>
            <Row gutter={12}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="操作人">
                  {getFieldDecorator('createBy')(
                    <Input placeholder="请输入操作人" />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="日志类型">
                  {getFieldDecorator('type')(
                    <Select allowClear placeholder="请选择日志类型">
                      <Option value="1">类别1</Option>
                    </Select>
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
            rowKey="id"
            rowSelection={rowSelection}
            columns={this.columns}
            dataSource={systemLogList.records}
            onChange={this.handleTableChange}
            pagination={{ showTotal: showTotal, total: systemLogList.total, ...this.state.pagination }}
            loading={loading}
          />
        </Card>
      </div>
    )
  }
}
