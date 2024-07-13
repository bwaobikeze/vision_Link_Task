import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>{data.message}</h1>
      </header>
    </div>
  );
}

export default App;
