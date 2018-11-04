import React from 'react';
import { connect } from 'react-redux';
import { Card, Table, message } from 'antd';
import { formatDateSecond } from '../../utils/utils';
import EnhanceTitle from '../../component/EnhanceTitle';
import addressColumns from './columns/address';
import orderColumns from './columns/order';
import { getUserById, getUserAddressById, getUserOrderById } from '../../action/user';
import { deleteOrderById } from '../../action/order';
import './index.css';

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
    this.props.getUserOrderById({ accountId: params.id });
  }

  deleteUserOrderById = async (id) => {
    const result = await deleteOrderById(id);
    if (result && result.code === 0) {
      message.success(`删除${id}订单成功`);
      const { match: { params } } = this.props;
      this.props.getUserOrderById({ accountId: params.id });
    }
  }

  render() {
    const { userDetail = {}, userAddress = {}, userOrderList = {} } = this.props;
    const userAddressArr = [{ ...userAddress, name: userDetail.name, tag: 'address' }];
    return (
      <div className="page-detail">
        <Card bordered={false}>
          <EnhanceTitle title="用户详情" />
          <div className="userinfo-box">
            <div className="userinfo-left">
              <img alt="用户头像" src={userDetail.url} />
              <p>{userDetail.phoneNumber}</p>
            </div>
            <div className="userinfo-right">
              <div className="userinfo-right1">
                <p><span>用户ID</span><span>{userDetail.id}</span></p>
                <p><span>姓名</span><span>{userDetail.name}</span></p>
                <p><span>性别</span><span>TODO</span></p>
              </div>
              <div className="userinfo-right2">
                <p><span>手机号</span><span>{userDetail.phoneNumber}</span></p>
                <p><span>用户来源</span><span>{userDetail.registChannel}</span></p>
                <p><span>注册时间</span><span>{formatDateSecond(userDetail.createTime)}</span></p>
              </div>
            </div>
          </div>
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
