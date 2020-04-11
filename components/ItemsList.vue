<template>
  <div class="items-list">
    <div class="list-item"
          v-for="(item, index) in items">
      <slot :bind="item">
       Button has been clecked {{item.value}} at {{item.time | date('HH:mm:ss')}}
       </slot>

    </div>
    <div class="list-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'items-list',
  props: {
    items:  Array
  }
}
</script>
<style lang="css" scoped>

</style>
