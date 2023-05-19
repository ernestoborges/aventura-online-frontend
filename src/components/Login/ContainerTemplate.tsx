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
    height: 100%;
    padding: 2rem;
    background-color: var(--medium-background-color);
    transition: height 0.3s;

    @media (min-width: 485px ){
        height: auto;
        max-width: 48rem;
        border-radius: 0.4rem;
    }

    
`