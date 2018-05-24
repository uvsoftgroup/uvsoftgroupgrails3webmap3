
 function happyProject() {
	//OpenLayers.ProxyHost = "/proxy.jsp?url=";
	var options = {
    projection: new OpenLayers.Projection("EPSG:900913"),
    units: "m",
    maxResolution: 156543.0339,
    maxExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34,
                                     20037508.34, 20037508.34)
    };
    map = new OpenLayers.Map("maps", options);
		
	var mapnik= new OpenLayers.Layer.OSM();
	map.addLayer(mapnik);
		
		
    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position       = new OpenLayers.LonLat(90.400558, 23.794455).transform( fromProjection, toProjection);	
    var zoom           = 13;   	
					
	 //to get google hybrid map
    var google_hybrid=new OpenLayers.Layer.Google("Google Hybrid",
     { type: google.maps.MapTypeId.HYBRID}
     );
	map.addLayer(google_hybrid);
	 
	 // to get google Streets map
	var gmap = new OpenLayers.Layer.Google("Google Streets");
	map.addLayer(gmap);
	 
	// to get google Satellite map 
    var google_satellite=new OpenLayers.Layer.Google("Google Satellite",
     { type: google.maps.MapTypeId.SATELLITE}
     ); 
	 map.addLayer(google_satellite);

   // to get google terrain map
    var google_terrian=new OpenLayers.Layer.Google("Google Terrain",
     { type: google.maps.MapTypeId.TERRAIN}
     );
     map.addLayer(google_terrian);
	 
    var pointsOfDhakaCity  = new OpenLayers.Layer.WMS("POIs",
            "http://localhost:8080/geoserver/wms",
		   {'layers': 'MyGroup:PointsOfDhakaCity', transparent: true, format: 'image/png'},
            {isBaseLayer: false, visibility: true}
         );
		map.addLayer(pointsOfDhakaCity);	
		
	var administrativePointsOfDhakaCity  = new OpenLayers.Layer.WMS("Administrative places",
            "http://localhost:8080/geoserver/wms",
		   {'layers': 'MyGroup:AdministrativePointsOfDhakaCity', transparent: true, format: 'image/png'},
            {isBaseLayer: false, visibility: false}
         );
		map.addLayer(administrativePointsOfDhakaCity);	
	
    var roadsOfDhakaCity   = new OpenLayers.Layer.WMS("Roads",
            "http://localhost:8080/geoserver/wms",
		   {'layers': 'MyGroup:roadsOfDhakaCity ', transparent: true, format: 'image/png'},
            {isBaseLayer: false, visibility: false}
         );
		 map.addLayer(roadsOfDhakaCity);	

            //style:'',
            //SLD: 'http://localhost:8080/geoserver/myStyle.xml',		 
	
    var placesOfDhakaCity = new OpenLayers.Layer.WMS("Places",
            "http://localhost:8080/geoserver/wms",
		   {'layers': 'MyGroup:PlacesOfDhakaCity', transparent: true, format: 'image/png'},
            {isBaseLayer: false, visibility: false}
         );
		 map.addLayer(placesOfDhakaCity);	
		 
	var educationalPointsOfDhakaCity  = new OpenLayers.Layer.WMS("Educational Institute",
            "http://localhost:8080/geoserver/wms",
		   {'layers': 'MyGroup:EducationalPointsOfDhakaCity', transparent: true, format: 'image/png'},
            {isBaseLayer: false, visibility: false}
         );
		 map.addLayer(educationalPointsOfDhakaCity);	
		 
	var entertainingAndRecreationPoints  = new OpenLayers.Layer.WMS("Recreational Places",
            "http://localhost:8080/geoserver/wms",
		   {'layers': 'MyGroup:EntertainingAndRecreationPoints', transparent: true, format: 'image/png'},
            {isBaseLayer: false, visibility: false}
         );
		 map.addLayer(entertainingAndRecreationPoints);	
		 
    var railwaysOfDhakaCity  = new OpenLayers.Layer.WMS("Railways",
            "http://localhost:8080/geoserver/wms",
		   {'layers': 'MyGroup:railwaysOfDhakaCity', transparent: true, format: 'image/png'},
            {isBaseLayer: false, visibility: false}
         );
		map.addLayer(railwaysOfDhakaCity);	
		
	var socialAndCareFacilities  = new OpenLayers.Layer.WMS("Social and Care",
            "http://localhost:8080/geoserver/wms",
		   {'layers': 'MyGroup:SocialAndCareFacilities', transparent: true, format: 'image/png'},
            {isBaseLayer: false, visibility: false}
         );
		map.addLayer(socialAndCareFacilities);	
	
	 map.addControl(new OpenLayers.Control.LayerSwitcher());
	 map.addControl(new OpenLayers.Control.MousePosition());
	 map.addControl(new OpenLayers.Control.Navigation());
     map.addControl(new OpenLayers.Control.PanZoomBar());
     map.addControl(new OpenLayers.Control.MousePosition({}));
     map.addControl(new OpenLayers.Control.ScaleLine({}));
     map.addControl(new OpenLayers.Control.KeyboardDefaults({}));
     map.addControl(new OpenLayers.Control.EditingToolbar(administrativePointsOfDhakaCity));
     map.addControl(new OpenLayers.Control.OverviewMap({maximized: true}));
	 map.addControl(new OpenLayers.Control.SelectFeature({}));
	 
	OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
                defaultHandlerOptions: {
                    'single': true,
                    'double': false,
                    'pixelTolerance': 0,
                    'stopSingle': false,
                    'stopDouble': false
                },

                initialize: function(options) {
                    this.handlerOptions = OpenLayers.Util.extend(
                        {}, this.defaultHandlerOptions
                    );
                    OpenLayers.Control.prototype.initialize.apply(
                        this, arguments
                    ); 
                    this.handler = new OpenLayers.Handler.Click(
                        this, {
                            'click': this.trigger
                        }, this.handlerOptions
                    );
                }, 

                trigger: function(e) {
                    var lonlat = map.getLonLatFromViewPortPx(e.xy);
                    alert("Currect position: " + lonlat.lat + " N, " +
                                              + lonlat.lon + " E");
                }

            });
			
			var click = new OpenLayers.Control.Click();
                map.addControl(click);
                click.activate();  
	
	// getFeatureInfo clicking on selected "pointsOfDhakaCity" layer
	highlightLayer = new OpenLayers.Layer.Vector("Highlighted Features", {
            displayInLayerSwitcher: false, 
            isBaseLayer: false 
            }
        );

        infoControls = {
            click: new OpenLayers.Control.WMSGetFeatureInfo({
                url: 'http://localhost:8080/geoserver/wms', 
                title: 'Identify features by clicking',
                layers: [pointsOfDhakaCity],
                queryVisible: true
            }),
            hover: new OpenLayers.Control.WMSGetFeatureInfo({
                url: 'http://localhost:8080/geoserver/wms', 
                title: 'Identify features by clicking',
                layers: [pointsOfDhakaCity],
                hover: true,
                // defining a custom format options here
                formatOptions: {
                    typeName: 'POIs', 
                    featureNS: 'http://mygroup.com/maps'
                },
                queryVisible: true
            })
        };

        map.addLayers(highlightLayer); 
        for (var i in infoControls) { 
            infoControls[i].events.register("getfeatureinfo", this, showInfo);
            map.addControl(infoControls[i]); 
        }

        map.addControl(new OpenLayers.Control.LayerSwitcher());

        infoControls.click.activate();
		map.setCenter(position, zoom );
    }
