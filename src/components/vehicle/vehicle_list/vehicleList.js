import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

// components
import VehicleItem from "../vehicle_item/VehicleItem";
import NewVehicleModal from "../../../shared/components/modal/vehicle/NewVehicleModal";

// Reducer
import {
  addAsyncVehicle,
  clearError,
} from "../../../shared/redux/users/userSlice";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import "./VehicleList.scss";

const VehicleList = ({ groups }) => {
  const dispatch = useDispatch();

  const inputSearchVehicleRef = useRef("");
  const [searchVehiclesResult, setSearchVehiclesResult] = useState([]);

  useEffect(() => {
    setSearchVehiclesResult(groups);
  }, [groups]);

  const handleSearchVehicles = () => {
    const vehicleSearch = inputSearchVehicleRef.current.value.trim();
    if (vehicleSearch) {
      const result = groups.map((group) => ({
        ...group,
        vehicles: (group.vehicles || []).filter(
          (vehicle) =>
            vehicle.imei.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
            vehicle.make.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
            vehicle.model.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
            vehicle.year.toString().includes(vehicleSearch.toLowerCase())
        ),
      }));
      setSearchVehiclesResult(result);
    } else {
      setSearchVehiclesResult(groups);
    }
  };

  // Modal New Vehicle
  const [showModalNewVehicle, setShowModalNewVehicle] = useState(false);
  const handleCloseModalNewVehicle = () => {
    dispatch(clearError());
    setShowModalNewVehicle(false);
  };
  const handleShowModalNewVehicle = () => setShowModalNewVehicle(true);
  const handleAddVehicle = async (vehicle) => {
    return await dispatch(addAsyncVehicle(vehicle));
  };

  const renderingVehicles =
    searchVehiclesResult.length > 0 ? (
      searchVehiclesResult.map((group, index) => (
        <React.Fragment key={index}>
          <tr className="border-bottom">
            <td colSpan={8}>
              <div className="fw-bold">Groupe : {group.name}</div>
            </td>
          </tr>
          {(group.vehicles || []).map((vehicle, vehicleIndex) => (
            <VehicleItem key={vehicleIndex} vehicle={vehicle} />
          ))}
        </React.Fragment>
      ))
    ) : (
      <div className="users-error">
        <h3>No data ...</h3>
      </div>
    );

  return (
    <>
      <Button variant="link" onClick={handleShowModalNewVehicle}>
        Ajouter un nouveau véhicule
      </Button>

      {showModalNewVehicle && (
        <NewVehicleModal
          closeModal={handleCloseModalNewVehicle}
          showModal={showModalNewVehicle}
          addVehicle={handleAddVehicle}
        />
      )}

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Rechercher"
          ref={inputSearchVehicleRef}
          onChange={handleSearchVehicles}
        />
      </InputGroup>

      <Table striped="columns" hover>
        <thead>
          <tr className="border-bottom">
            {/* <th>ID</th> */}
            <th>IMEI</th>
            <th>Constructeur</th>
            <th>Modèle</th>
            <th>Année</th>
            <th>Matricule</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderingVehicles}</tbody>
      </Table>
    </>
  );
};

VehicleList.propTypes = {
  groups: PropTypes.array.isRequired,
};

export default VehicleList;
