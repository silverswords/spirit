import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'
import router from 'umi/router'

import Global from './components/Global'
import Filter from './components/Filter'
import styles from './style.less'

class Configuration extends Component {
  startCalculation = () => {
    router.push('/result')
  }

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
        <Button type="primary" size={'large'} onClick={this.startCalculation}>
          开始计算
        </Button>
      </div>
    );
  }
}

export default Configuration;