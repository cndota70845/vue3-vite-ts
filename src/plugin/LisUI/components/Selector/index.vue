<template>
    <div class="lis-select" ref="select">
        <div class="lis-select-selector">
            <div class="lis-select-input">
                <input ref="input" readonly>
                <div class="opList">
                    <span v-for="(item, index) in TextShow()">
                        {{item}}
                        <div class="cancel" @click="optionCancel(index)"><img alt="" src="/@/plugin/LisUI/assets/images/cancel.png"><div>
                    </span>
                </div>
            </div>
            <div class="lis-select-options" v-show="optionShow">
                <ul id="options">
                    <li v-for="(item, index) in optionData" :key="item.id" @mousedown="optionMethod(item,index)">
                        {{item.text}}
                        <span class="yes" v-show="IconShow(index)">
                            <img alt="">
                        </span>
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
import { getCurrentInstance, reactive, onMounted, toRefs, watch } from 'vue';

enum DOM {
    click = 'click',
    mouseover = 'mouseover',
    mouseout = 'mouseout'
}

enum STYLE {
    blue = 'rgb(24, 144, 255)',
    black = 'rgba(0, 0, 0, 0.85)',
    white = '#ffffff'
}

enum ELEMENT {
    options = 'options',
    li = 'li',
    blank = '',
    blueIcon = '/@/plugin/LisUI/assets/images/yes.png',
    wihteIcon = '/@/plugin/LisUI/assets/images/yesf.png'
}

export default {
    name: 'lis-Selector',
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        data: {
            type: Array
        },
        curIndex: {
            type: Number
        },
        clickMethod: {
            type: Function
        },
        value: {},
        multiple: {
            default: false
        }
    },
    setup (props, context) {
        const { ctx } :any = getCurrentInstance();
        const selectorOptin = reactive({
            optionShow: false,
            optionData: props.data,
            curInx: props.curIndex?props.curIndex:undefined,
            newValue: props.multiple?[]:ELEMENT.blank,
            InxList: []
        })

        function init () {
            ctx.$refs.input.addEventListener('focus', function () {
                selectorOptin.optionShow = true
            })
            ctx.$refs.input.addEventListener('blur', function () {
                selectorOptin.optionShow = false
            })
            let options = document.getElementById(ELEMENT.options);
            let optionsList = options.getElementsByTagName(ELEMENT.li);
            for(let i = 0;i < optionsList.length; i++){
                optionsList[i].addEventListener(DOM.mouseover, function () {
                    optionsList[i].style.background = STYLE.blue;
                    optionsList[i].style.color = STYLE.white;
                    if(IconShow(i)){
                        options.getElementsByTagName('img')[i].src = ELEMENT.wihteIcon;
                    }
                })
                optionsList[i].addEventListener(DOM.mouseout, function () {
                    optionsList[i].style.background = ELEMENT.blank;
                    optionsList[i].style.color = STYLE.black;
                    if(IconShow(i)){
                        options.getElementsByTagName('img')[i].src = ELEMENT.blueIcon;
                    }
                })
            }
        }

        function optionMethod(item, index) {
            if (IconShow(index) === false) {
                props.clickMethod(item);
                selectorOptin.curInx = index;
                if(props.multiple){
                    (selectorOptin.newValue as any[]).push(item.value);
                    selectorOptin.InxList.push(index);
                    selectorOptin.optionData.filter((el)=>el.value!=item.value);
                }
                else{
                    selectorOptin.newValue = item.value;
                }
            }
        }

        function TextShow () {
            if (props.multiple === true) {
                if (selectorOptin.InxList.length > 0) {
                    let arr = [];
                    selectorOptin.optionData.forEach((element,index) => {
                        if(selectorOptin.InxList.includes(index)){
                            arr.push(element.text);
                        }
                    });
                    return arr;
                }
                else {
                    return '';
                }
            }
            else {
                return selectorOptin.optionData[selectorOptin.curInx].text;
            }
        }

        function IconShow (index) {
            if (props.multiple === true && selectorOptin.InxList.includes(index)) {
                return true;
            }
            else {
                return false
            }
        }

        function optionCancel (index) {
            selectorOptin.InxList.splice(index, 1);
            (selectorOptin.newValue as any[]).splice(index, 1);
        }

        onMounted(()=>{
            init();
        })

        watch(() => selectorOptin.newValue, (newValue, oldValue) => {
            context.emit('update:value', selectorOptin.newValue);
        },{deep: true})

        return{
            ...toRefs(selectorOptin),
            optionMethod,
            TextShow,
            IconShow,
            optionCancel
        }
    }
}
</script>

<style>
.lis-select{
    width: 100%;
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
    height: 32px;
    line-height: 32px;
}
.lis-select-input input{
    position: absolute;
    height: 30px;
    line-height: 30px;
    border: none;
    width: 100%;
    left: 0;
    padding: 0 11px;
    border: 1px solid #d9d9d9;
}
.lis-select-input input:focus{
    outline: none;
    border: 1px solid rgb(24, 144, 255);
    box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
}
.yes{
    position: absolute;
    right: 11px;
}
.lis-select-input .opList{
    padding-left: 4px;
    height: 30px;
    display: table-cell;
    vertical-align: middle;
}
.lis-select-input .opList span{
    position: relative;
    display: flex;
    flex: none;
    box-sizing: border-box;
    max-width: 100%;
    height: 24px;
    margin-top: 2px;
    margin-right: 4px;
    margin-bottom: 2px;
    padding: 0 20px 0 6px;
    line-height: 22px;
    background: #f5f5f5;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
    cursor: default;
    transition: font-size .3s,line-height .3s,height .3s;
    user-select: none;
    float: left;
}
.opList .cancel{
    position: absolute;
    height: 100%;
    width: 13px;
    right: 2px;
    top: 0;
    display: table-cell;
    vertical-align: middle;
}
.opList .cancel:hover{
    cursor: pointer;
}
.cancel img{
    height: 10px;
}
</style>