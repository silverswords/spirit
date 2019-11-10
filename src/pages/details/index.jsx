import React, { Component } from 'react';
import { Row, Col, Button, Upload, Icon, Card } from 'antd';
import router from 'umi/router';

import Global from './components/Global';
import Filter from './components/Filter';
import PostFilter from './components/PostFilter';
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
            <Card title="上传文件">
              <Col span={12}>
                <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
                  <Button>
                    <Icon type="upload" /> 运行数据文件
                  </Button>
                </Upload>
              </Col>
              <Col span={12}>
                <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
                  <Button>
                    <Icon type="upload" /> Sg186数据文件
                  </Button>
                </Upload>
              </Col>
            </Card>
          </Col>
          <Col span={2}>
            <Button type="primary" size="large" onClick={this.startCalculation}>
              计算结果
            </Button>
          </Col>
          <Col span={22}>
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
