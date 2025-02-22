import {notesInstance} from './axios'

class API{

    constructor(instance){
        this.instance = instance;
    }

    async get(path = '', params = {}){
        try{
            let response = await this.instance.get(`${path}`, { params })
            return response.data;
        }catch(error){
            throw new Error(error);
        }
    }
    async post(path="",params={},data){
        try{
            let response = await this.instance.post(`${path}`,data,{ params });
            return response.data;
        }catch(error){
            throw new Error(error);
        }
    }
    async patch(path = "" ,data ) {
        try {
            let response = await this.instance.patch(`${path}`, data);
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }
    
    async delete(path = ""  ) {
        try {
            let response = await this.instance.delete(`/${path}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}


let noteApi = new API(notesInstance)

export {
noteApi
}