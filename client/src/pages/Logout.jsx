import Auth from "../utils/auth";
import { useEffect } from "react";
import { useLogin } from "../utils/LoginContext";
import { LOGOUT } from "../utils/actions";
import { useNavigate } from "react-router-dom";

// Logs user out, deletes token, and redirects to home page
export default function Logout() {
    const [ state, dispatch ] = useLogin();
    const navigate = useNavigate();
    useEffect(() => {
        Auth.logout();
        dispatch({
            type: LOGOUT
        });
        navigate('/');
    }, []);

    return (
        <>
            Logout
        </>
    )
}