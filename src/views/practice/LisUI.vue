<template>
    <div class="LisUI">
        <div class="input">
            <lis-Selector 
                :data="options"
                :clickMethod="clickMethod"
                v-model:value="selectValue"
                :search="true"
                :placeholder="msg"
            >
            </lis-Selector>
            <div>{{selectValue}}</div>
        </div>
    </div>
    
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'LisUI',
    setup () {
        const options = [
            {
                value: '001',
                text: '西瓜'
            },
            {
                value: '002',
                text: '草莓'
            },
            {
                value: '003',
                text: '车厘子'
            }
        ]
        const curINX = ref(1);
        const selectValue = ref('001');
        const msg = '请在这个框里面填写信息'

        function clickMethod (options) {
            console.log('选中',options.text, options.value)
        }
        
        return {
            options,
            clickMethod,
            curINX,
            selectValue,
            msg
        }
    }
}
</script>

<style scoped>
.input {
    width: 300px;
    margin: 0 auto;
}
</style>