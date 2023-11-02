import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import PopupImage from "./ImagePopup/ImagePopup.jsx";
import { useState } from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setImagePopup] = useState(false);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopup(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  // function handleDelete() {
  // }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
    // setEvantListenerForDocument();
  }

  return (
    <>
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        {" "}
        <label htmlFor="username">
          <input
            id="username"
            className="popup__input popup__input_user_name"
            name="username"
            type="text"
            placeholder="Введите имя"
            minLength={2}
            maxLength={40}
            required=""
          />
          <p className="popup__error username-error" />
        </label>
        <label htmlFor="userInfo">
          <input
            id="userInfo"
            className="popup__input popup__input_user_info"
            name="userInfo"
            type="text"
            placeholder="О себе"
            minLength={2}
            maxLength={200}
            required=""
          />
          <p className="popup__error userInfo-error" />
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="add-card"
        title="Новое место"
        titleButton="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        {" "}
        <label htmlFor="placeName">
          <input
            name="placeName"
            id="placeName"
            className="popup__input popup__input_place_name"
            type="text"
            placeholder="Название"
            minLength={2}
            maxLength={30}
            required=""
          />
          <p className="popup__error placeName-error" />
        </label>
        <label htmlFor="placeLink">
          <input
            name="link"
            id="link"
            className="popup__input popup__input_place_image"
            type="url"
            placeholder="Ссылка на картинку"
            required=""
          />
          <p className="popup__error link-error" />
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <label htmlFor="placeLink">
          <input
            name="avatar"
            id="avatar"
            className="popup__input popup__input_place_image"
            type="url"
            placeholder="Ссылка на картинку"
            required=""
          />
          <p className="popup__error avatar-error" />
        </label>
      </PopupWithForm>

      <PopupWithForm name="delete" title="Вы уверены?" titleButton="Да">
        <section className="popup delete-popup">
          <div className="popup__container">
            <button className="popup__close popup__close_add" type="button" />
            <h2 className="popup__title">Вы уверены?</h2>
            <div
              className="popup__form popup__form_add"
              action="#"
              name="deleteCard"
              noValidate=""
            >
              <label htmlFor="placeLink">
                <p className="popup__error avatar-error" />
              </label>
              <button className="popup__submit" type="submit">
                Да
              </button>
            </div>
          </div>
        </section>
      </PopupWithForm>

      <PopupImage
        card={selectedCard}
        isOpen={isImagePopup}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;
