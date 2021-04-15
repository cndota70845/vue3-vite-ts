<template>
    <div>
        <p>
            输入：<a-input-number v-model:value="n" :min="0"></a-input-number>
        </p>
        <p>
           输出：{{nthUglyNumber(n)}} 
        </p>
    </div>
</template>

<script>
import {ref} from 'vue';
export default {
    name: 'LeetCode',
    setup () {

        var n = ref(12);

        var nthUglyNumber = function(n) {

            function UglyNumber (target) {
                var arr = [2,3,5];
                var res = false;
                if (target > 0) {
                    if (target === 1) {
                        res = true;
                    }
                    else {
                        for (let i = 0; i < arr.length; i++){
                            let yu = target % arr[i];
                            if (yu === 0) {
                                let num = parseInt(target/arr[i]);
                                if (arr.includes(num)) {
                                    res = true;
                                    return res;
                                }
                                else {
                                    res = UglyNumber (num);
                                }
                            }
                        }
                    }

                }
                return res;
            }
            if (n > 1) {
                var arr = [1];
                var i = 2;
                for (let i = 2; arr.length <= n; i++) {
                    if (UglyNumber(i)) {
                        arr.push(i);
                    }
                }
                return arr[arr.length-2];
            }
            else if (n === 1) {
                return 1;
            }
        };

        return {
            n,
            nthUglyNumber
        }
    }
}
</script>

<style>

</style>