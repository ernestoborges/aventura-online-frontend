import styled from "styled-components";
import { ContainerTemplate } from "./ContainerTemplate";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setAuth } from "../../features/authSlice";

interface LoginFormInputs {
    username: string;
    password: string;
}

export function LoginForm() {

    const { register, handleSubmit } = useForm<LoginFormInputs>();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        setIsLoading(true);
        setLoginError("");
        axios.post(
            `${import.meta.env.VITE_BASE_URL}/login`,
            data,
            {
                withCredentials: true
            }
        )
            .then(response => {
                setIsLoading(false);
                return response
            })
            .then(response => {
                dispatch(setAuth(response.data.accessToken));
                navigate("/");
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err);
                if(err.response.status === 401){
                    setLoginError(err.response.data.message)
                }
            });

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
                                <span>{loginError && "Login ou senha inválidos"}</span>
                            </div>
                            <input className={loginError && "input-error"} type="username" {...register("username", { required: true })} required />
                        </Label>

                        <Label>
                            <div>
                                <span>Senha</span>
                                <span>{loginError && "Login ou senha inválidos"}</span>
                            </div>
                            <input className={loginError && "input-error"} type="password" {...register("password", { required: true })} required />
                        </Label>
                    </InputSection>
                    <Button type="submit">
                        {
                            isLoading
                                ? <PulseLoader
                                    size={5}
                                    color="white"
                                />
                                : "Entrar"
                        }
                    </Button>

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
        border: 0.1rem solid transparent;

        &.input-error {
            border: 0.1rem solid var(--danger-button-color)
        }

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

    height: 3.5rem;
    cursor: pointer;
    padding: 1rem;
    border: 0;
    border-radius: 0.4rem;
    color: var(--text-color);
    font-weight: bold;
    background-color: var(--primary-button-color);
    transition: background-color 0.3s;

    display: flex;
    justify-content: center;
    align-items: center;

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
