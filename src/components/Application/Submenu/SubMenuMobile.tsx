import { Link } from "react-router-dom"
import styled from "styled-components"
import ScrollContainer from 'react-indiana-drag-scroll'
import { useState } from "react"

interface Props {
    menuList: {
        order: number
        name: string
        href: string
    }[]
}

export function SubMenuMobile({ menuList }: Props) {

    const [selectedOption, setSelectedOption] = useState(1)

    return (
        <>
            <Container
                vertical={false}
            >
                <List>
                    {
                        menuList.map(item =>
                            <li
                                key={item.order}
                                className={selectedOption === item.order ? "selected-option" : ""}
                                onClick={() => setSelectedOption(item.order)}
                            >
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
    width: 100%;
    user-select: none;
    overflow-x:hidden;
`

const List = styled.ul`
    
    text-transform: uppercase;
    white-space: nowrap;
    font-size: 1.4rem;

    width: 100%;
    display: flex;

    & > li {
        cursor: pointer;
        padding: 1rem;
        border: 0.1rem solid transparent;
        color: var(--secondary-text-color);
        transition: border 0.3s, color 0.3s;

        &.selected-option {
            color: var(--primary-text-color);
            border-bottom: 0.1rem solid var(--primary-text-color);
        }
    }
`
