import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [userid, setUserId] = useState(null);
  const [data, setData] = useState([]);
  const [dataMembers, setDataMembers] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storageUserId = localStorage.getItem("userId");
    if (storageUserId) {
      setUserId(storageUserId);
    } else {
      navigate("/");
    }
  }, [navigate]);

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

  const handleOpenModal = (modalName) => {
    setActiveModal(activeModal === modalName ? null : modalName);
  };

  const modalListPhone = () => {
    return (
      <div className="flex flex-col gap-3 text-white">
        {data.map((item) => (
          <div className="bg-slate-950 rounded-lg h-20 flex" key={item.id}>
            <div className="h-full bg-green-600 w-3 mr-6"></div>
            <div className="flex flex-col justify-center">
              <p className="text-xl uppercase font-medium">
                Nome:<a className="font-normal text-lg "> {item.name}</a>
              </p>
              <p className="text-xl uppercase font-medium">
                Tel: <a className="font-normal text-lg ">{item.phone}</a>
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const modalListMembers = () => {
    return (
      <div className="flex flex-col gap-3 text-white">
        {dataMembers.map((item) => (
          <div className="bg-slate-950 rounded-lg h-20 flex" key={item.id}>
            <div className="h-full bg-green-600 w-3 mr-6"></div>

            <div className="flex flex-col justify-center">
              <p className="text-xl uppercase font-medium">
                Nome:<a className="font-normal text-lg "> {item.name}</a>
              </p>
              <p className="text-xl uppercase font-medium">
                Tel: <a className="font-normal text-lg ">{item.email}</a>
              </p>
            </div>
            <button
              onClick={() => handleRemoveMember(item.id)}
              className="bg-red-600 p-2 text-white font-bold ml-auto cursor-pointer"
            >
              X
            </button>
          </div>
        ))}
      </div>
    );
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
    <main className="w-full h-screen flex justify-center bg-white gap-20">
      <section className="flex flex-col mt-4 w-xl">
        <button
          onClick={() => handleOpenModal("listPhone")}
          className="cursor-pointer bg-slate-950 p-4 text-white font-bold rounded-2xl text-2xl mb-2"
        >
          Listar Telefones
        </button>
        <div
          className="flex flex-col "
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
      <section className="flex flex-col mt-4 w-xl">
        <button
          onClick={() => handleOpenModal("listMembers")}
          className="cursor-pointer bg-slate-950 p-4 text-white font-bold rounded-2xl text-2xl mb-2"
        >
          Listar Membros
        </button>
        <div
          className="flex flex-col"
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
