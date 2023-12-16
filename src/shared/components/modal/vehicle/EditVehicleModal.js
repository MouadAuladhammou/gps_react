import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { checkVehicleData } from "../../../api/vehicleApi";

// Rducer
import {
  getSelectedUserGroups,
  getError,
  clearError,
} from "../../../redux/users/userSlice";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const EditVehicleModal = ({
  closeModal,
  showModal,
  updateVehicle,
  vehicle,
}) => {
  const dispatch = useDispatch();
  const selectedUserGroups = useSelector(getSelectedUserGroups);
  const error = useSelector(getError);

  const [vehicle_, setVehicle] = useState({
    id: null,
    imei: "",
    groupe_id: null,
    make: "",
    model: "",
    year: "",
    mileage: "",
    type: "",
    registration_number: "",
  });

  useEffect(() => {
    // Mettre à jour l'état lorsque la prop vehicle change
    setVehicle({
      id: vehicle.id,
      imei: vehicle.imei,
      groupe_id: vehicle.groupe_id,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      mileage: vehicle.mileage,
      type: vehicle.type,
      registration_number: vehicle.registration_number,
    });
  }, [vehicle]);

  useEffect(() => {
    if (error.exists) {
      Swal.fire({
        title: `"${error.existingField}" saisi est utilisé par un autre utilisateur`,
        icon: "error",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
    }
  }, [error]);

  const handleClearError = () => {
    dispatch(clearError());
  };

  const handleChange = (e) => {
    const targetName = e.target.name;
    setVehicle({
      ...vehicle_,
      // NB: j'utilise [] avec variable "targetName" pour dire à JavaScript de traiter "targetName" comme une expression dynamique, et le résultat de cette expression sera le nom de la propriété à mettre à jour.
      // si tu met comme çà: targetName: e.target.value => JavaScript ici créera réellement une nouvelle propriété appelée "targetName" dans l'objet vehicle_.
      [targetName]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    // Vérifier d'abord si toutes les propriétés du véhicule ont une valeur non vide
    const isDataValid = Object.values(vehicle_).every(
      (value) => value !== "" && value !== null
    );
    if (isDataValid) {
      handleClearError();
      const resultAction = await updateVehicle(vehicle_);
      if (resultAction.type === "users/updateAsyncVehicle/rejected") {
      } else {
        closeModal();
      }
    } else {
      Swal.fire({
        title: "Erreur!",
        text: "Veuillez remplir toutes les champs.",
        icon: "error",
      });
    }
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le véhicule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>IMEI</Form.Label>
            <Form.Control
              type="text"
              value={vehicle_.imei} // If you want to change it, you can replace 'defaultValue' with 'value' in FormControl component.
              placeholder="Imei"
              autoFocus
              name="imei"
              required
              onChange={(e) => handleChange(e)}
              className={
                error && error.exists && error.existingField === "imei"
                  ? "border-red"
                  : ""
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Immatriculation</Form.Label>
            <Form.Control
              type="text"
              value={vehicle_.registration_number}
              placeholder="Immatriculation"
              name="registration_number"
              onChange={(e) => {
                if (e.target.value.length > 15)
                  alert("il faut saisir au moins 15 chiffres !");
                else handleChange(e);
              }}
              required
              className={
                error &&
                error.exists &&
                error.existingField === "registration_number"
                  ? "border-red"
                  : ""
              }
            />
          </Form.Group>

          <Form.Select
            value={vehicle_.groupe_id}
            name="groupe_id"
            required
            onChange={(e) => handleChange(e)}
          >
            <option></option>
            {selectedUserGroups.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Form.Select>

          <Form.Group className="mb-3">
            <Form.Label>Make</Form.Label>
            <Form.Control
              type="text"
              value={vehicle_.make}
              placeholder="Constructeur"
              name="make"
              required
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Modèle</Form.Label>
            <Form.Control
              type="text"
              value={vehicle_.model}
              placeholder="Modèle"
              name="model"
              required
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Année</Form.Label>
            <Form.Control
              type="number"
              value={vehicle_.year}
              placeholder="Année"
              name="year"
              required
              onChange={(e) => {
                if (e.target.value.length > 4)
                  alert("il ne faut passer 4 chiffres !");
                else handleChange(e);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>kilométrage</Form.Label>
            <Form.Control
              type="number"
              value={vehicle_.mileage}
              placeholder="kilométrage"
              name="mileage"
              required
              onChange={(e) => {
                if (e.target.value.length > 6)
                  alert("il ne faut passer 4 chiffres !");
                else handleChange(e);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              value={vehicle_.type}
              placeholder="Type"
              name="type"
              required
              onChange={(e) => handleChange(e)}
            >
              <option></option>
              <option value="car">Voiture</option>
              <option value="vehicle">Véhicule</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Annuler
          </Button>
          <Button variant="primary" type="button" onClick={handleSubmit}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

EditVehicleModal.propTypes = {
  vehicle: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imei: PropTypes.string.isRequired,
    groupe_id: PropTypes.number.isRequired,
    make: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    mileage: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    registration_number: PropTypes.string.isRequired,
  }),
};

export default EditVehicleModal;
