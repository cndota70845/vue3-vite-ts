interface ILooseObject {
    [key: string]: any
}

export default class MVVM {
    public el :HTMLElement;
    public data: object = {};
    constructor (el:string,public _data:object) {
        this.el = document.querySelector(el) as HTMLElement;
        this.init();
    }

    init () {
        this.initData();
    }

    initData () {
        const _this = this;
        for (let key in this._data) {
            Object.defineProperty(this.data,key,{
                get () {
                    return (_this as ILooseObject)._data[key];
                },
                set (newValue) {
                    (_this as ILooseObject)._data[key] = newValue;
                }
            });
        }
        console.log(this.data);
    }
    
}