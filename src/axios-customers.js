import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://policymanagementapp.firebaseio.com/'
});

export default instance; 