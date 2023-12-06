import React, { useState } from 'react';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../imagenes/logo.png';
import './Registro.css';

function Registro() {
  const nav = useNavigate();
  const [emailExists, setEmailExists] = useState(false);

  const goToHome = () => {
    nav('/');
  };

  const registrar = (event) => {
    event.preventDefault();

    const usernameInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const confirmPasswordInput = document.querySelector('#confirmPassword');

    if (usernameInput.value === '' || emailInput.value === '' || passwordInput.value === '') {
      toast.error('Por favor, complete todos los campos', { position: 'top-right', autoClose: 4000 });
      return false;
    }

    if (!validateEmail(emailInput.value)) {
      toast.error('Ingrese una dirección de correo electrónico válida', { position: 'top-right', autoClose: 4000 });
      return false;
    }

    if (!validatePassword(passwordInput.value)) {
      toast.error(
        'La contraseña debe tener al menos 10 caracteres, incluyendo números y al menos un carácter especial',
        { position: 'top-right', autoClose: 4000 }
      );
      return false;
    }

    // Verificar si el correo electrónico ya existe en localStorage
    const existingEmail = localStorage.getItem('email');
    if (existingEmail === emailInput.value) {
      setEmailExists(true);
      toast.error('Este correo electrónico ya está registrado.', { position: 'top-right', autoClose: 4000 });
      return false;
    }

    // Guardar los datos en localStorage
    localStorage.setItem('username', usernameInput.value);
    localStorage.setItem('email', emailInput.value);
    localStorage.setItem('password', passwordInput.value);

    toast.success('Registrado correctamente', { position: 'top-right', autoClose: 4000 });
    setTimeout(() => {
      window.location.href = '/Login';
    }, 4000);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="registro">
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

      <div className="container-registro">
        <button id="goHomeButton" onClick={goToHome}>
          Inicio
        </button>
        <h1 className="hregistro">Registro de Usuario</h1>
        <form id="registrationForm" onSubmit={registrar}>
          <label className="label" htmlFor="nombre">
            Nombres y Apellidos:
          </label>
          <input className="input" type="text" id="nombre" name="nombre" required />
          <br />

          <label className="label" htmlFor="email">
            Correo Electrónico:
          </label>
          <input className="input" type="email" id="email" name="email" required />
          {emailExists && <p className="error">Este correo electrónico ya está registrado.</p>}
          <br />

          <label className="label" htmlFor="password">
            Crear Contraseña:
          </label>
          <input className="input" type="password" id="password" name="password" required />
          <br />

          <label className="label" htmlFor="confirmPassword">
            Confirmar Contraseña:
          </label>
          <input className="input" type="password" id="confirmPassword" name="confirmPassword" required />
          <br /> <br />

          <input type="submit" value="Registrarse" />
          <p>
            ¿Ya tienes una cuenta? <Link to={'/Login'}>Inicia sesión aquí</Link>
          </p>
        </form>
        <div id="error-message"></div>
      </div>

      <footer className="footer-registro">
        <p>&copy; 2023 Sistema de Gestión de Tutorías Académicas</p>
      </footer>
    </div>
  );
}

export default Registro;
