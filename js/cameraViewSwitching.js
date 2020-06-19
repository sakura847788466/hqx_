/**
 * 揭阳市视角切换
 * @param text 区划名称
 */
var isLoadJson = ''

function cameraViewSwitching(text) {
    var urlPolygon = ''
    var urlPolyline = ''
    switch (text) {
        case '揭阳市':
            urlPolygon = './data/topoJson/jieYang.json'
            urlPolyline = './data/topoJson/jieYangLine.json'
            text = 'jieYang'
            cameraFly(116.373367, 23.549510, 150000)
            break
        case '惠来县':
            urlPolygon = './data/topoJson/huiLai.json'
            urlPolyline = './data/topoJson/huiLaiLine.json'
            text = 'huiLai'
            cameraFly(116.164627, 23.037402, 100000)
            break
        case '普宁市':
            urlPolygon = './data/topoJson/puNing.json'
            urlPolyline = './data/topoJson/puNingLine.json'
            text = 'puNing'
            cameraFly(116.267537, 23.297487, 100000)
            break
        case '榕城区':
            urlPolygon = './data/topoJson/rongCheng.json'
            urlPolyline = './data/topoJson/rongChengLine.json'
            text = 'rongCheng'
            cameraFly(116.356544, 23.535976, 100000)
            break
        case '揭东区':
            urlPolygon = './data/topoJson/jieDong.json'
            urlPolyline = './data/topoJson/jieDongLine.json'
            text = 'jieDong'
            cameraFly(116.412506, 23.569966, 100000)
            break
        case '揭西县':
            urlPolygon = './data/topoJson/jieXi.json'
            urlPolyline = './data/topoJson/jieXiLine.json'
            text = 'jieXi'
            cameraFly(115.837440, 23.426709, 100000)
            break
        case '南海':
            cameraFly(111.5, 12.5, 6000000)
            text = 'nanHai'
            break
    }
    urlPolygon = ''
    loadJsonByViewSwitching(urlPolygon, urlPolyline, text)
    removeJsonByViewSwitching()
    isLoadJson = text
}

/**
 * 视角位置切换，高度选填
 * @param lon
 * @param lat
 * @param hei
 */
function cameraFly(lon, lat, hei) {
    if (hei) {
        viewer.camera.flyTo({
            duration: 1.0,
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, hei)
        })
    } else {
        var height = viewer.camera.positionCartographic.height
        viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, height)
        })
    }
}

/**
 * 根据视角切换加载行政区划
 * @param urlPolygon
 * @param urlPolyline
 * @param text
 */
function loadJsonByViewSwitching(urlPolygon, urlPolyline, text) {
    var options = {
        clampToGround: true, // 开启贴地
    }
    if (urlPolygon !== '') {
        var polygon = Cesium.GeoJsonDataSource.load(urlPolygon, options)
        polygon.then(function(dataSource) {
            viewer.dataSources.add(dataSource)
                // geoJsonDatasource = dataSource
            var polygonEntities = dataSource.entities.values
            for (var i = 0; i < polygonEntities.length; i++) {
                var polygonEntity = polygonEntities[i]
                polygonEntity.polygon.name = text
                polygonEntity.polygon.material = Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#ff0100'), 0.5)
                polygonEntity.polygon.outline = false
            }
        })
    }
    if (urlPolyline !== '') {
        var polyline = Cesium.GeoJsonDataSource.load(urlPolyline, options)
        polyline.then(function(dataSource) {
            viewer.dataSources.add(dataSource)
                // geoJsonDatasource = dataSource
            var polylineEntities = dataSource.entities.values
            for (var i = 0; i < polylineEntities.length; i++) {
                var polylineEntity = polylineEntities[i]
                polylineEntity.polyline.name = text
                polylineEntity.polyline.width = 5
                polylineEntity.polyline.material = Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#ff6b62'), 1)
            }
        })
    }
}

/**
 * 去除并销毁Json数据
 * @param nameId
 */
function removeShpToJson(nameId) {
    for (var i = 0; i < viewer.dataSources.length; i++) {
        var dataGeoJson = viewer.dataSources.get(i)
        if (dataGeoJson._name && dataGeoJson._name === nameId) {
            viewer.dataSources.remove(dataGeoJson, true)
            return
        }
    }
}

/**
 * 加载近岸海域预报单
 */
var entityForecastColor
var entityForecastBlue
var geoJsonDatasourceOffshore

function loadOffshoreForecast() {
    var options = {
        clampToGround: true, // 开启贴地
    }
    var polygon = Cesium.GeoJsonDataSource.load('./data/topoJson/forecastDivision.json', options)
        // var polygon = Cesium.GeoJsonDataSource.load('https://jy-fbc-pro20180012.oss-cn-shenzhen.aliyuncs.com/PRO20180012/stormTide/广东省近岸预报单元区划.json', options)
    polygon.then(function(dataSource) {
        viewer.dataSources.add(dataSource)
        geoJsonDatasourceOffshore = dataSource
        var polygonEntities = dataSource.entities.values
        for (var i = 0; i < polygonEntities.length; i++) {
            var polygonEntity = polygonEntities[i]
            polygonEntity.polygon.name = 'forecastDivision'
            polygonEntity._id = polygonEntity._name
            polygonEntity.polygon.material = Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#07b9ff'), 0.3)
                //          if (polygonEntity.name == '揭阳惠来近岸海域') {
                //              polygonEntity.polygon.material = Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#ff6b62'), 0.5)
                //              entityForecastColor = polygonEntity
                //
                //              var entityCopy = new Cesium.Entity()
                //              entityCopy.polygon = Cesium.clone(polygonEntity.polygon)
                //              entityCopy.name = '揭阳惠来近岸海域Copy'
                //              entityCopy.polygon.material = Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#07b9ff'), 0.5)
                //              if (currentNavIndex == 3) {
                //                  entityCopy.show = false
                //                  entityForecastBlue = entityCopy
                //              } else {
                //                  polygonEntity.show = false
                //              }
                //              dataSource.entities.add(entityCopy)
                //          } else {
                //              polygonEntity.polygon.material = Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#07b9ff'), 0.3)
                //          }
                //          polygonEntity.polygon.outline = false
        }
    })
    var polyline = Cesium.GeoJsonDataSource.load('./data/geoJson/forecastDivisionLine.json', options)
        // var polyline = Cesium.GeoJsonDataSource.load('https://jy-fbc-pro20180012.oss-cn-shenzhen.aliyuncs.com/PRO20180012/stormTide/广东省近岸预报单元区划界限.json', options)

    polyline.then(function(dataSource) {
        viewer.dataSources.add(dataSource)
            // geoJsonDatasource = dataSource
        var polylineEntities = dataSource.entities.values
        for (var i = 0; i < polylineEntities.length; i++) {
            var polylineEntity = polylineEntities[i]
            polylineEntity.polyline.name = 'forecastDivisionLine'
            polylineEntity.polyline.width = 2
            polylineEntity.polyline.material = new Cesium.PolylineDashMaterialProperty({
                color: Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#ffffff'), 0.45),
                dashLength: 15.0
            })
        }
    })
    loadOffshoreForecastName()
}

/**
 * 删除近岸海域预报单
 */
function removeOffshoreForecast() {
    removeShpToJson('forecastDivision.json')
    removeShpToJson('forecastDivisionLine.json')
    removeImageryProviderByCredit('OffshoreForecastImg')
}

/**
 * 删除揭阳市行政区划
 */
function removeJsonByViewSwitching() {
    if (isLoadJson !== '') {
        removeShpToJson(isLoadJson + '.json')
        removeShpToJson(isLoadJson + 'Line.json')
        isLoadJson = ''
    }
}

/**
 * 加载近岸预报区划名称
 */
function loadOffshoreForecastName() {
    var nameJson = [{
        url: './image/offshoreForecast/chaoZhouTuoLinWan.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            116.9178, 23.5194,
            117.1948, 23.5484
        )
    }, {
        url: './image/offshoreForecast/daPengWan.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            114.4514, 22.1317,
            114.6654, 22.1607
        )
    }, {
        url: './image/offshoreForecast/daYaWan.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            114.6870, 22.3440,
            114.9010, 22.3730
        )
    }, {
        url: './image/offshoreForecast/jiangMenGuangHaiWan.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            112.6149, 21.5943,
            112.8919, 21.6233
        )
    }, {
        url: './image/offshoreForecast/jiangMenShangChuanDong.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            112.9001, 21.6834,
            113.1771, 21.7124
        )
    }, {
        url: './image/offshoreForecast/jiangMenXiaChuanXi.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            112.2699, 21.5471,
            112.5469, 21.5761
        )
    }, {
        url: './image/offshoreForecast/jieYangHuiLai.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            116.4071, 22.8745,
            116.6531, 22.9035
        )
    }, {
        url: './image/offshoreForecast/leiZhouBanDaoDongBu.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            111.2231, 20.7262,
            111.5301, 20.7552
        )
    }, {
        url: './image/offshoreForecast/maoMing.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            111.1490, 21.3021,
            111.3320, 21.3311
        )
    }, {
        url: './image/offshoreForecast/shanTouDongBu.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            116.9499, 23.2242,
            117.1959, 23.2532
        )
    }, {
        url: './image/offshoreForecast/shanTouGuangAoWan.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            116.5945, 23.0481,
            116.8715, 23.0771
        )
    }, {
        url: './image/offshoreForecast/shanWeiHongHaiWan.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            115.1455, 22.4906,
            115.4225, 22.5196
        )
    }, {
        url: './image/offshoreForecast/shanWeiLuFeng.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            115.8114, 22.6750,
            116.0574, 22.7040
        )
    }, {
        url: './image/offshoreForecast/yangJiangHaiLingWan.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            111.7582, 21.6523,
            111.9082, 21.6813
        )
    }, {
        url: './image/offshoreForecast/yangJiangYangDong.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            111.9217, 21.4767,
            112.1677, 21.5057
        )
    }, {
        url: './image/offshoreForecast/yangJiangYangXi.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            111.5135, 21.3860,
            111.7595, 21.4150
        )
    }, {
        url: './image/offshoreForecast/zhanJiangGuangZhouWan.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            110.4653, 20.9833,
            110.7423, 21.0123
        )
    }, {
        url: './image/offshoreForecast/zhanJiangLeiZhouWan.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            110.2242, 20.8181,
            110.5012, 20.8471
        )
    }, {
        url: './image/offshoreForecast/zhanJiangLeiZhouXiBu.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            109.4866, 20.6941,
            109.7936, 20.7231
        )
    }, {
        url: './image/offshoreForecast/zhanJiangLianJiang.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            109.6660, 21.4155,
            109.9120, 21.4445
        )
    }, {
        url: './image/offshoreForecast/zhanJiangSuiXiXiBu.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            109.4968, 21.1923,
            109.8038, 21.2213
        )
    }, {
        url: './image/offshoreForecast/zhanJiangWuChuan.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            110.7392, 21.2281,
            110.9852, 21.2571
        )
    }, {
        url: './image/offshoreForecast/zhanJiangXuWenDongBu.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            110.5109, 20.5428,
            110.8179, 20.5718
        )
    }, {
        url: './image/offshoreForecast/zhanJiangXuWenNanBu.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            110.0299, 20.1998,
            110.3369, 20.2288
        )
    }, {
        url: './image/offshoreForecast/zhanJiangXuWenXiBu.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            109.6318, 20.2752,
            109.9388, 20.3042
        )
    }, {
        url: './image/offshoreForecast/zhuHaiGaoLan.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            113.2095, 21.8015,
            113.4555, 21.8305
        )
    }, {
        url: './image/offshoreForecast/zhuJiangKouNeiWan.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            113.6254, 22.4690,
            113.7754, 22.4980
        )
    }, {
        url: './image/offshoreForecast/zhuJiangKouWai.png',
        rectangle: Cesium.Rectangle.fromDegrees(
            113.8446, 21.8839,
            114.0906, 21.9129
        )
    }]
    for (var i = 0; i < nameJson.length; i++) {
        var imageryProvider = viewer.scene.imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
            url: nameJson[i].url,
            rectangle: nameJson[i].rectangle,
            credit: 'OffshoreForecastImg'
        }))
        imageryProvider.zIndex = 10
    }
}

/**
 * 根据credit删除图层
 * @param credit
 */
function removeImageryProviderByCredit(credit) {
    for (var j = 0; j < viewer.scene.imageryLayers.length; j++) {
        var shadedImagery = viewer.scene.imageryLayers.get(j)
        if (shadedImagery.imageryProvider && shadedImagery.imageryProvider.credit && shadedImagery.imageryProvider.credit.html === credit.toString()) {
            viewer.scene.imageryLayers.remove(shadedImagery)
            j--
        }
    }
}

/**
 * 揭阳图标加载
 */
var isJY = true
scene.postRender.addEventListener(JYBillboardListener)

function JYBillboardListener() {
    var height = viewer.camera.positionCartographic.height
    if (height < 1000000) {
        removeBillboardByBillboardName('JY.png')
        isJY = true
    } else if (isJY) {
        addBillboard('JY', 'JY.png', 'JY.png', 113.27, 23.13, './image/JY.png', 0.9)
        isJY = false
    }
}

/**
 * 揭阳图标单击
 * @param pick
 */
function JYClick(pick) {
    // JY图标
    if (pick && pick.id && pick.id.id && pick.id.id === 'JY') {
        viewer.camera.flyTo({ destination: Cesium.Cartesian3.fromDegrees(116.116924, 23.549510, 200000) })
    }
}

/**
 * 近岸预报单击
 * @param pick
 */
var entityColorARR = {
    entity: undefined,
    color: undefined
}

function offshoreForecastPolygonClick(pick) {

    if (currentNavIndex == 3) {
        if (pick && pick.id && pick.id.polygon && pick.id.polygon.name && pick.id.polygon.name == 'forecastDivision') {
            if (entityColorARR.entity != undefined) {
                var entity = entityColorARR.entity
                entity.polygon.material = entityColorARR.color
            }
            var entity = pick.id;
            entityColorARR.entity = entity
            entityColorARR.color = entity.polygon.material
            var entityId = entity.id;
            entity.polygon.material = Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#ff6b62'), 0.5)
            getLatestThreeDayDetail(entityId)

            //  	   if (entityColorARR.entityid !== undefined) {
            //			if (geoJsonDatasourceOffshore.entities && geoJsonDatasourceOffshore.entities.getById(entityColorARR.entityid)) {
            //		        var entt = geoJsonDatasourceOffshore.entities.getById(entityColorARR.entityid)
            //		        entt.polygon.material = entityColorARR.color
            //		      }
            //		}
            //      if (currentNavIndex == 0 && pick.id.name && (pick.id.name == '揭阳惠来近岸海域' || pick.id.name == '揭阳惠来近岸海域Copy')){
            //          // 恢复蓝色
            //          if (entityForecastBlue) {
            //              reportDialogClose()
            //              // entityForecastColor.polygon.material = Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#07b9ff'), 0.3)
            //              entityForecastBlue.show = true
            //              entityForecastColor.show = false
            //              entityForecastBlue = undefined
            //          } else {
            //              // 高亮色，弹窗
            //              getLatestThreeDayDetail()
            //              // setForecastColorOrange()
            //              // pick.id.polygon.material = Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#ff6b62'), 0.5)
            //              pick.id.show = false
            //              entityForecastColor.show = true
            //              entityForecastBlue = pick.id
            //          }
            //      }
        }
        if (pick === undefined && entityColorARR.entity) {
            hideJinanReport()
            var entity = entityColorARR.entity
            entity.polygon.material = entityColorARR.color
        }

    }

}

/**
 * 近岸预报恢复蓝色
 */
function setForecastColorBlue() {
    if (entityForecastBlue) {
        // entityForecastColor.polygon.material = Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#07b9ff'), 0.3)
        entityForecastBlue.show = true
        entityForecastColor.show = false
        entityForecastBlue = undefined
    }
}

/**
 * 近岸预报设置高亮
 */
function setForecastColorOrange() {
    var entities = geoJsonDatasourceOffshore.entities
    for (var i = 0; i < entities.values.length; i++) {
        if (entities.values[i].name == '揭阳惠来近岸海域Copy') {
            var entity = entities.values[i]
                // entity.polygon.material = Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#ff6b62'), 0.5)
            entity.show = false
            entityForecastColor.show = true
            entityForecastBlue = entity
        }
    }
}

/**
 * 近岸预报鼠标悬停
 * @param pick
 */
function offshoreForecastMouseMove(pick) {

    if (currentNavIndex == 3) {
        var mouse = document.getElementById('cesiumContainer')
            //      if (pick && pick.id && pick.id.name && (pick.id.name == '揭阳惠来近岸海域' || pick.id.name == '揭阳惠来近岸海域Copy')) {
        if (pick && pick.id && pick.id.polygon && pick.id.polygon.name && pick.id.polygon.name == 'forecastDivision') {
            mouse.style.cursor = 'pointer'
        } else {
            mouse.style.cursor = 'auto'
        }
    }
}

/**
 * 加载天文潮预报点img
 */
function loadAstronomicalTideForecastPoint() {
    addBillboard('astronomicalTideForecastPoint', 'astronomicalTideForecastPoint.png', 'astronomicalTideForecastPoint.png', 116.533333, 23.0, './image/astronomicalTideForecastPoint.png', 1)
}