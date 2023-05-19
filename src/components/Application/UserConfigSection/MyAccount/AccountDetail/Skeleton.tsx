import Skeleton from "react-loading-skeleton"
import styled from "styled-components"

export function AccountDetailSectionSkeleton() {


    return (
        <>
            <Container>
                <Skeleton width={100} height={100} />
                <div>
                    <div>
                        <Skeleton height={14} width={150}/>
                        <Skeleton height={14} />
                    </div>
                    <div>
                        <Skeleton height={14} width={150}/>
                        <Skeleton height={14} />
                    </div>
                    <div>
                        <Skeleton height={14} width={150}/>
                        <Skeleton height={14} />
                    </div>
                    <div>
                        <Skeleton height={14} width={150}/>
                        <Skeleton height={14} />
                    </div>
                </div>
            </Container>
        </>
    )
}

const Container = styled.section`
    background-color: var(--background-color);
    padding: 2rem;
    border-radius: 0.4rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;

    & > div {
        max-width: 30rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
`