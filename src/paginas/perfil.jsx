import React, { useState, useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import HeaderLogueado from '../component/headerLogueado';
import '../css/perfil.css';
import Publicaciones from '../component/publicaciones';
import axios from 'axios';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/imagenes/avatar.png';
import { FiLogOut } from 'react-icons/fi';

const Perfil = () => {
  const basePath = 'http://localhost:8080/usuario';
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({});
  const [redirect, setRedirect] = useState(false);

  const getUsuario = async () => {
    let usuarioId = localStorage.getItem('id');
    axios.get(basePath + '/' + usuarioId).then(res => {
      const data = res.data;
      if(data.status === 200){
        setUsuario(data.results[0]);
      }else{
        console.log('Error');
      }
    })
  }

  useEffect(() => {
    const usuarioId = localStorage.getItem('id');
    if (!usuarioId) {
      setRedirect(true);
    } else {
      getUsuario();
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('id');
    navigate('/');
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return(
    <div>
      <HeaderLogueado/>
      <div className="cabecera">
        <img src={avatar} alt="Foto del alumno" className="foto-alumno" />
        <div className="info-alumno">
          <h2 id="perfil">{usuario.Nombre}</h2>
          <p>{usuario.Estudios}</p>
        </div>
        <Link to="/editar-perfil">
          <FiSettings className="icono-ajustes" />
        </Link>
        <div  className="cerrar-sesion" onClick={cerrarSesion}>
          {/* <a id="a-cerrar"> */}
            <FiLogOut id="salir"/>
          {/* </a> */}
        </div>
      </div>
      <Publicaciones basePath={`http://localhost:8080/archivo/autor/${localStorage.getItem('id')}`}/>
    </div>
  );
}

export default Perfil;

// export default class  Perfil extends Component{

//   basePath = 'http://localhost:8080/usuario';

//   state = {
//     usuario: {},
//     redirect: false
//   };

//   navigate = useNavigate();

//   redirect = false;

//   getUsuario = async () => {
//     let usuarioId = localStorage.getItem('id');
//     axios.get(this.basePath + '/' + usuarioId).then(res => {
//       const data = res.data;
//       if(data.status === 200){
//         this.setState({ usuario: data.results[0] });
//       }else{
//         console.log('Error');
//       }
//     })
//   }

//   componentDidMount() {
//     const usuarioId = localStorage.getItem('id');
//     if (!usuarioId) {
//       this.setState({ redirect: true });
//     } else {
//       this.getUsuario();
//     }
//   }

//   cerrarSesion = () => {
//     localStorage.removeItem('id');
//     this.navigate('/');
// };

//   render(){
//     if (this.state.redirect) {
//       return <Navigate to="/" />;
//     }

//     return(
//       <div>
//         <HeaderLogueado/>
//         <div className="cabecera">
//           <img src={avatar} alt="Foto del alumno" className="foto-alumno" />
//           <div className="info-alumno">
//             <h2 id="perfil">{this.state.usuario.Nombre}</h2>
//             <p>{this.state.usuario.Correo}</p>
//           </div>
//           <Link to="/editar-perfil">
//             <FiSettings className="icono-ajustes" />
//           </Link>
//           <div  className="cerrar-sesion" onClick={this.cerrarSesion}>
//             <a id="a-cerrar">
//               <FiLogOut id="salir"/>
//             </a>
//           </div>
//         </div>
//         <Publicaciones basePath={`http://localhost:8080/archivo/autor/${localStorage.getItem('id')}`}/>
//       </div>
//     );
//   }

// }