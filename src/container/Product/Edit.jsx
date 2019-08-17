import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Select, Button, message } from 'antd';
import { formItemLayout2, SUPPLY_STATUS } from '../../utils/constant';
import { getProductById, updateProduct } from '../../action/product';
import { getSystemDicts } from '../../action/system';
import { getProductTypes } from '../../action/productType';
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
    productCategory: [],
    productSubcategory: [],
    colour: [],
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    const result = await this.props.getProductById(id);
    if (result) {
      const resp1 = await getProductTypes({ parentLabel: 'productCategory' });
      this.setState({ productCategory: resp1 });
      const resp2 = await getProductTypes({ parentLabel: result.productCategory });
      this.setState({ productSubcategory: resp2 });
      const colour = getSystemDicts({ parentLabel: 'colour' });
      this.setState({ colour: await colour });
    }
  }

  componentWillUnmount() {
    this.timer = null;
  }

  timer = null;

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
          message.success('编辑产品成功！1s后跳转到列表页面');
          this.timer = setTimeout(() => {
            this.props.history.push('/product/list');
          }, 1000)
        } else {
          message.error('编辑产品失败，请稍后重试！');
        }
      }
    })
  }

  handleCateChange = async (value) => {
    this.props.form.setFieldsValue({ productSubcategory: undefined });
    if (value) {
      const result = await getProductTypes({ parentLabel: value });
      this.setState({ productSubcategory: result });
    }
  }

  render() {
    const { productDetail, form } = this.props;
    const { getFieldDecorator } = form;
    const { productCategory, productSubcategory, colour } = this.state;
    return (
      <div className="page-detail">
        <Form onSubmit={this.handleSubmit}>
          <Card bordered={false}>
            <EnhanceTitle title="基本信息" />
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
            <FormItem {...formItemLayout2} label="产品大类">
              {getFieldDecorator('productCategory', {
                initialValue: productDetail.productCategory,
                rules: [{
                  required: true, message: '请选择产品大类',
                }],
              })(
                <Select onChange={this.handleCateChange} allowClear placeholder="请选择产品大类">
                  {productCategory.map(item => (
                    <Option key={item.label} value={item.label}>{item.description}</Option>
                  ))}
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
                  {productSubcategory.map(item => (
                    <Option key={item.label} value={item.label}>{item.description}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <EnhanceTitle title="详情信息" />
            <FormItem {...formItemLayout2} label="颜色">
              {getFieldDecorator('colour', {
                initialValue: (colour.length && productDetail.colour) && colour.find(item => item.description === productDetail.colour).label,
                rules: [{
                  required: true, message: '请选择产品颜色',
                }],
              })(
                <Select allowClear placeholder="请选择产品颜色">
                  {colour.map(item => (
                    <Option key={item.label} value={item.label}>{item.description}</Option>
                  ))}
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
                initialValue: productDetail.detailPicture ? productDetail.detailPicture.split(',') : [],
                rules: [{
                  required: true, message: '请添加产品详情图',
                }],
              })(
                <Uploader placeholder="请输入产品名称" max={5} />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="克重">
              {getFieldDecorator('weight', {
                initialValue: productDetail.weight,
                rules: [{
                  required: true, message: '请输入产品克重',
                }],
              })(
                <Input placeholder="请输入产品克重" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="门幅">
              {getFieldDecorator('size', {
                initialValue: productDetail.size,
                rules: [{
                  required: true, message: '请输入产品门幅',
                }, {
                  pattern: /^[0-9.]+$/g, message: '请输入数字'
                }],
              })(
                <Input addonAfter="厘米" placeholder="请输入产品门幅" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品用途">
              {getFieldDecorator('use', {
                initialValue: productDetail.use,
                rules: [{
                  required: true, message: '请输入产品用途',
                }],
              })(
                <Input placeholder="请输入产品用途" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="加工工艺">
              {getFieldDecorator('craft', {
                initialValue: productDetail.craft,
                rules: [{
                  required: true, message: '请输入产品加工工艺',
                }],
              })(
                <Input placeholder="请输入产品加工工艺" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="供应状态">
              {getFieldDecorator('supplyStatus', {
                initialValue: productDetail.supplyStatus,
                rules: [{
                  required: true, message: '请输入产品供应状态',
                }],
              })(
                <Select allowClear placeholder="请选择产品供应状态">
                  {Object.keys(SUPPLY_STATUS).map(item => (
                    <Option key={item} value={item}>{SUPPLY_STATUS[item]}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="发货地点">
              {getFieldDecorator('pointOfDeparture', {
                initialValue: productDetail.pointOfDeparture,
                rules: [{
                  required: true, message: '请输入产品发货地点',
                }],
              })(
                <Input placeholder="请输入产品发货地点" />
              )}
            </FormItem>
          </Card>
          <div>
            <Button style={{ width: '100px', marginRight: '20px' }} type="primary" htmlType="submit">提交</Button>
            <Button style={{ width: '100px' }} type="primary">
              <Link to="/product/list">返回</Link>
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}
