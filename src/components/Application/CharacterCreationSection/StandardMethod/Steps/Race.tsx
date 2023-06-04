import styled from "styled-components"
import { CustomForm, FormFieldSet, FormFooter, FormSection, FormStepNavButtons, StepButton } from "./Home"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRaceList, getSubraceList, getTraitList } from "../../../../../features/dnd5eData/dnd5eData";
import { useEffect, useState } from "react";
import { ISubrace } from "../../../../../features/dnd5eData/models/Subrace";
import { ITrait } from "../../../../../features/dnd5eData/models/Trait";



export function RaceStep() {
    const raceList = useSelector(getRaceList);
    const subraceList = useSelector(getSubraceList);
    const traitList = useSelector(getTraitList);

    const [selectedRace, setSelectedRace] = useState(raceList[0])
    const [selectedSubrace, setSelectedSubrace] = useState<ISubrace | null>(null);

    const [selectedRaceTrais, setSelectedRaceTraits] = useState<ITrait[]>([]);
    const [openedItems, setOpenedItems] = useState<string[]>([]);


    useEffect(() => {
        const raceTraits = selectedRace.traits.concat(selectedSubrace ? selectedSubrace.racial_traits : []);
        const traits = traitList.filter(traitIndex => raceTraits.map(trait => trait.index).includes(traitIndex.index))
        setSelectedRaceTraits(traits)

    }, [selectedRace, selectedSubrace])

    const handleTraitOptionSetType = (choice: Choice) => {
        switch (choice.from.option_set_type) {
            case "options_array": return choice.from.options.map((option, index) => <option key={index}>{option.item.name}</option>)
            default: return
        }
    }

    const handleSpecificTraitOptionSetType = (choice: Choice) => {
        if (choice.spell_options)
            switch (choice.spell_options.from.option_set_type) {
                case "options_array": return choice.spell_options.from.options.map((option, index) => <option key={index}>{option.item.name}</option>)
                default: return
            }
    }

    return (
        <>
            <FormSection>
                <CustomForm>
                    <FormFieldSet>
                        <RaceSelectionContainer>
                            <SelectionLabel>
                                <select
                                    onChange={(e) => {
                                        const foundRace = raceList.find(race => race.index === e.target.value)
                                        if (foundRace) {
                                            setSelectedRace(foundRace)
                                            if (foundRace.subraces.length > 0) {
                                                const foundSubrace = subraceList.find(subrace => subrace.index === foundRace.subraces[0].index)
                                                if (foundSubrace) {
                                                    setSelectedSubrace(foundSubrace)
                                                }
                                            } else {
                                                setSelectedSubrace(null)
                                            }
                                        }
                                    }}
                                >
                                    {
                                        raceList.map((race, index) =>
                                            <option
                                                key={index}
                                                value={race.index}
                                            >
                                                {race.name}
                                            </option>
                                        )
                                    }
                                </select>
                            </SelectionLabel>
                            {
                                selectedRace.subraces.length > 0 &&
                                <SelectionLabel>
                                    <select
                                        onChange={(e) => setSelectedRace(raceList[Number(e.target.value)])}
                                        defaultValue={selectedRace.subraces[0].index}
                                    >
                                        {
                                            selectedRace.subraces.map((subrace, index) =>
                                                <option
                                                    key={index}
                                                    value={subrace.index}
                                                >
                                                    {subrace.name}
                                                </option>
                                            )
                                        }
                                    </select>
                                </SelectionLabel>
                            }
                        </RaceSelectionContainer>
                        <RacePreview>
                            <img src={`/images/races/${selectedSubrace ? selectedSubrace.index : selectedRace.index}.jpeg`} />
                            <div>
                                <p>{selectedRace.name}{selectedSubrace && <span>{`(${selectedSubrace.name})`}</span>}</p>
                            </div>
                        </RacePreview>
                        <RaceDetails>
                            <h3>Características de Raça</h3>
                            <div>
                                {
                                    selectedRaceTrais.map((trait, index) =>
                                        <TraitContainer
                                            key={index}
                                            isOpened={openedItems.includes(trait.index)}
                                        >
                                            <div
                                                className="header"
                                                onClick={() => {
                                                    if (openedItems.includes(trait.index)) {
                                                        setOpenedItems(prev => [...prev.filter(n => n !== trait.index)])
                                                    } else {
                                                        setOpenedItems(prev => [...prev, trait.index])
                                                    }
                                                }}
                                            >
                                                {trait.name}
                                            </div>
                                            <div>
                                                {trait.desc && <p>{trait.desc}</p>}
                                                {
                                                    trait.proficiency_choices &&
                                                    <select>
                                                        {
                                                            handleTraitOptionSetType(trait.proficiency_choices)
                                                        }
                                                    </select>
                                                }
                                                {
                                                    trait.language_options &&
                                                    <select>
                                                        {
                                                            handleTraitOptionSetType(trait.language_options)
                                                        }
                                                    </select>
                                                }
                                                {
                                                    trait.trait_specific &&
                                                    <select>
                                                        {
                                                            handleSpecificTraitOptionSetType(trait.trait_specific)
                                                        }
                                                    </select>
                                                }
                                            </div>
                                        </TraitContainer>
                                    )
                                }
                                {
                                    selectedRace.language_options &&
                                    <TraitContainer
                                        isOpened={openedItems.includes(selectedRace.index + "-select-language")}
                                    >
                                        <div
                                            className="header"
                                            onClick={() => {
                                                if (openedItems.includes(selectedRace.index + "-select-language")) {
                                                    setOpenedItems(prev => [...prev.filter(n => n !== selectedRace.index + "-select-language")])
                                                } else {
                                                    setOpenedItems(prev => [...prev, selectedRace.index + "-select-language"])
                                                }
                                            }}
                                        >
                                            Idioma Adicional
                                        </div>
                                        <div>
                                            <p>Você pode falar, ler e escrever um idioma adicional, à sua escolha.</p>
                                            <select>
                                                {
                                                    handleTraitOptionSetType(selectedRace.language_options)
                                                }
                                            </select>
                                        </div>

                                    </TraitContainer>
                                }
                            </div>
                        </RaceDetails>
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
            </FormSection >
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

const RaceSelectionContainer = styled.div`
                display: flex;
                `

const SelectionLabel = styled.label`

                `

const RacePreview = styled.div`
                padding: 1rem;
                display: flex;
                gap: 1rem;

                & img {
                    width: 10rem;
                height: 10rem;
                border-radius: 0.4rem;
    }

    & > div {
                    display: flex;
                flex-direction: column;
                gap: 1rem;

        & > p {
            & > span {
                    color: var(--secondary-text-color);
            }
        } 
    }
                `

const RaceDetails = styled.div`
                display: flex;
                flex-direction: column;
                gap: 1rem;

    & > div {
                    display: flex;
                flex-direction: column;
                gap: 1rem;
    }
                `

const TraitContainer = styled.div<{ isOpened: boolean }>`

                border: 0.1rem solid var(--primary-text-color);

    & > div:nth-child(1){
                    background - color: var(--background-color);
                padding: 1rem 0.6rem;
    }
    
    & > div:nth-child(2){
                    height: ${props => props.isOpened ? "auto" : "0px"};
                overflow: hidden;
                padding:  ${props => props.isOpened ? "0.6rem" : "0"};
    }
                `