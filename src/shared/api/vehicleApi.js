import axios from "axios";
import {
  requestHandler,
  responseHandler,
  errorHandler,
} from "../helpers/http_interceptors/interceptors";

const axiosJWT = axios.create({
  // baseURL: "http://localhost:3000/api/users",
  baseURL: "http://64.226.124.200/api/vehicles",
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

// =========================================================[API indépendante de Redux]=================================================================//
// Exemple: vérification des données uniques (NB: il n'en reste plus)
export const checkVehicleData = async (data) => {
  try {
    const response = await axiosJWT.post("/check-vehicle", data);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la vérification des données du véhicule:",
      error
    );
    throw error; // Lancer l'erreur afin qu'elle puisse être gérée dans le composant appelant
  }
};

export default axiosJWT;
