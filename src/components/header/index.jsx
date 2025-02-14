import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <header className="flex w-full justify-between p-4 bg-slate-950 text-white">
      <h1>DESAFIO</h1>
      <button
        className="cursor-pointer hover:text-red-500 hover:scale-105"
        onClick={handleLogout}
      >
        Sair
      </button>
    </header>
  );
}
