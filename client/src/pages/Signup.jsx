import SignupForm from '../components/SignupForm';
import LoginCheck from "../components/LoginCheck";
import '../styles/Signup.css';

// renders signup page with signup form component
export default function Signup(props) {
    return (
        <>
            <LoginCheck />
            <div className='signup-spacing'>
                <h1>Signup</h1>
                <SignupForm />
            </div>
        </>
    )
}