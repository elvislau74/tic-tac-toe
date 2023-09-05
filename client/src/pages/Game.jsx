import LoginCheck from '../components/LoginCheck.jsx';
import { useLogin } from '../utils/LoginContext';
import GameBoard from '../components/GameBoard.jsx';
import '../styles/Game.css';

// renders game page with gameboard component
export default function Game(props) {
    const [ state, dispatch ] = useLogin();

    return (
        <>
            <LoginCheck />
            {state.loggedIn ? (
                <div className='gamepage-spacing'>
                <h1>Tic Tac Toe</h1>
                <p>Click any square to start</p>
                <GameBoard />
                </div>
            ) : (    
                <div className='gamepage-spacing-2'>
                    Please login or signup to play the game.
                </div>
            )}
        </>
    )
}