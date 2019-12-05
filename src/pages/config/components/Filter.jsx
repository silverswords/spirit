import React, { Component } from 'react'
import { connect } from 'dva'
import { Card, Checkbox } from 'antd'
import PreFilter from './PreFilter'
import styles from './filter.less'

@connect(({ filter }) => ({
  conf: filter,
}))
class Filter extends Component {
  state = {
    selectedFilter: 0,
  }

  componentDidMount() {
    const { conf } = this.props

    this.setState({
      selectedFilter: conf.pre.preFiltersSelected.indexOf(true)
    })
  }

  onCheckBoxChanged = (val) => {
    const { dispatch } = this.props

    dispatch({
      type: 'filter/filterChanged',
      payload: val,
    })
  }

  renderFilterContent = () => {
    return (
      <>
        <PreFilter filterType={this.state.selectedFilter} />
      </>
    )
  }

  onFilterTabListChanged = (key) => {
    this.setState({
      selectedFilter: key
    })
  }

  render() {
    const { conf } = this.props

    const checkBoxOptions = conf.pre.preFiltersSelected.map((selected, index) => {
      return {
        label: conf.defs.preFilterLabel(index),
        value: index,
      }
    })

    const checkBoxValues = conf.pre.preFiltersSelected.map((selected, index) => {
      if (selected == true) {
        return index
      }
    })

    const labels = conf.pre.preFiltersSelected.map((selected, index) => {
      return {
        key: index,
        tab: conf.defs.preFilterLabel(index),
        disabled: !selected,
      }
    })
  
    return (
      <div className={styles.filter_config}>
        <Card title='数据过滤条件设置'>
          <Card title='过滤器选择'>
            <Checkbox.Group
              options={checkBoxOptions}
              value={checkBoxValues}
              onChange={this.onCheckBoxChanged}
            />
          </Card>
          <Card title='过滤器参数设置'
            tabList={labels}
            activeTabKey={this.state.selectedFilter}
            onTabChange={this.onFilterTabListChanged}>
            { this.renderFilterContent() }
          </Card>
        </Card>
      </div>
    );
  }
}

export default Filter;
