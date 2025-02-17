import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <header className="flex w-full justify-between p-4 gap-22 bg-slate-950 text-white">
      <a href="/dashboard" className="text-2xl font-bold">
        <h1>DESAFIO</h1>
      </a>
      <div className="flex items-center gap-4 md:justify-around w-72 md:w-96 ">
        <a
          href="/dashboard/new"
          className="text-xs md:text-xl font-bold relative inline-block pb-1 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-white after:bottom-0 after:left-0 after:transition-width after:duration-700 after:ease-in-out hover:after:w-full"
        >
          Novo Telefone
        </a>
        <a
          href="/dashboard/config"
          className="text-xs md:text-xl font-bold relative inline-block pb-1 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-white after:bottom-0 after:left-0 after:transition-width after:duration-700 after:ease-in-out hover:after:w-full"
        >
          Novo Membro
        </a>
        <button
          className="cursor-pointer hover:scale-110"
          onClick={handleLogout}
        >
          <FiLogOut size={24} color="#FFF" className="hover:text-red-400"/>
        </button>
      </div>
    </header>
  );
}
