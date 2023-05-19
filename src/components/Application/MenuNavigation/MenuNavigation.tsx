import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { getProfileData } from "../../../features/profileDataSlice";
import { logout } from "../../../features/authSlice";
import { axiosPrivate } from "../../../api/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const menuMainList = [
    { order: 1, href: "/app/characters", name: "Meus personagens" },
    { order: 2, href: "/app/character-creation", name: "Criar novo personagem" },
]

export function MenuNavigation() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const profileData = useSelector(getProfileData);

    async function handleLogout() {
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.post('/logout', {
                signal: controller.signal
            });

            if (response) {
                dispatch(logout());
                navigate("/");
            }

        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
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
                    {
                        profileData
                            ? <ProfileContainer to="/app/account">
                                <AvatarContainer>
                                    <div>
                                        {
                                            profileData?.avatar_url &&
                                            < img
                                                src={profileData.avatar_url}
                                                alt={`Imagem de avatar de ${profileData.username}`}
                                            />
                                        }
                                    </div>
                                </AvatarContainer>
                                <span>
                                    {profileData?.username || <Skeleton />}
                                </span>
                            </ProfileContainer>
                            : <ProfileContainerSkeleton />
                    }

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
        overflow: hidden;
        width: 4rem;
        height: 4rem;
        background-color: var(--medium-background-color);


        & > img{
            background-color: white;
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


export function ProfileContainerSkeleton() {
    return (
        <>
            <ProfileContainerSkeletonWrapper>
                <Skeleton circle width={40} height={40} />
                <Skeleton height={16}/>
            </ProfileContainerSkeletonWrapper>
        </>
    )
}

const ProfileContainerSkeletonWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 1rem;

    & > *:nth-child(2){
        flex-grow: 1;
    }
`