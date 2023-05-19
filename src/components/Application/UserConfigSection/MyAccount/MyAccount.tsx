import styled from "styled-components"
import "react-loading-skeleton/dist/skeleton.css";
import { getProfileData } from "../../../../features/profileDataSlice";
import { useSelector } from "react-redux";
import { AccountDetailSection } from "./AccountDetail/AccountDetailSection";
import { AccountDetailSectionSkeleton } from "./AccountDetail/Skeleton";

export function MyAccount() {

    const profileData = useSelector(getProfileData);
    return (
        <>
            <Container>
                <Header>
                    <h2>Minha conta</h2>
                </Header>
                {
                    profileData
                    ? <AccountDetailSection />
                    : <AccountDetailSectionSkeleton />
                }
            </Container>
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const Header = styled.header`

`

