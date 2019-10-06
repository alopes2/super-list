import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://super-list-e658e.firebaseio.com/'
});

export default instance;