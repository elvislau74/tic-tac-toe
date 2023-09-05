import LoginForm from "../components/LoginForm";
import LoginCheck from "../components/LoginCheck";
import "../styles/Login.css";

// renders login page with login form component
export default function Login(props) {
    return (
        <>
            <LoginCheck />
            <div className="login-spacing">
                <h1>Login</h1>
                <LoginForm />
            </div>
        </>
    )
}