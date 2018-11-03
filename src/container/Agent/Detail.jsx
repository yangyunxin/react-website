import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Select, Button } from 'antd';
import { getAgentById } from '../../action/agent';
import { formItemLayout2 } from '../../utils/constant';
import { formatDateSecond } from '../../utils/utils';
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
export default class AgentDetail extends React.PureComponent {
  componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    this.props.getAgentById(id)
  }
  render() {
    const { agentDetail = {} } = this.props;
    return (
      <div className="page-detail">
        <Form>
          <Card bordered={false}>
            <EnhanceTitle title="基本信息" />
            <FormItem {...formItemLayout2} label="代理商编号">
              <Input value={agentDetail.id} placeholder="请输入代理商编号" />
            </FormItem>
            <FormItem {...formItemLayout2} label="代理商类型">
              <Select value={agentDetail.type} placeholder="请选择代理商类型">
                <Option value="0">门店代理商</Option>
                <Option value="1">个人代理商</Option>
              </Select>
            </FormItem>
            <FormItem {...formItemLayout2} label="代理商名称">
              <Input value={agentDetail.name} placeholder="请输入代理商名称" />
            </FormItem>
            <FormItem {...formItemLayout2} label="代理商账号">
              <Input value={agentDetail.accountId} placeholder="请输入代理商账号" />
            </FormItem>
            <FormItem {...formItemLayout2} label="返点率">
              <Input value={agentDetail.diPer} placeholder="请输入返点率" />
            </FormItem>
            <FormItem {...formItemLayout2} label="代理商状态">
              <Input value={agentDetail.status} placeholder="请输入代理商状态" />
            </FormItem>
            <FormItem {...formItemLayout2} label="门店图片">
              <Uploader value={[agentDetail.url]} max={1} noRemove noAdd />
            </FormItem>
            <FormItem {...formItemLayout2} label="门店详情">
              <TextArea value={agentDetail.detail} placeholder="请输入门店详情" />
            </FormItem>
            <FormItem {...formItemLayout2} label="创建时间">
              <Input value={formatDateSecond(agentDetail.createTime)} placeholder="请输入创建时间" />
            </FormItem>
            <FormItem {...formItemLayout2} label="创建人">
              <Input value={agentDetail.creator} placeholder="请输入创建人" />
            </FormItem>
            <FormItem {...formItemLayout2} label="更新时间">
              <Input value={formatDateSecond(agentDetail.updateTime)} placeholder="请输入更新时间" />
            </FormItem>
            <FormItem {...formItemLayout2} label="更新人">
              <Input value={agentDetail.editer} placeholder="请输入更新人" />
            </FormItem>
          </Card>
          <div>
            <Button style={{ width: '100px' }} type="primary">
              <Link to="/agent/list">返回</Link>
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}
