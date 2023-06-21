import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./components/home/Home";
import HoverPage from "./components/home/Hover";


function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        {/* <Route path='/' element={<Home/>}/> */}
        <Route path="/" element={<HoverPage />} />
      </Routes>
    </Router>
  );
}

export default App;
