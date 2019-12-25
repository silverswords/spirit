import methods from './compute.js';
const handlers = [
  function filterOne(data, conf) {
    if (
      data['effectivePower'] <= conf.pre.params[conf.defs.prePowerCheck][0] ||
      data['reactivePower'] <= conf.pre.params[conf.defs.prePowerCheck][1]
    ) {
      return false;
    } else {
      return true;
    }
  },
  // todo
  function filterTwo(data, conf) {
    // 判断有无接线错误
    if (data.isError === true) {
      data.isWiringError = '有';
      if (data.modeOfConnection === '三相四线') {
        data.correctPowerA = methods.correctPowerAWith3P4L(data, [
          'phaseSeq',
          'phaseVoltage',
          'phaseCurrent',
          'elementsCurrentLagAngle',
          'elementsAccessMethods',
          'phaseEffectivePower',
        ]);
        data.correctPowerB = methods.correctPowerBWith3P4L(data, [
          'phaseSeq',
          'phaseVoltage',
          'phaseCurrent',
          'elementsCurrentLagAngle',
          'elementsAccessMethods',
          'phaseEffectivePower',
        ]);
        data.correctPowerC = methods.correctPowerCWith3P4L(data, [
          'phaseSeq',
          'phaseVoltage',
          'phaseCurrent',
          'elementsCurrentLagAngle',
          'elementsAccessMethods',
          'phaseEffectivePower',
        ]);
      } else {
        data.correctPowerA = methods.correctPowerAWith3P3L(data, [
          'phaseSeq',
          'phaseVoltage',
          'phaseCurrent',
          'elementsCurrentLagAngle',
          'elementsAccessMethods',
          'phaseEffectivePower',
        ]);
        data.correctPowerB = [];
        data.correctPowerC = methods.correctPowerBWith3P3L(data, [
          'phaseSeq',
          'phaseVoltage',
          'phaseCurrent',
          'elementsCurrentLagAngle',
          'elementsAccessMethods',
          'phaseEffectivePower',
        ]);
      }
    } else {
      data.isWiringError = '无';
    }
  },
  function filterThree(data, conf) {
    let tmpEffectivePower = 0;
    let configPower = conf.pre.params[conf.defs.prePhaseSeqCheck][0];

    for (let i = 0; i < 3; i++) {
      tmpEffectivePower += data['phaseEffectivePower'][i];
    }

    if (tmpEffectivePower - data['effectivePower'] > data['effectivePower'] * configPower) {
      return false;
    } else {
      return true;
    }
  },
  function filterFour(data, conf) {
    const configMinPower = conf.pre.params[conf.defs.preUnderVoltageCheck][0];
    const configTotalMinPower = conf.pre.params[conf.defs.preUnderVoltageCheck][1];
    const configAPower = conf.pre.params[conf.defs.preUnderVoltageCheck][2];
    const configBPower = conf.pre.params[conf.defs.preUnderVoltageCheck][3];
    const configCPower = conf.pre.params[conf.defs.preUnderVoltageCheck][4];
    const configMinVol = conf.pre.params[conf.defs.preUnderVoltageCheck][5];
    if (
      (data['phaseVoltage'][0] <= configMinPower &&
        data['phaseVoltage'][2] <= configMinPower &&
        data['phaseVoltage'][2] + data['phaseVoltage'][0] < configTotalMinPower) ||
      (data['phaseVoltage'][0] < configAPower ||
        data['phaseVoltage'][1] < configBPower ||
        data['phaseVoltage'][2] < configCPower)
    ) {
      return false;
    } else {
      return true;
    }
  },
  // todo
  function filterFive(data, conf) {
    let maxVol = Math.max(...data['phaseVoltage']);
    let minVol = Math.max(...data['phaseVoltage']);
    const limit = conf.pre.params[conf.defs.preVoltageBalanceCheck][0];
    if (maxVol - minVol > maxVol * limit) {
      console.log('here five');
      return false;
    } else {
      return true;
    }
  },
  // todo
  function filterSix(data, conf) {
    let maxVol = Math.max(...data['phaseCurrent']);
    let minVol = Math.max(...data['phaseCurrent']);
    const limit = conf.pre.params[conf.defs.preCurrentBalanceCheck][0];
    if (maxVol - minVol > maxVol * limit) {
      console.log('here six');
      return false;
    } else {
      return true;
    }
  },
  // todo
  function filterSeven(data, conf) {
    if (data['transformerCapacity'] > conf.pre.params[conf.defs.preCurrentBalanceCheck][0]) {
      return true;
    } else {
      console.log('here seven');
      return false;
    }
  },
];

const postFilter = (data, conf) => {
  for (let i = 0; i < conf.pre.preFiltersSelected.length; i++) {
    if (conf.pre.preFiltersSelected[i]) {
      if (handlers[i](data, conf)) {
        continue;
      } else {
        data.info = `${conf.filters.preFilterResult(i)}`;
        return false;
      }
    }
  }

  return true;
};

export default postFilter;
