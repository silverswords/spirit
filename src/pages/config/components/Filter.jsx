import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Checkbox } from 'antd';
import styles from './filter.less';

@connect(({ filter }) => ({
  conf: filter,
}))
class Filter extends Component {
  onCheckBoxChanged = (val) => {
    const { dispatch } = this.props

    dispatch({
      type: 'filter/filterChanged',
      payload: val,
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
          <Card.Grid>
            <Card title='过滤器选择'>
              <Card.Grid>
                <Checkbox.Group
                  options={checkBoxOptions}
                  value={checkBoxValues}
                  onChange={this.onCheckBoxChanged}
                />
              </Card.Grid>
            </Card>
          </Card.Grid>
          <Card.Grid>
            <Card title='过滤器参数设置'
              tabList={labels}>
            </Card>
          </Card.Grid>
        </Card>
      </div>
    );
  }
}

export default Filter;
