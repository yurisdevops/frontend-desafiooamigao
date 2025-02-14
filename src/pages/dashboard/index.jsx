import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";

export function Dashboard() {
  const [userid, setUserId] = useState(null);
  const [data, setData] = useState([]);
  const [activeModal, setActiveModal] = useState(null); // Estado para o modal ativo
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const getData = useCallback(async () => {
    if (userid) {
      try {
        const response = await api.get(
          `https://backend-desafiooamigao.onrender.com/api/phones?clientId=1`
        );
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
  }, [userid]);
  console.log(data);

  const handleOpenModal = (modalName) => {
    setActiveModal(activeModal === modalName ? null : modalName);
  };

  const modalListPhone = () => {
    return (
      <div className="flex flex-col gap-6">
        {data.map((item) => (
          <div className="bg-white p-3 rounded-lg flex flex-col" key={item.id}>
            <p className="text-xl uppercase font-medium">
              Nome:<a className="font-normal text-lg "> {item.name}</a>
            </p>
            <p className="text-xl uppercase font-medium">
              Tel: <a className="font-normal text-lg ">{item.phone}</a>
            </p>
          </div>
        ))}
      </div>
    );
  };

  const modalRegisterPhone = () => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="flex flex-col gap-2 "
      >
        {" "}
        <label htmlFor="">Nome</label>
        <input
          className="border p-1 rounded-lg border-slate-400"
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="">Telefone</label>
        <input
          className="border p-1 rounded-lg border-slate-400"
          type="text"
          placeholder="Telefone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-xl w-full cursor-pointer"
        >
          Salvar
        </button>
      </form>
    );
  };

  const modalAddMember = () => {
    // Conteúdo para adicionar um novo membro
    return (
      <div className="bg-white p-3 rounded-lg">
        <p>Adicionar novo membro</p>
        {/* Formulário ou conteúdo adicional */}
      </div>
    );
  };

  const handleRegister = async () => {
    if (userid) {
      try {
        await api.post("/api/phones", {
          name,
          phone,
          clientId: userid,
        });
        // Atualize os dados após salvar o novo telefone
        getData();
      } catch (error) {
        console.error("Erro ao salvar dados:", error);
      }
    }
  };

  useEffect(() => {
    const storageUserId = localStorage.getItem("userId");
    if (storageUserId) {
      setUserId(storageUserId);
    }
    if (!userid) {
      navigate;
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <main className="w-full h-screen flex justify-center items-center bg-slate-700 gap-20">
      <section className="flex flex-col gap-10">
        <button
          onClick={() => handleOpenModal("listPhone")}
          className="cursor-pointer bg-white p-4 text-black font-bold rounded-2xl w-60"
        >
          Listar Telefones
        </button>
        <div
          className="flex flex-col w-60 p-2"
          style={{
            maxHeight: activeModal === "listPhone" ? "none" : "0px",
            overflow: "hidden",
            transition: "max-height 0.3s, opacity 0.3s",
            opacity: activeModal === "listPhone" ? 1 : 0,
          }}
        >
          {activeModal === "listPhone" && modalListPhone()}
        </div>
      </section>
      <section className="flex flex-col gap-10">
        <button
          onClick={() => handleOpenModal("registerPhone")}
          className="cursor-pointer bg-white p-4 text-black font-bold rounded-2xl w-60"
        >
          Novo Telefone
        </button>
        <div
          className="flex flex-col w-60 p-2 bg-white rounded-lg"
          style={{
            maxHeight: activeModal === "registerPhone" ? "none" : "0px",
            overflow: "hidden",
            transition: "max-height 0.3s, opacity 0.3s",
            opacity: activeModal === "registerPhone" ? 1 : 0,
          }}
        >
          {activeModal === "registerPhone" && modalRegisterPhone()}
        </div>
      </section>
      <section className="flex flex-col gap-10">
        <button
          onClick={() => handleOpenModal("addMember")}
          className="cursor-pointer bg-white p-4 text-black font-bold rounded-2xl w-60"
        >
          Adicionar novo membro
        </button>
        <div
          className="flex flex-col w-60 p-2 bg-white rounded-lg"
          style={{
            maxHeight: activeModal === "addMember" ? "none" : "0px",
            overflow: "hidden",
            transition: "max-height 0.3s, opacity 0.3s",
            opacity: activeModal === "addMember" ? 1 : 0,
          }}
        >
          {activeModal === "addMember" && modalAddMember()}
        </div>
      </section>
    </main>
  );
}
