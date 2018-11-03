import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Input, Select, Button } from 'antd';
import { getProductById } from '../../action/product';
import { formItemLayout2 } from '../../utils/constant';
import EnhanceTitle from '../../component/EnhanceTitle';
import Uploader from '../../component/Uploader';

const FormItem = Form.Item;
const { Option } = Select;;

@connect(({ product }) => ({
  productDetail: product.productDetail
}), {
  getProductById
})
@Form.create()
export default class ProductDetail extends React.PureComponent {
  state = {
    visible: false,
  }
  componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    this.props.getProductById(id)
  }
  render() {
    const { productDetail = {}, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="page-detail">
        <Form onSubmit={this.handleSubmit}>
          <Card bordered={false}>
            <EnhanceTitle title="基本信息" />
            <FormItem {...formItemLayout2} label="产品大类">
              {getFieldDecorator('productCategory', {
                initialValue: productDetail.productCategory,
                rules: [{
                  required: true, message: '请选择产品大类',
                }],
              })(
                <Select disabled allowClear placeholder="请选择产品大类">
                  <Option value="1">类别1</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品子类">
              {getFieldDecorator('productSubcategory', {
                initialValue: productDetail.productSubcategory,
                rules: [{
                  required: true, message: '请选择产品子类',
                }],
              })(
                <Select disabled allowClear placeholder="请选择产品子类">
                  <Option value="1">类别1</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品名称">
              {getFieldDecorator('name', {
                initialValue: productDetail.name,
                rules: [{
                  required: true, message: '请输入产品名称',
                }],
              })(
                <Input disabled placeholder="请输入产品名称" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="计价单位">
              {getFieldDecorator('name', {
                initialValue: productDetail.name,
                rules: [{
                  required: true, message: '请输入计价单位',
                }],
              })(
                <Input disabled placeholder="请输入计价单位" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品价格">
              {getFieldDecorator('name', {
                initialValue: productDetail.name,
                rules: [{
                  required: true, message: '请输入产品价格',
                }],
              })(
                <table className="priceform-table">
                  <thead>
                    <tr>
                      <th>数量</th>
                      <th>价格</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <FormItem style={{ display: 'inline-block' }}>
                          {getFieldDecorator('num1', {
                            initialValue: 1,
                          })(
                            <Input style={{ width: 60 }} />
                          )}
                        </FormItem>
                        <span style={{ padding: '0 15px' }}>至</span>
                        <FormItem style={{ display: 'inline-block' }}>
                          {getFieldDecorator('num2')(
                            <Input style={{ width: 60 }} />
                          )}
                        </FormItem>
                      </td>
                      <td>
                        <FormItem style={{ display: 'inline-block' }}>
                          {getFieldDecorator('price1')(
                            <Input style={{ width: 60 }} />
                          )}
                        </FormItem>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FormItem style={{ display: 'inline-block' }}>
                          {getFieldDecorator('num3')(
                            <Input style={{ width: 60 }} />
                          )}
                        </FormItem>
                        <span style={{ padding: '0 15px' }}>至</span>
                        <FormItem style={{ display: 'inline-block' }}>
                          {getFieldDecorator('num4')(
                            <Input style={{ width: 60 }} />
                          )}
                        </FormItem>
                      </td>
                      <td>
                        <FormItem style={{ display: 'inline-block' }}>
                          {getFieldDecorator('price2')(
                            <Input style={{ width: 60 }} />
                          )}
                        </FormItem>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <FormItem style={{ display: 'inline-block' }}>
                          {getFieldDecorator('num5')(
                            <Input style={{ width: 60 }} />
                          )}
                        </FormItem>
                        <span style={{ padding: '0 15px' }}>至</span>
                        <FormItem style={{ display: 'inline-block' }}>
                          {getFieldDecorator('num6', {
                            initialValue: 'max',
                          })(
                            <Input style={{ width: 60 }} />
                          )}
                        </FormItem>
                      </td>
                      <td>
                        <FormItem style={{ display: 'inline-block' }}>
                          {getFieldDecorator('price3')(
                            <Input style={{ width: 60 }} />
                          )}
                        </FormItem>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </FormItem>
            <EnhanceTitle title="详情信息" />
            <FormItem {...formItemLayout2} label="颜色">
              {getFieldDecorator('colour', {
                initialValue: productDetail.colour,
                rules: [{
                  required: true, message: '请选择产品颜色',
                }],
              })(
                <Select disabled allowClear placeholder="请选择产品颜色">
                  <Option value="1">类别1</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品主图">
              {getFieldDecorator('mainPicture', {
                initialValue: productDetail.mainPicture ? productDetail.mainPicture.split(',') : undefined,
                rules: [{
                  required: true, message: '请添加产品主图',
                }],
              })(
                <Uploader max={1} noRemove noAdd />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品详情图">
              {getFieldDecorator('detailPicture', {
                initialValue: productDetail.detailPicture ? productDetail.detailPicture.split(',') : undefined,
                rules: [{
                  required: true, message: '请添加产品详情图',
                }],
              })(
                <Uploader max={5} noRemove noAdd />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品货号">
              {getFieldDecorator('sameStyleNum', {
                initialValue: productDetail.sameStyleNum,
                rules: [{
                  required: true, message: '请输入产品货号',
                }],
              })(
                <Input disabled placeholder="请输入产品货号" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="成分">
              {getFieldDecorator('name')(
                <Input placeholder="请输入产品成分" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品克重">
              {getFieldDecorator('name')(
                <Input placeholder="请输入产品克重" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品门幅">
              {getFieldDecorator('name')(
                <Input placeholder="请输入产品门幅" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品用途">
              {getFieldDecorator('name')(
                <Input placeholder="请输入产品用途" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="加工工艺">
              {getFieldDecorator('name')(
                <Input placeholder="请输入加工工艺" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="供应状态">
              {getFieldDecorator('name')(
                <Input placeholder="请输入供应状态" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="发货地点">
              {getFieldDecorator('name')(
                <Input placeholder="请输入发货地点" />
              )}
            </FormItem>
            <Button type="primary">返回</Button>
          </Card>
        </Form>
      </div>
    )
  }
}
