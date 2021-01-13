/**
 * login模块接口列表
 */

import axios from '../http'; // 导入http中创建的axios实例

const login = {      
    // post提交    
    login (param:object) {        
        return axios.get(`/user/login/`, {params:param});    
    },
    logout(){
        return axios.get(`/user/oba_logout/`)
    },
    menuGet(){
        return axios.get(`/user/menu_info/`)
    }
}

export default login;