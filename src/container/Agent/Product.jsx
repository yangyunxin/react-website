import React from 'react';
import { connect } from 'react-redux';
import ReactToPrint from "react-to-print";
import { Card, Form, Row, Col, Input, Select, Table, Button, Divider, message, Popconfirm, Modal } from 'antd';
import { getProductList } from '../../action/product';
import { agentProduct } from '../../action/agent';
import listColumns from '../Product/columns/list';
import { formItemLayout, showTotal } from '../../utils/constant';
import './index.css'

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ product }) => ({
  productList: product.productList
}), {
  getProductList,
})
@Form.create()
export default class AgentProduct extends React.PureComponent {
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
              <Popconfirm placement="topLeft" title={`请确定是否取消关联该产品？`} onConfirm={() => this.updateProductStatus(record)} okText="确定" cancelText="取消">
                <a href="javascript:;">取消</a>
              </Popconfirm>
              <Divider type="vertical" />
              <a onClick={() => this.printProduct(record)} href="javascript:;">打印</a>
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
    visible: false,
    confirmLoading: false,
  };

  componentDidMount() {
    this.getProductList();
  }

  componentWillUnmount() {
    this.setState = (state,callback) => { };
  }

  getProductList = async (params) => {
    this.setState({ loading: true });
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        const { createdTime, ...newParams } = values;
        const beginTime = values.createdTime ? values.createdTime[0].format('YYYY-MM-DD') : undefined;
        const endTime = values.createdTime ? values.createdTime[1].format('YYYY-MM-DD') : undefined;
        await this.props.getProductList({ ...newParams, ...params, beginTime, endTime});
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getProductList();
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
    this.getProductList({
      limit: pagination.pageSize,
      page: pagination.current,
    });
  }

  title = () => {
    const { selectedRowKeys } = this.state;
    return (
      <div>
        <span>操作处理：</span>
        <Button disabled={!selectedRowKeys.length} onClick={this.showModal} type="primary">批量打印</Button>
        <Divider type="vertical" />
        <Button disabled={!selectedRowKeys.length} onClick={() => this.agentProduct(0)} type="primary">取消关联</Button>
        <Divider type="vertical" />
        <Button disabled={!selectedRowKeys.length} onClick={() => this.batchDownProduct(1)} type="primary">关联产品</Button>
      </div>
    )
  }

  agentProduct = async(sign) => {
    const agentId = this.props.match.params.id
    const { selectedRowKeys } = this.state;
    const values = selectedRowKeys.map(item => ({
      projectId: item,
      agentId,
      sign,
    }));
    const result = await agentProduct(values);
    if (result && result.code === 0) {
      message.success(`产品ID为${selectedRowKeys}关联代理商成功`);
      const pager = { ...this.props.pagination };
      this.getProductList({
        limit: pager.pageSize,
        page: pager.current,
      });
      this.setState({ selectedRowKeys: [] });
    } else {
      message.error('批量关联代理商失败，请稍后重试');
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  printProduct = () => {
    this.showModal();
  }

  render() {
    const { form: { getFieldDecorator }, productList = {} } = this.props;
    const { selectedRowKeys, loading, visible, confirmLoading } = this.state;
    const rowSelection = { selectedRowKeys, onChange: this.onSelectChange };
    return (
      <div className="page-list product-list">
        <Card bordered={false} className="form-container">
          <Form onSubmit={this.handleSubmit}>
            <Row gutter={12}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
                <FormItem {...formItemLayout} label="产品名称">
                  {getFieldDecorator('name')(
                    <Input placeholder="请输入产品名称" />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
                <FormItem {...formItemLayout} label="产品货号">
                  {getFieldDecorator('sameStyleNum')(
                    <Input placeholder="请输入产品货号" />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
                <FormItem {...formItemLayout} label="产品大类">
                  {getFieldDecorator('productCategory')(
                    <Select allowClear placeholder="请选择产品大类">
                      <Option value="1">大类一</Option>
                      <Option value="2">大类二</Option>
                      <Option value="3">大类三</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
                <FormItem {...formItemLayout} label="产品子类">
                  {getFieldDecorator('productSubcategory')(
                    <Select allowClear placeholder="请选择产品子类">
                      <Option value="1">子类一</Option>
                      <Option value="2">子类二</Option>
                      <Option value="3">子类三</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 8, push: 16 }} sm={{ span: 12, push: 12 }} lg={{ span: 8, push: 16 }} style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">搜索</Button>
                <Button style={{ marginLeft: '8px', marginRight: '8px' }} onClick={this.handleReset}>清空</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card bordered={false}>
          <Table
            title={this.title}
            rowKey="id"
            onChange={this.handleTableChange}
            pagination={{ showTotal: showTotal, total: productList.total, ...this.state.pagination }}
            rowSelection={rowSelection}
            columns={this.columns}
            dataSource={productList.records}
            loading={loading}
          />
        </Card>
        <Modal title="产品二维码"
          width={selectedRowKeys.length > 1 ? '700px': '400px'}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={null}
        >
          <div className="print-wrap" ref={el => (this.componentRef = el)}>
            <Row gutter={12}>
              {selectedRowKeys.map(item => (
                <Col style={{ marginBottom: 10 }} span={selectedRowKeys.length > 1 ? 12 : 24}>
                  <img alt="二维码" src="http://p1.music.126.net/YM1u6Id3RJEnagGv0XlDVQ==/109951163638964689.jpg?param=140y140" />
                  <img alt="产品图片" src="http://p1.music.126.net/JTzVZtQn4VVZy3kHPtj4NQ==/109951163595071165.jpg?param=140y140" />
                </Col>
              ))}
            </Row>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button onClick={this.handleCancel} style={{ marginRight: '20px' }}>取消</Button>
            <ReactToPrint
              trigger={() => <Button type="primary">打印</Button>}
              content={() => this.componentRef}
            />
          </div>
        </Modal>
      </div>
    )
  }
}
