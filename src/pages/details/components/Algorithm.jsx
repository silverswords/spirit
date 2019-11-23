import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import styles from './algorithm.less';

@connect(({ filter }) => ({
  conf: filter,
}))
class Algorithm extends Component {
  onPreFilter = data => {
    const { conf } = this.props;

    const handlers = [
      function filterOne(data) {
        if (
          data.a <= conf.pre.params[conf.defs.prePowerCheck][0] &&
          data.b <= conf.pre.params[conf.defs.prePowerCheck][1]
        ) {
          return true;
        } else {
          return false;
        }
      },
      function filterTwo(data) {
        if (data.c > conf.pre.params[conf.defs.preLoadCheck][0]) {
          return true;
        } else {
          return false;
        }
      },
      function filterThree(data) {
        if (data.d > conf.pre.params[conf.defs.prePhaseSeqCheck][0]) {
          return true;
        } else {
          return false;
        }
      },
      function filterFour(data) {
        if (data.e1 <= conf.pre.params[conf.defs.preUnderVoltageCheck][0] &&
            data.e2 <= conf.pre.params[conf.defs.preUnderVoltageCheck][1] &&
            data.e3 < conf.pre.params[conf.defs.preUnderVoltageCheck][2] &&
            data.e4 < conf.pre.params[conf.defs.preUnderVoltageCheck][3] &&
            data.e5 < conf.pre.params[conf.defs.preUnderVoltageCheck][4] &&
            data.e6 <= conf.pre.params[conf.defs.preUnderVoltageCheck][5]
          ) {
          return true;
        } else {
          return false;
        }
      },
      function filterFive(data) {
        if (data.f > conf.pre.params[conf.defs.preVoltageBalanceCheck][0]) {
          return true;
        } else {
          return false;
        }
      },
      function filterSix(data) {
        if (data.g > conf.pre.params[conf.defs.preVoltageBalanceCheck][0]) {
          return true;
        } else {
          return false;
        }
      },
      function filterSeven(data) {
        if (
          data.h > conf.pre.params[conf.defs.preLoadStableCheck][0] &&
          data.i > conf.pre.params[conf.defs.preLoadStableCheck][1]
        ) {
          return true;
        } else {
          return false;
        }
      },
    ];

    for (let i = 0; i < conf.pre.preFiltersSelected.length; i++) {
      if (conf.pre.preFiltersSelected[i]) {
        if (handlers[i](data)) {
          continue;
        } else {
          data.info = `${conf.filters.preFilterResult(i)}`;
          return false;
        }
      }
    }

    return true;
  };

  onDataFilter = () => {
    const { conf } = this.props;
    let finalResult = [];
    let removedResult = [];
    for (let i = 0; i < conf.filters.dataList.length; i++) {
      let reuslt = this.onPreFilter(conf.filters.dataList[i]);
      if (reuslt) {
        finalResult.push(conf.filters.dataList[i]);
      } else {
        removedResult.push(conf.filters.dataList[i]);
      }
    }

    console.log('finalResult: ', finalResult);
    console.log('removedResult: ', removedResult);
  };

  render() {
    return (
      <div className={styles.main}>
        <Button type="primary" size="large" onClick={this.onDataFilter}>
          开始计算
        </Button>
      </div>
    );
  }
}

export default Algorithm;
