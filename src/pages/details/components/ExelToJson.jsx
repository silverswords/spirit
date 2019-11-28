import React, { Component } from 'react';
import { Upload, Button, Icon, message, Col } from 'antd';
import XLSX from 'xlsx';
import { connect } from 'dva';
import styles from './exeltojson.less';

@connect(({ filter }) => ({
  conf: filter,
}))

class ExelToJson extends Component {
  transformFile = file => {
    const { conf } = this.props;
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
            // break;
          }
        }
        message.success('上传成功！');
      } catch (e) {
        message.error('文件类型不正确！');
      }
      console.log(data, "data")
      for(let i = 0; i < data.length; i++) {
        let basicDataListKeys = Object.keys(conf.filters.basicKeys[0]) // 英文 keys 数组
        let dataKeys = conf.filters.basicKeys[0] // 中文 keys
        let basicDataList = conf.filters.basicDataList
        for(let j = 0; j < basicDataListKeys.length; j++) {
          if(dataKeys[basicDataListKeys[j]] instanceof Array) {
            basicDataList[0][basicDataListKeys[j]] = [1 * data[i][dataKeys[basicDataListKeys[j]][0]], 1 * data[i][dataKeys[basicDataListKeys[j]][1]], 1 * data[i][dataKeys[basicDataListKeys[j]][2]]]
          } else {
            basicDataList[0][basicDataListKeys[j]] = data[i][dataKeys[basicDataListKeys[j]]]
          }
        }
        conf.filters.basicDataList.push(basicDataList[0])
      }
      console.log(conf.filters.basicDataList, "basicDataList")
      for(let i = 0; i < data.length; i++) {
        let sg186DataListKeys = Object.keys(conf.filters.sg186Keys[0]) // 英文 keys 数组
        let dataKeys = conf.filters.sg186Keys[0] // 中文 keys
        let sg186DataList = conf.filters.sg186DataList
        for(let j = 0; j < sg186DataListKeys.length; j++) {
          sg186DataList[0][sg186DataListKeys[j]] = data[i][dataKeys[sg186DataListKeys[j]]]
        }
        conf.filters.sg186DataList.push(sg186DataList[0])
      }
      console.log(conf.filters.sg186DataList, "sg186DataList")
    };
  };

  render() {
    return (
      <div className={styles.main}>
        <Col span={12}>
          <Upload accept='.xlsx, .xls' transformFile={this.transformFile}>
            <Button>
              <Icon type="upload" /> 运行数据文件
            </Button>
          </Upload>
        </Col>
        <Col span={12}>
          <Upload accept='.xlsx, .xls' transformFile={this.transformFile}>
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
