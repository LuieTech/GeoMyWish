import { useEffect, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createGroup, createProduct } from "../../service/api-services";
import { PlusSquare } from "react-bootstrap-icons";
import "./form.css";
import { Container } from "react-bootstrap";

function GroupForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createGroup(data)
      .then(() => {
        navigate(`/groups`);
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  const handleOnClick = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <Container className="components py-4">
      <h2>Create Group</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-control-sm input-icon-container"
        style={{ width: "auto", height: "50px" }}
      >
        
        <input
          placeholder="Group name..."
          name="name"
          type="text"
          {...register("name", { required: true, minLength: 3, maxLength: 20 })}
          className={`form-control ${errors.name ? "is-invalid" : ""} `}
        />
        <PlusSquare size={20} onClick={handleOnClick} />

        {errors.name && (
          <span className="invalid-feedback">
            Name is required (3-20 characters).
          </span>
        )}
      </form>
    </Container>
  );
}

export default GroupForm;
