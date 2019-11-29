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
    filters: {
      basicKeys: {
        station: "所",
        userType: "用户类型",
        userID: "用户编号",
        userName: "用户名称",
        meteredAssetNumber: "表计资产号",
        dataDate: "数据日期",
        CT: "CT",
        PT: "PT",
        phaseVoltage: ["A相电压", "B相电压", "C相电压"],
        phaseCurrent: ["A相电流", "B相电流", "C相电流"],
        zeroSequenceCurrent: "零序电流",
        effectivePower: "有功功率",
        phaseEffectivePower: ["A相有功功率", "B相有功功率", "C相有功功率"],
        reactivePower: "无功功率",
        phaseReactivePower: ["A相无功功率", "B相无功功率", "C相无功功率"],
      },
      basicDataList: [{
        station: "试验县供电公司",
        userType: "专变",
        userID: "0378255342",
        userName: "用户13",
        meteredAssetNumber: "1330001000080016500755",
        dataDate: "2019-8-20 00:00:00",
        CT: 10,
        PT: 100,
        phaseVoltage: [104.7, 0, 105],
        phaseCurrent: [1.191, 0, 1.247],
        zeroSequenceCurrent: 0,
        effectivePower: 2.5612,
        phaseEffectivePower: [0.0906, 0, 0.1196],
        reactivePower: 0.0809,
        phaseReactivePower: [0.0809, 0, -0.0391],
      }],
      sg186Keys: {
        userID: "用户编号",
        lineName: "线路名称",
        assetNumber: "资产编号",
        factoryNumber: "出厂编号",
        comprehensiveRatio: "综合倍率",
        transformerCapacity: "变压器容量",
        modeOfConnection: "接线方式",
        voltage: "电压",
        calibrationCurrent: "标定电流"
      },
      sg186DataList: [{
        userID: "0370427661",
        lineName: "试验线514",
        assetNumber: "1330001000080006026766",
        factoryNumber: "00008000602676",
        comprehensiveRatio: 80,
        transformerCapacity: 315,
        modeOfConnection: "三相四线",
        voltage: 230,
        calibrationCurrent: 1.5
      }],
      mergeDataList: [],
      preFilterResult: id => {
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

    *filterBasicDataChanged({ payload }, { put }) {
      yield put({
        type: 'rebuildBasicData',
        payload: payload,
      })
    },

    *filterSG186DataChanged({ payload }, { put }) {
      yield put({
        type: 'rebuildSG186Data',
        payload: payload,
      })
    },

    *filterMergeDataChanged({ payload }, { put }) {
      yield put({
        type: 'rebuildMergeData',
        payload: payload,
      })
    }
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

    rebuildBasicData(state, { payload }) {
      let { value } = payload;
      let basicDataList = state.filters.basicDataList;

      basicDataList = value

      return {
        ...state,
        filters: {
          ...state.filters,
          basicDataList: basicDataList,
        }
      }
    },

    rebuildSG186Data(state, { payload }) {
      let { value } = payload;
      let sg186DataList = state.filters.sg186DataList;

      sg186DataList = value

      return {
        ...state,
        filters: {
          ...state.filters,
          sg186DataList: sg186DataList,
        }
      }
    }
  },

  rebuildMergeData(state, { payload }) {
    let { value } = payload;
    let mergeDataList = state.filters.mergeDataList;

    mergeDataList = value

    return {
      ...state,
      filters: {
        ...state.filters,
        mergeDataList: mergeDataList,
      }
    }
  }
};

export default FilterModel;
