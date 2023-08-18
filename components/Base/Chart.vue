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
  },
  computed: {
    options() {
      return {
        colors: [
          // '#C3DDFD',
          // '#76A9FA',
          // '#3F83F8',
          // '#1A56DB',
          // '#233876',
          '#DCD7FE',
          '#AC94FA',
          '#9061F9',
          '#6C2BD9',
          '#4A1D96',
          // '#CDDBFE',
          // '#8DA2FB',
          // '#6875F5',
          // '#5145CD',
          // '#362F78',
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
                  label: 'مجموع خرج',
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
              size: '70%',
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