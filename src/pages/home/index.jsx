import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
export function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const user = response.data.user;

        localStorage.setItem("userId", user.id);
        toast.success("Login realizado com sucesso!");
        navigate(`/dashboard`);
      } else {
        toast.warn("Usuário ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.warn("Usuário ou senha inválidos");
    }
  };
  return (
    <main className="h-screen w-full flex  justify-center items-center bg-slate-700 px-2 ">
      <div className="flex justify-center items-center w-96 h-96 bg-slate-500 rounded-2xl ">
        <form action={handleLogin} className="flex flex-col gap-3 p-2">
          <label className="text-3xl text-white font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="border rounded-2xl  w-80 border-white px-6 py-2"
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="text-3xl text-white font-bold" htmlFor="password">
            Senha
          </label>
          <input
            className="border rounded-2xl  w-80 border-white px-6 py-2"
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-white p-2 rounded-2xl mt-4 text-2xl font-medium hover:scale-105 cursor-pointer mb-6"
          >
            Acessar
          </button>

          <span className="text-center font-bold text-xl text-white">
            Ainda não tem cadastro?{" "}
            <a href="/register" className="text-sky-400">
              Registre-se
            </a>
          </span>
        </form>
      </div>
    </main>
  );
}
