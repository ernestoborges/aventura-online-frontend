import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { getProfileData, updateProfileImage } from "../../../../features/profileData/profileDataSlice";
import { useState } from "react";
import axios from "axios";

export function MyAccount() {

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
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_ENV_URL}/app/profile/upload-profile-image`,
                    {
                        file: reader.result,
                        username: profileData?.username,
                        email: profileData?.email
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                const avatarUrl = response.data.avatar_url;
                dispatch(updateProfileImage(avatarUrl));

            } catch (error) {
                console.log("Erro ao fazer upload de imagem")
            }
        };
    };

    return (
        <>
            <Container>
                <Header>
                    <h2>Minha conta</h2>
                </Header>
                <AccountDetailSection>
                    <AvatarContainer>
                        <AvatarWrapper>
                            <img src={profileData?.avatar} />
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

                </AccountDetailSection>
            </Container>
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const Header = styled.header`

`

const AccountDetailSection = styled.section`
    
    background-color: var(--background-color);
    padding: 2rem;
    border-radius: 0.4rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;

`

const AvatarContainer = styled.div`
    display: flex;
    gap: 2rem;

    & > div {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1rem;
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