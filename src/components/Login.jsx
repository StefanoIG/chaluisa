import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../imagenes/logo.png';
import './Login.css';
import Swal from 'sweetalert2';

function Login() {
  const nav = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const submitForm = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    if (email.trim() === '' || password.trim() === '') {
      setErrorMessage('Por favor, ingresa el correo y la contraseña.');
      return;
    }
  
    // Verificar las credenciales en localStorage
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
  
    if (email === storedEmail && password === storedPassword) {
        // Autenticación exitosa
        setIsLoggedIn(true);
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: '¡Bienvenido!',
        }).then(() => {
          // Redirigir al componente Principal
          nav('/Principal');
        });
    } else {
      setErrorMessage('Correo o contraseña incorrectos.');
    }
  };
  

  const goToHome = () => {
    nav('/');
  };

  return (
    <div className="login">
      <header>
        <a href="#" className="logo">
          <img src={logo} alt="Logo" />
        </a>
        <h1 className="bienvenido">
          <strong>
            <em>Sistema de Gestión de Tutorías Académicas</em>
          </strong>
        </h1>
        <br />
      </header>

      <nav>
        <ul></ul>
      </nav>

      <div className="container">
        <div className="form-content">
          <button id="goHomeButton" onClick={goToHome}>
            Inicio
          </button>
          <h1 id="tittle" className="tittle">
            Iniciar sesión
          </h1>
          <form id="login-form">
            <div className="input-group">
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" id="email" placeholder="Correo" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" id="password" placeholder="Contraseña" />
              </div>
            </div>
            <div className="btn-field">
              <button id="signIn" className="center-button" type="button" onClick={submitForm}>
                Iniciar sesión
              </button>
            </div>
            <br />
            <p>
              ¿No tienes cuenta? <Link to={'/Registro'}>Regístrate aquí</Link>
            </p>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>

      <footer>
        <p>&copy; 2023 Sistema de Gestión de Tutorías Académicas</p>
      </footer>
    </div>
  );
}

export default Login;
