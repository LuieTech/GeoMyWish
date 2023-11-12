import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { createUser, login } from "../../service/api-services";
import { useAuthContext } from "../../contexts/auth-context";
import { Icon } from '@iconify/react';

function Signup() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { user, onLogin } = useAuthContext();

  function handleSignup(data) {
    createUser(data)
      .then(() => login(data))
      .then((user) => onLogin(user))
  }

  if(user){
    return <Navigate to="/" />
  }

  return (
    
    <Container className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa', minHeight: "100vh" }}>
      <Row>
        <Col md={6} className="mx-auto">
          <Form className="signup-form" onSubmit={handleSubmit(handleSignup)}>
            <h1 className="text-center mb-4">Sign Up</h1>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" {...register("username", { required: "Name is required" })} />
              {errors.username && <div className="alert alert-danger mt-2" role="alert">{errors.username.message}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" {...register("email", { required: "Email is required" })} />
              {errors.email && <div className="alert alert-danger mt-2" role="alert">{errors.email.message}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" {...register("password", { required: "Password is required" })} />
              {errors.password && <div className="alert alert-danger mt-2" role="alert">{errors.password.message}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" {...register("confirmPassword", { required: "Confirm Password is required" })} />
              {errors.confirmPassword && <div className="alert alert-danger mt-2" role="alert">{errors.confirmPassword.message}</div>}
            </div>
            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
            <div className="text-center mt-2">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>

  )
}

export default Signup;