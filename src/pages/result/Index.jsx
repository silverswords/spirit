import React, { Component } from 'react'
import { Row, Col, Card } from 'antd'

import styles from './style.less'

class Result extends Component {
  componentDidMount() {
    const { AMap } = window
    let map = new AMap.Map('map', {
      resizeEnable: true,
      zoom: 11,
      center: [116.397428, 39.90923],
    })
  }
    
  render() {
    return (
      <div className={styles.result}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <div ref='map' id='map' className={styles.map}></div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Result;
