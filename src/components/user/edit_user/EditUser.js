import React, { useEffect } from "react";
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
  addAsyncUser,
  fetchAsyncUserDetail,
  getSelectedUser,
  removeSelectedUser,
  updateAsyncUser,
} from "../../../shared/redux/users/userSlice";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedUser = useSelector(getSelectedUser);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
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
    let user = {
      isNew: false,
      isUpdated: true,
      ...data,
    };
    try {
      const resultAction = await dispatch(updateAsyncUser(user));
      console.log("resultAction", resultAction);
      if (resultAction.type === "users/updateAsyncUser/fulfilled") {
        Swal.fire("User Updated", "", "success");
      }
    } catch (err) {
      console.error("Failed to save the post: ", err);
    } finally {
    }
  };

  useEffect(() => {
    dispatch(fetchAsyncUserDetail(id));

    return () => {
      console.log("destroy EditUser.js");
      dispatch(removeSelectedUser());
    };
  }, [dispatch, id]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h5>
          Modifier les infos d'utilisateur :
          {`Client: ${selectedUser.last_name} ${selectedUser.first_name} | CIN: ${selectedUser.cin}`}
        </h5>

        <Form.Group className="mb-3" controlId="mealName">
          <Form.Label>Prenom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter meal name"
            {...register("first_name", {
              required: "is required",
            })}
          />
          <Form.Text className="text-muted">
            {errors.first_name?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="mealName">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter meal name"
            {...register("last_name", {
              required: "is required",
            })}
          />
          <Form.Text className="text-muted">
            {errors.last_name?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="mealName">
          <Form.Label>cin</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter meal name"
            {...register("cin", {
              required: "is required",
            })}
          />
          <Form.Text className="text-muted">{errors.cin?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="mealName">
          <Form.Label>address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter meal name"
            {...register("address", {
              required: "is required",
            })}
          />
          <Form.Text className="text-muted">
            {errors.address?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="mealName">
          <Form.Label>city</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter meal name"
            {...register("city", {
              required: "is required",
            })}
          />
          <Form.Text className="text-muted">{errors.city?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="mealName">
          <Form.Label>postal_code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter meal name"
            {...register("postal_code", {
              required: "is required",
            })}
          />
          <Form.Text className="text-muted">
            {errors.postal_code?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>cell_phone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter meal price"
            {...register("cell_phone", {
              required: "is required",
              min: {
                value: 1,
                message: "minimum price is $1",
              },
            })}
          />
          <Form.Text className="text-muted">
            {errors.cell_phone?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>work_phone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter meal price"
            {...register("work_phone", {
              required: "is required",
              min: {
                value: 1,
                message: "minimum price is $1",
              },
            })}
          />
          <Form.Text className="text-muted">
            {errors.work_phone?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter meal price"
            {...register("password", {
              required: "is required",
              min: {
                value: 1,
                message: "minimum price is $1",
              },
            })}
          />
          <Form.Text className="text-muted">
            {errors.password?.message}
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button
          variant="warning"
          type="submit"
          onClick={() => navigate(`/user/${id}`)}
        >
          Cancel
        </Button>
      </Form>
    </>
  );
};

export default EditUser;
