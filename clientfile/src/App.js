import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/HomePage";
import EditPointPage from "./components/EditPointPage";


function App() {


  return (
    <div className="App">
       <Router>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit/:id" element={<EditPointPage />} />

      </Routes>
      </Router>


    </div>
  );
}

export default App;
