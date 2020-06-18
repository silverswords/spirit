import React, { Component } from 'react';
import { Button, Icon, Col } from 'antd';
import XLSX from 'xlsx';
import { connect } from 'dva';
import { generateFinalData } from '@/utils/transform.js';

@connect(({ compute }) => ({
  result: compute,
}))
class JsonToExel extends Component {
  constructor(props) {
    super(props);
  }
  exportFile = () => {
    /* Generate Workbook */
    // let data = generateFinalData(this.props.result.compute.removeDataList)
    // let i = 0
    // do {
    //   let result = []
    //   if (i + 5000 >= data.length) {
    //     result = data.slice(i, data.length)
    //   }
    //   result = data.slice(i, i + 5000)

    //   let dataHeader = Object.keys(result[0])
    //   let wb = XLSX.utils.book_new();
    //   let ws = XLSX.utils.json_to_sheet(result, { header: [...dataHeader] });
    //   XLSX.utils.book_append_sheet(wb, ws, "data");

    //   /* Trigger Download with `writeFile` */
    //   XLSX.writeFile(wb, `finalData_${i}.xlsx`);

    //   i += 5000
    // } while (i < data.length)

    let postDate = generateFinalData(this.props.result.compute.postremovdList);

    let dataHeader = Object.keys(postDate[0]);
    let postRmwb = XLSX.utils.book_new();
    let postRmws = XLSX.utils.json_to_sheet(postDate, { header: [...dataHeader] });
    XLSX.utils.book_append_sheet(postRmwb, postRmws, 'data');

    /* Trigger Download with `writeFile` */
    XLSX.writeFile(postRmwb, `postRemove.xlsx`);
  };

  render() {
    return (
      <div>
        <Col span={12}>
          <Button onClick={this.exportFile}>
            <Icon type="upload" /> 导出数据文件
          </Button>
        </Col>
        <Col span={12}></Col>
      </div>
    );
  }
}

export default JsonToExel;
