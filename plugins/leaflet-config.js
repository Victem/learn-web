import Vue from 'vue';
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

import heatmap from 'heatmap.js'
import leafletHeatmap from 'leaflet-heatmap'

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-popup', LPopup);
Vue.component('l-icon', LIcon);

export default {
  heatmap,
  leafletHeatmap
}
