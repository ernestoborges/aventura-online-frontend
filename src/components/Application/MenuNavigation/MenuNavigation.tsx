import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { getProfileData } from "../../../features/profileDataSlice";
import { logout } from "../../../features/authSlice";

const menuMainList = [
    { order: 1, href: "/app/characters", name: "Meus personagens" },
    { order: 2, href: "/app/character-creation", name: "Criar novo personagem" },
]

export function MenuNavigation() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const profileData = useSelector(getProfileData);

    function handleLogout() {
        dispatch(logout());
        navigate("/");
    }

    return (
        <>
            <Container>
                <Header>
                    <LogoContainer to="/app">
                        <div>
                            <span>Aventura</span>
                            <span>Online</span>
                        </div>
                    </LogoContainer>
                    <ProfileContainer to="/app/account">
                        <AvatarContainer>
                            <div>
                                <img
                                    src={ profileData?.avatar_url }
                                    alt={`Imagem de avatar de ${profileData?.username}`}
                                />
                            </div>
                        </AvatarContainer>
                        <span>
                            {profileData?.username}
                        </span>
                    </ProfileContainer>
                </Header>
                <MainSection>
                    <ul>
                        {
                            menuMainList.map(item =>
                                <MenuItem key={item.order}>
                                    <Link to={item.href}>
                                        {item.name}
                                    </Link>
                                </MenuItem>
                            )
                        }
                    </ul>
                </MainSection>
                <Footer>
                    <LogoffButton onClick={handleLogout}>
                        Sair
                    </LogoffButton>
                </Footer>
            </Container>
        </>
    )
}

const Container = styled.nav`
    background-color: var(--background-color);
    
    height: 100%;
    width: 100%;
    max-width: 24rem;
    padding: 1rem 2rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;
`

const Header = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const LogoContainer = styled(Link)`
    cursor: pointer;

    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

const ProfileContainer = styled(Link)`
    display: flex;
    align-items: center;
    gap: 1rem;

    padding: 0.8rem 1rem;
    border-radius: 0.4rem;
    cursor: pointer;

    &:hover {
        background-color: var(--medium-background-color);
    }
`

const AvatarContainer = styled.div`
    
    & > div {
        border: 0.1rem solid white;
        border-radius: 50%;
        background-color: white;
        overflow: hidden;

        width: 4rem;
        height: 4rem;

        & > img{
            border: 0;
            width: 100%;
            object-fit: contain;
        }
    }
    
`

const MainSection = styled.section`
    flex-grow:  1;
    font-size: 1.4rem;
    & > ul {
        display: flex;
        flex-direction: column;
        gap: 0;
    }
`

const MenuItem = styled.li`
    cursor: pointer;
    padding: 0.8rem 1rem;
    border: 0;
    border-radius: 0.4rem;
    
    &:hover {
        background-color: var(--medium-background-color);
    }
`

const Footer = styled.section`
    display: flex;
    justify-content: center;
`

const LogoffButton = styled.button`
    cursor: pointer;
    padding: 0.8rem 2rem;
    background-color: var(--danger-button-color);
    color: var(--text-color);
    border: 0;
    border-radius: 0.4rem;

    transition: backgorund-color 0.3s;

    &:hover {
        background-color: var(--danger-button-hover-color);
    }
`
