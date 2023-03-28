import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import LeftSide from './LeftSide';
// import RightSide from './RightSide';
import Profile from "../Profile";


import './SinglePetPage.css';

const SinglePetPage = () => {
    const petDetails = useLoaderData();
    const [status, setStatus] = useState(false)
    console.log("petDetails", petDetails);
    const [adoptedPets, setAdoptedPets] = useState([]);
    const [selectedPetId, setSelectedPetId] = useState(null);
    const { _id, name, type, adoptionStatus, height, weight, color, hypoallergenic, dietaryRestrictions, image, breedOfAnimal, address, price, additionalInformation, ownerEmail } = petDetails[0];
    const getItem = localStorage.getItem('userEmail')
    const parseGetItem = JSON.parse(getItem)
    const handleSavedPet = (id) => {
        fetch(`http://localhost:5002/save/${id}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ parseGetItem }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success("Animal Saved!");
                    window.location.reload();
                }
            });
    }
    const handleUnsavePet = (id) => {
        fetch(`http://localhost:5002/save/${id}`, {
            method: "DELETE"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success("Animal Un-saved!");
                    window.location.reload();
                }
            });
    }

    const handleAdoptPet = (id) => {
        const updatedAdoptedPets = [...adoptedPets, id];
        setAdoptedPets(updatedAdoptedPets);
        setSelectedPetId(id);
        alert('Congratulations, you have adopted this pet!! Please check your details in your information. You will be contacted within 24 hours.');
    };

    useEffect(() => {
        fetch(`http://localhost:5002/save/${_id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setStatus(data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [_id])
    return (
    
        <div className='bg'>
        <Profile/>
            <Row className='w-75 mx-auto'>
                <Col xs={12} md={4} className='bgl'>
                    <LeftSide></LeftSide>
                </Col>
                <Col xs={12} md={8}>

                    <div>
                        <div class="card">
                        <h1 class="card-title text-center">{name}</h1>
                            <img src={image} class="card-img-top" alt="..." />
                            <div class="card-body">
                                {/* <h1 class="card-title">{name}</h1> */}
                                <h4>Adoption Status: {adoptionStatus}</h4>
                                <h4>Type: {type}</h4>
                                <h4> Height: {height}</h4>
                                <h4> Weight: {weight}</h4>
                                <h4>Color: {color}</h4>
                                <h4>Bio: </h4>
                                <h4> Hypoallergenic (yes/no): {hypoallergenic}</h4>
                                <h4> Dietary restrictions: {dietaryRestrictions}</h4>
                                <h4> breed of animal : {breedOfAnimal}</h4>
                                <h4> Address : {address}</h4>
                                <h4> Additional Information : {additionalInformation}</h4>
                                <h4> Price : ${price}</h4>

                                <div
                                    class="btn-group"
                                    role="group"
                                    aria-label="Basic mixed styles example"
                                >
                                    {
                                        parseGetItem === ownerEmail && <>
                                            <button type="button" className="btn btn-danger">
                                                {" "}
                                                Return Pet
                                            </button>
                                        </>
                                    }
                                    {
                                        parseGetItem !== ownerEmail && <>
                                            {/* <button type="button" className="btn btn-warning">
                                                Adopt
                                            </button> */}
                                            {/* <button type="button" className="btn btn-warning"
                                            onClick={() => alert("Congratulations, you have adopted this pet!! Please check your details in your information. You will be contacted within 24 hours.")}
                                            disabled={status}
                                            >
                                                {status ? "Adopted" : "Adopt"}
                                            </button> */}
                                             <button
                                                type='button'
                                                className={`btn ${adoptedPets.includes(_id) ? 'btn-secondary' : 'btn-warning'}`}
                                                disabled={selectedPetId === _id}
                                                onClick={() => handleAdoptPet(_id)}
                                            >
                                                {adoptedPets.includes(_id) ? 'Adopted' : 'Adopt'}
                                            </button>
                                            <button type="button" className="btn btn-success">
                                                Foster
                                            </button>
                                        </>
                                    }
                                    {
                                        status === true ? <>
                                            <button type="button" className="btn btn-primary" onClick={() => handleUnsavePet(_id)}>
                                                Un-save
                                            </button>
                                        </> : <>

                                            <button type="button" className="btn btn-primary" onClick={() => handleSavedPet(_id)}>
                                                Save
                                            </button>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default SinglePetPage;