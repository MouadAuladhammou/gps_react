import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// components
import UserList from "../user/user_list/UserList";

const Home = () => {
  useEffect(() => {}, []);

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
