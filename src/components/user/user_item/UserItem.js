import React from "react";
import { Link } from "react-router-dom";

import Accordion from "react-bootstrap/Accordion";

import "./UserItem.scss";

const UserItem = ({ data: user }) => {
  return (
    <div className="">
      <Accordion.Item eventKey={user.id}>
        <Accordion.Header>User id {user.id}</Accordion.Header>
        <Accordion.Body>
          <Link to={`/user/${user.id}`}>
            <h5>
              {user.last_name} {user.first_name}
            </h5>
            <p> {user.email} </p>
          </Link>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  );
};

export default UserItem;
