function initWFSTransactions(){



// Setting the map element.
var map = new ol.Map({
	target: 'map',
	renderer: 'canvas',
	view: new ol.View({
		projection: 'EPSG:3857',
		center: ol.proj.transform([-103.86, 44.49], 'EPSG:4326', 'EPSG:3857'),
		zoom: 10
	})
});

 var raster = new ol.layer.Tile({
              source: new ol.source.OSM()
            });
 map.addLayer(raster);

// Adding a base layer map. It is more easy to work.
var baseLayerMap = new ol.layer.Tile({
    title: "Global Imagery",
    source: new ol.source.TileWMS({
        url: 'http://localhost:8888/geoserver/nurc/wms',
        params: {LAYERS: 'nurc:Img_Sample', VERSION: '1.1.0'}
    }),
});
map.addLayer(baseLayerMap);

//ADDING THE VECTOR LAYER BY WFS ON THE MAP

var vectorSource = new ol.source.Vector({
    loader: function (extent, resolution, projection) {
        var url = "http://localhost:8888/geoserver/wfs?service=WFS"
                + "&version=2.0.0&request=GetFeature"
                + '&outputFormat=text/javascript'
                + "&typename=sf:streams"
                + "&format_options=callback:loadFeatures"
                + '&srsname=EPSG:3857';
        // use jsonp: false to prevent jQuery from adding the "callback"
        $.ajax({url: url, dataType: 'jsonp', jsonp: false});
    }
});

/**
 * JSONP WFS callback function.
 * @param {Object} response The response object.
 */
window.loadFeatures = function (response) {
    vectorSource.addFeatures(new ol.format.GeoJSON().readFeatures(response));
};

var vector = new ol.layer.Vector({
    source: vectorSource,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 255, 1.0)',
            width: 2
        })
    })
});

map.addLayer(vector);

//ADDING DEFAULT CONTROL : SELECT, MODIFY
var selectFeat = new ol.interaction.Select();
map.addInteraction(selectFeat);
var selectedFeat = selectFeat.getFeatures();
var modifyFeat = new ol.interaction.Modify({
    features: selectedFeat
});
map.addInteraction(modifyFeat);

//CUSTOM DELETE FUNCTION
function deleteFeatures() {
    if (selectedFeat.getLength() > 0) {
        var toDeleteFeat = selectFeat.getFeatures().getArray()[0];
        vectorSource.removeFeature(toDeleteFeat);
        selectFeat.getFeatures().remove(toDeleteFeat);
    }
    else
        window.alert("Please select a layer first :" + selectedFeat.getLength());
}

$('#customControlDelete').on('click', function () {
    deleteFeatures();
});

//CUSTOM TRANSACTIONAL FUNCTION

var transactWFS = function (p, f) {
    switch (p) {
        case 'insert':
            node = formatWFS.writeTransaction([f], null, null, formatGML);
            break;
        case 'update':
            node = formatWFS.writeTransaction(null, [f], null, formatGML);
            break;
        case 'delete':
            node = formatWFS.writeTransaction(null, null, [f], formatGML);
            break;
    }
    s = new XMLSerializer();
    str = s.serializeToString(node);
    $.ajax('http://localhost:8888/geoserver/wfs', {
        type: 'POST',
        dataType: 'xml',
        processData: false,
        contentType: 'text/xml',
        data: str
    }).done();
}

selectFeat.getFeatures().on('change:length', function (e) {
    transactWFS('delete', e.target.item(0));
});


 }