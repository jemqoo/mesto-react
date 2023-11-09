import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({ isOpen, onAddPlace, onClose }) {
  const [placeName, setPlace] = useState("");
  const [link, setLinkPlace] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      placeName,
      link,
    });
  };

  const handleChangePlace = (e) => {
    setPlace(e.target.value);
  };

  const handleChangeLinkPlace = (e) => {
    setLinkPlace(e.target.value);
  };

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      titleButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="placeName">
        <input
          value={placeName}
          onChange={handleChangePlace}
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
          value={link}
          onChange={handleChangeLinkPlace}
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
  );
}
