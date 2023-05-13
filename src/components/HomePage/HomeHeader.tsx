import { Link } from "react-router-dom"
import styled from "styled-components"
import { getProfileData } from "../../features/profileData/profileDataSlice";
import { useSelector } from "react-redux";

const navigationItems = [
    { name: "home", href: "#home" },
    { name: "about", href: "#about" },
    { name: "overview", href: "#overview" },
    { name: "contact", href: "#contact" },
]

export function HomeHeader() {

    const profileData = useSelector(getProfileData);
    // const profileData = false;

    return (
        <>
            <Header>
                <nav>
                    <Logo>Logo</Logo>
                    <Navigation>
                        {
                            navigationItems.map((item, index) => (
                                <li key={index}>
                                    <a href={item.href}>{item.name}</a>
                                </li>
                            ))
                        }
                    </Navigation>

                    {
                        profileData
                            ? <ProfileDataContainer>
                                <div>{profileData.username}</div>
                                <Button to="/" className="logout-btn">
                                    Sair
                                </Button>
                            </ProfileDataContainer>

                            : <LoginNavigation>
                                <Button to="register" className="register-btn">
                                    Registrar
                                </Button>
                                <Button to="login" className="login-btn">
                                    Entrar
                                </Button>
                            </LoginNavigation>
                    }
                </nav>
            </Header>
        </>
    )
}


const Header = styled.header`
    width: 100%;
    padding: 0 1rem;
    & > nav {
        width: 100%;
        min-height: 6rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
`

const Logo = styled.div`
`

const Navigation = styled.ul`
    width: 100%;
    max-width: 60rem;
    display: flex;
    justify-content: space-between;
`

const LoginNavigation = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`

const Button = styled(Link)`
    cursor:pointer;

    &.register-btn {
        &:hover {
            text-decoration: underline;
        }
    }

    &.login-btn {
        border: 0;
        border-radius: 0.4rem;
        padding: 1rem;
        background-color: var(--primary-button-color);
        transition: background-color 0.3s;

        &:hover {
            background-color: var(--primary-button-hover-color);
        }
    }
`
const ProfileDataContainer = styled.div`

`