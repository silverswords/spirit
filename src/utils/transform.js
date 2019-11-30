import Map from './map.js';

let mapKeysArray = Object.keys(Map);
let transformData = {}
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
    mapKeysNumber(data, margs)
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
    return margs
  } else {
    // 不需要转换
    transformData[IfConvert[0]] = data[mapKeysArray[margs]];
  }
}

// 把一条数据中文 keys 映射为 英文 keys
const transformDataListKeys = (data) => {
  for (let i = 0; i < mapKeysArray.length; i++) {
    mapKeysNumber(data, i)
    i = arrayPush(data, i)
  }
  return transformData
};

export default transformDataListKeys;
