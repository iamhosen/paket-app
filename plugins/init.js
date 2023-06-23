import Vue from 'vue'

import mixin from './mixin'
if (!Vue.__utils__) {
  Vue.__utils__ = true
  Vue.mixin({
    mixins: [mixin],
  })
}
