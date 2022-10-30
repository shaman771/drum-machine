<template>
  <button
    :id="pad.label"
    class="drum-pad"
    @click="handlePlay"
  >
    {{ pad.key.toUpperCase() }}
    <audio
      :id="pad.key"
      :src="pad.source"
      class="clip"
    />
  </button>
</template>

<script>
export default {
  name: 'DrumPad',
  props: {
    pad: {
      type: Object,
      required: true
    }
  },

  emits: ['play'],

  setup(props, { emit }) {

    function handlePlay() {
      emit('play', props.pad)
    }

    return {
      handlePlay
    }

  }
}
</script>

<style lang="scss" scoped>
.drum-pad {
  background: rgb(214, 214, 214);
  background: radial-gradient(circle, rgba(214, 214, 214, 1) 0%, rgba(173, 173, 173, 1) 40%);
  min-height: 10rem;
  border-radius: 0.125rem;
  overflow: clip;
  font-size: 3em;
  width: 100%;
  height: 100%;
  border: none;
  cursor: pointer;
  color: #740000;

  &:hover {
    background: radial-gradient(circle, rgba(218, 214, 214, 1) 0%, rgba(185, 173, 173, 1) 38%);
  }

  &:active, &.clicked {
    background: radial-gradient(circle, rgba(230, 214, 214, 1) 0%, rgba(200, 173, 173, 1) 45%);
    color: #930000;
  }
}

</style>
