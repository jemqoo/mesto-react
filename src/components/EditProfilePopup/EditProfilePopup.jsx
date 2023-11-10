import { useContext, useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDiscr(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      name={"edit"}
      title={`Редактировать профиль`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="username">
        <input
          value={name || ""}
          onChange={handleChangeName}
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
          value={about || ""}
          onChange={handleChangeDiscr}
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
  );
}
