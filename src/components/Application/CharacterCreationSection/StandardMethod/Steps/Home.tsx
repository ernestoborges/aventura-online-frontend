import { SubmitHandler, useForm } from "react-hook-form"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { INewCharacter, getNewCharacter, setNewCharacter } from "../../../../../features/newCharacter"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export function HomeStep() {

    const [selectedFile, setSelectedFile] = useState<File | undefined>()
    const [fileData, setFileData] = useState({
        name: "",
        size: 0,
        type: ""
    })
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>()

    const newCharacterData = useSelector(getNewCharacter);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

        const file_data = {
            name: file ? file.name : "",
            size: file ? file.size : 0,
            type: file ? file.type : "",
        }

        setSelectedFile(file)
        setFileData(file_data);
    }

    const onSubmit: SubmitHandler<INewCharacter> = (data) => {
        dispatch(setNewCharacter({ ...newCharacterData, ...data, avatar_file: fileData }));
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


    return (
        <>
            <FormStepContainer>
                <FormStep onSubmit={handleSubmit(onSubmit)}>
                    <AvatarLabel>
                        <div>
                            <span>Avatar</span>
                        </div>
                        <div>
                            <img src={avatarPreview ? avatarPreview : "/images/profile.png"} />
                            <input
                                className="file-input"
                                type="file"
                                onChange={handleFileChange}
                                accept=".jpg, .jpeg, .png"
                            />
                        </div>
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
                    <FormFooter>
                        <FormStepNavButtons>
                            <StepButton type="submit">
                                Próximo
                            </StepButton>
                        </FormStepNavButtons>
                    </FormFooter>
                </FormStep>
            </FormStepContainer>
        </>
    )
}

export const FormStepContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

export const FormStep = styled.form`

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

const AvatarLabel = styled(Label)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    & > div {
        display: flex;
        align-items: center;
        gap: 1rem;

        & > img {
            width: 10rem;
            height: 10rem;
        }

        & > input {
            display: flex;
            flex-direction: column;
        }
    }
`

export const FormFooter = styled.footer`
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