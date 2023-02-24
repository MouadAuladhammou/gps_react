import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { VEHICLE_TYPES } from "../../helpers/types";

const EditVehucleModal = ({
  closeModal,
  showModal,
  updateVehucle,
  vehucle,
}) => {
  const [companyName, setCompanyName] = useState(vehucle.company_name);
  const [companyAddress, setCompanyAddress] = useState(vehucle.company_address);
  const [vehicleType, setVehicleType] = useState({ name: "car", id: 1 });

  const handleChangeCompanyName = (e) => {
    e.preventDefault();
    setCompanyName(e.target.value);
  };

  const handleChangeCompanyAddress = (e) => {
    e.preventDefault();
    setCompanyAddress(e.target.value);
  };

  const onChangeVehicleType = ({ id, name }) => {
    console.log("on change = " + JSON.stringify({ id, name }));
    setVehicleType(name);
  };

  return (
    <>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Select
              options={VEHICLE_TYPES}
              defaultValue={vehicleType}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              onChange={onChangeVehicleType}
            />
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>company name</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={handleChangeCompanyName}
                value={companyName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={handleChangeCompanyAddress}
                value={companyAddress}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              updateVehucle({
                ...vehucle,
                company_name: companyName,
                company_address: companyAddress,
              });
              closeModal();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditVehucleModal;
