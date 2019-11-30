import Map from './map.js';

let mapKeysArray = Object.keys(Map);
// 往子数组里 push 元素 dargs 代表 第 dargs 行，margs 代表第 margs 列。
const arrayPush = (data, dargs, margs, transformDataList) => {
  // IfConvert[0] = "phaseEffectivePower"
  // IfConvert[1] = 1 or undefined.
  let IfConvert = Map[mapKeysArray[margs]];
  if (IfConvert[1]) {
    // 把需要成为数组的值，后两个并在一起填充到 transformDataList 中
    // 并移动下标消除一次读取 3 个数据的影响
    transformDataList[dargs][IfConvert[0]] = [
      1 * data[dargs][mapKeysArray[margs]],
      1 * data[dargs][mapKeysArray[margs + 1]],
      1 * data[dargs][mapKeysArray[margs + 2]],
    ];
    return (margs += 2);
  } else {
    // 不需要转换
    transformDataList[dargs][IfConvert[0]] = data[dargs][mapKeysArray[margs]];
    return margs;
  }
};

// 把中文 keys 和英文 keys 映射，并转换成需要的数字类型，args 是原始 data 里的元素
const mapKeysNumber = (data, args, transformDataList) => {
  for (let i = 0; i < mapKeysArray.length; i++) {
    if (
      Object.keys(data[args])[i] === '零序电流' ||
      Object.keys(data[args])[i] === '有功功率' ||
      Object.keys(data[args])[i] === '无功功率'
    ) {
      transformDataList[args][Map[mapKeysArray[i]][0]] = 1 * data[args][mapKeysArray[i]];
    } else {
      i = arrayPush(data, args, i, transformDataList);
    }
  }
};

// 接收 mergeDataList 的数据，返回 映射完成的 transformDataList 数据。
const transformFormat = (data, transformDataList) => {
  //遍历每一条数据
  for (let i = 0; i < data.length; i++) {
    // 转换操作 , mergeDataList[i] 访问到第 i 条数据，
    // 他的里面包括 “零序电流：2” 这样的键值对
    transformDataList[i] = {};
    mapKeysNumber(data, i, transformDataList);
  }
};

export default transformFormat;
