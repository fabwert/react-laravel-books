import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import Layout from "./components/Layout";
import LoginModal from "./components/LoginModal";
import useTokenRefresh from "./hooks/token";

function App() {

  useTokenRefresh();

  return (
    <BrowserRouter>
        <Layout />
        <div className="pt-5">
        <Routes>
          <Route index element={<HomePage />} />
        </Routes>
        </div>
        <LoginModal />
    </BrowserRouter>
  );
}

export default App;
