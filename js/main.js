Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYzU3ZGJlZC0wMjc2LTQxNzgtYTZkMS1jMTg1NGM1ZGM2ZDQiLCJpZCI6MTI2MTEsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzIzNDA5NjF9.6DiCeUrrG57Z3ok8wOpt6VpP8y9nq_VKxkF1jDMFe9M'

var viewer = new Cesium.Viewer('cesiumContainer', {
    navigationHelpButton: false, // 是否显示右上角的帮助按钮
    infoBox: false, // 是否显示信息框,是否显示点击要素之后显示的信息
    homeButton: false, // 是否显示Home按钮
    selectionIndicator: false, // 是否显示选取指示器组件
    sceneModePicker: false, // 是否显示3D/2D选择器
    baseLayerPicker: false, // 是否显示图层选择器
    fullscreenButton: false, // 是否显示全屏按钮
    geocoder: false, // 是否显示geocoder小器件，右上角查询按钮
    shouldAnimate: true,
    sceneMode: Cesium.SceneMode.SCENE3D,
    // selectedTerrainProviderViewModel: terrainModels[1]//初始化地形图层的显示
    requestVertexNormals: true // 光照
})
 /* 去除大气层效果 */
viewer.scene.globe.showGroundAtmosphere = false
  // 更亮的星空
viewer.scene.highDynamicRange = false
/* 去除Cesium图标 */
viewer._cesiumWidget._creditContainer.style.display = 'none'

/* 隐藏timeline和animation */
viewer.timeline.container.style.visibility = 'hidden'
viewer.timeline.container.style.display = 'none'
viewer.animation.container.style.visibility = 'hidden'
viewer.animation.container.style.display = 'none'
/* 指南针插件 */
var optionsNavigation = {}
optionsNavigation.defaultResetView = Cesium.Cartographic.fromDegrees(113.517628, 23.353899, 200000) //缩放控件的初始位置
viewer.extend(Cesium.viewerCesiumNavigationMixin, optionsNavigation)

// Cartesian 方式确定位置
viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(113.517628, 23.353899, 2000000.0)
    // destination: Cesium.Cartesian3.fromDegrees(110.486138, 13.0, 3000000.0),
    // orientation: {
    //     heading: Cesium.Math.toRadians(30.0), // east, default value is 0.0 (north)
    //     pitch: Cesium.Math.toRadians(-65),    // default value (looking down)
    //     roll: 0.0                             // default value
    // }
})

/* 初始化图层 */
viewer.imageryLayers.removeAll()
// 天地图底图
var shadedReliefTianditu = new Cesium.WebMapTileServiceImageryProvider({
    url: "http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=93724b915d1898d946ca7dc7b765dda5",
    layer: "img",
    style: "default",
    format: "tiles",
    tileMatrixSetID: "w",
    show: false,
    maximumLevel: 18
})
viewer.imageryLayers.addImageryProvider(shadedReliefTianditu, 0)
/* 加载全球影像中文注记服务 */
let shadedReliefZhuji = new Cesium.WebMapTileServiceImageryProvider({
    url: 'http://t7.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=f50c5a9a2a952f5df773fbc0ff6c5aec',
    layer: 'tdtAnnoLayer',
    style: 'default',
    format: 'image/jpeg',
    tileMatrixSetID: 'GoogleMapsCompatible',
    show: false
})
viewer.imageryLayers.addImageryProvider(shadedReliefZhuji)
// var viewerTyMarble = viewer.imageryLayers.addImageryProvider(Cesium.createTileMapServiceImageryProvider({
//     // url: 'http://183.6.36.236:8184/ArcGIS_TMS/GD_TMS_S',
//     url: 'http://192.168.2.10:8184/ArcGIS_TMS/GD_TMS_S',
//     credit: '离线卫星地图',
// }), 0)

var scene = viewer.scene

/**
 * 鼠标双击事件清除跟随实体
 */
viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
// handler.setInputAction(function (movement) {
//     viewer.trackedEntity = undefined
// }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)

/**
 * 台风登陆警戒线
 * 24小时警戒线颜色： （1.0， 0.0， 0.0）
 * 48小时警戒线颜色： （1.0， 1.0， 0.0）
 */
//var yellowCordon = viewer.entities.add({
//  name: '48-hour cordon',
//  polyline: {
//      positions: Cesium.Cartesian3.fromDegreesArray([
//          131.981362, 33.959468,
//          131.981362, 14.967340,
//          119.950703, -0.035507,
//          104.998940, -0.035507
//      ]),
//      width: 3,
//      material: new Cesium.PolylineDashMaterialProperty({
//          color: Cesium.Color.fromCssColorString('#ffff00'),
//          dashLength: 30.0
//      })
//  }
//})
//viewer.scene.imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
//  url: './image/48cordon.png',
//  rectangle: Cesium.Rectangle.fromDegrees(131.5, 25.0, 132.5, 32.0)
//}))
//var redCordon = viewer.entities.add({
//  name: '24-hour cordon',
//  polyline: {
//      positions: Cesium.Cartesian3.fromDegreesArray([
//          126.993563, 34.005023,
//          126.993563, 21.971246,
//          118.995323, 17.965997,
//          118.995323, 10.971043,
//          113.018954, 4.486274,
//          104.998940, -0.035507
//      ]),
//      width: 3,
//      material: new Cesium.PolylineDashMaterialProperty({
//          color: Cesium.Color.fromCssColorString('#ff0000'),
//          dashLength: 15.0
//      })
//  }
//})
//viewer.scene.imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
//  url: './image/24cordon.png',
//  rectangle: Cesium.Rectangle.fromDegrees(126.5, 25.0, 127.5, 32.0)
//}))

/**
 * 鼠标单击事件
 */
handler.setInputAction(function (movement) {
    var pick = scene.pick(movement.position)
    var drillPick = scene.drillPick(movement.position)
    // 承灾体点位点击
    disasterBodyPointClick(pick, movement)
    // 弹出台风信息框
    typhoonPopup(drillPick, movement)
    // 风险区划&&脆弱性评价单击
    riskByMose(pick)
    // 揭阳图标单击
    JYClick(pick)
    // 近岸预报单击
    offshoreForecastPolygonClick(pick)
    // 承灾体线数据点击高亮
    DisasterBodyJsonClick(pick)
    //点击天气数据
    WeatherDataClick(pick,movement)

    // 海区预报点击
    seaTemperaturePick(pick)


    //航线信息点击
    shipLineClick(drillPick, movement)

}, Cesium.ScreenSpaceEventType.LEFT_CLICK)

/**
 * 鼠标悬停事件
 */
var labelDisaster
handler.setInputAction(function (movement) {
    var pick = scene.pick(movement.endPosition)
    // 承灾体悬停标签
    if (pick && pick.id && pick.id.billboardName) {
        disasterMouseMove(pick, movement)
    } else if (labelDisaster) {
        labelDisaster.label.show = false
    }
    // 近岸预报悬停
//  offshoreForecastMouseMove(pick)
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

/**
 * 设置图层选择器
 * @param imagery string
 */
function setImageryViewModels(imagery) {
    if (imagery === '电子地图') {
        var isAdd = true
        for (var i = 0; i < viewer.scene.imageryLayers.length; i++) {
            var shadedImagery = viewer.scene.imageryLayers.get(i)
            // if (shadedImagery.imageryProvider && shadedImagery.imageryProvider.credit && shadedImagery.imageryProvider.credit.html === '离线电子地图') {
            if (shadedImagery.imageryProvider && shadedImagery.imageryProvider._layer && shadedImagery.imageryProvider._layer === 'tdtVecBasicLayer') {
                isAdd = false
            }
        }
        if (isAdd) {
            var shadedRelief = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
                url: 'http://t0.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=124a73de483553862b2de0344a91bec1',
                layer: 'tdtVecBasicLayer',
                style: 'default',
                format: 'image/jpeg',
                tileMatrixSetID: 'GoogleMapsCompatible',
                show: false
            }), 1)

        }
    }
    if (imagery === '遥感地图') {
        removeImageryProviderByLayer('tdtVecBasicLayer')
    }
}


/**
 * 是否显示路网
 * @param isShow true:显示 false:不显示
 */
function isRoadNetwork(isShow) {
    var isAdd = true
    if (isShow) {
        for (var i = 0; i < viewer.scene.imageryLayers.length; i++) {
            var shadedImagery = viewer.scene.imageryLayers.get(i)
            if (shadedImagery.imageryProvider && shadedImagery.imageryProvider._layer && shadedImagery.imageryProvider._layer === 'tdtAnnoLayer') {
                isAdd = false
            }
        }
        if (isAdd) {
            viewer.imageryLayers.addImageryProvider(shadedReliefZhuji)
            removeImageryProviderByLayer('tdtAnnoLayerNoRoad')
        }
    } else {
        for (var i = 0; i < viewer.scene.imageryLayers.length; i++) {
            var shadedImagery = viewer.scene.imageryLayers.get(i)
            if (shadedImagery.imageryProvider && shadedImagery.imageryProvider._layer && shadedImagery.imageryProvider._layer === 'tdtAnnoLayerNoRoad') {
                isAdd = false
            }
        }
        if (isAdd) {
            let shadedReliefZhujiNoRode = new Cesium.WebMapTileServiceImageryProvider({
                url: 'http://t7.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=f50c5a9a2a952f5df773fbc0ff6c5aec',
                layer: 'tdtAnnoLayerNoRoad',
                style: 'default',
                format: 'tiles',
                tileMatrixSetID: 'GoogleMapsCompatible',
                show: false
            })
            viewer.imageryLayers.addImageryProvider(shadedReliefZhujiNoRode)
            removeImageryProviderByLayer('tdtAnnoLayer')
        }
    }
}

/**
 * 加载Geoserver切片图层
 * @param url
 * @param layer
 * @param tileMatrixSetID
 * @param format
 * @param style
 * @param alpha
 */
function addGeoserverProvider(url, layer, tileMatrixSetID, format, style, alpha) {
    var layers = viewer.scene.imageryLayers
    var porvider = new Cesium.WebMapTileServiceImageryProvider({
        url: url,
        layer: layer,
        tileMatrixSetID: tileMatrixSetID,
        format: format,
        style: style,
        tilingScheme: new Cesium.GeographicTilingScheme()
    })
    var addPorvider = layers.addImageryProvider(porvider)
    if (alpha) {
        addPorvider.alpha = alpha
    }
}

/**
 * 添加图标
 * @param id
 * @param name
 * @param billboardName
 * @param lon
 * @param lat
 * @param imgSrc
 * @param scale
 */
function addBillboard(id, name, billboardName, lon, lat, imgSrc, scale) {
    if (id && name && billboardName && lon && lat && imgSrc && scale) {
        viewer.entities.add({
            id: id,
            name: name,
            position: Cesium.Cartesian3.fromDegrees(lon, lat),
            billboard: {
                image: imgSrc,
                scale: scale
            },
            billboardName: billboardName
        })
    }
}

function addBillboardSeaArea(id, name, billboardName, lon, lat, imgSrc, scale,info) {
  if(name==="海区天气"){
	  	viewer.entities.add({
			id: id,
			name: name,
			position: Cesium.Cartesian3.fromDegrees(lon, lat),
			billboard: {
				image: imgSrc,
				scale: scale
			},
			properties: {
	        weatherPhenomena1:info.weatherPhenomena1,
		   	weatherPhenomena2:info.weatherPhenomena2,
		   	windSpeed1:info.windSpeed1,
		   	windDirection1:info.windDirection1,
		   	windDirection2:info.windDirection2,
		   	visibility1:info.visibility1,
		   	visibility2:info.visibility2
			},
			billboardName: billboardName
		})
  }else{
  	if(name==="城市天气"){
	  		viewer.entities.add({
			id: id,
			name: name,
			position: Cesium.Cartesian3.fromDegrees(lon, lat),
			billboard: {
				image: imgSrc,
				scale: scale
			},
			properties: {
	        maxTemp:info.maxTemp,
			minTemp:info.minTemp,
			weather:info.weather,
			releaseDay:info.releaseDay
			},
			billboardName: billboardName
		})
  	}else{
  		if(name==="港口天气"){
	  		viewer.entities.add({
			id: id,
			name: name,
			position: Cesium.Cartesian3.fromDegrees(lon, lat),
			billboard: {
				image: imgSrc,
				scale: scale
			},
			properties: {
	         dayText:info.dayText,
			 nightText:info.nightText,
			 high:info.high,
			 low: info.low,
			 dayWindScale:info.dayWindScale,
			 dayWindDirection:info.dayWindDirection,
			 nightWindDirection:info.nightWindDirection
			},
			billboardName: billboardName
		})
  	}else{
  		if(name==="船舶气象风险"){
  		  viewer.entities.add({
			id: id,
			name: name,
			position: Cesium.Cartesian3.fromDegrees(lon, lat),
			billboard: {
				image: imgSrc,
				scale: scale
			},
			properties: {
	         shipId:info.shipId,
			 shipName:info.shipName,
			 lon:info.lon,
			 lat: info.lat,
			 windPower:info.windPower,
			 direction:info.direction
			},
			billboardName: billboardName
		 })
  		}
  	}
  	}
  }

}

/**
 * 根据layer删除图层
 * @param layer
 */
function removeImageryProviderByLayer(layer) {
    for (var j = 0; j < viewer.scene.imageryLayers.length; j++) {
        var shadedImagery = viewer.scene.imageryLayers.get(j)
        if (shadedImagery.imageryProvider && shadedImagery.imageryProvider._layer && shadedImagery.imageryProvider._layer === layer) {
            viewer.scene.imageryLayers.remove(shadedImagery)
            j--
        }
    }
}

/**
 * 根据BillboardName删除图标
 * @param billboardName
 */
function removeBillboardByBillboardName(billboardName) {
    var entities = viewer.entities.values
    if (entities) {
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i]
            if (entity.billboardName === billboardName) {
                viewer.entities.remove(entity)
                i--
            }
        }
    }
}

/**
 * 加载以揭阳市为中心的圆圈
 */
//loadCircleJson()

function loadCircleJson() {
    var options = {
        clampToGround: true, // 开启贴地
    }
    var polyline300 = Cesium.GeoJsonDataSource.load('./data/topoJson/300km_line.json', options)
    polyline300.then(function (dataSource) {
        viewer.dataSources.add(dataSource)
        var polylineEntities300 = dataSource.entities.values
        for (var i = 0; i < polylineEntities300.length; i++) {
            var polylineEntity300 = polylineEntities300[i]
            polylineEntity300.polyline.name = '300km_line'
            polylineEntity300.polyline.width = 3
            polylineEntity300.polyline.material = new Cesium.PolylineDashMaterialProperty({
                color: Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#58fe87'), 1),
                dashLength: 15.0
            })
        }
    })
    var polyline400 = Cesium.GeoJsonDataSource.load('./data/topoJson/400km_line.json', options)
    polyline400.then(function (dataSource) {
        viewer.dataSources.add(dataSource)
        var polylineEntities400 = dataSource.entities.values
        for (var i = 0; i < polylineEntities400.length; i++) {
            var polylineEntity400 = polylineEntities400[i]
            polylineEntity400.polyline.name = '400km_line'
            polylineEntity400.polyline.width = 3
            polylineEntity400.polyline.material = new Cesium.PolylineDashMaterialProperty({
                color: Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#58f4fe'), 1),
                dashLength: 15.0
            })
        }
    })
    viewer.scene.imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
        url: './image/300KM.png',
        rectangle: Cesium.Rectangle.fromDegrees(118.92005, 22.86585, 119.18005, 23.75585)
    }))
    viewer.scene.imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
        url: './image/400KM.png',
        rectangle: Cesium.Rectangle.fromDegrees(119.897, 22.86585, 120.157, 23.75585)
    }))
}

/**
 * 根据layer改变图层透明度
 * @param layer
 * @param alpha
 */
function updateImageryProviderAlphaByLayer(layer, alpha) {
    for (var j = 0; j < viewer.scene.imageryLayers.length; j++) {
        var shadedImagery = viewer.scene.imageryLayers.get(j)
        if (shadedImagery.imageryProvider && shadedImagery.imageryProvider._layer && shadedImagery.imageryProvider._layer === layer) {
            shadedImagery.alpha = alpha
        }
    }
}

/**
 * 滚轮监听
 */
let isWheelment = 0, minCenterHeight = 1000, maxCenterHeight = 20000000;
handler.setInputAction(function (wheelment) {
    // 限制高度
    // 拉近是正数，拉远是负数
    if (isWheelment === 0) {
        if (wheelment > 0) {
            isWheelment = 10
        } else {
            isWheelment = -10
        }
    }
    let height = viewer.camera.positionCartographic.height
    if (height <= minCenterHeight) {
        scene.screenSpaceCameraController.enableZoom = false
        isWheelment = -10
    } else if (height >= maxCenterHeight) {
        scene.screenSpaceCameraController.enableZoom = false
        isWheelment = 10
    }
    let isZoom = isWheelment * wheelment
    if (isZoom >= 0) {
        scene.screenSpaceCameraController.enableZoom = true
    }
}, Cesium.ScreenSpaceEventType.WHEEL)

/**
 * 右键监听
 */
handler.setInputAction(function() {
    scene.screenSpaceCameraController.enableZoom = true
}, Cesium.ScreenSpaceEventType.RIGHT_DOWN)

/**
 * 监听高度
 */
function cameraHeightAction() {
    let height = viewer.camera.positionCartographic.height
    if (height <= minCenterHeight) {
        scene.screenSpaceCameraController.enableZoom = false
    }
    if (height >= maxCenterHeight) {
        scene.screenSpaceCameraController.enableZoom = false
    }
}
var cameraHeightListener = scene.postRender.addEventListener(cameraHeightAction)

// viewer.scene.screenSpaceCameraController.minimumZoomDistance = minCenterHeight //相机的高度的最小值
// viewer.scene.screenSpaceCameraController.maximumZoomDistance = maxCenterHeight  //相机高度的最大值
//风杆数据加载

Arrow_Draw_Plugin()
function Arrow_Draw_Plugin(){
	$.ajax({
		type:"get",
		url:"data/风杆数据/SEA_WIND_15682176000001.json",
		async:false,
	    success:function(dataobj){
	        Arrow_DrawDatas=dataobj;      
	        console.log(Arrow_DrawDatas);
	    }
	});
}
