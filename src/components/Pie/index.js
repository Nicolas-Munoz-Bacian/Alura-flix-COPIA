import styles from './Pie.module.css'
import logo from './Sello Nicolás.png'
import logoalura from './logo-Main.png'

function Pie() {
    return (
        <footer className={styles.rodape}>
            <h2>Desarrollado por Nicolás Muñoz Bacián ©Diseñador Gráfico.</h2>
            <img src={logo} alt="Logo" className={styles.logo} />
            <img src={logoalura} alt="Logoalura" className={styles.logo} />
            
        </footer>
    )
}

export default Pie;