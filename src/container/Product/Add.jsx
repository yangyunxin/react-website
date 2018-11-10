import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Select, Button, message } from 'antd';
import EnhanceTitle from '../../component/EnhanceTitle';
import Uploader from '../../component/Uploader';
import { addProduct } from '../../action/product';
import { formItemLayout2, PRODUCT_TYPE, PRODUCT_SUB, SUPPLY_STATUS } from '../../utils/constant';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class ProductAdd extends React.PureComponent {
  handleSubmit= (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { mainPicture, detailPicture, ...params } = values;
        const pic = mainPicture[0];
        const detailPic = detailPicture.join(',');
        const result = await addProduct({ ...params, mainPicture: pic, detailPicture: detailPic });
        if (result && result.code === 0) {
          message.success('添加产品成功！，你可以继续添加产品，或者点击返回到列表页面');
        } else {
          message.error('添加产品失败，请稍后重试！');
        }
      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-detail">
      <Form onSubmit={this.handleSubmit}>
          <Card bordered={false}>
            <EnhanceTitle title="基本信息" />
            <FormItem {...formItemLayout2} label="产品名称">
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入产品名称',
                }],
              })(
                <Input placeholder="请输入产品名称" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品货号">
              {getFieldDecorator('sameStyleNum', {
                rules: [{
                  required: true, message: '请输入产品货号',
                }],
              })(
                <Input placeholder="请输入产品货号" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品大类">
              {getFieldDecorator('productCategory', {
                rules: [{
                  required: true, message: '请选择产品大类',
                }],
              })(
                <Select placeholder="请选择产品大类">
                  {Object.keys(PRODUCT_TYPE).map(item => (
                    <Option key={item} value={item}>{PRODUCT_TYPE[item]}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品子类">
              {getFieldDecorator('productSubcategory', {
                rules: [{
                  required: true, message: '请选择产品子类',
                }],
              })(
                <Select placeholder="请选择产品子类">
                  {Object.keys(PRODUCT_SUB).map(item => (
                    <Option key={item} value={item}>{PRODUCT_SUB[item]}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <EnhanceTitle title="详情信息" />
            <FormItem {...formItemLayout2} label="颜色">
              {getFieldDecorator('colour', {
                rules: [{
                  required: true, message: '请选择产品颜色',
                }],
              })(
                <Select allowClear placeholder="请选择产品颜色">
                  <Option value="1">红色</Option>
                  <Option value="2">黑色</Option>
                  <Option value="3">蓝色</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品主图">
              {getFieldDecorator('mainPicture', {
                rules: [{
                  required: true, message: '请添加产品主图',
                }],
              })(
                <Uploader max={1}/>
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品详情图">
              {getFieldDecorator('detailPicture', {
                rules: [{
                  required: true, message: '请添加产品详情图',
                }],
              })(
                <Uploader placeholder="请输入产品名称" max={5} />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="成分">
              {getFieldDecorator('ingredient', {
                rules: [{
                  required: true, message: '请输入产品成分',
                }],
              })(
                <Input placeholder="请输入产品成分" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="克重">
              {getFieldDecorator('weight', {
                rules: [{
                  required: true, message: '请输入产品克重',
                }],
              })(
                <Input placeholder="请输入产品克重" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="门幅">
              {getFieldDecorator('size', {
                rules: [{
                  required: true, message: '请输入产品门幅',
                }],
              })(
                <Input placeholder="请输入产品门幅" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="产品用途">
              {getFieldDecorator('use', {
                rules: [{
                  required: true, message: '请输入产品用途',
                }],
              })(
                <Input placeholder="请输入产品用途" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="加工工艺">
              {getFieldDecorator('craft', {
                rules: [{
                  required: true, message: '请输入产品加工工艺',
                }],
              })(
                <Input placeholder="请输入产品加工工艺" />
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="供应状态">
              {getFieldDecorator('supplyStatus', {
                rules: [{
                  required: true, message: '请选择产品供应状态',
                }],
              })(
                <Select allowClear placeholder="请选择产品供应状态">
                  {Object.keys(SUPPLY_STATUS).map(item => (
                    <Option key={item} value={item}>{SUPPLY_STATUS[item]}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout2} label="发货地点">
              {getFieldDecorator('pointOfDeparture', {
                rules: [{
                  required: true, message: '请输入产品发货地点',
                }],
              })(
                <Input placeholder="请输入产品发货地点" />
              )}
            </FormItem>
          </Card>
          <div>
            <Button style={{ width: '100px', marginRight: '20px' }} type="primary" htmlType="submit">提交</Button>
            <Button onClick={this.handleReset} style={{ width: '100px', marginRight: '20px' }}>清空</Button>
            <Button style={{ width: '100px' }}>
              <Link to="/product/list">返回</Link>
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}
