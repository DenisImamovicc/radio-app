import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function ProgramSearchBar() {
  const [programSearchList, setprogramSearchList] = useState("");
  const [currSearchRek, setcurrSearchRek] = useState([]);
  const { data, isLoading, err } = useFetch(
    `https://api.sr.se/api/v2/programs?format=json&size=10`
  );

  useEffect(() => {
    if (isLoading === false) {
      console.log(data);
      localStorage.setItem("Programsearchlist", JSON.stringify(data.programs));
      setprogramSearchList(data.programs);
    }
  }, [isLoading]);

  //   const handleProgramSearchlist = () => {
  //     if (localStorage.programsearchlistexists) {
  //       // then search from that
  //     } else {
  //       // fetch all programs from api and store it
  //     }
  //   };

  const handleUserInput = (e: any) => {
    console.log(e.nativeEvent.data, e.target.value);
    let currSearch = e.target.value;
    //Make it so that if searchbar is empty it will not show any suggestions
    //   if (!currSearch) {

    //   }

    const regex = new RegExp(`^${currSearch}`, "i");
    const result = programSearchList.filter((obj) => regex.test(obj.name));
    console.log(result);
    setcurrSearchRek(result);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Sök program"
          onInput={handleUserInput}
        ></input>
        <Card>
          <ListGroup variant="flush" id="Searchsuggestionslist">
            {currSearchRek &&
              currSearchRek.map((obj) => (
                <ListGroup.Item>{obj.name}</ListGroup.Item>
              ))}
          </ListGroup>
        </Card>
      </div>
    </>
  );
}

export default ProgramSearchBar;
