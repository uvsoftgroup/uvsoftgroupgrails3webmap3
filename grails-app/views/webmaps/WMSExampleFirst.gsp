<!DOCTYPE html>
<html>
  <head>
    <title>Custom Overview Map</title>
    <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
    <!-- The line below is only needed for old environments like Internet Explorer and Android 4.x -->
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
    <script src="https://openlayers.org/en/v4.6.5/build/ol.js"></script>
    <style>
      .ol-custom-overviewmap,
      .ol-custom-overviewmap.ol-uncollapsible {
        bottom: auto;
        left: auto;
        right: 0;
        top: 0;
      }

      .ol-custom-overviewmap:not(.ol-collapsed)  {
        border: 1px solid black;
      }

      .ol-custom-overviewmap .ol-overviewmap-map {
        border: none;
        width: 300px;
      }

      .ol-custom-overviewmap .ol-overviewmap-box {
        border: 2px solid red;
      }

      .ol-custom-overviewmap:not(.ol-collapsed) button{
        bottom: auto;
        left: auto;
        right: 1px;
        top: 1px;
      }

      .ol-rotate {
        top: 170px;
        right: 0;
      }
    </style>
  </head>
  <body>
    <div id="map" class="map"></div>
    <script>
      var overviewMapControl = new ol.control.OverviewMap({
        // see in overviewmap-custom.html to see the custom CSS used
        className: 'ol-overviewmap ol-custom-overviewmap',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM({
              'url': 'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' +
                  '?apikey=Your API key from http://www.thunderforest.com/docs/apikeys/ here'
            })
          })
        ],
        collapseLabel: '\u00BB',
        label: '\u00AB',
        collapsed: false
      });

      var map = new ol.Map({
        controls: ol.control.defaults().extend([
          overviewMapControl
        ]),
        interactions: ol.interaction.defaults().extend([
          new ol.interaction.DragRotateAndZoom()
        ]),
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        target: 'map',
        view: new ol.View({
          center: [500000, 6000000],
          zoom: 7
        })
      });
    </script>
  </body>
</html>