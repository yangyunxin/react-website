import React from 'react';
import { Row, Col } from 'antd';
import './index.css';

class Description extends React.PureComponent {
  static defaultProps = {
    term: ''
  }
  render() {
    const { term, children, ...restProps } = this.props;
    return (
      <Col {...restProps}>
        <p className="description-content">
          <span>{term}：</span>
          <strong>{children}</strong>
        </p>
      </Col>
    )
  }
}

class DescriptionList extends React.PureComponent {
  static defaultProps = {
    col: 2,
  }
  render() {
    const { col, children } = this.props;
    const span = col ? 24 / col : 12;
    return (
      <div className="description-list">
        <Row>
          {React.Children.map(children, child => React.cloneElement(child, { span }))}
        </Row>
      </div>
    )
  }
}

DescriptionList.Description = Description;
export default DescriptionList;
