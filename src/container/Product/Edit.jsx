import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Select, Button, message } from 'antd';
import { formItemLayout2 } from '../../utils/constant';
import { getProductById, updateProduct } from '../../action/product';
import EnhanceTitle from '../../component/EnhanceTitle';
import Uploader from '../../component/Uploader';

const FormItem = Form.Item;
const { Option } = Select;

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

  handleSubmit= (e) => {
    e.preventDefault();
    const { match } = this.props;
    const { params: { id } } = match;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { mainPicture, detailPicture, ...params } = values;
        const pic = mainPicture[0];
        const detailPic = detailPicture.join(',');
        const result = await updateProduct({
          ...params,
          mainPicture: pic,
          detailPicture: detailPic,
          id,
        });
        if (result && result.code === 0) {
          message.success('编辑产品成功！')
        }
      }
    })
  }

  render() {
    const { productDetail, form } = this.props;
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
                <Select allowClear placeholder="请选择产品大类">
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
                <Select allowClear placeholder="请选择产品子类">
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
                <Input placeholder="请输入产品名称" />
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
                <Select allowClear placeholder="请选择产品颜色">
                  <Option value="1">类别1</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品主图">
              {getFieldDecorator('mainPicture', {
                initialValue: [productDetail.mainPicture],
                rules: [{
                  required: true, message: '请添加产品主图',
                }],
              })(
                <Uploader max={1}/>
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品详情图">
              {getFieldDecorator('detailPicture', {
                initialValue: [productDetail.detailPicture],
                rules: [{
                  required: true, message: '请添加产品详情图',
                }],
              })(
                <Uploader placeholder="请输入产品名称" max={5} />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品货号">
              {getFieldDecorator('sameStyleNum', {
                initialValue: productDetail.sameStyleNum,
                rules: [{
                  required: true, message: '请输入产品货号',
                }],
              })(
                <Input placeholder="请输入产品货号" />
              )}
            </FormItem>
          </Card>
          <div>
            <Button style={{ width: '100px', marginRight: '20px' }} type="primary" htmlType="submit">提交</Button>
            <Button style={{ width: '100px' }} type="primary">
              <Link to="/agent/list">返回</Link>
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}
