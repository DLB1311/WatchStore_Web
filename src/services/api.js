import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:6969/api/v1" });



export default API; 