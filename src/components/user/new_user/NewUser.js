import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

// reducer
import { addAsyncUser } from "../../../shared/redux/users/userSlice";

const NewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      last_name: "Aoulad Hammoud",
      first_name: "Mouad",
      email: "cccc@gmailrr.com",
      cin: "L234543",
      address: "mhanech 2 tetouan",
      city: "tetouan",
      postal_code: "93000",
      cell_phone: "0606060606",
      work_phone: "0706060606",
      password: "23456",
    },
  });

  const onSubmit = async (data) => {
    let newUser = {
      isNew: true,
      ...data,
    };
    try {
      const resultAction = await dispatch(addAsyncUser(newUser));
      console.log("resultAction", resultAction);
      if (resultAction.type === "users/addAsyncUser/fulfilled") {
        Swal.fire("Meal added", "", "success");
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Failed to save the post: ", err);
    } finally {
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h4>Add new Meal</h4>

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
        <Button variant="warning" type="submit" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </Form>
    </>
  );
};

export default NewUser;
