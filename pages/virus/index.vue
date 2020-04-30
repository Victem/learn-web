<template>
  <div class="virus">
    Virus - {{wtf}}
    <div>
    {{ title }}
    </div>
    <div>
      <client-only>
        <l-map id="map"
          ref="map"
          :zoom="zoom"
          :center="center"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          @update:bounds="boundsUpdated"
        >
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker v-for="marker in countryStats"
                    :key="marker.ourid"
                    :lat-lng="{lat: marker.lat, lng: marker.long}"
                    @click="markerClick">
            <l-popup>
              <div style="width: 100px">
                <div class="header">{{marker.title}}</div>
                <div class="total">Total:{{marker.total_cases}}</div>
                <div class="death">Deaths:{{marker.total_deaths}}</div>
                <div class="recovery">Recovered: {{marker.total_recovered}}</div>
              </div>
            </l-popup>
          </l-marker>
        </l-map>
      </client-only>
    </div>
    <div>
      <el-button @click="heatmapCases">Тепловая карта кол-во случаев</el-button>
      <el-button @click="heatmapRecoverys">Тепловая карта количество выздоровлений</el-button>
      <el-button @click="heatmapDeaths">Тепловая карта количество смертей</el-button>
      <el-button @click="heatmapNewCases">Тепловая карта количество новых случаев</el-button>
<!--       <el-button @click="echartCreate">echart</el-button> -->
    </div>
  </div>
</template>
<script>
import heatmap from 'heatmap.js/build/heatmap'
import HeatmapOverlay from 'leaflet-heatmap/leaflet-heatmap'

export default {
  /* async data({ params }) {
    const result = await axios.get('/api/virustracker/global')
    console.log(result)
    return {
      global: 'result.data',
      title: 'wtf'
    }
  } */

  data(){
    return {
      wtf: 'wtf',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 3,
      center: [47.413220, -1.219482],
      bounds: null,
      echartsOverlay: null,
      heatmap: null,
      echartsLayer: null
    }
  },
  async asyncData({$axios}) {
    const result = await $axios.get('/api/virustracker/global')
    const countryStats = await $axios.get('/api/virustracker/country/ALL')
    const russia = await $axios.get('/api/virustracker/country/RU')
    const timeline = await $axios.get('/api/virustracker/timeline')
    console.log(countryStats)
    console.log(russia)


    return {
      title: result.data,
      countryStats: countryStats.data,
    }
  },
  methods: {
    heatmapCases(){
      const cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        // if scaleRadius is false it will be the constant radius used in pixels
        "radius": 300,
        "maxOpacity": 0.5,
        // scales the radius based on map zoom
        "scaleRadius": false,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": true,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'long',
        // which field name in your data represents the data value - default "value"
        valueField: 'total_cases',
        blur: 0.999,

        gradient: {
          // enter n keys between 0 and 1 here
          // for gradient color customization
          //'.2': 'blue',
          '.3': 'green',
          '.6': 'yellow',
          '.8': 'orange',
          '.95': 'red'
        }
      }

      if(this.heatmap) {
        this.$refs.map.mapObject.removeLayer(this.heatmap)
        this.heatmap = new HeatmapOverlay(cfg)
        this.$refs.map.mapObject.addLayer(this.heatmap)
      } else {
        this.heatmap = new HeatmapOverlay(cfg)
        this.$refs.map.mapObject.addLayer(this.heatmap)
      }

      const data = {
        max: this.countryStats.total_cases,
        min: 0,
        data: this.countryStats
      }

      this.heatmap.setData(data)
    },
    heatmapRecoverys() {
      const cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        // if scaleRadius is false it will be the constant radius used in pixels
        "radius": 300,
        "maxOpacity": 0.5,
        // scales the radius based on map zoom
        "scaleRadius": false,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": true,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'long',
        // which field name in your data represents the data value - default "value"
        valueField: 'total_recovered',
        blur: 0.999,

        gradient: {
          // enter n keys between 0 and 1 here
          // for gradient color customization
          //'.2': 'blue',
          '.3': 'red',
          '.6': 'yellow',
          '.8': 'orange',
          '.95': 'green'
        }
      }

      if(this.heatmap) {
        this.$refs.map.mapObject.removeLayer(this.heatmap)
        this.heatmap = new HeatmapOverlay(cfg)
        this.$refs.map.mapObject.addLayer(this.heatmap)
      } else {
        this.heatmap = new HeatmapOverlay(cfg)
        this.$refs.map.mapObject.addLayer(this.heatmap)
      }

      const data = {
        max: this.countryStats.total_recovered,
        min: 0,
        data: this.countryStats
      }
      this.heatmap.setData(data)
    },

    heatmapDeaths() {
       const cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        // if scaleRadius is false it will be the constant radius used in pixels
        "radius": 300,
        "maxOpacity": 0.5,
        // scales the radius based on map zoom
        "scaleRadius": false,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": true,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'long',
        // which field name in your data represents the data value - default "value"
        valueField: 'total_deaths',
        blur: 0.999,

        gradient: {
          // enter n keys between 0 and 1 here
          // for gradient color customization
          //'.2': 'blue',
          '.3': 'green',
          '.6': 'yellow',
          '.8': 'orange',
          '.95': 'red'
        }
      }

      if(this.heatmap) {
        this.$refs.map.mapObject.removeLayer(this.heatmap)
        this.heatmap = new HeatmapOverlay(cfg)
        this.$refs.map.mapObject.addLayer(this.heatmap)
      } else {
        this.heatmap = new HeatmapOverlay(cfg)
        this.$refs.map.mapObject.addLayer(this.heatmap)
      }

      const data = {
        max: this.countryStats.total_recovered,
        min: 0,
        data: this.countryStats
      }
      this.heatmap.setData(data)
    },

    heatmapNewCases() {
       const cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        // if scaleRadius is false it will be the constant radius used in pixels
        "radius": 300,
        "maxOpacity": 0.5,
        // scales the radius based on map zoom
        "scaleRadius": false,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": true,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'long',
        // which field name in your data represents the data value - default "value"
        valueField: 'total_new_cases_today',
        blur: 0.999,

        gradient: {
          // enter n keys between 0 and 1 here
          // for gradient color customization
          //'.2': 'blue',
          '.3': 'green',
          '.6': 'yellow',
          '.8': 'orange',
          '.95': 'red'
        }
      }

      if(this.heatmap) {
        this.$refs.map.mapObject.removeLayer(this.heatmap)
        this.heatmap = new HeatmapOverlay(cfg)
        this.$refs.map.mapObject.addLayer(this.heatmap)
      } else {
        this.heatmap = new HeatmapOverlay(cfg)
        this.$refs.map.mapObject.addLayer(this.heatmap)
      }

      const data = {
        max: this.countryStats.total_new_cases_today,
        min: 0,
        data: this.countryStats
      }
      this.heatmap.setData(data)
    },
    echartCreate() {
/*       console.log(echarts)
      const overlay = new L.echartsLayer(this.$refs.map.mapObject, echarts)
      console.log(overlay)
      const chartsContainer = overlay.getEchartsContainer()
      console.log(chartsContainer)
      const myChart = overlay.initECharts(chartsContainer) */
      /*window.onresize = myChart.onresize; */


    },
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    },

    renderMarkers() {

    },

    markerClick(marker) {
      console.log(marker)
    }

  },

  created() {
    this.renderMarkers()
  }
}
</script>
<style lang="css" scoped>
#map, map {
  height: 600px;
}
</style>
