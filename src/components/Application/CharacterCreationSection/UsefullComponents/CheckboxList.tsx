import { useRef, useState } from "react";
import styled from "styled-components"

export function SelectionBox({
    choose,
    desc,
    type,
    from
}: Choice) {

    return (
        <Container>
            {desc}
            {optionSetTypeHandler(from, desc)}
        </Container>
    )
}

function optionTypeHandler(option: ChoiceOptions, name: string) {
    switch (option.option_type) {
        case "choice": return ChoiceOption({ ...option.choice!, name });
        case "reference": return CheckboxOption(option.item!);
        default: break;
    }
}

function optionSetTypeHandler(from: ChoiceFrom, name: string) {
    const renderedOptions = from.options!.map(option => optionTypeHandler(option, name));
    
    switch (from.option_set_type) {
        case "options_array":
            return (
                <OptionArrayContainer>
                    {renderedOptions}
                </OptionArrayContainer>
            )
        case "equipment_category": return
        case "resource_list": return
        default: break;
    }
}


function ChoiceOption({
    choose,
    desc,
    type,
    from,
    name
}: Choice & { name: string }): JSX.Element {

    return (
        <>
            <ChoiceContainer key={desc}>
                <Label>
                    <input
                        type="radio"
                        name={name}
                    />
                    {desc}
                </Label>
                {optionSetTypeHandler(from, desc)}
            </ChoiceContainer>
        </>
    )
}


function CheckboxOption({
    index,
    name,
    url
}: APIResource) {

    return (
        <>
            <Label>
                <input
                    type="checkbox"
                />
                {name}
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

const OptionArrayContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`
