import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function ProgramSearchBar() {
  const [programSearchList, setprogramSearchList] = useState("");
  const [currSearchRek, setcurrSearchRek] = useState([]);
  const { data, isLoading} = useFetch(
    `https://api.sr.se/api/v2/programs?format=json&size=10`
  );

  useEffect(() => {
    if (isLoading === false) {
      console.log(data);
      localStorage.setItem("Programsearchlist", JSON.stringify(data.programs));
      setprogramSearchList(data.programs);
    }
  }, [isLoading]);

  const handleUserInput = (e) => {
    let currSearch = e.target.value;

    if (currSearch === "") {
      return setcurrSearchRek([]);
    }

    const regex = new RegExp(`^${currSearch}`, "i");
    const result = programSearchList.filter((obj) => regex.test(obj.name));

    return setcurrSearchRek(result);
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
                <ListGroup.Item className="d-flex align-content-around">
                <img src={obj.programimage} id="Searchsuggestionimage" className=""/>
                  {obj.name}</ListGroup.Item>
              ))}
          </ListGroup>
        </Card>
      </div>
    </>
  );
}

export default ProgramSearchBar;
