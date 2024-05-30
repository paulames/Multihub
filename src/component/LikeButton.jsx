import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useParams } from "react-router-dom";
import '../css/likes.css';
import axios from 'axios';

function LikeButton() {
  const id = useParams().id;
  const likesPath = 'http://localhost:8080/likes';

  const [liked, setLiked] = useState(false);

  const meGusta = () => {
    setLiked(prevLiked => {
      const newLiked = !prevLiked;
      if (newLiked) {
        if(localStorage.getItem('id') !== null){
          axios.post(likesPath, { Usuario: localStorage.getItem('id'), Archivo: id })
          .catch(error => console.error('Error:', error));
          setLiked(true);
        } else{
          alert('Debes iniciar sesión para dar me gusta');
        }
        
      } else {
        axios.delete(likesPath, { data: { Usuario: localStorage.getItem('id'), Archivo: id } })
          .catch(error => console.error('Error:', error));
        setLiked(false);
      }
    });
  };

  useEffect(() => {
    const usuId = localStorage.getItem('id')

    axios.get(likesPath+'/?usuario='+usuId+'&archivo='+id).then(res => {
      const data = res.data;
      if(data.status === 200){
        if (data.results[0].LeGusta > 0) {
          setLiked(true);
        }
      }else{
        console.log('Error');
      }
    });
  }, []);

  return (
    <>
      <div id='likes' key={'likes'}>
        <FontAwesomeIcon 
          icon={liked ? solidHeart : regularHeart} 
          className="icono" 
          onClick={meGusta} 
          style={{ cursor: 'pointer', color: liked ? 'red' : 'black', fontSize: '1.5rem'}} 
        />
      </div>
    </>
  );
}

export default LikeButton;
