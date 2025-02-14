import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Dashboard } from "./pages/dashboard";
import { Register } from "./pages/register";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={"/register"} element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route path={"/dashboard"} element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
