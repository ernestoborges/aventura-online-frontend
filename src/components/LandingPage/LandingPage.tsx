import { useEffect } from "react";
import { HomePage } from "../HomePage/HomePage";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../features/profileData/profileDataSlice";
import { useNavigate } from "react-router-dom";

export function LandingPage() {

    const navigate = useNavigate();
    const isProfileLoggedIn = useSelector(isLoggedIn);

    useEffect(() => {
        if (isProfileLoggedIn) {
            navigate("/app")
        }
    }, []);

    return (
        <>
            <HomePage />
        </>
    )
}