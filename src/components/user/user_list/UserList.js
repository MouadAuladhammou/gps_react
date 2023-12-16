import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

// Reducer
import {
  getAllUsers,
  getTotalPages,
  fetchAsyncUsers,
} from "./../../../shared/redux/users/userSlice";

// components
import UserItem from "../user_item/UserItem";
import Paginate from "./../../../shared/components/paginate/Paginate";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "./UserList.scss";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);
  const totalPages = useSelector(getTotalPages);
  const [currentPage, setCurrentPage] = useState(0);
  const inputRef = useRef(null);

  const paginate = (pageNumber = 0) => {
    dispatch(
      fetchAsyncUsers({
        page: pageNumber,
        searchName: inputRef.current.value,
      })
    );
    setCurrentPage(pageNumber);
  };

  const handleSearchUsers = async () => {
    await dispatch(
      fetchAsyncUsers({ page: 0, searchName: inputRef.current.value })
    );
    setCurrentPage(0);
  };

  useEffect(() => {
    dispatch(fetchAsyncUsers({ page: 0, searchName: "" }));
    setCurrentPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let renderingUsers = "";
  renderingUsers =
    users.length > 0 ? (
      users.map((user, index) => {
        return <UserItem key={index} user={user} />;
      })
    ) : (
      <div className="users-error">
        <h3>Not data ...</h3>
      </div>
    );

  return (
    <div className="row">
      <div className="col-sm-4">
        <InputGroup className="mb-3">
          <Form.Control placeholder="Rechercher..." ref={inputRef} />
          <Button onClick={handleSearchUsers} variant="secondary">
            Rechercher
          </Button>
        </InputGroup>

        <Accordion>
          <div className="">{renderingUsers}</div>
          <br />
          <Paginate
            totalPages={totalPages}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Accordion>
      </div>
      <div className="col-sm-8">
        <Outlet /> {/* display component User detail */}
      </div>
    </div>
  );
};

export default UserList;
