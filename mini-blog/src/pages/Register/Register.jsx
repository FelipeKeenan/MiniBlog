import { useAuthentication } from '../../hooks/useAuthentication'
import styles from './Register.module.css'
import { useState, useEffect } from 'react'

const Register = () => {
    //States
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    //Importando elementos do hook useAuthentication
    const { createUser, error: authError, loading } = useAuthentication()


    //Funções
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        //Criando o usuário
        const user = {
            displayName: displayName,
            email: email,
            password: password
        }
        //Validações
        if (password !== confirmPassword) {
            setError("As senhas não coincidem!")
            return
        }
        const res = await createUser(user)
        console.log(res)
    }

    //
    useEffect(() => {
        if (authError) {
            setError(authError)
        }

    }, [authError])


    
    return (
        <div className={styles.register}>
            <h1>Cadastre-se para postar</h1>
            <p>Crie seu usuário e compartilhe suas histórias!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input onChange={(e) => setDisplayName(e.target.value)}
                        type="text"
                        name="displayName"
                        required
                        placeholder='Nome do usuário'
                        value={displayName}
                    />
                </label>
                <label>
                    <span>Email:</span>
                    <input onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        required
                        placeholder='E-mail do usuário'
                        value={email}
                    />
                </label>
                <label>
                    <span>Senha:</span>
                    <input onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        required
                        placeholder='Insira sua senha'
                        value={password}
                    />
                </label>
                <label>
                    <span>Confirmação de senha:</span>
                    <input onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder='Confirme sua senha'
                        value={confirmPassword}
                    />
                </label>
                {!loading && <button className='btn'>Cadastrar</button>}
                {loading && <button className='btn' disabled>Aguarde</button>}

                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}

export default Register
