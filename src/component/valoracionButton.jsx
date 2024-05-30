import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';

function ValoracionButton({ maxRating = 5 }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    if(localStorage.getItem('id') !== null){
      setRating(index);
      valorar(index);
    }else{
      alert('Debes iniciar sesión para valorar');
    }
  };


  const { id } = useParams();
  const basePath = 'http://localhost:8080/archivo/' + id;


  const valorar = async (index) => {
      axios.put(basePath, { Valoracion: index }).then(res => {
        const data = res.data;
        if (data.status === 200) {
          pintarEstrellas();
        } else {
          console.log('Error');
        }
      });
  };

  const pintarEstrellas = () => {
    axios.get(basePath).then(res => {
      const data = res.data;
      if(data.status === 200){
        const valoracion = data.results[0].Valoracion;
        const numValoraciones = data.results[0].numValoraciones;

        if (!valoracion || numValoraciones === 0) {
          setRating(0);
        } else {
          let media = valoracion / numValoraciones;

          if (media > 4) {
            setRating(5);
          } else if (media > 3) {
            setRating(4);
          } else if (media > 2) {
            setRating(3);
          } else if (media > 1) {
            setRating(2);
          } else {
            setRating(1);
          }
        }
      }else{
        console.log('Error');
      }
    });
  }

  useEffect(() => {
    pintarEstrellas();
  }, []);
    

  return (
    <div>
      {[...Array(maxRating)].map((star, index) => {
        const starIndex = index + 1;
        return (
          <FontAwesomeIcon
            key={starIndex}
            icon={starIndex <= (hoverRating || rating) ? solidStar : regularStar}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
            style={{ cursor: 'pointer', color: starIndex <= (hoverRating || rating) ? 'gold' : 'gray' }}
            value={starIndex}
          />
        );
      })}
    </div>
  );
}

export default ValoracionButton;
