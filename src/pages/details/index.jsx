import React, { Component } from 'react';
import { Row, Col, Button, Upload, Icon, Card } from 'antd';
import router from 'umi/router';

import Global from './components/Global';
import Filter from './components/Filter';
import PreFilter from './components/PreFilter.jsx'
import PostFilter from './components/PostFilter';
import Result from './components/Result';
import styles from './style.less';

class Details extends Component {
  startCalculation = () => {
    router.push('/computeResult');
  };

  back = () => {
    router.push('/');
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
            <PostFilter />
          </Col>
          <Result />
        </Row>
      </div>
    );
  }
}

export default Details;
