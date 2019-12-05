import React, { Component } from 'react';
import { Upload, Button, Icon, message, Col, Card } from 'antd';
import XLSX from 'xlsx';
import { connect } from 'dva';
import router from 'umi/router';

import styles from './result.less';
import transformDataListKeys from '@/utils/transform.js';
import preFilter from '@/utils/preFilter'
import postFilter from '@/utils/postFilter'
import compose from '@/utils/compute'

@connect(({ filter, configuration }) => ({
  conf: filter,  globalConf: configuration
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
        const workbook = XLSX.read(result, { type: 'binary', cellDates: true });
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {raw: false}));
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
        const workbook = XLSX.read(result, { type: 'binary', cellDates:true, cellNF: false, cellText: false, dateNF: "YYYY-MM-DD HH:MM:SS" });
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
    const { dispatch, conf, globalConf } = this.props;
    let basicDataList = this.state.basicDataList;
    let sg186DataList = this.state.sg186DataList;
    let resultList = [];
    let removedList = [];
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

    for (let i = 0; i < mergeDataList.length; i++) {
      let result = {}
      
      let data = transformDataListKeys(mergeDataList[i]);
      preFilter(data, conf)
      compose.computeTotal(data, globalConf.global)
      postFilter(data, conf)
      
      result = {...data}
      resultList.push(result)
    }

    let listData = { resultList, removedList }
    dispatch({
      type: 'compute/computeResultDataChanged',
      payload: {
        value: listData
      },
    });

    router.push('/computeResult');
  };

  back = () => {
    router.push('/');
  };

  render() {
    return (
      <div className={styles.main}>
        <Col span={24}>
          <Card title="上传文件">
            <Col span={12}>
              <Upload accept=".xlsx, .xls" transformFile={this.basicTransformFile}>
                <Button>
                  <Icon type="upload" /> 运行数据文件
                </Button>
              </Upload>
            </Col>
            <Col span={12}>
              <Upload accept=".xlsx, .xls" transformFile={this.sg186TransformFile}>
                <Button>
                  <Icon type="upload" /> SG186数据文件
                </Button>
              </Upload>
            </Col>
          </Card>
        </Col>
        <Col span={2}>
          <Button type="primary" size="large" onClick={this.onMerge}>
            计算结果
          </Button>
        </Col>
        <Col span={20}>
          <Button type="primary" size="large" onClick={this.back}>
            返回
          </Button>
        </Col>
      </div>
    );
  }
}

export default Result;
