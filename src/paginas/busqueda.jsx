import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Publicaciones from "../component/publicaciones";
import Header from '../component/header';
import HeaderLogueado from '../component/headerLogueado';


const Busqueda = () => {
  const { textoBusqueda } = useParams();
  const [url, setUrl] = useState(`http://localhost:8080/archivo/buscar/${textoBusqueda}`);
  
  useEffect(() => {
    setUrl(`http://localhost:8080/archivo/buscar/${textoBusqueda}`);
  }, [textoBusqueda]);
  
  return (
    <div className="categoria">
      {
        localStorage.getItem('id') !== null ? <HeaderLogueado /> : <Header />
      }
      <h1>{textoBusqueda}</h1>
      <Publicaciones basePath={url}/>
    </div>
  );
};

export default Busqueda;