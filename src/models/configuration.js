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
		global: {
			currentADelayAngle: 8.0,
		}
  },
  effects: {
	  *changeVoltagePhase({ payload }, { put }) {
		  yield put({
		    type: 'rebuildVoltagePhase',
		    payload: payload,
		  })
    },
    *changeCurrentAngle({ payload }, { put }) {
      yield put({
        type: 'rebuildCurrentAngle',
        payload: payload
      })
    }
  },
  reducers: {
    rebuildVoltagePhase(state, { payload }) {
      let { phaseIndex, lineMode, phaseSeq, value } = payload
      let newVoltagePhase = state.voltagePhaseDelay

      newVoltagePhase[phaseIndex][lineMode][phaseSeq] = value

      return {
        ...state,
        voltagePhaseDelay: newVoltagePhase
      }
    },
    rebuildCurrentAngle(state, {payload}) {
      return {
        ...state,
        global: {
          ...global,
          currentADelayAngle: payload
        }
      }
    }
  }
};
export default ConfigurationModel;
