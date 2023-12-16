import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import "./Login.scss";

// reducer
import { loginAsync, changeNameAdmin } from "../../shared/redux/auth/authSlice";
import { deleteAsyncUser } from "../../shared/redux/users/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginAsync({ email, password }));
      console.log("resultAction", resultAction);
      if (resultAction.type === "auth/loginAsync/fulfilled") {
        // Swal.fire("connected", "", "success");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const resultAction = await dispatch(deleteAsyncUser(id));
      console.log("resultAction", resultAction);
      if (resultAction.type === "users/deleteAsyncUser/fulfilled") {
        // Swal.fire("user deleted", "", "success");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleChangeNameAdmin = () => {
    dispatch(changeNameAdmin());
  };

  return (
    <div className="container">
      <button className="deleteButton" onClick={() => handleDelete(51)}>
        Delete User
      </button>

      <button
        className="deleteButton"
        onClick={() => handleChangeNameAdmin(51)}
      >
        change name Admin current
      </button>

      <div className="login">
        <form onSubmit={handleLogin}>
          <span className="formTitle">Lama Login</span>
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="submitButton">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
