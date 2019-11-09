import React, { Component } from 'react'
import { connect } from 'dva'
import { Card, InputNumber } from 'antd'
import styles from './prefilter.less'

const titles = [
  '有功功率、无功功率小于给定值时，过滤该条数据',
  '负荷正常参数配置',
  '相序异常参数配置',
  '电压失压参数配置',
  '电压不平衡参数配置',
  '电流不平衡参数配置',
]

@connect(({ filter }) => ({
  conf: filter,
}))
class PreFilter extends Component {
  renderPowerCheck = () => {
    const { conf } = this.props

    return (
      <>
        <p>
          <span>有功功率 &le;</span>
          <InputNumber
            value={conf.pre.params[conf.defs.prePowerCheck][0]}
            min={0} max={1.0} step={0.01} 
          />
        </p>
        <p>
          <span>无功功率 &le;</span>
          <InputNumber
            value={conf.pre.params[conf.defs.prePowerCheck][1]}
            min={0} max={1.0} step={0.01} 
          />
        </p>
      </>
    )
  }

  renderLoadCheck = () => {
    const { conf } = this.props

    return (
      <>
        <p>
          <span>每一相电流 &gt; 运行容量的</span>
          <InputNumber
            value={ conf.pre.params[conf.defs.preLoadCheck][0] }
            min={0}
            max={100}
            formatter={value => `${value}%`}
            parser={value => value.replace('%', '')}
          />
        </p>
      </>
    )
  }

  renderPreFilter = (type) => {
    const { conf } = this.props

    if (type == conf.defs.prePowerCheck)
      return this.renderPowerCheck()

    if (type == conf.defs.preLoadCheck)
      return this.renderLoadCheck()
    
    if (type == conf.defs.prePhaseSeqCheck)
      return this.renderLoadCheck()
    
    if (type == conf.defs.preUnderVoltageCheck)
      return this.renderLoadCheck()

    if (type == conf.defs.preVoltageBalanceCheck)
      return this.renderLoadCheck()
      
    if (type == conf.defs.preCurrentBalanceCheck)
      return this.renderLoadCheck()
      
    return (
      <>
        <p>未定义过滤器参数</p>
      </>
    )
  }

  render() {
    const type = this.props.filterType

    return (
      <div className={styles.prefilter}>
        <Card title={titles[type]}>
          <Card.Grid>
            {
              this.renderPreFilter(type)
            }
          </Card.Grid>
        </Card>
      </div>
    );
  }
}

export default PreFilter;
