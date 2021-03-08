<template>
    <div>
        <lis-Selector 
            :data="options"
            :curIndex="curINX"
            :clickMethod="clickMethod"
        >
        </lis-Selector>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'LisUI',
    setup () {
        const options = [
            {
                value: 20,
                text: '西瓜'
            },
            {
                value: 30,
                text: '草莓'
            },
            {
                value: 100,
                text: '车厘子'
            }
        ]
        const curINX = ref(1);


        function clickMethod (val) {
            console.log('选中',val)
        }
        
        return {
            options,
            clickMethod,
            curINX
        }
    }
}
</script>

<style>

</style>