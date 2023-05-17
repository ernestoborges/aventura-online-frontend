import { useEffect } from "react";
import { HomePage } from "../HomePage/HomePage";
import { useNavigate } from "react-router-dom";

export function LandingPage() {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/app")
        }
    }, []);

    return (
        <>
            <HomePage />
        </>
    )
}