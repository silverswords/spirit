import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Card, InputNumber } from 'antd'
import styles from './postfilter.less'

const titles = [
  '电流角相位配置',
  '元件电流相等配置',
]

@connect(({ filter }) => ({
  conf: filter,
}))
class PostFilter extends Component {
  renderCurrentPhase = () => {
    const { conf } = this.props

    return (
      <>
        <p>
          <span>任意两个电流角 &nbsp;&nbsp;&lt;&nbsp;&nbsp;</span>
          <InputNumber
            value={ conf.post.params[conf.defs.postCurrentPhase][0] }
            min={0}
          />
          <span style={{marginLeft: '12px'}}>度</span>
        </p>
        <p> 或者 </p>
        <p>
          <span>任意两个电流角相差</span>
          <InputNumber
            value={ conf.post.params[conf.defs.postCurrentPhase][1] }
            min={0}
          />
          <span style={{marginLeft: '12px', marginRight: '12px'}}> - </span>
          <InputNumber
            value={ conf.post.params[conf.defs.postCurrentPhase][2] }
            min={0}
          />
          <span style={{marginLeft: '12px'}}>度</span>
        </p>
      </>
    )
  }

  renderPostFilter = (type) => {
    const { conf } = this.props

    if (type == conf.defs.postCurrentPhase)
      return this.renderCurrentPhase()

    return (
      <>
        <p>未定义过滤器参数</p>
      </>
    )
  }

  render() {
    const { conf } = this.props
    const type = this.props.filterType || conf.defs.postCurrentPhase

    return (
      <div className={styles.postfilter}>
        <Card title={titles[type]}>
          <Card.Grid>
            {
              this.renderPostFilter(type)
            }
          </Card.Grid>
        </Card>
      </div>
    );
  }
}

export default PostFilter;
