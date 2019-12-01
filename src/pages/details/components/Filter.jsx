import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PreFilter from './PreFilter';
import styles from './filter.less';

const { Meta } = Card;

@connect(({ filter }) => ({
  conf: filter,
}))
class Filter extends Component {
  renderPowerCheck = () => {
    const { conf } = this.props;
    if (conf.pre.preFiltersSelected[0] === true) return (
      <>
        <Card bordered={false}>
          <Meta title={conf.defs.preFilterLabel(0)} style={{ marginBottom: 16 }} />
          <PreFilter filterType={0} />
        </Card>
      </>
    )
  }

  renderLoadCheck = () => {
    const { conf } = this.props;
    if (conf.pre.preFiltersSelected[1] === true) return (
      <>
        <Card bordered={false}>
          <Meta title={conf.defs.preFilterLabel(1)} style={{ marginBottom: 16 }} />
          <PreFilter filterType={1} />
        </Card>
      </>
    )
  }

  renderPhaseSeqCheck = () => {
    const { conf } = this.props;
    if (conf.pre.preFiltersSelected[2] === true) return (
      <>
        <Card bordered={false}>
          <Meta title={conf.defs.preFilterLabel(2)} style={{ marginBottom: 16 }} />
          <PreFilter filterType={2} />
        </Card>
      </>
    )
  }

  renderUnderVoltageCheck = () => {
    const { conf } = this.props;
    if (conf.pre.preFiltersSelected[3] === true) return (
      <>
        <Card bordered={false}>
          <Meta title={conf.defs.preFilterLabel(3)} style={{ marginBottom: 16 }} />
          <PreFilter filterType={3} />
        </Card>
      </>
    )
  }

  renderVoltageBalanceCheck = () => {
    const { conf } = this.props;
    if (conf.pre.preFiltersSelected[4] === true) return (
      <>
        <Card bordered={false}>
          <Meta title={conf.defs.preFilterLabel(4)} style={{ marginBottom: 16 }} />
          <PreFilter filterType={4} />
        </Card>
      </>
    )
  }

  renderCurrentBalanceCheck = () => {
    const { conf } = this.props;
    if (conf.pre.preFiltersSelected[5] === true) return (
      <>
        <Card bordered={false}>
          <Meta title={conf.defs.preFilterLabel(5)} style={{ marginBottom: 16 }} />
          <PreFilter filterType={5} />
        </Card>
      </>
    )
  }

  renderLoadStableCheck = () => {
    const { conf } = this.props;
    if (conf.pre.preFiltersSelected[6] === true) return (
      <>
        <Card bordered={false}>
          <Meta title={conf.defs.preFilterLabel(6)} style={{ marginBottom: 16 }} />
          <PreFilter filterType={6} />
        </Card>
      </>
    )
  }

  render() {
    const { conf } = this.props;
    let selected = conf.pre.preFiltersSelected;
    if (selected[0] || selected[1] || selected[2] || selected[3] 
      || selected[4] || selected[5] || selected[6] === true) return (
      <div className={styles.filter_config}>
        <Card title="过滤器参数">
          {this.renderPowerCheck()}
          {this.renderLoadCheck()}
          {this.renderPhaseSeqCheck()}
          {this.renderUnderVoltageCheck()}
          {this.renderVoltageBalanceCheck()}
          {this.renderCurrentBalanceCheck()}
          {this.renderLoadStableCheck()}
        </Card>
      </div>
    );

    return (
      <div>
        <Card title="过滤器参数">
          <p>未定义过滤器参数</p>
        </Card>
      </div>
    );
  }
}

export default Filter;
