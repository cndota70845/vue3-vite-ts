<template>
    <div class="Wheel" id="ils">
        <a-row class="row">
            <a-input ils-model="name" placeholder="姓名"></a-input>
        </a-row>
        <a-row class="row">
            <a-input ils-model="age" placeholder="年龄"></a-input>
        </a-row>
        <a-row class="row">
            <a-input ils-model="sex" placeholder="性别"></a-input>
        </a-row>
        <a-row class="row">
            <a-input ils-model="address" placeholder="地址"></a-input>
        </a-row>
        <a-row>
            <p>姓名: *$ name $*</p>
            <p>年龄: *$ age $*</p>
            <p>性别: *$ sex $*</p>
            <p>地址: *$ address $*</p>
        </a-row>
    </div>
</template>

<script lang="ts">
import MVVM from './MVVM';
export default {
    name:'Wheel',
    setup () {
        const data = new MVVM('#ils',{
            name:'',
            age:0,
            sex:'',
            address:''
        });

        return {
        }
    }
}
</script>

<style scoped>
.row {
    margin-top: 20px;
}
</style>