import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { unwrapResult } from "@reduxjs/toolkit";

// reducer
import {
  fetchAsyncUserDetail,
  getSelectedUser,
  removeSelectedUser,
  updateAsyncUser,
  getError,
  clearError,
} from "../../../shared/redux/users/userSlice";

import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedUser = useSelector(getSelectedUser);

  const error = useSelector(getError);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    return () => {
      handleClearError();
    };
  }, []);

  useEffect(() => {
    if (error.exists) {
      setShowAlert(true);
      // Définir l'erreur personnalisée
      setError(error.existingField, {
        type: "manual",
        message: `"${error.existingField}" saisi est utilisé par un autre utilisateur`,
      });

      // <Swal.fire({
      //   title: `"${error.existingField}" saisi est utilisé par un autre utilisateur`,
      //   icon: "error",
      //   confirmButtonColor: "#3085d6",
      //   cancelButtonColor: "#d33",
      //   confirmButtonText: "Ok",
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //   }
      // });>
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchAsyncUserDetail(id));
    return () => {
      dispatch(removeSelectedUser());
    };
  }, [id]);

  const handleClearError = () => {
    dispatch(clearError());
  };

  const {
    register,
    handleSubmit,
    setError,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      id: selectedUser.id,
      last_name: selectedUser.last_name,
      first_name: selectedUser.first_name,
      email: selectedUser.email,
      cin: selectedUser.cin,
      address: selectedUser.address,
      city: selectedUser.city,
      postal_code: selectedUser.postal_code,
      cell_phone: selectedUser.cell_phone,
      work_phone: selectedUser.work_phone,
      password: selectedUser.password,
    },
  });

  const onSubmit = async (data) => {
    if (isValid) {
      let user = {
        isNew: false,
        isUpdated: true,
        ...data,
      };
      try {
        const resultAction = await dispatch(updateAsyncUser(user));
        console.log("resultAction", resultAction);
        if (resultAction.type === "users/updateAsyncUser/rejected") {
        } else {
          navigate(`/user/${selectedUser.id}`, { replace: true });
        }
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
      }
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {` Modifier les informations d'utilisateur: ${selectedUser.last_name} ${selectedUser.first_name} | CIN: ${selectedUser.cin}`}
          <hr />
        </Card.Title>

        {showAlert && error.exists && (
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <Alert.Heading>Erreur!</Alert.Heading>
            <p>
              <strong>{error.existingField}</strong> saisi est utilisé par un
              autre utilisateur.
            </p>
          </Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-6">
              <Form.Group className="mb-3">
                <Form.Label>Prenom</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.first_name && "border-red"}
                  placeholder="Prenom"
                  {...register("first_name", {
                    required: "Veuillez saisir le champ Prenom",
                  })}
                />
                <Form.Text className="text-muted">
                  {errors.first_name?.message}
                </Form.Text>
              </Form.Group>
            </div>

            <div className="col-6">
              <Form.Group className="mb-3">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.last_name && "border-red"}
                  placeholder="Nom"
                  {...register("last_name", {
                    required: "Veuillez saisir le champ Nom",
                  })}
                />
                <Form.Text className="text-muted">
                  {errors.last_name?.message}
                </Form.Text>
              </Form.Group>
            </div>

            <div className="col-4">
              <Form.Group className="mb-3">
                <Form.Label>CIN</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.cin && "border-red"}
                  placeholder="Cin"
                  {...register("cin", {
                    required:
                      "Veuillez saisir le champ CIN (maximum 10 caractères)",
                    maxLength: {
                      value: 10,
                      message:
                        "Le champ CIN ne peut pas dépasser 10 caractères",
                    },
                  })}
                />
                <Form.Text className="text-muted">
                  {errors.cin?.message}
                </Form.Text>
              </Form.Group>
            </div>

            <div className="col-8">
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  className={errors.email && "border-red"}
                  placeholder="Email"
                  {...register("email", {
                    required: "Veuillez saisir le champ Email",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Adresse Email invalide",
                    },
                  })}
                />
                <Form.Text className="text-muted">
                  {errors.email?.message}
                </Form.Text>
              </Form.Group>
            </div>

            <div className="col-3">
              <Form.Group className="mb-3">
                <Form.Label>Ville</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.city && "border-red"}
                  placeholder="Ville"
                  {...register("city", {
                    required: "Veuillez saisir le champ Ville",
                  })}
                />
                <Form.Text className="text-muted">
                  {errors.city?.message}
                </Form.Text>
              </Form.Group>
            </div>

            <div className="col-3">
              <Form.Group className="mb-3">
                <Form.Label>Code Postal</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.postal_code && "border-red"}
                  placeholder="Code Postal"
                  {...register("postal_code", {
                    required: "Veuillez saisir le champ Code Postal",
                  })}
                />
                <Form.Text className="text-muted">
                  {errors.postal_code?.message}
                </Form.Text>
              </Form.Group>
            </div>

            <div className="col-6">
              <Form.Group className="mb-3">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  className={errors.address && "border-red"}
                  placeholder="Adresse"
                  {...register("address", {
                    required: "Veuillez saisir le champ Adresse",
                  })}
                />
                <Form.Text className="text-muted">
                  {errors.address?.message}
                </Form.Text>
              </Form.Group>
            </div>

            <div className="col-6">
              <Form.Group className="mb-3">
                <Form.Label>Téléphone portable</Form.Label>
                <Form.Control
                  type="number"
                  className={errors.cell_phone && "border-red"}
                  placeholder="Téléphone portable"
                  {...register("cell_phone", {
                    required:
                      "Veuillez saisir le champ Téléphone portable (maximum 15 caractères)",
                    maxLength: {
                      value: 15,
                      message:
                        "Le champ Téléphone portable ne peut pas dépasser 15 caractères",
                    },
                  })}
                />
                <Form.Text className="text-muted">
                  {errors.cell_phone?.message}
                </Form.Text>
              </Form.Group>
            </div>

            <div className="col-6">
              <Form.Group className="mb-3">
                <Form.Label>Téléphone de travail</Form.Label>
                <Form.Control
                  type="number"
                  className={errors.work_phone && "border-red"}
                  placeholder="Téléphone de travail"
                  {...register("work_phone", {
                    required:
                      "Veuillez saisir le champ Téléphone de travail (maximum 15 caractères)",
                    maxLength: {
                      value: 15,
                      message:
                        "Le champ Téléphone de travail ne peut pas dépasser 15 caractères",
                    },
                  })}
                />
                <Form.Text className="text-muted">
                  {errors.work_phone?.message}
                </Form.Text>
              </Form.Group>
            </div>

            <div className="col-6">
              <Form.Group className="mb-3">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="number"
                  className={errors.password && "border-red"}
                  placeholder="Mot de passe"
                  {...register("password", {
                    required:
                      "Veuillez saisir le champ Mot de passe (minimum 6 caractères)",
                    minLength: {
                      value: 6,
                      message:
                        "Le Mot de passe doit contenir au moins 6 caractères",
                    },
                  })}
                />
                <Form.Text className="text-muted">
                  {errors.password?.message}
                </Form.Text>
              </Form.Group>
            </div>
          </div>

          <Button variant="primary" type="submit" className="mx-1">
            Enregistrer
          </Button>
          <Button
            variant="warning"
            type="submit"
            className="mx-1"
            onClick={() => navigate(`/user/${id}`)}
          >
            Annuler
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditUser;
