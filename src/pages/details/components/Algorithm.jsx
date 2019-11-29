import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import styles from './algorithm.less';
import methods from '@/utils/compute.js'

@connect(({ filter, configuration }) => ({
  conf: filter, globalConfig: configuration
}))
class Algorithm extends Component {
  onPreFilter = data => {
    const { conf } = this.props;

    const handlers = [
      function filterOne(data) {
        if (
          data['effectivePower'] <= conf.pre.params[conf.defs.prePowerCheck][0] ||
          data['reactivePower'] <= conf.pre.params[conf.defs.prePowerCheck][1]
        ) {
          return false;
        } else {
          return true;
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
        let tmpEffectivePower = 0
        let configPower = conf.pre.params[conf.defs.prePhaseSeqCheck][0]

        for (let i = 0; i < 3; i++) {
          tmpEffectivePower += data['phaseEffectivePower'][i]
        }

        if (tmpEffectivePower - data['effectivePower'] > data['effectivePower'] * configPower ) {
          return false;
        } else {
          return true;
        }
      },
      function filterFour(data) {
        const configMinPower = conf.pre.params[conf.defs.preUnderVoltageCheck][0]
        const configTotalMinPower = conf.pre.params[conf.defs.preUnderVoltageCheck][1]
        const configAPower = conf.pre.params[conf.defs.preUnderVoltageCheck][2]
        const configBPower = conf.pre.params[conf.defs.preUnderVoltageCheck][3]
        const configCPower = conf.pre.params[conf.defs.preUnderVoltageCheck][4]
        const configMinVol = conf.pre.params[conf.defs.preUnderVoltageCheck][5]
        if (
          (data['phaseVoltage'][0] <= configMinPower && data['phaseVoltage'][2] <= configMinPower && data['phaseVoltage'][2] + data['phaseVoltage'][0] < configTotalMinPower) ||
          (data['phaseVoltage'][0] < configAPower || data['phaseVoltage'][1] < configBPower || data['phaseVoltage'][2] < configCPower)
        ) {
          return false
        } else {
          return true
        }
      },
      // todo
      function filterFive(data) {
        let maxVol = Math.max(...data['phaseVoltage']) 
        let minVol = Math.max(...data['phaseVoltage'])
        const limit = conf.pre.params[conf.defs.preVoltageBalanceCheck][0]
        if ((maxVol - minVol) > maxVol * limit) {
          return false
        } else {
          return true
        }
      },
      // todo
      function filterSix(data) {
        let maxVol = Math.max(...data['phaseCurrent']) 
        let minVol = Math.max(...data['phaseCurrent'])
        const limit = conf.pre.params[conf.defs.preCurrentBalanceCheck][0]
        if ((maxVol - minVol) > maxVol * limit) {
          return false;
        } else {
          return true;
        }
      },
      // todo
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
  };

  onMerge = () => {
    const { conf, globalConfig } = this.props;
    let basicDataList = conf.filters.basicDataList
    let sg186DataList = conf.filters.sg186DataList
    for(let i = 0; i < basicDataList.length; i++) {
      for(let j = 0; j < sg186DataList.length; j++) {
        basicDataList[i] = {
          ...basicDataList[i],
          ...sg186DataList[j]
        } 
      }
      methods.computeTotal(basicDataList[i], globalConfig.global)
    }
    console.log(basicDataList)
  }

  render() {
    return (
      <div className={styles.main}>
        <Button type="primary" size="large" onClick={this.onMerge}>
          开始计算
        </Button>
      </div>
    );
  }
}

export default Algorithm;
