import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";

// private routes
import PrivateRoutesLoggedin from "./shared/helpers/private_routes/PrivateRoutesLoggedin";
import PrivateRoutesLoggedout from "./shared/helpers/private_routes/PrivateRoutesLoggedout";

// Components
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import UserDetail from "./components/user/user_detail/UserDetail";
import NewUser from "./components/user/new_user/NewUser";
import EditUser from "./components/user/edit_user/EditUser";
import PageNotFound from "./components/page_not_found/PageNotFound";
import Footer from "./components/footer/Footer";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./components/login/Login";
import "./App.scss";

// Reducer
import { getLoadingStatus } from "./shared/redux/users/userSlice";

// Constants
import { HTTP_STATUS } from "./shared/helpers/constants";

function App() {
  const loading = useSelector(getLoadingStatus); // User
  return (
    <div>
      <Router>
        <Header />
        <div className="app">
          <ProSidebarProvider>
            <Sidebar />
          </ProSidebarProvider>
          <div className="container">
            <Routes>
              <Route element={<PrivateRoutesLoggedin />}>
                <Route path="/" element={<Home />}>
                  <Route path="/user/:id" element={<UserDetail />} />
                  <Route path="/edit/user/:id" element={<EditUser />} />
                  <Route path="/add/user" element={<NewUser />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Route>
              <Route element={<PrivateRoutesLoggedout />}>
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
      {loading === HTTP_STATUS.PENDING && (
        <div className="spinner">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <strong>Loading...</strong>
        </div>
      )}
      {loading === HTTP_STATUS.REJECTED && <>Error ....</>}
      {loading === HTTP_STATUS.FULFILLED && <></>}
    </div>
  );
}

export default App;
