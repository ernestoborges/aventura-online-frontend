import styled from "styled-components";
import { ContainerTemplate } from "./ContainerTemplate";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginFormInputs {
    username: string;
    password: string;
}

export function LoginForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        axios.post(
            `${import.meta.env.VITE_BASE_URL}/login`,
            data,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then(async response => {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/");
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <ContainerTemplate>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Header>
                        <h2>Login</h2>
                    </Header>
                    <InputSection>
                        <Label>
                            <div>
                                <span>Usuário</span>
                                <span>{errors.username && "Nome de usuário é obrigatório"}</span>
                            </div>
                            <input type="username" {...register("username", { required: true })} />
                        </Label>

                        <Label>
                            <div>
                                <span>Senha</span>
                                <span>{errors.password && "Senha é obrigatória"}</span>
                            </div>
                            <input type="password" {...register("password", { required: true })} />
                        </Label>
                    </InputSection>

                    <Button type="submit">Entrar</Button>

                    <Footer>
                        <p>Ainda não possui uma conta? <CustomLink to="/register">Crie uma</CustomLink></p>
                    </Footer>
                </Form>
            </ContainerTemplate>
        </>
    )
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

export const Header = styled.header`
    width: 100%;
    display: flex;
    justify-content: center;
`
const InputSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const Label = styled.label`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    & > div {
        width: 100%;
        display: flex;
        justify-content: space-between;

        & > span:first-child {
            text-transform: uppercase;
            font-size: 1.2rem;
            letter-spacing: 0.2rem;
        }

        & > span:last-child {
            font-size: 1.2rem;
            color: var(--danger-button-color);
        }
    }

    & > input {
        width: 100%;
        border: 0;
        border-radius: 0.4rem;
        padding: 1rem;

        color: var(--text-color);
        background-color: var(--dark-background-color);

        &[type="date"]{
            cursor: text;
        }

        ::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
        }
    }
`

export const Button = styled.button`
    cursor: pointer;
    padding: 1rem;
    border: 0;
    border-radius: 0.4rem;
    color: var(--text-color);
    font-weight: bold;
    background-color: var(--primary-button-color);
    transition: background-color 0.3s;

    &:hover {
        background-color: var(--primary-button-hover-color);
    }
`

export const Footer = styled.footer`
    font-size: 1.2rem;    
`

export const CustomLink = styled(Link)`
    cursor: pointer;
    color: var(--link-color);
    &:hover {
        text-decoration: underline;
    }
`
