import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Form, Row, Col, Input, Select, DatePicker, Table, Button, Divider, message, Modal, Popconfirm } from 'antd';
import PriceForm from './PriceForm';
import { getProductList, addBatch, batchUpProduct, batchDownProduct, updateProduct } from '../../action/product';
import listColumns from './columns/list';
import { formItemLayout, showTotal } from '../../utils/constant';
import './index.css'

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

@connect(({ product }) => ({
  productList: product.productList
}), {
  getProductList,
})
@Form.create()
export default class ProductList extends React.PureComponent {
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
              <Link to={`/product/detail/${record.id}`}>查看</Link>
              <Divider type="vertical" />
              <Link to={`/product/edit/${record.id}`}>编辑</Link>
              <Divider type="vertical" />
              <Popconfirm placement="topLeft" title={`请确定是否${record.status === '1' ? '下架' : '上架'}该产品？`} onConfirm={() => this.updateProductStatus(record)} okText="确定" cancelText="取消">
                <a href="javascript:;">{record.status === '1' ? '下架' : '上架'}</a>
              </Popconfirm>
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

  updateProductStatus = async ({ id, status }) => {
    let nextStatus = '1';
    let info = '上架';
    if (status === '1') {
      nextStatus = '2';
      info = '下架';
    }
    const result = await updateProduct({
      id,
      status: nextStatus,
    });
    if (result && result.code === 0) {
      message.success(`产品ID为${id}的产品${info}成功`);
      const pager = { ...this.state.pagination };
      this.getProductList({
        limit: pager.pageSize,
        page: pager.current,
      });
    } else {
      message.error('产品状态变更失败，请稍后重试');
    }
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

  title = () => {
    const { selectedRowKeys } = this.state;
    return (
      <div>
        <span>操作处理：</span>
        <Button disabled={!selectedRowKeys.length} onClick={this.showModal} type="primary">批量定价</Button>
        <Divider type="vertical" />
        <Button disabled={!selectedRowKeys.length} onClick={this.batchUpProduct} type="primary">批量上架</Button>
        <Divider type="vertical" />
        <Button disabled={!selectedRowKeys.length} onClick={this.batchDownProduct} type="primary">批量下架</Button>
      </div>
    )
  }

  addBatch = async(params) => {
    const { selectedRowKeys } = this.state;
    let values = [];
    selectedRowKeys.forEach(item => {
      values.push({
        projectId: item,
        interval: `${params.num1}-${params.num2}`,
        price: params.price1,
        unit: params.unit,
      });
      values.push({
        projectId: item,
        interval: `${params.num3}-${params.num4}`,
        price: params.price2,
        unit: params.unit,
      });
      values.push({
        projectId: item,
        interval: `${params.num5}-${params.num6}`,
        price: params.price3,
        unit: params.unit,
      });
    });

    const result = await addBatch(values);
    if (result && result.code === 0) {
      message.success(`产品ID为${selectedRowKeys}批量定价成功`);
      const pager = { ...this.props.pagination };
      this.getProductList({
        limit: pager.pageSize,
        page: pager.current,
      });
      this.setState({ selectedRowKeys: [] });
    } else {
      message.error('批量定价失败，请稍后重试');
    }
  }

  batchUpProduct = async() => {
    const { selectedRowKeys } = this.state;
    const result = await batchUpProduct(selectedRowKeys);
    if (result && result.code === 0) {
      message.success(`产品ID为${selectedRowKeys}批量上架成功`);
      const pager = { ...this.props.pagination };
      this.getProductList({
        limit: pager.pageSize,
        page: pager.current,
      });
      this.setState({ selectedRowKeys: [] });
    } else {
      message.error('批量上架失败，请稍后重试');
    }
  }

  batchDownProduct = async() => {
    const { selectedRowKeys } = this.state;
    const result = await batchDownProduct(selectedRowKeys);
    if (result && result.code === 0) {
      message.success(`产品ID为${selectedRowKeys}批量下架成功`);
      const pager = { ...this.props.pagination };
      this.getProductList({
        limit: pager.pageSize,
        page: pager.current,
      });
      this.setState({ selectedRowKeys: [] });
    } else {
      message.error('批量下架失败，请稍后重试');
    }
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
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="产品名称">
                  {getFieldDecorator('name')(
                    <Input placeholder="请输入产品名称" />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
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
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
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
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="产品状态">
                  {getFieldDecorator('status')(
                    <Select allowClear placeholder="请选择产品状态">
                      <Option value={0}>待上架</Option>
                      <Option value={1}>上架</Option>
                      <Option value={2}>下架</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="是否定价">
                  {getFieldDecorator('priceStatus')(
                    <Select allowClear placeholder="请选择定价状态">
                      <Option value={0}>未定价</Option>
                      <Option value={1}>已定价</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="创建起止时间">
                  {getFieldDecorator('createdTime')(
                    <RangePicker format={dateFormat} />
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
        <Modal title="产品批量定价"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={null}
        >
          <PriceForm handleCancel={this.handleCancel} addBatch={this.addBatch} />
        </Modal>
      </div>
    )
  }
}
