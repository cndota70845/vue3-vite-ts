<template>
  <div>
    <h1 :class="style.name">{{p}}</h1>
    <p>{{n}}</p>
    <p>{{msg}}=={{text}}</p>
    <button @click="FunConstructor">你好世界</button>
  </div>
</template>

<script lang="ts">
import {ref} from 'vue'
import style from '/@assets/css/style.modules.css'
export default {
  props:{
    msg: String
  },
  setup(props,context){
    const text: string = props.msg
    const enum test{
      st = '你好',
      num = 0
    }

    const p: String = test.st
    let n = ref(test.num)
    function FunConstructor() :void{
      
      console.log(n)
    }
    return{
      p,
      style,
      n,
      FunConstructor,
      text
    }
  }
}
</script>
