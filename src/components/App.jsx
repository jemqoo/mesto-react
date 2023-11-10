import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import PopupImage from "./ImagePopup/ImagePopup.jsx";
import { useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";

function App() {
  //стейты попапов

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setImagePopup] = useState(false);

  //стейт контекста
  const [currentUser, setCurrentUser] = useState({
    userInfo: "Загрузка...",
    userInfo: "Загрузка...",
  });
  //стейты карточки
  const [cards, setCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState("");

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopup(false);
    setDeletePopupOpen(false);
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

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
  }
  function handleDeletePopupClick(CardId) {
    setDeleteCardId(CardId);
    setDeletePopupOpen(true);

    // setEvantListenerForDocument();
  }

  useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getCards()])
      .then(([dataUser, dataCard]) => {
        setCurrentUser(dataUser);
        setCards(dataCard);
      })
      .catch((err) =>
        console.error(`Ошибка при загрузке начальных данных ${err}`)
      );
  }, []);

  function handleDeleteSubmit(evt) {
    evt.preventDefault();
    api
      .deleteCard(deleteCardId)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCardId;
          })
        );
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка при удалении карточки ${err}`));
  }

  function handleUpdaterUser(dataUser) {
    api
      .setUserInfo(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) =>
        console.error(`Ошибка при редактировании профиля ${err}`)
      );
  }

  function handleUpdateAvatar(dataUser) {
    api
      .setNewAvatar(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка при редактировании аватара ${err}`);
      });
  }

  function handleAddPlaceSubmit(dataCard) {
    api
      .addCard(dataCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка при добавлении карточки ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onDelete={handleDeletePopupClick}
        cards={cards}
      />

      <Footer />

      <EditProfilePopup
        onUpdateUser={handleUpdaterUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />

      <AddPlacePopup
        onAddPlace={handleAddPlaceSubmit}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />

      <EditAvatarPopup
        onUpdateAvarar={handleUpdateAvatar}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        titleButton="Да"
        onSubmit={handleDeleteSubmit}
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
      ></PopupWithForm>

      <PopupImage
        card={selectedCard}
        isOpen={isImagePopup}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
