var typhoon = function (typhoonViewer, typhoonNum, resData) {
    var typhoon = {}
    // 已经加载的台风路径数组
    var typhoonList = []
    // 已加载的台风风圈数据
    var pointsWindData = {}
    // 全部扇形对象
    var primitives = {}
    // 台风时间数组
    var times = {}
    var kTyphoons = {}
    var ellipsoid = Cesium.Ellipsoid.WGS84
    var scene = typhoonViewer.scene
    var clockViewModel = typhoonViewer.clockViewModel

    if (clockViewModel.canAnimate) {
        clockViewModel.shouldAnimate = true
    }
    /**
     * 风圈覆盖，更换图片
     * resData台风数据
     */
    var typhoonPoint = resData.pointList
    var typhoonObjectPoint0 = typhoonPoint[typhoonPoint.length - 1]
    typhoonObjectPoint0.billboard.scale = 1
    var typhoonName = resData.name
    var typhoonMode = resData.modelList
    var typhoonModeScale = typhoonMode[typhoonPoint.length - 1]
    typhoonModeScale.billboard.scale = 1
    typhoonModeScale.position.cartographicDegrees[2] = 400
    for (var i = 1; i < typhoonPoint.length; i++) {
        typhoonMode[i].id = typhoonName + (i - 1)
    }
    /**
     * 给第一个点设置台风标签
     */
    var longitude01 = typhoonPoint[1].position.cartographicDegrees[0]
    var latitude01 = typhoonPoint[1].position.cartographicDegrees[1]
    var world01 = Cesium.Cartesian3.fromDegrees(longitude01, latitude01)
    var screenLocation = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, world01)
    var simTyLocation = {x: screenLocation.x, y: screenLocation.y}
    var leftXMarker = screenLocation.x
    var topYMarker = screenLocation.y
    addTyphoonMarker(leftXMarker, topYMarker, typhoonName, typhoonNum)

    /**
     * 渲染台风
     */
    // 创建点、线、模型、预测点容器对象
    var dataSource_point = new Cesium.CzmlDataSource()
    var dataSource_line = new Cesium.CzmlDataSource()
    var dataSource_modepoint = new Cesium.CzmlDataSource()
    var dataSource_chinaforcepoint = new Cesium.CzmlDataSource()
    var dataSource_chinaforceline = new Cesium.CzmlDataSource()
    var dataSource_japanforcepoint = new Cesium.CzmlDataSource()
    var dataSource_japanforceline = new Cesium.CzmlDataSource()
    var dataSource_taiwanforcepoint = new Cesium.CzmlDataSource()
    var dataSource_taiwanforceline = new Cesium.CzmlDataSource()
    var dataSource_Americanforcepoint = new Cesium.CzmlDataSource()
    var dataSource_Americanforceline = new Cesium.CzmlDataSource()
    var dataSource_hkforcepoint = new Cesium.CzmlDataSource()
    var dataSource_hkforceline = new Cesium.CzmlDataSource()

    typhoonList = {
        typhoon_number: typhoonNum,
        dataSource_point: dataSource_point,
        dataSource_line: dataSource_line,
        dataSource_modepoint: dataSource_modepoint,
        dataSource_chinaforcepoint: dataSource_chinaforcepoint,
        dataSource_chinaforceline: dataSource_chinaforceline,
        dataSource_japanforcepoint: dataSource_japanforcepoint,
        dataSource_japanforceline: dataSource_japanforceline,
        dataSource_taiwanforcepoint: dataSource_taiwanforcepoint,
        dataSource_taiwanforceline: dataSource_taiwanforceline,
        dataSource_Americanforcepoint: dataSource_Americanforcepoint,
        dataSource_Americanforceline: dataSource_Americanforceline,
        dataSource_hkforcepoint: dataSource_hkforcepoint,
        dataSource_hkforceline: dataSource_hkforceline
    }

    //拿到台风数据点数据
    var pointList = resData.pointList
    var lineList = resData.lineList
    var modelList = resData.modelList
    if (!resData.mainlandForecastPointList) {
        //2008年以前数据没有预测数据
        typhoonViewer.dataSources.add(dataSource_point.load(pointList))
        typhoonViewer.dataSources.add(dataSource_line.load(lineList))
        typhoonViewer.dataSources.add(dataSource_modepoint.load(modelList))
    } else {
        // 中国预测数据
        var mainlandForecastPointList = resData.mainlandForecastPointList
        var mainlandForecastLintList = resData.mainlandForecastLintList
        // 加载点、线、模型、各个国家预测数据
        typhoonViewer.dataSources.add(dataSource_point.load(pointList))
        typhoonViewer.dataSources.add(dataSource_line.load(lineList))
        typhoonViewer.dataSources.add(dataSource_modepoint.load(modelList))
        typhoonViewer.dataSources.add(dataSource_chinaforcepoint.load(mainlandForecastPointList))
        typhoonViewer.dataSources.add(dataSource_chinaforceline.load(mainlandForecastLintList))

        // 其他地区预测数据
        if (resData.taiwanForecastPointList) {
            var taiwanForecastPointList = resData.taiwanForecastPointList
            var taiwanForecastLintList = resData.taiwanForecastLintList
            typhoonViewer.dataSources.add(dataSource_taiwanforcepoint.load(taiwanForecastPointList))
            typhoonViewer.dataSources.add(dataSource_taiwanforceline.load(taiwanForecastLintList))
        }
        if (resData.japanForecastPointList) {
            var japanForecastPointList = resData.japanForecastPointList
            var japanForecastLintList = resData.japanForecastLintList
            typhoonViewer.dataSources.add(dataSource_japanforcepoint.load(japanForecastPointList))
            typhoonViewer.dataSources.add(dataSource_japanforceline.load(japanForecastLintList))
        }
        if (resData.usaForecastPointList) {
            var usaForecastPointList = resData.usaForecastPointList
            var usaForecastLintList = resData.usaForecastLintList
            typhoonViewer.dataSources.add(dataSource_Americanforcepoint.load(usaForecastPointList))
            typhoonViewer.dataSources.add(dataSource_Americanforceline.load(usaForecastLintList))
        }
        if (resData.hkForecastPointList) {
            var hkForecastPointList = resData.hkForecastPointList
            var hkForecastLintList = resData.hkForecastLintList
            typhoonViewer.dataSources.add(dataSource_hkforcepoint.load(hkForecastPointList))
            typhoonViewer.dataSources.add(dataSource_hkforceline.load(hkForecastLintList))
        }

        pointsWindData[typhoonNum] = {
            viewer: 'viewer',
            resData: resData.windCircleList
        }
        addTime(typhoonNum, resData.windCircleList)
    }

    function addTime(typhoonNumber, resData) {
        var typhoonTime = []
        if (resData) {
            for (var i = 0; i < resData.length; i++) {
                typhoonTime.push(resData[i].time)
            }
            times[typhoonNumber] = {
                typhoonTime: typhoonTime
            }
            kTyphoons[typhoonNumber] = -1
        }
    }

    // 台风名称标签监听
    var tyNameListener = scene.postRender.addEventListener(function () {
        var simTyLocation02 = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, world01)
        if (simTyLocation02 && simTyLocation !== simTyLocation02) {
            var changeLeftX = simTyLocation02.x + 19
            var changeTopY = simTyLocation02.y - 13
            changeMarkerPosition(changeLeftX, changeTopY, typhoonNum)
        }
    })

    // 风圈监听
    var typhoonClockListener = typhoonViewer.clock.onTick.addEventListener(function (clock) {
        clock.multiplier = 10
        if (pointsWindData !== undefined && pointsWindData !== '') {
            drawWind(clock._currentTime)
        }
    })

    // 绘制风圈方法
    function drawWind(currentTytime) {
        var directionNorthEast = 2.5, directionSouthEast = 2.0, directionNorthWast = 1.0, directionSouthWest = 1.5//扇形方向东北2.5、东南2、西北1、西南1.5
        var anglex = 5.869565217396//扇形角度
        var R7 = 37 / 255.0, G7 = 191 / 255.0, B7 = 42 / 255.0, A7 = 0.3//7级风圈颜色
        var R10 = 240 / 255.0, G10 = 138 / 255.0, B10 = 45 / 255.0, A10 = 0.5//10级风圈颜色
        var R12 = 254 / 255.0, G12 = 58 / 255.0, B12 = 163 / 255.0, A12 = 0.6//12级风圈颜色
        //控制风圈绘画次数
        var typhoonNumbers = Object.keys(times).sort()
        for (var i = 0; i < typhoonNumbers.length; i++) {
            var typhoonNumber = typhoonNumbers[i]
            var pointsWind = pointsWindData[typhoonNumber].resData
            var kTyphoon = kTyphoons[typhoonNumber]
            var tyTime = times[typhoonNumber].typhoonTime
            for (var jTyphoon = 0, iTyphoon = 0; jTyphoon < pointsWind.length; jTyphoon++, iTyphoon++) {
                var lat = parseFloat(pointsWind[jTyphoon].lat)
                var lon = parseFloat(pointsWind[jTyphoon].lng)
                var radius7 = pointsWind[jTyphoon].radius7
                var radius10 = pointsWind[jTyphoon].radius10
                var radius12 = pointsWind[jTyphoon].radius12
                radius7 = radius7.split('|')
                radius10 = radius10.split('|')
                radius12 = radius12.split('|')
                var radiusNorthEast7 = radius7[0] * 1000
                var radiusSouthEast7 = radius7[1] * 1000
                var radiusNorthWast7 = radius7[2] * 1000
                var radiusSouthWest7 = radius7[3] * 1000
                var radiusNorthEast10 = radius10[0] * 1000
                var radiusSouthEast10 = radius10[1] * 1000
                var radiusNorthWast10 = radius10[2] * 1000
                var radiusSouthWest10 = radius10[3] * 1000
                var radiusNorthEast12 = radius12[0] * 1000
                var radiusSouthEast12 = radius12[1] * 1000
                var radiusNorthWast12 = radius12[2] * 1000
                var radiusSouthWest12 = radius12[3] * 1000
                var pointTimeEnd = tyTime[iTyphoon + 1]
                var pointTimecurrent = tyTime[iTyphoon]
                pointTimeEnd = Date.parse(pointTimeEnd)
                pointTimecurrent = Date.parse(pointTimecurrent)
                //拿到当前时间点并将当前时间转为国标时间点进行格式转化
                var currentTimetest = UtcTimeGBTime(currentTytime)
                var tyPrimitives = primitives[typhoonNumber]
                //判断当前时间，对当前点进行画扇形
                if ((jTyphoon === pointsWind.length - 1 && currentTimetest > pointTimecurrent) || (currentTimetest >= pointTimecurrent && currentTimetest < pointTimeEnd)) {
                    if (iTyphoon !== kTyphoon) {
                        if (iTyphoon + 1 === typhoonPoint.length - 1) {
                            // console.log('typhoonPoint is End')
                            // 达到终止时间后停止
                            clockViewModel.clockRange = Cesium.ClockRange.CLAMPED
                            typhoonStateToStop(typhoonNum)
                        }
                        if (tyPrimitives && tyPrimitives.length !== 0) {
                            removeSector(typhoonNumber)
                        }
                        tyPrimitives = []
                        //七级风圈
                        var primitiveFill = new setvisible(lat, lon, radiusNorthEast7, directionNorthEast, anglex, R7, G7, B7, A7)
                        tyPrimitives.push(primitiveFill)
                        primitiveFill = new setvisible(lat, lon, radiusNorthWast7, directionNorthWast, anglex, R7, G7, B7, A7)
                        tyPrimitives.push(primitiveFill)
                        primitiveFill = new setvisible(lat, lon, radiusSouthEast7, directionSouthEast, anglex, R7, G7, B7, A7)
                        tyPrimitives.push(primitiveFill)
                        primitiveFill = new setvisible(lat, lon, radiusSouthWest7, directionSouthWest, anglex, R7, G7, B7, A7)
                        tyPrimitives.push(primitiveFill)
                        //十级风圈
                        primitiveFill = new setvisible(lat, lon, radiusNorthEast10, directionNorthEast, anglex, R10, G10, B10, A10)
                        tyPrimitives.push(primitiveFill)
                        primitiveFill = new setvisible(lat, lon, radiusNorthWast10, directionNorthWast, anglex, R10, G10, B10, A10)
                        tyPrimitives.push(primitiveFill)
                        primitiveFill = new setvisible(lat, lon, radiusSouthEast10, directionSouthEast, anglex, R10, G10, B10, A10)
                        tyPrimitives.push(primitiveFill)
                        primitiveFill = new setvisible(lat, lon, radiusSouthWest10, directionSouthWest, anglex, R10, G10, B10, A10)
                        tyPrimitives.push(primitiveFill)
                        //十二级风圈
                        primitiveFill = new setvisible(lat, lon, radiusNorthEast12, directionNorthEast, anglex, R12, G12, B12, A12)
                        tyPrimitives.push(primitiveFill)
                        primitiveFill = new setvisible(lat, lon, radiusNorthWast12, directionNorthWast, anglex, R12, G12, B12, A12)
                        tyPrimitives.push(primitiveFill)
                        primitiveFill = new setvisible(lat, lon, radiusSouthEast12, directionSouthEast, anglex, R12, G12, B12, A12)
                        tyPrimitives.push(primitiveFill)
                        primitiveFill = new setvisible(lat, lon, radiusSouthWest12, directionSouthWest, anglex, R12, G12, B12, A12)
                        tyPrimitives.push(primitiveFill)
                        primitives[typhoonNumber] = tyPrimitives
                        kTyphoon = iTyphoon
                        kTyphoons[typhoonNumber] = kTyphoon
                    }
                }
            }
        }
    }

    /*
      风圈扇形调用方法
      lat:风圈经度
      lon:风圈纬度
      semiMinorAxis：风圈半径
      direction四个扇形的不同方位东北2.5，东南2，西北1，西南1.5
    */
    var setvisible = function (lat, lon, semiMinorAxis, direction, anglex, R, G, B, A) {
        var center = new Cesium.Cartographic(Cesium.Math.toRadians(lon), Cesium.Math.toRadians(lat), 0)
        var eopt = {}
        eopt.semiMinorAxis = semiMinorAxis
        eopt.semiMajorAxis = semiMinorAxis
        eopt.rotation = Math.PI * direction//Math.PI;//逆时针转
        eopt.center = Cesium.Cartesian3.fromRadians(center.longitude, center.latitude, center.height)
        eopt.granularity = Math.PI * 2.0 / parseFloat(180)
        //正南为0度
        eopt.angle = Math.PI * 3.0 / anglex
        var ellipse = EllipseGeometryLibraryEx.computeSectorEdgePositions(eopt)
        var raiseopt = {}
        raiseopt.ellipsoid = ellipsoid
        raiseopt.height = center.height
        raiseopt.extrudedHeight = 0
        ellipse.outerPositions = EllipseGeometryLibraryEx.raisePositionsToHeight(ellipse.outerPositions, raiseopt, false)
        //转换
        var cartesians = []
        for (var i = 0; i < ellipse.outerPositions.length; i += 3) {
            var cartesianTemp = new Cesium.Cartesian3(ellipse.outerPositions[i], ellipse.outerPositions[i + 1], ellipse.outerPositions[i + 2])
            cartesians.push(cartesianTemp)
        }
        //填充
        var cartesiansPointsFill = []
        var colorsFill = []
        for (var i = 1; i < cartesians.length; i++) {
            cartesiansPointsFill.push(cartesians[i - 1])
            cartesiansPointsFill.push(cartesians[i])
            cartesiansPointsFill.push(eopt.center)
            colorsFill.push(R)
            colorsFill.push(G)
            colorsFill.push(B)
            colorsFill.push(A)
            colorsFill.push(R)
            colorsFill.push(G)
            colorsFill.push(B)
            colorsFill.push(A)
            colorsFill.push(R)
            colorsFill.push(G)
            colorsFill.push(B)
            colorsFill.push(A)
        }
        var primitiveFill = new PrimitiveTriangles({
            'viewer': typhoonViewer,
            'Cartesians': cartesiansPointsFill,
            'Colors': colorsFill
        })
        return primitiveFill
    }

    /**
     * 删除风圈
     * @param typhoonNumber 台风编号
     */
    function removeSector(typhoonNumber) {
        var primitive = primitives[typhoonNumber]
        if (primitive) {
            for (var j = 0; j < primitive.length; j++) {
                primitive[j].remove()
            }
        }
        delete primitives[typhoonNumber]
    }

    /**
     * 鼠标单击事件
     */
    var handler3D = new Cesium.ScreenSpaceEventHandler(typhoonViewer.scene.canvas)
    handler3D.setInputAction(function (movement) {
        var drillPick = scene.drillPick(movement.position)
        typhoonClockListener()
        piontClick(drillPick)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    /**
     * 点击绘制风圈
     * @param drillPick
     */
    function piontClick(drillPick) {
        for (var i = 0; i < drillPick.length; i++) {
            var pick = drillPick[i]
            if (pick.id && pick.id.id && (pick.id.name === '热带风暴' || pick.id.name === '热带低压' || pick.id.name === '强热带风暴' || pick.id.name === '台风' || pick.id.name === '强台风' || pick.id.name === '超强台风') && pick.id.properties && pick.id.properties.number) {
                var idNumber = pick.id.id
                idNumber = idNumber.replace(/[^0-9]/ig,"")

                var typhoonNumber = pick.id.properties.number._value
                if (pointsWindData[typhoonNumber]) {
                    var directionNorthEast = 2.5, directionSouthEast = 2.0, directionNorthWast = 1.0, directionSouthWest = 1.5//扇形方向东北2.5、东南2、西北1、西南1.5
                    var anglex = 5.869565217396//扇形角度
                    var R7 = 37 / 255.0, G7 = 191 / 255.0, B7 = 42 / 255.0, A7 = 0.3//7级风圈颜色
                    var R10 = 240 / 255.0, G10 = 138 / 255.0, B10 = 45 / 255.0, A10 = 0.5//10级风圈颜色
                    var R12 = 254 / 255.0, G12 = 58 / 255.0, B12 = 163 / 255.0, A12 = 0.6//12级风圈颜色
                    var pointsWind = pointsWindData[typhoonNumber].resData
                    var lat = parseFloat(pointsWind[idNumber].lat)
                    var lon = parseFloat(pointsWind[idNumber].lng)
                    var radius7 = pointsWind[idNumber].radius7
                    var radius10 = pointsWind[idNumber].radius10
                    var radius12 = pointsWind[idNumber].radius12
                    radius7 = radius7.split('|')
                    radius10 = radius10.split('|')
                    radius12 = radius12.split('|')
                    var radiusNorthEast7 = radius7[0] * 1000
                    var radiusSouthEast7 = radius7[1] * 1000
                    var radiusNorthWast7 = radius7[2] * 1000
                    var radiusSouthWest7 = radius7[3] * 1000
                    var radiusNorthEast10 = radius10[0] * 1000
                    var radiusSouthEast10 = radius10[1] * 1000
                    var radiusNorthWast10 = radius10[2] * 1000
                    var radiusSouthWest10 = radius10[3] * 1000
                    var radiusNorthEast12 = radius12[0] * 1000
                    var radiusSouthEast12 = radius12[1] * 1000
                    var radiusNorthWast12 = radius12[2] * 1000
                    var radiusSouthWest12 = radius12[3] * 1000
                    var tyPrimitives = primitives[typhoonNumber]
                    if (tyPrimitives && tyPrimitives.length !== 0) {
                        removeSector(typhoonNum)
                    }
                    tyPrimitives = []
                    //七级风圈
                    var primitiveFill = new setvisible(lat, lon, radiusNorthEast7, directionNorthEast, anglex, R7, G7, B7, A7)
                    tyPrimitives.push(primitiveFill)
                    primitiveFill = new setvisible(lat, lon, radiusNorthWast7, directionNorthWast, anglex, R7, G7, B7, A7)
                    tyPrimitives.push(primitiveFill)
                    primitiveFill = new setvisible(lat, lon, radiusSouthEast7, directionSouthEast, anglex, R7, G7, B7, A7)
                    tyPrimitives.push(primitiveFill)
                    primitiveFill = new setvisible(lat, lon, radiusSouthWest7, directionSouthWest, anglex, R7, G7, B7, A7)
                    tyPrimitives.push(primitiveFill)
                    //十级风圈
                    primitiveFill = new setvisible(lat, lon, radiusNorthEast10, directionNorthEast, anglex, R10, G10, B10, A10)
                    tyPrimitives.push(primitiveFill)
                    primitiveFill = new setvisible(lat, lon, radiusNorthWast10, directionNorthWast, anglex, R10, G10, B10, A10)
                    tyPrimitives.push(primitiveFill)
                    primitiveFill = new setvisible(lat, lon, radiusSouthEast10, directionSouthEast, anglex, R10, G10, B10, A10)
                    tyPrimitives.push(primitiveFill)
                    primitiveFill = new setvisible(lat, lon, radiusSouthWest10, directionSouthWest, anglex, R10, G10, B10, A10)
                    tyPrimitives.push(primitiveFill)
                    //十二级风圈
                    primitiveFill = new setvisible(lat, lon, radiusNorthEast12, directionNorthEast, anglex, R12, G12, B12, A12)
                    tyPrimitives.push(primitiveFill)
                    primitiveFill = new setvisible(lat, lon, radiusNorthWast12, directionNorthWast, anglex, R12, G12, B12, A12)
                    tyPrimitives.push(primitiveFill)
                    primitiveFill = new setvisible(lat, lon, radiusSouthEast12, directionSouthEast, anglex, R12, G12, B12, A12)
                    tyPrimitives.push(primitiveFill)
                    primitiveFill = new setvisible(lat, lon, radiusSouthWest12, directionSouthWest, anglex, R12, G12, B12, A12)
                    tyPrimitives.push(primitiveFill)
                    primitives[typhoonNumber] = tyPrimitives
                    var kTyphoon = kTyphoons[typhoonNumber]
                    kTyphoon = idNumber
                    kTyphoons[typhoonNumber] = kTyphoon
                    // console.log(idNumber)
                    return
                }
            }
        }
    }

    /**
     * 清除台风一个台风数据
     */
    typhoon.deleteTyphoon = function () {
        removeSector(typhoonNum)
        delete times[typhoonNum]
        delete kTyphoons[typhoonNum]
        typhoonList.dataSource_point.entities.removeAll()
        typhoonList.dataSource_line.entities.removeAll()
        typhoonList.dataSource_modepoint.entities.removeAll()
        typhoonList.dataSource_chinaforcepoint.entities.removeAll()
        typhoonList.dataSource_chinaforceline.entities.removeAll()
        typhoonList.dataSource_japanforcepoint.entities.removeAll()
        typhoonList.dataSource_japanforceline.entities.removeAll()
        typhoonList.dataSource_taiwanforcepoint.entities.removeAll()
        typhoonList.dataSource_taiwanforceline.entities.removeAll()
        typhoonList.dataSource_Americanforcepoint.entities.removeAll()
        typhoonList.dataSource_Americanforceline.entities.removeAll()
        typhoonList.dataSource_hkforcepoint.entities.removeAll()
        typhoonList.dataSource_hkforceline.entities.removeAll()
        // 清除风圈侦听
        typhoonClockListener()
        // 清除台风标签监听
        tyNameListener()
        deleteMarkerItem(typhoonNum)
        handler3D.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }

    /**
     * 预测路线是否显示
     */
    typhoon.forecastingAgencyIsShow = function (agency, isShow) {
        switch (agency) {
            case '中国':
                if (isShow === true) {
                    typhoonList.dataSource_chinaforcepoint.show = true
                    typhoonList.dataSource_chinaforceline.show = true
                } else {
                    typhoonList.dataSource_chinaforcepoint.show = false
                    typhoonList.dataSource_chinaforceline.show = false
                }
                break
            case '日本':
                if (isShow === true) {
                    typhoonList.dataSource_japanforcepoint.show = true
                    typhoonList.dataSource_japanforceline.show = true
                } else {
                    typhoonList.dataSource_japanforcepoint.show = false
                    typhoonList.dataSource_japanforceline.show = false
                }
                break
            case '美国':
                if (isShow === true) {
                    typhoonList.dataSource_Americanforcepoint.show = true
                    typhoonList.dataSource_Americanforceline.show = true
                } else {
                    typhoonList.dataSource_Americanforcepoint.show = false
                    typhoonList.dataSource_Americanforceline.show = false
                }
                break
            case '中国台湾':
                if (isShow === true) {
                    typhoonList.dataSource_taiwanforcepoint.show = true
                    typhoonList.dataSource_taiwanforceline.show = true
                } else {
                    typhoonList.dataSource_taiwanforcepoint.show = false
                    typhoonList.dataSource_taiwanforceline.show = false
                }
                break
            case '中国香港':
                if (isShow === true) {
                    typhoonList.dataSource_hkforcepoint.show = true
                    typhoonList.dataSource_hkforceline.show = true
                } else {
                    typhoonList.dataSource_hkforcepoint.show = false
                    typhoonList.dataSource_hkforceline.show = false
                }
                break
        }
    }
    return typhoon
}

/*
 时间转换
 时间时间转换国标时间
 currentTytime当前时间
 currentTimetest国标时间时间戳
 */
function UtcTimeGBTime(currentTytime) {
    var currentDate = Cesium.JulianDate.toDate(currentTytime)
    var currentDate_Year = currentDate.getYear() + 1900
    var currentDate_Month = currentDate.getMonth() + 1
    var currentDate_Date = currentDate.getDate()
    var currentDate_Hours = currentDate.getHours()
    var currentDate_Minutes = currentDate.getMinutes()
    var currentDate_Seconds = currentDate.getSeconds()
    var currentDate_Milliseconds = currentDate.getMilliseconds()
    var currentTimeGB = currentDate_Year + '/' + currentDate_Month + '/' + currentDate_Date + ' ' + currentDate_Hours + ':' + currentDate_Minutes + ':' + currentDate_Seconds + ':' + currentDate_Milliseconds
    var currentTimetest_value = moment(new Date(currentTimeGB)).format('YYYY/MM/DD HH:mm:ss.S')
    var currentTimetestMide = Date.parse(currentTimetest_value)
    return currentTimetestMide
}

/**
 * 监测气泡位置
 */
// 弹窗位置监听用到的参数
var tyPosition, tyPosition2, tyCartesian
scene.postRender.addEventListener(tyCartesianListener)
function tyCartesianListener() {
    if (tyPosition !== tyPosition2) {
        if (tyCartesian !== undefined) {
            tyPosition2 = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, tyCartesian)
            if (tyPosition2) {
                var changeLeftX = tyPosition2.x + 18
                var changeTopY = tyPosition2.y - 31
                typhoonInfoPosition(changeLeftX, changeTopY)
            }
        }
    }
}

/**
 * 台风消息弹出框
 * @param drillPick
 * @param movement
 * @constructor Zmumu
 * pick 台风点击位置
 * typhoonDistance 台风点距离广州的距离
 * typhoonId 台风点的id
 * typhoonNumber 台风编号
 * typhoonName 台风名称
 * leftX 消息框屏幕X坐标
 * topY 消息框屏幕Y坐标
 * isCurrent 是否为当前台风
 */
function typhoonPopup(drillPick, movement) {
    if (drillPick.length === 0) {
        typhoonInfoDelete()
    }
    for (var i = 0; i < drillPick.length; i++) {
        var pick = drillPick[i]
        if (pick && pick.id && pick.id.id && (pick.id.name === '热带风暴' || pick.id.name === '热带低压' || pick.id.name === '强热带风暴' || pick.id.name === '台风' || pick.id.name === '强台风' || pick.id.name === '超强台风' || pick.id.name === '预测点') && pick.id._properties && pick.id._properties._number) {
            var clickEntity = pick.id
            var movement_pick = movement.position
            tyCartesian = clickEntity.position._value
            tyPosition = {x: movement_pick.x, y: movement_pick.y}
            var typhoonId = pick.id.id
            var typhoonNumber = clickEntity._properties._number._value
            var typhoonName = pick.id._properties._typhoonName._value
            if (pick.id.name === '预测点') {
                var organ = clickEntity._properties._organ._value
                var lng = clickEntity._properties._lng._value
                var lat = clickEntity._properties._lat._value
                var power = clickEntity._properties._power._value
                var pressure = clickEntity._properties._pressure._value
                var speed = clickEntity._properties._speed._value
                var strong = clickEntity._properties._strong._value
                var time = clickEntity._properties._time._value
                var info = {
                    lat: lat,
                    lng: lng,
                    power: power,
                    pressure: pressure,
                    speed: speed,
                    strong: strong,
                    time: time
                }
                typhoneForecastInfoShow(typhoonNumber, typhoonName, organ, info)
                tyCartesian = Cesium.Cartesian3.fromDegrees(lng, lat)
            } else {
                typhoonInfoShow(typhoonNumber, typhoonId, typhoonName)
            }
            return
        }
    }
}
