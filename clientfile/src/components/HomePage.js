import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import "./HomePage.css";

function HomePage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const server = process.env.REACT_APP_SERVER;
  const [DataIsNotPulled, setDataIsNotPulled] = useState(false);
  const [MessageIfDataIsNotPulled, setMessageIfDataIsNotPulled] = useState("");

  useEffect(() => {
    console.log(server);
    axios
      .get(`${server}/api`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setDataIsNotPulled(true);
        setMessageIfDataIsNotPulled(
          "Error pulling data from the server \n please check connection string & restart the server"
        );
        console.log(err);
      });
  }, []);

  const handleClick = (id) => {
    navigate(`/edit/${id}`, { state: { id } });
  };
  return (
    <div className="App">
      {DataIsNotPulled ? (
        <div>
          <Container className="justify-content-center mt-5">
            <header>
              <h1 className="header-title">Plane Points</h1>
            </header>
            <div className="alert alert-danger" role="alert">
              {MessageIfDataIsNotPulled}
            </div>
          </Container>
        </div>
      ) : (
        <Container className="justify-content-center mt-5" >
          <header>
            <h1 className="header-title">Plane Points</h1>
          </header>
          <div className="table-container">
            <Table striped bordered hover className="table-hover" >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>X</th>
                  <th>Y</th>
                </tr>
              </thead>
              <tbody>
                {data.map((point) => (
                  <tr key={point.id} onClick={() => handleClick(point.id)}>
                    <td>{point.name}</td>
                    <td>{point.x}</td>
                    <td>{point.y}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="add-point-button">
            <Button variant="primary" onClick={() => navigate("/edit")}>
              Add Point
            </Button>
          </div>
        </Container>
      )}
    </div>
  );
}
export default HomePage;
