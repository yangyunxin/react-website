import React from 'react';
import { Drawer, Form, Button, Input, message } from 'antd';
import { formItemLayout5 } from '../../utils/constant';

const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
export default class DictItem extends React.Component {
  state = {
    loading: false,
  };

  handleSubmit = () => {
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        const { level, title } = this.props;
        this.setState({ loading: true });
        const result = await this.props.handleSubmit({ ...values, level });
        this.setState({ loading: false });
        if (result.code === 0) {
          this.props.onClose();
          message.success(`${title}成功`);
        }
      }
    });
  }

  onClose = () => {
    this.props.onClose();
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { detail = {}, actionType, title } = this.props;
    return (
      <Drawer
        title={title}
        width={600}
        placement="right"
        onClose={this.onClose}
        visible={this.props.visible}
      >
        <Form>
          <FormItem {...formItemLayout5} label="父编码">
            {getFieldDecorator('parentLabel', {
              initialValue: this.props.parentLabel,
              rules: [{
                required: true, message: '请输入字典父编码',
              }],
            })(
              <Input disabled placeholder="请输入字典父编码" />
            )}
          </FormItem>
          <FormItem {...formItemLayout5} label="值">
            {getFieldDecorator('value', {
              initialValue: detail.value,
              rules: [{
                required: true, message: '请输入字典值',
              }],
            })(
              <Input placeholder="请输入字典值" />
            )}
          </FormItem>
          <FormItem {...formItemLayout5} label="字典编码">
            {getFieldDecorator('label', {
              initialValue: detail.label,
              rules: [{
                required: true, message: '请输入字典编码',
              }],
            })(
              <Input placeholder="请输入字典编码" />
            )}
          </FormItem>
          <FormItem {...formItemLayout5} label="字典名称">
            {getFieldDecorator('description', {
              initialValue: detail.description,
              rules: [{
                required: true, message: '请输入字典名称',
              }],
            })(
              <Input placeholder="请输入字典名称" />
            )}
          </FormItem>
          <FormItem {...formItemLayout5} label="顺序">
            {getFieldDecorator('sort', {
              initialValue: detail.sort,
              rules: [{
                required: true, message: '请输入字典顺序',
              }],
            })(
              <Input placeholder="请输入字典顺序" />
            )}
          </FormItem>
          <FormItem {...formItemLayout5} label="备注">
            {getFieldDecorator('remarks', {
              initialValue: detail.remarks,
            })(
              <TextArea rows={4} placeholder="请输入字典备注" />
            )}
          </FormItem>
          <FormItem {...formItemLayout5} label=" " colon={false}>
          {actionType !== 'show' && <Button style={{ marginRight: 8 }} onClick={this.handleSubmit} type="primary">提交</Button>}
          <Button onClick={this.onClose}>取消</Button>
          </FormItem>
        </Form>
      </Drawer>
    );
  }
}
