import { useForm } from "react-hook-form";
import { login } from "../../service/api-services";
import { useAuthContext } from "../../contexts/auth-context";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { onLogin } = useAuthContext();
  const [error, setError] = useState(false);

  function handleLogin(data) {
    login(data)
      .then((user) => {
        onLogin(user)
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        if (error.response.status === 404) setError(true);
      });
    reset();
  }

  return (
    <Container
      className="d-flex align-items-center pb-5 justify-content-center components"
      style={{ minHeight: "100vh" }}
    >
      <Row>
        <Col style={{ display: "contents" }}>
          <Form className="login-form" onSubmit={handleSubmit(handleLogin)}>
            <h1 className="text-center mb-4">Login</h1>
            {error && (
              <h5 className="alert alert-danger m-2 small" >
                username or password invalid
              </h5>
            )}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                  onChange: () => setError(false), 
                })}
              />
              {errors.email && (
                <div className="alert alert-danger mt-2" role="alert">
                  {errors.email.message}
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", { 
                  required: "Password is required",
                  onChange: () => setError(false)
                })}
              />
              {errors.password && (
                <div className="alert alert-danger mt-2" role="alert">
                  {errors.password.message}
                </div>
              )}
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
            <div className="text-center mt-2">
              Don't have an account yet? <Link to="/signup">Sign up</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
