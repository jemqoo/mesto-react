export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <section className={`popup popup_image ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close popup__close_image"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__image"
          src={card.link ? card.link : "#"}
          alt={card.name ? `Изображение ${card.name}` : "#"}
        />
        <h2 className="popup__title popup__title_image">{card.name}</h2>
      </div>
    </section>
  );
}
