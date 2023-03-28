import React, { Component } from 'react';
import Profile from '../Profile';

import { Link } from 'react-router-dom';

//PetPage
class MyPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: [],
            isLoading: true,
            error: null
        };
    }

    componentDidMount() {
        fetch('http://localhost:5002/pets')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong...');
                }
            })
            .then(data => {
                const email = JSON.parse(localStorage.getItem('userEmail'))
                const filtr = data.filter(myp => myp?.email === email)
                // console.log(filtr);
                this.setState({ pets: filtr, isLoading: false });
            })
            .catch(error => {
                this.setState({ error, isLoading: false });
            });
    }

    render() {
        const { pets, isLoading, error } = this.state;
        console.log(pets);
        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <Profile></Profile>

                <h1 className='text-center mb-5'>My All Pets Collection</h1>

                {


                    pets.length === 0 ?
                        <div>
                            <h3 className='text-center'>You have not posted any Pet Yet. Please add a Pet before then visit this page. Thank you</h3>
                        </div>
                        :



                        <div class="row row-cols-1 row-cols-md-3 g-4 w-75 mx-auto mb-5">


                            {
                                pets.map(pet => <div key={pet._id} class="col">
                                    <div class="card " >
                                        <img style={{ height: `200px` }} src={pet?.image} class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <h3 class="card-title">{pet?.name} </h3>
                                            <h5> {pet?.price} </h5>

                                            <Link to={`/pets/${pet._id}`}>
                                                <button type="button" class="btn btn-outline-primary my-3">View Details</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>)
                            }





                        </div>
                }
            </div>
        );
    }
};

export default MyPosts;