import { useState, useEffect } from 'react';
import { ADD_GAME } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { QUERY_GAMES } from '../utils/queries';
import { useLogin } from '../utils/LoginContext';
import GameCells from './GameCells.jsx';
import '../styles/Game.css'
import InfoModal from './InfoModal.jsx';

export default function GameBoard (props) {
    const [ board, setBoard ] = useState(["", "", "", "", "", "", "", "", ""]);

    const player1 = 'X';
    const player2 = 'O';

    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ]

    const [ turnCount, setTurnCount ] = useState(0);
    const [ player, setPlayer ] = useState(player1);
    const [ nextPlayer, setNextPlayer ] = useState(false);
    const [ turn, setTurn ] = useState(player1);
    const [ player1Clicked, setPlayer1Clicked ] = useState([]);
    const [ player2Clicked, setPlayer2Clicked ] = useState([]);
    const [ winner, setWinner ] = useState("");
    const [ infoModal, setInfoModal ] = useState({
        open: false,
        heading: "",
        message: ""
    });
    const [seed, setSeed] = useState(1);
    const [ gameOver, setGameOver ] = useState(false);
    const [won, setWon] = useState(false);
    const [draw, setDraw] = useState(false);

    const closeModal = async (event) => {
        setInfoModal({...infoModal, open: false});

        // refresh the component by selecting new numbers in useEffect
        setSeed(seed + 1);
    }

    const [ addGame, { error: errorAddingGame }] = useMutation(ADD_GAME, {
        update(cache, { data: { addGame } }) {
            try {
                const destructQuery = cache.readQuery({ query: QUERY_GAMES });
                
                if (destructQuery && destructQuery.hasOwnProperty("games")) {
                    const { games } = destructQuery;
                    console.log("Games", games);
                    cache.writeQuery({
                        query: QUERY_GAMES,
                        data: { games: [addGame, ...games] }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    });

    useEffect(() => {
        checkGameEnd();
    }, [board]);

    const [ state, dispatch ] = useLogin();

    const handleClick = async (event, cellIndex) => {
        event.preventDefault();

        const checkWinConditions = () => {
            let player1ClickedValues = [...player1Clicked];
            let player2ClickedValues = [...player2Clicked];
            let gameBoardValues = [...board];
            if (gameBoardValues[cellIndex] === "") {
                gameBoardValues[cellIndex] = turn === player2 ? player1 : player2;
            }
            if(turn === player1) {
                player1ClickedValues = [...player1ClickedValues, cellIndex];
            }
            else {
                player2ClickedValues = [...player2ClickedValues, cellIndex];
            }
            let turnCountVal = turnCount + 1;;
            const checkWin = () => {
                if (turnCountVal <= 9){
                    for(let i = 0; i < winConditions.length; i++) {
                        const condition = winConditions[i];
                        let checkPlayer = condition.every((value) => {
                            return player1ClickedValues.includes(value);
                        });
                        if (checkPlayer) {
                            return true;
                        }
                    }
                }
                return false;
    
            };
            const checkWin2 = () => {
                if (turnCountVal <= 9){
                    for(let i = 0; i < winConditions.length; i++) {
                        const condition = winConditions[i];
                        let checkPlayer = condition.every((value) => {
                            return player2ClickedValues.includes(value);
                        });
                        if (checkPlayer) {
                            return true;
                        }
                    }
                }
                return false;
    
            };
            const checkDraw = () => {
                if(turnCountVal >= 9) {
                    return true;
                }
                return false;
    
            };
            const changeState = (
                turnCountVal, 
                infoModalVal, 
                nextPlayerVal, 
                winnerVal, 
                wonVal, 
                drawValue, 
                gameOverVal, 
                playerVal
                ) => {
                setTurnCount(turnCountVal);
                setInfoModal(infoModalVal);
                setNextPlayer(nextPlayerVal);
                setWinner(winnerVal);
                setWon(wonVal);
                setDraw(drawValue);
                setGameOver(gameOverVal);
                setPlayer(playerVal);
            };
            if (checkWin()) {
                changeState(turnCountVal, {
                    ...infoModal,
                     open: true, 
                     heading: "Victory!", 
                     message: `Player O, you win!`
                    }, 
                    false, 
                    state.user.username,
                    true,
                    false,
                    true,
                    player2);
            } else if (checkWin2()) {
                changeState(turnCountVal, {
                    ...infoModal,
                     open: true, 
                     heading: "Victory!", 
                     message: `Player X, you win!`
                    }, 
                    true, 
                    state.user.username,
                    false,
                    false,
                    true,
                    player1);
    
            } else if (checkDraw()) {
                changeState(turnCountVal, {
                    ...infoModal,
                        open: true,
                        heading: "Draw!",
                        message: `It's a draw.`
                    },
                    false,
                    "",
                    false,
                    true,
                    true,
                    player1 === turn ? player2 : player1);
            }
            else {
                setTurnCount(turnCountVal);
                setTurn(turn === player1 ? player2 : player1);
            }
            if (turn === player1) {
                setPlayer1Clicked(player1ClickedValues);
            }
            else {
                setPlayer2Clicked(player2ClickedValues);
            }
            setBoard(gameBoardValues);
        }
        checkWinConditions();
    }

    const checkGameEnd = async() => {
        if (gameOver) {
            try {
                const { data } = await addGame({
                    variables: {
                        gameData: {
                            cellsFilled: board,
                            win: won,
                            draw: draw
                        }
                    }
                });
                console.log(data);
                
            } catch (error) {
                console.log(error);
                console.log(errorAddingGame);
            }
        }
    }
    
    useEffect(() => {
        setTurnCount(0);
        setNextPlayer(false);
        setPlayer1Clicked([]);
        setPlayer2Clicked([]);
        setBoard(
            board.map((val) => {
            return val = "";
        }));
        console.log(player1Clicked)
        setWinner("");
        setGameOver(false);
    }, [seed])

    return (
        <>
            <div className="game-board">
                <div className="game-row">
                    <GameCells cellIndex={0} value={board[0]} handleClick={handleClick} gameOver={gameOver}/>
                    <GameCells cellIndex={1} value={board[1]} handleClick={handleClick} gameOver={gameOver}/>
                    <GameCells cellIndex={2} value={board[2]} handleClick={handleClick} gameOver={gameOver}/>
                </div>
                <div className="game-row">
                    <GameCells cellIndex={3} value={board[3]} handleClick={handleClick} gameOver={gameOver}/>
                    <GameCells cellIndex={4} value={board[4]} handleClick={handleClick} gameOver={gameOver}/>
                    <GameCells cellIndex={5} value={board[5]} handleClick={handleClick} gameOver={gameOver}/>
                </div>
                <div className="game-row">
                    <GameCells cellIndex={6} value={board[6]} handleClick={handleClick} gameOver={gameOver}/>
                    <GameCells cellIndex={7} value={board[7]} handleClick={handleClick} gameOver={gameOver}/>
                    <GameCells cellIndex={8} value={board[8]} handleClick={handleClick} gameOver={gameOver}/>
                </div>
                {infoModal.open ? (
                    <InfoModal closeFunction={closeModal} heading={infoModal.heading} message={infoModal.message} />
                ) : (
                    <></>
                )}
            </div>
        </>
    )
}