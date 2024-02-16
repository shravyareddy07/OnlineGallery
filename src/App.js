// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Routes>
            <Route path='/' element={<SignUp />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/reset' element={<ResetPassword />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
