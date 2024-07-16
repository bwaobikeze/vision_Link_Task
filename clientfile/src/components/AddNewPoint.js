import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

function AddNewPoint() {
  const [name, setName] = useState("");
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [data, setData] = useState([]);
  const [OtherPoints, setOtherPoints] = useState([]);
  const [DataCantBeAdded, setDataCantBeAdded] = useState(false);
  const [MessageIfDataCantBeAdded, setMessageIfDataCantBeAdded] = useState("");
  const navigate = useNavigate();
  const server = process.env.REACT_APP_SERVER;

  // adding a new point
  const addPoint = () => {
    axios
      .post(`${server}/api/edit`, { name, x, y })
      .then((res) => {
        setData([...data, { name, x, y }]);
        navigate(`/`);
      })
      .catch((err) => {
        setDataCantBeAdded(true);
        setMessageIfDataCantBeAdded(
          "Error adding data to the server \n please check connection string to database & restart the server"
        );
        console.log(err);
      });
  };

  // getting all the points
  useEffect(() => {
    axios
      .get(`${server}/api`)
      .then((res) => {
        if (res.data) setOtherPoints(res.data);
        console.log(OtherPoints);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const NavigateBack = () => {
    navigate(`/`);
  };

  // checking if the data is valid
  const CheckIfDataIsValid = () => {
    if (name === "" || isNaN(x) || isNaN(y)) {
      return false;
    }
    for (let i = 0; i < OtherPoints.length; i++) {
      if (name === OtherPoints[i].name) {
        return false;
      }
    }
    return true;
  };
  return (
    <div>
      <Container className="justify-content-center mt-5">
        <Alert show={DataCantBeAdded} variant="danger">
          <Alert.Heading>Error adding data</Alert.Heading>
          <p>{MessageIfDataCantBeAdded}</p>
        </Alert>
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
                  Back to Home
                </Button>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  disabled={!CheckIfDataIsValid()}
                  onClick={addPoint}
                >
                  Add New Point
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Container>
    </div>
  );
}
export default AddNewPoint;
