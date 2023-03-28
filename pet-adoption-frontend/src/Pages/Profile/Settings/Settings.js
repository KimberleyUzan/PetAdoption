import React, { Component } from 'react';
import { toast } from 'react-hot-toast';
import Profile from '../Profile';

class Settings extends Component {



state = {
    userData: {}
}

componentDidMount() {
    // Fetch user data from API and store it in state
    const userEmail = localStorage.getItem('userEmail');
    const user = JSON.parse(userEmail);
    const url = `http://localhost:5002/user?email=${user}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState({ userData: data });
        })
        .catch(error => console.error(error));
}

handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const title = form.title.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const nationality = form.nationality.value;
    const bio = form.bio.value;

    const updateInfo = {
        firstName,
        lastName,
        title,
        phone,
        address,
        nationality,
        bio
    }

    console.log(updateInfo);

    const userEmail = localStorage.getItem('userEmail');
    const user = JSON.parse(userEmail);
    const url = `http://localhost:5002/user?email=${user}`;

    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(updateInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // update state with new user data
            this.setState({ userData: data });
            toast.success('Profile Updated')
            window.location.href = '/profile';
        })
        .catch(error => console.error(error));
}

render() {
    const { userData } = this.state;

    return (
        <div>
            <Profile></Profile>
            <h1 className='text-center mb-5 '>Update Profile</h1>
                            <form onSubmit={this.handleSubmit} class="row g-3 w-75 mx-auto mb-5 border border-dark p-4">
                     <div class="col-md-6">
                         <label for="firstName" class="form-label">First Name</label>
                         <input type="text" class="form-control" id="firstName" placeholder={userData.firstName}/>
                     </div>
                     <div class="col-md-6">
                         <label for="lastName" class="form-label">Last Name</label>
                         <input type="text" class="form-control" id="lastName" placeholder={userData.lastName}/>
                     </div>


                     <div class="col-md-6">
                         <label for="title" class="form-label">Title</label>
                         <input type="text" class="form-control" id="title" placeholder={userData.title}/>
                     </div>
                     <div class="col-md-6">
                         <label for="phone" class="form-label">Phone</label>
                         <input type="text" class="form-control" id="phone" placeholder={userData.phone} />
                     </div>



                     <div class="col-md-6">
                         <label for="address" class="form-label">Address</label>
                         <input type="text" class="form-control" id="address" placeholder={userData.address}/>
                     </div>
                     <div class="col-md-6">
                         <label for="nationality" class="form-label">Nationality</label>
                         <input type="text" class="form-control" id="nationality" placeholder={userData.nationality}/>
                     </div>


                     <div class="col-12">
                         <label for="bio" class="form-label">Bio</label>
                         <textarea rows={5} type="text" class="form-control" id="bio" />
                     </div>


                     <div class="col-12">
                         <button type="submit" class="btn btn-primary">Update Profile</button>
                     </div>
                 </form>
             </div>
         );
     }
 };

 export default Settings;