import { Link } from "react-router-dom"
import styled from "styled-components"


interface Props {
    menuList: {
        order: number
        name: string
        href: string
    }[]
}

export function SubMenu({ menuList }: Props) {

    return (
        <>
            <Container>
                <ul>
                    {
                        menuList.map(item =>
                            <li key={item.order}>
                                <Link to={item.href}>
                                    {item.name}
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </Container>
        </>
    )
}

const Container = styled.section`
    background-color: var(--background-color);
    padding: 1rem;
    cursor: pointer;
`