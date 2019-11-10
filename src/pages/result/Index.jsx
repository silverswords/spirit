import React, { Component } from 'react'
import { Row, Col, Card, Button } from 'antd'
import router from 'umi/router'

import Map from './components/Map'
import ResultTable from './components/Table'
import styles from './style.less'

class Result extends Component {
  back = () => {
    router.push('/')
  }

  render() {
    return (
      <div className={styles.result}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Map />
          </Col>
          <Col span={24}>
            <ResultTable />
            <Button type="primary" size={'large'} onClick={this.back}>
              返回
            </Button>
					</Col>
        </Row>
      </div>
    );
  }
}

export default Result;
