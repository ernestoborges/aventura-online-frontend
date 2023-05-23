import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { HomePage } from "./components/HomePage/HomePage"
import { LoginForm } from "./components/Login/LoginForm"
import { RegisterForm } from "./components/Login/RegisterForm"
import { Application } from "./components/Application/Application"
import styled from "styled-components"
import { CharactersSection } from "./components/Application/CharactersSection/CharactersSection"
import { LandingPage } from "./components/LandingPage/LandingPage"
import { CharacterCreationSection } from "./components/Application/CharacterCreationSection/CaracterCreationSection"
import { UserConfigSection } from "./components/Application/UserConfigSection/UserConfigSection"
import { MyAccount } from "./components/Application/UserConfigSection/MyAccount/MyAccount"
import { StandardMethod } from "./components/Application/CharacterCreationSection/StandardMethod/StandardMethod"

export default function App() {

  return (
    <>
      <Container>
        <Wrapper>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />

              <Route path="/app" element={<Application />}>

                <Route path="/app/" element={<HomePage />} />

                <Route path="account" element={<UserConfigSection />}>
                  <Route path="/app/account/" element={<MyAccount />} />
                </Route>

                <Route path="characters" element={<CharactersSection />} />

                <Route path="builder" element={<CharacterCreationSection />} />
                <Route path="builder/standard" element={<StandardMethod />} />

              </Route>
            </Routes>
          </Router>
        </Wrapper>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;

  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 100%;
  max-width: 1440px;
`
