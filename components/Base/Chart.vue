<template>
  <div class="m-4">
    <Chart :data="chartData" :height="200" />
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Object,
      required: true,
    },
  },
  computed: {
    chartData() {
      return {
        labels: this.categories.labels,
        datasets: [
          {
            data: this.categories.values,
            backgroundColor: 'rgba(235, 83, 64, 0.5)',
            borderColor: 'rgba(235, 83, 64, 1)',
            borderWidth: 2,
          },
        ],
      }
    },
  },
}
</script>