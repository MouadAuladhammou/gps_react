import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// components
import UserList from "../user/user_list/UserList";

// reducer
import { fetchAsyncUsers } from "./../../shared/redux/users/userSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncUsers({ page: 0, searchName: "" })); // récupérer des utilisateurs
  }, [dispatch]);

  return (
    <>
      <Link to={`/add/user`}> Ajouter un utilisateur</Link>
      <hr />
      <div className="banner-img"></div>
      <UserList />
    </>
  );
};

export default Home;
