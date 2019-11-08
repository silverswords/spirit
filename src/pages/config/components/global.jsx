import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Checkbox, InputNumber } from 'antd';

const gridStyle = {
  width: '100%',
  textAlign: 'left',
  marginTop: '4px',
}

const margoStyle = {
  background: 'linear-gradient(to bottom right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996)',
}

const spanStyle = {
  marginRight: '12px',
}

@connect(({ configuration }) => ({
  conf: configuration,
}))
class Global extends Component {
  render() {
    const { conf } = this.props;
  
    return (
      <>
        <Row>
          <Col span={18}>
            <Card title='电压滞后于 A 相电压角度配置'>
              <Row gutter={12}>
                <Col span={6}>
                  <Card title="三相四线 - 正相序">
                    <Card.Grid style={gridStyle}>
                      <p>
                        <span style={spanStyle}>A 相电压</span>
                        <InputNumber
                          defaultValue={
                            conf.voltagePhaseDelay[conf.defs.lineMode3P4L][conf.defs.phaseSeqPositive][conf.defs.phaseAIndex]
                          }
                          min={0} max={360} step={0.1} 
                        />
                      </p>
                      <p>
                        <span style={spanStyle}>B 相电压</span>
                        <InputNumber
                          defaultValue={
                            conf.voltagePhaseDelay[conf.defs.lineMode3P4L][conf.defs.phaseSeqPositive][conf.defs.phaseBIndex]
                          }
                          min={0} max={360} step={0.1} 
                        />
                      </p>
                      <p>
                        <span style={spanStyle}>C 相电压</span>
                        <InputNumber
                          defaultValue={
                            conf.voltagePhaseDelay[conf.defs.lineMode3P4L][conf.defs.phaseSeqPositive][conf.defs.phaseCIndex]
                          }
                          min={0} max={360} step={0.1} 
                        />
                      </p>
                    </Card.Grid>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card title="三相四线 - 逆相序">
                    <Card.Grid style={gridStyle}>
                      <p>
                        <span style={spanStyle}>A 相电压</span>
                        <InputNumber
                          defaultValue={
                            conf.voltagePhaseDelay[conf.defs.lineMode3P4L][conf.defs.phaseSeqNegative][conf.defs.phaseAIndex]
                          }
                          min={0} max={360} step={0.1} 
                        />
                      </p>
                      <p>
                        <span style={spanStyle}>B 相电压</span>
                        <InputNumber
                          defaultValue={
                            conf.voltagePhaseDelay[conf.defs.lineMode3P4L][conf.defs.phaseSeqNegative][conf.defs.phaseBIndex]
                          }
                          min={0} max={360} step={0.1} 
                        />
                      </p>
                      <p>
                        <span style={spanStyle}>C 相电压</span>
                        <InputNumber
                          defaultValue={
                            conf.voltagePhaseDelay[conf.defs.lineMode3P4L][conf.defs.phaseSeqNegative][conf.defs.phaseCIndex]
                          }
                          min={0} max={360} step={0.1} 
                        />
                      </p>
                    </Card.Grid>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card title="三相三线 - 正相序">
                    <Card.Grid style={gridStyle}>
                      <p>
                        <span style={spanStyle}>A 相电压</span>
                        <InputNumber
                          defaultValue={
                            conf.voltagePhaseDelay[conf.defs.lineMode3P3L][conf.defs.phaseSeqPositive][conf.defs.phaseAIndex]
                          }
                          min={0} max={360} step={0.1} 
                        />
                      </p>
                      <p>
                        <span style={spanStyle}>B 相电压</span>
                        <InputNumber disabled/>
                      </p>
                      <p>
                        <span style={spanStyle}>C 相电压</span>
                        <InputNumber
                          defaultValue={
                            conf.voltagePhaseDelay[conf.defs.lineMode3P3L][conf.defs.phaseSeqPositive][conf.defs.phaseCIndex]
                          }
                          min={0} max={360} step={0.1} 
                        />
                      </p>
                    </Card.Grid>
                  </Card>
                </Col>
                <Col span={6}>
                  <Card title="三相三线 - 逆相序">
                    <Card.Grid style={gridStyle}>
                      <p>
                        <span style={spanStyle}>A 相电压</span>
                        <InputNumber
                          defaultValue={
                            conf.voltagePhaseDelay[conf.defs.lineMode3P3L][conf.defs.phaseSeqNegative][conf.defs.phaseAIndex]
                          }
                          min={0} max={360} step={0.1} 
                        />
                      </p>
                      <p>
                        <span style={spanStyle}>B 相电压</span>
                        <InputNumber disabled/>
                      </p>
                      <p>
                        <span style={spanStyle}>C 相电压</span>
                        <InputNumber
                          defaultValue={
                            conf.voltagePhaseDelay[conf.defs.lineMode3P3L][conf.defs.phaseSeqNegative][conf.defs.phaseCIndex]
                          }
                          min={0} max={360} step={0.1} 
                        />
                      </p>
                    </Card.Grid>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default Global;
