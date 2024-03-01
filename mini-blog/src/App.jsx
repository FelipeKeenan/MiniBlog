import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Função que mapeia se o estado de autenticação do usuário foi feita com sucesso.
import { onAuthStateChanged } from "firebase/auth";

//Hook
import { useAuthentication } from "./hooks/useAuthentication";
import { useEffect, useState } from "react";

//Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import "./index.css";

//Context
import { AuthProvider } from "./context/AuthContext";
import NewPost from "./pages/NewPost/NewPost";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  //Monitorando o estado do usuário
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  //Função que vai mapear o estado da autenticação
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          {/* Criando uma div em volta das rotas com a classe de container que já temos a estilização */}
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/posts/create" element={<NewPost />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
