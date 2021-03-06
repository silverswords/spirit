import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';

import Global from './components/Global';
import Filter from './components/Filter';
import PostFilter from './components/PostFilter';
import styles from './style.less';

@connect(({ configuration }) => ({
  conf: configuration,
}))
class Configuration extends Component {
  startCalculation = () => {
    router.push('/details/');
  };

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
          <Col span={24}>
            <Filter />
          </Col>
          <Col span={24}>
            <PostFilter />
          </Col>
          <Col span={2}>
            <Button type="primary" size="large" onClick={this.startCalculation}>
              配置详情
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Configuration;
