import styled from "styled-components"
import { CustomForm, FormFieldSet, FormFooter, FormSection, FormStepNavButtons, StepButton } from "./Home"
import { Link } from "react-router-dom";
import { getNewCharacter } from "../../../../../features/newCharacter";
import { useSelector } from "react-redux";
import { getRaceList, getSubraceList } from "../../../../../features/dnd5eData/dnd5eData";



export function RaceStep() {
    const newCharacterData = useSelector(getNewCharacter);
    const raceList = useSelector(getRaceList);
    const subraceList = useSelector(getSubraceList);

    return (
        <>
            <FormSection>
                <CustomForm>
                    <FormFieldSet>
                        {
                            raceList.map((race, index) =>
                                <div key={index}>
                                    {race.name}
                                    {
                                        race.subraces.length > 0 &&
                                        subraceList
                                            .filter((subrace) => race.index === subrace.race.index)
                                            .map((subrace, index) =>
                                                <div key={index}>
                                                    <p>{subrace.name}</p>
                                                    <p>{subrace.desc}</p>
                                                </div>
                                            )

                                    }
                                </div>
                            )
                        }
                       
                    </FormFieldSet>
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
                </CustomForm>
            </FormSection>
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