import React from "react";
import {
  Sidebar as Sidebar_,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.scss";

import { isLoggedIn } from "../../shared/redux/auth/authSlice";

const Sidebar = () => {
  const isLogged = useSelector(isLoggedIn);

  // useEffect(() => {

  // }, []);

  const { pathname } = useLocation();
  return (
    isLogged && (
      <Sidebar_>
        <Menu>
          <MenuItem
            active={
              pathname === "/" ||
              pathname.match(/^(\/user\/[0-9]+)$/) ||
              pathname.match(/^(\/edit\/user\/[0-9]+)$/)
            }
            component={<Link to="/" />}
          >
            Users
          </MenuItem>
          <MenuItem
            active={pathname === "/admins"}
            component={<Link to="/admins" />}
          >
            Admins
          </MenuItem>
          <MenuItem
            active={pathname === "/test"}
            component={<Link to="/test" />}
          >
            Test
          </MenuItem>
        </Menu>
      </Sidebar_>
    )
  );
};

export default Sidebar;
