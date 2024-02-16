import React, { useState } from 'react';
import '../App.css';
import {auth} from "../FirebaseConfig.js";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {useNavigate} from 'react-router-dom';
import { useUser } from './UserContext.js';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function SignUp() {

    //const [name,setName]=useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate();
    const {loginUser}=useUser();

    const handleTogglePassword = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSignup = async (e) => {
      e.preventDefault();
    
      const email = e.target.useremail.value;
      const password = e.target.password.value;
    
      try {
        const data = await createUserWithEmailAndPassword(auth, email, password);
        const userData = { email: data.user.email };
        loginUser(userData);
        navigate("/home");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
    
        if (errorCode === 'auth/email-already-in-use') {
          console.log(errorMessage);
          alert("This email address is already registered. Please use a different email or login.");
          navigate('/login');
        } else {
          console.error(errorMessage);
          alert("An error occurred during account creation. Please try again later.");
        }
      };
    };
    
    
  return (
    <div>
       
      <form className='container' onSubmit={handleSignup}>
      <h2>Signup here</h2>
        
        <div className='field'>
            <label htmlFor="useremail">Email</label>
            <input  type="text" value={email}  onChange={(e) => setEmail(e.target.value)}  id="useremail"/>        
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
            <input className='button' type="submit" value="Create Account"/>
        </div>
        <p className="link">
          Already have an account? <Link to="/login" className='signin'>Sign In</Link>
        </p>
      </form>
    </div>
  )
}

export default SignUp
