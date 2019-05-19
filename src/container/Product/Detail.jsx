import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Select, Button } from 'antd';
import { getProductById } from '../../action/product';
import { formItemLayout2, SUPPLY_STATUS, UNIT_VALUES } from '../../utils/constant';
import { formatYuan } from '../../utils/utils';
import EnhanceTitle from '../../component/EnhanceTitle';
import { getSystemDicts } from '../../action/system';
import { getProductTypes } from '../../action/productType';
import Uploader from '../../component/Uploader';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ product }) => ({
  productDetail: product.productDetail
}), {
  getProductById
})
export default class ProductDetail extends React.PureComponent {
  state = {
    productCategory: [],
    productSubcategory: [],
    colour: [],
  }
  async componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    const result = await this.props.getProductById(id);
    if (result) {
      const resp1 = await getProductTypes({ parentLabel: 'productCategory' });
      this.setState({ productCategory: resp1 });
      const resp2 = await getProductTypes({ parentLabel: result.productCategory });
      this.setState({ productSubcategory: resp2 });
      const colour = getSystemDicts({ parentLabel: 'colour' });
      this.setState({ colour: await colour });
    }
  }
  render() {
    const { productDetail = {} } = this.props;
    const product = productDetail.priceList && productDetail.priceList.length ? productDetail.priceList[0] : {}
    const priceList = productDetail.priceList || [];
    const { productCategory, productSubcategory, colour } = this.state;
    return (
      <div className="page-detail">
        <Form onSubmit={this.handleSubmit}>
          <Card bordered={false}>
            <EnhanceTitle title="基本信息" />
            <FormItem {...formItemLayout2} label="产品名称">
              <Input value={productDetail.name} placeholder="请输入产品名称" />
            </FormItem>
            <FormItem {...formItemLayout2} label="产品货号">
              <Input value={productDetail.sameStyleNum} placeholder="请输入产品货号" />
            </FormItem>
            <FormItem {...formItemLayout2} label="产品大类">
              <Select value={productDetail.productCategory} placeholder="请选择产品大类">
                {productCategory.map(item => (
                  <Option key={item.label} value={item.label}>{item.description}</Option>
                ))}
              </Select>
            </FormItem>
            <FormItem {...formItemLayout2} label="产品子类">
              <Select value={productDetail.productSubcategory} placeholder="请选择产品子类">
                {productSubcategory.map(item => (
                  <Option key={item.label} value={item.label}>{item.description}</Option>
                ))}
              </Select>
            </FormItem>
            <FormItem {...formItemLayout2} label="计价单位">
              <Input value={UNIT_VALUES[product['unit']]} placeholder="请输入计价单位" />
            </FormItem>
            <FormItem {...formItemLayout2} label="产品价格">
              <table className="priceform-table">
                <thead>
                  <tr>
                    <th>数量</th>
                    <th>价格(元)</th>
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
                            <Input value={formatYuan(item.price)} style={{ width: 60 }} />
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
                  {colour.map(item => (
                    <Option key={item.label} value={item.label}>{item.description}</Option>
                  ))}
              </Select>
            </FormItem>
            <FormItem {...formItemLayout2} label="产品主图">
              <Uploader value={productDetail.mainPicture ? productDetail.mainPicture.split(',') : undefined} max={1} noRemove noAdd />
            </FormItem>
            <FormItem {...formItemLayout2} label="产品详情图">
              <Uploader value={productDetail.detailPicture ? productDetail.detailPicture.split(',') : undefined} max={5} noRemove noAdd />
            </FormItem>
            <FormItem {...formItemLayout2} label="成分">
              <Input value={productDetail.ingredient} placeholder="请输入产品成分" />
            </FormItem>
            <FormItem {...formItemLayout2} label="克重">
              <Input value={productDetail.weight} placeholder="请输入产品克重" />
            </FormItem>
            <FormItem {...formItemLayout2} label="门幅">
              <Input addonAfter="米" value={productDetail.size} placeholder="请输入产品门幅" />
            </FormItem>
            <FormItem {...formItemLayout2} label="产品用途">
              <Input value={productDetail.use} placeholder="请输入产品用途" />
            </FormItem>
            <FormItem {...formItemLayout2} label="加工工艺">
              <Input value={productDetail.craft} placeholder="请输入产品加工工艺" />
            </FormItem>
            <FormItem {...formItemLayout2} label="供应状态">
              <Select value={productDetail.supplyStatus} allowClear placeholder="请选择产品供应状态">
                {Object.keys(SUPPLY_STATUS).map(item => (
                  <Option key={item} value={item}>{SUPPLY_STATUS[item]}</Option>
                ))}
              </Select>
            </FormItem>
            <FormItem {...formItemLayout2} label="发货地点">
              <Input value={productDetail.pointOfDeparture} placeholder="请输入产品发货地点" />
            </FormItem>
            <Button type="primary">
              <Link to="/product/list">返回</Link>
            </Button>
          </Card>
        </Form>
      </div>
    )
  }
}
