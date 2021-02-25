<template>
    <div class="danmu">
        <div class="video-wrapper">
            <canvas id="J_danmuCanvas"></canvas>
            <video src="" id="J_danmuVideo" controls></video>
        </div>
        <div class="tool-box">
            <a-input class="text"></a-input>
            <a-input type="color" class="color"></a-input>
            <a-button class="btn" type="primary">发送弹幕</a-button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .danmu{
        width: 1000px;
        margin: 0 auto;
    }
    .video-wrapper{
        position: relative;
    }
    .video-wrapper video{
        width: 100%;
    }
    .video-wrapper canvas{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
    }
    .text{
        width: 300px;
        margin-right: 20px;
    }
    .color{
        height: 30px;
        width: 50px;
        margin-right: 20px;
    }
    .tool-box{
        margin-top: 20px;
        text-align: left;
    }
</style>