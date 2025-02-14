import { useNavigate } from "react-router-dom";

import(useNavigate);

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <header>
      <h1>DESAFIO</h1>
      <button onClick={handleLogout}>Sair</button>
    </header>
  );
}
