import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { LeaveCalendar, AdminPage } from "./Pages/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/LoginPage/Login/Login";
import ForgotPassPopup from "./Components/LoginPage/ForgotPass/ForgotPassPopup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/leaveapplication" element={<LeaveCalendar />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/forgotpass" element={<ForgotPassPopup />} />
        </Routes>
        <Footer />
       
      </BrowserRouter>
    </div>
  );
}

export default App;
