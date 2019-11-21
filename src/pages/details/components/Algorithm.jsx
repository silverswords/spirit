import React, { Component } from 'react';
import { Button, Col } from 'antd';
import { connect } from 'dva';
import styles from './algorithm.less';

@connect(({ filter }) => ({
  conf: filter,
}))
class Algorithm extends Component {
  onFilter = data => {
    const { conf } = this.props;

    for (let i = 0; i < conf.pre.preFiltersSelected.length; i++) {
      if (conf.pre.preFiltersSelected[i]) {
        if (conf.filters.handlers[i](data)) {
          continue;
        } else {
          data.info = `${conf.filters.preFilterResult[i]}`;
          return false;
        }
      }
    }

    return true;
  };

  render() {
    const { conf } = this.props;
    let finalResult = [];
    let removedResult = [];
    for (let i = 0; i < conf.filters.dataList.length; i++) {
      let reuslt = this.onFilter(conf.filters.dataList[i]);
      if (reuslt) {
        finalResult.push(conf.filters.dataList[i]);
      } else {
        removedResult.push(conf.filters.dataList[i]);
      }
    }

    console.log('finalResult: ', finalResult);
    console.log('removedResult: ', removedResult);
    return (
      <div className={styles.main}>
        <Button type="primary" size="large" onClick={this.onFilter}>
          开始计算
        </Button>
      </div>
    );
  }
}

export default Algorithm;
