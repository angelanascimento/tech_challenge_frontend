import axios from 'axios'

const internalAPI = axios.create({
    baseURL: 'http://localhost:8082/technical-challenge'
});

export const saveUser = async (url: string, payload: Object) => {
    const response = await internalAPI.post(url, payload)
    return response.data
}  

export default internalAPI;