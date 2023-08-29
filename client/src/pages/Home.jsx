import { useLogin } from "../utils/LoginContext"
import LoginCheck from "../components/LoginCheck"
import Nav from "../components/Nav"

export default function Home(props) {
    const [ state, dispatch ] = useLogin();

    const userData = state.user || {message: 'You are not logged in. Please login or signup to continue.'};
    return (
        <>
            <LoginCheck />
            <Nav />
            <h1>Home</h1>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
        </>
    )
};