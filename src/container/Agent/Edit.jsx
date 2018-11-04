import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Select, Button, message } from 'antd';
import { getAgentById, updateAgent } from '../../action/agent';
import { formItemLayout2 } from '../../utils/constant';
import EnhanceTitle from '../../component/EnhanceTitle';
import Uploader from '../../component/Uploader';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ agent }) => ({
  agentDetail: agent.agentDetail
}), {
  getAgentById
})
@Form.create()
export default class AgentEdit extends React.PureComponent {
  componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    this.props.getAgentById(id)
  }

  componentWillUnmount() {
    this.timer = null;
  }

  timer = null

  handleSubmit= (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { match } = this.props;
        const { params: { id } } = match;
        const { url, ...params } = values;
        const result = await updateAgent({ id, url: url[0], ...params });
        if (result && result.code === 0) {
          message.success('更新代理商成功！1s后跳转代理商列表页面');
          this.timer = setTimeout(() => {
            this.props.history.push('/agent/list');
          }, 1000)
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { agentDetail = {} } = this.props;
    return (
      <div className="page-detail">
        <Form onSubmit={this.handleSubmit}>
          <Card bordered={false}>
            <EnhanceTitle title="基本信息" />
            <FormItem {...formItemLayout2} label="代理商编号">
              {getFieldDecorator('id', {
                initialValue: agentDetail.id,
                rules: [{
                  required: true, message: '请输入代理商编号',
                }],
              })(
                <Input disabled placeholder="请输入代理商编号" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="代理商类型">
              {getFieldDecorator('type', {
                initialValue: agentDetail.type,
                rules: [{
                  required: true, message: '请选择代理商类型',
                }],
              })(
                <Select allowClear placeholder="请选择代理商类型">
                  <Option value="0">门店代理商</Option>
                  <Option value="1">个人代理商</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="代理商名称">
              {getFieldDecorator('name', {
                initialValue: agentDetail.name,
                rules: [{
                  required: true, message: '请输入代理商名称',
                }],
              })(
                <Input placeholder="请输入代理商名称" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="代理商账号">
              {getFieldDecorator('accountId', {
                initialValue: agentDetail.accountId,
                rules: [{
                  required: true, message: '请输入代理商账号',
                }],
              })(
                <Input rows={4} placeholder="请输入代理商账号" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="返点率">
              {getFieldDecorator('diPer', {
                initialValue: agentDetail.diPer,
                rules: [{
                  required: true, message: '请输入返点率',
                }],
              })(
                <Input placeholder="请输入返点率" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="代理商状态">
              {getFieldDecorator('status', {
                initialValue: agentDetail.status,
                rules: [{
                  required: true, message: '请输入代理商状态',
                }],
              })(
                <Input placeholder="请输入代理商状态" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="门店图片">
              {getFieldDecorator('url', {
                initialValue: [agentDetail.url],
                rules: [{
                  required: true, message: '请输入门店图片',
                }],
              })(
                <Uploader placeholder="请输入门店图片" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="门店详情">
              {getFieldDecorator('detail', {
                initialValue: agentDetail.detail,
                rules: [{
                  required: true, message: '请输入门店详情',
                }],
              })(
                <TextArea rows={4} placeholder="请输入门店详情" />
              )}
            </FormItem>
          </Card>
          <div>
            <Button style={{ width: '100px', marginRight: '20px' }} type="primary" htmlType="submit">提交</Button>
            <Button style={{ width: '100px' }} type="primary">
              <Link to="/agent/list">返回</Link>
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}
