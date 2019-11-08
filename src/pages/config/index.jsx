import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';

import Global from './components/global'
import styles from './style.less';

class Configuration extends Component {
  render() {
    return (
      <div className={styles.main}>
        <Row gutter={12}>
          <Col span={24}>
            <Global />
          </Col>
          <Col span={24} style={{marginTop: '12px'}}>
            <Card title="全局参数配置" >
              <Card type="inner" title="Inner Card title">
                Inner Card content
              </Card>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Configuration;
