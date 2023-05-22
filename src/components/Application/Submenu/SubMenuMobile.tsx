import { Link } from "react-router-dom"
import styled from "styled-components"
import ScrollContainer from 'react-indiana-drag-scroll'

interface Props {
    menuList: {
        order: number
        name: string
        href: string
    }[]
}

export function SubMenuMobile({ menuList }: Props) {

    return (
        <>
            <Container
                vertical={false}
            >
                <List>
                    {
                        menuList.map(item =>
                            <li key={item.order}>
                                <Link to={item.href}>
                                    {item.name}
                                </Link>
                            </li>
                        )
                    }
                </List>
            </Container >
        </>
    )
}

const Container = styled(ScrollContainer)`
    background-color: var(--background-color);
    padding: 1rem;

    width: 100%;
    cursor: grab;
    user-select: none;
    overflow-x:hidden;
`

const List = styled.ul`
    
    text-transform: uppercase;
    white-space: nowrap;
    font-size: 1.4rem;

    width: 100%;
    display: flex;
    gap: 2rem;
`
