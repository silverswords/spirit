const FilterModel = {
  namespace: 'filter',
  state: {
    defs: {
      prePowerCheck: 0, // 有功、无功检查
      preLoadCheck: 1, // 负荷正常
      prePhaseSeqCheck: 2, // 相序异常
      preUnderVoltageCheck: 3, // 电压失压
      preVoltageBalanceCheck: 4, // 电压不平衡
      preCurrentBalanceCheck: 5, // 电流不平衡
      preLoadStableCheck: 6, // 负载稳定
      preFilterLabel: id => {
        return [
          '有功无功检查',
          '负荷正常',
          '相序异常',
          '电压失压',
          '电压不平衡',
          '电流不平衡',
          '负载稳定',
        ][id];
      },

      postCurrentPhase: 0,
    },
    pre: {
      preFiltersSelected: [true, true, true, true, true, true, true],
      params: [
        [0.0, 0.0],
        [20.0],
        [10.0],
        [90.0, 180.0, 198.0, 198.0, 198.0, 90.0],
        [15.0],
        [15.0],
        [100.0, 60.0],
      ],
    },
    post: {
      params: [[5.0, 175.0, 185.0]],
    },
  },
  effects: {
    *filterChanged({ payload }, { put }) {
      yield put({
        type: 'rebuildFilterSelected',
        payload: payload,
      });
    },

    *preFilterValueChanged({ payload }, { put }) {
      yield put({
        type: 'rebuildPreFilterParams',
        payload: payload,
      });
    },

    *postCurrentPhaseChanged({ payload }, { put }) {
      yield put({
        type: 'rebuildPostCurrentPhase',
        payload: payload,
      });
    },
  },
  reducers: {
    rebuildFilterSelected(state, { payload }) {
      let filterSelected = [false, false, false, false, false, false, false];

      payload.map(val => {
        filterSelected[val] = true;
      });

      return {
        ...state,
        pre: {
          ...state.pre,
          preFiltersSelected: filterSelected,
        },
      };
    },

    rebuildPreFilterParams(state, { payload }) {
      let { row, column, value } = payload;
      let params = state.pre.params;

      params[row][column] = value;

      return {
        ...state,
        pre: {
          ...state.pre,
          params: params,
        },
      };
    },

    rebuildPostCurrentPhase(state, { payload }) {
      let { row, column, value } = payload;
      let params = state.post.params;

      params[row][column] = value;

      return {
        ...state,
        post: {
          ...state.post,
          params: params,
        },
      };
    },
  },
};

export default FilterModel;
