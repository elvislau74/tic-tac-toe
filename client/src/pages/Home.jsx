import { useLogin } from "../utils/LoginContext"
import LoginCheck from "../components/LoginCheck"

export default function Home(props) {
    const [ state, dispatch ] = useLogin();

    const userData = state.user || {message: 'You are not logged in. Please login or signup to continue.'};
    return (
        <>
            <LoginCheck />
            {state.loggedIn ? (
            <>
                <div className="pad">
                    <h1>Welcome, {userData.username}!</h1>
                    <p>Click On Play Game to Start Playing!</p>
                    {/* <pre>{JSON.stringify(userData, null, 2)}</pre> */}
                </div>
            </>
            ) : (
                <div className="pad">
                Welcome! Please login or signup to play some Tic Tac Toe!
                </div>
            )}
            
        </>
    )
};