<template>
    <div class="Test">
        <a-input v-model:value="test"></a-input>
        {{test}}
    </div>
</template>

<script>
export default {
    name:'Test',
    data(){
        return{
            test:''
        }
    }
}
</script>

<style>

</style>