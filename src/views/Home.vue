<template>
    <div class="Home">
        <a-layout id="components-layout-demo-top" class="layout">
            <a-layout-header>
                <div class="logo">
                    <a-menu
                        theme="dark"
                        mode="horizontal"
                        @click="routerChange"
                        style="line-height:64px;"
                        :selectedKeys="[routerPath.path]"
                        :pagination="{pageSize:15}"
                    >
                        <a-menu-item :key="item.key" v-for="item in arr">{{item.content}}</a-menu-item>
                    </a-menu>
                </div>
            </a-layout-header>
            <a-layout-content style="padding: 0 50px" id="components-layout-demo-content">
                <div :style="{ background: '#fff', padding: '24px', minHeight: '100%' }">
                    <router-view></router-view>
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </div>
</template>

<script lang="ts">
import { getCurrentInstance,onMounted,reactive} from 'vue'
import menuData from '../assets/data/menu'
import menuFuc from '../method/menu'
export default {
    name:"Home",
    setup(props,context){
        interface IMEMU {
            id :number;
            key :string;
            content :string;
            icon ?:string;
            children ?:IMEMU[];
        }
        const arr = menuFuc.identity<IMEMU[]>(menuData.menuArr)
        const { ctx } :any = getCurrentInstance();
        const routerPath = reactive({ path: ctx.$router.currentRoute.value.path.replace('/','') })
        interface pathData {
            item: any
            key: string
            keyPath: string[]
        }
        function routerChange(item) :void{
            const path :string='/'+item.key
            routerPath.path = item.key   
            ctx.$router.push(path)
        }
        return {
            routerChange,
            routerPath,
            arr
        }
    }
}
</script>

<style scope>
#components-layout-demo-top .logo {
    width: 100%;
    height: 64px;
    background: rgba(255, 255, 255, 0.2);
    margin:0 auto;
    float: left;
    line-height: 64px;
}
.Home{
    height: 100%;
}
#components-layout-demo-top{
    height: 100%;
}
</style>