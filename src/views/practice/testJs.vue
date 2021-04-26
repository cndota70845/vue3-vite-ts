<template>
    <div class="testJS">
        <h1>1.float布局：(是专门为IE准备的);</h1>
        <div class="header">
            <div class="Logo">
                Logo
            </div>
            <div class="Name">
                Name
            </div>
            <div class="Search">
                Search
            </div>
        </div>
        <h1>2.flex布局：</h1>
        <div class="container">
            <template v-for="(item,index) in menu" :key="index">
                <div :class="className(item.status)" @click="changeColor(index)">
                    {{item.name}}
                </div>
            </template>
        </div>
        <h1>3.Grid布局：（功能最强大的布局方案）</h1>
        <div class="containerGrid">
            <template v-for="(item,index) in menu" :key="index">
                <div class="itemGrid">
                    {{item.name}}
                </div>
            </template>
        </div>
        <div class="example2Left"></div>
        <div class="example2Right"></div>
    </div>
</template>

<script>
import { reactive, toRefs} from 'vue';
export default {
    name:'testJS',
    setup () {
        const menu = [
            'Vue3',
            'TS',
            'Axios',
            'Test',
            'LisUI',
            'LogicFlow'
        ]

        const active = reactive({
            menu:menu.reduce(function(acc,cur,idx,src) {
                acc.push({
                    name:cur,
                    status:0
                });
                return acc;
            },[])
        });

        function className (sta) {
            if (sta) {
                return 'item on';
            }
            else {
                return 'item';
            }
        }

        function changeColor (idx) {
            if (active.menu.some((item)=>{
                return item.status === 1;
            })) {
                active.menu.forEach((item,index) => {
                    if (item.status === 1) {
                        active.menu[index].status = 0;
                    }
                });
            }
            active.menu[idx].status = 1;
        }

        var a = new Sortable('.example2Left', {
            group: 'shared', // set both lists to same group
            animation: 150
        });
        
        var b = new Sortable('.example2Right', {
            group: 'shared',
            animation: 150
        });

        return {
            ...toRefs(active),
            className,
            changeColor
        }
    }
}
</script>

<style lang="less">
    @import './testJS.less';
</style>