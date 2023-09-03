import LoginCheck from '../components/LoginCheck.jsx';
import { useLogin } from '../utils/LoginContext';
import GameBoard from '../components/GameBoard.jsx';
import '../styles/Game.css';

export default function Game(props) {
    const [ state, dispatch ] = useLogin();

    return (
        <>
            <LoginCheck />
            <div className='gamepage-spacing'>
            {state.loggedIn ? (
                <>
                <h1>Tic Tac Toe</h1>
                <p>Click any square to start</p>
                <GameBoard />
                </>
            ) : (    
                <>
                    Please login or signup to play the game.
                </>
            )}
            </div>
        </>
    )
}