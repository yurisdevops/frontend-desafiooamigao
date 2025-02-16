import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Dashboard } from "./pages/dashboard";
import { Register } from "./pages/register";
import { New } from "./pages/new";
import { Config } from "./pages/config";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={"/register"} element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/dashboard/new"} element={<New />} />
        <Route path={"/dashboard/config"} element={<Config />} />
      </Route>
    </Routes>
  );
}

export default App;
