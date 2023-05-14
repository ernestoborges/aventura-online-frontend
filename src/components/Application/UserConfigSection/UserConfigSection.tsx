import { Link, Outlet } from "react-router-dom"
import styled from "styled-components"

const userConnfigList = [
    { order: 1, name: "Minha Conta", href: "" },
]

export function UserConfigSection() {

    return (
        <>
            <Container>
                <SubMenu>
                    <ul>
                        {
                            userConnfigList.map(item =>
                                <li key={item.order}>
                                    <Link to={item.href}>
                                        {item.name}
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </SubMenu>
                <ConfigurationPainel>
                    <Outlet />
                </ConfigurationPainel>
            </Container>
        </>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`

const SubMenu = styled.section`
    background-color: var(--background-color);
    padding: 1rem;
    cursor: pointer;
`

const ConfigurationPainel = styled.section`
    padding: 2rem;
    flex-grow: 1;

`