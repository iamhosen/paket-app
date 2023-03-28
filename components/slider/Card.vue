<template>
  <div
    v-if="isShowing"
    ref="interactElement"
    :class="{
      isAnimating: isInteractAnimating,
      isCurrent: isCurrent,
    }"
    class="card"
    :style="{ transform: transformString, background: card.color }"
    @click="onClick"
  >
    <div class="w-full h-full p-8 flex flex-col gap-y-4">
      <h3 class="text-xl">{{ card.title }}</h3>
      <span
        class="font-xero ltr-number text-[1.4em] text-center tracking-wider"
        >{{ card.cardNumber }}</span
      >
      <span class="flex flex-col">
        <p class="font-normal opacity-40">موجودی</p>
        <p class="font-bold text-2xl tracking-widest">
          {{ toPersianNumberFormat(card.total) }}
        </p>
      </span>
    </div>
  </div>
</template>
  
<script>
import { toPersianNumberFormat } from '@/helpers/number.js'
const ACCEPT_CARD = 'cardAccepted'
const REJECT_CARD = 'cardRejected'
// const SKIP_CARD = 'cardSkipped'

export default {
  static: {
    interactMaxRotation: 15,
    interactOutOfSightXCoordinate: 500,
    interactOutOfSightYCoordinate: 600,
    interactYThreshold: 150,
    interactXThreshold: 100,
  },

  props: {
    card: {
      type: Object,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      isShowing: true,
      isInteractAnimating: true,
      isInteractDragged: null,
      interactPosition: {
        x: 0,
        y: 0,
        rotation: 0,
      },
    }
  },

  computed: {
    transformString() {
      if (!this.isInteractAnimating || this.isInteractDragged) {
        const { x, y, rotation } = this.interactPosition
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`
      }

      return null
    },
  },

  mounted() {
    const element = this.$refs.interactElement

    this.$interact(element).draggable({
      onstart: () => {
        // console.log('start')
        this.isInteractAnimating = false
      },

      onmove: (event) => {
        // console.log('moving')

        const { interactMaxRotation, interactXThreshold } = this.$options.static
        const x = this.interactPosition.x + event.dx
        let y = this.interactPosition.y + event.dy

        if (y > 50) y = 50
        else if (y < -50) y = -50

        let rotation = interactMaxRotation * (x / interactXThreshold)

        if (rotation > interactMaxRotation) rotation = interactMaxRotation
        else if (rotation < -interactMaxRotation)
          rotation = -interactMaxRotation

        this.interactSetPosition({ x, y, rotation })
      },

      onend: () => {
        // console.log('end')

        const { x, y } = this.interactPosition
        const { interactXThreshold, interactYThreshold } = this.$options.static
        this.isInteractAnimating = true

        if (x > interactXThreshold) this.playCard(ACCEPT_CARD)
        else if (x < -interactXThreshold) this.playCard(REJECT_CARD)
        // else if (y > interactYThreshold) this.playCard(SKIP_CARD)
        else this.resetCardPosition()
      },
    })
  },

  beforeDestroy() {
    this.$interact(this.$refs.interactElement).unset()
  },

  methods: {
    toPersianNumberFormat,

    hideCard() {
      setTimeout(() => {
        this.isShowing = false
        this.$emit('hideCard', this.card)
      }, 300)
    },

    playCard(interaction) {
      const {
        interactOutOfSightXCoordinate,
        interactOutOfSightYCoordinate,
        interactMaxRotation,
      } = this.$options.static

      this.interactUnsetElement()

      switch (interaction) {
        case ACCEPT_CARD:
          this.interactSetPosition({
            x: interactOutOfSightXCoordinate,
            rotation: interactMaxRotation,
          })
          this.$emit(ACCEPT_CARD)
          break
        case REJECT_CARD:
          this.interactSetPosition({
            x: -interactOutOfSightXCoordinate,
            rotation: -interactMaxRotation,
          })
          this.$emit(REJECT_CARD)
          break
        // case SKIP_CARD:
        //   this.interactSetPosition({
        //     y: interactOutOfSightYCoordinate,
        //   })
        //   this.$emit(SKIP_CARD)
        //   break
      }

      this.hideCard()
    },

    interactSetPosition(coordinates) {
      const { x = 0, y = 0, rotation = 0 } = coordinates
      this.interactPosition = { x, y, rotation }
    },

    interactUnsetElement() {
      this.$interact(this.$refs.interactElement).unset()
      this.isInteractDragged = true
    },

    resetCardPosition() {
      this.interactSetPosition({ x: 0, y: 0, rotation: 0 })
    },

    onClick(event) {
      const {
        interactOutOfSightXCoordinate,
        interactOutOfSightYCoordinate,
        interactMaxRotation,
      } = this.$options.static

      this.interactUnsetElement()

      const rect = this.$refs.interactElement.getBoundingClientRect()
      const posX = event.clientX - rect.left
      const center = rect.width / 2

      if (posX > center) {
        // console.log('Clicked on the right side of the element')
        this.interactSetPosition({
          x: interactOutOfSightXCoordinate,
          rotation: interactMaxRotation,
        })
        this.$emit(ACCEPT_CARD)
      } else {
        this.interactSetPosition({
          x: -interactOutOfSightXCoordinate,
          rotation: -interactMaxRotation,
        })
        this.$emit(REJECT_CARD)
        // console.log('Clicked on the left side of the element')
      }

      this.hideCard()
    },
  },
}
</script>
  
<style lang="scss" scoped>
$ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);
$c-white: #fff;
$c-black: #000;
$c-red-50: #73345e;
$c-red-25: #432958;
$c-navy: #0f0e3d;
$c-text: #8285a7;
$primary-gradient-start: #d94e47;
$primary-gradient-end: #df1165;

@mixin _position($position, $args) {
  @each $dir in top, left, bottom, right {
    $i: index($args, $dir);

    @if $i {
      #{$dir}: nth($args, $i + 1);
    }
  }

  position: $position;
}

@mixin absolute($args) {
  @include _position(absolute, $args);
}

@mixin card() {
  border-radius: 15px;
  box-shadow: 0 30px 30px 0 rgba(0, 0, 0, 0.05);
}

@mixin sizing($args, $prefix: '') {
  $width: if(length($args) == 2, nth($args, 1), $args);
  $height: if(length($args) == 2, nth($args, 2), $args);

  #{$prefix}width: $width;
  #{$prefix}height: $height;
}

@mixin flex-center() {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin after() {
  &::after {
    content: '';

    @content;
  }
}

$fs-h2: rem(24px);
$fw-bold: 700;
$cardsWidth: 300px;
$cardsTotal: 3;
$cardsPositionOffset: 55vh * 0.06;
$cardsScaleOffset: 0.08;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);
$fs-card-title: 1.125em;

.card {
  @include card();
  //   border-radius: 15px;
  //   box-shadow: 0 30px 30px 0 rgba(0, 0, 0, 0.05);

  @include absolute(0);
  //   position: absolute;

  @include sizing(100% 80vw);
  // width: 100%;

  @include flex-center();
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;

  @include after() {
    // that bottom line

    @include sizing(21px 3px);
    @include absolute(right 0 bottom 11px left 0);

    margin: auto;
    border-radius: 100px;
    background: rgba($c-black, 0.3);
  }

  display: flex;
  max-height: 200px;
  margin: auto;

  font-size: $fs-h2;
  //rem(24px)
  font-weight: $fw-bold;
  //700
  color: $c-white;
  //#fff

  // background-color: blue;
  opacity: 0;

  transform: translateY($defaultTranslation) scale($defaultScale);
  //$defaultTranslation: $cardsPositionOffset * $cardsTotal;
  //$cardsTotal: 3;
  //$cardsPositionOffset: 55vh * 0.06;

  transform-origin: 50%, 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity;

  height: 100vw;

  &.isCurrent {
    pointer-events: auto;
  }

  &.isAnimating {
    transition: transform 0.7s $ease-out-back;
  }
}

@for $i from 1 through $cardsTotal {
  $index: $i - 1;
  $translation: $cardsPositionOffset * $index;
  $scale: 1 - ($cardsScaleOffset * $index);

  .card:nth-child(#{$i}) {
    z-index: $cardsTotal - $index;
    opacity: 1;
    transform: translateY($translation) scale($scale);

    // @if $i == 3 {
    //   color: $c-red-25;
    //   background-color: $c-red-25;
    // } @else if $i == 2 {
    //   color: $c-red-50;
    //   background-color: $c-red-50;
    // }

    @if $i != 1 {
      background-image: none;

      @include after() {
        @include sizing(0 0);
      }
    }
  }
}
</style>
  