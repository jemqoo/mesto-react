import { useContext } from "react";

import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar-overlay"
          onClick={onEditAvatar}
        >
          <img
            src={currentUser.avatar ? currentUser.avatar : "#"}
            alt="description"
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">
            {currentUser.name ? currentUser.name : ""}
          </h1>
          <p className="profile__subtitle">
            {currentUser.about ? currentUser.about : ""}
          </p>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          />
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="cards page__cards">
        {cards.map((data) => {
          return (
            <article className="card" key={data._id}>
              <Card card={data} onCardClick={onCardClick} onDelete={onDelete} />
            </article>
          );
        })}
      </section>
    </main>
  );
}
