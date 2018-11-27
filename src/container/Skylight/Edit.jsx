import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Input, Select, Button, message } from 'antd';
import EnhanceTitle from '../../component/EnhanceTitle';
import { formItemLayout2, SKY_TYPE } from '../../utils/constant';
import { getSkylightById, updateSkylight } from '../../action/skylight';
import Uploader from '../../component/Uploader';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ skylight }) => ({
  skylightDetail: skylight.skylightDetail
}), {
  getSkylightById
})
@Form.create()
export default class SkylightEdit extends React.PureComponent {
  componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    this.props.getSkylightById(id);
  }

  handleSubmit= (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { match } = this.props;
        const { params: { id } } = match;
        const result = await updateSkylight({ id, ...values });
        if (result && result.code === 0) {
          message.success('更新天窗成功！1s后跳转天窗列表页面');
          this.timer = setTimeout(() => {
            this.props.history.push('/skylight/list');
          }, 1000)
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { skylightDetail = {} } = this.props;
    return (
      <div className="page-detail">
        <Form onSubmit={this.handleSubmit}>
          <Card bordered={false}>
            <EnhanceTitle title="基本信息" />
            <FormItem {...formItemLayout2} label="天窗ID">
              {getFieldDecorator('skyId', {
                initialValue: skylightDetail.skyId,
                rules: [{
                  required: true, message: '请输入天窗ID',
                }],
              })(
                <Input placeholder="请输入天窗ID" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="天窗类型">
              {getFieldDecorator('skyType', {
                initialValue: skylightDetail.skyType,
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
                initialValue: skylightDetail.skyTitle,
                rules: [{
                  required: true, message: '请输入天窗标题',
                }],
              })(
                <Input placeholder="请输入天窗标题" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="天窗描述">
              {getFieldDecorator('description', {
                initialValue: skylightDetail.description,
                rules: [{
                  required: true, message: '请输入天窗描述',
                }],
              })(
                <TextArea rows={4} placeholder="请输入天窗描述" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="天窗图片">
              {getFieldDecorator('skyContent', {
                initialValue: [skylightDetail.skyContent],
                rules: [{
                  required: true, message: '请添加天窗图片',
                }],
              })(
                <Uploader type="banner" max={1} />
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
