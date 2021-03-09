<template>
    <div>
        <lis-Selector 
            :data="options"
            :clickMethod="clickMethod"
            v-model:value="selectValue"
            :multiple="true"
        >
        </lis-Selector>
    </div>
    <div>{{selectValue}}</div>
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
        const selectValue = ref('');

        function clickMethod (options) {
            console.log('选中',options.text, options.value)
        }
        
        return {
            options,
            clickMethod,
            curINX,
            selectValue
        }
    }
}
</script>

<style>

</style>