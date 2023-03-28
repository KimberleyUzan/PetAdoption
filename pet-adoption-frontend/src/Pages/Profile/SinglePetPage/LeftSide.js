import React from 'react';
import { Nav } from 'react-bootstrap';
import './LeftSide.css';
import { NavLink } from 'react-router-dom';


class LeftSide extends React.Component {
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
                this.setState({ pets: data, isLoading: false });
            })
            .catch(error => {
                this.setState({ error, isLoading: false });
            });
    }

    render() {
        const { pets, isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <Nav className='pet-list'>

                {
                    pets.map(pet => <NavLink key={pet?._id} to={`/pets/${pet._id}`} className="d-block w-100 fs-4 text-decoration-none">
                        {pet?.name}
                    </NavLink>)
                }

            </Nav>
        );
    }
};

export default LeftSide;