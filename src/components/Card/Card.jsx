import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import ButtonLike from "../ButtonLike/ButtonLike.jsx";

export default function Card({ card, onCardClick, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <article className="card">
      {currentUser._id === card.owner._id && (
        <button
          className="card__delete-button"
          type="button"
          onClick={() => onDelete(card._id)}
        />
      )}
      <img
        className="card__image"
        src={card.link}
        alt={`Изображение ${card.name}`}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name} </h2>
        <div className="card__like-container">
          <ButtonLike
            likes={card.likes}
            myid={currentUser._id}
            cardid={card._id}
          ></ButtonLike>
        </div>
      </div>
    </article>
  );
}
