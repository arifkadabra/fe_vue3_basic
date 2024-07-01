import axios from 'axios';
const url = `${import.meta.env.VITE_API_URL}/api`;
import { router } from '../router';

const Api = axios.create({
    baseURL: url,
    headers: {'Access-Control-Allow-Origin': '*'},
})

Api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        localStorage.removeItem('user')
        router.push('/login');
        window.location.reload(true);
        return Promise.reject(error)
    } else {
        return Promise.reject(error);
    }
});

export default Api