import styles from '../../components/Pie/Pie.module.css'
import logo from '../../components/Pie/Sello Nicolás.png'
import logoalura from '../../components/Pie/logo-Main.png'

function Pie() {
    return (
        <footer className={styles.Rodapie}>
            <h2>Desarrollado por Nicolás Muñoz Bacián © 2024. Diseñador Gráfico.</h2>
            <img src={logo} alt="Logo" className={styles.logo} />
            <img src={logoalura} alt="Logoalura" className={styles.logoalura} />
            
        </footer>
    )
}

export default Pie;