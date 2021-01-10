class person{
    private name: string;//姓名
    private nation: string//国籍
    constructor(myname:string, mynation:string){ //定义构造函数
        this.name=myname;
        this.nation = mynation;
    }
    public say(){
        console.log('我的姓名是'+this.name+'，我的国籍是'+this.nation)
    }
}
class fammer extends person{

}
class engineer extends person{

}
class banker extends person{

}
export default{
    person,
    fammer,
    engineer,
    banker
}