function identity<T>(arr :T[]) :T[]{
    console.log(arr.length,id)
    return arr;
}

interface ID{
    [propname:string]: any
}

const id :ID = {value:133}

export default {
    identity
}