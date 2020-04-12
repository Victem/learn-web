import Vue from 'vue';
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from 'vue2-leaflet';

import { L, Icon } from 'leaflet';
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

import 'leaflet/dist/leaflet.css';

//import heatmap from 'heatmap.js/build/heatmap'
//import HeatmapOverlay from 'leaflet-heatmap/leaflet-heatmap'


Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-popup', LPopup);
Vue.component('l-icon', LIcon);

/* export default {
  heatmap,
  HeatmapOverlay
} */
