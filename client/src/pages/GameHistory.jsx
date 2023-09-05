import LoginCheck from "../components/LoginCheck";
import { useLogin } from "../utils/LoginContext";
import { QUERY_GAMES } from '../utils/queries';
import { useQuery } from '@apollo/client';
import GameCells from "../components/GameCells";
import "../styles/GameHistory.css"

export default function GameHistory(props) {

    const [state, dispatch] = useLogin();
    const { loading, data: gameData } = useQuery(QUERY_GAMES);

    const games = gameData?.games || [];
    let cellsFilled, win, draw;

    const handleClick = () => {};

    return (
        <>
            <LoginCheck />

            {state.loggedIn ? (
                <>
                    {loading ? (
                        <></>
                    ) : (
                        <div className="gh-spacing">
                            <h1>Game History</h1>
                            {games.map((game, index) => (
                                cellsFilled = games[index].cellsFilled,
                                win = games[index].win,
                                draw = games[index].draw,
                                <div className="past-game" key= {game._id}>
                                    <div className="results">
                                        <h2>Game results:</h2>
                                        {win ? (
                                            <>
                                                Player O won!
                                            </>
                                        ) : (
                                            <>                                            
                                            {draw ? (
                                                <>This game ended in a draw!</>
                                            ) : (
                                                <>Player X won!</>
                                            )}
                                            </>
                                        )}
                                    </div>
                                    <div className="game-board">
                                        <div className="game-row">
                                            <GameCells cellIndex={0} value={cellsFilled[0]} handleClick={handleClick} gameOver={false}/>
                                            <GameCells cellIndex={1} value={cellsFilled[1]} handleClick={handleClick} gameOver={false}/>
                                            <GameCells cellIndex={2} value={cellsFilled[2]} handleClick={handleClick} gameOver={false}/>
                                        </div>
                                        <div className="game-row">
                                            <GameCells cellIndex={3} value={cellsFilled[3]} handleClick={handleClick} gameOver={false}/>
                                            <GameCells cellIndex={4} value={cellsFilled[4]} handleClick={handleClick} gameOver={false}/>
                                            <GameCells cellIndex={5} value={cellsFilled[5]} handleClick={handleClick} gameOver={false}/>
                                        </div>
                                        <div className="game-row">
                                            <GameCells cellIndex={6} value={cellsFilled[6]} handleClick={handleClick} gameOver={false}/>
                                            <GameCells cellIndex={7} value={cellsFilled[7]} handleClick={handleClick} gameOver={false}/>
                                            <GameCells cellIndex={8} value={cellsFilled[8]} handleClick={handleClick} gameOver={false}/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ):(
                <div className="gh-spacing2">
                Please log in to view your game history.
                </div>
                )}
        </>
    )
};