import axios from "axios";
import { version } from "../package.json";
import LoggerService from "./Logger";

const loggerClient = LoggerService.getInstance();
function interceptorResponseError(error) {
    loggerClient.pinoClient.info("http => interceptorResponseError");
    loggerClient.pinoClient.info("Error End Request", error);

    if (error.response) {
        loggerClient.pinoClient.info("response error");

        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //loggerClient.logger.info(
        //     "data:",
        //     JSON.stringify(_.get(error, "response.data"), null, 2)
        // );
        //loggerClient.logger.info("status:", _.get(error, "response.status"));
        //loggerClient.logger.info("headers:", _.get(error, "response.headers"));
    } else if (error.request) {
        loggerClient.pinoClient.info("request error");
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // log.error(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        loggerClient.pinoClient.info("other error", error.message);
    }

    return Promise.reject(error);
}

function interceptorResponse(response) {
    loggerClient.pinoClient.info("http => interceptorResponse");

    const r = {
        url: response.config.url,
        status: response.status,
        data: null,
    };

    if (response.data) {
        r.data = response.data;
    }
    loggerClient.pinoClient.info("End Request", JSON.stringify(r, null, 2));
    return response;
}

function interceptorRequestError(error) {
    loggerClient.pinoClient.info("http => interceptorRequestError");

    return Promise.reject(error);
}
function interceptorRequest(request) {
    loggerClient.pinoClient.info("http => interceptorRequest");

    const logRequest = {
        headers: request.headers,
        data: request.data || {},
        url: request.url,
        method: request.method,
        params: request.params || {},
    };

    loggerClient.pinoClient.info(
        "Start Request",
        JSON.stringify(logRequest, null, 2)
    );

    return request;
}

export function createHTTPService(baseURL: string) {
    const axiosService = axios.create({
        baseURL,
       //  headers: { "x-sdk-version": version },
    });
    axiosService.interceptors.request.use(
        interceptorRequest,
        interceptorRequestError
    );

    axiosService.interceptors.response.use(
        interceptorResponse,
        interceptorResponseError
    );

    return axiosService;
}
