<template>
    <div class="lis-select" ref="select">
        <div class="lis-select-selector">
            <div class="lis-select-input">

            </div>
            <div class="lis-select-options" v-show="optionShow">
                <ul id="options">
                    <li v-for="(item, index) in optionData" @click="optionMethod($event)" :value="item.value">
                        {{item.text}}
                    </li>
                </ul>
            </div>
        </div>
        <span class="ant-select-arrow" unselectable="on" aria-hidden="true" style="user-select: none;">
            <span role="img" aria-label="down" class="anticon anticon-down ant-select-suffix">
                <svg class="" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" focusable="false">
                    <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                </svg>
            </span>
        </span>
    </div>
</template>

<script lang="ts">
import { getCurrentInstance, reactive, onMounted, toRefs, ref } from 'vue';

export default {
    name: 'lis-Selector',
    props: [
        'data',
        'curIndex',
        'clickMethod'
    ],
    setup (props) {
        const { ctx } :any = getCurrentInstance();
        const selectorOptin = reactive({
            optionShow: false,
            optionData: props.data
        })

        const clickMethod = props.clickMethod
        const curInx = ref(props.curIndex);

        function init () {
            ctx.$refs.select.addEventListener('click', function () {
                selectorOptin.optionShow = !selectorOptin.optionShow;
            })
            let options = document.getElementById('options');
            let optionsList = options.getElementsByTagName('li');
            for(let i = 0;i < optionsList.length; i++){
                optionsList[i].addEventListener('mouseover', function () {
                    optionsList[i].style.background = '#b0abab';
                })
                optionsList[i].addEventListener('mouseout', function () {
                    optionsList[i].style.background = '';
                })
            }
        }

        function optionMethod(val) {
            props.clickMethod(val);
        }

        onMounted(()=>{
            init();
        })

        return{
            ...toRefs(selectorOptin),
            optionMethod,
            curInx
        }
    }
}
</script>

<style>
.lis-select{
    width: 200px;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0,0,0,.85);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 50px;
    list-style: none;
    font-feature-settings: tnum;
    position: relative;
    display: inline-block;
    cursor: pointer;
}
.lis-select-selector{
    position: relative;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    height: 32px;
    padding: 0 11px;
}
.lis-select-options{
    position: absolute;
    top: 32px;
    left: 0;
    width: 100%;
    height: auto;
    border:1px solid rgb(217, 217, 217);
}
.lis-select-options ul{
    margin: 0;
    padding: 0;
    list-style: none;
    text-align: left;
    text-indent: 10px;
}
.lis-select-input{

}
</style>