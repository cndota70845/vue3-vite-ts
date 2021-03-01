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
        window.videoDanmu = new VideoDanmu(
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
        oDanmuVideo.addEventListener('play', handleVideoPlay, false);
        oDanmuVideo.addEventListener('pause',handleVideoPause, false);
    }

    function handleVideoPlay () {
        videoDanmu.danmuPaused = false;
        videoDanmu.render();
    }

    function handleVideoPause () {
        videoDanmu.danmuPaused = true;
    }

    //执行模块初始化
    init();
}

class VideoDanmu {
    constructor (video, canvas, options) {
        if(!video || !canvas || !options || !isObject(options)) return;
        if(!options.danmuData || !isArray(options.danmuData)) return;

        this.video = video;
        this.canvas = canvas;
        this.canvasCtx = canvas.getContext('2d');
        this.canvas.width = video.offsetWidth;
        this.canvas.height = video.offsetHeight;
        this.danmuPaused = true;

        Object.assign(this, options, {
            speed: 2,
            runTime: 0,
            color: '#fff'
        });

        this.danmuPool = this.createDanmuPool ();
        this.render();
    }

    createDanmuPool () {
        return this.danmuData.map(dm => new Danmu(dm, this));
    }

    render () {
        this.clearRect();
        this.drawDanmu();
        !this.danmuPaused && requestAnimationFrame(this.render.bind(this));
    }

    drawDanmu () {
        let currentTime = this.video.currentTime;
        this.danmuPool.map((danmu) => {
            if (!danmu.stopDrawing && currentTime >= danmu.runTime) {
                if (!danmu.isInitialize) {
                    danmu.initializ();
                    danmu.isInitialize = true;
                }
                danmu.X -= danmu.speed;
                danmu.draw();

                if (danmu.X <= danmu.width * -1) {
                    danmu.stopDrawing = true;
                }
            }
        })
    }

    clearRect () {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function isObject (value) {
    const type = Object.prototype.toString.call(value);
    return type === '[object Object]';
}

function isArray (value) {
    return Array.isArray(value); 
}

function getTextWidth (content, fontSize) {
    //创建临时元素
    const _span = document.createElement('span');
    //放入弹幕文本
    _span.innerText = content;
    //设置文本字体大小
    _span.style.fontSize = fontSize + 'px';
    _span.style.position = 'absolute';
    document.body.appendChild(_span);
    let width = _span.offsetWidth;
    document.body.removeChild(_span);
    return width;
}

function getTextPosition (canvas, fontSize, ctx) {
    let X = canvas.width,
        Y = canvas.height * Math.random();
    Y < fontSize && (Y = fontSize);
    Y > canvas.height - fontSize && (Y = canvas.height - fontSize);

    ctx.X = X;
    ctx.Y = Y;
}

class Danmu {
    constructor (danmu, fCtx) {
        this.content = danmu.content;
        this.runTime = danmu.runTime;
        this.danmu = danmu;
        this.ctx = fCtx;

        this.initializ();
    }

    initializ () {
        this.color = this.danmu.color || this.ctx.color;
        this.speed = this.danmu.speed || this.ctx.speed;
        this.fontSize = 30;
        this.fontSize = 30;
        this.width = getTextWidth(this.content, this.fontSize)
        console.log(this.width);
        getTextPosition(this.ctx.canvas, this.fontSize, this);
        console.log(this);
    }

    draw () {
        this.ctx.canvasCtx.font = this.fontSize + 'px Microsoft Yahei';
        this.ctx.canvasCtx.fillStyle = this.color;
        this.ctx.canvasCtx.fillText(this.content, this.X, this.Y);
    }
}

export default {
    danmuJS
}