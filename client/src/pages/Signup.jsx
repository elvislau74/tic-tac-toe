import SignupForm from '../components/SignupForm';
import LoginCheck from "../components/LoginCheck";

export default function Login(props) {
    return (
        <>
            <LoginCheck />
            <h1>Signup</h1>
            <SignupForm />
        </>
    )
}