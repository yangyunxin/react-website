import React from 'react';
import { Card, Form, Input, Select, Button } from 'antd';
import EnhanceTitle from '../../component/EnhanceTitle';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
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
export default class SkylightAdd extends React.PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-detail">
        <Form onSubmit={this.handleSubmit}>
          <Card bordered={false}>
            <EnhanceTitle title="基本信息" />
            <FormItem {...formItemLayout} label="代理商编号">
              {getFieldDecorator('id', {
                rules: [{
                  required: true, message: '请输入代理商编号',
                }],
              })(
                <Input placeholder="请输入代理商编号" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="代理商类型">
              {getFieldDecorator('type', {
                rules: [{
                  required: true, message: '请选择代理商类型',
                }],
              })(
                <Select allowClear placeholder="请选择代理商类型">
                  <Option value="Banner">Banner</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="代理商名称">
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入代理商名称',
                }],
              })(
                <Input placeholder="请输入代理商名称" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="代理商账号">
              {getFieldDecorator('accountId', {
                rules: [{
                  required: true, message: '请输入代理商账号',
                }],
              })(
                <Input rows={4} placeholder="请输入代理商账号" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="返点率">
              {getFieldDecorator('diPer', {
                rules: [{
                  required: true, message: '请输入返点率',
                }],
              })(
                <Input rows={4} placeholder="请输入返点率" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="代理商状态">
              {getFieldDecorator('status', {
                rules: [{
                  required: true, message: '请输入代理商状态',
                }],
              })(
                <Input rows={4} placeholder="请输入代理商状态" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="门店图片">
              {getFieldDecorator('url', {
                rules: [{
                  required: true, message: '请输入门店图片',
                }],
              })(
                <Input rows={4} placeholder="请输入门店图片" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="门店详情">
              {getFieldDecorator('detail', {
                rules: [{
                  required: true, message: '请输入门店详情',
                }],
              })(
                <TextArea rows={4} placeholder="请输入门店详情" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="创建时间">
              {getFieldDecorator('createTime', {
                rules: [{
                  required: true, message: '请输入创建时间',
                }],
              })(
                <Input rows={4} placeholder="请输入创建时间" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="创建人">
              {getFieldDecorator('creator', {
                rules: [{
                  required: true, message: '请输入创建人',
                }],
              })(
                <Input rows={4} placeholder="请输入创建人" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="更新时间">
              {getFieldDecorator('updateTime', {
                rules: [{
                  required: true, message: '请输入更新时间',
                }],
              })(
                <Input rows={4} placeholder="请输入更新时间" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="更新人">
              {getFieldDecorator('editer', {
                rules: [{
                  required: true, message: '请输入更新人',
                }],
              })(
                <Input rows={4} placeholder="请输入更新人" />
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
