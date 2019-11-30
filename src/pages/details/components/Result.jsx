import React, { Component } from 'react';
import { Upload, Button, Icon, message, Col } from 'antd';
import XLSX from 'xlsx';
import { connect } from 'dva';
import styles from './result.less';
import transformDataListKeys from '@/utils/transform.js';

@connect(({ filter }) => ({
  conf: filter,
}))
class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basicDataList: [],
      sg186DataList: [],
    };
  }

  basicTransformFile = file => {
    let data = [];
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = event => {
      try {
        const { result } = event.target;
        const workbook = XLSX.read(result, { type: 'binary' });
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          }
        }
        message.success('上传成功！');
      } catch (e) {
        message.error('文件类型不正确！');
      }
      this.setState({
        basicDataList: data,
      });
    };
  };

  sg186TransformFile = file => {
    let data = [];
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = event => {
      try {
        const { result } = event.target;
        const workbook = XLSX.read(result, { type: 'binary' });
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          }
        }
        message.success('上传成功！');
      } catch (e) {
        message.error('文件类型不正确！');
      }
      this.setState({
        sg186DataList: data,
      });
    };
  };

  onMerge = () => {
    const { dispatch } = this.props;
    let basicDataList = this.state.basicDataList;
    let sg186DataList = this.state.sg186DataList;
    let transformDataList = [];
    let mergeDataList = [];
    for (let i = 0; i < basicDataList.length; i++) {
      for (let j = 0; j < sg186DataList.length; j++) {
        if (basicDataList[i]['用户编号'] === sg186DataList[j]['用户编号']) {
          mergeDataList.push({
            ...basicDataList[i],
            ...sg186DataList[j],
          });
        }
      }
    }

    console.log(mergeDataList, 'data');
    let data
    for (let i = 0; i < mergeDataList.length; i++) {
      // 转换操作 , mergeDataList[i] 访问到第 i 条数据，
      // 他的里面包括 “零序电流：2” 这样的键值对
      data = transformDataListKeys(mergeDataList[i]);
      console.log(data, 'transformData');
    }

    dispatch({
      type: 'filter/filterMergeDataChanged',
      payload: {
        value: mergeDataList,
      },
    });
  };

  render() {
    return (
      <div className={styles.main}>
        <Col span={8}>
          <Upload accept=".xlsx, .xls" transformFile={this.basicTransformFile}>
            <Button>
              <Icon type="upload" /> 运行数据文件
            </Button>
          </Upload>
        </Col>
        <Col span={8}>
          <Upload accept=".xlsx, .xls" transformFile={this.sg186TransformFile}>
            <Button>
              <Icon type="upload" /> SG186数据文件
            </Button>
          </Upload>
        </Col>
        <Col span={8}>
          <Button onClick={this.onMerge}>开始计算</Button>
        </Col>
      </div>
    );
  }
}

export default Result;
