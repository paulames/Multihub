import React, { useState, useEffect } from 'react';
import '../css/editar-perfil.css';
import HeaderLogueado from '../component/headerLogueado';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import Button from "../component/button";
import "../css/button.css";
import axios from 'axios';

const EditarPerfil = () => {

  const nomRef = React.createRef();
  const correoRef = React.createRef();
  const pwdRef = React.createRef();

  const usuarioId = localStorage.getItem('id');
  const basePath = 'http://localhost:8080/usuario/' + usuarioId;
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({});

  const getUsuario = async () => {
    axios.get(basePath).then(res => {
      const data = res.data;
      if(data.status === 200){
        setUsuario(data.results[0]);
      }else{
        console.log('Error');
      }
    })
  }

  useEffect(() => {
    getUsuario();
  }, []);

  const editar = (event) => {
    event.preventDefault();

    var nombre = nomRef.current.value;
    var correo = correoRef.current.value;
    var pwd = pwdRef.current.value;

    var usuNuevo = {
      Nombre: nombre,
      Correo: correo,
      Contraseña: pwd,
      Id: localStorage.getItem('id')
    };

    axios.put(basePath, usuNuevo).then(res => {
      const data = res.data;
      if(data.status === 200){
        navigate('/perfil');
      } else{
        console.log('Error');
      }
    })
  }

  return (
    <div id="todo-todo">
      <HeaderLogueado />
      <div id="centrar">
        <div id="cabecera-editar-perfil">
            <h3>Datos Personales</h3>
        </div>
        <form onSubmit={editar} id="form-editar-datos-perfil">
          <label >
           NOMBRE
            <input id="input-editar-datos-perfil" type="text" name="nombre" defaultValue={usuario.Nombre} ref={nomRef} />
          </label>
          <label>
            EMAIL
            <input id="input-editar-datos-perfil" type="email" name="email" defaultValue={usuario.Correo} ref={correoRef} />
          </label>
          <label>
           CONTRASEÑA
            <input id="input-editar-datos-perfil" type="password" name="contraseña" defaultValue={usuario.Contraseña} ref={pwdRef} />
          </label>
          <div id="botoncico-editar-perfil">
              <button className="btn3" type="submit">GUARDAR</button>
          </div>
        
        </form> 
      </div>
    </div>
  );
}

export default EditarPerfil;