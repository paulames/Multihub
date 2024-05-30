import React from "react";
import DownloadButton from "../component/descargar.jsx";
import Header from '../component/header.jsx';
import HeaderLogueado from '../component/headerLogueado.jsx';
import Button from "../component/button.jsx";
import "../css/button.css";
import "../css/detalle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import LikeButton from "../component/LikeButton.jsx";
import ValoracionButton from "../component/valoracionButton.jsx";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'; 


const Detalle = () => {
    const id = useParams().id;
    const basePath = 'http://localhost:8080/archivo/' + id;
    const urlArchivo = process.env.PUBLIC_URL + '/assets/archivos';

    const [publicacion, setPublicacion] = useState([]);

    useEffect(() => {
        axios.get(basePath).then(res => {
            const data = res.data;
            if(data.status === 200){
                setPublicacion(data.results);
            }else{
                console.log('Error');
            }
        });
    }, [basePath]);

    function vistaPrevia(url) {
        const pdfUrl = url;
        const width = 600;
        const height = 800;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        const options = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=${width}, height=${height}, top=${top}, left=${left}`;
      
        window.open(pdfUrl, 'Vista Previa del PDF', options);
    }

    return(
        <>
            {localStorage.getItem('id') !== null ? <HeaderLogueado /> : <Header />}
            {publicacion.map((item) => {
                let src = '';
                if (item.Tipo === 'PDF') {
                    src = `${urlArchivo}/${item.URL}.pdf`;
                } else if (item.Tipo === 'Video') {
                    src = `${urlArchivo}/${item.URL}.mp4`;
                }
                return (
                    <div id="todoEditar" key={item.Id}>
                        <div id="incluido">
                            <div id="pdf">
                                <iframe src={src} width="600" height="315" title={item.Titulo}></iframe>
                            </div>
                            <div id="descripcionPublicacion">
                                <h4 id="pdf2">{item.nomCategoria}</h4>
                                <div id="titulo-y-editar">
                                    <h1 id="h1-detalle">{item.Titulo}</h1>
                                    {Number(localStorage.getItem('id')) === item.Autor && (
                                        <div className="icono-circulo">
                                            <Link to={`/editar-publicacion/${item.Id}`}>
                                                <strong> EDITAR </strong> 
                                                <FontAwesomeIcon icon={faPencilAlt} />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                <p id="p-detalle"><b>Autor: </b>{item.nomAutor}</p>
                                <div id="texto-descripcion">
                                    <p>{item.Descripcion}</p>
                                </div>
                            </div>
                            <div id="valoracion">
                                <div id="valoraciones">
                                    <p>Valoración: </p>
                                    <ValoracionButton />
                                </div>
                                <LikeButton />
                            </div>
                            <div id="botones">
                                {(item.Tipo !== 'Audio' && item.Tipo !== 'Video') ?
                                    <Button className="btn2" onClick={()=>vistaPrevia(src)}>VISTA PREVIA</Button> : null  
                                }
                                <DownloadButton content={src} fileName={item.Titulo} fileType="application/pdf" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );

}

export default Detalle;

