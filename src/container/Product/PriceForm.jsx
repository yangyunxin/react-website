import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { UNIT_VALUES } from '../../utils/constant';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
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

  handleNum2Change = (e) => {
    const value = e.target.value;
    this.props.form.setFieldsValue({
      num3: parseInt(value, 10) + 1,
    });
  }

  handleNum4Change = (e) => {
    const value = e.target.value;
    this.props.form.setFieldsValue({
      num5: parseInt(value, 10) + 1,
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="计价单位">
          {getFieldDecorator('unit', {
            initialValue: '0',
            rules: [{
              required: true, message: '请选择计价单位',
            }],
          })(
            <Select>
              {Object.keys(UNIT_VALUES).map(item => (
                <Option key={item} value={item}>{UNIT_VALUES[item]}</Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem required {...formItemLayout} label="产品价格">
          <table className="priceform-table">
            <thead>
              <tr>
                <th>数量</th>
                <th>价格</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <FormItem style={{ display: 'inline-block' }}>
                    {getFieldDecorator('num1', {
                      initialValue: 1,
                    })(
                      <Input style={{ width: 60 }} />
                    )}
                  </FormItem>
                  <span style={{ padding: '0 15px' }}>至</span>
                  <FormItem style={{ display: 'inline-block' }}>
                    {getFieldDecorator('num2')(
                      <Input style={{ width: 60 }} onChange={this.handleNum2Change} />
                    )}
                  </FormItem>
                </td>
                <td>
                  <FormItem style={{ display: 'inline-block' }}>
                    {getFieldDecorator('price1')(
                      <Input style={{ width: 60 }} />
                    )}
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td>
                  <FormItem style={{ display: 'inline-block' }}>
                    {getFieldDecorator('num3')(
                      <Input style={{ width: 60 }} />
                    )}
                  </FormItem>
                  <span style={{ padding: '0 15px' }}>至</span>
                  <FormItem style={{ display: 'inline-block' }}>
                    {getFieldDecorator('num4')(
                      <Input style={{ width: 60 }} onChange={this.handleNum4Change} />
                    )}
                  </FormItem>
                </td>
                <td>
                  <FormItem style={{ display: 'inline-block' }}>
                    {getFieldDecorator('price2')(
                      <Input style={{ width: 60 }} />
                    )}
                  </FormItem>
                </td>
              </tr>
              <tr>
                <td>
                  <FormItem style={{ display: 'inline-block' }}>
                    {getFieldDecorator('num5')(
                      <Input style={{ width: 60 }} />
                    )}
                  </FormItem>
                  <span style={{ padding: '0 15px' }}>至</span>
                  <FormItem style={{ display: 'inline-block' }}>
                    {getFieldDecorator('num6', {
                      initialValue: 'max',
                    })(
                      <Input style={{ width: 60 }} />
                    )}
                  </FormItem>
                </td>
                <td>
                  <FormItem style={{ display: 'inline-block' }}>
                    {getFieldDecorator('price3')(
                      <Input style={{ width: 60 }} />
                    )}
                  </FormItem>
                </td>
              </tr>
            </tbody>
          </table>
        </FormItem>
        <FormItem {...formItemLayout}>
          <Button style={{ width: '120px', marginRight: '20px' }} type="primary" htmlType="submit">提交</Button>
          <Button onClick={this.handleReset} style={{ width: '120px' }}>清空</Button>
        </FormItem>
      </Form>
    )
  }
}
