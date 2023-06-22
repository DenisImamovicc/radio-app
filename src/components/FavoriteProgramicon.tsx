import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import Toast from "react-bootstrap/Toast";
import { Link } from "react-router-dom";

// interface program {
//   program: {
//     id: number;
//     image: string;
//     programtype: string;
//     name: string;
//     tagline: string;
//     liveaudio: {
//       url: string;
//     };
//   };
// }

interface obj {
    name:string
  };

const ToggleIconProgram = ({program}:any) => {
  
  const [isClicked, setIsClicked] = useState<boolean | null | string>(
    localStorage.getItem(`${program.name} isFav?`)
  );
  const [ShowToast, setShowToast] = useState(false);

  function removeLocalStorage(key: string, value: String) {
    const localData = JSON.parse(localStorage.getItem(key)|| "null");
    console.log(localData, value);

    const updatedData = localData.filter((obj:obj) => {
      return obj.name !== value;
    });
    console.log(updatedData);

    return localStorage.setItem(key, JSON.stringify(updatedData));
  }

  function AddLocalStorage(key: string, value: any) {
    const localData = JSON.parse(localStorage.getItem(key)|| "null");
    const checkdata = localStorage.getItem(key);

    if (checkdata) {
      localData.push(value);
      return localStorage.setItem(key, JSON.stringify(localData));
    }
    return localStorage.setItem(key, JSON.stringify([value]));
  }

  useEffect(() => {
    if (localStorage.getItem(`${program.name} isFav?`) === "false") {
      setIsClicked(false);
      removeLocalStorage(`FavoriteProgramsList`, `${program.name}`);
    }
  }, [isClicked]);

  const handleClick = () => {
    setIsClicked(!isClicked);
    localStorage.setItem(`${program.name} isFav?`, `${!isClicked}`);
    AddLocalStorage("FavoriteProgramsList", program);
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
        className="toastFavorite w-100"
        bg="dark"
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">
            {program.name} har{" "}
            {isClicked ? "favoritmarkerats till" : "avfavoritmarkerats från"} <Link to={`/User`} className="text-decoration-underline"> Din sida! </Link>
          </strong>
        </Toast.Header>
      </Toast>
    </>
  );
};

export default ToggleIconProgram;
