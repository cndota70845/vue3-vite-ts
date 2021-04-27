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
        <h2>{{list}}</h2>
        <div class="containerDrag">
            <div id="draggable" class="wrapper">
                <div v-for="(item,index) in list" :key="index" :idx="item.id" class="dragItem">
                    <p>{{item.name}}</p>
                </div>
            </div>
            <div id="dragArea" class="area">
                
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, getCurrentInstance, onMounted} from 'vue';
import list from '/@/views/practice/list.json';
export default {
    name:'testJS',
    setup () {
        const { proxy } = getCurrentInstance();
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
            },[]),
            list:list
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

        onMounted(() => {
            initDrag();
        });

        function initDrag() {
            const draggable = document.querySelector('#draggable').querySelectorAll('.dragItem');
            draggable.forEach(item => {
                let id = item.getAttribute('idx');
                let idx = active.list.findIndex((element) => { return element.id == id;});
                //鼠标按下事件
                item.addEventListener('mousedown',() => {
                    item.style.backgroundColor = 'rgb(44, 62, 80)';
                    item.style.position = 'absolute';
                    if (idx !== -1) {
                        active.list[idx].drag = true;
                    }
                });
                //鼠标移动事件
                item.addEventListener('mousemove',(event) => {
                    if (idx !== -1 && active.list[idx].drag ) {
                        let left = event.clientX;
                        let right = event.clientY;
                        console.log(left,right);   
                    }
                });
                //鼠标抬起事件
                item.addEventListener('mouseup',() => {
                    item.style.backgroundColor = 'rgb(66, 185, 131)';
                    if (idx !== -1) {
                        active.list[idx].drag = false;
                    }
                });
            });
        } 

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