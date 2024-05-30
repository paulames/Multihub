import React, { useState, useEffect } from 'react';
import ToggleComponent from "../component/toggleComponent.jsx";
import HeaderLogueado from '../component/headerLogueado';
import { useParams, useNavigate } from "react-router-dom";
import "../css/editar-publicacion.css";
import Button from "../component/button";
import axios from 'axios';

const EditarPublicacion = () => {
    const tituloRef = React.createRef();
    const asignaturaRef = React.createRef();
    const fechaRef = React.createRef();
    const descRef = React.createRef();
    const tipoRef = React.createRef();
    const catRef = React.createRef();
    const fileRef = React.createRef();

    const archivoId = useParams().id;
    const basePath = 'http://localhost:8080/archivo/' + archivoId;

    const navigate = useNavigate();
    const [publicacion, setPublicacion] = useState({});
    const [showModal, setShowModal] = useState(false);

    
    const getPublicacion = async () => {
        axios.get(basePath).then(res => {
            const data = res.data;
            if(data.status === 200){
                const publicacion = data.results[0];
                const fechaOriginal = publicacion.FechaTrabajo;
                const partes = fechaOriginal.split('-');
                publicacion.FechaTrabajo = `${partes[2]}-${partes[1]}-${partes[0]}`;
                setPublicacion(data.results[0]);
            }else{
                console.log('Error');
            }
        });
    }
    
    useEffect(() => {
        getPublicacion();
      }, []);

    const editar = (e) => {
        e.preventDefault();

        var titulo = tituloRef.current.value;
        var asignatura = asignaturaRef.current.value;
        var desc = descRef.current.value;
        var tipo = tipoRef.current.value;
        var cat = catRef.current.value;
        var fecha = fechaRef.current.value;
        var fichero = fileRef.current.files[0];

        var archivo = {
            Titulo: titulo,
            Autor: localStorage.getItem('id'),
            Asignatura: asignatura,
            Descripcion: desc,
            FechaTrabajo: fecha,
            Tipo: tipo,
            Categoria: cat
        };

        if (fichero) {
            archivo.URL = fichero.name.split('.')[0];
        }

        axios.put(basePath, archivo).then(res => {
            const data = res.data;
            if(data.status === 200){
                navigate(`/detalle/${archivoId}`);
            }else{
                console.log('Error');
            }
        });
    }

    function Modal() {
        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                    <p>Archivo actualizado correctamente</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <HeaderLogueado/>
            <form onSubmit={editar} style={{marginLeft: "60px"}} >
                <div id="cabecera-editar-publi">
                    <h2 id="h2-editar-publicar">Editar Publicación</h2>
                </div>
                <div className="editar-publicacion">
                    <div className="datos-editar">
                        <div id="titulo">
                            <label htmlFor="titulo">TÍTULO</label>
                            <input type="text" id="titulo" name="titulo" defaultValue={publicacion.Titulo} ref={tituloRef} style={{width: "60%"}}/>
                        </div>
                        <div id="asignatura">
                            <label htmlFor="titulo">ASIGNATURA</label>
                            <input type="text" id="asignatura" name="asignatura" defaultValue={publicacion.Asignatura} ref={asignaturaRef} style={{width: "60%"}}/>
                        </div>
                        <div id="fecha">
                            <label htmlFor="fecha">FECHA (Fecha de Trabajo)</label>
                            <input type="date" id="fecha" name="fecha" defaultValue={publicacion.FechaTrabajo} ref={fechaRef} style={{width: "60%"}}  />
                        </div>
                        <div id="descripcion">
                            <label htmlFor="decripcion">DESCRIPCIÓN</label>
                            <textarea type="text" id="textarea" name="decripcion" defaultValue={publicacion.Descripcion} ref={descRef} style={{width: "60%"}} />
                        </div>
                        <div id="categoria">
                            <label htmlFor="tipo">TIPO </label>
                            <select ref={tipoRef} value={publicacion.Tipo} onChange={e => setPublicacion({...publicacion, Tipo: e.target.value})}>
                                <option value="Audio">Audio</option>
                                <option value="PDF">PDF</option>
                                <option value="Video">Video</option>
                            </select>
                        </div>
                        <div id="categoria">
                            <label htmlFor="categoria">CATEGORÍA </label>
                            <select ref={catRef} value={publicacion.Categoria} onChange={e => setPublicacion({...publicacion, Categoria: e.target.value})}>
                                <option value="2">TFG</option>
                                <option value="3">TFM</option>
                                <option value="4">Práctica</option>
                            </select>
                        </div>
                    </div>
                    <div className="archivos-editar">
                        <label htmlFor="archivo">SUBIR ARCHIVO</label>
                        <input type="file" id="archivo" name="archivo" ref={fileRef} style={{width: "60%"}}/>
                    </div>       
                </div>
                <footer id="footerPublicar">
                    <div id="boton-publicar">
                        <button className="btn2" type="submit">ACTUALIZAR</button>
                    </div>
                </footer>
            </form>
            {showModal && <Modal />}
        </>
    
    );
}

export default EditarPublicacion;