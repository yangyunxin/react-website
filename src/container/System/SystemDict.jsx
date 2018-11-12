import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Form, Row, Col, Input, DatePicker, Table, Button, Divider, Drawer } from 'antd';
import { getSystemDictList, postSystemDict, putSystemDict, getSystemDictById } from '../../action/system';
import listColumns from './columns/dictList';
import { formItemLayout, showTotal } from '../../utils/constant';
import DictItem from './DictItem';
import './index.css'

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

@connect(({ system }) => ({
  systemDictList: system.systemDictList
}), {
  getSystemDictList,
})
@Form.create()
export default class SystemDict extends React.PureComponent {
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
            <a onClick={() => this.showDict(record.id)} href="javascript:;">查看</a>
            <Divider type="vertical" />
            <a onClick={() => this.editDict(record.id)} href="javascript:;">编辑</a>
            <Divider type="vertical" />
            <Link to={`/system/dictionary/${record.label}?level=${record.level+1}`}>下级</Link>
          </div>
        )
      },
    ];
  }

  state = {
    loading: false,
    visible: false,
    actionType: '',
    dictDetail: {},
    title: '',
  };

  componentDidMount() {
    this.getSystemDictList();
  }

  getSystemDictList = (params) => {
    this.setState({ loading: true });
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        const { createTime, ...newParams } = values;
        const beginTime = values.createTime ? values.createTime[0].format('YYYY-MM-DD') : undefined;
        const endTime = values.createTime ? values.createTime[1].format('YYYY-MM-DD') : undefined;
        await this.props.getSystemDictList({ ...newParams, ...params, beginTime, endTime, level: 2 });
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getSystemDictList();
  }

  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
    this.setState({ pagination: pager });
    this.getSystemDictList({
      limit: pagination.pageSize,
      page: pagination.current,
    });
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
    const pager = { ...this.state.pagination };
    this.getSystemDictList({
      limit: pager.pageSize,
      page: pager.current,
    });
  };

  addDict = () => {
    this.showDrawer();
    this.setState({ actionType: 'add', title: '数据字典添加' });
  }

  editDict = async (id) => {
    this.showDrawer();
    this.setState({ actionType: 'edit', title: '数据字典编辑' });
    const result = await getSystemDictById(id);
    this.setState({ dictDetail: result });
  }

  showDict = async (id) => {
    this.showDrawer();
    this.setState({ actionType: 'show', title: '数据字典详情' });
    const result = await getSystemDictById(id);
    this.setState({ dictDetail: result });
  }

  handleConfirm = (params) => {
    if (this.state.actionType === 'add') {
      return postSystemDict({ ...params, level: 2 });
    } else if (this.state.actionType === 'edit') {
      return putSystemDict({ ...params, level: 2, id: this.state.dictDetail.id });
    }
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { form: { getFieldDecorator }, systemDictList = {} } = this.props;
    const { loading } = this.state;
    const title = () => (
      <div>
        <span>操作处理：</span>
        <Button type="primary" onClick={this.addDict}>添加</Button>
      </div>
    );
    return (
      <div className="page-list operateLog-list">
        <Card bordered={false} className="form-container">
          <Form onSubmit={this.handleSubmit}>
            <Row gutter={12}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="字典编码">
                  {getFieldDecorator('label')(
                    <Input placeholder="请输入字典编码" />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="字典名称">
                  {getFieldDecorator('description')(
                    <Input placeholder="请输入字典编码" />
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
                <Button style={{ marginLeft: '8px', marginRight: '8px' }} onClick={this.handleReset}>
                  清空
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card bordered={false}>
          <Table
            title={title}
            rowKey="id"
            columns={this.columns}
            dataSource={systemDictList.records}
            onChange={this.handleTableChange}
            pagination={{ showTotal: showTotal, total: systemDictList.total, ...this.state.pagination }}
            loading={loading}
          />
        </Card>
        <DictItem
          title={this.state.title}
          onClose={this.onClose}
          visible={this.state.visible}
          handleSubmit={this.handleConfirm}
          parentLabel='dict'
          detail={this.state.dictDetail}
          actionType={this.state.actionType}
        />
      </div>
    )
  }
}
