import { UseFormRegister } from "react-hook-form"
import styled from "styled-components"
import { CreationFormInputs } from "../StandardMethod"
import { useEffect, useState } from "react"

interface Props {
    register: UseFormRegister<CreationFormInputs>
}

export function HomeStep({ register }: Props) {

    const [selectedFile, setSelectedFile] = useState<File | undefined>()
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>()

    useEffect(() => {
        if (!selectedFile) {
            setAvatarPreview(undefined)
            return
        }

        const objectUrl: string = URL.createObjectURL(selectedFile)
        setAvatarPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setSelectedFile(file)
    }

    const maxFileSize = 5 * 1024 * 1024; // 5MB (bytes)

    return (
        <>
            <Container>
                <AvatarLabel>
                    <span>Avatar</span>
                    <div>
                        <img src={avatarPreview ? avatarPreview : "/images/profile.png"} />
                        <input
                            className="file-input"
                            type="file"
                            {...register("avatar_file", {
                                required: true,
                                validate: {
                                    maxSize: (value: File) => value.size <= maxFileSize || "O tamanho do arquivo deve ser menor ou igual a 5MB."
                                }
                            })}
                            onChange={handleFileChange}
                            accept=".jpg, .jpeg, .png"
                        />
                    </div>
                </AvatarLabel>
                <Label>
                    <div>
                        <span>Nome do personagem</span>
                    </div>
                    <div>
                        <input type="text" {...register("name", { required: true })} />
                    </div>
                </Label>
            </Container>
        </>
    )
}

const Container = styled.section`
    display: flex;
    flex-direction: column;
    gap: 2rem;
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