import { SubmitHandler, useForm } from "react-hook-form";
import { CustomForm, FormFieldSet, FormFooter, FormSection, FormStepNavButtons, StepButton } from "./Home";
import { INewCharacter, getNewCharacter, setNewCharacter } from "../../../../../features/newCharacter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PreviousStep, RaceDetails, SelectionLabel } from "./Race";
import { getClassList, setDndApiClassesData } from "../../../../../features/dnd5eData/dnd5eData";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { SelectionBox } from "../../UsefullComponents/CheckboxList";
import axios from "../../../../../api/axios";

export function CharacterClass() {

    const newCharacterData = useSelector(getNewCharacter);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const classList = useSelector(getClassList);

    const dndApiUrl = "https://www.dnd5eapi.co";

    const [selectedClass, setSelectedClass] = useState(classList.find(characterClass => characterClass.index === newCharacterData.characterClass) || classList[0]);
    const [selectedProficienciesCount, setSelectedProficienciesCount] = useState<number[][]>(
        selectedClass.proficiency_choices.map(() => [0])
    );

    const [featureList, setFeatureList] = useState<Feature[]>([]);

    const {
        handleSubmit,
    } = useForm({
        defaultValues: {
            ...newCharacterData,
        }, mode: "onSubmit"
    });

    const onSubmit: SubmitHandler<INewCharacter> = (data) => {
        dispatch(setNewCharacter({ ...newCharacterData, ...data }));
        navigate("race");
    }

    const fetchFeatureList = async (className: string | number): Promise<Feature[]> => {
        try {
            const featuresResponse = await axios.get(`${dndApiUrl}/api/classes/${className}/features`)
            const allFeatures = featuresResponse.data.results

            const featurePromises = allFeatures.map((feature: { url: string }) => axios.get(`${dndApiUrl}${feature.url}`));
            const featureResponses = await Promise.all(featurePromises);

            const allFeaturesData = featureResponses.map((response: { data: any }) => response.data);

            return allFeaturesData;
        } catch (error) {
            console.error('Erro ao obter dados da dnd5eapi:', error);
            return [];
        }
    }

    const handleClassSelection = async (e: React.ChangeEvent<HTMLSelectElement>) => {

        const foundClass = classList.find(characterClass => characterClass.index === e.target.value)
        if (foundClass) {
            setSelectedClass(foundClass)

            if (!foundClass.feature_list) {
                let fetchedFeatures: Feature[] = await fetchFeatureList(foundClass.index)
                console.log(fetchedFeatures)

                let newClassList = classList.map((jobClass) => {
                    if (jobClass.index === foundClass.index) {
                        return {
                            ...jobClass,
                            feature_list: fetchedFeatures
                        }
                    }
                    return jobClass
                })
                setFeatureList(fetchedFeatures);
                dispatch(setDndApiClassesData(newClassList));
            } else {
                setFeatureList(foundClass.feature_list)
            }
        }

    }

    useEffect(() => {
        setSelectedProficienciesCount(
            selectedClass.proficiency_choices.map(() => [0])
        )
        console.log(selectedProficienciesCount);
    }, [selectedClass])

    return (
        <>
            <FormSection>
                <CustomForm onSubmit={handleSubmit(onSubmit)}>
                    <FormFieldSet>
                        <SelectionLabel>
                            <select onChange={handleClassSelection}>
                                {
                                    classList.map((characterClass, index) =>
                                        <option
                                            key={index}
                                            value={characterClass.index}
                                        >
                                            {characterClass.name}
                                        </option>
                                    )
                                }
                            </select>
                        </SelectionLabel>
                        <ClassPreview>
                            <h3>{selectedClass.name}</h3>
                            <div>
                                <ul>
                                    <li>Hit Die: <span>{selectedClass.hit_die}</span></li>
                                    <li>Saves: <span>{selectedClass.saving_throws.map((save, index) => (
                                        selectedClass.saving_throws.length === index + 1
                                            ? `${save.name}`
                                            : `${save.name} & `
                                    ))}</span></li>
                                </ul>
                                <div>
                                    <ClassLogo path={`/images/classes/${selectedClass.index}.svg`} />
                                </div>
                            </div>
                        </ClassPreview>
                        <ClassDetails>
                            <h3>Características da Classe</h3>
                            <div>
                                <h4>Hit Points</h4>
                                <ul>
                                    <li>Hit Dice: <span>{`1d${selectedClass.hit_die} per ${selectedClass.index} level`}</span></li>
                                    <li>1st Level: <span>{`${selectedClass.hit_die} + Constitution modifier`}</span></li>
                                    <li>Higher Levels: <span>{`1d${selectedClass.hit_die} (or ${Math.ceil((selectedClass.hit_die + 1) / 2)}) + Constitution modifier per ${selectedClass.index} level after 1st`}</span></li>
                                </ul>
                            </div>
                            <div>
                                <h4>Proficiencies</h4>
                                <ul>
                                    {
                                        selectedClass.proficiencies.map((proficiencie, index) => (
                                            <li key={index}>{proficiencie.name}</li>
                                        ))
                                    }
                                </ul>
                                <h4>Proficiencies Choices</h4>
                                <ul>
                                    {
                                        selectedClass.proficiency_choices.map((proficiencie, index) => (
                                            <li key={index}>
                                                {SelectionBox(proficiencie)}
                                            </li>
                                        ))
                                    }
                                </ul>

                            </div>
                            <div>
                                <h4>Features List</h4>
                                <ul>
                                    {
                                        featureList &&
                                        featureList.map((feature, index) => (
                                            <li key={index}>{feature.name}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </ClassDetails>
                    </FormFieldSet>
                    <FormFooter>
                        <FormStepNavButtons>
                            <PreviousStep to="/app/builder/standard/race">
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

const ClassPreview = styled.div`
    & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > div {
            background-color: var(--dark-background-color);
            border-radius: 0.4rem;
            padding: 1rem;
        }
    }
`

const ClassDetails = styled(RaceDetails)`

`

const ClassLogo = styled.div<{ path: string }>`
    width: 10rem;
    height: 10rem;
    background-color: white;
    -webkit-mask: url(${props => props.path}) no-repeat center;
    mask: url(${props => props.path}) no-repeat center;
`