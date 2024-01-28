import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login'; 
import Signup from './containers/Signup';
import ResetPassword from './containers/ResetPassword';
import Activate from './containers/Activate';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Navbar from './components/Navbar';
import PrivateRoute from './containers/PrivateRoute';
import GenerateOtp from './containers/GenerateOtp';
import VerifyOtp from './containers/VerifyOtp';
import ForgotPassword from './containers/ForgotPassword';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/password/reset/confirm" element={<ResetPasswordConfirm />} />
          <Route path="/generateotp" element={<GenerateOtp />} />
          <Route path="/verifyotp" element={<VerifyOtp/>} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/activate/:uid/:token" element={<Activate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
