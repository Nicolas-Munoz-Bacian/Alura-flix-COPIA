import React, { useState } from 'react';
import Card from '../../components/Card';
import EditModal from '../../pages/ModalEditarCard/modal'; // Asegúrate de que el nombre de `EditModal` es correcto

function NuevaCard({ initialVideos = [] }) {
    const [videos, setVideos] = useState(initialVideos);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ categoria: 'Front-End' });

    const handleNewVideo = () => {
        setModalData({ categoria: 'Front-End' });
        setShowModal(true);
    };

    const handleSave = (videoData) => {
        setVideos(prevVideos => [...prevVideos, videoData]);
        setShowModal(false);
    };

    const handleDelete = (videoId) => {
        setVideos(prevVideos => prevVideos.filter(video => video.id !== videoId));
    };

    const categorias = {
        "Front-End": videos.filter(video => video.categoria === 'Front-End'),
        "Back-End": videos.filter(video => video.categoria === 'Back-End'),
        "Innovación y Gestión": videos.filter(video => video.categoria === 'Innovación y Gestión'),
    };

    return (
        <div>
            <button onClick={handleNewVideo}>Agregar Nuevo Video</button>
            {showModal && (
                <EditModal
                    initialData={modalData}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
            {Object.entries(categorias).map(([categoria, videos]) => (
                <div key={categoria}>
                    <h2>{categoria}</h2>
                    {videos.map(video => (
                        <Card
                            key={video.id}
                            {...video}
                            onDelete={() => handleDelete(video.id)}
                            onEdit={() => {
                                setModalData(video);
                                setShowModal(true);
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default NuevaCard;