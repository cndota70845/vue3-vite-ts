<template>
    <div>

    </div>
</template>

<script>
export default {
    name:'testJS',
    setup () {
        // let arr = [99,99,1,1,2,3,4,5,5,6];
        // //Set去重 + sort排序;
        // let arr2 = Array.from(new Set(arr)).sort();
        // //重新返回一个每个元素循环一次回调返回的数组;
        // let arr3 = arr.reduce(function(acc,cur,idx,src) {
        //     if(!acc.includes(cur)) {
        //         acc.push({
        //             id:idx + 1,
        //             value:cur,
        //         });
        //     }
        //     return acc;
        // },[]);
        // console.log(arr,arr2,arr3);

        const test = new Promise(function(resolve, reject) {
            setTimeout(function () {
                let code = 1;
                resolve(code);
            },2000);
        });
        test.then((val) => {
            console.log(`val是:${val}`);
        });
    }
}
</script>

<style>

</style>