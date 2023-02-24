import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

// Rducer
import {
  fetchAsyncUserDetail,
  removeSelectedUser,
  addAsyncVehucle,
  updateAsyncVehucle,
  deleteAsyncVehucle,
  getSelectedUserCompanies,
  getSelectedUser,
  deleteAsyncUser,
} from "../../../shared/redux/users/userSlice";

import { BiEditAlt, BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import NewVehucleModal from "../../../shared/components/modal/NewVehucleModal";
import EditVehucleModal from "../../../shared/components/modal/EditVehucleModal";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import "./UserDetail.scss";

const UserDetail = () => {
  const { id } = useParams();
  const inputSearchVehicleRef = useRef("");
  const dispatch = useDispatch();

  const selectedUser = useSelector(getSelectedUser);
  const vehuclesUserSelected = useSelector(getSelectedUserCompanies);
  const [searchVehiclesResult, setSearchVehiclesResult] = useState();

  const handleSearchVehicles = () => {
    const vehicleSearch = inputSearchVehicleRef.current.value.trim();
    if (vehicleSearch) {
      const result = vehuclesUserSelected.filter(
        (v) =>
          v.company_name.toLowerCase().match(vehicleSearch.toLowerCase()) ||
          v.company_address.toLowerCase().match(vehicleSearch.toLowerCase())
      );
      setSearchVehiclesResult(result);
    } else {
      setSearchVehiclesResult(vehuclesUserSelected);
    }
  };

  // Modal New Vehicle
  const [showModalNewVehicle, setShowModalNewVehicle] = useState(false);
  const handleCloseModalNewVehicle = () => setShowModalNewVehicle(false);
  const handleShowModalNewVehicle = () => setShowModalNewVehicle(true);
  const handleAddVehucle = (vehucle) => {
    dispatch(addAsyncVehucle(vehucle));
  };

  // Modal Edit Vehicle
  const [selectedVehucle, setSelectedVehucle] = useState({});
  const [showModalEditVehicle, setShowModalEditVehicle] = useState(false);
  const handleCloseModalEditVehicle = () => {
    setSelectedVehucle({});
    setShowModalEditVehicle(false);
  };
  const handleShowModalEditVehicle = () => setShowModalEditVehicle(true);

  const handleUpdateVehucle = (vehucle) => {
    dispatch(updateAsyncVehucle(vehucle));
  };

  useEffect(() => {
    console.log("done");
    dispatch(fetchAsyncUserDetail(id));

    return () => {
      console.log("destroy");
      dispatch(removeSelectedUser());
    };
  }, [dispatch, id]);

  useEffect(() => {
    setSearchVehiclesResult(vehuclesUserSelected);
  }, [vehuclesUserSelected]);

  return (
    <>
      <Tabs
        defaultActiveKey="profile"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="profile" title="Profile">
          <ListGroup>
            <ListGroup.Item
              variant={`${
                selectedUser?.companies?.length > 0 ? "primary" : "warning"
              }`}
            >
              <strong>
                {selectedUser.last_name} {selectedUser.first_name}
              </strong>{" "}
              <Badge bg="info" pill>
                {selectedUser?.companies?.length ?? "0"}
              </Badge>
              <div style={{ float: "right" }}>
                <Link to={`/edit/user/${id}`}>
                  <BiEditAlt />
                </Link>{" "}
                <NavLink
                  to="#"
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(deleteAsyncUser(selectedUser));
                        dispatch(removeSelectedUser());
                        Swal.fire(
                          "Deleted!",
                          "Your file has been deleted.",
                          "success"
                        );
                      }
                    });
                  }}
                >
                  <BiTrash />
                </NavLink>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold">CIN</div>
                {selectedUser.cin}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold">Email</div>
                {selectedUser.email}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold">Adresse</div>
                {selectedUser.address}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold">Ville</div>
                {selectedUser.city}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold">Code Postal</div>
                {selectedUser.postal_code}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold">Tel Fixe</div>
                {selectedUser.cell_phone}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="ms-2 me-auto">
                <div className="fw-bold">Tel Portable</div>
                {selectedUser.work_phone}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Tab>
        <Tab eventKey="vehicules" title="Vehicules">
          <Button variant="link" onClick={handleShowModalNewVehicle}>
            Add new vehicle
          </Button>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="username"
              ref={inputSearchVehicleRef}
              onChange={handleSearchVehicles}
            />
          </InputGroup>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>company name</th>
                <th>company address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {searchVehiclesResult &&
                searchVehiclesResult.map((vehicle, i) => {
                  return (
                    <tr key={i}>
                      <td>{vehicle.id}</td>
                      <td>{vehicle.company_name}</td>
                      <td>{vehicle.company_address}</td>
                      <td>
                        <Button
                          onClick={() => {
                            setSelectedVehucle(vehicle);
                            handleShowModalEditVehicle();
                          }}
                          variant="outline-primary"
                          size="sm"
                        >
                          Edit
                        </Button>
                        &nbsp;
                        <Button
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                dispatch(deleteAsyncVehucle(vehicle));

                                Swal.fire(
                                  "Deleted!",
                                  "Your file has been deleted.",
                                  "success"
                                );
                              }
                            });
                          }}
                          variant="outline-danger"
                          size="sm"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>

          {/* Modal New Vehicle */}
          {showModalNewVehicle && (
            <NewVehucleModal
              closeModal={handleCloseModalNewVehicle}
              showModal={showModalNewVehicle}
              addVehucle={handleAddVehucle}
            />
          )}

          {/* Modal Edit Vehicle */}
          {showModalEditVehicle && (
            <EditVehucleModal
              closeModal={handleCloseModalEditVehicle}
              showModal={showModalEditVehicle}
              updateVehucle={handleUpdateVehucle}
              vehucle={selectedVehucle}
            />
          )}
        </Tab>
      </Tabs>
    </>
  );
};

export default UserDetail;
