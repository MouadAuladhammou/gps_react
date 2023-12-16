import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

// components
import EditVehicleModal from "../../../shared/components/modal/vehicle/EditVehicleModal";

// Reducer
import {
  updateAsyncVehicle,
  deleteAsyncVehicle,
  clearError,
} from "../../../shared/redux/users/userSlice";

import Button from "react-bootstrap/Button";

import "./VehicleItem.scss";

const VehicleItem = ({ vehicle }) => {
  const dispatch = useDispatch();

  // Modal Edit Vehicle
  const [showModalEditVehicle, setShowModalEditVehicle] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleShowModalEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModalEditVehicle(true);
  };

  const handleCloseModalNewVehicle = () => {
    dispatch(clearError());
    setShowModalEditVehicle(false);
  };

  const handleUpdateVehicle = async (vehicle) => {
    return await dispatch(updateAsyncVehicle(vehicle));
  };

  const handleDeleteVehicle = (id) => {
    Swal.fire({
      title: "Vous voulez vraiment supprimer ce véhicule ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteAsyncVehicle(id));
      }
    });
  };

  return (
    <>
      <tr key={vehicle.id}>
        {/* <td>{vehicle.id}</td> */}
        <td>{vehicle.imei}</td>
        <td>{vehicle.make}</td>
        <td>{vehicle.model}</td>
        <td>{vehicle.year}</td>
        <td>{vehicle.registration_number}</td>
        <td>{vehicle.type}</td>
        <td className="right-align">
          <Button
            onClick={() => handleShowModalEditVehicle(vehicle)}
            variant="outline-primary"
            size="sm"
          >
            Modifier
          </Button>
          &nbsp;
          <Button
            onClick={() => {
              handleDeleteVehicle(vehicle.id);
            }}
            variant="outline-danger"
            size="sm"
          >
            Supprimer
          </Button>
        </td>
      </tr>

      {showModalEditVehicle && (
        <EditVehicleModal
          closeModal={handleCloseModalNewVehicle}
          showModal={showModalEditVehicle}
          updateVehicle={handleUpdateVehicle}
          vehicle={selectedVehicle}
        />
      )}
    </>
  );
};

VehicleItem.propTypes = {
  vehicle: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imei: PropTypes.string.isRequired,
    make: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    registration_number: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

export default VehicleItem;
