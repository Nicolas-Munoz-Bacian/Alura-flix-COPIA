import React, { useState } from 'react';
import Card from '../../components/Card';
import EditModal from '../../pages/ModalEditarCard/modal'; // Asegúrate de que el nombre de `EditModal` es correcto

function NuevaCard({ initialVideos = [], addVideo }) {
    const [videos, setVideos] = useState(initialVideos);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ categoria: 'Front-End' });
    
    const handleNewVideo = () => {
        setModalData({ categoria: 'Front-End' });
        setShowModal(true);
    };

    const handleSave = (videoData) => {
        const updatedVideos = [...videos, videoData];
        setVideos(updatedVideos);
        setShowModal(false);
    };

    const handleDelete = (videoId) => {
        const updatedVideos = videos.filter(video => video.id !== videoId);
        setVideos(updatedVideos);
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
            <div>
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
        </div>
    );
}

export default NuevaCard;