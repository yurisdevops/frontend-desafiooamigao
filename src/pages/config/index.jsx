import { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Config() {
  const [userid, setUserId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storageUserId = localStorage.getItem("userId");
    if (storageUserId) {
      setUserId(storageUserId);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const checkEmail = async () => {
    try {
      const response = await api.post("/api/check-email", {
        email,
      });
      return !response.data.error;
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      return false;
    }
  };

  const handleRegister = async () => {
    const emailAvailable = await checkEmail();
    if (!emailAvailable) {
      toast.warn("Email já cadastrado");
      return;
    }

    try {
      const response = await api.post("/api/members", {
        name,
        email,
        password,
        clientId: userid,
      });

      if (response.status === 201) {
        toast.success("Membro cadastrado com sucesso!");
      } else {
        toast.error("Falha ao realizar cadastro. Tente novamente.");
      }

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error("Erro ao cadastrar membro: " + error.message);
      console.error("Erro ao salvar dados:", error);
    }
  };

  return (
    <section className="w-full max-h-screen flex  flex-col items-center gap-10">
      <h2 className="text-center text-4xl mt-10 font-bold">Configurações</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="flex flex-col justify-center text-white gap-1 w-96 border p-3 rounded-xl bg-slate-950 h-96"
      >
        <h3 className="text-center font-bold text-xl">Cadastrar novo membro</h3>
        <label htmlFor="">Nome</label>
        <input
          className="border p-1 px-2 rounded-lg border-slate-400 bg-white placeholder:text-black placeholder:opacity-45 text-zinc-950"
          type="text"
          placeholder="Digite o nome do membro"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="">Email</label>
        <input
          className="border p-1 px-2 rounded-lg border-slate-400 bg-white placeholder:text-black placeholder:opacity-45 text-zinc-950"
          type="email"
          placeholder="ex: junior@example.com"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">Senha</label>
        <input
          className="border p-1 px-2 rounded-lg border-slate-400 bg-white placeholder:text-black placeholder:opacity-45 text-zinc-950"
          type="password"
          placeholder="********"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-xl w-full cursor-pointer mt-3"
        >
          Salvar
        </button>
      </form>
    </section>
  );
}
