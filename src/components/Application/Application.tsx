import styled from "styled-components";
import { MenuNavigation } from "./MenuNavigation/MenuNavigation";
import { Outlet } from "react-router-dom";

export function Application() {
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