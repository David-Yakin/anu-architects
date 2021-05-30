import axios from "axios";
import { toast } from "react-toastify"
import { getJwt } from "./userService"

axios.defaults.headers.common['x-auth-token'] = getJwt();

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status <= 403;
    if ( expectedError ) toast('An unexpected error occured');
    return Promise.reject(error);
})

const http =  {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
};

export default http;