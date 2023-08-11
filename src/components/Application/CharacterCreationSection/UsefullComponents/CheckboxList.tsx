import { useState } from "react";
import styled from "styled-components"

interface IChoice extends Omit<Choice, 'type'> {
    type?: string;
}

interface IAPIResource extends Omit<APIResource, 'url'>{
    url?: string;
}

export function SelectionBox({
    choose,
    desc,
    from
}: IChoice) {

    return (
        <Container>
            {desc}
            <p>Choose {choose}:</p>
            <OptionSetTypeSelector choose={choose} desc={desc} from={from} />
        </Container>
    )
}

function OptionSetTypeSelector({
    choose,
    desc,
    from,
}: IChoice) {

    function setTypeHandler() {

        switch (from.option_set_type) {
            case "options_array": return <ArraySetType from={from} choose={choose} name={desc} />
            case "equipment_category": return
            case "resource_list": return
            default: break;
        }
    }

    return (
        <div>
            {setTypeHandler()}
        </div>
    )
}

function ArraySetType({
    from,
    name,
    choose
}: { from: ChoiceFrom; name: string; choose: number }) {

    const [selectedOptionsList, setSelectedOptionsList] = useState<number[]>([])

    function optionSelectionHandler(index: number) {
        let newList = [...selectedOptionsList]
        if (selectedOptionsList.length >= choose) {
            newList.shift();

        }
        newList.push(index);
        setSelectedOptionsList(newList);
    }

    function isSelectedHandler(index: number) {
        return selectedOptionsList.includes(index)
    }

    function optionTypeHandler(option: ChoiceOptions, name: string, index: number) {
        switch (option.option_type) {
            case "choice": return <ChoiceOption key={index} {...option.choice} name={name} index={index} optionSelectionHandler={optionSelectionHandler} isSelectedHandler={isSelectedHandler} />
            case "reference": return <CheckboxOption key={index} {...option.item!} optionIndex={index} optionName={name} optionSelectionHandler={optionSelectionHandler} isSelectedHandler={isSelectedHandler} />;
            default: break;
        }
    }

    return (
        <OptionsArrayContainer>
            {from.options!.map((option, index) => (
                optionTypeHandler(option, name, index)
            ))}
        </OptionsArrayContainer>
    )
}

function ChoiceOption({
    choose,
    desc,
    type,
    from,
    name,
    index,
    optionSelectionHandler,
    isSelectedHandler
}: Choice & { name: string; index: number; optionSelectionHandler: (index: number) => void; isSelectedHandler: (index: number) => boolean }): JSX.Element {

    return (
        <>
            <ChoiceContainer>
                <Label>
                    <input
                        type="checkbox"
                        name={name}
                        onClick={() => optionSelectionHandler(index)}
                        checked={isSelectedHandler(index)}
                    // onChange={(e) => setSelected(!selected)}
                    // value={desc}
                    />
                    {" "+desc}
                </Label>
                {/* {selected && <OptionsList from={from} name={name} />} */}
                {isSelectedHandler(index) && <OptionSetTypeSelector choose={choose} desc={desc} type={type} from={from} />}
            </ChoiceContainer>
        </>
    )
}


function CheckboxOption({
    index,
    name,
    optionName,
    optionIndex,
    optionSelectionHandler,
    isSelectedHandler
}: IAPIResource & { optionName: string; optionIndex: number; optionSelectionHandler: (index: number) => void; isSelectedHandler: (index: number) => boolean }) {

    return (
        <>
            <Label>
                <input
                    type="checkbox"
                    name={optionName}
                    value={index}
                    onClick={() => optionSelectionHandler(optionIndex)}
                    checked={isSelectedHandler(optionIndex)}
                />
                {name.split(":").length > 1 ? name.split(":")[1] : " "+name }
            </Label>
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`

`

const ChoiceContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const OptionsArrayContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`
