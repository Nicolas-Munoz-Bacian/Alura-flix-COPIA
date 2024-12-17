import React from 'react';
import styles from"../../components/Banner/Banner.module.css"

function Banner ({img, color}){
    return(
        <div className={styles.capa} 
        style={{backgroundImage: `url("/img/home.jpg")`}}
        >
        <div className={styles.gradient} style={{background:`${color}`}}>
        </div>
        </div>
    );
}

export default Banner;