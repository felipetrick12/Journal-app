import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import {useDispatch, useSelector} from 'react-redux';
import  {login, loginWithEmailPassword, startWithGoogle}  from "../../actions/auth";

export default function LoginScreen() {

  const dispatch = useDispatch();
  const {loading}= useSelector(select=> select.ui)
  
  
  const [Form,handleInputChange] = useForm( {
      email:'duvanli@hotmail.es',
      password:'felipe123'
  });

  const {email,password} =Form;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginWithEmailPassword(email,password));
  }
  const handleGoogle = () => {
      dispatch(startWithGoogle());
  }

  return (
    <div>
      <h1 className='auth__title'>Login</h1>

      <form onSubmit={handleLogin}>
        <input 
        type="text" 
        placeholder="email" 
        name="email"
        className='auth__input'
        value={email}
        onChange={handleInputChange}
         />

        <input 
        type="password" 
        placeholder="password" 
        name="password"
        className='auth__input' 
        value={password}
        onChange={handleInputChange}     
         />

        <button 
        type="submit"
        className='btn btn-primary btn-block'
        disabled={loading}
        >
          Login
        </button>

        <Link className='link' to="/auth/register" >
              Create new account
        </Link>
        

        <hr />

        <div>
          <p className='auth__social-networks'>Login with social networks</p>

          <div className="google-btn"  onClick={handleGoogle}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
       
      </form>
    </div>
  );
}
