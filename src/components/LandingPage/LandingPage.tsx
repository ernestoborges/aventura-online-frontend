import { useEffect } from "react";
import { HomePage } from "../HomePage/HomePage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../features/authSlice";

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