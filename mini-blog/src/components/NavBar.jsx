import { NavLink } from "react-router-dom"
import styles from './NavBar.module.css'
import { useAuthentication } from "../hooks/useAuthentication"
import { useAuthValue } from "../context/AuthContext"

const NavBar = () => {
    //Chamo o contexto
    const { user } = useAuthValue()

    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.brand}>
                Mini <span>Blog</span>
            </NavLink>
            <ul className={styles.links_list}>
                <li>
                    {/* //Imprimindo a classe .active com uma condição */}
                    <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>
                        Home
                    </NavLink>
                </li>
                {user === undefined && (
                    <>
                        <li>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")}>Entrar</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : "")}>Cadastre-se</NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li>
                            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : "")}>Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to="/posts/create" className={({ isActive }) => (isActive ? styles.active : "")}>Novo Post</NavLink>
                        </li>
                    </>
                )}
                <li>
                    {/* //Imprimindo a classe .active com uma condição */}
                    <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : "")}>Sobre</NavLink>
                </li>

            </ul>
        </nav >
    )
}

export default NavBar
