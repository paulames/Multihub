import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Publicaciones from "../component/publicaciones";
import Header from '../component/header';
import HeaderLogueado from '../component/headerLogueado';


const Categoria = () => {
  const { categoria } = useParams();
  const [url, setUrl] = useState(`http://localhost:8080/archivo/categoria/${categoria}`);
  
  useEffect(() => {
    setUrl(`http://localhost:8080/archivo/categoria/${categoria}`);
  }, [categoria]);
  
  return (
    <div className="categoria">
      {
        localStorage.getItem('id') !== null ? <HeaderLogueado /> : <Header />
      }
      <h1>{categoria}</h1>
      <Publicaciones basePath={url}/>
    </div>
  );
};

export default Categoria;