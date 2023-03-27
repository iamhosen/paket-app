<template>
  <div class="cards mx-4">
    <Card
      v-for="(card, index) in cards"
      :key="card.id"
      :card="card"
      :is-current="index === 0"
      @cardAccepted="$emit('cardAccepted')"
      @cardRejected="$emit('cardRejected')"
      @hideCard="$emit('hideCard')"
    />
  </div>
</template>
  
  <script>
import Card from '@/components/slider/Card.vue'

export default {
  components: {
    Card,
  },

  props: {
    cards: {
      type: Array,
      required: true,
    },
  },
}
</script>
  
<style lang="scss" scoped>
.cards {
  position: relative;
  display: flex;
  // margin: 50px;
  // width: 300px;
}
</style>
  