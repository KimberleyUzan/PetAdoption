import React from "react";
import { Link, NavLink } from "react-router-dom";


import './Profile.css';


class Profile extends React.Component {
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


                <div class="row">
                    <div class="col-md-12">
                        <div id="content" class="content content-full-width mb-5">

                            <div class="profile">
                                <div class="profile-header">

                                    <div class="profile-header-cover"></div>

                                    <div class="profile-header-content" >

                                        <div class="profile-header-img" style={{ width: `200px`, height: `200px` }}>
                                            <img style={{ width: `100%`, height: `100%` }} src={user?.photo} alt="" />
                                        </div>

                                        <div class="profile-header-info " style={{ height: `200px`, marginLeft: `220px` }}>
                                            <h4 class="m-t-10 m-b-5 " >{user?.firstName} {user?.lastName}</h4>
                                            <p class="m-b-10">{user?.title ? user?.title : 'Title'}</p>
                                            <Link to="/settings" class="btn btn-sm btn-primary mb-2">Edit Profile</Link>
                                        </div>

                                    </div>

                                    <ul class="profile-header-tab nav nav-tabs">
                                        <li class="nav-item"><NavLink to="/profile" class="">PROFILE</NavLink></li>
                                        <li class="nav-item"><NavLink to="/my-posts" class="">MY POSTS</NavLink></li>

                                        <li class="nav-item"><NavLink to="/settings" class="">SETTINGS</NavLink></li>

                                        <li class="nav-item"><NavLink to="/add-pet" class="">ADD PETS</NavLink></li>

                                        <li className="nav-item">
                                            <NavLink to="/save" className="">
                                                SAVED PETS
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/all-pets" className="">
                                                All PETS
                                            </NavLink>
                                        </li>
                                    </ul>

                                </div>
                            </div>




                        </div>
                    </div>
                </div>



            </>
        );
    }
}

export default Profile;
