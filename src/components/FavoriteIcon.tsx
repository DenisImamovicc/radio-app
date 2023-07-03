import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import Toast from "react-bootstrap/Toast";
import { Link } from "react-router-dom";





function FavoriteIcon({ content, contentType }) {
  const [isClicked, setIsClicked] = useState<boolean | null | string>(
    localStorage.getItem(`${content.name} isFav?`)
  );

  const [ShowToast, setShowToast] = useState(false);

  function removeLocalStorage(key: string, value: String) {
    const localData = JSON.parse(localStorage.getItem(key) || "null");
    console.log(localData, value);

    const updatedData = localData.filter((obj: obj) => {
      return obj.name !== value;
    });
    console.log(updatedData);

    return localStorage.setItem(key, JSON.stringify(updatedData));
  }

  function AddLocalStorage(key: string, value: any) {
    const localData = JSON.parse(localStorage.getItem(key) || "null");
    const checkdata = localStorage.getItem(key);

    if (checkdata) {
      localData.push(value);
      return localStorage.setItem(key, JSON.stringify(localData));
    }
    return localStorage.setItem(key, JSON.stringify([value]));
  }

  useEffect(() => {
    if (localStorage.getItem(`${content.name} isFav?`) === "false") {
      setIsClicked(false);
      removeLocalStorage(`${contentType}FavList`, `${content.name}`);
    }
  }, [isClicked]);

  const handleClick = () => {
    setIsClicked(!isClicked);
    localStorage.setItem(`${content.name} isFav?`, `${!isClicked}`);
    AddLocalStorage(`${contentType}FavList`, content);
    setShowToast(true);
  };

  return (
    <>
      <FontAwesomeIcon
        icon={isClicked ? solidStar : regularStar}
        onClick={handleClick}
        className="ms-1"
      />
      <Toast
        onClose={() => setShowToast(false)}
        show={ShowToast}
        delay={3000}
        className="toastFavorite toastFavorite w-100"
        bg="dark"
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">
            {content.name} har{" "}
            {isClicked ? "favoritmarkerats till" : "avfavoritmarkerats från"}{" "}
            <Link to={`/User`} className="text-decoration-underline">
              {" "}
              Min sida!{" "}
            </Link>
          </strong>
        </Toast.Header>
      </Toast>
    </>
  );
}

export default FavoriteIcon;
