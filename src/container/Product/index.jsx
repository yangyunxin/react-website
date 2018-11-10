import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Form, Row, Col, Input, Select, DatePicker, Table, Button, Divider, message, Modal, Popconfirm } from 'antd';
import PriceForm from './PriceForm';
import { getProductList, addBatch, batchUpProduct, batchDownProduct, updateProduct } from '../../action/product';
import listColumns from './columns/list';
import { formItemLayout, showTotal, PRODUCT_TYPE, PRODUCT_SUB, PRODUCT_STATUS } from '../../utils/constant';
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
        fixed: 'right',
        render: (text, record) => {
          return (
            <div>
              <Link to={`/product/detail/${record.id}`}>查看</Link>
              <Divider type="vertical" />
              <Link to={`/product/edit/${record.id}`}>编辑</Link>
              <Divider type="vertical" />
              {record.priceList.length ? (
                <Popconfirm
                  placement="topLeft"
                  title={`请确定是否${record.status === '1' ? '下架' : '上架'}该产品？`}
                  onConfirm={() => this.updateProductStatus(record)}
                  okText="确定"
                  cancelText="取消"
                >
                  <a href="javascript:;">{record.status === '1' ? '下架' : '上架'}</a>
                </Popconfirm>
              ) : (
                <Popconfirm
                  placement="topLeft"
                  title={`请确定是否定价该产品？`}
                  onConfirm={() => this.singlePrice(record)}
                  okText="确定"
                  cancelText="取消"
                >
                  <a href="javascript:;">定价</a>
                </Popconfirm>
              )}
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
    selectedRows: [],
    loading: false,
    visible: false,
    confirmLoading: false,
    batchList: [],
  };

  componentDidMount() {
    this.getProductList();
  }

  componentWillUnmount() {
    this.setState = (state, callback) => { };
  }

  getProductList = async (params) => {
    this.setState({ loading: true });
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        const { createTime, ...newParams } = values;
        const beginTime = values.createTime ? values.createTime[0].format('YYYY-MM-DD') : undefined;
        const endTime = values.createTime ? values.createTime[1].format('YYYY-MM-DD') : undefined;
        await this.props.getProductList({ ...newParams, ...params, beginTime, endTime});
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  updateProductStatus = async ({ id, status, name }) => {
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
      message.success(`产品名称为${name}的产品${info}成功`);
      const pager = { ...this.state.pagination };
      this.getProductList({
        limit: pager.pageSize,
        page: pager.current,
      });
    } else {
      message.error('产品状态变更失败，请稍后重试');
    }
  }

  singlePrice = (record) => {
    this.setState({
      batchList: [record],
    });
    this.showModal();
  }

  batchPrice = () => {
    const { selectedRows } = this.state;
    this.setState({
      batchList: selectedRows,
    });
    this.showModal();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getProductList();
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    const { selectedRows: productList } = this.state;
    let newRows = [];
    if (selectedRowKeys.length === selectedRows.length) {
      newRows = [...selectedRows];
    } else if (selectedRowKeys.length > selectedRows.length) {
      const otherRowsKeys = selectedRowKeys.filter(item => selectedRows.every(row => row.id !== item));
      const otherRows = productList.filter(item => otherRowsKeys.indexOf(item.id) !== -1);
      newRows = otherRows.concat(selectedRows);
    }
    this.setState({ selectedRows: newRows, selectedRowKeys });
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
    this.setState({ visible: true });
  }

  handleOk = () => {
    this.setState({ confirmLoading: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  title = () => {
    const { selectedRowKeys } = this.state;
    return (
      <div>
        <span>操作处理：</span>
        <Button disabled={!selectedRowKeys.length} onClick={this.batchPrice} type="primary">批量定价</Button>
        <Divider type="vertical" />
        <Button disabled={!selectedRowKeys.length} onClick={this.batchUpProduct} type="primary">批量上架</Button>
        <Divider type="vertical" />
        <Button disabled={!selectedRowKeys.length} onClick={this.batchDownProduct} type="primary">批量下架</Button>
      </div>
    )
  }

  addBatch = async(params) => {
    const { batchList } = this.state;
    let values = [];
    batchList.forEach(item => {
      values.push({
        productId: item.id,
        interval: `${params.num1}-${params.num2}`,
        price: params.price1,
        unit: params.unit,
      });
      values.push({
        productId: item.id,
        interval: `${params.num3}-${params.num4}`,
        price: params.price2,
        unit: params.unit,
      });
      values.push({
        productId: item.id,
        interval: `${params.num5}-${params.num6}`,
        price: params.price3,
        unit: params.unit,
      });
    });

    const result = await addBatch(values);
    if (result && result.code === 0) {
      this.handleCancel();
      const nameStr = batchList.map(item => item.name).join('、');
      const messageInfo = (
        <p style={{ display: 'inline' }}>产品名称为<span style={{ color: 'red' }}>{nameStr}</span>定价成功</p>
      );
      message.success(messageInfo);
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
    const { selectedRows, selectedRowKeys } = this.state;
    const noPriceNameList = [];
    selectedRows.forEach(item => {
      if (!item.priceList.length) {
        noPriceNameList.push(item.name);
      }
    });
    if (noPriceNameList.length) {
      message.error(<p style={{ display: 'inline' }}>产品名称为<span style={{ color: 'red' }}>{noPriceNameList.join('、')}</span>还未定价，不能上架</p>)
      return false;
    }
    const result = await batchUpProduct(selectedRowKeys);
    if (result && result.code === 0) {
      const nameStr = selectedRows.map(item => item.name).join('、');
      const messageInfo = (
        <p style={{ display: 'inline' }}>产品名称为<span style={{ color: 'red' }}>{nameStr}</span>上架成功</p>
      );
      message.success(messageInfo);
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
    const { selectedRows, selectedRowKeys } = this.state;
    const noPriceNameList = [];
    selectedRows.forEach(item => {
      if (!item.priceList.length) {
        noPriceNameList.push(item.name);
      }
    });
    if (noPriceNameList.length) {
      message.error(<p style={{ display: 'inline' }}>产品名称为<span style={{ color: 'red' }}>{noPriceNameList.join('、')}</span>还未定价，不能下架</p>)
      return false;
    }
    const result = await batchDownProduct(selectedRowKeys);
    if (result && result.code === 0) {
      const nameStr = selectedRows.map(item => item.name).join('、');
      const messageInfo = (
        <p style={{ display: 'inline' }}>产品名称为<span style={{ color: 'red' }}>{nameStr}</span>下架成功</p>
      );
      message.success(messageInfo);
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
                <FormItem {...formItemLayout} label="产品货号">
                  {getFieldDecorator('sameStyleNum')(
                    <Input placeholder="请输入产品货号" />
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="产品大类">
                  {getFieldDecorator('productCategory')(
                    <Select allowClear placeholder="请选择产品大类">
                      {Object.keys(PRODUCT_TYPE).map(item => (
                        <Option key={item} value={item}>{PRODUCT_TYPE[item]}</Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="产品子类">
                  {getFieldDecorator('productSubcategory')(
                    <Select allowClear placeholder="请选择产品子类">
                      {Object.keys(PRODUCT_SUB).map(item => (
                        <Option key={item} value={item}>{PRODUCT_SUB[item]}</Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="产品状态">
                  {getFieldDecorator('status')(
                    <Select allowClear placeholder="请选择产品状态">
                      {Object.keys(PRODUCT_STATUS).map(item => (
                        <Option key={item} value={item}>{PRODUCT_STATUS[item]}</Option>
                      ))}
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
                  {getFieldDecorator('createTime')(
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
            scroll={{ x: 1100 }}
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
