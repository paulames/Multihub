import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/publicaciones.css';
import Button from "../component/button";
import { useLocation } from 'react-router-dom';

const Publicaciones = ({ basePath }) => {
  const [publicaciones, setPublicaciones] = useState([]);
  const portada = process.env.PUBLIC_URL + '/assets/portadas';
  const location = useLocation();
    
  useEffect(() => {
    axios.get(basePath).then(res => {
      const data = res.data;
      if(data.status === 200){
        setPublicaciones(data.results);
      }else{
        console.log('Error');
      }
    });
  }, [basePath]);

  return(
    <div>
      <section id="publicaciones">
        {
          publicaciones.map((publicacion) => {
            return(
              <div key={publicacion.Id}>
                {
                  <img src={`${portada}/${publicacion.URL}.png`} alt={publicacion.Titulo} />
                }
                <div id="infos">
                  <h2>{publicacion.nomCategoria}</h2>
                  <div id="informacion">
                    <p>{publicacion.Titulo}</p>
                    {location.pathname === '/perfil' ? (
                      <p>{publicacion.Asignatura}</p>  
                    ) : (
                      <p>{publicacion.nomAutor}</p>
                    ) }
                    <p>{publicacion.FechaTrabajo}</p>
                    <Link to={`/detalle/${publicacion.Id}`}>
                      <Button className="btn2">Detalle</Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        }
      </section>
    </div>
  );
}

export default Publicaciones;