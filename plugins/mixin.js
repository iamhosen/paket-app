export default {
  data() {
    return {}
  },
  filters: {
    currency(number) {
      return (number | 0).toLocaleString('en-us')
    },
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
  },
  methods: {
    currency(number, unit = '') {
      if (isNaN(number)) return number
      number = Number(number)
      return number.toLocaleString('en-US') + unit
    },
  },
}
