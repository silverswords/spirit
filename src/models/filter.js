const FilterModel = {
    namespace: 'filter',
    state: {
      defs: {
        prePowerCheck: 0,             // 有功、无功检查
        preLoadCheck: 1,              // 负荷正常
        prePhaseSeqCheck: 2,          // 相序异常
        preUnderVoltageCheck: 3,      // 电压失压
        preVoltageBalanceCheck: 4,    // 电压不平衡
        preCurrentBalanceCheck: 5,    // 电流不平衡
        preFilterLabel: (id) => {
          return ['有功无功检查', '负荷正常', '相序异常', '电压失压', '电压不平衡', '电流不平衡', ][id]
        }
      },
      pre: {
        preFiltersSelected: [true, true, true, true, true, true],
        params: [
          [],
          [],
          [],
          [],
          [],
          [],
        ]
      },
      post: {
      },
    },
    effects: {
      *filterChanged({ payload }, { put }) {
        yield put({
          type: 'rebuildFilterSelected',
          payload: payload,
        })
      }
    },
    reducers: {
      rebuildFilterSelected(state, { payload }) {
        let filterSelected = [false, false, false, false, false, false]

        payload.map(val => {
          filterSelected[val] = true
        })

        return {
          ...state,
          pre: {
            ...state.pre,
            preFiltersSelected: filterSelected,
          },
        }
      }
    },
  };

  export default FilterModel;
  