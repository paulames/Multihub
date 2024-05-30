import React from "react";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css/effect-coverflow';
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "../css/button.css";
import "../css/inicio.css";
import 'swiper/css';
import axios from 'axios';

import HeaderLogueado from '../component/headerLogueado';
import Publicaciones from "../component/publicaciones";
import Header from '../component/header';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';


const Inicio = () => {
    const basePath = "http://localhost:8080/destacados";
    const portada = process.env.PUBLIC_URL + '/assets/portadas';
    const [publicaciones, setPublicaciones] = useState([]);

    const getDestacadas = async () => {
        axios.get(basePath).then(res => {
            const data = res.data;
            if(data.status === 200){
              setPublicaciones(data.results);
            }else{
              console.log('Error');
            }
        });
    }

    useEffect(() => {
        getDestacadas();
    }, []);

    function Carucel(){
        return (
            <section >
                <Swiper effect={'coverflow'}
                    grabCursor={true} 
                    centeredSlides={true} 
                    loop={true} 
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate:0,
                        stretch:0,
                        depth:600,
                        modifier:2.5,
                        slideShadows:false,
                    }}
                    pagination={true}
                    className="imagenes"
                    modules={[EffectCoverflow, Pagination, Navigation]}
                >
                    {publicaciones.map((publicacion) => {
                        return(
                            <SwiperSlide className="imagenes">
                                <Link to={`/detalle/${publicacion.Id}`}>
                                    {<img src={`${portada}/${publicacion.URL}.png`} alt={publicacion.Titulo} key={'carrucel'+publicacion.Id} />}
                                </Link>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </section>
        );
    }

    const id = localStorage.getItem('id');
    return (
        <div>
            {
                !id ? <Header /> : <HeaderLogueado />
            }
            <h2>PUBLICACIONES DESTACADAS</h2>
            <Carucel />
            <h2>MÁS RECIENTES</h2>
            <Publicaciones basePath="http://localhost:8080/recientes" />
        </div>
    );

}

export default Inicio; 