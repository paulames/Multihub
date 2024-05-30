import { Navigate, Link } from 'react-router-dom';
import React, { Component } from 'react';
import logo from '../img/logoua.png';
import '../css/login.module.css';
import axios from 'axios';



export default class Login extends Component{
  basePath = 'http://localhost:8080/usuario/login';

  emailRef = React.createRef();
  pwdRef = React.createRef();

  state = {status: false}

  login = (e) => {
    e.preventDefault();

    var usu = this.emailRef.current.value;
    var pwd = this.pwdRef.current.value;

    var login = {
      Correo: usu,
      Contraseña: pwd
    };

    axios.post(this.basePath, login).then(res => {
      const data = res.data;
      if(data.status === 200){
        localStorage.setItem('id', data.results[0].Id);
        this.setState({status: true});
      } else if(data.status === 401){
        const html = document.getElementById('mensaje');
        html.innerHTML = '<p style="color:red;">Datos incorrectos, por favor comprueba tu email o la contraseña</p>';
        this.emailRef.current.value = '';
        this.pwdRef.current.value = '';
      }else{
        console.log('Error');
      }
    })
  };

  render(){
    if(this.state.status === true){
      return <Navigate to="/" />;
    }
    return (
      <div className="login-page">
        <div id="login-container">
          <img src={logo} alt="Logo" className="logo" />
          <h3 style={{marginLeft: "0px", color:'black'}} >Iniciar sesión</h3>
          <p id='mensaje'></p>
          <form onSubmit={this.login}>
            <div>
              <label htmlFor="email" style={{marginLeft: "0px", color:'black'}}>Email</label>
              <input type="email" id="email" required ref={this.emailRef} style={{marginLeft: "0px"}}/>
            </div>
            <div>
              <label htmlFor="password" style={{marginLeft: "0px", color:'black'}}>Contraseña</label>
              <input type="password" id="password" required ref={this.pwdRef} style={{marginLeft: "0px"}}/>
            </div>
            <button className="btn-3" type="submit">Iniciar sesión</button>
            <div>
              <p>¿Todavía no tienes cuenta? <Link to="/registro"><u><b>Regístrate</b></u></Link> </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
};
