import Axios from 'axios';

const Request = Axios.create({
    baseURL:'https://insightful-backend.vercel.app/'
});

export default Request