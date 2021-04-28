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
                <template v-for="(item,index) in list" :key="index">
                    <div 
                        :idx="item.id" 
                        class="dragItem"
                        :style="{'top':String((index * 50) - 200) + 'px'}"
                    >
                        <p>{{item.name}}</p>
                </div>
                </template>
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
        let menu = [
            'Vue3',
            'TS',
            'Axios',
            'Test',
            'LisUI',
            'LogicFlow'
        ]

        menu.forEach((item, idx) => {
            if (idx === 4) {
                menu[idx] = menu[idx].replace('UI','');
            }
        });

        menu = menu.map((item, idx) => {
            return item + '*';
        });

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
            const draggable = document.querySelector('#draggable');
            const list = draggable.querySelectorAll('.dragItem');
            list.forEach((item,index) => {
                let id = item.getAttribute('idx');
                let idx = active.list.findIndex((element) => { return element.id == id;});
                let point = null;
                //鼠标按下事件
                item.addEventListener('mousedown',(event) => {
                    point = {
                        innerX: event.clientX,
                        innerY :event.clientY
                    }

                    if (idx !== -1) {
                        downItem({
                            index: idx,
                            target: item
                        });
                    }
                });
                //鼠标移动事件
                item.addEventListener('mousemove',(event) => {
                    if (idx !== -1 && active.list[idx].drag ) {
                        let innerX = event.clientX - point.innerX; // 获取鼠标在方块内的x轴距
                        let innerY = event.clientY - point.innerY; // 获取鼠标在方块内的y轴距
                        item.style.top = String((idx * 50) - 200 + innerY) + 'px';
                        item.style.left = String(0 + innerX) + 'px';
                        item.style.zIndex = '1000';
                    }
                });
                //鼠标抬起事件
                item.addEventListener('mouseup',(event) => {
                    console.log(event);
                    item.style.backgroundColor = 'rgb(66, 185, 131)';
                    item.style.top = String((idx * 50) - 200) + 'px';
                    item.style.left = '0px';
                    if (idx !== -1) {
                        active.list[idx].drag = false;
                    }
                });
            });
        }

        function downItem (opt) {
            let drag = opt.target;
            let idx = opt.index;
            active.list[idx].drag = true;
            drag.style.backgroundColor = 'rgb(66, 185, 131,0.7)';
            return drag;
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