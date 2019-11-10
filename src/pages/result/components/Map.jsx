import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Modal } from 'antd'
import router from 'umi/router'

import styles from './map.less'

@connect(({ result }) => ({
  conf: result,
}))
class Map extends Component {
  state = {
    selectedNode: {},
    markers: this.props.conf.result,
    visible: false
  }

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
      this.showSecondLandscape(smap, info.district)
    })
  }

  addMarkersToMain = (mmap, smap) => {
    const { AMap } = window

    const getInfoM = (e) => {
      for (let i = 0; i < this.state.markers.length; i ++) {
        if (e.target.B.extData.id === this.state.markers[i].index) {
          let iconAddress
          if (this.state.markers[i].result == '正确') {
            iconAddress = "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png"
          } else {
            iconAddress = "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png"
          }

          smap.clearMap()

          new AMap.Marker({
            map: smap,
            bubble: true,
            icon: new AMap.Icon({
              image: iconAddress,
              imageSize: new AMap.Size(15,18)
            }),
            position: this.state.markers[i].location,
          })

          break
        } else {
          smap.clearMap()
        }
      }
    }

    this.props.conf.result.forEach(function(marker) {
      let iconAddress
      if (marker.result == '正确') {
        iconAddress = "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png"
      } else {
        iconAddress = "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png"
      }

      const newMarker = new AMap.Marker({
        map: mmap,
        bubble: true,
        icon: new AMap.Icon({
          image: iconAddress,
          imageSize: new AMap.Size(15,18)
        }),
        position: marker.location,
        extData: {
          id: marker.index
        },
        clickable: true
      })

      newMarker.on('click', getInfoM)
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
    
    mmap.clearMap()
		
		let smap = new AMap.Map('smap', {
      resizeEnable: true,
      zoom: 10,
			mapStyle: 'amap://styles/macaron',
    })
    
    smap.clearMap()
    
		this.lockMainMap(mmap)
    this.showMainLandscape(mmap)
		this.setupMapOnClick(mmap, (e) => {
      smap.panTo([e.lnglat.getLng(), e.lnglat.getLat()])

    })
    this.setupMapMoveend(smap, (e) => {
      this.getMapinfo(smap)
    })
    this.addMarkersToMain(mmap, smap)
  }

  componentDidUpdate() {
    let mmap = new AMap.Map('mmap', {
      resizeEnable: true,
			zoomEnable: false,
			dragEnable: false,
      zoom: 8,
			center: [114.998400,39.100311],
			mapStyle: 'amap://styles/macaron',
    })
    
    mmap.clearMap()

    let smap = new AMap.Map('smap', {
      resizeEnable: true,
      zoom: 10,
			mapStyle: 'amap://styles/macaron',
    })
    
    smap.clearMap()

    this.showMainLandscape(mmap)
    this.setupMapOnClick(mmap, (e) => {
      smap.panTo([e.lnglat.getLng(), e.lnglat.getLat()])
    })
    this.setupMapMoveend(smap, (e) => {
      this.getMapinfo(smap)
    })
    this.addMarkersToMain(mmap, smap)
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
        </Row>
      </div>
    );
  }
}

export default Map;
