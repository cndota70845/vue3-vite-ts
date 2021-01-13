import axios from '../http'; // 导入http中创建的axios实例

const Rec = {
    //表单列表Get
    listGet (param:object) {        
        return axios.get(`/abroad/list/`, {params:param}).then().catch()    
    }
}
export default Rec;