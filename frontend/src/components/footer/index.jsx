import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col className="text-center mt-3">
            <p>&copy; {new Date().getFullYear()} Tech Challenge Grupo A.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;