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
  },
  reducers: {
    rebuildResultData(state, { payload }) {
      let { value } = payload;
      let resultDataList = state.compute.resultDataList;
      let removeDataList = state.compute.removeDataList;
  
      resultDataList = value.resultList
      removeDataList = value.removedList
  
      return {
        ...state,
        compute: {
          ...state.compute,
          resultDataList: resultDataList,
          removeDataList: removeDataList
        }
      }
    }
  },
};

export default ComputeModel;