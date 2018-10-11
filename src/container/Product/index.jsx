import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Row, Col, Input, Select, DatePicker, Table, Button } from 'antd';
import { getProductList } from '../../action/product';
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

@connect(({ product }) => ({
  productList: product.productList
}), {
  getProductList,
})
@Form.create()
export default class ProductList extends React.PureComponent {
  state = {
    selectedRowKeys: [],
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

  render() {
    const { form: { getFieldDecorator }, productList = {} } = this.props;
    const { selectedRowKeys } = this.state;
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
                      <Option value="1">类别1</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}>
                <FormItem {...formItemLayout} label="产品子类">
                  {getFieldDecorator('productSubcategory')(
                    <Select allowClear placeholder="请选择产品子类">
                      <Option value="1">类别1</Option>
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
          <Table rowKey="id" rowSelection={rowSelection} columns={listColumns} dataSource={productList.records} />
        </Card>
      </div>
    )
  }
}
