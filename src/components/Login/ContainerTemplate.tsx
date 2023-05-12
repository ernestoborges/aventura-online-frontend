import { ReactNode } from "react";
import styled from "styled-components"

interface ContainerTemplateProps {
    children: ReactNode;
}

export function ContainerTemplate({ children }: ContainerTemplateProps) {
    return (
        <>
            <Container>
                <FormContainer>
                    {children}
                </FormContainer>
            </Container>
        </>
    )
}

const Container = styled.main`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;

    background-image: url("/images/dnd5e-wallpaper-hd.jpg");
    background-size: cover;
    background-position: center bottom;
    background-repeat: no-repeat;

`

const FormContainer = styled.section`
    width: 100%;
    max-width: 48rem;
    padding: 2rem;
    border-radius: 0.4rem;
    background-color: var(--medium-background-color);

    transition: height 0.3s;
`