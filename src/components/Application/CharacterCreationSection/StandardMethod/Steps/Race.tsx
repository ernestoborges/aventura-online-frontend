import styled from "styled-components"
import { CreationFormInputs } from "../StandardMethod"
import { UseFormRegister } from "react-hook-form"

interface Props {
    register: UseFormRegister<CreationFormInputs>
}

export function RaceStep({ register }: Props) {
    return (
        <>
            <Container>
                Race
            </Container>
        </>
    )
}

const Container = styled.section`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`