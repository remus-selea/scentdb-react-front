import axios from "axios";

const axiosApiCall = async (url, method, payload = null, params = null) => {
    try {
        const response = await axios({
            method, url, payload, params
        });

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
        console.log(e);
        // return errorHandler(e);
    }
};

export default axiosApiCall;