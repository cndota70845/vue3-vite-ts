<template>
    <div class="LogicFlow">
        <div id="container"></div>
        <a-button @click="addNode">添加节点</a-button>
        <a-button @click="removeNode">删除节点</a-button>
    </div>
</template>

<script lang="ts">
import LogicFlow from '@logicflow/core';
import '@logicflow/core/dist/style/index.css';
import { onMounted } from 'vue';

interface OPTIONS {
    container: InnerHTML,
    width: number,
    height: number,
    background : {
        color: string
    },
    grid: {
        type: string,
        size: number
    }
}

export default {
    name: 'LogicFlow',
    setup () {
        const data = {
            // 节点
            nodes: [
                {
                    id: 50,
                    type: 'rect',
                    x: 100,
                    y: 150,
                    text: '你好'
                },
                {
                    id: 21,
                    type: 'circle',
                    x: 300,
                    y: 150
                }
            ],
            // 边
            edges:[
                {
                    type: 'polyline',
                    sourceNodeId: 50,
                    targetNodeId: 21
                }
            ]
        }

        var lf: any;

        function init () {
            lf = new LogicFlow({
                // 容器配置
                container: document.querySelector('#container'),
                // 画布配置
                width: 700,
                height: 600,
                background: {
                    color: 'rgba(24, 144, 255, 0.5)'
                },
                stopScrollGraph: true,
                stopZoomGraph: true,
                grid: false, //不开启网格,
                // 工具配置
                textEdit: true,
                isSilentMode: false,
                edgeType: 'line',
                snapline: true,
                // 样式配置
                style: {
                    rect: {
                        radius: 6
                    }
                }
            });
            lf.render(data);
        }

        function addNode () {
            lf.addNode({
                type: 'user',
                x: 500,
                y: 600,
                id: 20,
                text:{
                    value: 'test',
                    x: 500,
                    y: 600,
                },
                properties: {
                    size: 1
                }
            })
        }

        function removeNode () {

        }

        onMounted(() => {
            init();
        })

        return {
            addNode
        }
    }
}
</script>

<style>
.LogicFlow {
    width: 100%;
    height: 100%;
}
#container {
    width: 90%;
    margin: 0 auto;
    height: 100%;
}
</style>