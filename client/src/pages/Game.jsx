import Nav from '../components/Nav.jsx';
import LoginCheck from '../components/LoginCheck.jsx';
import { useLogin } from '../utils/LoginContext';
import GameBoard from '../components/GameBoard.jsx';

export default function Game(props) {
    const [ state, dispatch ] = useLogin();

    return (
        <>
            <LoginCheck />
            <Nav />
            {state.loggedIn ? (
                <>
                <h1>Tic Tac Toe</h1>
                <GameBoard />
                </>
            ) : (    
                <>
                    Please login or signup to play the game.
                </>
            )}
        </>
    )
}