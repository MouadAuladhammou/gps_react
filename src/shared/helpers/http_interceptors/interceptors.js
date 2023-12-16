import jwt_decode from "jwt-decode";
import { refreshToken } from "../functions";

// request handlers
export const requestHandler = async (request) => {
  try {
    let currentAdmin = JSON.parse(window.localStorage.getItem("tokens"));
    // Add accessToken in request Header
    request.headers["authorization"] = "Bearer " + currentAdmin.accessToken;

    let currentDate = new Date();
    const decodedAccessToken = jwt_decode(currentAdmin.accessToken);
    // Si "accessToken" a expiré, vérifier "refreshToken"
    if (decodedAccessToken.exp * 1000 < currentDate.getTime()) {
      // check refrech token
      const decodedRefreshToken = jwt_decode(currentAdmin.refreshToken);
      if (decodedRefreshToken.exp * 1000 < currentDate.getTime()) {
        console.log("refreshToken NO");
        // throw error
        window.localStorage.clear();
        throw new Error("RefreshToken is invalid");
      } else {
        // Si "refreshToken" est valide, on fait d'abort une requête afin d'obtenir de nouveaux tokens à utiliser
        console.log("refreshToken is valid");
        let dataToken = await refreshToken(currentAdmin.refreshToken);
        request.headers["authorization"] = "Bearer " + dataToken.accessToken;
      }
    } else {
      console.log("AccessToken is still valid");
    }
    return request;
  } catch (error) {
    console.error(error);
    window.location = "/login";
  }
};

// response handlers
export const responseHandler = (response) => {
  if (response.status === 401) {
    window.location = "/login";
  }
  return response;
};

// error handlers
export const errorHandler = (error) => {
  error.test = "test message error ...";
  return Promise.reject(error);
};
