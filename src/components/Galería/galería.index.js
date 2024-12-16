import styles from "../../components/Card/galería.module.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Galeria.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Galeria.module.css'; // Asegúrate de que este es el archivo CSS correcto

function Galeria() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => console.error('Error al eliminar el dato:', error));
  };

  return (
    <div className="galeria-container">
      {items.map(item => (
        <div 
          className={`container ${getSectionClass(item.title)}`} 
          key={item.id}>
          <h3>{item.title}</h3>
          <img src={item.thumbnailUrl} alt={item.title} />
          <button onClick={() => handleDelete(item.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

// Función para determinar la clase de la sección
function getSectionClass(title) {
  if (title.includes('Front End')) {
    return 'front-end';
  } else if (title.includes('Back End')) {
    return 'back-end';
  } else if (title.includes('Innovación') || title.includes('Gestión')) {
    return 'innovacion-gestion';
  }
  return '';
}

export default Galeria;