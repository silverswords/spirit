import React, { Component } from 'react';
import { Upload, Button, Icon, message, Col } from 'antd';
import XLSX from 'xlsx';
import styles from './exeltojson.less';

const props = {
  accept: '.xlsx, .xls',
  transformFile(file) {
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
        console.log(data, 'data');
      } catch (e) {
        message.error('文件类型不正确！');
      }
    };
  },
};

class ExelToJson extends Component {
  render() {
    return (
      <div className={styles.main}>
        <Col span={12}>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 运行数据文件
            </Button>
          </Upload>
        </Col>
        <Col span={12}>
          <Upload {...props}>
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
