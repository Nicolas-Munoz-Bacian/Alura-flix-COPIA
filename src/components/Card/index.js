import React, { useState } from 'react';
import { useFavoritosContext } from "../../pages/Context/Favoritos";
import styles from "../../components/Card/Card.module.css";
import iconFavorito from "../../components/Card/iconFavorito.png";
import iconNoFavorito from "../../components/Card/iconNoFavorito.png";
import EditModal from "../../pages/ModalEditarCard/modal";
import { Link } from 'react-router-dom';

function Card({ id, capa, titulo, descripcion, video, onDelete, onSave, onClear, imagen, onPlay }) {
    const { favorito, agregarFavorito } = useFavoritosContext();
    const [showModal, setShowModal] = useState(false);
    const isFavorito = favorito.some(fav => fav.id === id);
    const icon = isFavorito ? iconFavorito : iconNoFavorito;

// Manejar la edición del video
const handleEdit = () => {
    setShowModal(true);
};

// Manejar la eliminación del video
const handleDelete = () => {
    if (onDelete) onDelete(id); // Llama a la función de eliminación pasada como prop
};

const formatYouTubeURL = (url) => {
    if (url && url.startsWith('http')) {
        return url; 
    } else if (url) {
        return `https://www.youtube.com/watch?v=${url.split('watch?v=')[1]}`;
    }
    return ''; 
};

// Manejar la reproducción del video
const handlePlayVideo = (event) => {
    event.preventDefault(); // Prevenir la navegación por defecto
    const formattedVideoUrl = formatYouTubeURL(video);
    if (onPlay) {
        onPlay(formattedVideoUrl);
    } else {
        window.open(formattedVideoUrl, "_blank");
    }
};

// Manejar la redirección del video
const handleRedirect = () => {
    const formattedVideoUrl = formatYouTubeURL(video);
    if (formattedVideoUrl) {
        window.open(formattedVideoUrl, "_blank"); // Redirigir al reproductor
    } else {
        console.error('El video no se pudo formatear correctamente.'); // Manejo de error
    }
};

// Definición de handleSave para agregar a la funcionalidad
const handleSave = (data) => {
    // Aquí puedes realizar la lógica para actualizar los datos del video
    console.log("Datos guardados:", data);
    onSave(data); // Llama a onSave que fue pasado como prop
    setShowModal(false); // Cierra el modal después de guardar
};

return (
    <div className={styles.container}>
        <Link className={styles.link} to={`/${id}`} onClick={handlePlayVideo}></Link>
        <Link className={styles.link} to={`/${id}`} onClick={handleRedirect}>
            <Link className={styles.link} to={`/${id}`} onClick={(e) => {
                handlePlayVideo(e); // Mantenemos la funcionalidad de reproducción
            }}></Link>
            <Link className={styles.link} to={`/${id}`} onClick={handlePlayVideo}>
                <img 
                    src={capa} 
                    alt={titulo} 
                    className={styles.imagen}
                    onClick={handlePlayVideo} // Llama a la función para reproducir el video
                />
                <h2>{titulo}</h2><button onClick={handlePlayVideo} className={styles.button}>
            Reproducir
        </button>
            </Link>
        </Link>
        <img 
            src={icon} 
            alt="Icono favorito"
            className={styles.favorito}
            onClick={() => agregarFavorito({ id, titulo, capa })} // Manejar favoritos
        />
        <button onClick={handleEdit} className={styles.button}>
            Editar
        </button>
        <button onClick={handleDelete} className={styles.button}>
            Eliminar
        </button>

        {showModal && (
            <EditModal
                initialData={{ id, titulo, capa, descripcion, video }}
                onClose={() => setShowModal(false)}
                onSave={(data) => {
                    onSave(data);  
                    setShowModal(false);
                }}
            />
        )}
    </div>
);
}

export default Card;