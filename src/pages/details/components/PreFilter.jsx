import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';
import styles from './prefilter.less';

const spanStyle = {
  marginRight: '12px',
};

const titles = [
  '有功功率、无功功率小于给定值时，过滤该条数据',
  '负荷正常参数配置',
  '相序异常参数配置',
  '电压失压参数配置',
  '电压不平衡参数配置',
  '电流不平衡参数配置',
];

@connect(({ filter }) => ({
  conf: filter,
}))
class PreFilter extends Component {
  renderPowerCheck = () => {
    const { conf } = this.props;

    return (
      <>
        <p>
          <span>有功功率 &nbsp;&nbsp;&nbsp;&nbsp;&le;</span>
          <span style={spanStyle}>{conf.pre.params[conf.defs.prePowerCheck][0]}.00</span>
        </p>
        <p>
          <span>无功功率 &nbsp;&nbsp;&nbsp;&nbsp;&le;</span>
          <span style={spanStyle}>{conf.pre.params[conf.defs.prePowerCheck][1]}.00</span>
        </p>
      </>
    );
  };

  renderLoadCheck = () => {
    const { conf } = this.props;

    return (
      <>
        <p>
          <span>每一相电流 &gt; 运行容量的</span>
          <span style={spanStyle}>{conf.pre.params[conf.defs.preLoadCheck][0]}%</span>
        </p>
      </>
    );
  };

  renderPhaseSeqCheck = () => {
    const { conf } = this.props;

    return (
      <>
        <p>
          <span>三相有功功率值之和与总有功功率值的差值 &gt; 总有功功率值的</span>
          <span style={spanStyle}>{conf.pre.params[conf.defs.prePhaseSeqCheck][0]}%</span>
        </p>
      </>
    );
  };

  renderUnderVoltageCheck = () => {
    const { conf } = this.props;

    return (
      <>
        <Row gutter={12}>
          <Col span={8}>
            <Card title="高供高计三相三线100V">
              <p>
                <span>一元件、三元件电压 &nbsp;&nbsp;&nbsp;&nbsp;&le;</span>
                <span style={spanStyle}>{conf.pre.params[conf.defs.preUnderVoltageCheck][0]}V</span>
              </p>
              <p>
                <span>一元件、三元件相电压和 &nbsp;&nbsp;&nbsp;&nbsp;&le;</span>
                <span style={spanStyle}>{conf.pre.params[conf.defs.preUnderVoltageCheck][1]}V</span>
              </p>
              <p>&nbsp;</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="高供低计">
              <p>
                <span>一元件电压 &nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                <span style={spanStyle}>{conf.pre.params[conf.defs.preUnderVoltageCheck][2]}V</span>
              </p>
              <p>
                <span>二元件电压 &nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                <span style={spanStyle}>{conf.pre.params[conf.defs.preUnderVoltageCheck][3]}V</span>
              </p>
              <p>
                <span>三元件电压 &nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                <span style={spanStyle}>{conf.pre.params[conf.defs.preUnderVoltageCheck][4]}V</span>
              </p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="高供高计且三相四线额定电压57.7V">
              <p>
                <span>电压 &nbsp;&nbsp;&nbsp;&nbsp;&le;</span>
                <span style={spanStyle}>{conf.pre.params[conf.defs.preUnderVoltageCheck][5]}%</span>
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
    const { conf } = this.props;

    return (
      <>
        <p>
          <span>（最大电压－最小电压）/ 最大电压 &nbsp;&nbsp;&nbsp;&nbsp;&gt;</span>
          <span style={spanStyle}>{conf.pre.params[conf.defs.preVoltageBalanceCheck][0]}%</span>
        </p>
      </>
    );
  };

  renderCurrentBalanceCheck = () => {
    const { conf } = this.props;

    return (
      <>
        <p>
          <span>（最大电流－最小电流）/ 最大电流 &nbsp;&nbsp;&nbsp;&nbsp;&gt;</span>
          <span style={spanStyle}>{conf.pre.params[conf.defs.preCurrentBalanceCheck][0]}%</span>
        </p>
      </>
    );
  };

  renderPreFilter = type => {
    const { conf } = this.props;

    if (type === conf.defs.prePowerCheck) return this.renderPowerCheck();

    if (type === conf.defs.preLoadCheck) return this.renderLoadCheck();

    if (type === conf.defs.prePhaseSeqCheck) return this.renderPhaseSeqCheck();

    if (type === conf.defs.preUnderVoltageCheck) return this.renderUnderVoltageCheck();

    if (type === conf.defs.preVoltageBalanceCheck) return this.renderVoltageBalanceCheck();

    if (type === conf.defs.preCurrentBalanceCheck) return this.renderCurrentBalanceCheck();

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
        <Card title={titles[type]}>{this.renderPreFilter(type)}</Card>
      </div>
    );
  }
}

export default PreFilter;
