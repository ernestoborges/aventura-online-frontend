import { Link } from "react-router-dom"
import styled from "styled-components"
import { useSelector } from "react-redux";
import { getProfileData } from "../../features/profileDataSlice";

export function MainHeader() {

    const profileData = useSelector(getProfileData);

    return (
        <>
            <Header>
                <nav>
                    <Logo>
                        <div>
                            <span>Aventura</span>
                            <span>Online</span>
                        </div>
                    </Logo>
                    {
                        !profileData &&
                        < LoginNavigation >
                            <Button to="/register" className="register-btn">
                                Registrar
                            </Button>
                            <Button to="/login" className="login-btn">
                                Entrar
                            </Button>
                        </LoginNavigation>
                    }
                </nav>
            </Header >
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
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        & > span:last-child {
            font-size: 1.6rem;
            text-transform: uppercase;
            letter-spacing: 0.2rem;
        }
    }
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