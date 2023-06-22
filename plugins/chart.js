import Vue from 'vue'
import { Doughnut } from 'vue-chartjs'

Vue.component('Chart', {
  extends: Doughnut,
  props: {
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: false,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
      }),
    },
  },
  watch: {
    data() {
      this.renderChart(this.data, this.options)
    },
  },
  mounted() {
    this.renderChart(this.data, this.options)
  },
})