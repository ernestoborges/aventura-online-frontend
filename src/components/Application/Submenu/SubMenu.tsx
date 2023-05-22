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
    border-left: 0.1rem solid var(--medium-background-color);

    & > ul {

        & > li {
            min-width: 14rem;
            cursor: pointer;
            font-size: 1.4rem;
            padding: 0.8rem 1rem;
            border: 0;
            border-radius: 0.4rem;
            color: var(--secondary-text-color);
            &:hover {
                background-color: var(--medium-background-color);
            }
        }
    }
`