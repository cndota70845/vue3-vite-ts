<template>
    <div id="Wheel">
        <input ils-model="name" placeholder="姓名"></input>
        <div class="clear"></div>
        <input ils-model="age" placeholder="年龄"></input>
        <div class="clear"></div>
        <input ils-model="address" placeholder="地址"></input>
        <div class="clear"></div>
        <p>
            姓名:<span>**name**</span>
            年龄:<span>**age**</span>
            地址:<span>**address**</span>
        </p>
    </div>
</template>

<script>
import MVVM from '/@/method/MVVM.ts';
import { onMounted } from 'vue';
export default {
    name:'Wheel',
    setup () {
        onMounted(() => {
            const data = new MVVM ('#Wheel',{
                name:'liuyan',
                age:'',
                address:''
            });
        });
    }
}
</script>

<style scoped>
.clear {
    height: 10px;
}
#Wheel p{
    text-align: left;
}
#Wheel p span{
    margin-right:20px;
}
</style>