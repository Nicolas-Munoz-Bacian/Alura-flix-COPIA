import Banner from "../../components/Banner";
import styles from "../../pages/Player/Player.module.css"
import Titulo from "../../components/Titulo";
import { useParams } from "react-router-dom";
import videos from "../../components/data/db.json";
import NotFound from "../../pages/NotFound";
import { useEffect, useState } from "react";

function Player() {
    const [video, setVideo] = useState(null);
    const parametros = useParams();

    useEffect(() => {
        const videoEncontrado = videos.find(video => video.id === Number(parametros.id));
        setVideo(videoEncontrado);
    }, [parametros.id]);

    console.log(video);

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
                    height="100%" 
                    src={video.link} 
                    title={video.titulo} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>
            </section>
        </>
    );
}

export default Player;