<!DOCTYPE html>
<html>
  <head>
    <title>WFS</title>
    <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
    <!-- The line below is only needed for old environments like Internet Explorer and Android 4.x -->
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
    <script src="https://openlayers.org/en/v4.6.5/build/ol.js"></script>
    <asset:javascript src="initWFSTransactions.js"/>
  </head>
  <body onload="initWFSTransactions();">

<div id="map" class="map"></div>
<div id="customControl">
    <input type="button" id="customControlDelete" value="delete"/>
    <input type="button" id="customControlSave" value="save"/>
</id>

  </body>
</html>