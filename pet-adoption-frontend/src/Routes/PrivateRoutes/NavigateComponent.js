import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

class NavigateComponents extends Component {
  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <h1 className="text-center">
              Oops! Something went wrong.You can not go this route
            </h1>
            <p className="text-center">Please Sign up or log in your account</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NavigateComponents;
