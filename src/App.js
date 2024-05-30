import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Detalle from "./paginas/detalle";
import Publicar from './paginas/publicar';
import Inicio from "./paginas/inicio";
import Login from "./paginas/login";
import Registro from "./paginas/registro";
import Perfil from "./paginas/perfil";
import Busqueda from './paginas/busqueda';
import Categoria from './paginas/categoría';
import EditarPerfil from './paginas/editar-perfil';
import EditarPublicacion from './paginas/editar-publicacion';
import UltimasPublicaciones from './paginas/ultimas-publicaciones';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/busqueda/:textoBusqueda" element={<Busqueda />} />
          <Route path="/publicar" element={<Publicar />} />
          <Route path="/editar-publicacion/:id" element={<EditarPublicacion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/categoria/:categoria" element={<Categoria/>} />
          <Route path="/editar-perfil" element={<EditarPerfil />} />
          <Route path="/ultimas-publicaciones" element={<UltimasPublicaciones />} />
          <Route path="/" element={<Inicio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;