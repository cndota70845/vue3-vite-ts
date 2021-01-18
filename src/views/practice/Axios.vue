<template>
    <div class="Axios">
        <a-row class="row">
            <a-input :value="formLogin.gh" @change="formLogin.gh=$event.target.value" addonBefore="请输入工号" allow-clear draggable="" @pressEnter="login" />
        </a-row>
        <a-row class="row">
            <a-input :value="formLogin.name" @change="formLogin.name=$event.target.value" addonBefore="请输入姓名" allow-clear @pressEnter="login" />
        </a-row>
        <a-row class="row">
            <a-button @click="login" type="primary" >登录</a-button>
        </a-row>
        <a-row class="row table">
            <a-table 
                :columns="columns" 
                :data-source="data" 
                :rowKey="(record,index)=>{return index}"
                :style="{width:'100%'}"
                bordered>
            </a-table>
        </a-row>
    </div>
</template>

<script lang="ts">
import {reactive,getCurrentInstance,ref,onMounted} from 'vue'
export default {
    name:"Axios",
    setup(props,context){
        const { ctx } :any = getCurrentInstance();
        const columns=[
            {title: '任务名称',key: 'approve_name',dataIndex:'approve_name'},
            {title: '申报人',key: 'name',dataIndex:'name'},
            {title: '任务类别',key: 'task_category',dataIndex:'task_category'},
            {title: '出发日期',key: 'departure_date',dataIndex:'departure_date'},
            {title: '出访国家/地区',key: 'area',dataIndex:'area'},
            {title: '任务状态',key: 'workflow_status',dataIndex:'workflow_status'}
        ]
        let formLogin = reactive({
            gh:'',
            name: ''
        });
        let research_option= reactive({
            approve_name:String,
            area:String,
            departure_date:String,
            page_num:1
        })
        let data = ref([])
        async function login(){
            const params:object={
                ptype:'教职工',
                yxsh:'010129',
                yxmc:'信息化办公室、信息中心',
                code:formLogin.gh,
                name:formLogin.name
            }
            const res = await ctx.$api.login.login(params);
            if(res && res.data.code==1){
                getList({page_num:research_option.page_num})
            }
        };
        async function getList(params:object) {
            const res = await ctx.$api.Rec.listGet (params);
                if(res && res.data.code ===1){
                    data.value = res.data.data
                }
        }
        onMounted(()=>{
            if(ctx.$cookies.get('token')){
                getList({page_num:research_option.page_num})
            }
        })
        return{
            login,
            formLogin,
            data,
            columns
        }
    }
}
</script>

<style>
.Axios{
    width: 90%;
    margin: 0 auto;
    min-height: 100%;
}
.row{
    text-align: center;
    margin-top:10px;
}
.table{
    width: 100%;
}
</style>