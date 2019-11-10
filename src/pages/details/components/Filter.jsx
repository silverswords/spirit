import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PreFilter from './PreFilter';
import styles from './filter.less';

const { Meta } = Card;

@connect(({ filter }) => ({
  conf: filter,
}))
class Filter extends Component {
  render() {
    const { conf } = this.props;
    return (
      <div className={styles.filter_config}>
        <Card title="过滤器参数">
          <Card bordered={false}>
            <Meta title={conf.defs.preFilterLabel(0)} style={{ marginBottom: 16 }} />
            <PreFilter filterType={0} />
          </Card>
          <Card bordered={false}>
            <Meta title={conf.defs.preFilterLabel(1)} style={{ marginBottom: 16 }} />
            <PreFilter filterType={1} />
          </Card>
          <Card bordered={false}>
            <Meta title={conf.defs.preFilterLabel(2)} style={{ marginBottom: 16 }} />
            <PreFilter filterType={2} />
          </Card>
          <Card bordered={false}>
            <Meta title={conf.defs.preFilterLabel(3)} style={{ marginBottom: 16 }} />
            <PreFilter filterType={3} />
          </Card>
          <Card bordered={false}>
            <Meta title={conf.defs.preFilterLabel(4)} style={{ marginBottom: 16 }} />
            <PreFilter filterType={4} />
          </Card>
          <Card bordered={false}>
            <Meta title={conf.defs.preFilterLabel(5)} style={{ marginBottom: 16 }} />
            <PreFilter filterType={5} />
          </Card>
        </Card>
      </div>
    );
  }
}

export default Filter;
