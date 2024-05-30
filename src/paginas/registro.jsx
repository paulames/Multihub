import { Navigate, Link } from 'react-router-dom';
import React, { Component } from 'react';
import logo from '../img/logoua.png';
import '../css/registro.css';
import axios from 'axios';

export default class Registro extends Component{
  basePath = 'http://localhost:8080/usuario';

  nombreRef = React.createRef();
  emailRef = React.createRef();
  pwdRef = React.createRef();
  pwd2Ref = React.createRef();
  estudiosRef = React.createRef();
  rolRef = React.createRef();

  state = {status: false, rol: ''}

  registro = (e) => {
    e.preventDefault();

    var nom = this.nombreRef.current.value;
    var usu = this.emailRef.current.value;
    var pwd = this.pwdRef.current.value;
    var pwd2 = this.pwd2Ref.current.value;
    var estudios = this.estudiosRef.current.value;
    var rol = this.state.rol;

    if(pwd === pwd2){
      var registro = {
        Nombre: nom,
        Correo: usu,
        Contraseña: pwd,
        Estudios: estudios,
        Rol: rol
      };

      axios.post(this.basePath, registro).then(res => {
        const data = res.data;
        if(data.status === 200){
          this.setState({status: true});
        }else if(data.status === 401) {
          this.nombreRef.current.value = '';
          this.emailRef.current.value = '';
          this.pwdRef.current.value = '';
          this.pwd2Ref.current.value = '';
          this.setState({ rol: '' });
        }else{
          console.log('Error');
        }
      });
    }else{
      this.pwdRef.current.value = '';
      this.pwd2Ref.current.value = '';
    }
  };

  handleRoleChange = (e) => {
    this.setState({ rol: e.target.value });
  }

  render(){
    if(this.state.status === true){
      return <Navigate to="/login" />;
    }

    return (
      <div className="login-page">
        <div id="login-container">
          <img src={logo} alt="Logo" className="logo" />
          <h3 style={{marginLeft: "0px", color:'black'}}>Registro</h3>
          <form onSubmit={this.registro}>
            <div>
              <label htmlFor="nombre" style={{marginLeft: "0px", color:'black'}}>Nombre</label>
              <input type="text" id="nombre" required ref={this.nombreRef} style={{marginLeft: "0px"}}/>
            </div>
            <div>
              <label htmlFor="email" style={{marginLeft: "0px", color:'black'}}>Email</label>
              <input type="email" id="email" required ref={this.emailRef} style={{marginLeft: "0px"}}/>
            </div>
            <div>
              <label htmlFor="password" style={{marginLeft: "0px", color:'black'}}>Contraseña</label>
              <input type="password" id="password" required ref={this.pwdRef} style={{marginLeft: "0px"}}/>
            </div>
            <div>
              <label htmlFor="password2" style={{marginLeft: "0px", color:'black'}}>Repetir contraseña</label>
              <input type="password" id="password2" required ref={this.pwd2Ref} style={{marginLeft: "0px"}}/>
            </div>
            <div>
              <label htmlFor="estudios" style={{marginLeft: "0px", color:'black'}}>Grado/Master</label>
              <input type="text" id="estudios" required ref={this.estudiosRef} style={{marginLeft: "0px"}}/>
            </div>
            <div id="checkboxes">
               <label><input type="radio" name="rol" id="rolAlumno" value="Alumno" onChange={this.handleRoleChange} checked={this.state.rol === 'Alumno'}/> Alumno </label> 
               <label> <input type="radio" name="rol" id="rolProfesor" value="Profesor" onChange={this.handleRoleChange} checked={this.state.rol === 'Profesor'}/> Profesor </label> 
            </div>
            <button className="btn-3" type="submit">Registrarse</button>
            <div>
              <p>¿Ya tienes cuenta? <Link to="/login"><u><b>Iniciar sesión</b></u></Link></p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}