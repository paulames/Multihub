import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import SearchingBar from './searchingBar';
import logo from '../img/logouapeque.png';
import "../css/headerLogueado.css";
import axios from 'axios';


const basePath = 'http://localhost:8080/';

export default function HeaderLogueado() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getCategorias();
    getUsuario();
  }, []);

  const getCategorias = async () => {
    let url = basePath + 'categoria';
    axios.get(url).then(res => {
      const data = res.data;
      if(data.status === 200){
        setCategorias(data.results);
      }else{
        console.log('Error');
      }
    });
  }

  const getUsuario = async () => {
    let id = localStorage.getItem('id');
    let url = basePath + 'usuario/' + id;
    axios.get(url).then(res => {
      const data = res.data;
      if(data.status === 200){
        setNombre(data.results[0].Nombre);
      }else{
        console.log('Error');
      }
    });
  }

  const elegirCategoria = (event) => {
    const categoriaNombre = event.target.value;
    if(categoriaNombre === 'CATEGORIAS'){
      navigate(`/`);
    }else{
      navigate(`/categoria/${categoriaNombre}`);
    }
  }

  return(
    <header>
      <label htmlFor="menu_hamburguesa" id="icono_menu">☰</label>
      <input type="checkbox" id="menu_hamburguesa" />
      <div id='todo'>
        <div id='logo'>
          <img src={logo} alt="Logotipo de la empresa" className="logo" />
        </div>
        <SearchingBar />
        <aside id= "elementos">
          <nav>
            <ul>
              <li><Link to="/">INICIO</Link></li>
              <li><Link to="/ultimas-publicaciones">ÚLTIMAS PUBLICACIONES</Link></li>
              <li>
                <select id="categorias" onChange={elegirCategoria}>
                  {
                    categorias.map((categoria) => {
                      return(
                        <option key={categoria.Id} value={categoria.Nombre}>{categoria.Nombre}</option>
                      ) 
                    })
                  }
                </select>
              </li>
              <li><Link to="/publicar">PUBLICAR</Link></li>
              <li><Link to="/perfil">{nombre}</Link></li>
            </ul>
          </nav>
        </aside>
      </div>
    </header>
  )
}
