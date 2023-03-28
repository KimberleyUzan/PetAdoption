import React, { Component } from "react";
class GetPetById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:5002/pets/${"63ea264c25e46b5cfecd54a8"}`) //fetch by pet id
      .then((response) => response.json())
      .then((data) => this.setState({ data, loading: false }));
  }

  render() {
    const { data, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }
    console.log(data);

    return (
      //   <ul>
      //     {data.map((item) => (
      //       <li key={item.id}>{item.name}</li>
      //     ))}
      //   </ul>
      <h2>hello</h2>
    );
  }
}
export default GetPetById;
