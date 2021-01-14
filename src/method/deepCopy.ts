enum type{
    string='string',
    number='number',
    object='object',
    Object='[object Object]',
    Array='[object Array]'
}

function deepcopy(origin:any){
    console.log(typeof(origin),Object.prototype.toString.call(origin))
    let target:any
    if(typeof(origin)===type.string || typeof(origin)===type.number){
        target = origin
    }
    else if(typeof(origin)===type.object){
        if(Object.prototype.toString.call(origin)===type.Object){
            target = {}
            for(let key in origin){
                target[key] = deepcopy(origin[key])
            };
        }
        else if(Object.prototype.toString.call(origin)===type.Array){
            target=[]
            origin.forEach((element:any,index:number) => {
                target[index] = deepcopy(element)
            });
        }
    }
    return target
}
export default {deepcopy}