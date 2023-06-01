import styled, { css } from "styled-components"
import { CustomForm, FormFieldSet, FormFooter, FormSection, FormStepNavButtons, StepButton } from "./Home"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRaceList, getSubraceList } from "../../../../../features/dnd5eData/dnd5eData";
import { useState } from "react";



export function RaceStep() {
    const raceList = useSelector(getRaceList);
    const subraceList = useSelector(getSubraceList);

    const [openedItems, setOpenedItems] = useState<number[]>([]);

    return (
        <>
            <FormSection>
                <CustomForm>
                    <FormFieldSet>
                        <RaceList>
                            {
                                raceList.map((race, index) =>
                                    race.subraces.length > 0
                                        ? <DropDown
                                            className={openedItems.includes(index) ? "dropdown-open" : ""}
                                            onClick={() => {
                                                if (openedItems.includes(index)) {
                                                    setOpenedItems(prev => [...prev.filter(n => n !== index)])
                                                } else {
                                                    setOpenedItems(prev => [...prev, index])
                                                }
                                            }

                                            }
                                        >
                                            <div>
                                                <img src={`/images/races/${race.index}.jpeg`} />
                                                {race.name}
                                            </div>
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
                        </RaceList>
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
const RaceList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const RaceListItem = css`
    padding: 1rem;
    border: 0.1rem solid var(--primary-text-color);
    border-radius: 0.4rem;

    & img {
        width: 4rem;
        height: 4rem;
    }
`

const RadioLabel = styled.label`
    ${RaceListItem}
    display: flex;
    align-items: center;
    gap: 1rem;
    
    & input {
        display: none;
    }
`

const DropDown = styled.div`
    ${RaceListItem}
    display: flex;
    flex-direction: column;
    gap: 1rem;

    max-height: 6.2rem;
    overflow: hidden;

    transition: max-height 1s;

    &.dropdown-open {
        max-height: none;
    }
`