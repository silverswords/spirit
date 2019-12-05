import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, InputNumber } from 'antd';
import styles from './prefilter.less';

const titles = [
  '有功功率、无功功率小于给定值时，过滤该条数据',
  '负荷正常参数配置',
  '相序异常参数配置',
  '电压失压参数配置',
  '电压不平衡参数配置',
  '电流不平衡参数配置',
  '负载稳定参数配置',
];

@connect(({ filter }) => ({
  conf: filter,
}))
class PreFilter extends Component {
  renderPowerCheck = () => {
    const { conf, dispatch } = this.props;

    const onActiveChange = val => {
      dispatch({
        type: 'filter/preFilterValueChanged',
        payload: {
          row: conf.defs.prePowerCheck,
          column: 0,
          value: val,
        },
      });
    };

    const onInactiveChange = val => {
      dispatch({
        type: 'filter/preFilterValueChanged',
        payload: {
          row: conf.defs.prePowerCheck,
          column: 1,
          value: val,
        },
      });
    };

    return (
      <>
        <p>
          <span>有功功率 &le;</span>
          <InputNumber
            value={conf.pre.params[conf.defs.prePowerCheck][0]}
            min={0}
            step={0.01}
            onChange={onActiveChange}
          />
        </p>
        <p>
          <span>无功功率 &le;</span>
          <InputNumber
            value={conf.pre.params[conf.defs.prePowerCheck][1]}
            min={0}
            step={0.01}
            onChange={onInactiveChange}
          />
        </p>
      </>
    );
  };

  renderLoadCheck = () => {
    const { conf, dispatch } = this.props;

    const onLoadChange = val => {
      dispatch({
        type: 'filter/preFilterValueChanged',
        payload: {
          row: conf.defs.preLoadCheck,
          column: 0,
          value: val,
        },
      });
    };

    return (
      <>
        <p>
          <span>每一相电流 &gt; 运行容量的</span>
          <InputNumber
            value={conf.pre.params[conf.defs.preLoadCheck][0]}
            min={0}
            formatter={value => `${value}%`}
            parser={value => value.replace('%', '')}
            onChange={onLoadChange}
          />
        </p>
      </>
    );
  };

  renderPhaseSeqCheck = () => {
    const { conf, dispatch } = this.props;

    const onPhaseSeqChange = val => {
      dispatch({
        type: 'filter/preFilterValueChanged',
        payload: {
          row: conf.defs.prePhaseSeqCheck,
          column: 0,
          value: val,
        },
      });
    };

    return (
      <>
        <p>
          <span>三相有功功率值之和与总有功功率值的差值 &gt; 总有功功率值的</span>
          <InputNumber
            value={conf.pre.params[conf.defs.prePhaseSeqCheck][0]}
            min={0}
            max={100}
            formatter={value => `${value}%`}
            parser={value => value.replace('%', '')}
            onChange={onPhaseSeqChange}
          />
        </p>
      </>
    );
  };

  renderUnderVoltageCheck = () => {
    const { conf, dispatch } = this.props;

    const onUnderVoltageoneChange = val => {
      dispatch({
        type: 'filter/preFilterValueChanged',
        payload: {
          row: conf.defs.preUnderVoltageCheck,
          column: 0,
          value: val,
        },
      });
    };

    const onUnderVoltagetwoChange = val => {
      dispatch({
        type: 'filter/preFilterValueChanged',
        payload: {
          row: conf.defs.preUnderVoltageCheck,
          column: 1,
          value: val,
        },
      });
    };

    const onUnderVoltagethreeChange = val => {
      dispatch({
        type: 'filter/preFilterValueChanged',
        payload: {
          row: conf.defs.preUnderVoltageCheck,
          column: 2,
          value: val,
        },
      });
    };

    const onUnderVoltagefourChange = val => {
      dispatch({
        type: 'filter/preFilterValueChanged',
        payload: {
          row: conf.defs.preUnderVoltageCheck,
          column: 3,
          value: val,
        },
      });
    };

    const onUnderVoltagefiveChange = val => {
      dispatch({
        type: 'filter/preFilterValueChanged',
        payload: {
          row: conf.defs.preUnderVoltageCheck,
          column: 4,
          value: val,
        },
      });
    };

    const onUnderVoltagesixChange = val => {
      dispatch({
        type: 'filter/preFilterValueChanged',
        payload: {
          row: conf.defs.preUnderVoltageCheck,
          column: 5,
          value: val,
        },
      });
    };

    return (
      <>
        <Row gutter={12}>
          <Col span={8}>
            <Card title="高供高计三相三线100V">
              <p>
                <span>
                  一元件、三元件电压 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&le;
                </span>
                <InputNumber
                  value={conf.pre.params[conf.defs.preUnderVoltageCheck][0]}
                  min={0}
                  max={100}
                  step={1.0}
                  onChange={onUnderVoltageoneChange}
                />
                <span className={styles.last_child}>V</span>
              </p>
              <p>
                <span>一元件、三元件相电压和 &le;</span>
                <InputNumber
                  value={conf.pre.params[conf.defs.preUnderVoltageCheck][1]}
                  min={0}
                  step={1.0}
                  onChange={onUnderVoltagetwoChange}
                />
                <span className={styles.last_child}>V</span>
              </p>
              <p>&nbsp;</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="高供低计">
              <p>
                <span>一元件电压&lt;</span>
                <InputNumber
                  value={conf.pre.params[conf.defs.preUnderVoltageCheck][2]}
                  min={0}
                  step={1.0}
                  onChange={onUnderVoltagethreeChange}
                />
                <span className={styles.last_child}>V</span>
              </p>
              <p>
                <span>二元件电压&lt;</span>
                <InputNumber
                  value={conf.pre.params[conf.defs.preUnderVoltageCheck][3]}
                  min={0}
                  step={1.0}
                  onChange={onUnderVoltagefourChange}
                />
                <span className={styles.last_child}>V</span>
              </p>
              <p>
                <span>三元件电压&lt;</span>
                <InputNumber
                  value={conf.pre.params[conf.defs.preUnderVoltageCheck][4]}
                  min={0}
                  step={1.0}
                  onChange={onUnderVoltagefiveChange}
                />
                <span className={styles.last_child}>V</span>
              </p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="高供高计且三相四线额定电压57.7V">
              <p>
                <span>电压 &nbsp;&nbsp;&nbsp;&nbsp;&le;</span>
                <InputNumber
                  value={conf.pre.params[conf.defs.preUnderVoltageCheck][5]}
                  min={0}
                  max={100}
                  step={1.0}
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                  onChange={onUnderVoltagesixChange}
                />
              </p>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
            </Card>
          </Col>
        </Row>
      </>
    );
  };

  renderVoltageBalanceCheck = () => {
    const { conf, dispatch } = this.props;

    const onVoltageBalanceChange = val => {
      dispatch({
        type: 'filter/preFilterValueChanged',
        payload: {
          row: conf.defs.preVoltageBalanceCheck,
          column: 0,
          value: val,
        },
      });
    };

    return (
      <>
        <p>
          <span>（最大电压－最小电压）/ 最大电压 &gt;</span>
          <InputNumber
            value={conf.pre.params[conf.defs.preVoltageBalanceCheck][0]}
            min={0}
            max={100}
            formatter={value => `${value}%`}
            parser={value => value.replace('%', '')}
            onChange={onVoltageBalanceChange}
          />
        </p>
      </>
    );
  };

  renderCurrentBalanceCheck = () => {
    const { conf, dispatch } = this.props;

    const onCurrentBalanceChange = val => {
      dispatch({
        type: 'filter/preFilterValueChanged',
        payload: {
          row: conf.defs.preCurrentBalanceCheck,
          column: 0,
          value: val,
        },
      });
    };

    return (
      <>
        <p>
          <span>（最大电流－最小电流）/ 最大电流 &gt;</span>
          <InputNumber
            value={conf.pre.params[conf.defs.preCurrentBalanceCheck][0]}
            min={0}
            max={100}
            formatter={value => `${value}%`}
            parser={value => value.replace('%', '')}
            onChange={onCurrentBalanceChange}
          />
        </p>
      </>
    );
  };

  renderLoadStableCheck = () => {
    const { conf, dispatch } = this.props;

    const onLoadStableChange = val => {
      dispatch({
        type: 'filter/preFilterValueChanged',
        payload: {
          row: conf.defs.preLoadStableCheck,
          column: 0,
          value: val,
        },
      });
    };

    const onLoadStableCurrentChange = val => {
      dispatch({
        type: 'filter/preFilterValueChanged',
        payload: {
          row: conf.defs.preLoadStableCheck,
          column: 1,
          value: val,
        },
      });
    };

    return (
      <>
        <p>
          <span>
            变压器运行容量
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
          </span>
          <InputNumber
            value={conf.pre.params[conf.defs.preLoadStableCheck][0]}
            min={0}
            onChange={onLoadStableChange}
          />
          <span className={styles.last_child}>kVA</span>
        </p>
        <p>并且</p>
        <p>
          <span>各相负荷电流 &gt; 变压器额定电流的 </span>
          <InputNumber
            value={conf.pre.params[conf.defs.preLoadStableCheck][1]}
            min={0}
            max={100}
            formatter={value => `${value}%`}
            parser={value => value.replace('%', '')}
            onChange={onLoadStableCurrentChange}
          />
        </p>
      </>
    );
  };

  renderPreFilter = type => {
    const { conf } = this.props;

    if (type == conf.defs.prePowerCheck) return this.renderPowerCheck();

    if (type == conf.defs.preLoadCheck) return this.renderLoadCheck();

    if (type == conf.defs.prePhaseSeqCheck) return this.renderPhaseSeqCheck();

    if (type == conf.defs.preUnderVoltageCheck) return this.renderUnderVoltageCheck();

    if (type == conf.defs.preVoltageBalanceCheck) return this.renderVoltageBalanceCheck();

    if (type == conf.defs.preCurrentBalanceCheck) return this.renderCurrentBalanceCheck();

    if (type == conf.defs.preLoadStableCheck) return this.renderLoadStableCheck();

    return (
      <>
        <p>未定义过滤器参数</p>
      </>
    );
  };

  render() {
    const type = this.props.filterType;

    return (
      <div className={styles.prefilter}>
        <Card title={titles[type]}>
          {this.renderPreFilter(type)}
        </Card>
      </div>
    );
  }
}

export default PreFilter;
