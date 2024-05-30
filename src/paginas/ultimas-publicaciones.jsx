import HeaderLogueado from '../component/headerLogueado';
import Publicaciones from "../component/publicaciones";
import Header from '../component/header';
import React from 'react';

function UltimasPublicaciones() {
  const id = localStorage.getItem('id');
  return (
    <div>
      {
        !id ? <Header /> : <HeaderLogueado />
      }
      <h1>Últimas Publicaciones</h1>
      <Publicaciones basePath="http://localhost:8080/recientes" />
    </div>
  );
}

export default UltimasPublicaciones;