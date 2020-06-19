var Arrow_DrawDatas;
var primitiveArrow;

 function Arrowload(time){
  	addDynamicArrow("u"+time,"v"+time)
}

//Arrowload(1591228800000)
function removeArrow_Draw_Plugin(){
	 if (this.primitiveArrow != null) {
	    viewer.scene.primitives.remove(this.primitiveArrow);        
	}
}
 function addDynamicArrow(u,v){
        var dataobj=Arrow_DrawDatas;               
        var world;
    	var vertices = [];
        var attcolor = [];
        var indices = [];
        var udata_ = [];
        var vdata_ = [];
        var vertexShader=getVS();
        var fragmentShader= getFS();
        var rowNum = dataobj["lonNum"];
        var colNum = dataobj["latNum"];
        var lonInterval = dataobj["lonInterval"];
        var latInterval = dataobj["latInterval"];
        var lonStart = dataobj["lonStart"];
        var latStart = dataobj["latStart"];
        var lonEnd = dataobj["lonEnd"];
        var latEnd = dataobj["latEnd"];
        var Uelem = dataobj[u];
        var Velem = dataobj[v];
        var WindSpeed = [];
        var arrowSamplingStep = 0.7;
        var arrowSize = 0.2;
        var ellipsoid=viewer.scene.globe.ellipsoid;
        for(var i = 0; i <  rowNum * colNum;i++) {
            var u = Uelem[i];
            var v = Velem[i];
            var square_ = u * u + v * v;
             WindSpeed[i] = Math.sqrt(square_);
            if (square_ < 0.0000001) {
                udata_[i] = 0.0;
                vdata_[i] = 0.0;
            } else {
                udata_[i] = u / Math.sqrt(square_);
                vdata_[i] = v / Math.sqrt(square_);
            }
        }
        var k;
    for (var y = 0; y < colNum; y ++ ) {
        for (var x = 0; x < rowNum; x ++ ) {
        var index = x + y * rowNum;
        var WindSp = parseInt(WindSpeed[index].toFixed(0));
        var u = udata_[index];
        var v = vdata_[index];
        if (Math.sqrt(( u*u + v*v )) < 0.0000001)
            continue;
        if(WindSp>0&&WindSp<=2){
        	//start 
            var longitude = lonStart + lonInterval * x;
            var latitude  = latStart + latInterval * y;
            var cartographic=Cesium.Cartographic.fromDegrees(longitude, latitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		    //end
		    var longitudeE = x+ u * arrowSamplingStep;
            var latitudeE  = y+ v * arrowSamplingStep;
            var elongitude = lonStart + longitudeE * lonInterval;
            var elatitude = latStart + latitudeE * latInterval;
            var cartographic=Cesium.Cartographic.fromDegrees(lonStart + longitudeE * lonInterval, latStart + latitudeE * latInterval, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
            var veclength = vertices.length / 3.0;
            indices.push( veclength - 2.0, veclength - 1.0); // line one
        }
        if(WindSp>2&&WindSp<=6){
        	//start 
            var longitude = lonStart + lonInterval * x;
            var latitude  = latStart + latInterval * y;
            var cartographic=Cesium.Cartographic.fromDegrees(longitude, latitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		    //end
		    var longitudeE = x+ u * arrowSamplingStep;
            var latitudeE  = y+ v * arrowSamplingStep;
            var elongitude = lonStart + longitudeE * lonInterval;
            var elatitude = latStart + latitudeE * latInterval;
            var cartographic=Cesium.Cartographic.fromDegrees(lonStart + longitudeE * lonInterval, latStart + latitudeE * latInterval, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		     //第一杆
            k = [-v , u];
            k = Normalize(k);
            if(WindSp>2&&WindSp<=4){	                
            longitude = lonStart + lonInterval * (arrowSize/2 * k[0]+x);
            latitude  = latStart + latInterval * (arrowSize/2 * k[1]+y);	                    
            }else{	                    
            longitude = lonStart + lonInterval * (arrowSize * k[0]+x);
            latitude  = latStart + latInterval * (arrowSize * k[1]+y);	                    
            }
            var cartographic=Cesium.Cartographic.fromDegrees(longitude, latitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
            var veclength = vertices.length / 3.0;
        
            indices.push( veclength - 3.0, veclength - 2.0); // line one
            indices.push( veclength - 3.0, veclength - 1.0); // line one
        }
        if(WindSp>6&&WindSp<=10){
        	//start 
            var longitude = lonStart + lonInterval * x;
            var latitude  = latStart + latInterval * y;
            var cartographic=Cesium.Cartographic.fromDegrees(longitude, latitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		    //end
		    var longitudeE = x+ u * arrowSamplingStep;
            var latitudeE  = y+ v * arrowSamplingStep;
            var elongitude = lonStart + longitudeE * lonInterval;
            var elatitude = latStart + latitudeE * latInterval;
            var cartographic=Cesium.Cartographic.fromDegrees(lonStart + longitudeE * lonInterval, latStart + latitudeE * latInterval, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		     //第一杆结束
		      k = [-v , u];
            k = Normalize(k)
            longitude = lonStart + lonInterval * (arrowSize * k[0]+x);
            latitude  = latStart + latInterval * (arrowSize * k[1]+y);	
            var cartographic=Cesium.Cartographic.fromDegrees(longitude, latitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		    //第二杆开始点
            var longitudeE =  u * arrowSamplingStep/5;
            var latitudeE  =  v * arrowSamplingStep/5;
            var elongitude = lonStart + (longitudeE+x) * lonInterval;
            var elatitude = latStart + (latitudeE+y)* latInterval;
            var cartographic=Cesium.Cartographic.fromDegrees(elongitude, elatitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		    //第二杆结束
            k = [-v , u];
            k = Normalize(k)
            if(WindSp>=6&&WindSp<=8){
            longitude = lonStart + lonInterval * (longitudeE+arrowSize/2 * k[0]+x);
            latitude  = latStart + latInterval * (latitudeE+arrowSize/2 * k[1]+y);	
            }else{
            longitude = lonStart + lonInterval * (longitudeE+arrowSize * k[0]+x);
            latitude  = latStart + latInterval * (latitudeE+arrowSize * k[1]+y);		
            }
            var cartographic=Cesium.Cartographic.fromDegrees(longitude, latitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);   
            var veclength = vertices.length / 3.0;
        
             indices.push( veclength - 5.0, veclength - 4.0); // line one
             indices.push( veclength - 5.0, veclength - 3.0); // line twe
             indices.push( veclength - 2.0, veclength - 1.0);//line three
        }
        if(WindSp>10&&WindSp<=14){
        	//start 
            var longitude = lonStart + lonInterval * x;
            var latitude  = latStart + latInterval * y;
            var cartographic=Cesium.Cartographic.fromDegrees(longitude, latitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		    //end
		    var longitudeE = x+ u * arrowSamplingStep;
            var latitudeE  = y+ v * arrowSamplingStep;
            var elongitude = lonStart + longitudeE * lonInterval;
            var elatitude = latStart + latitudeE * latInterval;
            var cartographic=Cesium.Cartographic.fromDegrees(lonStart + longitudeE * lonInterval, latStart + latitudeE * latInterval, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		     //第一杆结束
		      k = [-v , u];
            k = Normalize(k)
            longitude = lonStart + lonInterval * (arrowSize * k[0]+x);
            latitude  = latStart + latInterval * (arrowSize * k[1]+y);	
            var cartographic=Cesium.Cartographic.fromDegrees(longitude, latitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		    //第二杆开始点
            var longitudeE =  u * arrowSamplingStep/5;
            var latitudeE  =  v * arrowSamplingStep/5;
            var elongitude = lonStart + (longitudeE+x) * lonInterval;
            var elatitude = latStart + (latitudeE+y)* latInterval;
            var cartographic=Cesium.Cartographic.fromDegrees(elongitude, elatitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		    //第二杆结束
		    k = [-v , u];
            k = Normalize(k)	                    
            longitude = lonStart + lonInterval * (longitudeE+arrowSize * k[0]+x);
            latitude  = latStart + latInterval * (latitudeE+arrowSize * k[1]+y);
            var cartographic=Cesium.Cartographic.fromDegrees(longitude, latitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		    //第三杆开始点
            var longitudeE =  u * arrowSamplingStep/2.5;
            var latitudeE  =  v * arrowSamplingStep/2.5;
            var elongitude = lonStart + (longitudeE+x) * lonInterval;
            var elatitude = latStart + (latitudeE+y)* latInterval;
            var cartographic=Cesium.Cartographic.fromDegrees(elongitude, elatitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		    //第三杆结束
            k = [-v , u];
            k = Normalize(k)	
            if(WindSp>10&&WindSp<=12){
            longitude = lonStart + lonInterval * (longitudeE+arrowSize/2 * k[0]+x);
            latitude  = latStart + latInterval * (latitudeE+arrowSize/2 * k[1]+y);	
            }else{
            longitude = lonStart + lonInterval * (longitudeE+arrowSize * k[0]+x);
            latitude  = latStart + latInterval * (latitudeE+arrowSize * k[1]+y);		
            }
            var cartographic=Cesium.Cartographic.fromDegrees(longitude, latitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
            var veclength = vertices.length / 3.0;
        
             indices.push( veclength - 7.0, veclength - 6.0); // line one
             indices.push( veclength - 7.0, veclength - 5.0); // line twe
             indices.push( veclength - 4.0, veclength - 3.0);//line three
             indices.push( veclength - 2.0, veclength - 1.0);//line three
            
        }
        if(WindSp>14&&WindSp<=18){
        	//start 
            var longitude = lonStart + lonInterval * x;
            var latitude  = latStart + latInterval * y;
            var cartographic=Cesium.Cartographic.fromDegrees(longitude, latitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		    //end
		    var longitudeE = x+ u * arrowSamplingStep;
            var latitudeE  = y+ v * arrowSamplingStep;
            var elongitude = lonStart + longitudeE * lonInterval;
            var elatitude = latStart + latitudeE * latInterval;
            var cartographic=Cesium.Cartographic.fromDegrees(lonStart + longitudeE * lonInterval, latStart + latitudeE * latInterval, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		     //第一杆结束
		      k = [-v , u];
            k = Normalize(k)
            longitude = lonStart + lonInterval * (arrowSize * k[0]+x);
            latitude  = latStart + latInterval * (arrowSize * k[1]+y);	
            var cartographic=Cesium.Cartographic.fromDegrees(longitude, latitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		    //第二杆开始点
            var longitudeE =  u * arrowSamplingStep/5;
            var latitudeE  =  v * arrowSamplingStep/5;
            var elongitude = lonStart + (longitudeE+x) * lonInterval;
            var elatitude = latStart + (latitudeE+y)* latInterval;
            var cartographic=Cesium.Cartographic.fromDegrees(elongitude, elatitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		    //第二杆结束
		    k = [-v , u];
            k = Normalize(k)	                    
            longitude = lonStart + lonInterval * (longitudeE+arrowSize * k[0]+x);
            latitude  = latStart + latInterval * (latitudeE+arrowSize * k[1]+y);
            var cartographic=Cesium.Cartographic.fromDegrees(longitude, latitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		    //第三杆开始点
            var longitudeE =  u * arrowSamplingStep/2.5;
            var latitudeE  =  v * arrowSamplingStep/2.5;
            var elongitude = lonStart + (longitudeE+x) * lonInterval;
            var elatitude = latStart + (latitudeE+y)* latInterval;
            var cartographic=Cesium.Cartographic.fromDegrees(elongitude, elatitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		     //第三杆结束
            k = [-v , u];
            k = Normalize(k)	                    
            longitude = lonStart + lonInterval * (longitudeE+arrowSize * k[0]+x);
            latitude  = latStart + latInterval * (latitudeE+arrowSize * k[1]+y);
            var cartographic=Cesium.Cartographic.fromDegrees(longitude, latitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		    //第四杆开始点
            var longitudeE =  u * arrowSamplingStep/1.6666;
            var latitudeE  =  v * arrowSamplingStep/1.6666;
            var elongitude = lonStart + (longitudeE+x) * lonInterval;
            var elatitude = latStart + (latitudeE+y)* latInterval;
            var cartographic=Cesium.Cartographic.fromDegrees(elongitude, elatitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		     //第四杆结束
            k = [-v , u];
            k = Normalize(k)
            if(WindSp>14&&WindSp<=16){
            longitude = lonStart + lonInterval * (longitudeE+arrowSize/2 * k[0]+x);
            latitude  = latStart + latInterval * (latitudeE+arrowSize/2 * k[1]+y);
            }else{
            longitude = lonStart + lonInterval * (longitudeE+arrowSize * k[0]+x);
            latitude  = latStart + latInterval * (latitudeE+arrowSize * k[1]+y);	
            }
             var cartographic=Cesium.Cartographic.fromDegrees(longitude, latitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
            var veclength = vertices.length / 3.0;
             indices.push( veclength - 9.0, veclength - 8.0); // line one
             indices.push( veclength - 9.0, veclength - 7.0); // line twe
             indices.push( veclength - 6.0, veclength - 5.0);//line three
             indices.push( veclength - 4.0, veclength - 3.0);//line three
             indices.push( veclength - 2.0, veclength - 1.0);//line three
        }
        if(WindSp>20){
        	//start 
            var longitude = lonStart + lonInterval * x;
            var latitude  = latStart + latInterval * y;
            var cartographic=Cesium.Cartographic.fromDegrees(longitude, latitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		    //end
		    var longitudeE = x+ u * arrowSamplingStep;
            var latitudeE  = y+ v * arrowSamplingStep;
            var elongitude = lonStart + longitudeE * lonInterval;
            var elatitude = latStart + latitudeE * latInterval;
            var cartographic=Cesium.Cartographic.fromDegrees(lonStart + longitudeE * lonInterval, latStart + latitudeE * latInterval, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		     //第一杆
            k = [-v , u];
            k = Normalize(k);
            longitude = lonStart + lonInterval * (arrowSize * k[0]+x);
            latitude  = latStart + latInterval * (arrowSize * k[1]+y);
            var cartographic=Cesium.Cartographic.fromDegrees(longitude, latitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
		    //第二杆开始点
            var longitudeE =  u * arrowSamplingStep/5;
            var latitudeE  =  v * arrowSamplingStep/5;
            var elongitude = lonStart + (longitudeE+x) * lonInterval;
            var elatitude = latStart + (latitudeE+y)* latInterval;
            var cartographic=Cesium.Cartographic.fromDegrees(elongitude, elatitude, 30000);
		    world=ellipsoid.cartographicToCartesian(cartographic);
		    vertices.push(world.x, world.y, world.z);
            var veclength = vertices.length / 3.0;
        
           indices.push( veclength - 4.0, veclength - 3.0); // line one
           indices.push( veclength - 4.0, veclength - 2.0); // line twe
           indices.push( veclength - 1.0, veclength - 2.0);//line three
        }
     }
}
     positionArr = new Float64Array(vertices);
      colorArr = new Float32Array(attcolor);
      indiceArr = new Uint16Array(indices);
      
      geometrys = CreateGeometry(positionArr, indiceArr)
      appearances = CreateAppearence(fragmentShader, vertexShader);
      primitiveArrow = viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
            geometry: geometrys
        }),
        appearance: appearances,
        asynchronous: false
    }));
		      
		      
      function CreateGeometry(positions, indices) {
           return new Cesium.Geometry({
            attributes: {
                position: new Cesium.GeometryAttribute({
                    componentDatatype: Cesium.ComponentDatatype.DOUBLE,
                    componentsPerAttribute: 3,
                    values:  positions
                })
//	                    color: new Cesium.GeometryAttribute({
//	                        componentDatatype: Cesium.ComponentDatatype.FLOAT,
//	                        componentsPerAttribute: 4,
//	                        values: colors
//	                    })
            },
            indices: indices,
            primitiveType: Cesium.PrimitiveType.LINES,
            boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
        });
   }
		      
   function CreateAppearence(fs, vs) {
    return new Cesium.Appearance({         
        renderState: {
            //blending: Cesium.BlendingState.DISABLED, //DISABLED   PRE_MULTIPLIED_ALPHA_BLEND  ALPHA_BLEND 
            //depthTest: { enabled: true }, 
            depthTest: {
                enabled: true,
//                      func: Cesium.DepthFunction.NOT_EQUAL
            },
              depthMask: true,
              lineWidth: 4.0
//                  polygonOffset: {
//                      enabled: false,
//                      factor: 1.0,
//                      units: 1.0
//                  },
        },
        fragmentShaderSource: fs,
        vertexShaderSource: vs
    });
}   
		  
		  
  function getVS() {
    return "attribute vec3 position3DHigh;\
    attribute vec3 position3DLow;\
    attribute vec4 color;\
    varying vec4 v_color;\
    attribute float batchId;\
    void main()\
    {\
        vec4 p = czm_computePosition();\
        v_color =color;\
        p = czm_modelViewProjectionRelativeToEye * p;\
        gl_Position = p;\
    }\
    ";
}
    function getFS() {
        return "varying vec4 v_color;\
        void main()\
        {\
            gl_FragColor =vec4(1.0,1.0,1.0,1.0);\
        }\
        ";
    }    
		         
 function Normalize(vec2volue){
    var vecLength = Math.sqrt(vec2volue[0] * vec2volue[0] + vec2volue[1] * vec2volue[1]);
    var onefloat = 1.0;
    var invLength = onefloat / vecLength;
    var vec2 = [vec2volue[0] * invLength, vec2volue[1] * invLength];
    return vec2;
}  
}