import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import styled from "styled-components"
import { getProfileData } from "../../../features/profileData/profileDataSlice";

const menuMainList = [
    { order: 1, href: "/app/characters", name: "Meus personagens" },
    { order: 2, href: "/app/character-creation", name: "Criar novo personagem" },
]

export function MenuNavigation() {

    const profileData = useSelector(getProfileData);

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
                    <ProfileContainer>
                        <AvatarContainer>
                            <div>
                                <img src="/images/profile.png" alt={`Imagem de avatar de ${profileData?.username}`} />
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
                                <li key={item.order}>
                                    <ItemLink to={item.href}>
                                        {item.name}
                                    </ItemLink>
                                </li>
                            )
                        }
                    </ul>
                </MainSection>
                <Footer>

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
    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

const ProfileContainer = styled.div`
    display: flex;
        align-items: center;
        gap: 1rem;
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

    font-size: 1.4rem;
    & > ul {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`

const ItemLink = styled(Link)`

`

const Footer = styled.section`

`
