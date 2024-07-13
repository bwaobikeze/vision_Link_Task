import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";

function EditPointPage() {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const { name, setname } = useState("");
    const { x, setx } = useState("");
    const { y, sety } = useState("");
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/${id}`)
        .then((res) => {
            setData(res.data);
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);
    return (
        <div className="App">
        <header>
            <h1>Edit Point</h1>
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
                        <tr key={point.id}>
                            <td>{point.name}</td>
                            <td>{point.x}</td>
                            <td>{point.y}</td>
                        </tr>
                    ))}
                </tbody>
                </Table>
        </div>
    );

}
export default EditPointPage;