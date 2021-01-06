<template>
  <div id="app">
    <img alt="Vue logo" src="/@assets/logo.png" />
    <HelloWorld :msg="msg" />
  </div>
  
</template>

<script lang="ts">
import HelloWorld from '/@components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup(){
    const msg: string='Hello Vue 3.0 + Vite'
    return {msg}
  }

}
</script>
