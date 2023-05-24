import styled from "styled-components"
import { FormFooter, FormStep, FormStepContainer, FormStepNavButtons, StepButton } from "./Home"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getNewCharacter } from "../../../../../features/newCharacter";
import { useSelector } from "react-redux";



export function RaceStep() {
    const newCharacterData = useSelector(getNewCharacter);

    useEffect(() => {
        console.log(newCharacterData)
    }, [newCharacterData])

    return (
        <>
            <FormStepContainer>
                <FormStep>
                    {newCharacterData.name}
                    <FormFooter>
                        <FormStepNavButtons>
                            <PreviousStep to="/app/builder/standard/">
                                Anterior
                            </PreviousStep>
                            <StepButton>
                                Próximo
                            </StepButton>
                        </FormStepNavButtons>
                    </FormFooter>
                </FormStep>
            </FormStepContainer>
        </>
    )
}



const PreviousStep = styled(Link)`
    font-size: 1.2rem;
    border: 0;
    padding: 1rem;
    background-color: var(--background-color);
    color: var(--primary-text-color)
`