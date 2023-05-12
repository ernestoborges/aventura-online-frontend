import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { HomePage } from "./components/HomePage/HomePage"
import { LoginForm } from "./components/Login/LoginForm"
import { RegisterForm } from "./components/Login/RegisterForm"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm /> } />

        </Routes>
      </Router>
    </>
  )
}

export default App
