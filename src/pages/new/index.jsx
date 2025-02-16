import { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function New() {
  const [userid, setUserId] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storageUserId = localStorage.getItem("userId");
    if (storageUserId) {
      setUserId(storageUserId);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleRegister = async () => {
    if (userid) {
      try {
        await api.post("/api/phones", {
          name,
          phone,
          clientId: userid,
        });

        setName("");
        setPhone("");

        toast.success("Telefone cadastrado com sucesso!");
      } catch (error) {
        toast.error("Falha ao cadastrar telefone. Tente novamente.");
        console.error("Erro ao salvar dados:", error);
      }
    }
  };

  return (
    <section className="w-full max-h-screen flex  flex-col items-center gap-10">
      <h2 className="text-center text-4xl mt-10 font-bold">Telefone</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="flex flex-col justify-center text-white gap-1 w-96 border p-3 rounded-xl bg-slate-950 h-72"
      >
        <h3 className="text-center font-bold text-xl">
          Cadastrar novo telefone
        </h3>
        <label htmlFor="">Nome</label>
        <input
          className="border p-1 px-2 rounded-lg border-slate-400 bg-white placeholder:text-black placeholder:opacity-45"
          type="text"
          placeholder="Digite o nome do contato"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="">Telefone</label>
        <input
          className="border p-1 px-2 rounded-lg border-slate-400 bg-white placeholder:text-black placeholder:opacity-45"
          type="text"
          placeholder="Digite o Telefone"
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
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
