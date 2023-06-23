import Vue from 'vue'

import mixin from './mixin'
if (!Vue.__utils__) {
  Vue.__utils__ = true
  Vue.mixin({
    mixins: [mixin],
  })
}

import jalaaliJs from 'jalaali-js'
export default (_, inject) => {
  inject('jalaali', jalaaliJs)
}