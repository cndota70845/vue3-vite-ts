<template>
    <div class="Home">
        <a-layout id="components-layout-demo-top" class="layout">
            <a-layout-header>
                <div class="logo">
                    <a-menu
                        theme="dark"
                        mode="horizontal"
                        @click="routerChange"
                    >
                        <a-menu-item key="Vue3">Vue3</a-menu-item>
                        <a-menu-item key="TS">TS</a-menu-item>
                    </a-menu>
                </div>
            </a-layout-header>
            <a-layout-content style="padding: 0 50px">
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
import { getCurrentInstance} from 'vue'
import { Menu,Layout } from 'ant-design-vue'
export default {
    name:"Home",
    components:{
        'a-menu':Menu,
        'a-menu-item':Menu.Item,
        'a-layout':Layout,
        'a-layout-header':Layout.Header,
        'a-layout-content':Layout.Content,
        'a-layout-footer':Layout.Footer
    },
    setup(props,context){
        const { ctx } :any= getCurrentInstance(); 
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
            routerChange
        }
    }
}
</script>

<style scope>
#components-layout-demo-top .logo {
    width: 100%;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
}
.Home{
    height: 100%;
}
#components-layout-demo-top{
    height: 100%;
}
</style>