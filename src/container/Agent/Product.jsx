import React from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import ReactToPrint from "react-to-print";
import { Card, Form, Row, Col, Input, Select, Table, Button, Divider, message, Popconfirm, Modal } from 'antd';
import { getProductCode, getProductList } from '../../action/product';
import { getProductTypes } from '../../action/productType';
import { deleteAgentProduct } from '../../action/agent';
import { getSystemDicts } from '../../action/system';
import { formatDateSecond, formatYuan } from '../../utils/utils';
import { formItemLayout, showTotal, nullString, PRODUCT_STATUS, UNIT_VALUES } from '../../utils/constant';
import ProductModal from './ProductModal';
import './index.css'

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ product }) => ({
  productList: product.productList,
}), {
  getProductList,
})
@Form.create()
export default class AgentProduct extends React.PureComponent {
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
          const { productCategory = [] } = this.state;
          const info = productCategory.find(item => item.label === text) || {};
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
        width: '10%',
        render: (text) => text ? formatDateSecond(text) : nullString
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (text) => text ? PRODUCT_STATUS[text] : '待上架'
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        align: 'center',
        render: (text, record) => {
          return (
            <div>
              <Popconfirm
                placement="topLeft"
                title={`请确定是否取消关联该产品？`}
                onConfirm={() => this.agentProductSingle(record)}
                okText="确定"
                cancelText="取消"
              >
                <a href="javascript:;">取消</a>
              </Popconfirm>
              <Divider type="vertical" />
              <a onClick={() => this.printProduct(record)} href="javascript:;">打印</a>
            </div>
          )
        }
      },
    ];
  }

  state = {
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
    },
    selectedRowKeys: [],
    selectedRows: [],
    loading: false,
    visible: false,
    confirmLoading: false,
    printList: [],
    codeList: [],
    productCategory: [],
    productSubcategory: [],
    showProductModal: false,
    dictLevel4: [],
    colour: [],
  };

  async componentDidMount() {
    this.getProductList();
    const productCategory = getProductTypes({ parentLabel: 'productCategory' });
    this.setState({ productCategory: await productCategory });
    const dictLevel4 = getProductTypes({ level: 4 });
    this.setState({ dictLevel4: await dictLevel4 });
    const colour = getSystemDicts({ parentLabel: 'colour' });
    this.setState({ colour: await colour });
  }

  componentWillUnmount() {
    this.setState = (state,callback) => { };
  }

  getProductList = async (params) => {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({ loading: true });
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        await this.props.getProductList({ ...values, ...params, agentId: id, exist: 1, limit: 10 });
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  handleCateChange = async (value) => {
    this.props.form.setFieldsValue({ productSubcategory: [] });
    if (value) {
      const result = await getProductTypes({ parentLabel: value });
      this.setState({ productSubcategory: result });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getProductList();
  }

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

  handleReset = () => {
    this.props.form.resetFields();
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

  handleShowModal = () => {
    this.setState({ showProductModal: true });
  }

  handleCloseModal = () => {
    this.setState({ showProductModal: false });
    this.getProductList();
  }

  title = () => {
    const { selectedRowKeys, selectedRows } = this.state;
    return (
      <div>
        <span>操作处理：</span>
        <Button disabled={!selectedRowKeys.length} onClick={this.printProduct} type="primary">批量打印</Button>
        <Divider type="vertical" />
        <Button disabled={!selectedRowKeys.length} onClick={() => this.agentProduct(0)} type="primary">取消关联</Button>
        <Divider type="vertical" />
        <Button onClick={this.handleShowModal} type="primary">关联产品</Button>
      </div>
    )
  }

  agentProduct = async(sign) => {
    const agentId = this.props.match.params.id;
    const { selectedRowKeys, selectedRows } = this.state;
    const values = selectedRowKeys.map(item => item);
    const result = await deleteAgentProduct(agentId, values);

    if (result && result.code === 0) {
      message.success(`产品名称为${selectedRows.map(item => item.name).join('、')}关联代理商成功`);
      const pager = { ...this.state.pagination };
      this.getProductList({
        limit: pager.pageSize,
        page: pager.current,
      });
      this.setState({ selectedRowKeys: [] });
    } else {
      message.error('批量关联代理商失败，请稍后重试');
    }
  }

  agentProductSingle = async (record) => {
    const agentId = this.props.match.params.id;
    const result = await deleteAgentProduct(agentId, [record.id]);
    if (result && result.code === 0) {
      message.success(`产品名称为${record.name}关联代理商成功`);
      const pager = { ...this.state.pagination };
      this.getProductList({
        limit: pager.pageSize,
        page: pager.current,
      });
      this.setState({ selectedRowKeys: [] });
    } else {
      message.error('代理商关联此产品失败，请稍后重试');
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  printProduct = async (record) => {
    const { sn } = qs.parse(this.props.location.search.substr(1));
    if (record.id) {
      const result = await getProductCode(record.id, sn);
      const code = result.data || '';
      this.setState({ printList: [record], codeList: [code] }, () => {
        this.showModal();
      });
    } else {
      const { selectedRows, selectedRowKeys } = this.state;
      const promises = selectedRowKeys.map((id) => getProductCode(id, sn));
      const results = await Promise.all(promises);
      const codeList = results.map(item => item ? item.data: '');
      this.setState({ printList: selectedRows, codeList }, () => {
        this.showModal();
      });
    }
  }

  render() {
    const { form: { getFieldDecorator }, productList = {} } = this.props;
    const { selectedRowKeys, loading, visible, confirmLoading, printList, codeList, productCategory = [], productSubcategory, showProductModal } = this.state;
    const rowSelection = { selectedRowKeys, onChange: this.onSelectChange };
    const agentId = this.props.match.params.id;
    return (
      <div className="page-list product-list">
        <ProductModal agentId={agentId} showProductModal={showProductModal} handleCloseModal={this.handleCloseModal}/>
        <Card bordered={false} className="form-container">
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
        </Card>
        <Card bordered={false}>
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
        </Card>
        <Modal title="产品二维码"
          className="print-modal"
          width="230mm"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          style={{ padding: 0 }}
          footer={null}
        >
          <div className="print-wrap" style={{ width: '230mm', padding: '6mm 0' }} ref={el => (this.componentRef = el)}>
            <Row>
              {printList.map((item, key) => (
                <Col key={item.id} style={{ marginBottom: '10mm' }} span={selectedRowKeys.length > 1 ? 6 : 24}>
                  <img alt="二维码" src={codeList[key]} />
                  <img alt="产品图片" src={item.mainPicture} />
                </Col>
              ))}
            </Row>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button onClick={this.handleCancel} style={{ marginRight: '20px' }}>取消</Button>
            <ReactToPrint
              trigger={() => <Button type="primary">打印</Button>}
              content={() => this.componentRef}
            />
          </div>
        </Modal>
      </div>
    )
  }
}
