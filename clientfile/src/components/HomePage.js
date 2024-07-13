import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function HomePage() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api")
      .then((res) => {
        setData(res.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
    
    const handleClick = (id) => {
       navigate(`/edit/${id}`, { state: { id} })
    };
  return (
    <div className="App">
      <header>
        <h1>React Project</h1>
      </header>
      <Table striped bordered hover>
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
          <div>
          <Button variant="primary" onClick={() => navigate("/edit")}>Add Point</Button>
          </div>
    </div>
  );
}
export default HomePage;
