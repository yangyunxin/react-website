import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Input, Select, Button, message } from 'antd';
import { getProductById, updateProduct } from '../../action/product';
import EnhanceTitle from '../../component/EnhanceTitle';
import Uploader from '../../component/Uploader';

const FormItem = Form.Item;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};

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
            <FormItem {...formItemLayout} label="产品大类">
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
            <FormItem {...formItemLayout} label="产品子类">
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
            <FormItem {...formItemLayout} label="产品名称">
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
            <FormItem {...formItemLayout} label="颜色">
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
            <FormItem {...formItemLayout} label="产品主图">
              {getFieldDecorator('mainPicture', {
                initialValue: [productDetail.mainPicture],
                rules: [{
                  required: true, message: '请添加产品主图',
                }],
              })(
                <Uploader max={1}/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="产品详情图">
              {getFieldDecorator('detailPicture', {
                initialValue: [productDetail.detailPicture],
                rules: [{
                  required: true, message: '请添加产品详情图',
                }],
              })(
                <Uploader placeholder="请输入产品名称" max={5} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="产品货号">
              {getFieldDecorator('sameStyleNum', {
                initialValue: productDetail.sameStyleNum,
                rules: [{
                  required: true, message: '请输入产品货号',
                }],
              })(
                <Input placeholder="请输入产品货号" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="成分">
              {getFieldDecorator('name')(
                <Input placeholder="请输入产品成分" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="产品克重">
              {getFieldDecorator('name')(
                <Input placeholder="请输入产品克重" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="产品门幅">
              {getFieldDecorator('name')(
                <Input placeholder="请输入产品门幅" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="产品用途">
              {getFieldDecorator('name')(
                <Input placeholder="请输入产品用途" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="加工工艺">
              {getFieldDecorator('name')(
                <Input placeholder="请输入加工工艺" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="供应状态">
              {getFieldDecorator('name')(
                <Input placeholder="请输入供应状态" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="发货地点">
              {getFieldDecorator('name')(
                <Input placeholder="请输入发货地点" />
              )}
            </FormItem>
          </Card>
          <div>
            <Button style={{ width: '120px', marginRight: '20px' }} type="primary" htmlType="submit">提交</Button>
            <Button style={{ width: '120px' }}>清空</Button>
          </div>
        </Form>
      </div>
    )
  }
}