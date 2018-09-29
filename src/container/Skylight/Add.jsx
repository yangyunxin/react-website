import React from 'react';
import { Card, Form, Input, Table, Select, Button, Drawer, DatePicker, Radio } from 'antd';
import EnhanceTitle from '../../component/EnhanceTitle';
import Uploader from '../../component/Uploader';
import bannerOperateColumns from './columns/bannerOperate';

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
export default class SkylightAdd extends React.PureComponent {
  state = { visible: false };

  showDrawer = () => {
    this.setState({ visible: true });
  };

  onClose = () => {
    this.setState({ visible: false });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.state;
    return (
      <div className="page-detail">
        <Form onSubmit={this.handleSubmit}>
          <Card bordered={false}>
            <EnhanceTitle title="基本信息" />
            <FormItem {...formItemLayout} label="天窗ID">
              {getFieldDecorator('skyId', {
                rules: [{
                  required: true, message: '请输入天窗ID',
                }],
              })(
                <Input placeholder="请输入天窗ID" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="天窗类型">
              {getFieldDecorator('skyType', {
                rules: [{
                  required: true, message: '请选择天窗类型',
                }],
              })(
                <Select allowClear placeholder="请选择天窗类型">
                  <Option value="Banner">Banner</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="天窗标题">
              {getFieldDecorator('skyTitle', {
                rules: [{
                  required: true, message: '请输入天窗标题',
                }],
              })(
                <Input placeholder="请输入天窗标题" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="天窗描述">
              {getFieldDecorator('description', {
                rules: [{
                  required: true, message: '请输入天窗描述',
                }],
              })(
                <TextArea rows={4} placeholder="请输入天窗描述" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="添加banner">
              {getFieldDecorator('detail', {
                rules: [{
                  required: true, message: '请添加banner',
                }],
              })(
                <div onClick={this.showDrawer} className="ant-upload ant-upload-select ant-upload-select-picture-card">
                  <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                    <i className="anticon anticon-plus"></i>
                    <div className="antd-upload-text">添加</div>
                  </div>
                </div>
              )}
            </FormItem>
          </Card>
          <Card bordered={false}>
            <EnhanceTitle title="关联banner" />
            <Table bordered columns={bannerOperateColumns} dataSource={[] } />
          </Card>
          <div>
            <Button style={{ width: '120px', marginRight: '20px' }} type="primary" htmlType="submit">提交</Button>
            <Button style={{ width: '120px' }}>清空</Button>
          </div>
        </Form>
        <Drawer
          title="添加banner"
          placement="right"
          width="50%"
          closable
          onClose={this.onClose}
          visible={visible}
        >
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
              <Button style={{ width: '120px', marginRight: '20px' }} type="primary" htmlType="submit">提交</Button>
              <Button style={{ width: '120px' }}>清空</Button>
            </div>
          </Form>
        </Drawer>
      </div>
    )
  }
}
