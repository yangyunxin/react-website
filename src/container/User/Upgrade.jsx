import 'braft-editor/dist/index.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Select, Button, message } from 'antd';
import BraftEditor from 'braft-editor'
import EnhanceTitle from '../../component/EnhanceTitle';
import Uploader from '../../component/Uploader';
import { upgradeUser } from '../../action/user';
import { formItemLayout2, formItemLayout4, AGENT_TYPE } from '../../utils/constant';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class UserUpgrade extends React.PureComponent {
  handleSubmit= (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { id } = this.props.match.params;
        const { detail, mainPicture, ...params } = values;
        const newDetail = values.detail.toRAW();
        const url = mainPicture && mainPicture[0];
        const result = upgradeUser({ ...params, accountId: id, url });
        if (result && result.code === 0) {
          message.success('升级代理商成功！将会返回用户列表页面');
        } else {
          message.error('升级代理商失败！请稍后重试');
        }
      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
    this.props.form.setFieldsValue({ detail: BraftEditor.createEditorState(null) });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media' ]
    return (
      <div className="page-detail">
      <Form onSubmit={this.handleSubmit}>
          <Card bordered={false}>
            <EnhanceTitle title="基本信息" />
            <FormItem {...formItemLayout2} label="代理商类型">
              {getFieldDecorator('type', {
                rules: [{
                  required: true, message: '请选择代理商类型',
                }],
              })(
                <Select allowClear placeholder="请选择代理商类型">
                {Object.keys(AGENT_TYPE).map(item => (
                  <Option key={item} value={item}>{AGENT_TYPE[item]}</Option>
                ))}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="代理商编号">
              {getFieldDecorator('TODO1')(
                <Input placeholder="请输入代理商编号" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="代理商名称">
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入代理商名称',
                }],
              })(
                <Input placeholder="请输入代理商名称" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="代理商账号">
              {getFieldDecorator('phoneNumber', {
                rules: [{
                  required: true, message: '请输入代理商账号',
                }],
              })(
                <Input placeholder="请输入代理商账号" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="返点率">
              {getFieldDecorator('diPer', {
                rules: [{
                  required: true, message: '请输入返点率',
                }],
              })(
                <Input addonAfter="%" placeholder="请输入返点率" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="门店图片">
              {getFieldDecorator('mainPicture', {
                rules: [{
                  required: true, message: '请添加门店图片',
                }],
              })(
                <Uploader max={1}/>
              )}
            </FormItem>
            <FormItem {...formItemLayout4} label="门店详情">
              {getFieldDecorator('detail')(
                <BraftEditor
                  className="my-editor"
                  controls={controls}
                  placeholder="请输入正文内容"
                />
              )}
            </FormItem>
          </Card>
          <div>
            <Button style={{ width: '100px', marginRight: '20px' }} type="primary" htmlType="submit">提交</Button>
            <Button onClick={this.handleReset} style={{ width: '100px', marginRight: '20px' }}>清空</Button>
            <Button style={{ width: '100px' }}><Link to="/user/list">返回</Link></Button>
          </div>
        </Form>
      </div>
    )
  }
}
