import { sendPasswordResetEmail } from 'firebase/auth';
import React from 'react';
import { auth } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Link } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const emailVal = e.target.useremail.value;

    try {
     sendPasswordResetEmail(auth, emailVal);
      alert('Check your email to reset your password');
      navigate('/login');
    } catch (error) {
      console.error(error);
      

      if (error.code === 'auth/user-not-found') {
        alert('User with this email does not exist.');
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div>
      <form className="container" onSubmit={handleClick}>
        <h3>Enter your email to reset your password</h3>
        <div className="field">
          <label htmlFor="useremail">Email</label>
          <input type="text" id="useremail" />
        </div>

        <div className="form-button">
          <input className="button" type="submit" value="Reset Password" />
        </div>
        
        <p className="link">
          Remember your password? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default ResetPassword;
