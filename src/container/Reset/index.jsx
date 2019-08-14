import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, message } from 'antd';
import { postResetAdminInfo } from '../../action/auth';
import './index.css';

const FormItem = Form.Item;
const formReset = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

@connect(({ auth }) => ({
  userInfo: auth.userInfo,
}), {
  postResetAdminInfo
})
@Form.create()
export default class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { history, form } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        const { userInfo = {} } = this.props;
        const { sysUser = {} } = userInfo;
        const resp = await this.props.postResetAdminInfo({
          ...sysUser,
          ...values,
        });
        if (resp) {
          message.success('重置密码成功，将跳转登录页面');
          history.push('/login');
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userInfo = {} } = this.props;
    const { sysUser = {} } = userInfo;
    return (
      <div className="reset-page">
        <h4>重置密码功能</h4>
        <Form onSubmit={this.handleSubmit} className="reset-form">
          <FormItem {...formReset} label="用户名">
            {getFieldDecorator('username', {
              initialValue: sysUser.username,
              rules: [{ required: true, message: '请输入用户名' }],
            })(
              <Input placeholder="请输入用户名" />
            )}
          </FormItem>
          <FormItem {...formReset} label="手机号">
            {getFieldDecorator('phone', {
              initialValue: sysUser.phone,
              rules: [{ required: true, message: '请输入手机号' }],
            })(
              <Input placeholder="请输入手机号" />
            )}
          </FormItem>
          <FormItem {...formReset} label="旧密码">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入旧密码' }],
            })(
              <Input type="password" placeholder="请输入旧密码" />
            )}
          </FormItem>
          <FormItem {...formReset} label="新密码">
            {getFieldDecorator('newpassword1', {
              rules: [{ required: true, message: '请输入新密码' }],
            })(
              <Input type="password" placeholder="请输入新密码" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="page-form-button">重置密码</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
