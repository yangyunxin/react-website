import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Select, Button, message } from 'antd';
import EnhanceTitle from '../../component/EnhanceTitle';
import Uploader from '../../component/Uploader';
import { addProduct } from '../../action/product';
import { formItemLayout2 } from '../../utils/constant';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class ProductAdd extends React.PureComponent {
  handleSubmit= (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { mainPicture, detailPicture, ...params } = values;
        const pic = mainPicture[0];
        const detailPic = detailPicture.join(',');
        const result = await addProduct({ ...params, mainPicture: pic, detailPicture: detailPic });
        if (result && result.code === 0) {
          message.success('添加产品成功！，你可以继续添加产品，或者点击返回到列表页面');
        }
      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-detail">
      <Form onSubmit={this.handleSubmit}>
          <Card bordered={false}>
            <EnhanceTitle title="基本信息" />
            <FormItem {...formItemLayout2} label="产品大类">
              {getFieldDecorator('productCategory', {
                rules: [{
                  required: true, message: '请选择产品大类',
                }],
              })(
                <Select allowClear placeholder="请选择产品大类">
                  <Option value="1">大类一</Option>
                  <Option value="2">大类二</Option>
                  <Option value="3">大类三</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品子类">
              {getFieldDecorator('productSubcategory', {
                rules: [{
                  required: true, message: '请选择产品子类',
                }],
              })(
                <Select allowClear placeholder="请选择产品子类">
                  <Option value="1">子类一</Option>
                  <Option value="2">子类二</Option>
                  <Option value="3">子类三</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品名称">
              {getFieldDecorator('name', {
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
                rules: [{
                  required: true, message: '请选择产品颜色',
                }],
              })(
                <Select allowClear placeholder="请选择产品颜色">
                  <Option value="1">红色</Option>
                  <Option value="2">黑色</Option>
                  <Option value="3">蓝色</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品主图">
              {getFieldDecorator('mainPicture', {
                rules: [{
                  required: true, message: '请添加产品主图',
                }],
              })(
                <Uploader max={1}/>
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品详情图">
              {getFieldDecorator('detailPicture', {
                rules: [{
                  required: true, message: '请添加产品详情图',
                }],
              })(
                <Uploader placeholder="请输入产品名称" max={5} />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品货号">
              {getFieldDecorator('sameStyleNum', {
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
            <Button onClick={this.handleReset} style={{ width: '100px', marginRight: '20px' }}>清空</Button>
            <Button style={{ width: '100px' }}>
              <Link to="/product/list">返回</Link>
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}
