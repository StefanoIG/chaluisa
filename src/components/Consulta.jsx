import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../imagenes/logo.png';
import './Consulta.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const students = [
  {
    id: 1,
    name: "Roberth",
    subjects: [
      { name: "Metodos Numericos", date: "2023-10-20", time: "10:00 AM" },
      { name: "Aplicación Web1", date: "2023-10-22", time: "2:00 PM" }
    ]
  },
  {
    id: 2,
    name: "Luis",
    subjects: [
      { name: "Redes de Computadoras", date: "2023-10-21", time: "11:30 AM" },
      { name: "Interfaces Multimedia", date: "2023-10-24", time: "3:30 PM" }
    ]
  },
  {
    id: 3,
    name: "Alejandro",
    subjects: [
      { name: "Ingeniería de Software1", date: "2023-10-19", time: "9:00 AM" },
      { name: "Ingles", date: "2023-10-23", time: "1:00 PM" }
    ]
  }
];

const Consulta = () => {
  const nav = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentCode, setStudentCode] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [infoResult, setInfoResult] = useState('');

  const showStudentInfo = (type) => {
    let studentId;
    if (type === 'individual') {
      studentId = studentCode;
    } else {
      studentId = selectedStudent;
    }

    const student = students.find((s) => s.id === parseInt(studentId));

    if (student) {
      let result = `<h3>Nombre del estudiante:</h3>${student.name}<br><br>`;
      result += '<h3>Información de tutorías:</h3>';

      student.subjects.forEach((subject) => {
        result += `<b>Materia:</b> ${subject.name}<br>`;
        result += `<b>Fecha:</b> ${subject.date}<br>`;
        result += `<b>Hora:</b> ${subject.time}<br><br>`;
      });

      setInfoResult(result);
    } else {
      setInfoResult('Estudiante no encontrado.');
    }
  };

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  const checkIsLoggedIn = () => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    setIsLoggedIn(!!(storedEmail && storedPassword));
  };

  const handleConsultGeneral = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes iniciar sesión antes de consultar la información.',
        timer: 3000, // Duración en milisegundos (3 segundos en este ejemplo)
        showConfirmButton: false, // Oculta el botón "OK"
      });
      return;
    }
    showStudentInfo('general');
  };

  const handleConsultIndividual = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes iniciar sesión antes de consultar la información.',
        timer: 3000, // Duración en milisegundos (3 segundos en este ejemplo)
        showConfirmButton: false, // Oculta el botón "OK"
      });
      return;
    }
    showStudentInfo('individual');
  };

  return (
    <div className='consulta'>
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
            <li><a href="/" onClick={() => {localStorage.clear(); nav('/');}}>Desconectarse</a></li>
          ) : (
            <>
              <li><Link to={'/Login'}>Iniciar Sesión</Link></li>
              <li><Link to={'/Registro'}>Registrarse</Link></li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li><Link to={'/Principal'}>Solicitar Tutoría</Link></li>
            </>
          )}
        </ul>
      </nav>
      <h1>Consulta de Tutorías Académicas</h1>

      <div id="general-info">
        <h2>Información General</h2>
        <p>Seleccione un estudiante:</p>
        <select id="student-list" onChange={(e) => setSelectedStudent(e.target.value)}>
          <option value="">Seleccionar estudiante</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
        <button onClick={handleConsultGeneral}>Consultar</button>
        {selectedStudent && (
          <div id="general-info-result">
            <h3>Información del estudiante:</h3>
            <p><strong>Nombre:</strong> {students.find((student) => student.id === parseInt(selectedStudent)).name}</p>
            <h3>Información de tutorías:</h3>
            {students.find((student) => student.id === parseInt(selectedStudent)).subjects.map((subject, index) => (
              <div key={index}>
                <p><strong>Materia:</strong> {subject.name}</p>
                <p><strong>Fecha:</strong> {subject.date}</p>
                <p><strong>Hora:</strong> {subject.time}</p>
                {index < students.find((student) => student.id === parseInt(selectedStudent)).subjects.length - 1 && <hr />}
              </div>
            ))}
          </div>
        )}
      </div>

      <div id="individual-info">
        <h2>Información Individual</h2>
        <p>Ingrese el código del estudiante:</p>
        <input
          type="text"
          id="student-code"
          value={studentCode}
          onChange={(e) => setStudentCode(e.target.value)}
        />
        <button onClick={handleConsultIndividual}>Consultar</button>
        <div id="individual-info-result" dangerouslySetInnerHTML={{ __html: infoResult }}></div>
      </div>
      <footer>
        <p>&copy; 2023 Sistema de Gestión de Tutorías Académicas</p>
      </footer>
    </div>
  );
};

export default Consulta;
