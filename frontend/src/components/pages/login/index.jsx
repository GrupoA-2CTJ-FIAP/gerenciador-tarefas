import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { authenticateUser, checkLoginState, logOut } from '../../../services/firebase'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userCredential = await authenticateUser(email, password);
      console.log('User ID:', userCredential.uid);
      console.log('User e-mail:', userCredential.email);
      console.log('Access Token:', userCredential.accessToken);
      navigate('/home');
      // Redirect or update UI after successful login
    } catch (error) {
      setError("Não foi possível realizar o login. (" + error + ").");

    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2 className="text-center">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4 w-100">
              Login
            </Button>
            {/*
            <Button variant="secondary" onClick={checkLoginState} className="mt-4 w-100">
              Check user
            </Button>
            <Button variant="danger" onClick={logOut} className="mt-4 w-100">
              Logout
            </Button>
            */}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;