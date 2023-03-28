import React, { Component, useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../component/context/authContext";
import Profile from "../Profile";

class AddPet extends Component {

  state = {

    name: "",
    ownerEmail: JSON.parse(localStorage.getItem('userEmail')),
    type: "",
    adoptionStatus: "",
    height: "",
    weight: "",
    color: "",
    hypoallergenic: "",
    dietaryRestrictions: "",
    image: "",
    breedOfAnimal: "",
    address: "",
    price: "",
    additionalInformation: "",
  };

  /*  componentDidMount() {
     const userEmail = localStorage.getItem('userEmail');
     const user = JSON.parse(userEmail);
     console.log(user);
   } */


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);


    const image = e.target.image.files[0];
    // img code

    const formData = new FormData();
    formData.append("image", image);

    const url =
      "https://api.imgbb.com/1/upload?key=c993754e5e7bdf8ca9412defbbd79642";
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {

          console.log(imageData.data.url);
          toast.success("Photo Updated");

          const petInfo = {
            email: JSON.parse(localStorage.getItem('userEmail')),
            name: this.state.name,
            // ownerEmail: JSON.parse(localStorage.getItem('userEmail')),
            type: this.state.type,
            adoptionStatus: this.state.adoptionStatus,
            height: this.state.height,
            weight: this.state.weight,
            color: this.state.color,
            hypoallergenic: this.state.hypoallergenic,
            dietaryRestrictions: this.state.dietaryRestrictions,
            image: imageData.data.url,
            breedOfAnimal: this.state.breedOfAnimal,
            address: this.state.address,
            price: this.state.price,
            additionalInformation: this.state.additionalInformation,
          };

          console.log(petInfo);


          fetch("http://localhost:5002/pet", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(petInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.acknowledged) {
                toast.success("Your Data has been recorded");
                window.location.href = '/my-posts';
              }
            });
        }
      })






  };



  render() {

    return (
      <div className="mb-5">
        <Profile></Profile>
        <form
          className="w-75 mx-auto border border-success p-5"
          onSubmit={this.handleSubmit}
        >
          <h1 className="text-center pb-5">Add Pet With details</h1>
          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <label className="form-label" for="form6Example1">
                  Name
                </label>
                <input
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  type="text"
                  id="form6Example1"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <label className="form-label" for="form6Example2">
                  Type (dog, cat)
                </label>
                <select
                  class="form-select"
                  name="type"
                  value={this.state.type}
                  onChange={this.handleChange}
                  id="form6Example2"
                  aria-label="Floating label select example"
                >
                  <option selected>Open this select menu</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <label className="form-label" for="form6Example1">
                  Adoption Status
                </label>
                <input
                  name="adoptionStatus"
                  value={this.state.adoptionStatus}
                  onChange={this.handleChange}
                  type="text"
                  id="form6Example1"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <label className="form-label" for="form6Example2">
                  Height
                </label>
                <input
                  name="height"
                  value={this.state.height}
                  onChange={this.handleChange}
                  type="text"
                  id="form6Example2"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <label className="form-label" for="form6Example2">
                  Weight
                </label>
                <input
                  name="weight"
                  value={this.state.weight}
                  onChange={this.handleChange}
                  type="text"
                  id="form6Example2"
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <label className="form-label" for="form6Example1">
                  Color
                </label>
                <input
                  type="text"
                  id="form6Example1"
                  className="form-control"
                  name="color"
                  value={this.state.color}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <label className="form-label" for="form6Example2">
                  {" "}
                  Hypoallergenic (yes/no)
                </label>
                <select
                  class="form-select"
                  name="hypoallergenic"
                  value={this.state.hypoallergenic}
                  onChange={this.handleChange}
                  aria-label="Floating label select example"
                >
                  <option selected>Open this select menu</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <label className="form-label" for="form6Example2">
                  {" "}
                  dietary restrictions
                </label>
                <input
                  type="text"
                  id="form6Example2"
                  className="form-control"
                  name="dietaryRestrictions"
                  value={this.state.dietaryRestrictions}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col">
              <div class="form-outline ">
                <label class="form-label" for="image">
                  Upload Photo
                </label>
                <input
                  type="file"
                  class="form-control"
                  id="image"
                  name="image"
                  value={this.state.image}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <label className="form-label" for="form6Example2">
                  {" "}
                  breed of animal (Poodle, Siamese){" "}
                </label>
                <input
                  type="text"
                  id="form6Example2"
                  className="form-control"
                  name="breedOfAnimal"
                  value={this.state.breedOfAnimal}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col">
              <div class="form-outline ">
                <label className="form-label" for="form6Example4">
                  Address
                </label>
                <input
                  type="text"
                  id="form6Example4"
                  className="form-control"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <label className="form-label" for="form6Example2">
                  {" "}
                  Price{" "}
                </label>
                <input
                  type="text"
                  id="form6Example2"
                  className="form-control"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" for="form6Example7">
              Additional information
            </label>
            <textarea
              className="form-control"
              id="form6Example7"
              rows="4"
              name="additionalInformation"
              value={this.state.additionalInformation}
              onChange={this.handleChange}
            ></textarea>
          </div>

          <div className="form-check d-flex  mb-4">
            <input
              className="form-check-input me-2"
              type="checkbox"
              value=""
              id="form6Example8"
            />
            <label className="form-check-label" for="form6Example8">
              {" "}
              Confirm{" "}
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Add Pet
          </button>
        </form>
      </div>
    );
  }
}

export default AddPet;
