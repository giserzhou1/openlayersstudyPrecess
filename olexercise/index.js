import Map from 'ol/Map.js';
import Overlay from 'ol/Overlay.js';
import View from 'ol/View.js';
import {toStringHDMS} from 'ol/coordinate.js';
import TileLayer from 'ol/layer/Tile.js';
import {toLonLat} from 'ol/proj.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
// import TileJSON from 'ol/source/TileJSON.js';
/**
 * Elements that make up the popup.
 */
var container = document.getElementById('popup');
var content = document.getElementById('angle');
var closer = document.getElementById('popup-closer');
var zoom = 2;
var center = [0, 0];
var rotation = 0;




if (window.location.hash !== '') {
  // try to restore center, zoom-level and rotation from the URL
  var hash = window.location.hash.replace('#map=', '');
  var parts = hash.split('/');
  if (parts.length === 4) {
    zoom = parseInt(parts[0], 10);
    center = [
      parseFloat(parts[1]),
      parseFloat(parts[2])
    ];
    rotation = parseFloat(parts[3]);
  }
}

/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});

/**
 * Create the map.
 */
var map = new Map({
    layers: [
        new TileLayer({
            source: new OSM()
        })
    ],
    overlays: [overlay],
    target: 'map',
    view: new View({
        center: center,
        zoom: zoom,
        rotation: rotation
    })
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};
/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function(evt) {
    var coordinate = evt.coordinate;
    var hdms = toStringHDMS(toLonLat(coordinate));
    var longitude = hdms.slice(0,13)
    var latitude = hdms.slice(14,27)
    content.innerHTML = '<p>经度：' + longitude +'<br>纬度：' + latitude +'<br></p>';
    overlay.setPosition(coordinate);
});

     var shouldUpdate = true;
      var view = map.getView();
      var updatePermalink = function() {
        if (!shouldUpdate) {
          // do not update the URL when the view was changed in the 'popstate' handler
          shouldUpdate = true;
          return;
        }
        var center = view.getCenter();
        var hash = '#map=' +
            view.getZoom() + '/' +
            Math.round(center[0] * 100) / 100 + '/' +
            Math.round(center[1] * 100) / 100 + '/' +
            view.getRotation();
        var state = {
          zoom: view.getZoom(),
          center: view.getCenter(),
          rotation: view.getRotation()
        };
        window.history.pushState(state, 'map', hash);
      };
      map.on('moveend', updatePermalink);

      // restore the view state when navigating through the history, see
      // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
      window.addEventListener('popstate', function(event) {
        if (event.state === null) {
          return;
        }
        map.getView().setCenter(event.state.center);
        map.getView().setZoom(event.state.zoom);
        map.getView().setRotation(event.state.rotation);
        shouldUpdate = false;
      });
