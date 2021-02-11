import React from "react";
import validator from 'validator';


import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch,useSelector } from "react-redux";
import { setError,RemoveError} from "../../actions/ui"
import { startWithNamePasswordEmail } from "../../actions/auth";


export default function RegisterScreen() {

  const {msgError} =useSelector(select=>  select.ui ) //seleccionar las acciones del redux
 

  const dispatch = useDispatch(); //dispara un accion , hook de redux
  
  const [Form,handleInputChange] = useForm( {
      name:'Felipe',
      email:'duvanli@hotmail.es',
      password:'felipe123',
      password2:'felipe123'
  });

  const {name,email,password,password2} =Form;

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (FormValid()){

      dispatch(startWithNamePasswordEmail( email, password, name));
      console.log('Formulario Correcto')

    }
  }

  const FormValid = () => {

    if(name.trim().length===0)
    {
     dispatch( setError('Ingrese un nombre'));
     return false
   }else if (!validator.isEmail(email)){
    dispatch( setError('Ingrese un Email'));
    return false;
  }
   else if (password !== password2 || password <=5 )
  {
    dispatch( setError('Contraseñas no Coinciden, Contraseña con mas de 5 caracteres'));
    return false;
  }
    
    dispatch(RemoveError());
    return true;
  }
 

  return (
    <>
      <h3 className="auth__title">Register</h3>

      {
        
        (msgError!==null)&&  
         <span className='auth__alert-error'>{msgError} </span>

      }

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
       

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
}
