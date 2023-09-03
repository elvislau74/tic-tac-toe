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
    const cellsFilled = gameData?.games.cellsFilled || [];
    const win = gameData?.games.win || false;
    const draw = gameData?.games.draw || false;

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
                            {games.map((game) => (
                                <div className="past-game" key= {game._id}>
                                    <div className="results">
                                        <h2>Game results:</h2>
                                        {win ? (
                                            <>
                                                {draw ? (
                                                    <>This game ended in a draw!</>
                                                ) : (
                                                    <>Sweet Victory!</>
                                                )}
                                            </>
                                        ) : (
                                            <>Crushing Defeat! The computer won. </>
                                        )}
                                    </div>
                                    <div className="game-board">
                                        <div className="game-row">
                                            <GameCells cellIndex={0} value={cellsFilled[0]} handleClick={handleClick} gameOver={true}/>
                                            <GameCells cellIndex={1} value={cellsFilled[1]} handleClick={handleClick} gameOver={true}/>
                                            <GameCells cellIndex={2} value={cellsFilled[2]} handleClick={handleClick} gameOver={true}/>
                                        </div>
                                        <div className="game-row">
                                            <GameCells cellIndex={3} value={cellsFilled[3]} handleClick={handleClick} gameOver={true}/>
                                            <GameCells cellIndex={4} value={cellsFilled[4]} handleClick={handleClick} gameOver={true}/>
                                            <GameCells cellIndex={5} value={cellsFilled[5]} handleClick={handleClick} gameOver={true}/>
                                        </div>
                                        <div className="game-row">
                                            <GameCells cellIndex={6} value={cellsFilled[6]} handleClick={handleClick} gameOver={true}/>
                                            <GameCells cellIndex={7} value={cellsFilled[7]} handleClick={handleClick} gameOver={true}/>
                                            <GameCells cellIndex={8} value={cellsFilled[8]} handleClick={handleClick} gameOver={true}/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ):(
                <>
                Please log in to view your game history.
                </>
                )}
        </>
    )
};