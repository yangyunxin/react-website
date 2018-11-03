import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Table, Button } from 'antd';
import DescriptionList from '../../component/DescriptionList';
import { getSkylightById } from '../../action/skylight';
import EnhanceTitle from '../../component/EnhanceTitle';
import bannerColumns from './columns/banner';
import { SKY_TYPE } from '../../utils/constant';
import { formatDateSecond } from '../../utils/utils';
import './index.css';

const { Description } = DescriptionList;

@connect(({ skylight }) => ({
  skylightDetail: skylight.skylightDetail
}), {
  getSkylightById
})
export default class OrderDetail extends React.PureComponent {
  componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    this.props.getSkylightById(id);
  }
  render() {
    const { skylightDetail = {} } = this.props;
    return (
      <div className="page-detail">
        <Card bordered={false}>
          <EnhanceTitle title="基本信息" />
          <DescriptionList col={1}>
            <Description term="天窗ID">{skylightDetail.skyId}</Description>
            <Description term="天窗类型">{SKY_TYPE[skylightDetail.type]}</Description>
            <Description term="天窗标题">{skylightDetail.skyTitle}</Description>
            <Description term="天窗描述">{skylightDetail.description}</Description>
            <Description term="创建时间">{formatDateSecond(skylightDetail.createTime)}</Description>
            <Description term="创建人">{skylightDetail.creator}</Description>
            <Description term="更新时间">{formatDateSecond(skylightDetail.updateTime)}</Description>
            <Description term="更新人">{skylightDetail.editer}</Description>
          </DescriptionList>
        </Card>
        <Card bordered={false}>
          <EnhanceTitle title="关联banner" />
          <Table bordered columns={bannerColumns} dataSource={[] } />
        </Card>
        <Button type="primary">
          <Link to="/skylight/list">返回</Link>
        </Button>
      </div>
    )
  }
}
