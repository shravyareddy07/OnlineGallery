import React, { useState } from 'react';
import '../App.css';
import { auth } from "../FirebaseConfig.js";
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useUser();

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        const userData = { email: data.user.email };
        loginUser(userData);
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
          alert("Invalid login credentials. Please check your username/email and password.");
        } else {
          console.error(errorMessage);
          alert(errorMessage);
        }

      });
  };

  return (
    <div>
      <form className='container' onSubmit={handleLogin}>
        <h2>Login</h2>

        <div className='field'>
          <label htmlFor="useremail">Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="useremail" />
        </div>

        <div className='field'>
            <label 
                htmlFor="password" 
                className="password">Password <a href="/reset">Forgot?</a>
            </label>
            <div style={{ position: 'relative' }}>
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} id="password" />
            <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={handleTogglePassword}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>       
        </div>

        <div className='form-button'>
          <input className='button' type="submit" value="Login" />
        </div>

        <p className="link">
          Dont have an account? <Link to="/" className='signin'>Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
