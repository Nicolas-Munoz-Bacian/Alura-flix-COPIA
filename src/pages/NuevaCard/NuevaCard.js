import React, { useState } from 'react';
import Card from '../../components/Card';
import EditModal from '../../pages/ModalEditarCard/modal';
import { enviarProducto } from '../../pages/ConexionAPI/API';
import frontend from "../../pages/inicio/front end.png";
import backend from "../../pages/inicio/back end.png";
import innovacionYgestion from "../inicio/innovación y gestión.png";
import styles from './NuevaCard.module.css'; // Asegúrate de que esta ruta sea correcta
import videosData from "../../components/data/db.json"

function NuevaCard({ initialVideos = [], onUpdateVideos }) {
    const [videos, setVideos] = useState(initialVideos); // Inicializa con videos pasados como prop
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ id: null, titulo: '', imagen: '', link: '', descripcion: '', categoria: 'Front-End' });

    // State for form inputs
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleNewVideo = () => {
        setModalData({ id: null, titulo: '', imagen: '', link: '', descripcion: '', categoria: 'Front-End' }); // Limpia el modal
        setShowModal(true); // Muestra el modal para agregar nuevo video
    };

    const handleSave = async (videoData) => {
        let updatedVideos;

        // Si hay un ID, considera que es una modificación
        if (videoData.id) {
            updatedVideos = videos.map(video => 
                video.id === videoData.id ? videoData : video // Actualiza el video existente
            );
        } else {
            videoData.id = new Date().getTime(); // Asigna un ID único si es un nuevo video
            updatedVideos = [...videos, videoData]; // Agrega el nuevo video
        }

        setVideos(updatedVideos); // Actualiza la lista de videos sin eliminarlos
        localStorage.setItem('videos', JSON.stringify(updatedVideos)); // Opcional: guarda en localStorage

        try {
            const newVideoData = {
                titulo: videoData.titulo,
                imagen: videoData.imagen,
                link: videoData.link,
                descripcion: videoData.descripcion,
                categoria: videoData.categoria,
            };

            // Solo si es un nuevo video, espera a enviar el producto
            if (!videoData.id) {
                const savedVideo = await enviarProducto(newVideoData);
                setVideos(prevVideos => [...prevVideos, savedVideo]); // Guarda el nuevo video devuelto
            }
        } catch (error) {
            console.error('Error al guardar el video:', error.message);
            alert('Ocurrió un error al guardar el video. Verifica los datos.');
        }
    };

    // Función para eliminar un video por su ID
    const handleDelete = (videoId) => {
        setVideos(prevVideos => prevVideos.filter(video => video.id !== videoId)); // Elimina el video seleccionado
    };

    // Función para limpiar los datos del modal
    const handleClear = () => {
        setModalData({ id: null, titulo: '', imagen: '', link: '', descripcion: '', categoria: 'Front-End' });
        setShowModal(false); // Cierra el modal
    };

    // Categorías de videos
    const categorias = {
        "Front-End": videos.filter(video => video.categoria === 'Front-End'),
        "Back-End": videos.filter(video => video.categoria === 'Back-End'),
        "Innovación y Gestión": videos.filter(video => video.categoria === 'Innovación y Gestión'),
    };

    // Mapeo de categorías a imágenes
    const categoryImages = {
        "Front-End": frontend,
        "Back-End": backend,
        "Innovación y Gestión": innovacionYgestion,
    };

    return (
        <div>
            <button onClick={handleNewVideo}>Agregar Nuevo Video</button>
            {showModal && (
                <EditModal
                    initialData={modalData}
                    onClose={handleClear} // Cierra el modal
                    onSave={handleSave} // Función para guardar el video
                />
            )}
           {Object.entries(categorias).map(([categoria, videos]) => (
                <div key={categoria}>
                    {/* Mostrar la imagen/banner de la categoría */}
                    <img 
                        src={categoryImages[categoria]} 
                        alt={`Banner de ${categoria}`} 
                        className={styles.banner} 
                    />
                   
                    {videos.length > 0 ? ( // Verifica si hay videos para mostrar
                        videos.map(video => (
                            <Card
                                key={video.id}
                                {...video}
                                onDelete={() => handleDelete(video.id)} // Elimina solo el video seleccionado
                                onEdit={() => {
                                    setModalData(video); // Prellena el modal con los datos del video existente
                                    setShowModal(true); // Abre el modal para editar
                                }}
                            />
                        ))
                    ) : (
                        <p>No hay videos en esta categoría.</p> // Mensaje si no hay videos en la categoría
                    )}
                </div>
            ))}
        </div>
);
}

export default NuevaCard;