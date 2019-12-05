import React, { Component } from 'react'
import { Row, Col, Input, Button, Card, message } from 'antd'
import { connect } from 'dva'
import router from 'umi/router'


const spanStyle = {
  marginRight: '12px',
}

const gridStyle = {
  width: '25%',
};

@connect(({ compute }) => ({
  result: compute,
}))

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedData: {}
    };
  }

  back = () => {
    router.push('/')
  }

  roResult = () => {
    router.push('/result')
  }

  onSearch = (value) => {
    const { result } = this.props;
    const data = result.compute.resultDataList[value]

    if (data == undefined) {
      message.error('该行数据不存在');
      return false
    }

    this.setState({
      selectedData: data
    });
  }

  render() {
    return (
      <div>
        <Row justify="center">
          <Col offset={4} span={16}>
            <Input.Search size="large" placeholder='输入想要查看的数据的行数' type='number' onSearch={this.onSearch} enterButton />
          </Col>
          <Col offset={1} style={{ marginTop: 20, marginBottom: 20 }} span={22}>
            <Card title="查询结果">
              <Card headStyle={{backgroundColor: '#d6e4ff'}} type="inner" title="基础信息">
                <Card.Grid style={gridStyle}>
                  <p>
                    <span style={spanStyle}>所: </span>
                    <span>{this.state.selectedData.station}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>用户名称: </span>
                    <span>{this.state.selectedData.userName}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>用户类型: </span>
                    <span>{this.state.selectedData.userType}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>用户编号: </span>
                    <span>{this.state.selectedData.userID}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>线路名称: </span>
                    <span>{this.state.selectedData.lineName}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>数据日期: </span>
                    <span>{this.state.selectedData.dataDate}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>CT: </span>
                    <span>{this.state.selectedData.CT}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>PT: </span>
                    <span>{this.state.selectedData.PT}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>接线方式: </span>
                    <span>{this.state.selectedData.modeOfConnection}</span>
                  </p>
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                  <p>
                    <span style={spanStyle}>零序电流: </span>
                    <span>{this.state.selectedData.zeroSequenceCurrent}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>标定电流: </span>
                    <span>{this.state.selectedData.calibrationCurrent}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>三相电流: </span>
                    <span>{this.state.selectedData.phaseCurrent ? this.state.selectedData.phaseCurrent.join(', ') : ''}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>标定电压: </span>
                    <span>{this.state.selectedData.voltage}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>三相电压: </span>
                    <span>{this.state.selectedData.phaseVoltage ? this.state.selectedData.phaseVoltage.join(', ') : ''}</span>
                  </p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                  <p>
                    <span style={spanStyle}>总有功功率: </span>
                    <span>{this.state.selectedData.effectivePower}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>三相有功功率: </span>
                    <span>{this.state.selectedData.phaseEffectivePower ? this.state.selectedData.phaseEffectivePower.join(', ') : ''}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>总无功功率: </span>
                    <span>{this.state.selectedData.reactivePower}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>三相无功功率: </span>
                    <span>{this.state.selectedData.phaseReactivePower ? this.state.selectedData.phaseReactivePower.join(', ') : ''}</span>
                  </p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                  <p>
                    <span style={spanStyle}>综合倍率: </span>
                    <span>{this.state.selectedData.comprehensiveRatio}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>变压器容量: </span>
                    <span>{this.state.selectedData.transformerCapacity}</span>
                  </p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                </Card.Grid>
              </Card>
              <Card headStyle={{backgroundColor: '#ffccc7'}} style={{ marginTop: 16 }} type="inner" title="计算数据">
                <Card.Grid style={{width: '50%'}}>
                  <p>
                    <span style={spanStyle}>真实角度: </span>
                    <span>{this.state.selectedData.elementsRealAngle ? this.state.selectedData.elementsRealAngle.join(', ') : ''}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>基本角度: </span>
                    <span>{this.state.selectedData.elementsBasicAngle ? this.state.selectedData.elementsBasicAngle.join(', ') : ''}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>各元件电压滞后角度: </span>
                    <span>{this.state.selectedData.elementsVoltageLagAngle ? this.state.selectedData.elementsVoltageLagAngle.join(', ') : ''}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>各元件电流滞后角度: </span>
                    <span>{this.state.selectedData.elementsCurrentLagAngle ? this.state.selectedData.elementsCurrentLagAngle.join(', ') : ''}</span>
                  </p>
                  <p>
                    <span style={spanStyle}>电流二次线接入方式: </span>
                    <span>{this.state.selectedData.elementsAccessMethods ? this.state.selectedData.elementsAccessMethods.join(', ') : ''}</span>
                  </p>
                </Card.Grid>
                <Card.Grid style={{width: '50%'}}>
                  <p>
                    <span style={spanStyle}>计算结果: </span>
                    <span>{this.state.selectedData.info}</span>
                  </p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                </Card.Grid>
              </Card>
            </Card>
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col style={{textAlign: 'center'}} span={4}>
            <Button type="primary" size={'large'} onClick={this.back}>
              返回上页
            </Button>
          </Col>
          <Col style={{textAlign: 'center'}} span={4}>
            <Button type="primary" size={'large'} onClick={this.toResult}>
              数据展示
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Result;
