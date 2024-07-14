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
import DistancePoints from "../models/PointsClass";

function EditPointPage() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [OtherPoints, setOtherPoints] = useState([]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [nearstPoints, setNearstPoints] = useState([]);
  const [farthestPoints, setFarthestPoints] = useState([]);
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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/${id}/all`)
      .then((res) => {
        const points = res.data.map(
          (point) => new DistancePoints(point.name, point.x, point.y)
        );
        setOtherPoints(points);
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
  useEffect(() => {
    const calculateDistance = (x1, y1, x2, y2) => {
      return (
        Math.round(
          Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) * 10
        ) / 10
      );
    };

    const DistanceBewteenPoints = (x1, y1) => {
      for (let i = 0; i < OtherPoints.length; i++) {
        OtherPoints[i].DistanceBewteenPoints = calculateDistance(
          x1,
          y1,
          OtherPoints[i].x,
          OtherPoints[i].y
        );
      }
      OtherPoints.sort(
        (a, b) => a.DistanceBewteenPoints - b.DistanceBewteenPoints
      );
      const middleindex = Math.floor(OtherPoints.length / 2);

      setNearstPoints(OtherPoints.slice(0, middleindex));
      setFarthestPoints(OtherPoints.slice(middleindex));
      console.log(nearstPoints);
      console.log(farthestPoints);
    };

    if (OtherPoints.length > 0) {
      DistanceBewteenPoints(x, y);
    }
  }, [x, y, OtherPoints]);

  const NavigateBack = () => {
    navigate(`/`);
  };

  return (
    <div className="App">
      <Container className="justify-content-center mt-5">
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
                <Button
                  variant="primary"
                  className="btn btn-primary btn-lg"
                  onClick={NavigateBack}
                >
                  Back
                </Button>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  className="btn btn-primary btn-lg"
                  onClick={saveChanges}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  className="btn btn-primary btn-lg"
                  onClick={DeletePoint}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Container>

      <Container className="justify-content-center mt-5">
        <Row>
          <Col>
            <h2>Closest Points</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>X</th>
                  <th>Y</th>
                  <th>Distance</th>
                </tr>
              </thead>
              <tbody>
                {nearstPoints.map((point) => (
                  <tr key={point.name}>
                    <td>{point.name}</td>
                    <td>{point.x}</td>
                    <td>{point.y}</td>
                    <td>{point.DistanceBewteenPoints}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col>
            <h2>Farthest Points</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>X</th>
                  <th>Y</th>
                  <th>Distance</th>
                </tr>
              </thead>
              <tbody>
                {farthestPoints.map((point) => (
                  <tr key={point.name}>
                    <td>{point.name}</td>
                    <td>{point.x}</td>
                    <td>{point.y}</td>
                    <td>{point.DistanceBewteenPoints}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default EditPointPage;
