import { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({ isOpen, onUpdateAvarar, onClose }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvarar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={"avatar"}
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
    >
      <label htmlFor="placeLink">
        <input
          ref={avatarRef}
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
  );
}
