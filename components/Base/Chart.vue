<template>
  <div>
    <apexchart :options="options" :series="categories.values"></apexchart>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      default: 'خرج',
    },
  },
  computed: {
    options() {
      return {
        colors: [
          '#003f5c',
          '#2f4b7c',
          '#665191',
          '#a05195',
          '#d45087',
          '#f95d6a',
          '#ff7c43',
          '#ffa600',
        ],

        chart: {
          // height: ,
          width: '100%',
          type: 'donut',
        },
        stroke: {
          colors: ['transparent'],
          lineCap: '',
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                  fontFamily: ' Shabnam',
                  offsetY: 20,
                },
                total: {
                  showAlways: true,
                  show: true,
                  label: 'مجموع ' + this.title,
                  fontFamily: 'Shabnam',
                  formatter: function (w) {
                    const sum = w.globals.seriesTotals.reduce((a, b) => {
                      return a + b
                    }, 0)
                    return sum.toLocaleString('en-US') // Adjust locale as needed
                  },
                },
                value: {
                  show: true,
                  fontFamily: 'Shabnam',
                  offsetY: -20,
                  formatter: function (value) {
                    return value.toLocaleString('en-US') // Adjust locale as needed
                  },
                },
              },
              size: '80%',
            },
          },
        },
        grid: {
          padding: {
            top: -2,
          },
        },
        labels: this.categories.labels,
        dataLabels: {
          enabled: false,
        },
        legend: {
          position: 'bottom',
          fontFamily: ' Shabnam',
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return val.toLocaleString('en-US') // Adjust locale as needed
            },
          },
        },
        xaxis: {
          labels: {
            formatter: function (val) {
              return val.toLocaleString('en-US') // Adjust locale as needed
            },
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
      }
    },
  },
}
</script>
