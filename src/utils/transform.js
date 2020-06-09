import { Map, ResultMap } from './map.js';

let mapKeysArray = Object.keys(Map);
let transformData = {};
// 往子数组里 push 元素 dargs 代表 第 dargs 行，margs 代表第 margs 列。
const arrayPush = (data, margs) => {
  let IfConvert = Map[mapKeysArray[margs]];
  // IfConvert[0] = "phaseEffectivePower"
  // IfConvert[1] = 1 or undefined.
  if (IfConvert[1]) {
    // 把需要成为数组的值，后两个并在一起填充到 transformData 中
    // 并移动下标消除一次读取 3 个数据的影响
    transformData[IfConvert[0]] = [
      1 * data[mapKeysArray[margs]],
      1 * data[mapKeysArray[margs + 1]],
      1 * data[mapKeysArray[margs + 2]],
    ];
    return (margs += 2);
  } else {
    mapKeysNumber(data, margs);
    return margs;
  }
};

// 更改需要转换为数字的列
const mapKeysNumber = (data, margs) => {
  let IfConvert = Map[mapKeysArray[margs]];
  if (
    Object.keys(data)[margs] === '零序电流' ||
    Object.keys(data)[margs] === '有功功率' ||
    Object.keys(data)[margs] === '无功功率'
  ) {
    transformData[IfConvert[0]] = 1 * data[mapKeysArray[margs]];
    return margs;
  } else {
    // 不需要转换
    transformData[IfConvert[0]] = data[mapKeysArray[margs]];
  }
};

// 把一条数据中文 keys 映射为 英文 keys
export const transformDataListKeys = data => {
  for (let i = 0; i < mapKeysArray.length; i++) {
    mapKeysNumber(data, i);
    i = arrayPush(data, i);
  }
  return transformData;
};

export const generateFinalData = data => {
  let result = [];
  console.log(data);
  let keys = Object.keys(data[0]);
  console.log(keys);
  data.forEach(element => {
    let obj = {};
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] == 'phaseVoltage') {
        obj['A相电压'] = element[keys[i]][0];
        obj['B相电压'] = element[keys[i]][1];
        obj['C相电压'] = element[keys[i]][2];
      }
      if (keys[i] == 'phaseCurrent') {
        obj['A相电流'] = element[keys[i]][0];
        obj['B相电流'] = element[keys[i]][1];
        obj['C相电流'] = element[keys[i]][2];
      }
      if (keys[i] == 'phaseEffectivePower') {
        obj['A相有功功率'] = element[keys[i]][0];
        obj['B相有功功率'] = element[keys[i]][1];
        obj['C相有功功率'] = element[keys[i]][2];
      }
      if (keys[i] == 'phaseReactivePower') {
        obj['A相无功功率'] = element[keys[i]][0];
        obj['B相无功功率'] = element[keys[i]][1];
        obj['C相无功功率'] = element[keys[i]][2];
      }
      if (keys[i] == 'elementsRealAngle') {
        obj['一元件真实角度'] = element[keys[i]][0];
        obj['二元件真实角度'] = element[keys[i]][1] ? element[keys[i]][1] : '';
        obj['三元件真实角度'] = element[keys[i]][2];
      }
      if (keys[i] == 'elementsBasicAngle') {
        obj['一元件基础角度'] = element[keys[i]][0];
        obj['二元件基础角度'] = element[keys[i]][1] ? element[keys[i]][1] : '';
        obj['三元件基础角度'] = element[keys[i]][2];
      }
      if (keys[i] == 'elementsVoltageLagAngle') {
        obj['一元件电压滞后角度'] = element[keys[i]][0];
        obj['二元件电压滞后角度'] = element[keys[i]][1] ? element[keys[i]][1] : '';
        obj['三元件电压滞后角度'] = element[keys[i]][2];
      }
      if (keys[i] == 'elementsCurrentLagAngle') {
        obj['一元件电流滞后角度'] = element[keys[i]][0];
        obj['二元件电流滞后角度'] = element[keys[i]][1] ? element[keys[i]][1] : '';
        obj['三元件电流滞后角度'] = element[keys[i]][2];
      }
      if (keys[i] == 'correctPower') {
        obj['一元件实际功率'] = element[keys[i]][0];
        obj['二元件实际功率'] = element[keys[i]][1];
        obj['三元件实际功率'] = element[keys[i]][2];
      }
      if (keys[i] == 'phaseSeq') {
        obj['向序'] = element[keys[i]] == 0 ? '三相三线' : '三相四线';
      }
      if (keys[i] == 'elementsAccessMethods') {
        obj['二次线接入方式'] = toString(element[keys[i]]);
      }

      obj[ResultMap[keys[i]]] = element[keys[i]];

      result.push(obj);
    }
  });

  return result;
};
