import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import EditModal from '../../pages/ModalEditarCard/modal'; // Asegúrate que la ruta es correcta

function VideoList() {
    const [videos, setVideos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        fetch("https://my-json-server.typicode.com/DaniRiverol/alura-cinema-api/videos")
            .then(response => response.json())
            .then(data => setVideos(data));
    }, []);

    const addVideo = (nuevoVideo) => {
        setVideos(prevVideos => [...prevVideos, { ...nuevoVideo, id: prevVideos.length + 1 }]);
    };

    const handleNewVideo = () => {
        setModalData(null); // Para crear nuevo video
        setShowModal(true); // Mostrar modal
    };

    const handleSave = (videoData) => {
        addVideo(videoData); // Agregar video a la lista
    };

    return (
        <div>
            <button onClick={handleNewVideo}>
                Agregar Nuevo Video
            </button>
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
                        onDelete={() => {} /* Tu lógica para eliminar */}
                        onEdit={() => {
                            setModalData(video); // Cargar datos para editar
                            setShowModal(true); // Mostrar modal
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default VideoList;