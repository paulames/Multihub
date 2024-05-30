import React from "react";
import ToggleComponent from "../component/toggleComponent.jsx";
import HeaderLogueado from '../component/headerLogueado';
import "../css/editar-publicacion.css";
import "../css/publicar.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Publicar = () => {
    const basePath = 'http://localhost:8080/archivo';

    const tituloRef = React.createRef();
    const asignaturaRef = React.createRef();
    const fechaRef = React.createRef();
    const descRef = React.createRef();
    const tipoRef = React.createRef();
    const catRef = React.createRef();
    const fileRef = React.createRef();
    
    const navigate = useNavigate();

    const publicar = (e) => {
        e.preventDefault();

        var titulo = tituloRef.current.value;
        var autor = localStorage.getItem('id');
        var asignatura = asignaturaRef.current.value;
        var desc = descRef.current.value;
        var tipo = tipoRef.current.value;
        var cat = catRef.current.value;
        var fecha = fechaRef.current.value;
        var fichero = fileRef.current.files[0].name.split('.')[0];

        var archivo = {
            Titulo: titulo,
            Autor: autor,
            Asignatura: asignatura,
            Descripcion: desc,
            FechaTrabajo: fecha,
            Tipo: tipo,
            Categoria: cat,
            URL: fichero,
            FechaSubida: new Date()
        };

        axios.post(basePath, archivo).then(res => {
            const data = res.data;
            if(data.status === 200){
                navigate('/perfil');
            }else{
                console.log('Error');
            }
        });
        
    }

    return (
        <>
            <HeaderLogueado/>
            <form onSubmit={publicar} style={{marginLeft: "60px"}}>
                <div id="cabecera-editar-publi">
                    <h2 id="h2-editar-publicar">Publicar</h2>
                </div>
                <div className="editar-publicacion">
                    <div className="datos-editar">
                        <div id="titulo">
                            <label htmlFor="titulo">TÍTULO</label>
                            <input type="text" id="titulo" name="titulo" ref={tituloRef} style={{width: "60%"}}/>
                        </div>
                        <div id="asignatura">
                            <label htmlFor="titulo">ASIGNATURA</label>
                            <input type="text" id="asignatura" name="asignatura" ref={asignaturaRef} style={{width: "60%"}}/>
                        </div>
                        <div id="fecha">
                            <label htmlFor="fecha">FECHA (Fecha de Trabajo)</label>
                            <input type="date" id="fecha" name="fecha" ref={fechaRef} style={{width: "60%"}}  />
                        </div>
                        <div id="descripcion">
                            <label htmlFor="decripcion">DESCRIPCIÓN</label>
                            <textarea type="text" id="textarea" name="decripcion" ref={descRef} style={{width: "60%"}} />
                        </div>
                        <div id="categoria">
                            <label htmlFor="tipo">TIPO </label>
                            <select ref={tipoRef}>
                                <option value="PDF">PDF</option>
                                <option value="Video">Video</option>
                            </select>
                        </div>
                        <div id="categoria">
                            <label htmlFor="categoria">CATEGORÍA </label>
                            <select ref={catRef}>
                                <option value="2">TFG</option>
                                <option value="3">TFM</option>
                                <option value="4">Práctica</option>
                            </select>
                        </div>
                    </div>
                    <div className="archivos-editar">
                        <label htmlFor="archivo">SUBIR ARCHIVO</label>
                        <input type="file" id="archivo" name="archivo" ref={fileRef} style={{width: "60%"}} />
                    </div>                
                </div>
                <footer id="footerPublicar">
                    <div id="boton-publicar">
                        <button className="btn2" type="submit">PUBLICAR</button>
                    </div>
                </footer>
            </form>
        </>
    );
};

export default Publicar;