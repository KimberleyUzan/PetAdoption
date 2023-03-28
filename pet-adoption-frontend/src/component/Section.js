import React from "react";
import Banner1 from "../images/Banner1.jpg";

class HeroSection extends React.Component {
  render() {
    return (
          <div className="carousel-item active bg-dark bg-opacity-50">
            <img
              src={Banner1}
              className="d-block w-100"
              alt="Sunset Over the City"
            />
            <div className="carousel-caption d-none d-md-block">
              <h1></h1>
              <p></p>
            </div>
          </div>
    );
  }
}

export default HeroSection;


// I have not finished it is for the home page 
