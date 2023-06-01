import styled, { css } from "styled-components"
import { CustomForm, FormFieldSet, FormFooter, FormSection, FormStepNavButtons, StepButton } from "./Home"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRaceList, getSubraceList } from "../../../../../features/dnd5eData/dnd5eData";



export function RaceStep() {
    const raceList = useSelector(getRaceList);
    const subraceList = useSelector(getSubraceList);

    return (
        <>
            <FormSection>
                <CustomForm>
                    <FormFieldSet>
                        {
                            raceList.map((race, index) =>
                                race.subraces.length > 0
                                    ? <DropDown>
                                        <img src={`/images/races/${race.index}.jpeg`} />
                                        {race.name}
                                        {
                                            subraceList
                                                .filter(subrace => race.index === subrace.race.index)
                                                .map((subrace) =>
                                                    <RadioLabel key={index}>
                                                        <img src={`/images/races/${subrace.index}.jpeg`} />
                                                        <input type="radio" name="selectedRace" value={race.index} />
                                                        {subrace.name}
                                                    </RadioLabel>
                                                )
                                        }
                                    </DropDown>
                                    : <RadioLabel key={index}>
                                        <img src={`/images/races/${race.index}.jpeg`} />
                                        <input type="radio" name="selectedRace" value={race.index} />
                                        {race.name}
                                    </RadioLabel>
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

const RaceListItem = css`
    border: 0.1rem solid var(--primary-text-color);
`

const RadioLabel = styled.label`
    ${RaceListItem}
    & input {
        display: none;
    }
`

const DropDown = styled.div`
    ${RaceListItem}
    display: flex;
    flex-direction: column;
`