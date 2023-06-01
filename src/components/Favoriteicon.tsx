import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import Toast from "react-bootstrap/Toast";

interface channel {
  channel: {
    id: number;
    image: string;
    channeltype: string;
    name: string;
    tagline: string;
    liveaudio: {
      url: string;
    };
  };
}

const ToggleIcon = ({ channel }: channel) => {
  const [isClicked, setIsClicked] = useState<boolean|null|string>(
    localStorage.getItem(`${channel.name} isFav?`)
  );
  const [ShowToast, setShowToast] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(`${channel.name} isFav?`) === "false") {
      console.log("useffect");
      setIsClicked(false);
      localStorage.removeItem(`data`);
    }
  }, [isClicked]);

  const handleClick = () => {
    setIsClicked(!isClicked);
    localStorage.setItem(`${channel.name} isFav?`, `${!isClicked}`);
    localStorage.setItem(`data`, JSON.stringify(channel));
    setShowToast(true);
  };
  //   console.log(channel);

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
        delay={2000}
        className="toastFavorite"
        bg="dark"
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">
            {channel.name} har{" "}
            {isClicked ? "favoritmarkerats!" : "avfavoritmarkerats!"}
          </strong>
        </Toast.Header>
      </Toast>
    </>
  );
};

export default ToggleIcon;
