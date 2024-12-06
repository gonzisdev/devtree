import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginView from "./views/LoginView"
import RegisterView from "./views/RegisterView"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<LoginView />} />
        <Route path="/auth/register" element={<RegisterView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
