import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentAdmin } from "../../redux/auth/authSlice";
import { isObjectEmpty } from "../functions";

const PrivateRoutesLogout = () => {
  let currentAdmin = useSelector(getCurrentAdmin);
  return isObjectEmpty(currentAdmin) ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutesLogout;
