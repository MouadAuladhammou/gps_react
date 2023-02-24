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
  const [searchName, setSearchName] = useState("");
  const inputRef = useRef(null);

  const paginate = (pageNumber = 0) => {
    dispatch(
      fetchAsyncUsers({
        page: pageNumber,
        searchName: searchName,
      })
    );
    setCurrentPage(pageNumber);
  };

  const handleSearchUsers = () => {
    if (inputRef.current.value === searchName) return;
    setSearchName(inputRef.current.value);
    // NB: React useState Hooks not updating on first click : (Par exp: on met Mouad dans la zone de recherche)
    console.log("inputRef.current.value => ", inputRef.current.value); // Output: inputRef.current.value => Mouad => (on first click)
    console.log("searchName 1 => ", searchName); // Output: searchName 1 => "Rien affiché" => (on first click)
    // dispatch(fetchAsyncUsers({ page: 0, searchName: searchName })); // ici dispatch() ne fonctionne pas car "searchName" est toujours vide
    // Solution: pour resoudre ce probleme, il faut ajouter "dispatch()" dans "useEffect()" car cela ne déclenche qu'un changement au niveau de la variable "searchName"
    // setCurrentPage(0);
  };

  useEffect(() => {
    console.log("searchName 2 => ", searchName); // Output: searchName 2 => Mouad (on first click)
    dispatch(fetchAsyncUsers({ page: 0, searchName: searchName }));
    setCurrentPage(0); // ce ne s'affecte que le state "searchName" change
  }, [searchName]); // on detecte le changement au niveau de state "searchName" pour fair dispatch()

  let renderingUsers = "";
  renderingUsers =
    users.length > 0 ? (
      users.map((user, index) => {
        return <UserItem key={index} data={user} />;
      })
    ) : (
      <div className="users-error">
        <h3>Error not data</h3>
      </div>
    );

  return (
    <div className="row">
      <div className="col-sm-4">
        <InputGroup className="mb-3">
          <Form.Control placeholder="username" ref={inputRef} />
          <Button onClick={handleSearchUsers} variant="outline-secondary">
            Search
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
