import styled from "styled-components";
import { MenuNavigation } from "./MenuNavigation/MenuNavigation";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProfileData } from "../../features/profileDataSlice";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

export function Application() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

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

    return (
        <>
            <Container>
                <MenuNavigation />
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
`

const AppContainer = styled.main`
    height: 100%;
    width: 100%;    

    display: flex;
    flex-direction: column;
    background-color: var(--medium-background-color);

`