import axios from "axios";

export const isObjectEmpty = (object) => {
  return Object.keys(object).length === 0;
};

// Refresh Tokens
export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      "http://64.226.124.200/api/admin/refresh",
      {
        token: refreshToken,
      }
    );
    // Reset tokens in LocalStorage
    window.localStorage.setItem("tokens", JSON.stringify(response.data));
    return response.data;
  } catch (err) {
    window.localStorage.clear();
    console.log("Error - refreshToken : ", err);
  }
};
