var disasterBodyPoints = []
var seaWeatherData = []
var ShipLineList = []

function disasterBody(type, areaType) {
    var disasterBodyParams = {
        type: type,
        areaType: areaType
    }
    disasterBodyList(disasterBodyParams, function(res) {
        console.log(res)
        if (res.code === 200) {
            if (res.data.points) {
                var disasterBodyPoint = {
                    type: type,
                    points: res.data.points,
                    isDisasterPoints: true
                }
                console.log(disasterBodyPoint) //ada
                disasterBodyPoints.push(disasterBodyPoint)
            }
            if (type == '1') {
                // 海堤
                loadSeawallJson()
            } else if (type == '14') {
                // 油气运输管道
                loadOilPipelineJson()
            } else if (res.data.layers) {
                addDisasterBodyLayer(res.data.layers, type)
            }
        }
    })
}

/**
 * 加载承灾体点数据
 * @param points
 * @param type
 */
function loadDisasterBodyPoint(points, type) {
    for (var i = 0; i < points.length; i++) {
        var point = points[i]
        var imgSrc = point.img
        addBillboard(point.id, point.name, type, point.longitude, point.latitude, imgSrc, 1)
    }
}

/**
 * 承灾体点位点击
 * @param pick
 * @param movement
 */
function disasterBodyPointClick(pick, movement) {
    disasterInfoDelete()
    if (pick && pick.id && pick.id.billboardName) {
        var billboardName = parseInt(pick.id.billboardName)
        if (billboardName > 0 && billboardName <= 23) {
            var clickEntity = pick.id
            disasterCartesian = clickEntity.position._value
            var movementPick = movement.position
            disasterPosition = { x: movementPick.x, y: movementPick.y }
            disasterInfoShowById(movementPick.x, movementPick.y, billboardName, clickEntity.id)
        }
    }
}

/**
 * 监测气泡位置
 */
// 弹窗位置监听用到的参数
var disasterPosition, disasterPosition2, disasterCartesian
var WeatherPosition, WeatherPosition2, WeatherCartesian
var ShipPosition, ShipPosition2, ShipCartesian
scene.postRender.addEventListener(function() {
    // 监测点击气泡位置
    if (disasterPosition !== disasterPosition2) {
        if (disasterCartesian !== undefined) {
            disasterPosition2 = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, disasterCartesian)
            if (disasterPosition2) {
                var changeLeftX = disasterPosition2.x + 18
                var changeTopY = disasterPosition2.y - 31
                disasterInfoPosition(changeLeftX, changeTopY)
            }
        }
    }
    //监测天气位置变化
    if (WeatherPosition !== WeatherPosition2) {
        if (WeatherCartesian !== undefined) {
            WeatherPosition2 = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, WeatherCartesian)
            if (WeatherPosition2) {
                var changeLeftX = WeatherPosition2.x + 18
                var changeTopY = WeatherPosition2.y - 70
                setByremove(changeLeftX, changeTopY)
            }
        }
    }
    //监测船舶位置变化
    if (ShipPosition !== ShipPosition2) {
        if (ShipCartesian !== undefined) {
            ShipPosition2 = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, ShipCartesian)
            if (ShipPosition2) {
                var changeLeftX = ShipPosition2.x + 18
                var changeTopY = ShipPosition2.y - 70
                console.log(changeLeftX + "  " + changeTopY);
                setBoatRemove(changeLeftX, changeTopY)
            }
        }
    }
    // 监测高度，加载承灾体点数据
    if (disasterBodyPoints.length > 0) {
        var height = viewer.camera.positionCartographic.height
        for (var i in disasterBodyPoints) {
            var isDisasterPoints = disasterBodyPoints[i].isDisasterPoints
            if (height >= 1000000) {
                removeBillboardByBillboardName(disasterBodyPoints[i].type.toString())
                disasterBodyPoints[i].isDisasterPoints = true
            } else if (isDisasterPoints) {
                loadDisasterBodyPoint(disasterBodyPoints[i].points, disasterBodyPoints[i].type.toString())
                disasterBodyPoints[i].isDisasterPoints = false
            }
        }
    }

})

// 鼠标悬停时显示的lable
labelDisaster = viewer.entities.add({
    label: {
        show: false,
        showBackground: true,
        font: '14px Microsoft YaHei',
        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
        verticalOrigin: Cesium.VerticalOrigin.TOP,
        pixelOffset: new Cesium.Cartesian2(15, 0),
        backgroundPadding: new Cesium.Cartesian2(14, 9),
        fillColor: Cesium.Color.fromCssColorString('#ffffff')
    }
})

/**
 * 承灾体悬停标签
 * @param pick
 * @param movement
 */
function disasterMouseMove(pick, movement) {
    if (pick && pick.id && pick.id.billboardName) {
        var billboardName = parseInt(pick.id.billboardName)
        if (billboardName > 0 && billboardName <= 23) {
            var endPosition = movement.endPosition
            var dbCartesian = viewer.scene.pickPosition(endPosition)
            labelDisaster.position = dbCartesian
            labelDisaster.label.show = true
            labelDisaster.label.text = pick.id.name
        } else {
            labelDisaster.label.show = false
        }
    } else {
        labelDisaster.label.show = false
    }
}

/**
 * 加载承灾体shp数据
 * @param layers
 * @param type
 */
var disasterBodyLayers = {}

function addDisasterBodyLayer(layers, type) {
    var indexTxt = 'disaster' + type.toString()
    disasterBodyLayers[indexTxt] = []
    for (var i = 0; i < layers.length; i++) {
        var disasterLayser = layers[i]
        disasterBodyLayers[indexTxt].push(disasterLayser.layer)
        addGeoserverProvider(disasterLayser.url, disasterLayser.layer, disasterLayser.tileMatrixSetID, disasterLayser.format, disasterLayser.style, disasterLayser.alpha)
    }
}

/**
 * 去除承灾体shp数据
 * @param type
 */
function removeDisasterBodyLayer(type) {
    if (type == '1') {
        // 海堤
        removeShpToJson('HD_LN.json')
    } else if (type == '14') {
        // 油气运输管道
        removeShpToJson('YQYSGD_LN.json')
    } else {
        var indexTxt = 'disaster' + type.toString()
        if (disasterBodyLayers[indexTxt]) {
            var disasterLayers = disasterBodyLayers[indexTxt]
            for (var i = 0; i < disasterLayers.length; i++) {
                var layer = disasterLayers[i]
                removeImageryProviderByLayer(layer)
            }
        }
    }
}

/**
 * 去除承灾体点数据
 * @param type
 */
function removeDisasterBodyPoint(type) {
    for (var i in disasterBodyPoints) {
        if (disasterBodyPoints[i].type == type) {
            disasterBodyPoints.splice(i, 1)
        }
    }
    removeBillboardByBillboardName(type)
}

/**
 * 海堤GeoJson加载，高亮效果
 */
function loadSeawallJson() {
    var options = {
        clampToGround: true, // 开启贴地
    }
    var polyline = Cesium.GeoJsonDataSource.load('./data/geoJson/HD_LN.json', options)
    polyline.then(function(dataSource) {
        viewer.dataSources.add(dataSource)
        var polylineEntities = dataSource.entities.values
        for (var i = 0; i < polylineEntities.length; i++) {
            var polylineEntity = polylineEntities[i]
            polylineEntity.name = 'HD_LN'
            polylineEntity.nameId = i
            polylineEntity.polyline.width = 10;
            (polylineEntity.polyline.material = new Cesium.PolylineGlowMaterialProperty({
                glowPower: .1, //一个数字属性，指定发光强度，占总线宽的百分比。
                color: Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#ff00d4'), .9)
            }), 10)
        }
        var IdSeawallArr = new Array();
        window.highlightLineSeawall = function(nameId) {
            var exists = IdSeawallArr.indexOf(nameId)
            if (exists <= -1) {
                highlightSeawall(nameId, 50, 50)
                IdSeawallArr.push(nameId)
            } else {
                highlightSeawall(nameId, 10, 10)
                IdSeawallArr.splice(exists, 1)
            }
        }
        window.highlightSeawall = function(nameId, width1, width2) {
            for (var j = 0; j < polylineEntities.length; j++) {
                var entity = polylineEntities[j]
                if (nameId == j) {
                    entity.polyline.width.setValue(width1);
                    (entity.polyline.material = new Cesium.PolylineGlowMaterialProperty({
                        glowPower: .1, //一个数字属性，指定发光强度，占总线宽的百分比。
                        color: Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#ff00d4'), .9)
                    }), width2)
                }
            }
        }
    })
}

/**
 * 油气运输管道GeoJson加载，高亮效果
 */
function loadOilPipelineJson() {
    var options = {
        clampToGround: true, // 开启贴地
    }
    var polyline = Cesium.GeoJsonDataSource.load('./data/geoJson/YQYSGD_LN.json', options)
    polyline.then(function(dataSource) {
        viewer.dataSources.add(dataSource)
        var polylineEntities = dataSource.entities.values
        for (var i = 0; i < polylineEntities.length; i++) {
            var polylineEntity = polylineEntities[i]
            polylineEntity.name = 'YQYSGD_LN'
            polylineEntity.nameId = i
            polylineEntity.polyline.width = 10;
            (polylineEntity.polyline.material = new Cesium.PolylineGlowMaterialProperty({
                glowPower: .1, //一个数字属性，指定发光强度，占总线宽的百分比。
                color: Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#0000ff'), .9)
            }), 10)
        }
        var IdOilPipelineArr = new Array();
        window.highlightLineOilPipeline = function(nameId) {
            var exists = IdOilPipelineArr.indexOf(nameId)
            if (exists <= -1) {
                highlightOilPipeline(nameId, 50, 50)
                IdOilPipelineArr.push(nameId)
            } else {
                highlightOilPipeline(nameId, 10, 10)
                IdOilPipelineArr.splice(exists, 1)
            }
        }
        window.highlightOilPipeline = function(nameId, width1, width2) {
            for (var j = 0; j < polylineEntities.length; j++) {
                var entity = polylineEntities[j]
                if (nameId == j) {
                    entity.polyline.width.setValue(width1);
                    (entity.polyline.material = new Cesium.PolylineGlowMaterialProperty({
                        glowPower: .1, //一个数字属性，指定发光强度，占总线宽的百分比。
                        color: Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#0000ff'), .9)
                    }), width2)
                }
            }
        }
    })
}

/**
 * 承灾体线数据点击高亮
 * @param pick
 * @constructor Zmumu
 */
function DisasterBodyJsonClick(pick) {
    // 海堤线
    if (pick && pick.id && pick.id.name && pick.id.name == 'HD_LN') {
        var pickNameId = pick.id.nameId
        highlightLineSeawall(pickNameId)
        return
    }
    // 油气运输管道线
    if (pick && pick.id && pick.id.name && pick.id.name == 'YQYSGD_LN') {
        var pickNameId = pick.id.nameId
        highlightLineOilPipeline(pickNameId)
        return
    }
}

/**
 * 天气图标点击
 * @param pick
 * @constructor Zmumu
 */
function WeatherDataClick(pick, movement) {
    // 点击海区天气
    if (pick && pick.id && pick.id.name && pick.id.name == '海区天气') {
        var clickEntity = pick.id;
        var name = clickEntity._id;
        WeatherCartesian = clickEntity.position._value
        var movementPick = movement.position
        WeatherPosition = { x: movementPick.x, y: movementPick.y }
        var dayText = clickEntity._properties._weatherPhenomena1._value
        var nightText = clickEntity._properties._weatherPhenomena2._value
        var dayWindScale = clickEntity._properties._windSpeed1._value
        var dayWindDirection = clickEntity._properties._windDirection1._value
        var nightWindDirection = clickEntity._properties._windDirection2._value
        var visibility1 = clickEntity._properties._visibility1._value
        var visibility2 = clickEntity._properties._visibility2._value
        var weather = "";
        var WindDirection = "";
        var visibility = "";
        if (dayWindDirection === nightWindDirection) {
            WindDirection = dayWindDirection
        } else {
            WindDirection = dayWindDirection + " 转 " + nightWindDirection;
        }
        if (dayText === nightText) {
            weather = dayText
        } else {
            weather = dayText + " 转 " + nightText;
        }
        if (visibility1 === visibility2) {
            visibility = visibility1 + "(km)"
        } else {
            visibility = visibility1 + " 转 " + visibility2 + "(km)";
        }
        var data = {
            left: movementPick.x,
            top: movementPick.y,
            name: name,
            type: "海区天气",
            params: {
                weather: weather,
                wind: dayWindScale + "级",
                windDirection: WindDirection,
                canSee: visibility
            }

        };
        showWeatherInfo(data)
        return
    }
    // 点击城市天气
    if (pick && pick.id && pick.id.name && pick.id.name == '城市天气') {
        var clickEntity = pick.id;
        var name = clickEntity._id;
        WeatherCartesian = clickEntity.position._value
        var movementPick = movement.position
        WeatherPosition = { x: movementPick.x, y: movementPick.y }
        var weather = clickEntity._properties._weather._value;
        var maxTemp = clickEntity._properties._maxTemp._value;
        var minTemp = clickEntity._properties._minTemp._value;
        var data = {
            left: movementPick.x,
            top: movementPick.y,
            name: name,
            type: "城市天气",
            params: {
                weather: weather,
                temperatureM: maxTemp + "°",
                temperatureMin: minTemp + "°"
            }
        };
        showWeatherInfo(data)
        return
    }
    //点击港口天气
    if (pick && pick.id && pick.id.name && pick.id.name == '港口天气') {
        var clickEntity = pick.id;
        var name = clickEntity._id;
        WeatherCartesian = clickEntity.position._value
        var movementPick = movement.position
        WeatherPosition = { x: movementPick.x, y: movementPick.y }
        var dayText = clickEntity._properties._dayText._value;
        var nightText = clickEntity._properties._nightText._value;
        var dayWindScale = clickEntity._properties._dayWindScale._value;
        var dayWindDirection = clickEntity._properties._dayWindDirection._value;
        var nightWindDirection = clickEntity._properties._nightWindDirection._value;
        var weather = "";
        var WindDirection = "";
        if (dayWindDirection === nightWindDirection) {
            WindDirection = dayWindDirection
        } else {
            WindDirection = dayWindDirection + " 转 " + nightWindDirection;
        }
        if (dayText === nightText) {
            weather = dayText
        } else {
            weather = dayText + " 转 " + nightText;
        }
        var data = {
            left: movementPick.x,
            top: movementPick.y,
            name: name,
            type: "港口天气",
            params: {
                weather: weather,
                wind: dayWindScale,
                windDirection: WindDirection
            }
        };
        showWeatherInfo(data)
        return
    }
    if (pick && pick.id && pick.id.name && pick.id.name == '船舶气象风险') {
        var clickEntity = pick.id;
        var shipId = clickEntity._id;
        ShipCartesian = clickEntity.position._value
        var movementPick = movement.position
        ShipPosition = { x: movementPick.x, y: movementPick.y }
        var shipName = clickEntity._properties._shipName._value;
        var lon = clickEntity._properties._lon._value;
        var lat = clickEntity._properties._lat._value;
        var windPower = clickEntity._properties._windPower._value;
        var data = {
            left: movementPick.x,
            top: movementPick.y,
            shipId: shipId,
            type: "船舶气象风险",
            params: {
                name: shipName,
                longitude: lon,
                latitude: lat,
                wind: windPower
            }
        };
        showWeatherInfo(data)
        return
    }
    if (pick === undefined) {
        closeINfoBox()
        clearBoatBox()
    }
}

function shipLineClick(drillPick, movement) {
    if (currentNavIndex == 1 && tabIndex == 2) {
        for (var i = 0; i < drillPick.length; i++) {
            var pick = drillPick[i]

            if (pick && pick.id && pick.id.id && pick.id.name === '广州港-海口港') {
                GZ_HKLineHight(true)
                GZ_SHLineHight(false)
                GZ_XMLineHight(false)
                GZ_TJLineHight(false)
                setPointLineHeight('广州港-海口港')

                return;
            }
            if (pick && pick.id && pick.id.id && pick.id.name === '广州港-上海港') {
                GZ_HKLineHight(false)
                GZ_SHLineHight(true)
                GZ_XMLineHight(false)
                GZ_TJLineHight(false)
                setPointLineHeight('广州港-上海港')
                return;
            }
            if (pick && pick.id && pick.id.id && pick.id.name === '广州港-厦门港') {
                GZ_HKLineHight(false)
                GZ_SHLineHight(false)
                GZ_XMLineHight(true)
                GZ_TJLineHight(false)
                setPointLineHeight('广州港-厦门港')
                return;
            }
            if (pick && pick.id && pick.id.id && pick.id.name === '广州港-天津港') {
                GZ_HKLineHight(false)
                GZ_SHLineHight(false)
                GZ_XMLineHight(false)
                GZ_TJLineHight(true)
                setPointLineHeight('广州港-天津港')
                return;
            }
        }
        if (drillPick.length === 0) {
            GZ_HKLineHight(false)
            GZ_SHLineHight(false)
            GZ_XMLineHight(false)
            GZ_TJLineHight(false)
            clearLineHeight()
        }
    }


}
//封装港口变亮方法
function GZ_HKLineHight(isHight) {
    var AllEntities = ShipLineList[0].GZ_HKdataSource
    if (isHight) {
        AllEntities._entityCollection._entities._array[1]._polyline._material._color._value.alpha = 1;
        AllEntities._entityCollection._entities._array[2]._polyline._material._color._value.alpha = 1;
        AllEntities._entityCollection._entities._array[3]._polyline._material._color._value.alpha = 1;
    } else {
        AllEntities._entityCollection._entities._array[1]._polyline._material._color._value.alpha = 0.3;
        AllEntities._entityCollection._entities._array[2]._polyline._material._color._value.alpha = 0.3;
        AllEntities._entityCollection._entities._array[3]._polyline._material._color._value.alpha = 0.3;
    }
}

function GZ_SHLineHight(isHight) {
    var AllEntities = ShipLineList[0].GZ_SHdataSource
    if (isHight) {
        AllEntities._entityCollection._entities._array[1]._polyline._material._color._value.alpha = 1;
        AllEntities._entityCollection._entities._array[2]._polyline._material._color._value.alpha = 1;
        AllEntities._entityCollection._entities._array[3]._polyline._material._color._value.alpha = 1;
    } else {
        AllEntities._entityCollection._entities._array[1]._polyline._material._color._value.alpha = 0.3;
        AllEntities._entityCollection._entities._array[2]._polyline._material._color._value.alpha = 0.3;
        AllEntities._entityCollection._entities._array[3]._polyline._material._color._value.alpha = 0.3;
    }
}

function GZ_XMLineHight(isHight) {
    var AllEntities = ShipLineList[0].GZ_XMdataSource
    if (isHight) {
        AllEntities._entityCollection._entities._array[1]._polyline._material._color._value.alpha = 1;
        AllEntities._entityCollection._entities._array[2]._polyline._material._color._value.alpha = 1;
        AllEntities._entityCollection._entities._array[3]._polyline._material._color._value.alpha = 1;
    } else {
        AllEntities._entityCollection._entities._array[1]._polyline._material._color._value.alpha = 0.3;
        AllEntities._entityCollection._entities._array[2]._polyline._material._color._value.alpha = 0.3;
        AllEntities._entityCollection._entities._array[3]._polyline._material._color._value.alpha = 0.3;
    }
}

function GZ_TJLineHight(isHight) {
    var AllEntities = ShipLineList[0].GZ_TJdataSource
    if (isHight) {
        AllEntities._entityCollection._entities._array[1]._polyline._material._color._value.alpha = 1;
        AllEntities._entityCollection._entities._array[2]._polyline._material._color._value.alpha = 1;
        AllEntities._entityCollection._entities._array[3]._polyline._material._color._value.alpha = 1;
        AllEntities._entityCollection._entities._array[4]._polyline._material._color._value.alpha = 1;
    } else {
        AllEntities._entityCollection._entities._array[1]._polyline._material._color._value.alpha = 0.3;
        AllEntities._entityCollection._entities._array[2]._polyline._material._color._value.alpha = 0.3;
        AllEntities._entityCollection._entities._array[3]._polyline._material._color._value.alpha = 0.3;
        AllEntities._entityCollection._entities._array[4]._polyline._material._color._value.alpha = 0.3;
    }
}
/**
 * 加载海区天气预报
 */
// loadWeatherData("城市天气")
//loadWeatherData("海区天气")
//loadWeatherData("港口天气")
//loadWeatherData("船舶气象风险") 
function loadWeatherData(name) {
    if (name === "海区天气") {
        getForecastData("data/海洋天气预报.json", function(res) {
            if (res.code == 200 && res.data) {
                var landCity = res.data
                loadWheatherDataPoint(landCity, name)

            }
        })
    } else {
        if (name === "城市天气") {
            getForecastData("data/城市天气预报.json", function(res) {
                if (res.code == 200 && res.data) {
                    var landCity = res.data
                    loadWheatherDataPoint(landCity, name)
                }
            })
        } else {
            if (name === "港口天气") {
                getForecastData("data/港口城市.json", function(res) {
                    if (res.code == 200 && res.data) {
                        var landCity = res.data

                        loadWheatherDataPoint(landCity, name)
                    }
                })
            } else {
                if (name === "船舶气象风险") {
                    getForecastData("data/ship.json", function(res) {
                        if (res.code == 200 && res.data) {
                            var landCity = res.data.list
                            console.log(landCity);
                            loadWheatherDataPoint(landCity, name)
                        }
                    })
                }
            }
        }
    }
}

function loadWheatherDataPoint(wheatherDatas, name) {
    if (name === "海区天气") {
        for (var i = 0; i < wheatherDatas.length; i++) {
            var wheatherData = wheatherDatas[i]
            var weatherPhenomena1 = wheatherData.weatherPhenomena1;
            var imgSrc = searchImage(weatherPhenomena1);
            seaWeatherData.push(wheatherData.stationName);
            var info = {
                weatherPhenomena1: wheatherData.weatherPhenomena1,
                weatherPhenomena2: wheatherData.weatherPhenomena2,
                windSpeed1: wheatherData.windSpeed1,
                windDirection1: wheatherData.windDirection1,
                windDirection2: wheatherData.windDirection2,
                visibility1: wheatherData.visibility1,
                visibility2: wheatherData.visibility2
            }
            addBillboardSeaArea(wheatherData.stationName, "海区天气", wheatherData.stationName, wheatherData.longitude, wheatherData.latitude, imgSrc, 1.5, info)
        }
    } else {
        if (name === "城市天气") {
            for (var i = 0; i < wheatherDatas.length; i++) {
                var wheatherData = wheatherDatas[i]
                var img = wheatherData.img;
                var imgSrc = searchImage(img);
                seaWeatherData.push(wheatherData.city);
                var info = {
                    maxTemp: wheatherData.maxTemp,
                    minTemp: wheatherData.minTemp,
                    weather: wheatherData.weather,
                    releaseDay: wheatherData.releaseDay
                }
                addBillboardSeaArea(wheatherData.city, "城市天气", wheatherData.city, wheatherData.longitude, wheatherData.latitude, imgSrc, 1.5, info)
            }
        } else {
            if (name === "港口天气") {
                for (var i = 0; i < wheatherDatas.length; i++) {
                    var wheatherData = wheatherDatas[i]
                    var wheaterInfo = wheatherData.daily[0]
                    var locatInfo = wheatherData.location
                    var img = wheaterInfo.dayText;
                    var imgSrc = searchImage(img);
                    seaWeatherData.push(locatInfo.name);
                    var info = {
                        dayText: wheaterInfo.dayText,
                        nightText: wheaterInfo.nightText,
                        high: wheaterInfo.high,
                        low: wheaterInfo.low,
                        dayWindScale: wheaterInfo.dayWindScale,
                        dayWindDirection: wheaterInfo.dayWindDirection,
                        nightWindDirection: wheaterInfo.nightWindDirection
                    }
                    addBillboardSeaArea(locatInfo.name, "港口天气", locatInfo.name, locatInfo.longitude, locatInfo.latitude, imgSrc, 1.5, info)
                }
            } else {
                if (name === "船舶气象风险") {
                    for (var i = 0; i < wheatherDatas.length; i++) {
                        var wheatherData = wheatherDatas[i]
                        var shipId = wheatherData.mmsi
                        var direction = wheatherData.boatMoveDirection;
                        var imgSrc = shipImage(direction);
                        var lon = cacuLonLat(wheatherData.longitude)
                        var lat = cacuLonLat(wheatherData.latitude);
                        var shipName = wheatherData.name;
                        var windPower = wheatherData.windPower;
                        seaWeatherData.push(shipId);
                        var info = {
                            shipId: shipId,
                            shipName: shipName,
                            lon: lon,
                            lat: lat,
                            windPower: windPower,
                            direction: direction
                        }
                        addBillboardSeaArea(shipId, "船舶气象风险", shipId, wheatherData.longitude, wheatherData.latitude, imgSrc, 1, info)
                    }
                }
            }
        }
    }
}


function removeWheatherDataPoint(name) {
    if (name === "海区天气") {
        for (var i = 0; i < seaWeatherData.length; i++) {
            removeBillboardByBillboardName(seaWeatherData[i])
        }
        seaWeatherData = [];
    } else {
        if (name === "城市天气") {
            for (var i = 0; i < seaWeatherData.length; i++) {
                removeBillboardByBillboardName(seaWeatherData[i])
            }
            seaWeatherData = [];
        } else {
            if (name === "港口天气") {
                for (var i = 0; i < seaWeatherData.length; i++) {
                    removeBillboardByBillboardName(seaWeatherData[i])
                }
                seaWeatherData = [];
            } else {
                if (name === "船舶气象风险") {
                    for (var i = 0; i < seaWeatherData.length; i++) {
                        removeBillboardByBillboardName(seaWeatherData[i])
                    }
                    seaWeatherData = [];
                }
            }
        }

    }
}

function searchImage(weatherPhenomena1) {
    var wheatherImage = "";
    switch (weatherPhenomena1) {
        case "多云":
            wheatherImage = "image/weather/cloudy.png";
            break;

        case "雾":
            wheatherImage = "image/weather/fog.png";
            break;

        case "阴":
            wheatherImage = "image/weather/overcast_sky.png";
            break;

        case "雷阵雨":
            wheatherImage = "image/weather/thundershower.png";
            break;

        case "阵雨":
            wheatherImage = "image/weather/showery.png";
            break;

        case "晴":
            wheatherImage = "image/weather/fine.png";
            break;

        case "小雨":
            wheatherImage = "image/weather/light_rain.png";
            break;

        case "大雨":
            wheatherImage = "image/weather/heavy_rain.png";
            break;

        default:
            wheatherImage = "image/weather/cloudy.png";
    }
    return wheatherImage;
}

function shipImage(weatherPhenomena1) {
    var wheatherImage = "";
    if (weatherPhenomena1 > 0 && weatherPhenomena1 < 90) {
        wheatherImage = wheatherImage = "image/ship/东北.png";
        return wheatherImage;
    }
    if (weatherPhenomena1 > 90 && weatherPhenomena1 < 180) {
        wheatherImage = wheatherImage = "image/ship/东南.png";
        return wheatherImage;
    }
    if (weatherPhenomena1 > 180 && weatherPhenomena1 < 270) {
        wheatherImage = wheatherImage = "image/ship/西南.png";
        return wheatherImage;
    }
    if (weatherPhenomena1 > 270 && weatherPhenomena1 < 360) {
        wheatherImage = wheatherImage = "image/ship/西北.png";
        return wheatherImage;
    }
    //  switch (weatherPhenomena1) {
    //      case weatherPhenomena1:
    //          wheatherImage = "image/ship/东南.png";
    //          break;
    //
    //      case "东北":
    //          wheatherImage = "image/ship/东北.png";
    //          break;
    //
    //      case "西北":
    //          wheatherImage = "image/ship/西北.png";
    //          break;
    //
    //      case "西南":
    //          wheatherImage = "image/ship/西南.png";
    //          break;
    //
    //      default:
    //          wheatherImage = "image/ship/东南.png";
    //  }
    return wheatherImage;
}

function cacuLonLat(a) {
    var degree = parseInt(a);
    var min = parseInt((a - degree) * 60);
    var sec = parseInt((a - degree) * 3600 - min * 60);
    return degree + '°' + min + '′' + sec + '″';
}
//loadShipLine()
//加载船等级线段
function loadShipLine() {
    var GZ_HKdataSource = new Cesium.CzmlDataSource()
    var GZ_SHdataSource = new Cesium.CzmlDataSource()
    var GZ_XMdataSource = new Cesium.CzmlDataSource()
    var GZ_TJdataSource = new Cesium.CzmlDataSource()
    ShipLineList.push({
        GZ_HKdataSource: GZ_HKdataSource,
        GZ_SHdataSource: GZ_SHdataSource,
        GZ_XMdataSource: GZ_XMdataSource,
        GZ_TJdataSource: GZ_TJdataSource
    })
    viewer.dataSources.add(GZ_HKdataSource.load(gz_hkdata))
    viewer.dataSources.add(GZ_SHdataSource.load(gz_shdata))
    viewer.dataSources.add(GZ_XMdataSource.load(gz_xmdata))
    viewer.dataSources.add(GZ_TJdataSource.load(gz_tjdata))
}
//清除船只等级线段
function deleteShipLine() {
    var typhoonItem = ShipLineList[0]
    typhoonItem.GZ_HKdataSource.entities.removeAll()
    typhoonItem.GZ_SHdataSource.entities.removeAll()
    typhoonItem.GZ_XMdataSource.entities.removeAll()
    typhoonItem.GZ_TJdataSource.entities.removeAll()

    ShipLineList = []
}
function flyPosition(heigth){
	 viewer.camera.flyTo({ 
	 	duration: 0.6,
	 	destination: Cesium.Cartesian3.fromDegrees(113.517628, 23.353899, heigth) 
	 })
}
