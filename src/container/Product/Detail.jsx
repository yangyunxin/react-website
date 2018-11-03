import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Select, Button } from 'antd';
import { getProductById } from '../../action/product';
import { formItemLayout2 } from '../../utils/constant';
import EnhanceTitle from '../../component/EnhanceTitle';
import Uploader from '../../component/Uploader';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ product }) => ({
  productDetail: product.productDetail
}), {
  getProductById
})
export default class ProductDetail extends React.PureComponent {
  componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    this.props.getProductById(id);
  }
  render() {
    const { productDetail = {} } = this.props;
    const product = productDetail.priceList && productDetail.priceList.length ? productDetail.priceList[0] : {}
    const priceList = productDetail.priceList || [];
    return (
      <div className="page-detail">
        <Form onSubmit={this.handleSubmit}>
          <Card bordered={false}>
            <EnhanceTitle title="基本信息" />
            <FormItem {...formItemLayout2} label="产品大类">
              <Select value={productDetail.productCategory} allowClear placeholder="请选择产品大类">
                <Option value="1">类别1</Option>
              </Select>
            </FormItem>
            <FormItem {...formItemLayout2} label="产品子类">
              <Select value={productDetail.productSubcategory} allowClear placeholder="请选择产品子类">
                <Option value="1">类别1</Option>
                <Option value="2">类别2</Option>
              </Select>
            </FormItem>
            <FormItem {...formItemLayout2} label="产品名称">
              <Input value={productDetail.name} placeholder="请输入产品名称" />
            </FormItem>
            <FormItem {...formItemLayout2} label="计价单位">
              <Input value={product['unit']} placeholder="请输入计价单位" />
            </FormItem>
            <FormItem {...formItemLayout2} label="产品价格">
              <table className="priceform-table">
                <thead>
                  <tr>
                    <th>数量</th>
                    <th>价格</th>
                  </tr>
                </thead>
                <tbody>
                  {priceList.map(item => {
                    const interval = item.interval.split('-');
                    return (
                      <tr key={item.id}>
                        <td>
                          <FormItem style={{ display: 'inline-block' }}>
                            <Input value={interval[0]} style={{ width: 60 }} />
                          </FormItem>
                          <span style={{ padding: '0 15px' }}>至</span>
                          <FormItem style={{ display: 'inline-block' }}>
                            <Input value={interval[1]} style={{ width: 60 }} />
                          </FormItem>
                        </td>
                        <td>
                          <FormItem style={{ display: 'inline-block' }}>
                            <Input value={item.price} style={{ width: 60 }} />
                          </FormItem>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </FormItem>
            <EnhanceTitle title="详情信息" />
            <FormItem {...formItemLayout2} label="颜色">
              <Select value={productDetail.colour} allowClear placeholder="请选择产品颜色">
                <Option value="1">类别1</Option>
              </Select>
            </FormItem>
            <FormItem {...formItemLayout2} label="产品主图">
              <Uploader value={productDetail.mainPicture ? productDetail.mainPicture.split(',') : undefined} max={1} noRemove noAdd />
            </FormItem>
            <FormItem {...formItemLayout2} label="产品详情图">
              <Uploader value={productDetail.detailPicture ? productDetail.detailPicture.split(',') : undefined} max={5} noRemove noAdd />
            </FormItem>
            <FormItem {...formItemLayout2} label="产品货号">
              <Input value={productDetail.sameStyleNum} placeholder="请输入产品货号" />
            </FormItem>
            <Button type="primary">
              <Link to="/agent/list">返回</Link>
            </Button>
          </Card>
        </Form>
      </div>
    )
  }
}
