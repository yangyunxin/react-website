import React from 'react';
import { Card, Form, Input, Select, Button, message } from 'antd';
import EnhanceTitle from '../../component/EnhanceTitle';
import Uploader from '../../component/Uploader';
import { addProduct } from '../../action/product';

const FormItem = Form.Item;
const Option = Select.Option;
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

@Form.create()
export default class ProductAdd extends React.PureComponent {
  handleSubmit= (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      console.log('Received values of form: ', values);
      if (!err) {
        const { mainPicture, detailPicture, ...params } = values;
        const pic = mainPicture[0];
        const detailPic = detailPicture.join(',');
        const result = await addProduct({ ...params, mainPicture: pic, detailPicture: detailPic });
        if (result && result.code === 0) {
          message.success('添加产品成功！')
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-detail">
      <Form onSubmit={this.handleSubmit}>
          <Card bordered={false}>
            <EnhanceTitle title="基本信息" />
            <FormItem {...formItemLayout} label="产品大类">
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
            <FormItem {...formItemLayout} label="产品子类">
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
            <FormItem {...formItemLayout} label="产品名称">
              {getFieldDecorator('name', {
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
            <FormItem {...formItemLayout} label="产品主图">
              {getFieldDecorator('mainPicture', {
                rules: [{
                  required: true, message: '请添加产品主图',
                }],
              })(
                <Uploader max={1}/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="产品详情图">
              {getFieldDecorator('detailPicture', {
                rules: [{
                  required: true, message: '请添加产品详情图',
                }],
              })(
                <Uploader placeholder="请输入产品名称" max={5} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="产品货号">
              {getFieldDecorator('sameStyleNum', {
                rules: [{
                  required: true, message: '请输入产品货号',
                }],
              })(
                <Input placeholder="请输入产品货号" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="成分">
              {getFieldDecorator('name1')(
                <Input placeholder="请输入产品成分" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="产品克重">
              {getFieldDecorator('name2')(
                <Input placeholder="请输入产品克重" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="产品门幅">
              {getFieldDecorator('name3')(
                <Input placeholder="请输入产品门幅" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="产品用途">
              {getFieldDecorator('name4')(
                <Input placeholder="请输入产品用途" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="加工工艺">
              {getFieldDecorator('name5')(
                <Input placeholder="请输入加工工艺" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="供应状态">
              {getFieldDecorator('name6')(
                <Input placeholder="请输入供应状态" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="发货地点">
              {getFieldDecorator('name7')(
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
