import React, { Component } from 'react'
import { connect } from 'dva'
import { Card, Table, Input, Button, Icon } from 'antd'
import Highlighter from 'react-highlight-words';

import JsonToExel from './JsonToExel'

@connect(({ result }) => ({
  conf: result,
}))
class ResultTable extends Component {
  state = {
    tmpNodes: this.props.conf.model,
    searchText: ''
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleChange = (filters, extra) => {
    const { dispatch } = this.props
    let flitersRule = {
      name: extra.name || [],
      result: extra.result || []
    }

    dispatch({
      type: 'result/filterChanged',
      payload: flitersRule,
    })
  }

  render() {
    const colunms =  [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index'
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name')
      },
      {
        title: '坐标',
        dataIndex: 'coordinate',
        key: 'coordinate'
      },
      {
        title: '结果',
        dataIndex: 'result',
        key: 'result',
        filters: [
          {text: '正确', value: '正确'},
          {text: '错误一', value: '错误一'},
          {text: '错误二', value: '错误二'},
          {text: '错误三', value: '错误三'},
          {text: '错误四', value: '错误四'},
          {text: '错误五', value: '错误五'}
        ],
        onFilter: (value, record) => record.result === value,
      }
    ]

    return (
      <Card title='结果详细数据' extra={<JsonToExel />}>
        <Table
          dataSource={this.state.tmpNodes}
          columns={colunms}
          onChange={this.handleChange}
        />
      </Card>
    );
  }
}

export default ResultTable;
