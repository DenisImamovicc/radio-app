import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import Toast from "react-bootstrap/Toast";
import { Link } from "react-router-dom";

interface FavoriteIconProps {
  content: any;
  contentType: string;
}

function FavoriteIcon({ content, contentType }: FavoriteIconProps) {
  const [isClicked, setIsClicked] = useState<boolean | null>(
    JSON.parse(localStorage.getItem(`${content.name} isFav?`) || "null")
  );

  const [showToast, setShowToast] = useState(false);

  function removeLocalStorage(key: string, value: string) {
    const localData: any[] = JSON.parse(localStorage.getItem(key) || "null");
    console.log(localData, value);

    const updatedData = localData.filter((obj: any) => {
      return obj.name !== value;
    });
    console.log(updatedData);

    localStorage.setItem(key, JSON.stringify(updatedData));
  }

  function addLocalStorage(key: string, value: any) {
    const localData: any[] = JSON.parse(localStorage.getItem(key) || "null");
    const checkData = localStorage.getItem(key);

    if (checkData) {
      localData.push(value);
      localStorage.setItem(key, JSON.stringify(localData));
    } else {
      localStorage.setItem(key, JSON.stringify([value]));
    }
  }

  useEffect(() => {
    if (localStorage.getItem(`${content.name} isFav?`) === "false") {
      setIsClicked(false);
      removeLocalStorage(`${contentType}FavList`, content.name);
    }
  }, [isClicked]);

  const handleClick = () => {
    setIsClicked((prevIsClicked) => {
      const newIsClicked = !prevIsClicked;
      localStorage.setItem(`${content.name} isFav?`, `${newIsClicked}`);
      if (newIsClicked) {
        addLocalStorage(`${contentType}FavList`, content);
      } else {
        removeLocalStorage(`${contentType}FavList`, content.name);
      }
      setShowToast(true);
      return newIsClicked;
    });
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
        show={showToast}
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