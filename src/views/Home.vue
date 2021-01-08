<template>
    <div class="Home">
        <a-menu v-model="selectedKeys" mode="horizontal" @click="routerChange">
            <a-menu-item key="Vue3">Vue3</a-menu-item>
            <a-menu-item key="TS">TS</a-menu-item>
        </a-menu>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { Menu } from 'ant-design-vue'
export default {
    name:"Home",
    components:{
        'a-menu':Menu,
        'a-menu-item':Menu.Item
    },
    setup(props,context){
        const { ctx } :any= getCurrentInstance(); 
        const selectedKeys = ref('current')
        interface pathData {
            item: any
            key: string
            keyPath: string[]
        }
        function routerChange(item) :void{
            const path :string='/'+item.key
            ctx.$router.push(path)   
        }
        return {
            selectedKeys,
            routerChange
        }
    }
}
</script>

<style>

</style>