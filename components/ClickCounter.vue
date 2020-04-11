<template>
  <div class="click-counter">
    <div> {{ fullName }}</div>
    <button type="button" @click="clickHandler" :class="['button', colorSelector]">Click counts {{ clickCounts }}</button>
    <div v-for="(event, index) in clickEvents" :key="index">
      Button has been clecked {{event.value}} at {{event.time}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'click-counter',
/*   action: function() {

  } */
  data: function() {
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
