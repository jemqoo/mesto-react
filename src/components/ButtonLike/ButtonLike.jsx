import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function ButtonLike({ likes, myid, cardid }) {
  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(likes.length);

  useEffect(() => {
    setIsLike(likes.some((element) => myid === element._id));
  }, [likes, myid]);

  function handleLike() {
    if (isLike) {
      api
        .deleteLike(cardid)
        .then((res) => {
          setIsLike(false);
          setCount(res.likes.length);
        })
        .catch((err) => console.error(`Ошибка при снятии лайка ${err}`));
    } else {
      api
        .addLike(cardid)
        .then((res) => {
          setIsLike(true);
          setCount(res.likes.length);
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`));
    }
  }

  return (
    <>
      <button
        className={`card__like-button ${
          isLike ? "card__like-button_active" : ""
        }`}
        type="button"
        onClick={handleLike}
      />
      <span className="card__counter">{count}</span>
    </>
  );
}
