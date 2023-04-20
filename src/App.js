import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavbar from "./layout/MyNavbar";
import HomePage from "./components/commonPages/HomePage";
import Login from "./components/commonPages/Login";
import About from "./components/commonPages/About";
import Contact from "./components/commonPages/Contact";
import AdminPages from "./Pages/admin/AdminPages";
import MentorPages from "./Pages/mentor/MentorPages";
import StudentPages from "./Pages/student/StudentPages";
import Footer from "./layout/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyNavbar />
        <div className="route-container">
          <Routes>
            <Route path="home" element={<HomePage />} />
            <Route path="/" exact element={<About />} />
            <Route path="contact" element={<Contact />} />
            {/* <Route path="login" element={<Login />} /> */}
            <Route path="admin" element={<AdminPages />} />
            <Route path="mentor" element={<MentorPages />} />
            <Route path="student" element={<StudentPages />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
