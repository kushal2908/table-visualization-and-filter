import axios from "axios";
import { BASE_URL } from "../routes/URLs";
import { GET_TOKEN } from "../sessions/token";

let base_url = BASE_URL;

// @Description   : Only for login as its doesnt require ant token or authentication credentials
// @Accessibility : PUBLIC
// @Author        : Safa
export const LOGIN = axios.create({
  baseURL: base_url,
  timeout: 6000,
  headers: { "Content-Type": "application/json" },
});

// @Description   : Used for private routing where each module,submodule are privileged.
// @Accessibility : PRIVATE
// @Author        : Safa
export const API = axios.create({
  baseURL: base_url,
  // timeout: 6000,
  headers: { "Content-Type": "application/json" },
});

////////////////////////////////////////
// @Description   : Interceptor for API.
////////////////////////////////////////

//Interceptor Request
API.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "Bearer " + GET_TOKEN();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Interceptor Response
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      console.log("Please Check Your Internet Connection");
    }
    return Promise.reject(error);
  }
);
