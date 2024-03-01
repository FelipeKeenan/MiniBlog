import { db } from "../firebase/config"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    //States
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    //Cleanup - Limpeza para não ter problemas na memória
    //Deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    //Pegando a autenticação do firebase
    const auth = getAuth()

    //Função que evita o vazamento de memória
    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    //Vai receber uma função assíncrona poisvai demorar bastante para enviar os dados.
    const createUser = async (data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(null)
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            await updateProfile(user, {
                displayName: data.displayName
            })
            setLoading(false)
            return user
        }
        catch (error) {

            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado."
            } else {
                systemErrorMessage = "Ocorreu um erro. Tente novamente mais tarde"
            }
            setLoading(false)
            setError(systemErrorMessage)
        }
    }

    //Função que não vai deixar a gent ter memory leak
    useEffect(() => {
        return () => setCancelled(true)
    }, [])



    return {
        auth,
        createUser,
        error,
        loading
    }
}