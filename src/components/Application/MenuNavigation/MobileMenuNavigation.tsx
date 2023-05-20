import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { getProfileData } from "../../../features/profileDataSlice";
import { logout } from "../../../features/authSlice";
import { axiosPrivate } from "../../../api/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { RiHomeLine } from "react-icons/ri"
import { BsFilePerson, BsGearFill } from "react-icons/bs"
import { GiAnvil } from "react-icons/gi"

const menuMainList = [
    { order: 1, name: "inicio", icon: <RiHomeLine />, href: "/app", fontSize: 3 },
    { order: 2, name: "personagens", icon: <BsFilePerson />, href: "/app/characters", fontSize: 2.6 },
    { order: 3, name: "criar", icon: <GiAnvil />, href: "/app/character-creation", fontSize: 3 },
]

export function MobileMenuNavigation() {

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
                <ul>
                    <ProfileContainer to="/app/account">
                        {
                            profileData
                                ? <AvatarContainer>
                                    <div>
                                        < img
                                            src={profileData.avatar_url}
                                            alt={`Imagem de avatar de ${profileData.username}`}
                                        />
                                    </div>
                                </AvatarContainer>
                                : <Skeleton circle height={40} width={40} />
                        }
                    </ProfileContainer>

                    <MainSection>
                        {
                            menuMainList.map(item =>
                                <MenuItem
                                    key={item.order}
                                    style={{ fontSize: `${item.fontSize}rem` }}
                                >
                                    <Link className="named-icon" to={item.href}>
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </Link>
                                </MenuItem>
                            )
                        }
                    </MainSection>
                    <MenuSection>
                        <MenuItem
                            style={{ fontSize: `2.4rem` }}
                        >
                            <div className="named-icon" >
                                <BsGearFill />
                                <span>configurações</span>
                            </div>
                        </MenuItem>
                    </MenuSection>
                </ul>
            </Container>
        </>
    )
}

const Container = styled.nav`
    background-color: var(--background-color);
    width: 100%;
    height: 5.4rem;

    padding: 0.4rem 0.8rem;

    position: fixed;
    bottom: 0;

    & > ul {
        height: 100%;
        display: flex;
        align-items: center;
        gap: 2rem;
    }
`

const ProfileContainer = styled(Link)`

    display: flex;
    align-items: center;

    padding: 0.4rem;
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
        width: 3.8rem;
        height: 3.8rem;
        background-color: var(--medium-background-color);


        & > img {
            background-color: white;
            border: 0;
            width: 100%;
            object-fit: contain;
        }
    }
    
`

const MenuSection = styled.section`
    height: 100%;
    display: flex;
    gap: 1rem;
`

const MainSection = styled(MenuSection)`
    flex-grow: 1;
`

const MenuItem = styled.li` 
    display: flex;
    flex-direction: column;
    padding: 0 0.6rem;

    & .named-icon {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        & > *:first-child {
            flex-grow: 1;
        }
        & > span {
            font-size: 1.2rem;
        }
    }
    &:hover {
        background-color: var(--medium-background-color);
    }
`