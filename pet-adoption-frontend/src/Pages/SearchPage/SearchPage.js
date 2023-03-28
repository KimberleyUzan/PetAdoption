import React from "react";
import { Link } from "react-router-dom";
import Profile from '../Profile/Profile';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }
    componentDidMount() {
        const text = localStorage.getItem('search')
        const type = localStorage.getItem('type')
        fetch(`http://localhost:5002/search?${type}=${text}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    items: data
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
    render() {
        // console.log(this.state.data)
        console.log(this.state.items)
        return <>
            <Profile />
            {
                this.state.items?.length > 0 ? <>
                    <div className="row row-cols-1 row-cols-md-3 g-4 w-75 mx-auto mb-5">
                        {this.state.items.map((pet) => (
                            <div key={pet._id} className="col">
                                <div className="card ">
                                    <img
                                        style={{ height: `200px` }}
                                        src={pet?.image}
                                        className="card-img-top"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <h3 className="card-title">{pet?.name} </h3>
                                        <h5> {pet?.adoptionStatus} </h5>

                                        <Link to={`/pets/${pet._id}`}>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary my-3"
                                            >
                                                View Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </> : <>
                    <h2 className="text-center my-5">No Result found...</h2>
                </>
            }
        </>
    }
}
export default SearchPage