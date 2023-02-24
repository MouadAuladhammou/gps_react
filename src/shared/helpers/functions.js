import axios from "axios";

export const isObjectEmpty = (object) => {
  return Object.keys(object).length === 0;
};

// Refresh Tokens
export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/admin/refresh",
      {
        token: refreshToken,
      }
    );
    // Reset tokens in LocalStorage
    window.localStorage.setItem("tokens", JSON.stringify(response.data));
    return response.data;
  } catch (err) {
    console.log("Error - refreshToken : ", err);
  }
};
