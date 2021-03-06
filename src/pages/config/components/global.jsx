import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, InputNumber } from 'antd';
import styles from './global.less';

const spanStyle = {
  marginRight: '12px',
}

@connect(({ configuration }) => ({
  conf: configuration,
}))
class Global extends Component {
  renderVoltage = () => {
    const { conf, dispatch } = this.props

    const changeConfiguration = (value, phaseIndex, lineMode, phaseSeq) => {
      let newlineMode = lineMode | undefined
      dispatch({
        type: 'configuration/changeVoltagePhase',
        payload: {
          value,
          phaseIndex,
          lineMode: newlineMode,
          phaseSeq
        }
      })
    }

    return (
      <div>
        <Card title="电压滞后于 A 相电压角度配置">
          <Row gutter={8}>
            <Col span={6}>
              <Card title="三相四线 - 正相序">
                <p>
                  <span style={spanStyle}>一元件</span>
                  <InputNumber
                    value={
                      conf.voltagePhaseDelay[conf.defs.lineMode3P4L][conf.defs.phaseSeqPositive][
                        conf.defs.phaseAIndex
                      ]
                    }
                    min={0}
                    max={360}
                    step={0.1}
                    onChange={(value) => {
                      changeConfiguration(value, conf.defs.lineMode3P4L, conf.defs.phaseSeqPositive, conf.defs.phaseAIndex)
                    }}
                  />
                </p>
                <p>
                  <span style={spanStyle}>二元件</span>
                  <InputNumber
                    value={
                      conf.voltagePhaseDelay[conf.defs.lineMode3P4L][conf.defs.phaseSeqPositive][
                        conf.defs.phaseBIndex
                      ]
                    }
                    min={0}
                    max={360}
                    step={0.1}
                    onChange={(value) => {
                      changeConfiguration(value, conf.defs.lineMode3P4L, conf.defs.phaseSeqPositive, conf.defs.phaseBIndex)
                    }}
                  />
                </p>
                <p>
                  <span style={spanStyle}>三元件</span>
                  <InputNumber
                    value={
                      conf.voltagePhaseDelay[conf.defs.lineMode3P4L][conf.defs.phaseSeqPositive][
                        conf.defs.phaseCIndex
                      ]
                    }
                    min={0}
                    max={360}
                    step={0.1}
                    onChange={(value) => {
                      changeConfiguration(value, conf.defs.lineMode3P4L, conf.defs.phaseSeqPositive, conf.defs.phaseCIndex)
                    }}
                  />
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="三相四线 - 逆相序">
                <p>
                  <span style={spanStyle}>一元件</span>
                  <InputNumber
                    value={
                      conf.voltagePhaseDelay[conf.defs.lineMode3P4L][conf.defs.phaseSeqNegative][
                        conf.defs.phaseAIndex
                      ]
                    }
                    min={0}
                    max={360}
                    step={0.1}
                    onChange={(value) => {
                      changeConfiguration(value, conf.defs.lineMode3P4L, conf.defs.phaseSeqNegative, conf.defs.phaseAIndex)
                    }}
                  />
                </p>
                <p>
                  <span style={spanStyle}>二元件</span>
                  <InputNumber
                    value={
                      conf.voltagePhaseDelay[conf.defs.lineMode3P4L][conf.defs.phaseSeqNegative][
                        conf.defs.phaseBIndex
                      ]
                    }
                    min={0}
                    max={360}
                    step={0.1}
                    onChange={(value) => {
                      changeConfiguration(value, conf.defs.lineMode3P4L, conf.defs.phaseSeqNegative, conf.defs.phaseBIndex)
                    }}
                  />
                </p>
                <p>
                  <span style={spanStyle}>三元件</span>
                  <InputNumber
                    value={
                      conf.voltagePhaseDelay[conf.defs.lineMode3P4L][conf.defs.phaseSeqNegative][
                        conf.defs.phaseCIndex
                      ]
                    }
                    min={0}
                    max={360}
                    step={0.1}
                    onChange={(value) => {
                      changeConfiguration(value, conf.defs.lineMode3P4L, conf.defs.phaseSeqNegative, conf.defs.phaseCIndex)
                    }}
                  />
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="三相三线 - 正相序">
                <p>
                  <span style={spanStyle}>一元件</span>
                  <InputNumber
                    value={
                      conf.voltagePhaseDelay[conf.defs.lineMode3P3L][conf.defs.phaseSeqPositive][
                        conf.defs.phaseAIndex
                      ]
                    }
                    min={0}
                    max={360}
                    step={0.1}
                    onChange={(value) => {
                      changeConfiguration(value, conf.defs.lineMode3P3L, conf.defs.phaseSeqPositive, conf.defs.phaseAIndex)
                    }}
                  />
                </p>
                <p>
                  <span style={spanStyle}>三元件</span>
                  <InputNumber
                    value={
                      conf.voltagePhaseDelay[conf.defs.lineMode3P3L][conf.defs.phaseSeqPositive][
                        conf.defs.phaseCIndex
                      ]
                    }
                    min={0}
                    max={360}
                    step={0.1}
                    onChange={(value) => {
                      changeConfiguration(value, conf.defs.lineMode3P3L, conf.defs.phaseSeqPositive, conf.defs.phaseCIndex)
                    }}
                  />
                </p>
                <p>&nbsp;</p>
              </Card>
            </Col>
            <Col span={6} style={{ height: '100%' }}>
              <Card title="三相三线 - 逆相序">
                <p>
                  <span style={spanStyle}>一元件</span>
                  <InputNumber
                    value={
                      conf.voltagePhaseDelay[conf.defs.lineMode3P3L][conf.defs.phaseSeqNegative][
                        conf.defs.phaseAIndex
                      ]
                    }
                    min={0}
                    max={360}
                    step={0.1}
                    onChange={(value) => {
                      changeConfiguration(value, conf.defs.lineMode3P3L, conf.defs.phaseSeqNegative, conf.defs.phaseAIndex)
                    }}
                  />
                </p>
                <p>
                  <span style={spanStyle}>三元件</span>
                  <InputNumber
                    value={
                      conf.voltagePhaseDelay[conf.defs.lineMode3P3L][conf.defs.phaseSeqNegative][
                        conf.defs.phaseCIndex
                      ]
                    }
                    min={0}
                    max={360}
                    step={0.1}
                    onChange={(value) => {
                      changeConfiguration(value, conf.defs.lineMode3P3L, conf.defs.phaseSeqNegative, conf.defs.phaseCIndex)
                    }}
                  />
                </p>
                <p>&nbsp;</p>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }

  renderCurrentAngle = () => {
    const { conf, dispatch } = this.props;

    const changeCurrentAngle = val => {
      dispatch({
        type: 'configuration/changeCurrentAngle',
        payload: val
      })
    }

    return (
      <div>
        <Card title="全局配置">
          <Card title="正确接线时 A 相电流角度配置">
            <p>
              <span style={spanStyle}>范围</span>
              <InputNumber
                value={conf.global.currentADelayAngle}
                min={0}
                max={360.0}
                step={1.0}
                onChange={changeCurrentAngle}
              />
              <span> - </span>
            </p>
            <p>
              <InputNumber value={conf.global.currentADelayAngle + 60.0 < 360 ? conf.global.currentADelayAngle + 60.0 : conf.global.currentADelayAngle - 300.0} disabled />
            </p>
            <p>&nbsp;</p>
          </Card>
        </Card>
      </div>
    )
  };

  render() {
    return (
      <div className={styles.global_config}>
        <Row gutter={10}>
          {/* 电压配置 */}
          <Col span={18}>{this.renderVoltage()}</Col>

          {/* 电流角配置 */}
          <Col span={6}>{this.renderCurrentAngle()}</Col>
        </Row>
      </div>
    )
  }
}

export default Global;
