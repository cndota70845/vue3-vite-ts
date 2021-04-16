interface ILooseObject {
    [key: string]: any
}

export default class MVVM {
    public el:HTMLElement;
    public data:ILooseObject = {};
    public domPoll:ILooseObject = {};
    constructor (el:string,public _data:ILooseObject) {
        this.el = document.querySelector(el) as HTMLElement;
        this.init();
    }

    init () {
        this.initData();
        this.initDom();
    }

    initData () {
        const _this = this;
        for (let key in this._data) {
            Object.defineProperty(this.data,key,{
                get () {
                    return _this._data[key];
                },
                set (newVal) {
                    _this.domPoll[key].innerText = newVal;
                    _this._data[key] = newVal;
                }
            });
        }
        console.log(this._data,this.data);
    }

    initDom () {
        this.bindDom(this.el);
        this.bindInput(this.el);
    }

    bindInput (el:HTMLElement) {
        const allInputs = el.querySelectorAll('input');
        allInputs.forEach(input=> {
            const ilsModel = input.getAttribute('ils-model');
            if (ilsModel) {
                input.value = this._data[ilsModel];
                input.addEventListener('keyup',() => {this.handleInput.call(this,ilsModel,input)},false);
            }
        });
    }

    bindDom (el:HTMLElement) {
        const childNodes = el.childNodes;
        childNodes.forEach(item => {
            if (item.nodeType === 3) {
                const _value = item.nodeValue;
                if (_value?.trim().length) {
                    let isValid = /\*\*(.+?)\*\*/.test(_value);
                    if (isValid) {
                        const _key = (_value.match( /\*\*(.+?)\*\*/) as ILooseObject)[1];
                        this.domPoll[_key] = item.parentNode;
                        (item.parentNode as HTMLElement).innerText = this.data[_key];
                    }
                }
            }
            if (item.childNodes) {
                this.bindDom(item as HTMLElement);
            }
        });
    }

    handleInput (key:string,input:HTMLInputElement) {
        const _value = input.value;
        this.data[key] = _value;
    }

}