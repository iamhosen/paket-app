<template>
  <div>
    <apexchart
      :options="options"
      :series="[
        {
          name: '',
          data: categories.values,
        },
      ]"
    ></apexchart>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Object,
      required: true,
    },
    color: {
      type: String,
      default: '#991b1b',
    },
  },
  computed: {
    options() {
      return {
        colors: [this.color],
        chart: {
          type: 'area',
          width: '100%',
          toolbar: {
            show: false,
          },
        },
        stroke: {
          curve: 'smooth',
        },
        yaxis: {
          show: false,
        },
        xaxis: {
          labels: {
            show: false,
          },
          categories: this.categories.labels,
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          theme: 'dark',
          style: {
            fontFamily: 'shabnam',
          },
          y: {
            formatter: function (val) {
              return val.toLocaleString('en-US') + ' ریال'
            },
          },
        },
        grid: {
          borderColor: '#44403c',
        },
      }
    },
  },
}
</script>
