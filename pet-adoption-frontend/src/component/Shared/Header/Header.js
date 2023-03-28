import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import TopHeader from "./TopHeader";

import LoginForm from "../../Signin/Signin";
import Signup from "../../Signup/Signup";
import AuthContexts from "../../context/authContext";
import { toast } from "react-hot-toast";


class Header extends React.Component {
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

  handleSubmit = (e) => {
    console.log(this.state.searchText)
    console.log(this.state.searchType)
    const type = this.state.searchType
    const text = this.state.searchText
    if (type === '') {
      return alert('Search Type is empty')
    }
    if (type === 'basic' && text) {
      localStorage.setItem('type', type)
      localStorage.setItem('search', text)
      return window.location.href = "http://localhost:3000/search";
    }
    if (type === 'advanced' && text) {
      localStorage.setItem('type', type)
      localStorage.setItem('search', text)
      return window.location.href = "http://localhost:3000/search";
    }
  }

  handleSignUpClose = () => {
    this.setState({ show: false });
  };
  render() {
    const user = localStorage.getItem("userEmail");
    const userEmail = JSON.parse(user);
    const { logOut } = this.context;
    const handleLogOut = () => {
      logOut()
        .then(() => {
          console.log('successfuly logout');
          toast.success('You have logged Out Successfully!!')
          if (!userEmail) {
            return <a href="/profile"></a>;
          }
        })
        .catch(error => {
          console.error('error', error.message)
        })
    };
    return (
      <>
        <TopHeader></TopHeader>
        <Navbar bg="light" expand="lg" sticky="top">
          <Container className="container-lg">
            <Navbar.Brand href="/">Pet Adoption</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <div className="d-flex justify-content-center" style={{ width: '85%' }}>
                <Form
                  className="d-flex w-100 justify-content-center align-items-center gap-2"
                  style={{ maxWidth: "75%" }}
                >
                  <DropdownButton id="dropdown-basic-button" title="Search type" size='sm'>
                    <Dropdown.Item onClick={() => this.setState({ searchType: 'basic' })}>Basic</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.setState({ searchType: 'advanced' })}>Advanced</Dropdown.Item>
                  </DropdownButton><Form.Control
                    type="search"
                    placeholder={`${this.state.searchType === 'advanced' ? 'Search by status, height,weight,type' : 'Search by animal type'}`}
                    className="me-2 w-75"
                    aria-label="Search"
                    onChange={(e) => this.setState({ searchText: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) })}
                  />
                  <Button onClick={this.handleSubmit} variant="outline-success">Search</Button>
                </Form>
              </div>

              <Nav
                className="ms-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >


                {
                  userEmail ? <>
                    <Nav.Link>
                      <Button
                        variant="outline-primary"
                        onClick={handleLogOut}
                        className={user || user ? "d-block" : "d-none"}
                      >
                        Log Out
                      </Button>
                    </Nav.Link>
                  </> :

                    <>

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

                    </>
                }




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

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

Header.contextType = AuthContexts;

export default Header;
