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
      <el-button @click="doWork">Click</el-button>
    </div>
  </div>
</template>
<script>
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
      echartsOverlay: null
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
    doWork(){

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
