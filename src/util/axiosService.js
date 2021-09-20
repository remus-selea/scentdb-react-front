import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

axios.defaults.xsrfCookieName = "XSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";
axios.defaults.withCredentials = true;

const axiosApiCall = async (url, method, payload = null, params = null, headers = {}, data = null) => {

    if (localStorage.getItem(ACCESS_TOKEN) && headers != null) {
        Object.assign(headers, { "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN) });
    }

    const options = {
        method: method,
        url: url,
        params: params,
        headers: headers,
        data: data,
        payload: payload,
    };

    const response = await axios(options);

    return response.data;
};

export default axiosApiCall;

export function showErrorsInConsole(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("error.response.data", error.response.data);
        console.log("error.response.status", error.response.status);
        console.log("error.response.headers", error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("error.request", error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log("error.config", error.config);
}
