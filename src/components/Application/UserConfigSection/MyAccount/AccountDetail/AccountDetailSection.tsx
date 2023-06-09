import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { getProfileData, setProfileImage } from "../../../../../features/profileDataSlice";
import { useState } from "react";
import { axiosPrivate } from "../../../../../api/axios";

export function AccountDetailSection() {
    const dispatch = useDispatch();
    const profileData = useSelector(getProfileData);


    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedImage(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedImage) return;

        const reader = new FileReader();
        reader.readAsDataURL(selectedImage);

        reader.onloadend = async () => {
            const controller = new AbortController();
            try {
                const response = await axiosPrivate.post('/upload-profile-image',
                    {
                        file: reader.result,
                        username: profileData?.username,
                        email: profileData?.email
                    },
                    {
                        signal: controller.signal,
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true
                    }
                )
                const avatarUrl = response.data.avatar_url;
                dispatch(setProfileImage(avatarUrl));
            } catch (err) {
                console.log("Erro ao fazer upload de imagem")
            }
        };
    };
    return (
        <>
            <Container>
                <AvatarContainer>
                    <AvatarWrapper>
                        <img src={profileData?.avatar_url} />
                    </AvatarWrapper>
                    <div>
                        <input type="file" onChange={handleImageChange} />
                        <button onClick={handleUpload}>Enviar Imagem</button>
                    </div>
                </AvatarContainer>
                <DetailsContainer>
                    <li>
                        <span>Nome de usuário</span>
                        <span>{profileData?.username}</span>
                    </li>
                    <li>
                        <span>E-mail</span>
                        <span>{profileData?.email}</span>
                    </li>
                    <li>
                        <span>Data de nascimento</span>
                        <span>{profileData?.birthDate}</span>
                    </li>
                    <li>
                        <span>Membro desde</span>
                        <span>{profileData && new Date(profileData.createdAt).toLocaleDateString()}</span>
                    </li>
                </DetailsContainer>
            </Container>
        </>
    )
}

const Container = styled.section`
    
    background-color: var(--background-color);
    padding: 2rem;
    border-radius: 0.4rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;

`

const AvatarContainer = styled.div`
    display: flex;
    flex-direction: column;

    gap: 2rem;

    & > div {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1rem;
    }

    @media (min-width: 775px) {
        flex-direction: row;
    }
`
const AvatarWrapper = styled.div`
    width: 10rem;
    height: 10rem;
    border: 0.1rem solid white;

    
    & > img {
        width: 100%;
        height: 100%;
        
        object-fit: contain;
    }

`

const DetailsContainer = styled.ul`

    display: flex;
    flex-direction: column;
    gap: 2rem;

    & > li {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;

        & > span:first-child {
            color: var(--secondary-text-color);
            text-transform: uppercase;
            font-size: 1.2rem;
            font-weight: bold;
        }

        & > span:last-child {

        }
    }
`