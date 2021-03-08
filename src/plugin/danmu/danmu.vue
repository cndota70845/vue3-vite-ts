<template>
    <div class="danmu">
        <div class="video-wrapper">
            <canvas id="J_danmuCanvas"></canvas>
            <video id="J_danmuVideo" ref='video' preload controls></video>
            <video-player class="video-player vjs-custom-skin"
                ref="videoPlayer" 
                :playsinline="true" 
                :options="playerOptions">
            </video-player>
        </div>
        <div class="tool-box">
            <a-input class="text"></a-input>
            <a-input type="color" class="color"></a-input>
            <a-button class="btn" type="primary">发送弹幕</a-button>
        </div>
    </div>
</template>

<script>
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import danmuJS from '../danmu/js/index.js'
import { onMounted,getCurrentInstance } from 'vue'
export default {
    name: 'danmu',
    components: {
        VideoPlayer
    },
    setup(props,context){
        const { ctx } = getCurrentInstance();
        const playerOptions = {
            playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
            autoplay: false, // 如果为true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            loop: false, // 是否视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [{
              type: "video/mkv", // 类型
              src: '/@/assets/video/three.kingdoms.mkv' // url地址
            }],
            poster: '', // 封面地址
            notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: {
              timeDivider: true, // 当前时间和持续时间的分隔符
              durationDisplay: true, // 显示持续时间
              remainingTimeDisplay: false, // 是否显示剩余时间功能
              fullscreenToggle: true // 是否显示全屏按钮
            }
        }

        onMounted(() => {
            ctx.$refs.video.src = '/@/assets/video/three.kingdoms.mkv';
            danmuJS.danmuJS();
        })

        return{
            playerOptions
        }
    }
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