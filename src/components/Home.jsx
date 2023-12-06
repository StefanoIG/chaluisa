import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import imagenprincipal from '../imagenes/imagenprincipal.png';
import tutor from '../imagenes/tutor.jpg';
import toturia from '../imagenes/toturia.jpg';
import logo from '../imagenes/logo.png';
import './Home.css';

const Home = () => {
    const nav = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        checkIsLoggedIn();
      }, []);
    
      const checkIsLoggedIn = () => {
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');
        setIsLoggedIn(!!(storedEmail && storedPassword));
      };
      function logout(event) {
        event.preventDefault();
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        setIsLoggedIn(false);
        nav('/');
      }
  return (
    <>
      <div className='home'>
        <header>
          <Link to={'/'} className="logo">
            <img src={logo} alt="Logo" />
          </Link>
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
          <section>
            <div className="contenedor-imagen"></div>
            <img src={imagenprincipal} alt="Lo que ofrecemos" className="principal" />
            <div className="capa-oscura"></div>
          </section>

          <br />
          <br />
          <br />

          <section>
            <ul className="lista">
              <div className="contenedor-queofrecemos"></div>
              <li>
                <img src={tutor} alt="Tutor" />
                <h3>¿Qué ofrecemos?</h3>
                <p>
                  El Sistema de Gestión de Tutorías Académicas le permite gestionar sus tutorías de manera eficiente.
                  Puede programar sesiones, encontrar tutores y más.
                </p>
              </li>
              <br />
              <div className="contenedor-pqelegirnos"></div>
              <li>
                <img src={toturia} alt="tutoria" />
                <h3>¿Por qué elegirnos?</h3>
                <p>
                  Nuestro sistema le brinda una solución completa para la gestión de tutorías. ¡Regístrese hoy mismo y
                  descubra todas las ventajas que ofrecemos!
                </p>
              </li>
            </ul>
          </section>
          <br />
          <br />
        </main>

        <footer>
          <p className="copy">&copy; 2023 Sistema de Gestión de Tutorías Académicas</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
