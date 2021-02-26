import danmuData from '../data/danmu.json'

function danmuJS () {
    let doc = document;
    //获取video canvas的Dom对象
    const oDanmuVideo = doc.getElementById('J_danmuVideo'),
    oDanmuCanvas = doc.getElementById('J_danmuCanvas');
  
    //模块初始化
    const init = () => {
        console.log(danmuData);
        //实例化弹幕插件
        window.videoDanmu = new videoDanmu(
            oDanmuVideo,
            oDanmuCanvas,
            {
                danmuData 
            }
        )
        bindEvent();
    }

    //绑定事件处理函数的管理函数
    function bindEvent () {

    }

    //执行模块初始化
    init();
}

class videoDanmu {
    constructor (video, canvas, options) {
        if(!video || !canvas || !options) return;
    }
}

function isObject () {

}

function isArray () {

}

export default {
    danmuJS
}