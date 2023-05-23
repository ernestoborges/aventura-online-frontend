import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form";
import ScrollContainer from "react-indiana-drag-scroll"
import styled from "styled-components"
import { HomeStep } from "./Steps/Home";
import { RaceStep } from "./Steps/Race";

const formSteps = [
    { order: 1, name: "inicio" },
    { order: 2, name: "raça" },
    { order: 3, name: "classe" },
    { order: 4, name: "habilidades" },
    { order: 5, name: "descrição" },
    { order: 6, name: "equipamentos" },
    { order: 7, name: "concluir" },
]

export interface CreationFormInputs {
    avatar_file: File
    name: string
}

export function StandardMethod() {

    const [currentStep, setCurrentStep] = useState<number>(1);
    const { register, handleSubmit } = useForm<CreationFormInputs>();

    const onSubmit: SubmitHandler<CreationFormInputs> = (data) => {
        alert(data)
    }

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        if (currentStep > 1)
            setCurrentStep(currentStep - 1);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <HomeStep register={register} />
            case 2: return <RaceStep register={register} />
            default: break
        }
    }

    return (
        <>
            <Container>
                <Header>
                    <h2>Criação de personagem</h2>
                    <nav>
                        <NavigationList>
                            {
                                formSteps.map(step =>
                                    <div
                                        key={step.order}
                                        className={currentStep === step.order ? "current-step" : ""}
                                    >
                                        {
                                            step.name
                                        }
                                    </div>
                                )
                            }
                        </NavigationList>
                    </nav>
                </Header>
                <FormSection>
                    <CharacterForm onSubmit={handleSubmit(onSubmit)}>
                        <FormWrapper>
                            {renderStep()}
                        </FormWrapper>
                    </CharacterForm>
                </FormSection>
                <Footer>
                    <StepNavButtons>
                        <PreviousStep onClick={handlePreviousStep}>
                            Anterior
                        </PreviousStep>
                        {
                            currentStep < formSteps.length
                                ? <StepButton onClick={handleNextStep} >
                                    Próximo
                                </StepButton>
                                : <StepButton type="submit" >
                                    Enviar
                                </StepButton>
                        }
                    </StepNavButtons>
                </Footer>
            </Container>
        </>
    )
}

const Container = styled.div`
    padding: 0 0 5.4rem;
    height: 100%;
    display: flex;
    flex-direction: column;

`

const Header = styled.header`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 1rem 0;
    background-color: var(--background-color);

`

const NavigationList = styled(ScrollContainer)`
    display: flex;
    
    & > div {
        padding: 1rem;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        font-size: 1.2rem;
        border: 0.1rem solid transparent;

        &.current-step {
            color: var(--primary-text-color);
            border-bottom: 0.1rem solid var(--primary-text-color);
        }
    }
`

const FormSection = styled.section`
    flex-grow: 1;
`

const CharacterForm = styled.form`
    padding: 1rem 1rem;
    display: flex;
    justify-content: center;
`

const FormWrapper = styled.div`
    width: 100%;
    max-width: 68rem;
`

const Footer = styled.footer`
    display: flex;
    justify-content: flex-end;
    background-color: var(--background-color);
    border-bottom: 0.1rem solid var(--secondary-text-color);
`

const StepNavButtons = styled.div`
    cursor: pointer;
    display: flex;
    
`

const StepButton = styled.button`
    border: 0;
    padding: 1rem;
    background-color: var(--background-color);
    color: var(--primary-text-color)
`

const PreviousStep = styled(StepButton)`
    border-left: 0.1rem solid var(--secondary-text-color);
    border-right: 0.1rem solid var(--secondary-text-color);
`