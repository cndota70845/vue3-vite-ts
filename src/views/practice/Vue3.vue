<template>
    <div class="Vue3" id="calculator">
        <div class="top">
            <span @click="calculator" class="clear">c</span>
        <div class="screen">
            <p>{{data.curAction!==undefined && data.lastNumber!==undefined?data.lastNumber+data.curAction:''}}</p>
            <p>{{data.result.value}}</p>
        </div>
        </div>
        <div class="keys">
            <span @click="calculator">7</span>
            <span @click="calculator">8</span>
            <span @click="calculator">9</span>
            <span @click="calculator" class="operator">+</span>
        </div>
        <div class="keys">
            <span @click="calculator">4</span>
            <span @click="calculator">5</span>
            <span @click="calculator">6</span>
            <span @click="calculator" class="operator">-</span>
            </div>
        <div class="keys">
            <span @click="calculator">1</span>
            <span @click="calculator">2</span>
            <span @click="calculator">3</span>
            <span @click="calculator" class="operator">/</span>
        </div>
        <div class="keys">
            <span @click="calculator">0</span>
            <span @click="calculator" class="point">.</span>
            <span @click="calculator" class="eval">=</span>
            <span @click="calculator" class="operator">x</span>
        </div>
    </div>
</template>

<script lang="ts">
import {ref,getCurrentInstance,reactive,watch} from 'vue'
export default {
    name:"Vue3",
    setup(){
        const {ctx}:any = getCurrentInstance()
        enum action{
            operator = 'operator',
            eval = 'eval',
            point = 'point',
            clear = 'clear'
        }
        enum operator{
            plus = '+',
            minus = '-',
            multiply = 'x',
            divide = '/',
            equal = '=',
        }
        enum uselly{
            default = '0',
            float = '.',
            error = '数据格式错误',
        }
        const data = reactive({
            lastNumber:undefined,
            result:{
                value:String(uselly.default),
                status:true
            },
            curAction:undefined,
        })
        function calculator(e:Event){
            const Symbol:string = (e.target as any).innerHTML;
            const className:string = (e.target as any).className;
            switch(className){
                case action.operator:
                    operatorFunc(Symbol);
                    break;
                case action.eval:
                    evalFunc();
                    break;
                case action.point:
                    pointFuc(Symbol);
                    break;
                case action.clear:
                    clearFuc(Symbol);
                    break;
                default:
                    numberFunc(Symbol);
            }
        }
        function operatorFunc(params:string) {
            if(data.curAction===undefined){
                data.curAction = params;
                data.lastNumber = data.result.value;
                data.result.value = String(uselly.default);
            }
            else{
                evalFunc();
                operatorFunc(params);
            }
        }
        function evalFunc() {
            if(data.curAction!==undefined && data.lastNumber!==undefined){
                const Number:number = data.lastNumber.includes(uselly.float)?parseFloat(data.lastNumber):parseInt(data.lastNumber);
                const Number2:number = data.result.value.includes(uselly.float)?parseFloat(data.result.value):parseInt(data.result.value);
                let res:string
                switch(data.curAction){
                    case operator.plus:
                        res = String(Number+Number2);
                        break;
                    case operator.minus:
                        res = String(Number-Number2);
                        break;
                    case operator.multiply:
                        res = String(Number*Number2);
                        break;
                    case operator.divide:
                        res = String(Number/Number2);
                        break;
                }
                data.curAction = undefined
                data.lastNumber = undefined
                data.result.value = res
                data.result.status = false
            }
        }
        function numberFunc(params:string) {
            if(data.result.status === false){
                data.result.value = params;
                data.result.status = true;
            }
            else if(data.result.value === uselly.default){
                data.result.value = params;
            }
            else{
                data.result.value = data.result.value + params;
            }
        }
        function pointFuc(params:string) {
            if(data.result.status === false){
                data.result.value = String(uselly.default) + params;
                data.result.status = true;
            }
            else if(data.result.value.includes(uselly.float)){
                ctx.$message.error(uselly.error,1);
            }
            else{
                data.result.value = data.result.value + params;
            }
        }
        function clearFuc(params:string) {
            data.lastNumber = undefined;
            data.result.value = String(uselly.default);
            data.curAction = undefined;
        }
        return{
            calculator,
            data
        }
    }
}
</script>

<style scoped>
#calculator {
  width: 350px;
  height: auto;
  margin: 100px auto;
  background-color: #9dd2ea;
  padding: 20px 20px 9px 20px;
  background: linear-gradient(#9dd2ea, #8bceec);
  border-radius: 3px;
  box-shadow: 0 4px #009de4, 0 10px 15px rgba(0, 0, 0, 0.2);
}
.top span.clear {
  float: left;
  height:78px!important;
  line-height:78px!important;
  font-size: 20px;
}
.screen p{
    height: 40px;
    padding: 0;
    margin: 0;
}
.top div.screen {
  width: 212px;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  float: right;
  padding: 0 10px;
  box-shadow: inset 0 4px rgba(0, 0, 0, 0.2);
  text-align: right;
  line-height: 40px;
  letter-spacing: 1px;
  font-size: 17px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  color: white;
}
.keys,
.top {
  display: inline-block;
}
.top span.clear,
.keys span {
  float: left;
  position: relative;
  top: 0;
  width: 66px;
  height: 36px;
  cursor: pointer;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 4px rgba(0, 0, 0, 0.2);
  margin: 0 7px 11px 0;
  color: #888;
  line-height: 36px;
  text-align: center;
  transition: all 0.2s ease;
  user-select:none;
}
.keys span.operator {
  background-color: #fff0f5;
}
.keys span.eval {
  background-color: #f1ff92;
  box-shadow: 0 4px #9da853;
  color: #888e5f;
}
.top span.clear {
  background-color: #ff9fa8;
  box-shadow: 0 4px #ff7c87;
  color: white;
}
.keys span:hover {
  background-color: #9c89f6;
}
.keys span.eval:hover {
  background-color: #abb850;
  box-shadow: 0 4px #717a33;
  color: white;
}
.top span.clear:hover {
  background-color: #f68991;
  box-shadow: 0 4px #03545d;
  color: white;
}
.keys span:active {
  box-shadow: 0 0 #717a33;
  top: 4px;
}
.top span.clear:active {
  box-shadow: 0 0 #717a33;
  top: 4px;
}
.radix {
  color: #25848e;
  padding: 5px 0;
}
.radix [type="radio"],
.radix label {
  cursor: pointer;
}
</style>