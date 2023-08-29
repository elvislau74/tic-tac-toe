import LoginForm from "../components/LoginForm";
import SignupForm from '../components/SignupForm';
import LoginCheck from "../components/LoginCheck";
import Nav from "../components/Nav";

export default function Login(props) {
    return (
        <>
            <LoginCheck />
            <Nav />
            <h1>Login</h1>
            <LoginForm />
            <h1>Signup</h1>
            <SignupForm />
        </>
    )
}