import Axios from 'axios';

const Request = Axios.create({
    baseURL:'http://localhost:5000/'
});

export default Request