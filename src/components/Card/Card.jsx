export default function Card({ card, onCardClick }) {
  return (
    <article className="card">
      <button className="card__delete-button" type="button" />
      <img
        className="card__image"
        src={card.link}
        alt={`Изображение ${card.name}`}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name} </h2>
        <div className="card__like-container">
          <button className="card__like-button" type="button" />
          <span className="card__counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}
