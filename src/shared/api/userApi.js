import axios from "axios";
import {
  requestHandler,
  responseHandler,
  errorHandler,
} from "../helpers/http_interceptors/interceptors";

const axiosJWT = axios.create({
  baseURL: "http://localhost:3000/api/users",
  timeout: 10000,
});

// Configure/make use of request & response interceptors from Axios
axiosJWT.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

axiosJWT.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default axiosJWT;
