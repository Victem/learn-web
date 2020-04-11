<template>
  <div class="click-counter">
    <div> {{ fullName }}</div>
    <button type="button" @click="clickHandler" :class="['button', colorSelector]">Click counts {{ clickCounts }}</button>
    <div v-for="(event, index) in clickEvents" :key="index">
      <div v-if="index < 10" class="event-item">
        Button has been clecked {{event.value}} at {{event.time | date('HH:mm:ss')}} <el-button type="text" @click="removeEvent(event)" icon="el-icon-delete-solid"></el-button>
      </div>
    </div>
    <div v-if="clickEvents.length > 10">
      And another {{clickCounts - 10}}
    </div>
<!--      <items-list :items="clickEvents">
      <template v-slot:default="item">
       Button has been clicked {{item.value}} at {{ item.time | date('HH:mm:ss')}} <el-button type="text" @click="removeEvent(item)" icon="el-icon-delete-solid"></el-button>
      </template>
     </items-list> -->
  </div>
</template>
<script>

import moment from 'moment'
import ItemsList from './ItemsList'
export default {
  name: 'click-counter',
  components: {
    ItemsList
  },
  data() {
    return {
      clickCounts: 0,
      clickEvents: [],
      user: {
        name: 'Andrew',
        lastName: 'Lobov'
      },
      styles: ['green', 'button']
    }
  },

  methods: {
    clickHandler(){
      this.clickCounts += 1
      console.log(this.clickCounts)
      const eventData = {
        time: new Date(Date.now()),
        value: this.clickCounts
      }
      this.clickEvents.push(eventData);
    },
    removeEvent(event) {
      this.clickEvents = this.clickEvents.filter(e=> e.value !== event.value)
      this.clickCounts -= 1;
    }
  },

  computed: {
    colorSelector() {
      return {
        'green': this.clickCounts < 5,
        'yellow': this.clickCounts >= 5 && this.clickCounts < 10,
        'red': this.clickCounts >= 10
      }
    },
    fullName() {
      return `${this.user.name} ${this.user.lastName}`
    }
  },

  filters: {
    date(value, format) {
      if(!moment.isDate(value)){
        return ''
      }
      if(format) {
        return moment(value).format(format)
      } else {
        return moment(value).format('DD.MM.YYYY')
      }
    }
  }
}

</script>
<style lang="css" scoped>
.click-counter .green {
  background: #0cbe51;
}

.click-counter .yellow {
  background: #d7ee09;
}

.click-counter .red {
  background: #fc0404;
}

.click-counter .button {
  border: 1px solid #cecece;
  padding: 15px 25px;
  border-radius: 5px;
  transition: background-color ease-in 0.2s;
}
</style>
