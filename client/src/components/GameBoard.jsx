import { useState, useEffect } from 'react';
import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { useLogin } from '../utils/LoginContext';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../utils/actions';
import Auth from '../utils/auth';
import GameCells from './GameCells.jsx';
import '../styles/Game.css'
import InfoModal from './InfoModal.jsx';

export default function GameBoard (props) {
    const gameField = document.getElementsByClassName("game-row");
    const [ board, setBoard ] = useState(["", "", "", "", "", "", "", "", ""]);

    const player1 = 'X';
    const player2 = 'O';

    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ]

    const [ turnCount, setTurnCount ] = useState(0);
    // const [ isChosen, setIsChosen ] = useState(false);
    const [ player, setPlayer ] = useState(player1);
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
    // const [ winnerMessage, setWinnerMessage ] = useState("");
    const [ gameOver, setGameOver ] = useState(false);
    const [ draw, setDraw ] = useState(false);
    const [ gameHistory, setGameHistory ] = useState([]);

    const closeModal = (event) => {
        setInfoModal({...infoModal, open: false});

        // refresh the component by selecting new numbers in useEffect
        setSeed(seed + 1);
    }
    

    const [ login, { error }] = useMutation(LOGIN_USER);

    const [ state, dispatch ] = useLogin();

    const handleClick = async (event, cellIndex) => {
        event.preventDefault();
        // if (turn !== player) {
        //     setPlayer(player1)
        // }
        // if (turn === player && board[cellIndex] === "") {
        //     setTurn(player === player1 ? player2 : player1);
        //     setPlayer1Clicked([...player1Clicked, cellIndex])
        //     setBoard(
        //         board.map((val, index) => {
        //         if (index === cellIndex && val === "") {
        //             return player;
        //         }
        //         return val;
        //     }));
        //     console.log(player1Clicked)
        //     setTurnCount(turnCount + 1);
        //     checkWinner();
        // }

        setPlayer1Clicked([...player1Clicked, cellIndex])
            setBoard(
                board.map((val, index) => {
                if (index === cellIndex && val === "") {
                    return player;
                }
                return val;
            }));
            console.log(player1Clicked)
            setTurnCount(turnCount + 1);
            checkWinner();
    }
    const computerTurn = () => {
        let randomIndex = Math.floor(Math.random() * 9);
        if (turn !== player) {
            setPlayer(player2)
        }
        const alreadyChosen = player1Clicked.includes(randomIndex);
        if (alreadyChosen) {
            randomIndex = Math.floor(Math.random() * 9);
        }
        if (turn === player && board[randomIndex] === "") {
            setTurn(player === player1 ? player2 : player1);
            setPlayer2Clicked([...player2Clicked, randomIndex])
            setBoard(
                board.map((val, index) => {
                if (index === randomIndex && val === "") {
                    return player;
                }
                return val;
            }));
            setTurnCount(turnCount + 1);
        } 
        // setPlayer(turn);
    }

    const checkWinner = () => {
        if (turnCount < 9) {
            winConditions.forEach((condition) => {
                let checkPlayer = condition.every((value) => {
                    return player1Clicked.includes(value);
                });
                if (checkPlayer) {
                    setWinner(state?.user.username);
                    setInfoModal({
                        ...infoModal, 
                        open: true, 
                        heading: "Victory!", 
                        message: `${winner}, you win!`
                    });
                    setGameOver(true);
                }
            })
        }
    }

    const checkComputerWin = () => {
        if (turnCount < 9) {
            winConditions.forEach((condition) => {
                let checkPlayer = condition.every((value) => {
                    return player2Clicked.includes(value);
                });
                if (checkPlayer) {
                    setWinner("Computer");
                    setInfoModal({
                        ...infoModal, 
                        open: true, 
                        heading: "Crushing Defeat!", 
                        message: `Computer Wins.`
                    });
                    setGameOver(true);
                }
            })
        }
    }

    const checkDraw = () => {
        if (turnCount === 9 && winner === "") {
            setDraw(true);
            setInfoModal({
                ...infoModal, 
                open: true, 
                heading: "Draw!", 
                message: `It's a draw.`
            });
            setGameOver(true);
        }
    }

    useEffect(() => {
        setTurn(player1);
        setPlayer(player1);
        setPlayer1Clicked([]);
        setPlayer2Clicked([]);
        setBoard(
            board.map((val) => {
            return val = "";
        }));
        console.log(player1Clicked)
        setTurnCount(0);
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