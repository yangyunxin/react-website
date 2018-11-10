import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, message } from 'antd';
import { authUserLogin } from '../../action/auth';
import './index.css';

const FormItem = Form.Item;

@connect(null, { authUserLogin })
@Form.create()
export default class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const data = {
          ...values,
          grant_type: 'password',
          scope: 'server',
        }
        const result = await this.props.authUserLogin(data);
        if (result) {
          message.success('登录成功，欢迎来到快布易管理系统！');
          this.props.history.push('/')
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-page">
        <h4>快易布业务管理系统</h4>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
