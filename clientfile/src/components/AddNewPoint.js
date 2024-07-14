import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

function AddNewPoint() {
  const [name, setName] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const addPoint = () => {
    axios
      .post("http://localhost:5000/api/edit", { name, x, y })
      .then((res) => {
        console.log(res.data);
          setData([...data, { name, x, y }]);
          navigate(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const NavigateBack = () => {
    navigate(`/`);
  };
  return (
    <div>
      <header>
        <h1>Add New Point</h1>
      </header>
      <Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>X</th>
              <th>Y</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="X"
                  value={x}
                  onChange={(e) => setX(e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Y"
                  value={y}
                  onChange={(e) => setY(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <Container>
          <Row>
            <Col>
              <Button variant="primary" onClick={NavigateBack}>
                Back
              </Button>
            </Col>
            <Col>
              <Button variant="primary" onClick={addPoint}>
                Add
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
}
export default AddNewPoint;
