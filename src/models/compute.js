const ComputeModel = {
  namespace: 'compute',
  state: {
    compute: {
      resultDataList: [],
      removeDataList: []
    }
  },
  effects: {
    *computeResultDataChanged({ payload }, { put }) {
      yield put({
        type: 'rebuildResultData',
        payload: payload,
      })
    },
    *computeRemoveDataChanged({ payload }, { put }) {
      yield put({
        type: 'rebuildRemoveData',
        payload: payload,
      })
    }
  },
  reducers: {
    rebuildResultData(state, { payload }) {
      let { value } = payload;
      let resultDataList = state.compute.resultDataList;
  
      resultDataList = value
  
      return {
        ...state,
        filters: {
          ...state.compute,
          mergeDataList: resultDataList,
        }
      }
    }
  },
  rebuildRemoveData(state, { payload }) {
    let { value } = payload;
    let removeDataList = state.compute.removeDataList;

    removeDataList = value

    return {
      ...state,
      filters: {
        ...state.compute,
        removeDataList: removeDataList,
      }
    }
  }
};

export default ComputeModel;