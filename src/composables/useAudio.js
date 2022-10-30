export default function useAudio() {

  const context = new AudioContext();
  const gainNode = context.createGain();
  const tracks = {};

  function initTracks(audioElements) {
    audioElements.forEach((el) => {
      tracks[el.id] = context.createMediaElementSource(el);
    })
  }

  function setVolume(volumePercent) {
    gainNode.gain.value = volumePercent / 50; // narrow down to 0...2 scale, with 1 as default
  }

  function playTrack(trackId) {
    if (context.state === 'suspended') {
      context.resume();
    }

    const source = tracks[trackId];
    if (source) {
      source.connect(gainNode).connect(context.destination);
      source.mediaElement.play();
    }
  }

  return {
    initTracks,
    playTrack,
    setVolume,
  }
}
