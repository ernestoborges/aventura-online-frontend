import styled from "styled-components";
import { ContainerTemplate } from "./ContainerTemplate";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, CustomLink, Footer, Header, Label } from "./LoginForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/profileData/profileDataSlice";
import { useNavigate } from "react-router-dom";


interface LoginFormInputs {
    email: string
    username: string;
    password: string;
    birthDate: string;
}

export function RegisterForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {

        axios.post(`${import.meta.env.VITE_BASE_URL}/register`,
            data,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then(response => {
                dispatch(loginSuccess(
                    {
                        ...response.data,
                        avatar: response.data.avatar_url ? response.data.avatar_url : "/images/profile.png"
                    }
                ));
                navigate("/");
            })
            .catch(err => console.log(err));

    };

    return (
        <>
            <ContainerTemplate>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Header>
                        <h2>Criar conta</h2>
                    </Header>
                    <InputSection>
                        <Label>
                            <div>
                                <span>Email</span>
                                <span>{errors.email && "Email é obrigatório"}</span>
                            </div>
                            <input type="email" {...register("email", { required: true })} />
                        </Label>

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

                        <Label>
                            <div>
                                <span>Data de nascimento</span>
                                <span>{errors.birthDate && "Data é obrigatória"}</span>
                            </div>
                            <input type="date" {...register("birthDate", { required: true })} />
                        </Label>
                    </InputSection>

                    <Button type="submit">Registrar</Button>

                    <Footer>
                        <p>Já possui uma conta? <CustomLink to="/login">Entre por aqui</CustomLink></p>
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

const InputSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`