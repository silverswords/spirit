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
            break;
          }
        }
        message.success('上传成功！');
      } catch (e) {
        message.error('文件类型不正确！');
      }
      for(let i = 0; i < data.length; i++) {
        conf.filters.dataList[0]['station'] = data[i]['所'],
        conf.filters.dataList[0]['userType'] = data[i]['用户类型'],
        conf.filters.dataList[0]['userID'] = data[i]['用户编号'] * 1,
        conf.filters.dataList[0]['userName'] = data[i]['用户名称'],
        conf.filters.dataList[0]['meteredAssetNumber'] = data[i]['表计资产号'],
        conf.filters.dataList[0]['dataDate'] = new Date(data[i]['数据日期']),
        conf.filters.dataList[0]['CT'] = data[i]['CT'] * 1,
        conf.filters.dataList[0]['PT'] = data[i]['PT'] * 1,
        conf.filters.dataList[0]['phaseVoltage'] = [data[i]['A相电压'] * 1, data[i]['B相电压'] * 1, data[i]['C相电压'] * 1]
        conf.filters.dataList[0]['phaseCurrent'] = [data[i]['A相电流'] * 1, data[i]['B相电流'] * 1, data[i]['C相电流'] * 1]
        conf.filters.dataList[0]['zeroSequenceCurrent'] = data[i]['零序电流'] * 1,
        conf.filters.dataList[0]['effectivePower'] = data[i]['有功功率'] * 1,
        conf.filters.dataList[0]['phaseEffectivePower'] = [data[i]['A相有功功率'] * 1, data[i]['B相有功功率'] * 1, data[i]['C相有功功率'] * 1]
        conf.filters.dataList[0]['reactivePower'] = data[i]['无功功率'] * 1,
        conf.filters.dataList[0]['phaseReactivePower'] = [data[i]['A相无功功率'] * 1, data[i]['B相无功功率'] * 1, data[i]['C相无功功率'] * 1]
        conf.filters.dataList.push(conf.filters.dataList[0])
      }
      console.log(conf.filters.dataList, "conf")
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
