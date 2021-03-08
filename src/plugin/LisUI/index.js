import Selector from './components/Selector/index.vue';

export const SelectorUI = {};

SelectorUI.install = (Vue) => Vue.component(Selector.name, Selector);

//全局注册使用代码

// const JSUI = {};

// const COMPONENTS = [
//     Selector
// ]

// JSUI.install = function (Vue) {
//     COMPONENTS.forEach((item) => {
//         Vue.component(item.name, item)
//     })
// }

// export default JSUI;