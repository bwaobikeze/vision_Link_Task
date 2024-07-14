import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

function EditPointPage() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/${id}`)
      .then((res) => {
        setData(res.data);
        setName(res.data[0].name);
        setX(res.data[0].x);
        setY(res.data[0].y);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // checking if the data has been changed
  const saveChanges = () => {
    const updatedData = {};

    if (name !== data.name) {
      updatedData.name = name;
    }
    if (x !== data.x) {
      updatedData.x = x;
    }
    if (y !== data.y) {
      updatedData.y = y;
    }
    axios
      .patch(`http://localhost:5000/api/${id}`, updatedData)
      .then((res) => {
        console.log(res.data);
        navigate(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeletePoint = () => {
    axios
      .delete(`http://localhost:5000/api/${id}`)
      .then((res) => {
        navigate(`/`);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const NavigateBack = () => {
    navigate(`/`);
  };

  return (
    <div className="App">
      <header>
        <h1>Edit Point</h1>
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
            {data.map((point) => (
              <tr key={point.id}>
                <td>
                  <Form.Control
                    type="text"
                    placeholder={point.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder={point.x}
                    value={x}
                    onChange={(e) => setX(e.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder={point.y}
                    value={y}
                    onChange={(e) => setY(e.target.value)}
                  />
                </td>
              </tr>
            ))}
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
              <Button variant="primary" onClick={saveChanges}>
                Save
              </Button>
            </Col>
            <Col>
              <Button variant="primary" onClick={DeletePoint}>
                Delete
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
}
export default EditPointPage;
