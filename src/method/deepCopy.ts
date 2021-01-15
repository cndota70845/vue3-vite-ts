enum type{
    string='string',
    number='number',
    object='object',
    boolean='boolean',
    Object='[object Object]',
    Array='[object Array]'
}

//null undefined Date RegExp string number object boolean
function deepcopy(origin:any,hashMap=new WeakMap){
    if(origin instanceof Date){
        return new Date(origin)
    }
    else if(origin instanceof RegExp){
        return new RegExp(origin)
    }
    else if(typeof(origin)===type.string || typeof(origin)===type.number || origin==undefined || typeof(origin)===type.boolean){
        return origin
    }
    else if(typeof(origin)===type.object){
        const hashKey = hashMap.get(origin)
        if(hashKey){
            return hashKey
        }
        else{
            const target = new origin.constructor()
            for(let key in origin){
                if(origin.hasOwnProperty(key)){
                    target[key] = deepcopy(origin[key])
                }
            };
            return target
        }
    }
}

export default {deepcopy}