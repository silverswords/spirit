import React, { Component } from 'react'
import { Row, Col, Card } from 'antd'
import Map from './components/Map'

import styles from './style.less'

class Result extends Component {
  render() {
    return (
      <div className={styles.result}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Map />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Result;
