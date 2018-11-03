import React from 'react';
import { Card, Form, Input, Table, Select, Button, Drawer, DatePicker, Radio, Icon } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
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
const drawerItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

@Form.create()
export default class BannerForm extends React.PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...drawerItemLayout} label="banner标题">
          {getFieldDecorator('colour', {
            rules: [{
              required: true, message: '请输入banner标题',
            }],
          })(
            <Input placeholder="请输入banner标题" />
          )}
        </FormItem>
        <FormItem {...drawerItemLayout} label="banner描述">
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入banner描述',
            }],
          })(
            <TextArea rows={4} placeholder="请输入banner描述" />
          )}
        </FormItem>
        <FormItem {...drawerItemLayout} label="图片">
          {getFieldDecorator('detail', {
            rules: [{
              required: true, message: '请添加产品图片',
            }],
          })(
            <Uploader placeholder="请添加产品图片" />
          )}
        </FormItem>
        <FormItem {...drawerItemLayout} label="链接">
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入链接',
            }],
          })(
            <Input placeholder="请输入链接" />
          )}
        </FormItem>
        <FormItem {...drawerItemLayout} label="开始时间">
          {getFieldDecorator('startTime', {
            rules: [{
              required: true, message: '请选择开始时间',
            }],
          })(
            <DatePicker placeholder="请选择开始时间"  />
          )}
        </FormItem>
        <FormItem {...drawerItemLayout} label="到期时间">
          {getFieldDecorator('endTime', {
            rules: [{
              required: true, message: '请选择到期时间',
            }],
          })(
            <DatePicker placeholder="请选择到期时间"  />
          )}
        </FormItem>
        <FormItem {...drawerItemLayout} label="上线/下线">
          {getFieldDecorator('status', {
            rules: [{
              required: true, message: '请选择上线/下线',
            }],
          })(
            <RadioGroup>
              <Radio value={0}>上线</Radio>
              <Radio value={1}>下线</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <div>
          <Button style={{ width: '100px', marginRight: '20px' }} type="primary" htmlType="submit">提交</Button>
          <Button style={{ width: '100px' }}>清空</Button>
        </div>
      </Form>
    )
  }
}
