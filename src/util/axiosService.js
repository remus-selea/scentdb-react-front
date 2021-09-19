import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

axios.defaults.xsrfCookieName = "XSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";
axios.defaults.withCredentials = true;

const axiosApiCall = async (url, method, payload = null, params = null, headers = {}, data = null) => {
    try {

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

        // console.log(response);

        // if (isEmpty(response.success) || response.success) {
        //     if (response.data.warnings) {
        //         warningHandler(response.data.warnings)
        //     }
        //     if (response.data.serviceErrors) {
        //         serviceErrorHandler(response.data.serviceErrors)
        //     }
        //     return response.data;
        // }

        // errorHanlder(response.data.error.message);

        return response.data;

    } catch (e) {
        console.log("axiosApiCall error", e);
        // return errorHandler(e);
    }
};

export default axiosApiCall;