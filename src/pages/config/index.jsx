import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';

import Global from './components/Global'
import Filter from './components/Filter'
import styles from './style.less';

class Configuration extends Component {
  render() {
    return (
      <div className={styles.main}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Global />
          </Col>
          <Col span={24}>
            <Filter />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Configuration;
