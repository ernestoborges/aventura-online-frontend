import ScrollContainer from "react-indiana-drag-scroll"
import styled from "styled-components"
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setDndApiRaceData, setDndApiSubraceData } from "../../../../features/dnd5eData/dnd5eData";

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

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dndApiUrl = "https://www.dnd5eapi.co";

    const getLinkClassName = (path: string) => {
        return (
            "nav-link disabled " + (path === location.pathname ? "current-step" : undefined)
        );
    }

    async function fetchDndApiData() {
        setIsLoading(true);
        try {
            const racesResponse = await axios.get(`${dndApiUrl}/api/races`)
            const subracesResponse = await axios.get(`${dndApiUrl}/api/subraces`)

            const [racesResponseResults, subracesResponseResults] = await Promise.all([racesResponse, subracesResponse]);

            const allRaces = racesResponseResults.data.results;
            const allSubraces = subracesResponseResults.data.results;

            const racesPromises = allRaces.map((race: { url: string }) => axios.get(`${dndApiUrl}${race.url}`));
            const subracesPromises = allSubraces.map((subrace: { url: string }) => axios.get(`${dndApiUrl}${subrace.url}`));

            const raceResponses = await Promise.all(racesPromises);
            const subraceResponses = await Promise.all(subracesPromises);

            const allRacesData = raceResponses.map((response: { data: any }) => response.data);
            const allSubracesData = subraceResponses.map((response: { data: any }) => response.data);
        
            dispatch(setDndApiRaceData(allRacesData));
            dispatch(setDndApiSubraceData(allSubracesData));
            
            setIsLoading(false);

        } catch (err) {
            console.error('Erro ao obter dados da dnd5eapi:', err);
        }
    }

    useEffect(() => {
        fetchDndApiData()
    }, [])

    return (
        <>
            {
                isLoading
                    ? "Carregando..."
                    :
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
            }
        </>
    )
}

const Container = styled.div`
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

