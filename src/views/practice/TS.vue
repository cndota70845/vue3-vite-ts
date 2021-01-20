<template>
    <div class="TS">
        <a-row class="row">
            <a-input :value="name" @change="name=$event.target.value" addonBefore="请输入姓名" allow-clear draggable="" @pressEnter="addperson" />
        </a-row>
        <a-row class="row">
            <a-input :value="nation" @change="nation=$event.target.value" addonBefore="请输入国籍" allow-clear @pressEnter="addperson" />
        </a-row>
        <a-row class="row">
            <a-button @click="addperson" type="primary">添加人员</a-button>
        </a-row>
        <a-row class="row">
            <a-input addonBefore="JS防抖测试" @change="text2=$event.target.value" allow-clear :defaultValue="text2"/>
        </a-row>
        <a-row class="row">
            <a-input addonBefore="vue3防抖测试" @change="text=$event.target.value" allow-clear :defaultValue="text"/>
        </a-row>
        <a-row>{{text}}</a-row>
        <a-row>{{text2}}</a-row>
        <a-row class="row">
            <a-table 
                :columns="columns" 
                :data-source="state.person"
                :rowKey="(record,index)=>{return index}" 
                :style="{width:'100%'}"   
            >
                <template #action="{record,index}">
                    <a-button type="danger" @click="del(record,index)">删除</a-button>
                </template>
            </a-table>
        </a-row>
    </div>
</template>

<script lang="ts">
import { ref,onMounted,watch,reactive,getCurrentInstance, customRef, watchEffect} from 'vue'
import game from '../../method/game'
export default {
    name:"TS",
    setup(props,context){
        const { ctx } :any = getCurrentInstance();
        let name=ref()
        let nation=ref()
        let state = reactive({
            person:[]
        })
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '国籍',
                dataIndex: 'nation',
                key: 'nation'
            },
            {
                title: 'Action',
                key: 'action',
                slots: { customRender: 'action' },
            }
        ]
        enum content{
            none='有参数没有输入',
            exist='此人已经存在'
        }
        function addperson() :void{
            if(name.value==='' || nation.value==='' || name.value===undefined || nation.value===undefined){
                ctx.$message.error(content.none,1)  
            }
            else if(state.person.filter(item=>item.name===name.value).length>0){
                ctx.$message.error(content.exist,1)
            }   
            else{
                const p = new game.human.person(name.value,nation.value);
                p.say();
                state.person.push(p);
            }
        }
        interface table{
            name: string;
            nation: string;
        }
        function del(val :table,ind: number){
            state.person.splice(ind,1)
        }
        function useDebounce(val:string,delay = 500){
            let timeout;
            return customRef((track,trigger)=>{
                return{
                    get() {
                        track()
                        return val
                    },
                    set(newValue:string) {
                        clearTimeout(timeout)
                        timeout = setTimeout(() => {
                            val = newValue
                            trigger()
                        }, delay)
                    }
                }
            })
        }
        watchEffect(()=>{
            console.log(state.person)
        })
        let text:object
        const Default:string= '初始值'
        text = useDebounce(Default)
        const text2 = ref('')
        //防抖debounce代码：
        function debounce(fn:any,delay:number) {
            let timeout = null; // 创建一个标记用来存放定时器的返回值
            clearTimeout(timeout); 
            // 然后又创建一个新的 setTimeout, 这样就能保证interval 间隔内如果时间持续触发，就不会执行 fn 函数
            timeout = setTimeout(() => {
                fn.apply(this, arguments);
            }, delay);
        }
        // 处理函数
        function handle() {
            console.log('防抖：', Math.random());
        }
        watch(()=>{
            return text2.value
        }, (newVal,oldVal) => {
            debounce(handle,1000)
        })
        return{
            name,
            nation,
            addperson,
            state,
            columns,
            del,
            text,
            text2
        } 
    }
}
</script>

<style scoped>
.TS{
    width: 90%;
    margin: 0 auto;
}
.row{
    text-align: center;
    margin-top:10px;
}
</style>