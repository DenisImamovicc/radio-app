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
  const isLoggedIn = localStorage.getItem("UserEmail");
  const [isClicked, setIsClicked] = useState<boolean | null>(
    readFavLocalStorage(content.name)
  );
  const [showToast, setShowToast] = useState(false);

  function readFavLocalStorage(value: string) {
    let data;
    if (isLoggedIn) {
      const dbData: any[] = JSON.parse(
        localStorage.getItem(`UserDB`) || "null"
      );
      console.log(dbData);

      if (contentType === "program") {
        data = JSON.parse(dbData.Favoriteprograms);
        data = data[0]
      } else {
        data = JSON.parse(dbData.Favoritechannels);
        data =data[0]

      }
    } else {
      const localData: any[] = JSON.parse(
        localStorage.getItem(`${contentType}FavList`) || "null"
      );
      data = localData;
    }
    console.log(data);

    if (!data) {
      return null;
    }

    const foundContent = data.filter((obj: any) => {
      return obj.name === value;
    });

    if (foundContent[0]?.isFav) {
      return true;
    }
    return null;
  }

  function removeFavFromLocalStorage(key: string, value: string) {
    const localData: any[] = JSON.parse(localStorage.getItem(key) || "null");

    if (!localData) {
      return null;
    }

    const updatedData = localData.filter((obj: any) => {
      return obj.name !== value;
    });
    localStorage.setItem(key, JSON.stringify(updatedData));
  }

  function addFavToLocalStorage(key: string, value: any) {
    const localData: any[] = JSON.parse(localStorage.getItem(key) || "null");
    const checkData = localStorage.getItem(key);

    if (checkData) {
      value.isFav = true;
      localData.push(value);
      localStorage.setItem(key, JSON.stringify(localData));
    } else {
      value.isFav = true;
      localStorage.setItem(key, JSON.stringify([value]));
    }
  }

  // useEffect(() => {
  //   if (!readFavLocalStorage(content.name)) {
  //     setIsClicked(false);
  //     removeFavFromLocalStorage(`${contentType}FavList`, content.name);
  //   }
  // }, [isClicked]);

  const handleClick = () => {
    setIsClicked((prevIsClicked) => {
      const newIsClicked = !prevIsClicked;
      if (newIsClicked) {
        if (isLoggedIn) {
          return console.log("DB UPDATE REQ");
        }
        addFavToLocalStorage(`${contentType}FavList`, content);
      } else {
        if (isLoggedIn) {
          return console.log("DB DELETE REQ");
        }
        removeFavFromLocalStorage(`${contentType}FavList`, content.name);
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
