import React from 'react';
import { connect } from 'react-redux';
import { Card, Table, message } from 'antd';
import { formatDateSecond } from '../../utils/utils';
import EnhanceTitle from '../../component/EnhanceTitle';
import DescriptionList from '../../component/DescriptionList';
import addressColumns from './columns/address';
import orderColumns from './columns/order';
import { getUserById, getUserAddressById, getUserOrderById } from '../../action/user';
import { deleteOrderById } from '../../action/order';
import './index.css';

const { Description } = DescriptionList;

@connect(({ user }) => ({
  userDetail: user.userDetail,
  userAddress: user.userAddress,
  userOrderList: user.userOrderList
}), {
  getUserById,
  getUserAddressById,
  getUserOrderById,
})
export default class OrderDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.orderColumns = [
      ...orderColumns,
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        align: 'center',
        render: (text, record) => <a onClick={() => this.deleteUserOrderById(record.id)} href="javascript:;">删除</a>
      },
    ];
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.getUserById(params.id);
    this.props.getUserAddressById(params.id);
    this.props.getUserOrderById({ account_id: params.id });
  }

  deleteUserOrderById = async (id) => {
    const result = await deleteOrderById(id);
    if (result && result.code === 0) {
      message.error(`删除${id}订单成功`);
    }
  }

  render() {
    const { userDetail = {}, userAddress = {}, userOrderList = {} } = this.props;
    const userAddressArr = [{ ...userAddress, name: userDetail.name, tag: 'address' }];
    return (
      <div className="page-detail">
        <Card bordered={false}>
          <EnhanceTitle title="用户详情" />
          <DescriptionList>
            <Description term="头像"><img alt="用户头像" src={userDetail.url} /></Description>
            <Description term="用户ID">{userDetail.id}</Description>
            <Description term="手机号">{userDetail.phoneNumber}</Description>
            <Description term="姓名">{userDetail.name}</Description>
            <Description term="用户来源">{userDetail.registChannel}</Description>
            <Description term="性别">TODO</Description>
            <Description term="注册时间">{formatDateSecond(userDetail.createTime)}</Description>
          </DescriptionList>
        </Card>
        <Card bordered={false}>
          <EnhanceTitle title="收货地址" />
          <Table rowKey="tag" bordered columns={addressColumns} dataSource={userAddressArr} pagination={false} />
        </Card>
        <Card bordered={false}>
          <EnhanceTitle title="订单记录" />
          <Table rowKey="id" bordered columns={this.orderColumns} dataSource={userOrderList.records} />
        </Card>
      </div>
    )
  }
}
