import React from "react";
import Button from "react-bootstrap/Button";

import Nav from "react-bootstrap/Nav";

import { Link } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";

import LoginForm from "../../component/Signin/Signin";
import Signup from "../../component/Signup/Signup";


class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      searchText: '',
      searchType: '',
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({
      showModal: false,
    });
  }

  handleShow() {
    this.setState({
      showModal: true,
    });
  }

  // signup code

  state = {
    show: false,
  };

  handleSignUpShow = () => {
    this.setState({ show: true });
  };

  handleSignUpClose = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <>
        <section class="hero-section">
          <div class="container">
            <div class="row mt-5">
              <div class="col-md-6" style={{ "margin-top": "150px" }}>
                <h1>Do you want Pet Adaption?</h1>
                <p>Please Register or Loggedin Now</p>
                <div className="d-flex gap-2">
                  <Nav.Link>
                    <Button variant="outline-primary" onClick={this.handleShow}>
                      Login
                    </Button>
                  </Nav.Link>

                  <Nav.Link>
                    <Button
                      variant="outline-primary"
                      onClick={this.handleSignUpShow}
                    >
                      Signup
                    </Button>
                  </Nav.Link>



                  {/* sign in modal */}

                  <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <LoginForm></LoginForm>

                      <Link
                        to=""
                        variant="primary"
                        onClick={this.props.handleForgotShow}
                      >
                        Forgot Password
                      </Link>
                    </Modal.Body>


                  </Modal>



                  {/* Signup modal code */}

                  <Modal show={this.state.show} onHide={this.handleSignUpClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Signup close={this.handleSignUpClose}></Signup>
                    </Modal.Body>

                  </Modal>

                </div>
              </div>


              <div class="col-md-6">
                <img src="https://static.onecms.io/wp-content/uploads/sites/47/2021/03/22/boy-and-dog-at-home-1272603635-2000.jpg" alt="Banner Image" class="img-fluid" />
              </div>
            </div>
          </div>
        </section>

        <section class="about mt-4">
          <div class="row">
            <div class="col-md-6">
              <div class="card border-0">
                <div class="card-body">
                  <h2 class="card-title">Top reasons to adopt a pet</h2>
                  <h6 className="text-justify"> 1. To Save a Pet’s Life.</h6>
                  <h6 className="text-justify"> 2. To Find Your Best Friend</h6>
                  <h6 className="text-justify"> 3. An Endless Source of Love and Affection.</h6>
                  <h6 className="text-justify"> 4. Pet Ownership Makes Better Humans.</h6>
                  <h6 className="text-justify"> 5. Pets Can Help with Your Child’s learning.</h6>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card border-0">
                <div class="card-body">
                  <h2 class="card-title text-center">About Us</h2>
                  <h4 className="text-center">Welcome to our Pet Adoption platform!</h4>
                  <h6 className="text-justify"> We are a team of passionate individuals dedicated to finding loving homes for abandoned animals. We believe that every animal deserves a warm and caring home, and we work tirelessly to make this vision a reality. Explore our website to learn more about our work and how you can help us make a difference in the lives of our animal friends.</h6>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>

    );
  }
}
export default Homepage;
