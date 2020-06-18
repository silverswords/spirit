const ComputeModel = {
  namespace: 'compute',
  state: {
    compute: {
      resultDataList: [],
      removeDataList: [],
      postremovdList: [],
    },
  },
  effects: {
    *computeResultDataChanged({ payload }, { put }) {
      yield put({
        type: 'rebuildResultData',
        payload: payload,
      });
    },
  },
  reducers: {
    rebuildResultData(state, { payload }) {
      let { value } = payload;
      let resultDataList = state.compute.resultDataList;
      let removeDataList = state.compute.removeDataList;
      let postremovdList = state.compute.postremovdList;

      resultDataList = value.resultList;
      removeDataList = value.preremovedList;
      postremovdList = value.postremovdList;

      return {
        ...state,
        compute: {
          ...state.compute,
          resultDataList: resultDataList,
          removeDataList: removeDataList,
          postremovdList: postremovdList,
        },
      };
    },
  },
};

export default ComputeModel;
