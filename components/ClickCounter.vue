<template>
  <div class="click-counter">
    <button type="button" @click="clickHandler">Click counts {{ clickCounts }}</button>
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
      }
    }
  },

  methods: {
    clickHandler(){
      this.clickCounts += 1;
      console.log(this.clickCounts)
    }
  }
}

</script>
<style lang="css" scoped>

</style>
