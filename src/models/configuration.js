const ConfigurationModel = {
  namespace: 'configuration',
  state: {
    defs: {
        phaseAIndex: 0, // A 相偏移
        phaseBIndex: 1, // B 相偏移
        phaseCIndex: 2, // C 相偏移

        lineMode3P4L: 0, // 三相四线
        lineMode3P3L: 1, // 三相三线

        phaseSeqPositive: 0, // 正相序
        phaseSeqNegative: 1, // 逆相序
    },
    voltagePhaseDelay: [
        [[0.0, 120.0, 240.0], [0.0, 240.0, 120.0]],
        [[330.0, undefined, 270.0], [30.0, undefined, 90.0]],
    ],
  },
  effects: {
  },
  reducers: {
  },
};
export default ConfigurationModel;
