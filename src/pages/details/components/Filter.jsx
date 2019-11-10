import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import styles from './filter.less';

@connect(({ filter }) => ({
  conf: filter,
}))
class Filter extends Component {
  state = {
    selectedFilter: 0,
  };

  componentDidMount() {
    const { conf } = this.props;

    this.setState({
      selectedFilter: conf.pre.preFiltersSelected.indexOf(true),
    });
  }

  render() {
    return (
      <div className={styles.filter_config}>
        <Card title="数据过滤条件设置">
          <Card.Grid>
            <Card
              title="过滤器参数设置"
              // tabList={labels}
              activeTabKey={this.state.selectedFilter}
              // onTabChange={this.onFilterTabListChanged}
            >
              {/* {this.renderFilterContent()} */}
            </Card>
          </Card.Grid>
        </Card>
      </div>
    );
  }
}

export default Filter;
