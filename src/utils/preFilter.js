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
    // if (data.c > conf.pre.params[conf.defs.preLoadCheck][0]) {
    //   return true;
    // } else {
    //   console.log('here two')
    //   return false;
    // }
    return true
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
      console.log('here five')
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
      console.log('here six')
      return false;
    } else {
      return true;
    }
  },
  // todo
  function filterSeven(data, conf) {
    if (data['transformerCapacity'] > conf.pre.params[conf.defs.preCurrentBalanceCheck][0]) {
      return true
    } else {
      console.log('here seven')
      return false
    }
  },
];

const preFilter = (data, conf) => {
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
}

export default preFilter