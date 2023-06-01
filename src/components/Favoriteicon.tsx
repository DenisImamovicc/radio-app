import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

interface channel {
  id: number;
  image: string;
  channeltype: string;
  name: string;
  tagline: string;
  liveaudio: {
    url: string;
  };
}

const ToggleIcon = ({ channel }: channel) => {
  const [isClicked, setIsClicked] = useState(localStorage.getItem(`${channel.name} isFav?`));

  useEffect(() => {
     if (localStorage.getItem(`${channel.name} isFav?`) === "false") {
         console.log("useffect");
         setIsClicked(false);
     }
  }, [isClicked])
  

  const handleClick = () => {
    setIsClicked(!isClicked);
    localStorage.setItem(`${channel.name} isFav?`, `${!isClicked}`);
  };
  //   console.log(channel);

  return (
    <>
      <FontAwesomeIcon
        icon={isClicked ? solidStar : regularStar}
        onClick={handleClick}
        className="ms-1"
      />
    </>
  );
};

export default ToggleIcon;
