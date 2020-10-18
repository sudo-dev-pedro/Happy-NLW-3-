import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.25.12:9696',
});

export default api;