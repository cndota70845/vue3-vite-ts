<template>
  <div>
    <h1 :class="style.name">{{p}}</h1>
    <p>{{n}}=={{state.count}}</p>
    <p>{{msg}}=={{text}}</p>
    <button @click="FunConstructor">+1</button>
  </div>
</template>

<script lang="ts">
import {ref,reactive,watchEffect,onMounted} from 'vue'
import style from '/@assets/css/style.modules.css'
export default {
  props:{
    msg: String
  },
  setup(props,context){
    const text: string = props.msg
    enum test{
      st = '你好',
      num = 0
    }
    const p: String=test.st
    let state = reactive({
      count:0
    })
    let n = ref(0)
    function FunConstructor() :void{
      state.count++
      n.value++
    }
    watchEffect(()=>{

    })
    onMounted(()=>{
      console.log('onMounted')
      FunConstructor()
    })
    return{
      state,
      style,
      n,
      FunConstructor,
      text,
      p
    }
  }
}
</script>
