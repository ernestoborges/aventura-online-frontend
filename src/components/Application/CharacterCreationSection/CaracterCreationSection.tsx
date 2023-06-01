import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const buildMethods = [
    { order: 1, src: "standard", name: "Padrão", desc: "Criar um personagem passo-a-passo.", img: "/images/dnd5e-wallpaper-hd.jpg" },
]

export function CharacterCreationSection() {

    const navigate = useNavigate()

    return (
        <>
            <Container>
                <header>
                    <h2>Criação de personagens</h2>
                    <h3>Escolha o método de criação de personagens</h3>
                </header>
                <section>
                    <Grid>
                        {
                            buildMethods.map(method =>
                                <Card key={method.order} onClick={()=> navigate(`${method.src}`)} >
                                    <img src={method.img} />
                                    <section>
                                        <header>
                                            <h3>{method.name}</h3>
                                        </header>
                                        <p>{method.desc}</p>
                                    </section>
                                    <footer>
                                        Começar a criar
                                    </footer>
                                </Card>
                            )
                        }
                    </Grid>
                </section>
            </Container>
        </>
    )
}

const Container = styled.section`
    padding: 0.4rem 0.4rem 8rem;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    & > header {
        & > h2 {
            font-size: 2rem;
            text-transform: uppercase
        }
        & > h3 {
            font-size: 1.6rem;
            font-weight: normal;
            color: var(--secondary-text-color);
        }
    }
`

const Grid = styled.div`
    display: grid;
    column-gap: 1rem;
    row-gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-flow: dense;
`

const Card = styled.article`
    cursor pointer;
    max-width: 30rem;
    justify-self: center;
    background-color: var(--background-color);
   
    border: 0.1rem solid white;
    border-radius: 0.8rem;
    overflow: hidden;


    & > img {
        width: 100%;
        object-fit: contain;
    }

    & > section {
        padding: 2rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;

        & p {
            color: var(--secondary-text-color)
        }
    }

    & > footer {
        padding: 1rem;
        background-color: var(--dark-background-color);
        display: flex;
        justify-content: center;
    }
`