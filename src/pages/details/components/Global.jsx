import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';
import styles from './global.less';

const spanStyle = {
  marginRight: '12px',
};

@connect(({ configuration }) => ({
  conf: configuration,
}))
class Global extends Component {
  renderVoltage = () => {
    const { conf } = this.props;

    return (
      <div>
        <Card title="电压滞后于 A 相电压角度">
          <Row gutter={8}>
            <Col span={6}>
              <Card title="三相四线 - 正相序">
                <p>
                  <span style={spanStyle}>一元件</span>
                  <span style={spanStyle}>
                    {
                      conf.voltagePhaseDelay[conf.defs.lineMode3P4L][conf.defs.phaseSeqPositive][
                        conf.defs.phaseAIndex
                      ]
                    }
                    .0
                  </span>
                </p>
                <p>
                  <span style={spanStyle}>二元件</span>
                  <span style={spanStyle}>
                    {
                      conf.voltagePhaseDelay[conf.defs.lineMode3P4L][conf.defs.phaseSeqPositive][
                        conf.defs.phaseBIndex
                      ]
                    }
                    .0
                  </span>
                </p>
                <p>
                  <span style={spanStyle}>三元件</span>
                  <span style={spanStyle}>
                    {
                      conf.voltagePhaseDelay[conf.defs.lineMode3P4L][conf.defs.phaseSeqPositive][
                        conf.defs.phaseCIndex
                      ]
                    }
                    .0
                  </span>
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="三相四线 - 逆相序">
                <p>
                  <span style={spanStyle}>一元件</span>
                  <span style={spanStyle}>
                    {
                      conf.voltagePhaseDelay[conf.defs.lineMode3P4L][conf.defs.phaseSeqNegative][
                        conf.defs.phaseAIndex
                      ]
                    }
                    .0
                  </span>
                </p>
                <p>
                  <span style={spanStyle}>二元件</span>
                  <span style={spanStyle}>
                    {
                      conf.voltagePhaseDelay[conf.defs.lineMode3P4L][conf.defs.phaseSeqNegative][
                        conf.defs.phaseBIndex
                      ]
                    }
                    .0
                  </span>
                </p>
                <p>
                  <span style={spanStyle}>三元件</span>
                  <span style={spanStyle}>
                    {
                      conf.voltagePhaseDelay[conf.defs.lineMode3P4L][conf.defs.phaseSeqNegative][
                        conf.defs.phaseCIndex
                      ]
                    }
                    .0
                  </span>
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="三相三线 - 正相序">
                <p>
                  <span style={spanStyle}>一元件</span>
                  <span style={spanStyle}>
                    {
                      conf.voltagePhaseDelay[conf.defs.lineMode3P3L][conf.defs.phaseSeqPositive][
                        conf.defs.phaseAIndex
                      ]
                    }
                    .0
                  </span>
                </p>
                <p>
                  <span style={spanStyle}>三元件</span>
                  <span style={spanStyle}>
                    {
                      conf.voltagePhaseDelay[conf.defs.lineMode3P3L][conf.defs.phaseSeqPositive][
                        conf.defs.phaseCIndex
                      ]
                    }
                    .0
                  </span>
                </p>
                <p>&nbsp;</p>
              </Card>
            </Col>
            <Col span={6} style={{ height: '100%' }}>
              <Card title="三相三线 - 逆相序">
                <p>
                  <span style={spanStyle}>一元件</span>
                  <span style={spanStyle}>
                    {
                      conf.voltagePhaseDelay[conf.defs.lineMode3P3L][conf.defs.phaseSeqNegative][
                        conf.defs.phaseAIndex
                      ]
                    }
                    .0
                  </span>
                </p>
                <p>
                  <span style={spanStyle}>三元件</span>
                  <span style={spanStyle}>
                    {
                      conf.voltagePhaseDelay[conf.defs.lineMode3P3L][conf.defs.phaseSeqNegative][
                        conf.defs.phaseCIndex
                      ]
                    }
                    .0
                  </span>
                </p>
                <p>&nbsp;</p>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    );
  };

  renderCurrentAngle = () => {
    const { conf } = this.props;

    return (
      <div>
        <Card title="全局配置">
          <Card title="正确接线时 A 相电流角度">
            <p>
              <span style={spanStyle}>范围</span>
              <span style={spanStyle}>{conf.global.currentADelayAngle}.0</span>
              <span style={spanStyle}> - </span>
              <span style={spanStyle}>{conf.global.currentADelayAngle + 60.0}.0</span>
            </p>
            <p unselectable>&nbsp;</p>
            <p unselectable>&nbsp;</p>
          </Card>
        </Card>
      </div>
    );
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
    );
  }
}

export default Global;
