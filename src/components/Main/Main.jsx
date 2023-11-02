import { useEffect, useState } from "react";
import api from "../../utils/api";
import Card from "../Card/Card.jsx";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()]).then(
      ([dataUser, dataCard]) => {
        setUserName(dataUser.name);
        setUserDescription(dataUser.about);
        setUserAvatar(dataUser.avatar);

        dataCard.forEach((data) => (data.myid = dataUser._id));
        setCards(dataCard);
      }
    );
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar-overlay"
          onClick={onEditAvatar}
        >
          <img src={userAvatar} alt="description" className="profile__avatar" />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <p className="profile__subtitle">{userDescription}</p>
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
        {" "}
        {cards.map((data) => {
          return (
            <article className="card" key={data._id}>
              <Card card={data} onCardClick={onCardClick} />
            </article>
          );
        })}
      </section>
    </main>
  );
}
