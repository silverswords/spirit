import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import styles from './map.less'

@connect(({ filter }) => ({
  conf: filter,
}))
class Map extends Component {
	lockMainMap = (map) => {
		const bounds = map.getBounds()

		map.setLimitBounds(bounds)
	}

	showLandscape = (map) => {
		const { AMap } = window

		const opts = {
			subdistrict: 0,
			extensions: 'all',
			level: 'district',
		}
		const district = new AMap.DistrictSearch(opts)

		district.setLevel('city') // province, city, distinct
		district.search('保定', function(status, result) {
			let polygons = []
			const bounds = result.districtList[0].boundaries
			if (bounds) {
				for (var i = 0, l = bounds.length; i < l; i++) {
					const polygon = new AMap.Polygon({
						bubble: true,
						strokeWeight: 1,
						path: bounds[i],
						fillOpacity: 0.12,
						fillColor: 'transparent',//'#80d8ff',
						strokeColor: '#0091ea',
					})
					polygons.push(polygon)
				}
			}
			map.add(polygons)
		})
	}

	setupMapOnClick = (mmap, callback) => {
		mmap.on('click', callback)
	}

  componentDidMount() {
		const { AMap } = window

    let mmap = new AMap.Map('mmap', {
			resizeEnable: true,
			zoomEnable: false,
			dragEnable: false,
      zoom: 8,
			center: [114.998400,39.100311],
			mapStyle: 'amap://styles/whitesmoke',
		})
		
		let smap = new AMap.Map('smap', {
      resizeEnable: true,
      zoom: 9,
      center: [116.397428, 39.90923],
			mapStyle: 'amap://styles/light',
		})
		
		this.lockMainMap(mmap)
		this.showLandscape(mmap)
		this.setupMapOnClick(mmap, (e) => {
			console.log(`Main - Click: (${e.lnglat.getLng()}, ${e.lnglat.getLat()})`)
		})
  }

  render() {
    return (
      <div className={styles.map_container}>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <div ref='mmap' id='mmap' className={styles.map}></div>
          </Col>
					<Col span={12}>
            <div ref='smap' id='smap' className={styles.map}></div>
          </Col>
					<Col span={24}>
						<Card title='结果详细数据'>

						</Card>
					</Col>
        </Row>
      </div>
    );
  }
}

export default Map;
