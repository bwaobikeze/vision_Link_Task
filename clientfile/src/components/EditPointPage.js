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
  const [data, setData] = useState([]); // data is an array of objects
  const { id } = useParams();
  const [name, setName] = useState(""); // name is a string
  const [OtherPoints, setOtherPoints] = useState([]); // OtherPoints is an array of objects
  const [x, setX] = useState(0); // x is a number
  const [y, setY] = useState(0); // y is a number
  const [nearstPoints, setNearstPoints] = useState([]); //  nearstPoints is an array of objects
  const [farthestPoints, setFarthestPoints] = useState([]); // farthestPoints is an array of objects
  const [lowestPoint, setlowestPoint] = useState(); // lowestPoint is a number
  const [highestPoint, sethighestPoint] = useState(); // highestPoint is a number
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

  // getting all the points & setting the points to the DistancePoints class object
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
    // calculate the distance between two points
    const calculateDistance = (x1, y1, x2, y2) => {
      return (
        Math.round(
          Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) * 10
        ) / 10
      );
    };
    // calculate the distance between the current point and all other points
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
      let lowestPoint = OtherPoints[0].DistanceBewteenPoints; // get the lowest point
      setlowestPoint(lowestPoint);

      let highestPoint =
        OtherPoints[OtherPoints.length - 1].DistanceBewteenPoints; // get the highest point
      sethighestPoint(highestPoint);

      setNearstPoints(
        OtherPoints.filter(
          (point) => point.DistanceBewteenPoints === lowestPoint
        )
      ); // get the nearest points
      setFarthestPoints(
        OtherPoints.filter(
          (point) => point.DistanceBewteenPoints === highestPoint
        )
      ); // get the farthest points
    };

    if (OtherPoints.length > 0) {
      DistanceBewteenPoints(x, y);
    }
  }, [x, y, OtherPoints]);

  const NavigateBack = () => {
    navigate(`/`);
  };
  // reset the point values to the original values
  const ResetPointValues = () => {
    setName(data[0].name);
    setX(data[0].x);
    setY(data[0].y);
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
                  Back to Home
                </Button>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  className="btn btn-primary btn-lg"
                  onClick={saveChanges}
                  disabled={!CheckIfDataIsValid()}
                >
                  Save Changes
                </Button>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  className="btn btn-primary btn-lg"
                  onClick={DeletePoint}
                >
                  Delete Point
                </Button>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  className="btn btn-primary btn-lg"
                  onClick={ResetPointValues}
                >
                  Reset Values
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Container>

      <Container className="justify-content-center mt-5">
        <Row>
          <Col>
            <h2>Nearest Points at distance {lowestPoint} </h2>
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
            <h2>Farthest Points at distance {highestPoint}</h2>
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
