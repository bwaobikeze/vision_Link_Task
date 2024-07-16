
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/HomePage";
import EditPointPage from "./components/EditPointPage";
import AddNewPoint from "./components/AddNewPoint";


function App() {
  return (
    <div className="App">
       <Router>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit/:id" element={<EditPointPage />} />
          <Route path="/edit" element={<AddNewPoint />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
