import '../styles/Game.css'

export default function GameCells ({cellIndex, value, handleClick, computerTurn, gameOver}) {
    return (
        <>
            <button 
                className="game-cell"
                key = {cellIndex}
                disabled = {gameOver}
                onClick={(event) => handleClick(event, cellIndex)}
            >
                {value}
            </button>
        </>
    )
};