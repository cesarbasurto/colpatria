// API key for http://openlayers.org. Please get your own at
// http://bingmapsportal.com/ and use that instead.

// initialize map when page ready


function iniciarmapa() {
	
	
	
    vector = new OpenLayers.Layer.Vector("Vector Layer", {});
    tapetes = new OpenLayers.Layer.Vector("Tapetes Layer", {});
    carrera.kmlayer = new OpenLayers.Layer.Vector("Layer", {});
    ruta_layer = new OpenLayers.Layer.Vector(); 

	//carrera.geosalida = new OpenLayers.Geometry.LineString([new OpenLayers.Geometry.Point(puntosalida[2],puntosalida[3]),new OpenLayers.Geometry.Point(puntosalida[4],puntosalida[5])]); //casa
	//carrera.geollegada =new OpenLayers.Geometry.LineString([new OpenLayers.Geometry.Point(puntollegada[0],puntollegada[1]),new OpenLayers.Geometry.Point(puntollegada[2],puntollegada[3])]); //casa
 	
	style_tapete = {// estilo par la linea de ruta
        strokeColor: "#FF0000",
        strokeWidth: 3,
        pointRadius: 6
   	 };

	//tapetes.addFeatures(new OpenLayers.Feature.Vector(carrera.geosalida,null,style_tapete));
	//tapetes.addFeatures(new OpenLayers.Feature.Vector(carrera.geollegada,null,style_tapete));
	
    sprintersLayer = new OpenLayers.Layer.Vector("Sprinters", {
        styleMap: new OpenLayers.StyleMap({
            graphicOpacity: 1.0,
            graphicWidth: 16,
            graphicHeight: 26,
            graphicYOffset: -26
        })
    });

    
	   
    var geolocate = new OpenLayers.Control.Geolocate({
        id: 'locate-control',
        geolocationOptions:  {
        	maximumAge:0, 
        	timeout:60000, 
        	enableHighAccuracy: true//true
        }
    });
    geolocate.watch = true;

    // create map
    map = new OpenLayers.Map({
        div: "map",
        theme: null,
        projection: sm,
        numZoomLevels: 18,
        controls: [
            new OpenLayers.Control.Attribution(),
            new OpenLayers.Control.TouchNavigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            }),
           
		    geolocate
            
        ],
        layers: [
            new OpenLayers.Layer.OSM(),
            ruta_layer,
            sprintersLayer,
            carrera.kmlayer,
            tapetes,
            vector
            
            
        ],
        center: new OpenLayers.LonLat(0, 0),
        zoom: 1
    });

	



    var style = {
        fillOpacity: 0.1,
        fillColor: '#000',
        strokeColor: '#f00',
        strokeOpacity: 0.6
    };
	 

  carrera.getruta();
   //map.addLayer(sprintersLayer);
   geolocate.events.register("locationupdated",geolocate,function(e) {
   	
   	console.log(carrera.precision+"hola");
   	$("#precision_text").text((e.position.coords.accuracy).toFixed(0)+" Mt");
   	if(e.position.coords.accuracy<=10){
   		//$("#popupGpsInfo").popup('close');
   		$(".precision").css('background-color', 'rgb(82,134,183)');
   	}else 
   	if(e.position.coords.accuracy<=20){
   		$(".precision").css('background-color', 'yellow');
   	}else 
   if(e.position.coords.accuracy<=50){
   		$(".precision").css('background-color', 'orange');
   	}
   	else{
   		$(".precision").css('background-color', 'red');
   	}
   		
	
   		//Si a presicion en es menor a 12 
	   		if(e.position.coords.accuracy<=carrera.precision)
	   		{ 	
	   			if(e.position.coords.accuracy>20){
	   			carrera.precision=e.position.coords.accuracy;
	   			}
	   			xpx=e.point.x;
				ypx=e.point.y;
				if ( $("#locate_stop").is(":visible") ) {
    
		//alert(carrera.tipo);
					if(	carrera.tipo=="competencia"){
						carrera.geosalida=tapetes.features[0].geometry;
						carrera.geollegada=tapetes.features[1].geometry;
					}
					
					if(	carrera.tipo=="competencia"){
						ruta(xpx,ypx);
					}
					else{
						entrenamiento(xpx,ypx);
					}
					
				
					/*intervalo=self.setInterval(function(){
						if(	carrera.tipo=="competencia"){
							ruta(puntos_simulacion[i].x,puntos_simulacion[i].y);
						}
						else{
							entrenamiento(puntos_simulacion[i].x,puntos_simulacion[i].y);
						}
						i++;
						if(i>1000){
							intervalo=window.clearInterval(intervalo);
							stop_carrera();
						}},
						100
					);*/
				} 
	   		}		
	});
	
	
	/*map.events.register('zoomend', this, function (event) {
        var x = map.getZoom();
       
        if( x > 16)
        {
            map.zoomTo(17);
        }
    });*/
			
			
	
	geolocate.events.register("locationfailed",this,function() {
	   	$.mobile.loading('hide');	    // getter2
	   	stop_carrera();
	    $.mobile.changePage("#gpsfailed", "pop"); 
	    

	});
    // set interval  PARA ENVIAR LOS DATOS CADA 10 SEG
	

}
