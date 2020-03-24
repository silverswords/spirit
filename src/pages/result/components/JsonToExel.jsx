import React, { Component } from 'react';
import { Button, Icon, Col } from 'antd';
import XLSX from 'xlsx';
import { connect } from 'dva';
import { generateFinalData } from '@/utils/transform.js'


@connect(({ compute }) => ({
  result: compute,
}))
class JsonToExel extends Component {
  constructor(props) {
    super(props);
  }
  exportFile = () => {
    /* Generate Workbook */
    let result = generateFinalData(this.props.result.compute.resultDataList)
    let dataHeader = Object.keys(result[0])
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(result, { header: [...dataHeader] });
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
