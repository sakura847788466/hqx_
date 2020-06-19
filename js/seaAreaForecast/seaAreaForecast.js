var primitivesSea
var seaTemperature

/**
 * 画海温网格
 * @param data
 */
function drawSeaTemperature(data) {
    var seaGrid = getSeaGrid()
    var size = seaGrid.base.size
    var gird = seaGrid.gird

    // 色带
    var colors = ['#0201B7', '#0000D5', '#003ED6', '#0047D9', '#0051DC', '#0059DF', '#0060E1', '#006AE4', '#0073E8', '#007DEB', '#0085EE',
        '#008DF0', '#0097F3', '#00A2F7', '#00A9F9', '#00B2FC', '#01BAFF', '#06BDED', '#0ABFDC', '#10C2CC',
        '#14C4BD', '#1AC7AA', '#1FC99B', '#24CC88', '#29CE79', '#2ED16B', '#33D357', '#38D64A', '#3FD932', '#42DA27', '#51DC26',
        '#5EDE28', '#69E029', '#78E12A', '#85E22B', '#94E42D', '#A0E62E', '#ADE82F', '#B9E930', '#C6EA31', '#D3EC33', '#E0EE34', '#F0EF35',
        '#FBF036', '#FFED37', '#FEE436', '#FDDE36', '#FCD635', '#FBCF35', '#FAC834', '#F9C234', '#F9BB34', '#F8B133', '#F7AC32', '#F6A532',
        '#F59C31', '#F49631', '#F49031', '#F38731', '#F28332', '#F27F32', '#F17934', '#F17336', '#F06E36', '#F06838', '#EF6238', '#EE5D39',
        '#EE583B', '#EE533C', '#ED4E3D', '#EC483E', '#EC423F'
    ]
    var proportion = []
    var proNum = 0
    for (var j = 0; j < 71; j++) {
        proportion.push(proNum)
        proNum = proNum + 0.5
    }

    var gridData = data.data
    var instances = []
    for (var i = 0; i < gridData.length; i++) {
        var cellId = gridData[i].cellId
        var zSST = gridData[i].sst
        var seaName = ''
        if (gridData[i].seaName) {
            seaName = gridData[i].seaName
        }
        var position = gird[cellId.toString()]
        var z = (zSST - 1) / 34

        var color = getColor(colors, proportion, z)
        instances.push(new Cesium.GeometryInstance({
            geometry: new Cesium.RectangleGeometry({
                rectangle: Cesium.Rectangle.fromDegrees(position[0], parseFloat(position[1]) - parseFloat(size), parseFloat(position[0]) + parseFloat(size), position[1])
            }),
            id: '海温' + cellId.toString() + ';' + seaName.toString() + ';' + zSST.toString() + ';' + (parseFloat(position[0]) + parseFloat(size) / 2).toString() + ';' + (parseFloat(position[1]) - parseFloat(size) / 2).toString(),
            attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString(color.toString()))
            }
        }))
    }

    primitivesSea = new Cesium.PrimitiveCollection()
    primitivesSea.add(new Cesium.Primitive({
        name: '海温',
        geometryInstances: instances,
        appearance: new Cesium.PerInstanceColorAppearance({
            flat: true
        })
    }))
    scene.primitives.add(primitivesSea)
}
// updateSeaTemperature('1591228800000')
/**
 * 设置海温网格
 * @param readTime 13位数的时间戳
 */
function updateSeaTemperature(readTime) {
    var url = './data/近海预报/海温/' + readTime.toString() + '.json'
    $.get(url, function(data) {
        // console.log(data)
        // removePrimitivesSea()
        drawSeaTemperature(data)
    })
}

/**
 * 画海浪网格
 * @param data
 */
function drawSurf(data) {
    var seaGrid = getSeaGrid()
    var size = seaGrid.base.size
    var gird = seaGrid.gird

    // 色带
    var colors = ['#7bcce0', '#71c5da', '#67bfd5', '#5eb8cf', '#54b2ca', '#4aabc4', '#45a5c0', '#409fbd', '#3a9ab9', '#3594b6', '#308eb2',
        '#3088b1', '#3082b0', '#307dae', '#3077ad', '#3071ac', '#326da9', '#3568a6', '#3764a2', '#3a5f9f',
        '#3c5b9c', '#405897', '#445593', '#48538e', '#4c508a', '#504d85', '#554b7f', '#5a4978', '#604772', '#65456b', '#6a4365',
        '#70425e', '#754157', '#7b3f51', '#803e4a', '#863d43', '#8c4549', '#914d50', '#975656', '#9c5e5d', '#a26663', '#a8716e', '#ad7d79',
        '#b38883', '#b8948e', '#be9f99'
    ]
    var proportion = []
    var proNum = 0.5
    for (var j = 0; j < 46; j++) {
        proportion.push(proNum)
        var pushNum = parseFloat(proNum) + 0.1
        proNum = parseFloat(pushNum.toFixed(1))
    }

    var gridData = data.data
    var instances = []
    for (var i = 0; i < gridData.length; i++) {
        var cellId = gridData[i].cellId
        var zSST = gridData[i].waveHeight
        var seaName = ''
        if (gridData[i].seaName) {
            seaName = gridData[i].seaName
        }
        var position = gird[cellId.toString()]
        var z = parseFloat(zSST) - 0.5 / 5

        var color = getColor(colors, proportion, z)
        instances.push(new Cesium.GeometryInstance({
            geometry: new Cesium.RectangleGeometry({
                rectangle: Cesium.Rectangle.fromDegrees(position[0], parseFloat(position[1]) - parseFloat(size), parseFloat(position[0]) + parseFloat(size), position[1])
            }),
            id: '海浪' + cellId.toString() + ';' + seaName.toString() + ';' + zSST.toString() + ';' + (parseFloat(position[0]) + parseFloat(size) / 2).toString() + ';' + (parseFloat(position[1]) - parseFloat(size) / 2).toString(),
            attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString(color.toString()))
            }
        }))
    }

    primitivesSea = new Cesium.PrimitiveCollection()
    primitivesSea.add(new Cesium.Primitive({
        name: '海浪',
        geometryInstances: instances,
        appearance: new Cesium.PerInstanceColorAppearance({
            flat: true
        })
    }))
    scene.primitives.add(primitivesSea)
}
/**
 * 设置海浪网格
 * @param readTime 13位数的时间戳
 */
function updateSurf(readTime) {
    var url = './data/近海预报/海浪/' + readTime.toString() + '.json'
    $.get(url, function(data) {
        drawSurf(data)
    })
}

/**
 * 画海风网格
 * @param data
 */
function drawSeaBreeze(data) {
    var seaGrid = getSeaGrid()
    var size = seaGrid.base.size
    var gird = seaGrid.gird

    // 色带
    var colors = ['#6271b7', '#6073b4', '#5f76b1', '#5d78af', '#5c7aac', '#5a7da9', '#587fa6', '#5781a3', '#5583a1', '#54869e', '#52889b',
        '#518a98', '#518c94', '#508d91', '#4f8f8d', '#4f918a', '#4e9387', '#4d9583', '#4c9680', '#4c987c',
        '#4b9a79', '#4d9a75', '#4e9b71', '#509b6d', '#519c69', '#539c65', '#549c61', '#559d5d', '#579d59', '#589e55', '#5a9e51',
        '#5d9a51', '#619650', '#649250', '#688e4f', '#6b8a4f', '#6e864f', '#72824e', '#757e4e', '#797a4d', '#7c764d', '#7f724e', '#826d50',
        '#856951', '#886452', '#8b6054', '#8f5c55', '#925756', '#955357', '#984e59', '#9b4a5a', '#994a5b', '#984a5c', '#964a5d', '#944a5e',
        '#934a60', '#914a61', '#8f4a62', '#8d4a63', '#8c4a64', '#8a4a65', '#884c67', '#864d69', '#844f6b', '#82506d', '#81526f', '#7f5471',
        '#7d5573', '#7b5775', '#795877', '#775a79', '#745e7c', '#726280', '#6f6683', '#6d6a87', '#6a6e8a', '#67728d', '#657691', '#627a94',
        '#607e98', '#5d829b'
    ]
    var proportion = []
    var proNum = 0
    for (var j = 0; j < 81; j++) {
        proportion.push(proNum)
        proNum = proNum + 0.5
    }

    var gridData = data.data
    var instances = []
    for (var i = 0; i < gridData.length; i++) {
        var cellId = gridData[i].cellId
        var zSST = gridData[i].windSpeed
        var seaName = ''
        if (gridData[i].seaName) {
            seaName = gridData[i].seaName
        }
        var windDirection = ''
        if (gridData[i].windDirection) {
            windDirection = gridData[i].windDirection
        }
        var position = gird[cellId.toString()]
        var z = parseFloat(zSST) / 40

        var color = getColor(colors, proportion, z)
        instances.push(new Cesium.GeometryInstance({
            geometry: new Cesium.RectangleGeometry({
                rectangle: Cesium.Rectangle.fromDegrees(position[0], parseFloat(position[1]) - parseFloat(size), parseFloat(position[0]) + parseFloat(size), position[1])
            }),
            id: '海风' + cellId.toString() + ';' + seaName.toString() + ';' + zSST.toString() + ';' + (parseFloat(position[0]) + parseFloat(size) / 2).toString() + ';' + (parseFloat(position[1]) - parseFloat(size) / 2).toString() + ';' + windDirection.toString(),
            attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString(color.toString()))
            }
        }))
    }

    primitivesSea = new Cesium.PrimitiveCollection()
    primitivesSea.add(new Cesium.Primitive({
        name: '海风',
        geometryInstances: instances,
        appearance: new Cesium.PerInstanceColorAppearance({
            flat: true
        })
    }))
    scene.primitives.add(primitivesSea)
}
/**
 * 设置海风网格
 * @param readTime 13位数的时间戳
 */
function updateSeaBreeze(readTime) {
    var url = './data/近海预报/海风/' + readTime.toString() + '.json'
    $.get(url, function(data) {
        drawSeaBreeze(data)
    })
}

/**
 * 根据取色值在色带上获取颜色
 * @param colors 色带
 * @param proportion 比例尺
 * @param z 取色值
 * @returns {*} 对应颜色
 */
function getColor(colors, proportion, z) {
    var colorI = colors.length
    var damainValue = []
    for (var i = 1; i < proportion.length; i++) {
        var damainV = (parseFloat(proportion[i]) - parseFloat(proportion[0])) / (parseFloat(proportion[proportion.length - 1]) - parseFloat(proportion[0]))
        damainValue.push(parseFloat(damainV))
    }
    var colorRange = d3.range(colorI).map(function(i) {
        return colors[i]
    })
    var threshold = d3.scaleThreshold().domain(damainValue).range(colorRange)
    return threshold(z)
}

/**
 * 删除网格
 */
function removePrimitivesSea() {
    // console.log(scene.primitives)
    for (var j = 1; j < viewer.scene.primitives.length; j++) {
        var shadedImagery = viewer.scene.primitives.get(j);
        viewer.scene.primitives.remove(shadedImagery);
        j--
    }
    if (primitivesSea) {
        primitivesSea.removeAll()
        primitivesSea = undefined
        console.log(scene.primitives)
    }
    if (seaTemperature) {
        seaTemperature.delete()
        seaTemperature = undefined
    }
}

/**
 * 网格点击
 * @param pickId
 * @param type
 */
var seaTemperatureClick = function(pickId, type) {
    var sea = {}
    var infos = pickId.split(';')
        // console.log(infos)
    var info
    if (type == '海温') {
        info = {
            type: type,
            params: {
                code: infos[0],
                areaName: infos[1],
                sst: infos[2],
                lon: infos[3],
                lat: infos[4]
            }
        }
    }
    if (type == '海浪') {
        info = {
            type: type,
            params: {
                code: infos[0],
                areaName: infos[1],
                waveHeight: infos[2],
                lon: infos[3],
                lat: infos[4]
            }
        }
    }
    if (type == '海风') {
        info = {
            type: type,
            params: {
                code: infos[0],
                areaName: infos[1],
                windSpeed: infos[2],
                lon: infos[3],
                lat: infos[4],
                windDirection: infos[5]
            }
        }
    }
    console.log(info)
    areaInfoBox(info)
        // 弹窗位置监听
    var world = Cesium.Cartesian3.fromDegrees(parseFloat(infos[3]), parseFloat(infos[4]))
    var screenLocation = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, world)
    var seaLocation = { x: screenLocation.x, y: screenLocation.y }
    var seaListener = scene.postRender.addEventListener(function() {
        var seaLocation02 = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, world)
        if (seaLocation02 && seaLocation !== seaLocation02) {
            var changeLeftX = seaLocation02.x + 10;
            var changeTopY = seaLocation02.y - 65;
            // if (!isLeftFold) {
            //     changeLeftX = changeLeftX + 400
            // }
            changeRemove(changeLeftX, changeTopY)
        }
    })
    var seaGrid = getSeaGrid()
    var size = seaGrid.base.size
    var geometryPolyline = viewer.entities.add({
        name: 'seaGeometryPolyline',
        polygon: {
            hierarchy: {
                positions: Cesium.Cartesian3.fromDegreesArray([
                    parseFloat(infos[3]) - parseFloat(size) / 2, parseFloat(infos[4]) - parseFloat(size) / 2,
                    parseFloat(infos[3]) + parseFloat(size) / 2, parseFloat(infos[4]) - parseFloat(size) / 2,
                    parseFloat(infos[3]) + parseFloat(size) / 2, parseFloat(infos[4]) + parseFloat(size) / 2,
                    parseFloat(infos[3]) - parseFloat(size) / 2, parseFloat(infos[4]) + parseFloat(size) / 2
                ]),
                holes: [{
                    positions: Cesium.Cartesian3.fromDegreesArray([
                        parseFloat(infos[3]) - parseFloat(size) / 2 + 0.08, parseFloat(infos[4]) - parseFloat(size) / 2 + 0.08,
                        parseFloat(infos[3]) + parseFloat(size) / 2 - 0.08, parseFloat(infos[4]) - parseFloat(size) / 2 + 0.08,
                        parseFloat(infos[3]) + parseFloat(size) / 2 - 0.08, parseFloat(infos[4]) + parseFloat(size) / 2 - 0.08,
                        parseFloat(infos[3]) - parseFloat(size) / 2 + 0.08, parseFloat(infos[4]) + parseFloat(size) / 2 - 0.08
                    ]),
                }]
            },
            height: 0,
            material: Cesium.Color.fromCssColorString('#ffffff')
        }
    })
    sea.delete = function() {
        viewer.entities.remove(geometryPolyline)
        seaListener()
        clearareaBox()
    }
    return sea
}

function seaTemperaturePick(pick) {
    if (seaTemperature) {
        seaTemperature.delete()
        seaTemperature = undefined
    }
    if (pick && pick.id) {
        var pickId = pick.id
            // pickId = pickId.toString().substring(0, 2)
        var type = pickId.toString().substring(0, 2)
        if (type == '海温' || type == '海浪' || type == '海风') {
            pickId = pick.id.toString().substring(2)
                // console.log(pick)
            seaTemperature = new seaTemperatureClick(pickId, type)
        }
    }
}