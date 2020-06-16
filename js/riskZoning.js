/**
 * 风险区划相关数据
 * @param data
 */
var riskData = function (data) {
    // console.log('加载')
    var riskData = {}
    var layers = []
    var type
    if (data.code === 200 && data.data) {
        var _riskData = data.data
        var riskLaysers
        if (_riskData.layers) {
            riskLaysers = _riskData.layers
            for (var i = 0; i < riskLaysers.length; i++) {
                var riskLayser = riskLaysers[i]
                layers.push(riskLayser.layer)
                addGeoserverProvider(riskLayser.url, riskLayser.layer, riskLayser.tileMatrixSetID, riskLayser.format, riskLayser.style, riskLayser.alpha)
            }
        }
        var riskPoints
        if (_riskData.points) {
            riskPoints = _riskData.points
            for (var i = 0; i < riskPoints.length; i++) {
                var riskPoint = riskPoints[i]
                type = riskPoint.type
                addBillboard(riskPoint.id, riskPoint.name, type, riskPoint.longitude, riskPoint.latitude, riskPoint.img, 1)
            }
        }
    }
    riskData.remove = function () {
        // console.log('清除了')
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i]
            removeImageryProviderByLayer(layer)
        }
        if (type) {
            removeBillboardByBillboardName(type)
        }
    }
    riskData.updateAlpha = function (alpha) {
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i]
            updateImageryProviderAlphaByLayer(layer, alpha)
        }
    }
    return riskData
}

/**
 * 风险区划
 */
var geoJsonDatasourceRisk
var entRiskArr = {
    entityID: undefined,
    color: undefined,
    entity: new Cesium.Entity()
}
function loadRiskJson() {
    var options = {
        clampToGround: true, // 开启贴地
    }
    var polygon = Cesium.GeoJsonDataSource.load('./data/geoJson/dangerZone.json', options)
    // var polygon = Cesium.GeoJsonDataSource.load('https://jy-fbc-pro20180012.oss-cn-shenzhen.aliyuncs.com/PRO20180012/stormTide/危险性区划.json', options)
    polygon.then(function (dataSource) {
        viewer.dataSources.add(dataSource)
        geoJsonDatasourceRisk = dataSource
        var polygonEntities = dataSource.entities.values
        for (var i = 0; i < polygonEntities.length; i++) {
            var polygonEntity = polygonEntities[i]
            polygonEntity.name = 'dangerZone'
            polygonEntity.polygon.material = Cesium.Color.fromAlpha(Cesium.Color.fromCssColorString('#e61f42'), 0)
            polygonEntity.polygon.name = polygonEntity.properties.XZQMC._value.toString()
            polygonEntity.polygon.outline = false
            polygonEntity.xOBJECT = polygonEntity.properties.x._value
            polygonEntity.yOBJECT = polygonEntity.properties.y._value
        }
    })
}

/**
 * 设置实体高度渐增
 * @param ent
 * @param maxH
 * @param speed
 */
function setRiskEntityHeightAdd(ent, maxH, speed) {
    var entHeight = 1
    ent.polygon.extrudedHeight = new Cesium.CallbackProperty(function () {
        if (entHeight < parseInt(maxH)) {
            entHeight += parseInt(speed)
        }
        return entHeight
    }, false)
}

/**
 * 根据XY查找设置风险区柱体参数
 * @param cylinderBodyConfig
 */
function riskByXY(cylinderBodyConfig) {
    if (cylinderBodyConfig) {
        var entities = geoJsonDatasourceRisk.entities.values
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i]
            var longitude = entity.xOBJECT.toString()
            var latitude = entity.yOBJECT.toString()
            if (longitude.substr(0, 10) === cylinderBodyConfig.longitude && latitude.substr(0, 9) === cylinderBodyConfig.latitude) {
                setRiskEntity(entity, cylinderBodyConfig)
                return
            }
        }
    }
}

/**
 * 风险区柱体参数
 * @param ent
 * @param cylinderBodyConfig
 */
function setRiskEntity(ent, cylinderBodyConfig) {
    if (cylinderBodyConfig) {
        if (entRiskArr.entityID && entRiskArr.entityID === ent.id) {
            var entt = geoJsonDatasourceRisk.entities.getById(entRiskArr.entityID)
            if (entt) {
                entt.polygon.extrudedHeight = 1
                entRiskArr.entityID = undefined
                removeBillboardByBillboardName('coordinate')
                disasterInfoDelete()
            }
            return
        }
        if (entRiskArr.entityID && geoJsonDatasourceRisk) {
            var entt = geoJsonDatasourceRisk.entities.getById(entRiskArr.entityID)
            // entt.polygon.material = entRiskArr.color
            // entt.polygon.material = entRiskArr.entity.polygon.material
            if (entt) {
                entt.polygon.extrudedHeight = 1
            }
        }
        entRiskArr.entityID = ent.id
        entRiskArr.color = ent.polygon.material.getValue(viewer.clock.currentTime)
        entRiskArr.entity = ent
        ent.polygon.material = Cesium.Color.fromAlpha(Cesium.Color.fromBytes(parseInt(cylinderBodyConfig.r), parseInt(cylinderBodyConfig.g), parseInt(cylinderBodyConfig.b), parseInt(cylinderBodyConfig.alpha)), parseInt(cylinderBodyConfig.alpha))
        setRiskEntityHeightAdd(ent, cylinderBodyConfig.maxH, cylinderBodyConfig.speed)
    }
}

/**
 * 风险区划鼠标单击
 * @param pick
 */
function riskByMose(pick) {
    if (pick && pick.id && pick.id.polygon && pick.id.name && pick.id.name === 'dangerZone') {
        var entity = pick.id
        var longitude = entity.xOBJECT.toString()
        var latitude = entity.yOBJECT.toString()
        // if (entRiskArr.entityID && geoJsonDatasourceRisk) {
        //     var entt = geoJsonDatasourceRisk.entities.getById(entRiskArr.entityID)
        //     entt.polygon.material = entRiskArr.color
        //     entt.polygon.material = entRiskArr.entity.polygon.material
        //     entt.polygon.extrudedHeight = 1
        //     entt = entRiskArr.entity
        // }
        // entRiskArr.entityID = entity.id
        // entRiskArr.color = entity.polygon.material.getValue(viewer.clock.currentTime)
        // entRiskArr.color = entity.polygon.material
        // entRiskArr.entity = entity

        adminiUnitStructure(longitude.substr(0, 10), latitude.substr(0, 9))
    } else {
        if (entRiskArr.entityID && geoJsonDatasourceRisk) {
            var entt = geoJsonDatasourceRisk.entities.getById(entRiskArr.entityID)
            if (entt) {
                entt.polygon.extrudedHeight = 1
                entRiskArr.entityID = undefined
            }
        }
    }
}
