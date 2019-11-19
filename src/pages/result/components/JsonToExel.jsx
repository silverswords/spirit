import React, { Component } from 'react';
import { Upload, Button, Icon, message, Col } from 'antd';
import XLSX from 'xlsx';

class JsonToExel extends Component {
  exportFile = () => {
    /* Generate Workbook */
    console.log("here")
    let data = []
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(data, { header: ['Name', 'Location'] });
    XLSX.utils.book_append_sheet(wb, ws, "data");

    /* Trigger Download with `writeFile` */
    XLSX.writeFile(wb, "data.xlsx");
  }

  render() {
    return (
      <div>
        <Col span={12}>
          <Button onClick={this.exportFile}>
            <Icon type="upload" /> 导出数据文件
          </Button>
        </Col>
        <Col span={12}>
        </Col>
      </div>
    );
  }
}

export default JsonToExel;
