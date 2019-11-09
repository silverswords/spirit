import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Card, Button } from 'antd'
import router from 'umi/router'

import styles from './map.less'

@connect(({ filter }) => ({
  conf: filter,
}))
class Map extends Component {
  back = () => {
    router.push('/')
  }

	lockMainMap = (map) => {
		const bounds = map.getBounds()

		map.setLimitBounds(bounds)
  }

  MainLandscapeGenerator = () => {
    let disProvince

    return (map) => {
      const { AMap } = window
      const adCode = 130600
      const depth = 2
  
      disProvince && disProvince.setMap(null);
      disProvince = new AMap.DistrictLayer.Province({
        zIndex: 12,
        adcode: [adCode],
        depth: depth,
        styles: {
          'fill': 'rgba(255,255,255,0.5)',
          'province-stroke': 'cornflowerblue',
          'city-stroke': '#80d8ff', // 中国地级市边界
          'county-stroke': '#80d8ff' // 中国区县边界
        }
      })
  
      disProvince.setMap(map)
    }
  }

  showMainLandscape = this.MainLandscapeGenerator()
  
  secondLandscapeGenerator = () => {
    let polygons = []

    return (map, search) => {
      const { AMap } = window
  
      const opts = {
        subdistrict: 0,
        extensions: 'all',
        level: 'district',
      }
      const district = new AMap.DistrictSearch(opts)
  
      district.setLevel('distinct') // province, city, distinct
      district.search(search, function(status, result) {
        map.remove(polygons)
        polygons = []

        const bounds = result.districtList[0].boundaries
        if (bounds) {
          for (let i = 0, l = bounds.length; i < l; i++) {
            const polygon = new AMap.Polygon({
              bubble: true,
              strokeWeight: 1,
              path: bounds[i],
              fillOpacity: 0.2,
              fillColor: '#80d8ff', //'#80d8ff',
              strokeColor: '#0091ea',
            })
            polygons.push(polygon)
          }
        }
        map.add(polygons)
      })
    }
  }

  showSecondLandscape = this.secondLandscapeGenerator()

	setupMapOnClick = (map, callback) => {
    map.on('click', callback)
  }

  setupMapMoveend = (map, callback) => {
    map.on('moveend', callback)
  }

  getMapinfo = (smap) => {
    smap.getCity((info) => {
      console.log(info)
      this.showSecondLandscape(smap, info.district)
    })
  }

  componentDidMount() {
		const { AMap } = window
    
    let mmap = new AMap.Map('mmap', {
      resizeEnable: true,
			zoomEnable: false,
			dragEnable: false,
      zoom: 8,
			center: [114.998400,39.100311],
			mapStyle: 'amap://styles/macaron',
		})
		
		let smap = new AMap.Map('smap', {
      resizeEnable: true,
      zoom: 10,
			mapStyle: 'amap://styles/macaron',
    })
		
		this.lockMainMap(mmap)
    this.showMainLandscape(mmap)
		this.setupMapOnClick(mmap, (e) => {
      smap.panTo([e.lnglat.getLng(), e.lnglat.getLat()])
    })
    this.setupMapMoveend(smap, (e) => {
      this.getMapinfo(smap)
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
						<Card title='结果详细数据'></Card>
            <Button type="primary" size={'large'} onClick={this.back}>
              返回
            </Button>
					</Col>
        </Row>
      </div>
    );
  }
}

export default Map;
