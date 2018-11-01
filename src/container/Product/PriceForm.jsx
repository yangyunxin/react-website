import React from 'react';
import { Form, Input, Select, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

@Form.create()
export default class PriceForm extends React.PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        this.props.addBatch(values);
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="计价单位">
          {getFieldDecorator('unit', {
            rules: [{
              required: true, message: '请选择计价单位',
            }],
          })(
            <Select>
              <Option value={1}>米</Option>
              <Option value={2}>平方</Option>
            </Select>
          )}
        </FormItem>
        <FormItem required {...formItemLayout} label="产品价格">
          <table style={{ width: '100%', textAlign: 'center' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #dddddd' }}>数量</th>
                <th style={{ border: '1px solid #dddddd' }}>价格</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #dddddd' }}>
                  {getFieldDecorator('num', {
                    initialValue: 1,
                  })(
                    <Input style={{ width: 60 }} />
                  )}
                  <span style={{ padding: '0 15px' }}>至</span>
                  {getFieldDecorator('num2')(
                    <Input style={{ width: 60 }} />
                  )}
                </td>
                <td style={{ border: '1px solid #dddddd' }}>
                  {getFieldDecorator('price')(
                    <Input style={{ width: 60 }} />
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #dddddd' }}>
                  {getFieldDecorator('nu3')(
                    <Input style={{ width: 60 }} />
                  )}
                  <span style={{ padding: '0 15px' }}>至</span>
                  {getFieldDecorator('num4')(
                    <Input style={{ width: 60 }} />
                  )}
                </td>
                <td style={{ border: '1px solid #dddddd' }}>
                  {getFieldDecorator('price2')(
                    <Input style={{ width: 60 }} />
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #dddddd' }}>
                  {getFieldDecorator('num5')(
                    <Input style={{ width: 60 }} />
                  )}
                  <span style={{ padding: '0 15px' }}>至</span>
                  {getFieldDecorator('num6')(
                    <Input style={{ width: 60 }} />
                  )}
                </td>
                <td style={{ border: '1px solid #dddddd' }}>
                  {getFieldDecorator('price3')(
                    <Input style={{ width: 60 }} />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </FormItem>
        <FormItem required {...formItemLayout}>
          <Button style={{ width: '120px', marginRight: '20px' }} type="primary" htmlType="submit">提交</Button>
          <Button onClick={this.props.handleCancel} style={{ width: '120px' }}>清空</Button>
        </FormItem>
      </Form>
    )
  }
}
