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

    const handleEdit = () => {
        setShowModal(true);
    };

    const handleDelete = () => {
        if (onDelete) onDelete(id); // Llama a la función de eliminación pasada como prop
    };

    const formatYouTubeURL = (url) => {
        // Asegúrate de que las URLs de YouTube sean válidas
        if (!url) return ''; // Verifica si la URL está vacía
        if (url.startsWith('http')) {
            return url; // Ya está bien formada
        } else if (url.includes('watch?v=')) {
            return `https://www.youtube.com/watch?v=${url.split('watch?v=')[1]}`; // Formación estándar para URLs de YouTube
        } else if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1]; // Extrae el ID de la URL corta
            return `https://www.youtube.com/watch?v=${videoId}`;
        } else {
            return `https://www.youtube.com/watch?v=${url}`; // Asume que es un ID de video
        }
    };

    // Manejar la reproducción del video
    const handlePlayVideo = () => {
        const formattedVideoUrl = formatYouTubeURL(video);
        // Verifica si la URL formateada es válida
        if (formattedVideoUrl) {
            if (onPlay) {
                onPlay(formattedVideoUrl); // Llama a onPlay con el URL formateado
            } else {
                window.open(formattedVideoUrl, "_blank"); // Redirige a YouTube
            }
        } else {
            console.error('Formato de video no válido:', video); // Manejo de errores
        }
    };

    const handleRedirect = () => {
        if (video) {
            const formattedVideoUrl = formatYouTubeURL(video);
            window.open(formattedVideoUrl, "_blank"); // Redirigir a YouTube
        } else {
            console.error('No hay URL de video para redirigir');
        }
    };

    return (
        <div className={styles.container}>
            <Link className={styles.link} to={`/${id}`} onClick={handleRedirect}>
                <img 
                    src={capa} 
                    alt={titulo} 
                    className={styles.imagen}
                    onClick={handlePlayVideo} // Llama a la función para reproducir el video
                />
                <h2>{titulo}</h2>
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
                    onDelete={handleDelete}
                    onClear={onClear} 
                />
            )}
        </div>
    );
}

export default Card;