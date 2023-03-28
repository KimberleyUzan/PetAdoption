import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import './TopHeader.css';
import {
  FaEnvelope,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

class TopHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    const userEmail = localStorage.getItem('userEmail');
    const user = JSON.parse(userEmail);
    const url = `http://localhost:5002/user?email=${user}`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(user => this.setState({ user }));
  }
  render() {
    const { user } = this.state;


    return (
      <>
        {
          user?.email ? <Navbar bg="primary" variant="dark">
            < Container >
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="text-light">
                  Welcome, <Link to='/profile' className="text-light">{user?.firstName} {user?.lastName}</Link>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <div>
                    <span className="text-light">
                      <FaEnvelope className="me-2"></FaEnvelope>
                      {user?.email}
                    </span>
                  </div>

                  {
                    user?.photo ? <Link to='/profile'><img className="width" src={user?.photo} alt="" /></Link> : <Link to='/profile'><FaUserCircle className="width" ></FaUserCircle></Link>
                  }



                </div>
              </div>
            </Container >
          </Navbar > : ''
        }
      </>
    );
  }
}

export default TopHeader;
