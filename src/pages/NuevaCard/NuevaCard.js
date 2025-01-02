import React, { useState } from 'react';
import Card from '../../components/Card';
import EditModal from '../../pages/ModalEditarCard/modal';
import frontend from "../../pages/inicio/front end.png";
import backend from "../../pages/inicio/back end.png";
import innovacionYgestion from "../inicio/innovación y gestión.png";
import styles from './NuevaCard.module.css'; 
import videosData from "../../components/data/db.json"
import { enviarProducto, actualizarProducto } from '../../pages/ConexionAPI/API';

function NuevaCard({ initialVideos = [], onUpdateVideos }) {
    const [videos, setVideos] = useState(initialVideos); 
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ id: null, titulo: '', imagen: '', link: '', descripcion: '', categoria: 'Front-End' });

    const handleNewVideo = () => {
        setModalData({ id: null, titulo: '', imagen: '', link: '', descripcion: '', categoria: 'Front-End' }); 
        setShowModal(true); 
    };

    const handleSave = (videoData) => {
        let updatedVideos;
        if (videoData.id) {
            updatedVideos = videos.map(video => video.id === videoData.id ? videoData : video); 
        } else {
            videoData.id = new Date().getTime(); 
            updatedVideos = [...videos, videoData]; 
        }
        setVideos(updatedVideos); 
        localStorage.setItem('videos', JSON.stringify(updatedVideos)); 
        setShowModal(false);
        setModalData({ id: null, titulo: '', imagen: '', link: '', descripcion: '', categoria: 'Front-End' });
    };

    const handleDelete = (videoId) => {
        const updatedVideos = videos.filter(video => video.id !== videoId); 
        setVideos(updatedVideos); 
        localStorage.setItem('videos', JSON.stringify(updatedVideos)); 
        onUpdateVideos(updatedVideos); // Notify Inicio about the update
    };

    const handleClear = () => {
        setModalData({ id: null, titulo: '', imagen: '', link: '', descripcion: '', categoria: 'Front-End' });
        setShowModal(false); 
    };

    const categorias = {
        "Front-End": videos.filter(video => video.categoria === 'Front-End'),
        "Back-End": videos.filter(video => video.categoria === 'Back-End'),
        "Innovación y Gestión": videos.filter(video => video.categoria === 'Innovación y Gestión'),
    };

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
                    onClose={handleClear} 
                    onSave={handleSave} 
                />
            )}
            {Object.entries(categorias).map(([categoria, videos]) => (
                <div key={categoria}>
                    <img src={categoryImages[categoria]} alt={categoria} style={{ width: '100%' }} />
                    {videos.map(video => (
                        <Card
                            key={video.id}
                            {...video}
                            onDelete={handleDelete}
                            onSave = {handleSave}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default NuevaCard;