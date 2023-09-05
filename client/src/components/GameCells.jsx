import '../styles/Game.css'

// function to render game cells as buttons
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