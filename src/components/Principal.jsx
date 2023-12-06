import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../imagenes/logo.png';
import './Principal.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

function Principal() {
  const nav = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nombre, setNombre] = useState('');
  const [materia, setMateria] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const validateForm = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes iniciar sesión antes de solicitar una tutoría.',
        timer: 3000, // Duración en milisegundos (3 segundos en este ejemplo)
        showConfirmButton: false, // Oculta el botón "OK"
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  const checkIsLoggedIn = () => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    setIsLoggedIn(!!(storedEmail && storedPassword));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nombre || !materia || !fecha || !hora) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos solicitados.',
      });
      return;
    }

    const horaAMPM = convertirHoraAMPM(hora);

    const solicitudTutoria = `
      <strong>Nombre:</strong> ${nombre}<br>
      <strong>Materia:</strong> ${materia}<br>
      <strong>Fecha:</strong> ${fecha}<br>
      <strong>Hora:</strong> ${horaAMPM}
    `;

    // Obtén la lista actual de tutorías pendientes del localStorage
    const tutoriasPendientes = JSON.parse(localStorage.getItem('tutoriasPendientes')) || [];

    // Agrega la nueva solicitud a la lista
    tutoriasPendientes.push(solicitudTutoria);

    // Guarda la lista actualizada en el localStorage
    localStorage.setItem('tutoriasPendientes', JSON.stringify(tutoriasPendientes));

    // Limpia el formulario
    setNombre('');
    setMateria('');
    setFecha('');
    setHora('');

    // Muestra la alerta de éxito
    Swal.fire({
      icon: 'success',
      title: 'Solicitud Enviada',
      text: 'La solicitud de tutoría se ha enviado correctamente.',
    });
  };

  const convertirHoraAMPM = (hora24) => {
    const [hora, minutos] = hora24.split(':');
    let ampm = 'AM';
    let horaNum = parseInt(hora, 10);

    if (horaNum >= 12) {
      ampm = 'PM';
      if (horaNum > 12) {
        horaNum -= 12;
      }
    }

    if (horaNum === 0) {
      horaNum = 12;
    }

    return `${horaNum}:${minutos} ${ampm}`;
  };

  function logout(event) {
    event.preventDefault();
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    setIsLoggedIn(false);
    nav('/');
  }

  return (
    <div className='pprincipal'>
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
        <ul>
          <li><Link to={'/'}>Inicio</Link></li>
          {isLoggedIn ? (
            <li><a href="/" onClick={logout}>Desconectarse</a></li>
          ) : (
            <>
              <li><Link to={'/Login'}>Iniciar Sesión</Link></li>
              <li><Link to={'/Registro'}>Registrarse</Link></li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li><Link to={'/Principal'}>Tutorías</Link></li>
              <li><Link to={'/Consulta'}>Consulta de Tutorías</Link></li>
            </>
          )}
        </ul>
      </nav>

      <main>
        <section id="formulario">
          <h2>Solicitar una tutoría</h2>
          <form onSubmit={(e) => {
            e.preventDefault(); // Evita que el formulario se envíe automáticamente
            if (validateForm()) {
              handleSubmit(e);
            }
          }}>
            <label htmlFor="nombre">Nombre Tutor:</label>
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

            <label htmlFor="materia">Materia:</label>
            <input type="text" id="materia" value={materia} onChange={(e) => setMateria(e.target.value)} required />

            <label htmlFor="fecha">Fecha:</label>
            <input type="date" id="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} required />

            <label htmlFor="hora">Hora:</label>
            <input type="time" id="hora" value={hora} onChange={(e) => setHora(e.target.value)} required />

            <button type="submit">Solicitar Tutoría</button>
          </form>
        </section>

        <section id="tutorias-pendientes">
          <h2>Tutorías Pendientes</h2>
          <ul id="tutorias-list">
            {localStorage.getItem('tutoriasPendientes') ? (
              JSON.parse(localStorage.getItem('tutoriasPendientes')).map((tutoria, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: tutoria }}></li>
              ))
            ) : (
              <p>No hay tutorías pendientes.</p>
            )}
          </ul>
        </section>
      </main>
      <br />
      <br />
      <br />
      <footer>
        <p>&copy; 2023 Sistema de Gestión de Tutorías Académicas</p>
      </footer>
    </div>
  );
}

export default Principal;
