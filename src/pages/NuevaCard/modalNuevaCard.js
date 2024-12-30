import React, { useState } from 'react';
import styles from '../../pages/NuevaCard/NuevaCard.module.css'
import Card from '../../components/Card';

return (
    <div>
        <button onClick={handleNewVideo}>Agregar Nuevo Video</button>
        
        {/* Modal para el video actual */}
        {currentVideo && (
            <div className={styles.videoModal}>
                <h2>Reproduciendo: {currentVideo.titulo}</h2>
                <iframe 
                    width="560" 
                    height="315" 
                    src={`https://www.youtube.com/embed/${currentVideo.video.split('v=')[1]}`}
                    title={currentVideo.titulo}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                <button onClick={() => setCurrentVideo(null)}>Cerrar</button>
            </div>
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
                        onPlay={() => handlePlayVideo(video)} // Agregar la función onPlay al card
                    />
                ))}
            </div>
        ))}
    </div>
);

export default modalNuevaCard;