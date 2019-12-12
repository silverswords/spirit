// 各元件基本角度
// args = [phaseEffectivePower, phaseReactivePower]
const basicAngle = (data, args) => {
  data['elementsBasicAngle'] = [];
  for (let i = 0; i < data[args[0]].length; i++) {
    data['elementsBasicAngle'][i] = +(
      (Math.acos(
        Math.abs(data[args[0]][i]) /
          Math.sqrt(data[args[0]][i] * data[args[0]][i] + data[args[1]][i] * data[args[1]][i]),
      ) *
        180.0) /
      Math.PI
    ).toFixed(4);
  }
};

// 各元件真实角度（电流滞后于电压的角度）
// args = ['phaseEffectivePower', 'phaseReactivePower', 'elementsBasicAngle']
const realAngle = (data, args) => {
  data['elementsRealAngle'] = [];
  for (let i = 0; i < data[args[0]].length; i++) {
    if (data[args[0]][i] > 0 && data[args[1]][i] > 0) {
      data['elementsRealAngle'][i] = data[args[2]][i];
    } else if (data[args[0]][i] < 0 && data[args[1]][i] > 0) {
      data['elementsRealAngle'][i] = 180.0 - data[args[2]][i];
    } else if (data[args[0]][i] < 0 && data[args[1]][i] < 0) {
      data['elementsRealAngle'][i] = 180.0 + data[args[2]][i];
    } else if (data[args[0]][i] > 0 && data[args[1]][i] < 0) {
      data['elementsRealAngle'][i] = 360.0 - data[args[2]][i];
    }
  }

  if (data['elementsRealAngle'][1] == undefined) {
    data['elementsRealAngle'][1] = NaN
  }
};

// 各元件电压滞后于 A 相电压的角度
// args = ['lineMode', 'phaseSeq']
const lagAngle = (data, args) => {
  data['elementsVoltageLagAngle'] = [];
  if (data[args[0]] === 0 && data[args[1]] === 0) {
    data['elementsVoltageLagAngle'].push(0.0, 120.0, 240.0);
  } else if (data[args[0]] === 0 && data[args[1]] === 1) {
    data['elementsVoltageLagAngle'].push(0.0, 240.0, 120.0);
  } else if (data[args[0]] === 1 && data[args[1]] === 0) {
    data['elementsVoltageLagAngle'].push(330.0, NaN, 270.0);
  } else if (data[args[0]] === 1 && data[args[1]] === 1) {
    data['elementsVoltageLagAngle'].push(30.0, NaN, 90.0);
  } else {
    return 'found mistake';
  }
};

// 各元件电流滞后于 A 相电压的角度
// args = ['elementsVoltageLagAngle', 'elementsRealAngle']
const elecCurrent = (data, args) => {
  data['elementsCurrentLagAngle'] = [];
  for (let i = 0; i < data[args[0]].length; i++) {
    data['elementsCurrentLagAngle'][i] = ((data[args[1]][i] + data[args[0]][i]) % 360).toFixed(4);
  }

  if (data['elementsCurrentLagAngle'][1] == undefined) {
    data['elementsCurrentLagAngle'][1] = NaN
  }
};

// 计算接入方式
// args = ['elementsCurrentLagAngle']
const accessMethod = (data, config, args) => {
  data['elementsAccessMethods'] = [];
  const lagSequence = ['+la', '-lc', '+lb', '-la', '+lc', '-lb'];
  for (let i = 0; i < data[args[0]].length; i++) {
    if (data[args[0]][i] >= config.currentADelayAngle) {
      data['elementsAccessMethods'][i] =
        lagSequence[parseInt((data[args[0]][i] - config.currentADelayAngle) / 60)];
    } else {
      data['elementsAccessMethods'][i] =
        lagSequence[parseInt((data[args[0]][i] + 360 - config.currentADelayAngle) / 60)];
    }
  }

  if (data['elementsAccessMethods'][1] == undefined) {
    data['elementsAccessMethods'][1] = '-'
  }
};

// 判断负荷平衡
// args: ['elementsAccessMethods']
const isNotBalance = (data, args) => {
  let tmpSet = new Set(data[args[0]]);
  if (tmpSet.size != data[args[0]].length) {
    return true;
  } else {
    return false;
  }
};

// 判断接线情况
// args: ['accessMethods', 'lineMode', 'phaseSeq']
const isNotAccessRight = (data, args) => {
  let tmpString = data[args[0]].toString().replace(/,/g, '');
  if (data[args[1]] === 0 && data[args[2]] === 0 && tmpString === '+la+lb+lc') {
    return false;
  } else if (data[args[1]] === 0 && data[args[2]] === 1 && tmpString === '+la+lc+lb') {
    return false;
  } else if (data[args[1]] === 1 && data[args[2]] === 0 && tmpString === '+la+lc') {
    return false;
  } else if (data[args[1]] === 1 && data[args[2]] === 1 && tmpString === '+la+lb') {
    return false;
  } else {
    return true;
  }
};

// 三相四线正确功率判断
// args: [ 0 'phaseSeq', 1 'phaseVoltage', 2 'phaseCurrent', 3 'elementsCurrentLagAngle', 4 'elementsAccessMethods', 5 'phaseEffectivePower']
const correctPowerAWith3P4L = (data, args) => {
  let correctPowerA = [];
  // console.log('here', data[args[4]][0])
  if (data[args[0]] === 0) {
    correctPowerA[0] = -1 * data[args[5]][0];
    correctPowerA[1] = -1 * data[args[1]][0] * data[args[2]][1] * Math.cos(data[args[3]][1]);
    correctPowerA[2] = -1 * data[args[1]][0] * data[args[2]][2] * Math.cos(data[args[3]][2]);
  } else {
    correctPowerA[0] = data[args[5]][0];
    correctPowerA[1] = data[args[1]][0] * data[args[2]][1] * Math.cos(data[args[3]][1]);
    correctPowerA[2] = data[args[1]][0] * data[args[2]][2] * Math.cos(data[args[3]][2]);
  }

  return correctPowerA;
};

const correctPowerBWith3P4L = (data, args) => {
  let correctPowerB = [];
  if (data[args[0]] === 0) {
    if (data[args[4]][1].slice(0, 1) === '-') {
      correctPowerB[0] =
        -1 * data[args[1]][1] * data[args[2]][0] * Math.cos(data[args[3]][0] - 120.0);
      correctPowerB[1] = -1 * data[args[5]][1];
      correctPowerB[2] =
        -1 * data[args[1]][1] * data[args[2]][2] * Math.cos(data[args[3]][2] - 120.0);
    } else {
      correctPowerB[0] = data[args[1]][1] * data[args[2]][0] * Math.cos(data[args[3]][0] - 120.0);
      correctPowerB[1] = data[args[5]][1];
      correctPowerB[2] = data[args[1]][1] * data[args[2]][2] * Math.cos(data[args[3]][2] - 120.0);
    }
  } else {
    if (data[args[4]][1].slice(0, 1) === '-') {
      correctPowerB[0] =
        -1 * data[args[1]][1] * data[args[2]][0] * Math.cos(data[args[3]][0] - 240.0);
      correctPowerB[1] = -1 * data[args[5]][1];
      correctPowerB[2] =
        -1 * data[args[1]][1] * data[args[2]][2] * Math.cos(data[args[3]][2] - 240.0);
    } else {
      correctPowerB[0] = data[args[1]][1] * data[args[2]][0] * Math.cos(data[args[3]][0] - 240.0);
      correctPowerB[1] = data[args[5]][1];
      correctPowerB[2] = data[args[1]][1] * data[args[2]][2] * Math.cos(data[args[3]][2] - 240.0);
    }
  }

  return correctPowerB;
};

const correctPowerCWith3P4L = (data, args) => {
  let correctPowerC = [];
  if (data[args[0]] === 0) {
    if (data[args[4]][2].slice(0, 1) === '-') {
      correctPowerC[0] =
        -1 * data[args[1]][2] * data[args[2]][0] * Math.cos(data[args[3]][0] - 240.0);
      correctPowerC[1] =
        -1 * data[args[1]][2] * data[args[2]][1] * Math.cos(data[args[3]][1] - 240.0);
      correctPowerC[2] = -1 * data[args[5]][2];
    } else {
      correctPowerC[0] = data[args[1]][2] * data[args[2]][0] * Math.cos(data[args[3]][0] - 240.0);
      correctPowerC[1] = data[args[1]][2] * data[args[2]][1] * Math.cos(data[args[3]][1] - 240.0);
      correctPowerC[2] = data[args[5]][2];
    }
  } else {
    if (data[args[4]][2].slice(0, 1) === '-') {
      correctPowerC[0] =
        -1 * data[args[1]][2] * data[args[2]][0] * Math.cos(data[args[3]][0] - 120.0);
      correctPowerC[1] =
        -1 * data[args[1]][2] * data[args[2]][1] * Math.cos(data[args[3]][1] - 120.0);
      correctPowerC[2] = -1 * data[args[5]][2];
    } else {
      correctPowerC[0] = data[args[1]][2] * data[args[2]][0] * Math.cos(data[args[3]][0] - 120.0);
      correctPowerC[1] = data[args[1]][2] * data[args[2]][1] * Math.cos(data[args[3]][1] - 120.0);
      correctPowerC[2] = data[args[5]][2];
    }
  }

  return correctPowerC;
};

// 三相三线正确功率判断
// args: [ 0 'phaseSeq', 1 'phaseVoltage', 2 'phaseCurrent', 3 'elementsCurrentLagAngle', 4 'elementsAccessMethods', 5 'phaseEffectivePower']
const correctPowerAWith3P3L = (data, args) => {
  let correctPowerA = [];
  if (data[args[0]] === 0) {
    if (data[args[4]][0].slice(0, 1) === '-') {
      correctPowerA[0] = {
        UabL1: -1 * data[args[5]][0],
        UabL2: -1 * data[args[1]][0] * data[args[2]][2] * Math.cos(330.0 - data[args[3]][1]),
      };
    } else {
      correctPowerA[0] = {
        UabL1: data[args[5]][0],
        UabL2: data[args[1]][0] * data[args[2]][2] * Math.cos(330.0 - data[args[3]][1]),
      };
    }
    if (data[args[4]][1].slice(0, 1) === '-') {
      correctPowerA[1] = {
        UbcL1: data[args[5]][0],
        UbcL2: -1 * data[args[1]][0] * data[args[2]][2] * Math.cos(270.0 - data[args[3]][1]),
      };
      correctPowerA[2] = {
        UcaL1:
          -1 *
          (data[args[1]][0] + data[args[1]][2]) *
          0.5 *
          data[args[2]][0] *
          Math.cos(270 - data[args[3]][0]),
        UcaL2:
          -1 *
          (data[args[1]][0] + data[args[1]][2]) *
          0.5 *
          data[args[2]][2] *
          Math.cos(270 - data[args[3]][1]),
      };
    } else {
      correctPowerA[1] = {
        UbcL1: -1 * data[args[5]][0],
        UbcL2: data[args[1]][0] * data[args[2]][2] * Math.cos(270.0 - data[args[3]][1]),
      };
      correctPowerA[2] = {
        UcaL1:
          (data[args[1]][0] + data[args[1]][2]) *
          0.5 *
          data[args[2]][0] *
          Math.cos(270 - data[args[3]][0]),
        UcaL2:
          (data[args[1]][0] + data[args[1]][2]) *
          0.5 *
          data[args[2]][2] *
          Math.cos(270 - data[args[3]][1]),
      };
    }
  } else {
    if (data[args[4]][0].slice(0, 1) === '-') {
      correctPowerA[0] = {
        UacL1:
          -1 *
          (data[args[1]][0] + data[args[1]][2]) *
          0.5 *
          data[args[2]][0] *
          Math.cos(330 - data[args[3]][0]),
        UacL2:
          -1 *
          (data[args[1]][0] + data[args[1]][2]) *
          0.5 *
          data[args[2]][2] *
          Math.cos(330 - data[args[3]][1]),
      };
      correctPowerA[1] = {
        UbaL1: data[args[5]][0],
        UbaL2: -1 * data[args[1]][0] * data[args[2]][2] * Math.cos(330.0 - data[args[3]][1]),
      };
    } else {
      correctPowerA[0] = {
        UacL1:
          (data[args[1]][0] + data[args[1]][2]) *
          0.5 *
          data[args[2]][0] *
          Math.cos(330 - data[args[3]][0]),
        UacL2:
          (data[args[1]][0] + data[args[1]][2]) *
          0.5 *
          data[args[2]][2] *
          Math.cos(330 - data[args[3]][1]),
      };
      correctPowerA[1] = {
        UbaL1: -1 * data[args[5]][0],
        UbaL2: data[args[1]][0] * data[args[2]][2] * Math.cos(330.0 - data[args[3]][1]),
      };
    }
    if (data[args[4]][2].slice(0, 1) === '-') {
      correctPowerA[2] = {
        UcbL1: -1 * data[args[5]][0],
        UcbL2: -1 * data[args[1]][0] * data[args[2]][2] * Math.cos(270.0 - data[args[3]][1]),
      };
    } else {
      correctPowerA[2] = {
        UcbL1: data[args[5]][0],
        UcbL2: data[args[1]][0] * data[args[2]][2] * Math.cos(270.0 - data[args[3]][1]),
      };
    }
  }

  return correctPowerA;
};

const correctPowerBWith3P3L = (data, args) => {
  let correctPowerB = [];
  if (data[args[0]] === 0) {
    if (data[args[4]][0].slice(0, 1) === '-') {
      correctPowerB[0] = {
        UbaL1: -1 * data[args[1]][2] * data[args[2]][0] * Math.cos(330.0 - data[args[3]][0]),
        UbaL2: data[args[5]][2],
      };
      correctPowerB[1] = {
        UacL1:
          -1 *
          (data[args[1]][0] + data[args[1]][2]) *
          0.5 *
          data[args[2]][0] *
          Math.cos(330 - data[args[3]][0]),
        UacL2:
          -1 *
          (data[args[1]][0] + data[args[1]][2]) *
          0.5 *
          data[args[2]][2] *
          Math.cos(330 - data[args[3]][1]),
      };
    } else {
      correctPowerB[0] = {
        UbaL1: data[args[1]][2] * data[args[2]][0] * Math.cos(330.0 - data[args[3]][0]),
        UbaL2: -1 * data[args[5]][2],
      };
      correctPowerB[1] = {
        UacL1:
          (data[args[1]][0] + data[args[1]][2]) *
          0.5 *
          data[args[2]][0] *
          Math.cos(330 - data[args[3]][0]),
        UacL2:
          (data[args[1]][0] + data[args[1]][2]) *
          0.5 *
          data[args[2]][2] *
          Math.cos(330 - data[args[3]][1]),
      };
    }
    if (data[args[4]][1].slice(0, 1) === '-') {
      correctPowerB[2] = {
        UcbL1: -1 * data[args[1]][2] * data[args[2]][0] * Math.cos(270.0 - data[args[3]][0]),
        UcbL2: -1 * data[args[5]][2],
      };
    } else {
      correctPowerB[2] = {
        UcbL1: data[args[1]][2] * data[args[2]][0] * Math.cos(270.0 - data[args[3]][0]),
        UcbL2: data[args[5]][2],
      };
    }
  } else {
    if (data[args[4]][1].slice(0, 1) === '-') {
      correctPowerB[0] = {
        UbcL2: data[args[5]][2],
        UbcL1: -1 * data[args[1]][2] * data[args[2]][1] * Math.cos(270.0 - data[args[3]][0]),
      };
      correctPowerB[1] = {
        UcaL1:
          -1 *
          (data[args[1]][0] + data[args[1]][2]) *
          0.5 *
          data[args[2]][0] *
          Math.cos(270.0 - data[args[3]][0]),
        UcaL2:
          -1 *
          (data[args[1]][0] + data[args[1]][2]) *
          0.5 *
          data[args[2]][2] *
          Math.cos(270.0 - data[args[3]][1]),
      };
    } else {
      correctPowerB[0] = {
        UbcL2: -1 * data[args[5]][2],
        UbcL1: data[args[1]][2] * data[args[2]][1] * Math.cos(270.0 - data[args[3]][0]),
      };
      correctPowerB[1] = {
        UcaL1:
          (data[args[1]][0] + data[args[1]][2]) *
          0.5 *
          data[args[2]][0] *
          Math.cos(270.0 - data[args[3]][0]),
        UcaL2:
          (data[args[1]][0] + data[args[1]][2]) *
          0.5 *
          data[args[2]][2] *
          Math.cos(270.0 - data[args[3]][1]),
      };
    }
    if (data[args[4]][0].slice(0, 1) === '-') {
      correctPowerB[2] = {
        UabL1: -1 * data[args[1]][2] * data[args[2]][1] * Math.cos(330.0 - data[args[3]][0]),
        UabL2: -1 * data[args[5]][2],
      };
    } else {
      correctPowerB[2] = {
        UabL1: data[args[1]][2] * data[args[2]][1] * Math.cos(330.0 - data[args[3]][0]),
        UabL2: data[args[5]][2],
      };
    }
  }

  return correctPowerB;
};

const computeTotal = (data, config) => {
  if (data.modeOfConnection === '三相三线') {
    data.lineMode = 1;
    data.phaseSeq = 0;
  } else {
    data.lineMode = 0;
    data.phaseSeq = 0;
  }

  basicAngle(data, ['phaseEffectivePower', 'phaseReactivePower']);
  realAngle(data, ['phaseEffectivePower', 'phaseReactivePower', 'elementsBasicAngle']);
  lagAngle(data, ['lineMode', 'phaseSeq']);
  elecCurrent(data, ['elementsVoltageLagAngle', 'elementsRealAngle']);
  accessMethod(data, config, ['elementsCurrentLagAngle']);
};

const methods = {
  computeTotal,
  isNotBalance,
  isNotAccessRight,
  correctPowerAWith3P4L,
  correctPowerBWith3P4L,
  correctPowerCWith3P4L,
  correctPowerAWith3P3L,
  correctPowerBWith3P3L,
};

export default methods;

// basicAngle(data, ['phaseEffectivePower', 'phaseReactivePower'])
// realAngle(data, ['phaseEffectivePower', 'phaseReactivePower', 'elementsBasicAngle'])
// lagAngle(data, ['lineMode', 'phaseSeq'])
// elecCurrent(data, ['elementsVoltageLagAngle', 'elementsRealAngle'])
// accessMethod(data, ['elementsCurrentLagAngle'])

// correctPowerAWith3P4L(data, ['phaseSeq', 'phaseVoltage', 'phaseCurrent', 'elementsCurrentLagAngle', 'elementsAccessMethods', 'phaseEffectivePower'])
// correctPowerBWith3P4L(data, ['phaseSeq', 'phaseVoltage', 'phaseCurrent', 'elementsCurrentLagAngle', 'elementsAccessMethods', 'phaseEffectivePower'])
// correctPowerCWith3P4L(data, ['phaseSeq', 'phaseVoltage', 'phaseCurrent', 'elementsCurrentLagAngle', 'elementsAccessMethods', 'phaseEffectivePower'])

// correctPowerAWith3P3L(dataList[0], ['phaseSeq', 'phaseVoltage', 'phaseCurrent', 'elementsCurrentLagAngle', 'elementsAccessMethods', 'phaseEffectivePower'])
// correctPowerBWith3P3L(dataList[0], ['phaseSeq', 'phaseVoltage', 'phaseCurrent', 'elementsCurrentLagAngle', 'elementsAccessMethods', 'phaseEffectivePower'])
