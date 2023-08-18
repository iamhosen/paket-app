<template>
  <div class="tab-wrapper mx-4 bg-back p-4 rounded-2xl mb-4">
    <h2 class="opacity-40 border-2 border-[#262626] w-fit px-2 rounded-md">دخل و خرج ۶ماه گذشته</h2>
    <apexchart :options="options" :series="latestMonth"></apexchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        colors: ['#7749F8', '#262626'],

        chart: {
          type: 'bar',
          height: '320px',
          fontFamily: 'shabnam',
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '70%',
            borderRadiusApplication: 'end',
            borderRadius: 8,
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
          theme: 'dark',
          style: {
            fontFamily: 'shabnam',
          },
          y: {
            formatter: function (val) {
              return val.toLocaleString('en-US') // Adjust locale as needed
            },
          },
        },
        states: {
          hover: {
            filter: {
              type: 'darken',
              value: 1,
            },
          },
        },
        stroke: {
          show: true,
          width: 0,
          colors: ['transparent'],
        },
        grid: {
          show: false,
          strokeDashArray: 4,
          padding: {
            left: 2,
            right: 2,
            top: -14,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          floating: false,
          labels: {
            show: true,
            style: {
              fontFamily: 'Shabnam',
              cssClass: 'text-xs font-normal fill-[#6B7280]',
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
        fill: {
          opacity: 1,
        },
      },
    }
  },
  computed: {
    months() {
      return this.$store.getters['transaction/getTransactionsByMonth']
    },
    latestMonth() {
      //take last 6 this.months
      // const latest = this.months.slice(-6)
      //take first 6 this.months
      const latest = this.months.slice(0, 6)

      const series = [
        {
          name: 'خرج',
          color: '#262626',
          data: [],
        },
        {
          name: 'درآمد',
          color: '#7749F8',
          data: [],
        },
      ]

      latest.forEach((month) => {
        const title = month.title.split(' ')[1]

        series[0].data.push({
          x: title,
          y: -month.sumOfWithdraws,
        })
        series[1].data.push({
          x: title,
          y: month.sumOfDeposits,
        })
      })
      return series
    },
  },
}
</script>
