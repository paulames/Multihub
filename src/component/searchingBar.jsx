import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/searchingBar.css';

function SearchingBar() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const buscar = (e) => {
        e.preventDefault();
        let textoBusqueda = e.target.value;
        setSearch(textoBusqueda);
        if(textoBusqueda !== ""){
            navigate(`/busqueda/${textoBusqueda}`);
        }else{
            navigate(`/`);
        }
    }

    return (
            <input
                type="text"
                value={search}
                onChange={buscar}
                className="search-input"
                placeholder="Buscar..."
            />
    );
}

export default SearchingBar;