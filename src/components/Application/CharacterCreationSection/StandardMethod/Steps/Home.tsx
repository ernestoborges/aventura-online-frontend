import { SubmitHandler, useForm } from "react-hook-form"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { INewCharacter, getNewCharacter, setNewCharacter } from "../../../../../features/newCharacter"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export function HomeStep() {

    const newCharacterData = useSelector(getNewCharacter);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedFile, setSelectedFile] = useState<File | undefined>()
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>()

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ defaultValues: newCharacterData, mode: "onSubmit" });


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
            const maxFileSize = 5 * 1024 * 1024; // 5MB (bytes)
            if (file.size > maxFileSize) {
                return
            }
        }

        setSelectedFile(file);
    }

    const onSubmit: SubmitHandler<INewCharacter> = (data) => {
        dispatch(setNewCharacter({ ...newCharacterData, ...data, avatar_file: selectedFile }));
        navigate("race");
    }

    useEffect(() => {
        if (!selectedFile) {
            setAvatarPreview(undefined)
            return
        }

        const objectUrl: string = URL.createObjectURL(selectedFile)
        setAvatarPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    useEffect(() => {
        if (newCharacterData.avatar_file)
            setSelectedFile(newCharacterData.avatar_file)
    }, [])

    return (
        <>
            <FormSection>
                <CustomForm onSubmit={handleSubmit(onSubmit)}>
                    <FormFieldSet>
                        <AvatarLabel>
                            <div>
                                <span>Avatar</span>
                            </div>
                            <label>
                                <img src={avatarPreview ? avatarPreview : "/images/profile.png"} />
                                <input
                                    className="file-input"
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    {...register("avatar_file")}
                                    onChange={handleFileChange}
                                />
                            </label>
                        </AvatarLabel>
                        <Label>
                            <div>
                                <span>Nome do personagem</span>
                                <span>{errors.name && "Campo obrigatório."}</span>
                            </div>
                            <div>
                                <input type="text" {...register("name", { required: true })} />
                            </div>
                        </Label>
                    </FormFieldSet>
                    <FormFooter>
                        <FormStepNavButtons>
                            <StepButton type="submit">
                                Próximo
                            </StepButton>
                        </FormStepNavButtons>
                    </FormFooter>
                </CustomForm>
            </FormSection>

        </>
    )
}

export const FormSection = styled.section`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`

export const CustomForm = styled.form`
    flex-grow: 1;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    @media (min-width: 776px) {
        max-width: 68rem;
    }
`

export const FormFieldSet = styled.fieldset`
    all: unset;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1rem 1rem;
    
    overflow: scroll;
`

const Label = styled.label`
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.4rem;

    & input:not(.file-input) {
        background-color: var(--background-color);
        border: 0;
        border-radius: 0.4rem;
        padding: 1rem;
        width: 100%;
        color: var(--primary-text-color);
    }

`

const AvatarLabel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    color: var(--secondary-text-color);
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.4rem;
    
    & > div {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    & > label {        
        & > img {
            width: 10rem;
            height: 10rem;
            object-fit: cover;
        }

        & > input {
            display: flex;
            flex-direction: column;

        
            opacity: 0;
            -moz-opacity: 0;
            filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0)
            z-index: -1;
            position: absolute;
        }
    }
`

export const FormFooter = styled.footer`
    
    width: 100%;

    display: flex;
    justify-content: flex-end;
    background-color: var(--background-color);
    border-bottom: 0.1rem solid var(--secondary-text-color);
`

export const FormStepNavButtons = styled.div`
    cursor: pointer;
    display: flex;
`

export const StepButton = styled.button`
    font-size: 1.2rem;
    border: 0;
    padding: 1rem;
    background-color: var(--background-color);
    color: var(--primary-text-color)
`