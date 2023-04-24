<template>
  <div class="wrapper" :data-open="state === 'open' ? 1 : 0">
    <div class="bg" @click="() => setState('close')"></div>
    <div
      ref="card"
      class="card w-full h-screen fixed bg-[#1C1C1E] rounded-t-3xl left-2/4 -translate-x-2/4 text-white max-w-[500px]"
      :data-state="isMove ? 'move' : state"
      :style="{ top: `${isMove ? y : calcY()}px` }"
    >
      <div class="pan-area" ref="pan">
        <div
          class="w-[100px] h-1 rounded-2xl bg-[#ffffff] opacity-30 mx-auto my-0 cursor-pointer mb-8"
          ref="bar"
        ></div>
      </div>
      <div class="contents">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Hammer from 'hammerjs'

export default {
  props: {
    openY: {
      type: Number,
      default: 0.2,
    },
    halfY: {
      type: Number,
      default: 0.8,
    },
    defaultState: {
      type: String,
      default: 'close',
    },
  },
  data() {
    return {
      mc: null,
      y: 0,
      startY: 0,
      isMove: false,
      state: this.defaultState,
      rect: {},
    }
  },
  mounted() {
    window.onresize = () => {
      this.rect = this.$refs.card.getBoundingClientRect()
    }
    this.rect = this.$refs.card.getBoundingClientRect()

    this.mc = new Hammer(this.$refs.pan)
    this.mc.get('pan').set({ direction: Hammer.DIRECTION_ALL })

    this.mc.on('panup pandown', (evt) => {
      this.y = evt.center.y - 16
    })

    this.mc.on('panstart', (evt) => {
      this.startY = evt.center.y
      this.isMove = true
    })

    this.mc.on('panend', (evt) => {
      this.isMove = false

      switch (this.state) {
        case 'half':
          if (this.startY - evt.center.y > 120) {
            this.state = 'open'
          }

          if (this.startY - evt.center.y < -50) {
            this.state = 'close'
          }
          break
        case 'open':
          if (this.startY - evt.center.y < -120) {
            this.state = 'close'
          }
          break
      }
    })
  },
  beforeDestroy() {
    this.mc.destroy()
    window.onresize = null
  },
  methods: {
    calcY() {
      switch (this.state) {
        case 'close':
          return this.rect.height
        case 'open':
          return this.rect.height * this.openY
        case 'half':
          return this.rect.height * this.halfY
        default:
          return this.y
      }
    },
    setState(state) {
      this.state = state
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper[data-open='1'] {
  position: fixed;
  top: 0;
  left: 0;
}

.wrapper[data-open='1'] .bg {
  display: block;
  transition: all 0.4s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
}

.card[data-state='half'],
.card[data-state='open'],
.card[data-state='close'] {
  transition: top 0.4s ease-out;
}

.card[data-state='close'] {
  box-shadow: none;
}

.pan-area {
  padding: 12px 0;
}

.contents {
  overflow-y: scroll;
  max-height: 100%;
  padding-bottom: calc(100vh * 0.2);
  box-sizing: border-box;
}
</style>
