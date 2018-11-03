import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Table, Select, Button, Drawer, message } from 'antd';
import EnhanceTitle from '../../component/EnhanceTitle';
import bannerOperateColumns from './columns/bannerOperate';
import { SKY_TYPE, formItemLayout2 } from '../../utils/constant';
import { addSkylight } from '../../action/skylight';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@Form.create()
export default class SkylightAdd extends React.PureComponent {
  state = { visible: false };

  showDrawer = () => {
    this.setState({ visible: true });
  };

  onClose = () => {
    this.setState({ visible: false });
  };

  handleSubmit= (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const result = await addSkylight(values);
        if (result && result.code === 0) {
          message.success('添加天窗成功！，你可以继续添加天窗，或者点击返回到列表页面');
        }
      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.state;
    return (
      <div className="page-detail">
        <Form onSubmit={this.handleSubmit}>
          <Card bordered={false}>
            <EnhanceTitle title="基本信息" />
            <FormItem {...formItemLayout2} label="天窗ID">
              {getFieldDecorator('skyId', {
                rules: [{
                  required: true, message: '请输入天窗ID',
                }],
              })(
                <Input placeholder="请输入天窗ID" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="天窗类型">
              {getFieldDecorator('skyType', {
                rules: [{
                  required: true, message: '请选择天窗类型',
                }],
              })(
                <Select allowClear placeholder="请选择天窗类型">
                  {Object.keys(SKY_TYPE).map(item => (
                    <Option key={item} value={item}>{SKY_TYPE[item]}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="天窗标题">
              {getFieldDecorator('skyTitle', {
                rules: [{
                  required: true, message: '请输入天窗标题',
                }],
              })(
                <Input placeholder="请输入天窗标题" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="天窗描述">
              {getFieldDecorator('description', {
                rules: [{
                  required: true, message: '请输入天窗描述',
                }],
              })(
                <TextArea rows={4} placeholder="请输入天窗描述" />
              )}
            </FormItem>
            {/* <FormItem {...formItemLayout2} label="添加banner">
              {getFieldDecorator('detail', {
                rules: [{
                  required: true, message: '请添加banner',
                }],
              })(
                <div onClick={this.showDrawer} className="ant-upload ant-upload-select ant-upload-select-picture-card">
                  <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                    <Icon type="plus" theme="outlined" />
                    <div className="antd-upload-text">添加</div>
                  </div>
                </div>
              )}
            </FormItem> */}
          </Card>
          <Card bordered={false}>
            <EnhanceTitle title="关联banner" />
            <Table bordered columns={bannerOperateColumns} dataSource={[] } />
          </Card>
          <div>
            <Button style={{ width: '100px', marginRight: '20px' }} type="primary" htmlType="submit">提交</Button>
            <Button onClick={this.handleReset} style={{ width: '100px', marginRight: '20px' }}>清空</Button>
            <Button style={{ width: '100px' }}>
              <Link to="/skylight/list">返回</Link>
            </Button>
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

        </Drawer>
      </div>
    )
  }
}
