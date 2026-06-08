import axios from 'axios'

const viaCepAPI = axios.create({
    baseURL: 'https://viacep.com.br'
});

export const search = async (url: string) => {
    const resposta = await viaCepAPI.get(url)
    return resposta.data
}  

export default viaCepAPI;