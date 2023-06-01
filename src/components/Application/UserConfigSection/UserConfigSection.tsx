import { Outlet } from "react-router-dom"
import styled from "styled-components"
// import { SubMenu } from "../Submenu/SubMenu"
import { SubMenuMobile } from "../Submenu/SubMenuMobile"
import { useEffect, useState } from "react";
import { SubMenu } from "../Submenu/SubMenu";

const userConnfigList = [
    { order: 1, name: "Minha conta", href: "" },

]

export function UserConfigSection() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <Container>
                {
                    windowWidth > 775
                        ? <SubMenu menuList={userConnfigList} />
                        : <SubMenuMobile menuList={userConnfigList} />
                }
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
    justify-self: start;

    display: flex;
    flex-direction: column;

    position: relative;

    @media (min-width: 775px) {
        flex-direction: row;
    }
`

const ConfigurationPainel = styled.section`
    padding: 2rem;
    flex-grow: 1;

`