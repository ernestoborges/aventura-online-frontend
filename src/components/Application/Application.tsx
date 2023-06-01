import styled from "styled-components";
import { MenuNavigation } from "./MenuNavigation/MenuNavigation";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProfileData } from "../../features/profileDataSlice";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { MobileMenuNavigation } from "./MenuNavigation/MobileMenuNavigation";

export function Application() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/user', {
                    signal: controller.signal
                });
                isMounted && dispatch(setProfileData(response.data));
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <Container>

                {
                    windowWidth > 775
                        ? <MenuNavigation />
                        : <MobileMenuNavigation />
                }
                <AppContainer>
                    <Outlet />
                </AppContainer>
            </Container>
        </>
    )

}

const Container = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;

    @media (min-width: 775px){
        flex-direction: row;
    }
`

const AppContainer = styled.main`
    width: 100%;
    flex-grow: 1;
    max-height: 100%;

    display: flex;
    flex-direction: column;
    background-color: var(--medium-background-color);

`