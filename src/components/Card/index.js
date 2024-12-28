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
        if (onDelete) onDelete(id); 
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

    return (
        <div className={styles.container}>
            <Link className={styles.link} to={`/${id}`} onClick={handlePlayVideo}>
                <img 
                    src={capa} 
                    alt={titulo} 
                    className={styles.imagen}
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