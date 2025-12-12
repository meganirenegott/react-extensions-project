import Button from "./Button.jsx";
import Toggle from "./Toggle.jsx";

function Card({ cardInformation, onToggleActive, onRemove }) {
  return (
    <div className="card">
      <div className="card-header-wrapper" >
        <img
          src={cardInformation.logo}
          alt={cardInformation.name + " logo"}
        />
      
      <div className="name-desc-wrapper">
      <h2 className="extension-name">{cardInformation.name}</h2>
          <p className="extension-description">{cardInformation.description}</p>
          </div>
      </div>
      <div className="card-actions">
        <Button
          buttonName="Remove"
          onClick={() => onRemove(cardInformation.id)}
        />
        <Toggle
          checked={cardInformation.isActive}
          onChange={() => onToggleActive(cardInformation.id)}
        />
      </div>
    </div>
  );
}

export default Card;
