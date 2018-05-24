<!DOCTYPE html>
<html>
  <head>
    <title>WFS</title>
    <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
    <!-- The line below is only needed for old environments like Internet Explorer and Android 4.x -->
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
    <script src="https://openlayers.org/en/v4.6.5/build/ol.js"></script>
    <asset:javascript src="initWFSTransactions.js"/>
     <asset:stylesheet src="wsftsecond.css"/>
  </head>

  <body onload="initWFSTransactionsSecond();">

<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<div id="map" class="map"></div>
<button id="btnPoint" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
  <i class="material-icons">add_location</i>
</button>
<button id="btnLine" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
  <i class="material-icons">timeline</i>
</button>
<button id="btnArea" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
  <i class="material-icons">signal_cellular_null</i>
</button>
<button id="btnEdit" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
  <i class="material-icons">build</i>
</button>
<button id="btnDelete" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
  <i class="material-icons">delete</i>
</button>

  </body>
</html>