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
import {Input,Button,Row,Col,Table} from 'ant-design-vue'
import { ref,onMounted,watch,reactive } from 'vue'
import game from '../../method/game'
export default {
    name:"TS",
    components:{
        'a-input':Input,
        'a-button':Button,
        'a-col':Col,
        'a-row':Row,
        'a-table':Table
    },
    setup(props,context){
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
        function addperson() :void{
            console.log(name.value,nation.value)
            if(name.value==='' || nation.value==='' || name.value===undefined || nation.value===undefined){
                console.error('有参数没有输入')
            }
            else if(state.person.filter(item=>item.name===name.value).length>0){
                console.error('此人已经存在')
            }   
            else{
                const p = new game.person(name.value,nation.value);
                p.say();
                state.person.push(p);
                console.log(state.person)
            }
        }
        interface table{
            name: string;
            nation: string;
        }
        function del(val :table,ind: number){
            state.person.splice(ind,1)
        }
        onMounted(() => {
            console.log(name.value,nation.value)
        })
        watch(state.person, () => {
            console.log(state.person, '改变')
        })
        return{
            name,
            nation,
            addperson,
            state,
            columns,
            del
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