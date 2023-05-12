import { Link } from "react-router-dom"
import styled from "styled-components"

const navigationItems = [
    {name: "home", href:"#home"},
    {name: "about", href:"#about"},
    {name: "overview", href:"#overview"},
    {name: "contact", href:"#contact"},
]

export function HomeHeader(){
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
                    <LoginNavigation>
                        <Button to="register" className="register-btn">
                            Sign up
                        </Button>
                        <Button to="login" className="login-btn">
                            Login
                        </Button>
                    </LoginNavigation>
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