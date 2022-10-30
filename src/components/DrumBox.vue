<template>
  <div
    id="drum-machine"
    class="drum-machine"
  >
    <h1 class="title">
      Toy Drum Machine
    </h1>

    <div class="pad-box">
      <drum-pad
        v-for="pad in pads"
        :key="pad.id"
        :pad="pad"
        @play="handlePlay"
      />
    </div>

    <div class="console">
      <div
        id="display"
        class="display"
      >
        <span>{{ lastPlayed }}</span>
      </div>

      <div class="controls">
        <volume-meter @change="setVolume" />
      </div>
    </div>
  </div>
</template>

<script>
import DrumPad from '@/components/DrumPad';
import {padConfig} from '@/pad-config';
import {onMounted, onUnmounted, ref} from 'vue';
import VolumeMeter from '@/components/VolumeMeter';
import useAudio from '@/composables/useAudio';

const expectedKeys = padConfig.map((pad) => pad.key.toLowerCase());

export default {
  name: 'DrumBox',
  components: {VolumeMeter, DrumPad},

  setup() {
    const lastPlayed = ref('');
    const { initTracks, playTrack, setVolume } = useAudio();

    function handlePlay(pad) {
      playTrack(pad.key);
      lastPlayed.value = pad.label;
    }

    function handleKeydown(evt) {
      const keyId = evt.key.toUpperCase();
      const isExpectedKey = expectedKeys.includes(keyId);

      if (isExpectedKey) {
        const btn = document.querySelector(`#btn-${keyId}`);
        if (btn) {
          btn.click();
          btn.classList.add('clicked');
          setTimeout(() => {
            btn.classList.remove('clicked');
          }, 100);
        }
      }
    }

    onMounted(() => {
      const audioElements = Array.from(document.querySelectorAll('audio'));
      initTracks(audioElements);
      document.addEventListener('keydown', handleKeydown);
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown);
    })

    return {
      lastPlayed,
      pads: padConfig,
      handlePlay,
      setVolume,
    }

  }
}
</script>

<style lang="scss" scoped>
.drum-machine {
  width: 80%;
  max-width: 50em;
  padding: 2em;
  border-radius: 0.5em;
  background: rgb(246,176,176);
  background: linear-gradient(180deg, rgb(146 73 73) 0%, rgb(91, 0, 0) 4%, rgb(129, 0, 0) 93%, rgb(66, 0, 0) 100%);;
  box-shadow: 0 0 20px 12px rgb(0 0 0 / 50%);

  @media screen and (min-width: 768px) {
    width: 60%;
  }
}

.pad-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 0.75em;
}

.title {
  font-style: italic;
  font-weight: 400;
  color: #f6d0a6;
  font-size: 3em;
  text-shadow: 2px 2px 4px #280000;
  margin-top: 0.25em;
}

.console {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 2em;

  @media screen and (max-width: 512px) {
    flex-direction: column;

    > * + * {
      margin-top: 0.5em;
    }
  }
}

.display {
  border: 1px solid #740000;
  font-size: 2em;
  padding: 0.25em 0.5em;
  width: 40%;
  border-radius: 0.125em;
  background-color: #f6d0a6;
  color: #463b2e;
  box-shadow: 0 0 6px 0 #fff;
  min-height: 1.25em;

  @media screen and (max-width: 512px) {
    width: 90%;
  }
}

</style>
