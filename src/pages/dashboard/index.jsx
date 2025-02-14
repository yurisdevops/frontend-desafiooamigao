import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [userid, setUserId] = useState(null);
  const [data, setData] = useState([]);
  const [dataMembers, setDataMembers] = useState([]);
  const [activeModal, setActiveModal] = useState(null); 
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameMember, setNameMember] = useState("");
  const [emailMember, setEmailMember] = useState("");
  const [passwordMember, setPasswordMember] = useState("");
  const [memberId, setMemberId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storageUserId = localStorage.getItem("userId");
    if (storageUserId) {
      setUserId(storageUserId);
    } else {
      navigate("/");
    }

    window.addEventListener("beforeunload0", handleUnload);

    return () => window.removeEventListener("beforeunload0", handleUnload);
  }, [navigate]);

  const handleUnload = useCallback(() => {
    localStorage.removeItem("userId");
  }, []);

  const getData = useCallback(async () => {
    if (userid) {
      try {
        const response = await api.get(`/api/phones?clientId=${userid}`);
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
  }, [userid]);

  const getDataMembers = useCallback(async () => {
    if (userid) {
      try {
        const response = await api.get(`/api/members?clientId=${userid}`);
        setDataMembers(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
  }, [userid]);

  useEffect(() => {
    if (!userid) {
      return;
    } else {
      getData();
      getDataMembers();
    }
  }, [userid, getData]);

  const checkEmail = async () => {
    try {
      const response = await api.post("/api/check-email", {
        email: emailMember,
      });
      return !response.data.error;
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      return false;
    }
  };

  const handleOpenModal = (modalName) => {
    setActiveModal(activeModal === modalName ? null : modalName);
  };

  const modalListPhone = () => {
    return (
      <div className="flex flex-col gap-3">
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
        className="flex flex-col gap-1 "
      >
        <label htmlFor="">Nome</label>
        <input
          className="border p-1 rounded-lg border-slate-400"
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="">Telefone</label>
        <input
          className="border p-1 rounded-lg border-slate-400"
          type="text"
          placeholder="Telefone"
          value={phone}
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
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegisterMember();
        }}
        className="flex flex-col gap-1 "
      >
        <label htmlFor="">Nome</label>
        <input
          className="border p-1 rounded-lg border-slate-400"
          type="text"
          placeholder="Nome"
          value={nameMember}
          onChange={(e) => setNameMember(e.target.value)}
        />
        <label htmlFor="">Email</label>
        <input
          className="border p-1 rounded-lg border-slate-400"
          type="email"
          placeholder="Email"
          value={emailMember}
          onChange={(e) => setEmailMember(e.target.value)}
        />
        <label htmlFor="">Senha</label>
        <input
          className="border p-1 rounded-lg border-slate-400"
          type="password"
          placeholder="Senha"
          value={passwordMember}
          onChange={(e) => setPasswordMember(e.target.value)}
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

  const modalListMembers = () => {
    return (
      <div className="flex flex-col gap-3">
        {dataMembers.map((item) => (
          <div className="bg-white p-3 rounded-lg flex flex-col" key={item.id}>
            <div className="flex justify-between items-center">
              <p className="text-xl uppercase font-medium">
                Nome:<a className="font-normal text-lg "> {item.name}</a>
              </p>
              <button
                className="text-red-500 font-bold cursor-pointer hover:scale-105"
                onClick={() => handleRemoveMember(item.id)}
              >
                X
              </button>
            </div>
            <p className="text-xl uppercase font-medium">
              Tel: <a className="font-normal text-lg ">{item.email}</a>
            </p>
            <p>{item.id}</p>
          </div>
        ))}
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

        setName("");
        setPhone("");

        getData();
      } catch (error) {
        console.error("Erro ao salvar dados:", error);
      }
    }
  };

  const handleRegisterMember = async () => {
    const emailAvailable = await checkEmail();
    if (!emailAvailable) {
      alert("Email já cadastrado");
      return;
    }

    try {
      const response = await api.post("/api/members", {
        name: nameMember,
        email: emailMember,
        password: passwordMember,
        clientId: userid,
      });

      if (response.status === 201) {
        alert("Membro cadastrado com sucesso!");
        setMemberId(response.data.id);
      } else {
        alert("Falha ao realizar cadastro. Tente novamente.");
      }

      setNameMember("");
      setEmailMember("");
      setPasswordMember("");

      getDataMembers();
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
  };

  const handleRemoveMember = async (id) => {
    try {
      await api.delete(`/api/members/${id}`);
      getDataMembers();
    } catch (error) {
      console.error("Erro ao remover dados:", error);
    }
  };

  return userid ? (
    <main className="w-full h-screen flex justify-center bg-slate-700 gap-20">
      <section className="flex flex-col mt-4">
        <button
          onClick={() => handleOpenModal("listPhone")}
          className="cursor-pointer bg-white p-4 text-black font-bold rounded-2xl w-60 mb-2"
        >
          Listar Telefones
        </button>
        <div
          className="flex flex-col w-60"
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
      <section className="flex flex-col mt-4">
        <button
          onClick={() => handleOpenModal("registerPhone")}
          className="cursor-pointer bg-white p-4 text-black font-bold rounded-2xl w-60 mb-2"
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
      <section className="flex flex-col mt-4">
        <button
          onClick={() => handleOpenModal("addMember")}
          className="cursor-pointer bg-white p-4 text-black font-bold rounded-2xl w-60 mb-2"
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
      <section className="flex flex-col mt-4">
        <button
          onClick={() => handleOpenModal("listMembers")}
          className="cursor-pointer bg-white p-4 text-black font-bold rounded-2xl w-60 mb-2"
        >
          Listar Membros
        </button>
        <div
          className="flex flex-col w-60"
          style={{
            maxHeight: activeModal === "listMembers" ? "none" : "0px",
            overflow: "hidden",
            transition: "max-height 0.3s, opacity 0.3s",
            opacity: activeModal === "listMembers" ? 1 : 0,
          }}
        >
          {activeModal === "listMembers" && modalListMembers()}
        </div>
      </section>
    </main>
  ) : null;
}
