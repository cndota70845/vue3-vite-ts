namespace human{
    export class person{
        constructor(public name:string, public nation:string){}//构造函数
        public say(){
            console.log('我的姓名是'+this.name+'，我的国籍是'+this.nation)
        }
        // abstract skill(): any
    }
    export class fammer extends person{
        constructor(public name:string, public nation:string,private _age:number){
            super(name,nation)
        }//构造函数
        public say(){
            console.log('我的姓名是'+this.name+'，我的国籍是'+this.nation+',我的年龄是'+this._age);
        }
        get age(){
            return this._age
        }
        set age(age:number){
            this._age = age
        }
        static saysometiong(){
            console.log('我的姓名是Jack陈');
        }
        skill(){
    
        }
    }
    export class engineer extends person{
        skill(){
            
        }
    
    }
    export class banker extends person{
        skill(){
            
        }
    }
}
export default{
    human
}