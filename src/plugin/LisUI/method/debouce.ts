let timeout: any = null; // 创建一个标记用来存放定时器的返回值

function debounce(fn: Function,delay: number,val: string) {
    clearTimeout(timeout); 
    // 然后又创建一个新的 setTimeout, 这样就能保证interval 间隔内如果时间持续触发，就不会执行 fn 函数
    timeout = setTimeout(() => {
        fn(val);
    }, delay);
}


export default {
    debounce
}