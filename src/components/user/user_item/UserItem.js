import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Accordion from "react-bootstrap/Accordion";

import "./UserItem.scss";

const UserItem = ({ user }) => {
  return (
    <Accordion.Item eventKey={user.id}>
      <Accordion.Header>
        <strong>
          {user.last_name} {user.first_name}
        </strong>
      </Accordion.Header>
      <Accordion.Body className="px-0">
        <ul>
          <li>
            {user.last_name} {user.first_name}
          </li>
          <li>{user.cin}</li>
          <li>{user.city}</li>
        </ul>

        <Link
          className="btn btn-dark mx-3"
          variant="dark"
          to={`/user/${user.id}`}
        >
          En savoir +
        </Link>
      </Accordion.Body>
    </Accordion.Item>
  );
};

UserItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    last_name: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    cin: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }),
};

export default UserItem;
