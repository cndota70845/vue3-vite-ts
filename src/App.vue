<template>
    <!-- <img alt="Vue logo" src="/@assets/logo.png" />
    <HelloWorld :msg="msg" /> -->
    <router-view></router-view>
</template>

<script lang="ts">
// import HelloWorld from '/@components/HelloWorld.vue'

export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // },
  setup(){
    const msg: string='Hello Vue 3.0 + Vite'
    return {msg}
  }

}
</script>
<style>
#app{
  height:100%;
}
</style>
