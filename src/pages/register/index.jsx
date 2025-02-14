import { useState } from "react";
import api from "./../../services/api";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    const response = await api.post("/api/users", {
      name,
      email,
      password,
    });

    if (response.status === 201) {
      alert("Cadastro realizado com sucesso!");
    } else {
      alert("Falha ao realizar cadastro. Tente novamente.");
    }

    navigate("/");
  };

  return (
    <main className="h-screen w-full flex  justify-center items-center bg-slate-700 ">
      <div className="flex justify-center items-center w-96 min-h-auto bg-slate-500 rounded-2xl">
        <form action={handleRegister} className="flex flex-col gap-3 p-2 mt-3">
          <label className="text-3xl text-white font-bold" htmlFor="name">
            Nome
          </label>
          <input
            className="border rounded-2xl  w-80 border-white px-6 py-2"
            type="text"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
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

          <span className="text-center font-bold text-xl text-white mb-6">
            Já tem cadastro?{" "}
            <a href="/" className="text-sky-400">
              Acesse
            </a>
          </span>
        </form>
      </div>
    </main>
  );
}
