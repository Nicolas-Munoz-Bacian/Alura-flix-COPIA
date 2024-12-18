import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Banner from "../../components/Banner";
import Titulo from "../../components/Titulo";
import NotFound from "../../pages/NotFound";
import styles from "./Player.module.css";
import frontend from "../../pages/inicio/front end.png";
import backend from "../../pages/inicio/back end.png";
import innovacionYgestion from "../inicio/innovación y gestión.png";

function Player() {
    const [video, setVideo] = useState(null);
    const parametros = useParams();

    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/DaniRiverol/alura-cinema-api/videos?id=${parametros.id}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const videoData = data[0];
                    const videoURL = convertToEmbedURL(videoData.video); // Usa videoData.video
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
                    src={video.link} // Usa video.link aquí
                    title={video.titulo}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </section>
        </>
    );
}

function convertToEmbedURL(youtubeURL) {
    // Asegúrate de que la URL de YouTube tenga el formato correcto
    if (!youtubeURL.includes('watch?v=')) {
        console.error('URL de YouTube inválida:', youtubeURL);
        return ''; // Retorna una cadena vacía si la URL es inválida
    }
    return youtubeURL.replace('watch?v=', 'embed/');
}

export default Player;