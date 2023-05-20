import { Outlet } from "react-router-dom"
import styled from "styled-components"
import { SubMenu } from "../Submenu/SubMenu"
import { SubMenuMobile } from "../Submenu/SubMenuMobile"

const userConnfigList = [
    { order: 1, name: "Minha Conta", href: "" },
    { order: 2, name: "Minha Conta", href: "" },
    { order: 3, name: "Minha Conta", href: "" },
    { order: 4, name: "Minha Conta", href: "" },

]

export function UserConfigSection() {

    return (
        <>
            <Container>
                {/* <SubMenu menuList={userConnfigList} /> */}
                <SubMenuMobile menuList={userConnfigList} />
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
    flex-direction: column;

    position: relative;
`

const ConfigurationPainel = styled.section`
    padding: 2rem;
    flex-grow: 1;

`