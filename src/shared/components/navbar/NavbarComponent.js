import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Reducer
import {
  getCurrentAdmin,
  isLoggedIn,
  logOut,
} from "../../redux/auth/authSlice";

import Navbar from "react-bootstrap/Navbar";
import "./NavbarComponent.scss";

const NavbarComponent = () => {
  const currentAdmin = useSelector(getCurrentAdmin);
  const isLogged = useSelector(isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <Navbar bg="light" className="navbar">
      <Navbar.Brand href="#home">GPS Tracker</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          {isLogged ? (
            <>
              <strong>
                {currentAdmin.first_name} {currentAdmin.last_name}{" "}
              </strong>
              <a
                href="#"
                className="stretched-link"
                onClick={() => handleLogout()}
              >
                LOGOUT
              </a>
            </>
          ) : (
            <Link to={`/login`}> LOGIN</Link>
          )}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
