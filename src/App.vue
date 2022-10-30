<template>
  <main class="app-content">
    <drum-box />
  </main>
  <footer class="app-footer">
    <p>
      Made by <a
        href="https://github.com/shaman771"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >shaman771</a> with fun, green tea and Vue 3
    </p>
    <p>
      Photo by <a href="https://unsplash.com/@micrinski?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Michael Dobrinski</a>
      on <a href="https://unsplash.com/s/photos/drum?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
    </p>
  </footer>
</template>

<script>

import DrumBox from '@/components/DrumBox';
export default {
  name: 'App',
  components: {
    DrumBox
  }
}
</script>

<style lang="scss">
:root {
  --pad-shadow-color: #18e8ea;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1rem;
  display: grid;
  grid-template-rows: auto 3em;
  height: 100vh;
  background: url("./assets/drumming.jpg");
  background-size: cover;
}

.app-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2em;
  background-color: rgba(128,128,128,0.3);
  color: #a6a6a6;

  p {
    font-size: 0.875em;
  }

  a {
    color: inherit;
  }

  > * + * {
    margin-left: 0.5em;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;

    p {
      margin: 0;
    }
  }
}

.app-content {
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    flex: 1;
  }
}


</style>
