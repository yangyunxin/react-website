import React from 'react';
import { Input, Form, DatePicker } from 'antd';
import { formItemLayout3 } from '../../utils/constant';

const FormItem = Form.Item;

class OrderForm extends React.PureComponent {
  constructor(props) {
    super(props);
    if (props.getCurrent) {
      props.getCurrent(this);
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
      <FormItem {...formItemLayout3} label="快递公司">
        {getFieldDecorator('expressCompanyName', {
          rules: [{
            required: true, message: '请输入快递公司',
          }],
        })(
          <Input placeholder="请输入快递公司" />
        )}
      </FormItem>
      <FormItem {...formItemLayout3} label="快递单号">
        {getFieldDecorator('expressTrackingNo', {
          rules: [{
            required: true, message: '请输入快递单号',
          }],
        })(
          <Input placeholder="请输入快递单号" />
        )}
      </FormItem>
      <FormItem {...formItemLayout3} label="发货时间">
        {getFieldDecorator('shippingTime', {
          rules: [{
            required: true, message: '请选择发货时间',
          }],
        })(
          <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime placeholder="请选择发货时间" />
        )}
      </FormItem>
    </Form>
    )
  }
}

export default Form.create()(OrderForm);
