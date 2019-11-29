import React, { Component } from 'react';
import { Upload, Button, Icon, message, Col } from 'antd';
import XLSX from 'xlsx';
import { connect } from 'dva';
import styles from './exeltojson.less';

@connect(({ filter }) => ({
  conf: filter,
}))
class ExelToJson extends Component {
  basicTransformFile = file => {
    const { conf, dispatch } = this.props;
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

      let basicDataListKeys = Object.keys(conf.filters.basicKeys); // 英文 keys 数组
      let basicDataKeys = conf.filters.basicKeys; // 中文 keys
      let basicDataList = [];
      for (let i = 0; i < data.length; i++) {
        basicDataList[i] = {};
        for (let j = 0; j < basicDataListKeys.length; j++) {
          if (basicDataKeys[basicDataListKeys[j]] instanceof Array) {
            basicDataList[i][basicDataListKeys[j]] = [
              1 * data[i][basicDataKeys[basicDataListKeys[j]][0]],
              1 * data[i][basicDataKeys[basicDataListKeys[j]][1]],
              1 * data[i][basicDataKeys[basicDataListKeys[j]][2]],
            ];
          } else {
            if (
              basicDataListKeys[j] === 'zeroSequenceCurrent' ||
              basicDataListKeys[j] === 'effectivePower' ||
              basicDataListKeys[j] === 'reactivePower'
            ) {
              basicDataList[i][basicDataListKeys[j]] =
                1 * data[i][basicDataKeys[basicDataListKeys[j]]];
            } else {
              basicDataList[i][basicDataListKeys[j]] = data[i][basicDataKeys[basicDataListKeys[j]]];
            }
          }
        }
      }
      dispatch({
        type: 'filter/filterBasicDataChanged',
        payload: {
          value: basicDataList,
        },
      });
    };
  };

  sg186TransformFile = file => {
    const { conf, dispatch } = this.props;
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

      let sg186DataListKeys = Object.keys(conf.filters.sg186Keys); // 英文 keys 数组
      let dataKeys = conf.filters.sg186Keys; // 中文 keys
      let sg186DataList = [];
      for (let i = 0; i < data.length; i++) {
        sg186DataList[i] = {};
        // make data keys from Chinese to English
        for (let j = 0; j < sg186DataListKeys.length; j++) {
          sg186DataList[i][sg186DataListKeys[j]] = data[i][dataKeys[sg186DataListKeys[j]]];
        }
      }
      dispatch({
        type: 'filter/filterSG186DataChanged',
        payload: {
          value: sg186DataList,
        },
      });
    };
  };

  render() {
    return (
      <div className={styles.main}>
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
      </div>
    );
  }
}

export default ExelToJson;
