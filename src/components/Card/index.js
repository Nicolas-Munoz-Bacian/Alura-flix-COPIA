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

    // Formatear URL de YouTube
    const formatYouTubeURL = (url) => {
        if (!url) return ''; // Si no hay URL, retornar vacío
        if (url.startsWith('http')) {
            return url; // Ya está bien formada
        } else if (url.includes('watch?v=')) { // Formación estándar para URLs de YouTube
            return `https://www.youtube.com/watch?v=${url.split('watch?v=')[1]}`;
        } else if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1]; // Extrae el ID de la URL corta
            return `https://www.youtube.com/watch?v=${videoId}`;
        } else {
            return `https://www.youtube.com/watch?v=${url}`; // Asume que es un ID de video
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

    // Manejar la reproducción del video
    const handlePlayVideo = (event) => {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
        const formattedVideoUrl = formatYouTubeURL(video);

        // Llama a onPlay si está definido, de lo contrario redirige
        if (onPlay) {
            onPlay(formattedVideoUrl);
        } else {
            handleRedirect(); // Llamada a handleRedirect
        }

        // Añadir verificación para ver cómo se está formateando el URL
        console.log('Formatted Video URL:', formattedVideoUrl);
        
        if (!formattedVideoUrl) {
            console.error('El video no se pudo formatear correctamente.');
        }
    };

    return (
        <div className={styles.container}>
            <Link className={styles.link} to={`/${id}`} onClick={handleRedirect}>
                <img 
                    src={capa} 
                    alt={titulo} 
                    className={styles.imagen}
                    onClick={handleRedirect}
                />
                <h2>{titulo}</h2>
            </Link>
            <img 
                src={icon} 
                alt="Icono favorito"
                className={styles.favorito}
                onClick={() => agregarFavorito({ id, titulo, capa })}
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
                    onDelete={handleDelete}
                    onClear={onClear} 
                />
            )}
        </div>
    );
}

export default Card;