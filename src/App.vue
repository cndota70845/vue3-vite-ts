<template>
    <router-view></router-view>
</template>

<script lang="ts">
export default {
  name: 'App',
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
