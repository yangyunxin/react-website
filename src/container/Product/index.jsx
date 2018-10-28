import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Row, Col, Input, Select, DatePicker, Table, Button, Divider } from 'antd';
import { getProductList, batchUpProduct } from '../../action/product';
import listColumns from './columns/list';
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
function showTotal(total, range) {
  return `共${total}条数据`;
}

@connect(({ product }) => ({
  productList: product.productList
}), {
  getProductList,
})
@Form.create()
export default class ProductList extends React.PureComponent {
  state = {
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
    },
    selectedRowKeys: [],
    loading: false,
  };

  componentDidMount() {
    this.props.getProductList();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.getProductList(values);
      }
    })
  }

  getProductList = async (params) => {
    this.setState({ loading: true });
    await this.props.getProductList(params);
    this.setState({ loading: false });
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

  handleReset = () => {
    this.props.form.resetFields();
  }

  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({ pagination: pager });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getProductList({
          limit: pagination.pageSize,
          page: pagination.current,
          ...values,
        });
      }
    });
  }

  title = () => {
    return (
      <div>
        <span>操作处理：</span>
        <Button onClick={this.batchUpProduct} type="primary">批量定价</Button>
        <Divider type="vertical" />
        <Button onClick={this.batchUpProduct} type="primary">批量上架</Button>
        <Divider type="vertical" />
        <Button type="primary">批量下架</Button>
      </div>
    )
  }

  batchUpProduct = () => {
    const { selectedRowKeys } = this.state;
    console.log(selectedRowKeys);
    batchUpProduct({ idList: selectedRowKeys });
  }

  render() {
    const { form: { getFieldDecorator }, productList = {} } = this.props;
    const { selectedRowKeys, loading } = this.state;
    const rowSelection = { selectedRowKeys, ...this.rowSelection };
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
            onChange={this.handleTableChange}
            pagination={{ showTotal: showTotal, total: productList.total, ...this.state.pagination }}
            rowSelection={rowSelection}
            columns={listColumns}
            dataSource={productList.records}
            loading={loading}
          />
        </Card>
      </div>
    )
  }
}
