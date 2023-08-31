export default function InfoModal ({heading, message, closeFunction}) {
  const handleClose = (event) => {
    event.preventDefault();
    closeFunction(event);
  }
  const doNothing = (event) => {
    // allows me to click inside the modal
    event.stopPropagation();
  }
  return (
    <div className="info-modal-overlay" onClick={handleClose}>
      <div className="info-modal" onClick={doNothing}>
        <h4>{heading}</h4>
        <p>{message}</p>
        <a href="#" onClick={handleClose} className="close-box">Play Again</a>
      </div>
    </div>
  )
};