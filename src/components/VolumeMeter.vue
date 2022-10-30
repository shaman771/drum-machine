<template>
  <div
    class="volume-meter no-select"
    role="slider"
    @click="handlePointerMove"
    @pointerdown="handleDrag"
  >
    <i
      class="volume-meter-slide"
      :style="{ transform: `translateX(${sliderWidthPercent - 100}%)` }"
    />
  </div>
</template>

<script>
import {ref, watch} from 'vue';

export default {
  name: 'VolumeMeter',

  emits: ['change'],

  setup(props, { emit }) {
    const sliderWidthPercent = ref(50);

    function handleDrag(evt) {
      const el = evt.currentTarget;
      el.setPointerCapture(evt.pointerId);
      el.addEventListener('pointermove', handlePointerMove);
      el.addEventListener('pointerup', handlePointerUp, { once: true });
    }

    function handlePointerMove(evt) {
      const maxX = evt.currentTarget.clientWidth;
      const posX = Math.floor(evt.offsetX);
      if (posX <= 0) {
        sliderWidthPercent.value = 0;
        return;
      }

      if (posX > maxX) {
        sliderWidthPercent.value = 100;
        return;
      }

      sliderWidthPercent.value = Math.floor(posX * 100 / maxX);
    }

    function handlePointerUp(evt) {
      const el = evt.currentTarget;
      el.releasePointerCapture(evt.pointerId);
      el.removeEventListener('pointermove', handlePointerMove);
    }

    watch(() => sliderWidthPercent.value, () => {
      emit('change', sliderWidthPercent.value)
    })

    return {
      sliderWidthPercent,
      handlePointerMove,
      handleDrag,
    }
  }
}
</script>

<style lang="scss" scoped>
.volume-meter {
  background: #8a4040;
  width: 12.8em;
  height: 3.7em;
  mask-image: url("../assets/volume-bars.svg");
  mask-size: cover;
  mask-clip: content-box;
  position: relative;
  padding: 0 1em;
  cursor: pointer;
  overflow: hidden;

  &-slide {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #f6d0a6;
    opacity: 0.7;
  }
}

.no-select {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:focus {
    outline: none !important;
  }
}
</style>
