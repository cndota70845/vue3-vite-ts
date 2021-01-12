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
import { ref,onMounted,watch,reactive,getCurrentInstance} from 'vue'
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
                const p = new game.person(name.value,nation.value);
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