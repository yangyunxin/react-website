import React from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Input, Select, Table, Button, Modal, message } from 'antd';
import { agentProduct } from '../../action/agent';
import { getProductList } from '../../action/product';
import { getProductTypes } from '../../action/productType';
import { getSystemDicts } from '../../action/system';
import { formatDateSecond, formatYuan } from '../../utils/utils';
import { formItemLayout, showTotal, nullString, PRODUCT_STATUS, UNIT_VALUES } from '../../utils/constant';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ product }) => ({
  productList: product.productList,
}), {
  getProductList,
})
@Form.create()
export default class ProductModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '产品名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        fixed: 'left',
      },
      {
        title: '产品货号',
        dataIndex: 'sameStyleNum',
        key: 'sameStyleNum',
        align: 'center',
      },
      {
        title: '产品大类',
        dataIndex: 'productCategory',
        key: 'productCategory',
        align: 'center',
        render: (text) => {
          const info = this.state.productCategory.find(item => item.label === text) || {};
          return info.description || nullString;
        }
      },
      {
        title: '产品子类',
        dataIndex: 'productSubcategory',
        key: 'productSubcategory',
        align: 'center',
        render: (text) => {
          const info = this.state.dictLevel4.find(item => item.label === text) || {};
          return info.description || nullString;
        }
      },
      {
        title: '产品图片',
        dataIndex: 'mainPicture',
        key: 'mainPicture',
        align: 'center',
        render: (text) => <img style={{ display: 'block' }} width="50" height="50" src={text} alt="产品图片" />
      },
      {
        title: '价格（元）',
        dataIndex: 'productPrice',
        key: 'productPrice',
        align: 'center',
        render: (text, record) => {
          const product = record.priceList && record.priceList.length ? record.priceList[0] : {}
          return product.price !== undefined ? formatYuan(product['price']) : nullString
        }
      },
      {
        title: '计价单位',
        dataIndex: 'unit',
        key: 'unit',
        align: 'center',
        render: (text, record) => {
          const product = record.priceList && record.priceList.length ? record.priceList[0] : {}
          return UNIT_VALUES[product['unit']] || nullString
        }
      },
      {
        title: '颜色',
        dataIndex: 'colour',
        key: 'colour',
        align: 'center',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
        width: '14%',
        render: (text) => text ? formatDateSecond(text) : nullString
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (text) => text ? PRODUCT_STATUS[text] : '待上架'
      },
    ];
  }
  state = {
    visible: false,
    productCategory: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
    },
    selectedRowKeys: [],
    selectedRows: [],
    loading: false,
    productSubcategory: [],
    dictLevel4: [],
    colour: [],
  };

  async componentDidUpdate(prevProps) {
    if (prevProps.showProductModal !== this.props.showProductModal && this.props.showProductModal === true) {
      this.setState({ visible: true });
      this.getProductList();
      const productCategory = getProductTypes({ parentLabel: 'productCategory' });
      this.setState({ productCategory: await productCategory });
      const dictLevel4 = getProductTypes({ level: 4 });
      this.setState({ dictLevel4: await dictLevel4 });
      const colour = getSystemDicts({ parentLabel: 'colour' });
      this.setState({ colour: await colour });
    }
  }

  getProductList = async (params) => {
    this.setState({ loading: true });
    const { agentId } = this.props;
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        await this.props.getProductList({ ...values, ...params, agentId, exist: 0  });
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getProductList();
  }

  handleCateChange = async (value) => {
    this.props.form.setFieldsValue({ productSubcategory: [] });
    if (value) {
      const result = await getProductTypes({ parentLabel: value });
      this.setState({ productSubcategory: result });
    }
  }

  agentProduct = async(sign) => {
    const { agentId } = this.props;
    const { selectedRowKeys, selectedRows } = this.state;
    const values = selectedRowKeys.map(item => ({
      productId: item,
      agentId,
      sign,
    }));
    const result = await agentProduct(values);
    if (result && result.code === 0) {
      message.success(`产品名称为${selectedRows.map(item => item.name).join('、')}关联代理商成功`);
      this.setState({ selectedRowKeys: [] });
    } else {
      message.error('批量关联代理商失败，请稍后重试');
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.agentProduct(1);
    this.setState({
      visible: false,
    });
    this.props.handleCloseModal();
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
    this.props.handleCloseModal();
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    const { selectedRows: productList } = this.state;
    let newRows = [];
    if (selectedRowKeys.length === selectedRows.length) {
      newRows = [...selectedRows];
    } else if (selectedRowKeys.length > selectedRows.length) {
      const otherRowsKeys = selectedRowKeys.filter(item => selectedRows.every(row => row.id !== item));
      const otherRows = productList.filter(item => otherRowsKeys.indexOf(item.id) !== -1);
      newRows = otherRows.concat(selectedRows);
    }
    this.setState({ selectedRows: newRows, selectedRowKeys });
  }

  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
    this.setState({ pagination: pager });
    this.getProductList({
      limit: pagination.pageSize,
      page: pagination.current,
    });
  }

  render() {
    const { form: { getFieldDecorator }, productList = {} } = this.props;
    const { productCategory, productSubcategory, loading, selectedRowKeys } = this.state;
    const rowSelection = { selectedRowKeys, onChange: this.onSelectChange };
    return (
      <Modal
        width="90%"
        centered
        title="关联产品"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={12}>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
              <FormItem {...formItemLayout} label="产品名称">
                {getFieldDecorator('name')(
                  <Input placeholder="请输入产品名称" />
                )}
              </FormItem>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
              <FormItem {...formItemLayout} label="产品货号">
                {getFieldDecorator('sameStyleNum')(
                  <Input placeholder="请输入产品货号" />
                )}
              </FormItem>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
              <FormItem {...formItemLayout} label="产品大类">
                {getFieldDecorator('productCategory')(
                  <Select onChange={this.handleCateChange} allowClear placeholder="请选择产品大类">
                    {productCategory.map(item => (
                      <Option key={item.label} value={item.label}>{item.description}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
              <FormItem {...formItemLayout} label="产品子类">
                {getFieldDecorator('productSubcategory')(
                  <Select allowClear placeholder="请选择产品子类">
                    {productSubcategory.map(item => (
                      <Option key={item.label} value={item.label}>{item.description}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 8, push: 16 }} sm={{ span: 12, push: 12 }} lg={{ span: 8, push: 16 }} style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">搜索</Button>
              <Button style={{ marginLeft: '8px', marginRight: '8px' }} onClick={this.handleReset}>清空</Button>
            </Col>
          </Row>
        </Form>
        <Table
          title={this.title}
          rowKey="id"
          onChange={this.handleTableChange}
          pagination={{ showTotal: showTotal, total: productList.total, ...this.state.pagination }}
          rowSelection={rowSelection}
          columns={this.columns}
          dataSource={productList.records}
          loading={loading}
        />
      </Modal>
    )
  }
}
