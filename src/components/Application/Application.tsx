import styled from "styled-components";
import { MenuNavigation } from "./MenuNavigation/MenuNavigation";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAccessToken } from "../../features/authSlice";
import { setProfileData } from "../../features/profileDataSlice";

export function Application() {

    const dispatch = useDispatch();
    const accessToken = useSelector(getAccessToken);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then(response => {
            dispatch(setProfileData(response.data));
            console.log(response.data);
        })
        .catch(err => console.log(err))
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