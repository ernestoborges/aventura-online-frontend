import { Link } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"

interface Props {
    menuList: {
        order: number
        name: string
        href: string
    }[]
}

export function SubMenuMobile({ menuList }: Props) {

    const [containerKey, setContainerKey] = useState(0);
    const [leftConstraint, setLeftConstraint] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);

    const handleLeftConstraint = useCallback(() => {
        const containerElement = containerRef.current;
        if (containerElement) {
            setLeftConstraint(containerElement.scrollWidth - containerElement.offsetWidth);
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setContainerKey((prev) => prev + 1);
            handleLeftConstraint();
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleLeftConstraint]);

    return (
        <>
            <Container
                className="carousel"
                whileTap={{ cursor: "grabbing" }}
                ref={containerRef}
            >
                <List
                    className="scroll-container"
                    drag="x"
                    id="carousel-id"
                    key={containerKey}
                    dragConstraints={{
                        right: 0,
                        left: -leftConstraint
                    }}
                    onLoad={handleLeftConstraint}
                >
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
            </Container>
        </>
    )
}

const Container = styled(motion.div)`
    background-color: var(--background-color);
    padding: 1rem;

    width: 100%;
    cursor: grab;
    user-select: none;
    overflow-x: hidden;
`

const List = styled(motion.ul)`
    
    text-transform: uppercase;
    white-space: nowrap;
    font-size: 1.4rem;

    width: 100%;
    display: flex;
    gap: 2rem;
`