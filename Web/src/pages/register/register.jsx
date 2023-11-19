import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { createUser, login } from "../../service/api-services";
import { useAuthContext } from "../../contexts/auth-context";

function Signup() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { user, onLogin } = useAuthContext();

  function handleSignup(data) {
    createUser(data)
      .then(() => login(data))
      .then((user) => onLogin(user))
  }

  if(user){
    return <Navigate to="/groups" />
  }

return (
  <Container className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa', minHeight: "100vh" }}>
    <Row>
      <Col md={6} className="mx-auto">
        <Form className="signup-form" onSubmit={handleSubmit(handleSignup)}>
          <h1 className="text-center mb-4">Sign Up</h1>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" {...register("username", { required: "Name is required" })} />
            {errors.username && <div className="alert alert-danger mt-2" role="alert">{errors.username.message}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" {...register("email", { required: "Email is required" })} />
            {errors.email && <div className="alert alert-danger mt-2" role="alert">{errors.email.message}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
            {errors.password && <div className="alert alert-danger mt-2" role="alert">{errors.password.message}</div>}
          </Form.Group>
          <Form.Group className="mb-4" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm your password" {...register("confirmPassword", { required: "Confirm Password is required" })} />
            {errors.confirmPassword && <div className="alert alert-danger mt-2" role="alert">{errors.confirmPassword.message}</div>}
          </Form.Group>
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
);

}

export default Signup;