import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Banner from "../../components/Banner";
import Titulo from "../../components/Titulo";
import NotFound from "../../pages/NotFound";
import styles from "./Player.module.css";

function Player() {
    const [video, setVideo] = useState(null);
    const parametros = useParams();

    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/DaniRiverol/alura-cinema-api/videos?id=${parametros.id}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const videoData = data[0];
                    // Ajustar la URL para asegurar que es embebible
                    const videoURL = videoData.link.replace("watch?v=", "embed/");
                    setVideo({ ...videoData, link: videoURL });
                } else {
                    setVideo(null);
                }
            })
            .catch(error => {
                console.error('Error fetching video:', error);
                setVideo(null);
            });
    }, [parametros.id]);

    if (!video) return <NotFound />;
    
    return (
        <>
            <Banner img="player" color="#58B9AE" />
            <Titulo>
                <h1>Player</h1>
            </Titulo>
            <section className={styles.container}>
                <iframe 
                    width="100%"
                    height="80vh" 
                    src={video.link} 
                    title={video.titulo} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </section>
        </>
    );
}

export default Player;