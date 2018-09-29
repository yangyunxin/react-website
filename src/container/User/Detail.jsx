import React from 'react';
import { connect } from 'react-redux';
import { Card, Table } from 'antd';
import EnhanceTitle from '../../component/EnhanceTitle';
import DescriptionList from '../../component/DescriptionList';
import addressColumns from './columns/address';
import orderColumns from './columns/order';
import { getUserById, getUserAddressById} from '../../action/user';
import './index.css';

const { Description } = DescriptionList;

@connect(({ user }) => ({
  userDetail: user.userDetail
}), {
  getUserById,
  getUserAddressById
})
export default class OrderDetail extends React.PureComponent {
  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.getUserById(params.id);
    this.props.getUserAddressById(params.id);
  }
  render() {
    const { userDetail = {} } = this.props;
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
            <Description term="注册时间">{userDetail.createTime}</Description>
          </DescriptionList>
        </Card>
        <Card bordered={false}>
          <EnhanceTitle title="收货地址" />
          <Table bordered columns={addressColumns} dataSource={[]} />
        </Card>
        <Card bordered={false}>
          <EnhanceTitle title="订单记录" />
          <Table bordered columns={orderColumns} dataSource={[] } />
        </Card>
      </div>
    )
  }
}
