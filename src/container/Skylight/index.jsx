import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Form, Row, Col, Input, Select, DatePicker, Table, Button, Divider } from 'antd';
import listColumns from './columns/list';
import { formItemLayout, showTotal } from '../../utils/constant';
import { getSkylightList } from '../../action/skylight';
import './index.css'

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

@connect(({ skylight }) => ({
  skylightList: skylight.skylightList
}), {
  getSkylightList
})
@Form.create()
export default class SkylightList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      ...listColumns,
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        align: 'center',
        render: (text, record) => (
          <div>
            <Link to={`/skylight/detail/${record.id}`}>查看</Link>
            <Divider type="vertical" />
            <Link to={`/skylight/edit/${record.id}`}>编辑</Link>
            <Divider type="vertical" />
            <a onClick={this.deleteSkylight} href="javascript:;">删除</a>
          </div>
        )
      },
    ];
  }

  state = {
    selectedRowKeys: [],
    loading: false,
  };

  componentDidMount() {
    this.getSkylightList();
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  getSkylightList = (params) => {
    this.setState({ loading: true });
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        const { createdTime, ...params } = values;
        const beginTime = values.createdTime ? values.createdTime[0].format('YYYY-MM-DD') : undefined;
        const endTime = values.createdTime ? values.createdTime[1].format('YYYY-MM-DD') : undefined;
        await this.props.getSkylightList({ ...params, beginTime, endTime});
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  deleteSkylight = (id) => {

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getSkylightList();
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({ pagination: pager });
    this.getSkylightList({
      limit: pagination.pageSize,
      page: pagination.current,
    });
  }

  render() {
    const { form: { getFieldDecorator }, skylightList } = this.props;
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
                <FormItem {...formItemLayout} label="天窗标题">
                  {getFieldDecorator('skyTitle')(
                    <Input placeholder="请输入天窗标题" />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="天窗类型">
                  {getFieldDecorator('skyType')(
                    <Select allowClear placeholder="请选择天窗类型">
                      <Option value="Banner">Banner</Option>
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
            dataSource={skylightList.records}
            onChange={this.handleTableChange}
            pagination={{ showTotal: showTotal, total: skylightList.total, ...this.state.pagination }}
            loading={loading}
          />
        </Card>
      </div>
    )
  }
}
