<template>
  <div>
    <apexchart
      :options="options"
      :series="[
        {
          name: 'خرج',
          data: months.map((month) => -month.sumOfWithdraws),
          color: '#991b1b',
        },
        {
          name: 'درآمد',
          data: months.map((month) => month.sumOfDeposits),
          color: '#166534',
        },
      ]"
    ></apexchart>
  </div>
</template>

<script>
export default {
  props: {
    months: {
      type: Array,
      required: true,
    },
  },
  computed: {
    options() {
      return {
        // colors: [this.color],
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
            show: true,
            style: {
              colors: '#ffffff33',
              fontSize: '10px',
              fontFamily: 'shabnam',
            },
          },
          categories: this.months.map((month) => month.title),
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
        legend: {
          show: false,
        },
        grid: {
          borderColor: '#44403c',
        },
      }
    },
  },
}
</script>
