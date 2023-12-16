import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const NewGroupModal = ({
  closeModal,
  showModal,
  addGroup,
  userId,
  checkGroupNameUnique,
}) => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const handleChangeGroupName = (e) => {
    e.preventDefault();
    setGroupName(e.target.value);
  };

  const handleChangeGroupDescription = (e) => {
    e.preventDefault();
    setGroupDescription(e.target.value);
  };

  const handleSubmit = async () => {
    if (groupName.trim().length < 1) {
      Swal.fire({
        title: "Erreur!",
        text: "Veuillez remplir toutes les champs.",
        icon: "error",
      });
      return;
    }
    if (checkGroupNameUnique(groupName)) {
      Swal.fire({
        title: "Erreur!",
        text: "Le nom de groupe saisi est déjà utilisé.",
        icon: "error",
      });
    } else {
      await addGroup({
        user_id: userId,
        name: groupName,
        description: groupDescription,
      });
      closeModal();
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un nouveau groupe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom de groupe</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom de groupe"
                autoFocus
                onChange={handleChangeGroupName}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="email"
                placeholder="Description"
                autoFocus
                onChange={handleChangeGroupDescription}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

NewGroupModal.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default NewGroupModal;
