import React, { Component } from 'react';
import { Row, Col, Button, Upload, Icon, Card } from 'antd';
import router from 'umi/router';

import Global from './components/Global';
import Filter from './components/Filter';
import PostFilter from './components/PostFilter';
import ExelToJson from './components/Result';
import Algorithm from './components/Algorithm';
import styles from './style.less';

class Details extends Component {
  startCalculation = () => {
    router.push('/result');
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
          <Col span={24}>
            <Card title="上传文件并计算">
              <ExelToJson />
            </Card>
          </Col>
          <Col span={2}>
            <Button type="primary" size="large" onClick={this.startCalculation}>
              计算结果
            </Button>
          </Col>
          {/* <Col span={2}>
            <Algorithm />
          </Col> */}
          <Col span={20}>
            <Button type="primary" size="large" onClick={this.back}>
              返回
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Details;
