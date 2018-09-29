import React from 'react';
import { Card, Form, Input, Select, Button } from 'antd';
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { detailPicture, ...params } = values;
        const pic = detailPicture[0];
        addProduct({ ...values, pic });
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
                  <Option value="1">类别1</Option>
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
                  <Option value="1">类别1</Option>
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
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="产品图片">
              {getFieldDecorator('detailPicture', {
                initialValue: ['https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'],
                rules: [{
                  required: true, message: '请添加产品图片',
                }],
              })(
                <Uploader placeholder="请输入产品名称" />
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
