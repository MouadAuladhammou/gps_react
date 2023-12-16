import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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

const NewVehicleModal = ({ closeModal, showModal, addVehicle }) => {
  const [vehicle, setVehicle] = useState({
    imei: "",
    groupe_id: null,
    make: "",
    model: "",
    year: "",
    mileage: "",
    type: "",
    registration_number: "",
  });

  const dispatch = useDispatch();
  const selectedUserGroups = useSelector(getSelectedUserGroups);
  const error = useSelector(getError);

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
      ...vehicle,
      // NB: j'utilise [] avec variable "targetName" pour dire à JavaScript de traiter "targetName" comme une expression dynamique, et le résultat de cette expression sera le nom de la propriété à mettre à jour.
      // si tu met comme çà: targetName: e.target.value => JavaScript ici créera réellement une nouvelle propriété appelée "targetName" dans l'objet vehicle.
      [targetName]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    // Vérifier d'abord si toutes les propriétés du véhicule ont une valeur non vide
    const isDataValid = Object.values(vehicle).every(
      (value) => value !== "" && value !== null
    );
    if (isDataValid) {
      handleClearError();
      const resultAction = await addVehicle(vehicle);
      if (resultAction.type === "users/addAsyncVehicle/rejected") {
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
          <Modal.Title>Ajouter un nouveau véhicule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>IMEI</Form.Label>
            <Form.Control
              type="text"
              value={vehicle.imei}
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
              value={vehicle.registration_number}
              placeholder="Immatriculation"
              name="registration_number"
              onChange={(e) => {
                if (e.target.value.length > 15)
                  alert(
                    "Le champ Immatriculation ne peut pas dépasser 15 caractères"
                  );
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
            name="groupe_id"
            required
            value={vehicle.groupe_id}
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
            <Form.Label>Constructeur</Form.Label>
            <Form.Control
              type="text"
              value={vehicle.make}
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
              value={vehicle.model}
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
              value={vehicle.year}
              placeholder="Année"
              name="year"
              required
              onChange={(e) => {
                if (e.target.value.length > 4)
                  alert("Le champ Année ne peut pas dépasser 4 chiffres");
                else handleChange(e);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>kilométrage</Form.Label>
            <Form.Control
              type="number"
              value={vehicle.mileage}
              placeholder="kilométrage"
              name="mileage"
              required
              onChange={(e) => {
                if (e.target.value.length > 6)
                  alert("Le champ Kilométrage ne peut pas dépasser 4 chiffres");
                else handleChange(e);
              }}
            />
          </Form.Group>

          <Form.Select
            placeholder="Type"
            name="type"
            value={vehicle.type}
            required
            onChange={(e) => handleChange(e)}
          >
            <option></option>
            <option value="car">Voiture</option>
            <option value="vehicle">Véhicule</option>
          </Form.Select>
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

export default NewVehicleModal;
