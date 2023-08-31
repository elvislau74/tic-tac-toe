import '../styles/Game.css'

export default function GameCells ({cellIndex, value, handleClick, computerTurn}) {
    return (
        <>
            <button 
                className="game-cell"
                key = {cellIndex}
                onClick={(event) => handleClick(event, cellIndex)}
            >
                {value}
            </button>
        </>
    )
};