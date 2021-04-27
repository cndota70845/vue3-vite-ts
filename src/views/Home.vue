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
                        :selectedKeys="[pathRef]"
                        :pagination="{pageSize:15}"
                    >
                        <a-menu-item :key="item.key" v-for="item in newArr">{{item.content}}</a-menu-item>
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
import { getCurrentInstance,onMounted,reactive,toRef} from 'vue'
import menuData from '../assets/data/menu'
import menuFuc from '../method/menu'
import copy from '../method/deepCopy'
export default {
    name:"Home",
    setup(props,context){
        const { ctx } :any = getCurrentInstance();
        interface IMEMU {
            id :number;
            key :string;
            content :string;
            icon ?:string;
            children ?:IMEMU[];
        }
        const arr = menuFuc.identity<IMEMU[]>(menuData.menuArr);
        const newArr = copy.deepcopy(arr);
        const routerPath = reactive({ path: ctx.$router.currentRoute.value.path.replace('/','') });
        const pathRef = toRef(routerPath,'path');
        interface pathData {
            item: any;
            key: string;
            keyPath: string[];
        }
        function routerChange(item) :void{
            const path :string = '/' + item.key;
            pathRef.value = item.key; 
            ctx.$router.push(path);
        }
        return {
            routerChange,
            pathRef,
            newArr
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
    min-height: 100%;
}
</style>