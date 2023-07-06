import { useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import Toast from "react-bootstrap/Toast";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

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
  const [Url, setUrl] = useState("");
  const [reqMethod, setreqMethod] = useState("");
  const [reqData, setreqData] = useState("");


  const {} = useFetch(Url, reqMethod,reqData);
//fix shitty func to not crash if user has no favchannel/programs from db
  function readFavLocalStorage(value: string) {
     let data;    
     if (isLoggedIn) {
       const dbData = JSON.parse(
         localStorage.getItem(`UserDB`) || "null"
       );
        
      //  if (!dbData.Favoriteprograms || !dbData.Favoritechannels) {
      //    return null
      //  }
       if (contentType === "program") {
         data = JSON.parse(dbData.Favoriteprograms);
         data = data;
       } else {
         data = JSON.parse(dbData.Favoritechannels);
         data = data;
       }
     } else {
       const localData: any[] = JSON.parse(
         localStorage.getItem(`${contentType}FavList`) || "null"
         );
         data = localData;
       }
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
    
  //   if (isLoading === false && Url.includes("users")) {
  //     console.log("wnt th");
      
  //     const DbData=data
  //     localStorage.setItem(
  //       "UserDB",
  //       JSON.stringify({
  //         Name: DbData.Name,
  //         Favoritechannels: DbData.Favoritechannels === "[]" ? null : DbData.Favoritechannels,
  //         Favoriteprograms: DbData.Favoriteprograms === "[]" ? null : DbData.Favoriteprograms,
  //       })
  //     );
  //   } else {
  //     console.log("still Loading...");
  //   }
  // }, [isLoading]);

  const handleClick = () => {
    setIsClicked((prevIsClicked) => {
      const newIsClicked = !prevIsClicked;
      if (newIsClicked) {
        //reverse the logic order for toast to make sense
        if (isLoggedIn) {
          setreqMethod("PUT")
          content.isFav=true
          setreqData(content)          
          setUrl(`http://localhost:9000/users/favorite${contentType}/${content.id}/${isLoggedIn}`)

          //  const dbData: any[] = JSON.parse(
          //    localStorage.getItem(`UserDB`) || "null"
          //  );

          //    console.log(dbData.Favoriteprograms);
            
          //   localStorage.setItem(
          //         "UserDB",
          //         JSON.stringify({
          //           Favoriteprograms: dbData.Favoritechannels.unshift(content) ? dbData.Favoritechannels.push(content):null
          //         }))

          setShowToast(false);
        }
        addFavToLocalStorage(`${contentType}FavList`, content);
      } else {
        if (isLoggedIn) {
          setreqMethod("DELETE")
          setUrl(`http://localhost:9000/users/unfavorite${contentType}/${content.id}/${isLoggedIn}`)
          setShowToast(true);
        }
        removeFavFromLocalStorage(`${contentType}FavList`, content.name);
      }
      setShowToast(true);
      return newIsClicked;
    });
  };

  //refactor toast into own omponent and add parameter for deciding text depending on if user is looged in or not.
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
