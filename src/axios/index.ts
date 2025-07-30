import axios from "axios";

const instanse = axios.create({
    baseURL: "https://hjklhkjlhkljhpjhkhddhgfdghfdgfcycffgh.ru:2999",
});

instanse.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('pultik-token-key')}`;

    return config;
})
export default instanse;