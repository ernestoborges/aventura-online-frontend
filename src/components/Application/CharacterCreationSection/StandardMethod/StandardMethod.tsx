import ScrollContainer from "react-indiana-drag-scroll"
import styled from "styled-components"
import { Outlet, useNavigate } from "react-router-dom";

const formSteps = [
    { order: 1, route: "/app/builder/standard/", name: "inicio" },
    { order: 2, route: "/app/builder/standard/race", name: "raça" },
    { order: 3, route: "/app/builder/standard/class", name: "classe" },
    { order: 4, route: "/app/builder/standard/abilities", name: "habilidades" },
    { order: 5, route: "/app/builder/standard/description", name: "descrição" },
    { order: 6, route: "/app/builder/standard/equipment", name: "equipamentos" },
    { order: 7, route: "/app/builder/standard/finish", name: "concluir" },
]

export interface CreationFormInputs {
    avatar_file: File
    name: string
}

export function StandardMethod() {

    const navigate = useNavigate();

    const getLinkClassName = (path: string) => {
        return (
            "nav-link disabled " + (path === location.pathname ? "current-step" : undefined)
        );
    }

    return (
        <>
            <Container>
                <Header>
                    <h2>Criação de personagem</h2>
                    <nav>
                        <NavigationList>
                            {
                                formSteps.map(step =>
                                    <div
                                        key={step.order}
                                        className={getLinkClassName(step.route)}
                                        onClick={() => navigate(step.route)}
                                    >
                                        {
                                            step.name
                                        }
                                    </div>
                                )
                            }
                        </NavigationList>
                    </nav>
                </Header>
                <Outlet />
                
            </Container>
        </>
    )
}

const Container = styled.div`
    padding: 0 0 5.4rem;
    height: 100%;
    display: flex;
    flex-direction: column;

    @media (min-width: 776px) {
        padding: 0;
    }

`

const Header = styled.header`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 1rem 0;
    background-color: var(--background-color);

`

const NavigationList = styled(ScrollContainer)`
    display: flex;
    
    & > div {
        padding: 1rem;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        font-size: 1.2rem;
        border: 0.1rem solid transparent;

        &.current-step {
            color: var(--primary-text-color);
            border-bottom: 0.1rem solid var(--primary-text-color);
        }
    }

    @media (min-width: 776px) {
        justify-content: center;
    }
`

