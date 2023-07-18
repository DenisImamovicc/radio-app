import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

interface Program {
  name: string;
  programimage: string;
  responsibleeditor: string;
  id: number;
  description: string;
  socialmediaplatforms: {
    plattform: string;
    platformurl: string;
  }[];
  programurl: string;
  broadcastinfo: string;
  channel: {
    name: string;
    id: number;
  };
}

function ProgramSearchBar() {
  const [programSearchList, setprogramSearchList] = useState([]);
  const [currSearchSuggestions, setcurrSearchSuggestions] = useState([]);
  const [userInput, setuserInput] = useState("");

  const { data, isLoading } = useFetch(
    `https://api.sr.se/api/v2/programs?format=json&size=815`
  );

  useEffect(() => {
    if (isLoading === false && localStorage.getItem("Programsearchlist")) {
      setprogramSearchList(
        JSON.parse(localStorage.getItem("Programsearchlist") as string)
      );
    } else if (isLoading === false) {
      localStorage.setItem("Programsearchlist", JSON.stringify(data.programs));
      setprogramSearchList(data.programs);
    }
  }, [isLoading]);

  const handleUserInput = (e: any) => {
    let currSearch = e.target.value;
    setuserInput(currSearch);
    if (currSearch === "") {
      return setcurrSearchSuggestions([]);
    }

    const regex = new RegExp(`^${currSearch}`, "i");
    const result = programSearchList.filter((program: Program) =>
      regex.test(program.name)
    );
    return setcurrSearchSuggestions(result);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Sök program"
          onInput={handleUserInput}
          className="searchinput"
          value={userInput}
        ></input>
        <Card bg="dark">
          <ListGroup variant="flush" id="Searchsuggestionslist">
            {currSearchSuggestions &&
              currSearchSuggestions.map((program: Program) => (
                <ListGroup.Item
                  onClick={() => setcurrSearchSuggestions([])}
                  className=""
                  id="Searchsuggestion"
                >
                  <Link
                    to={`/Programs/Program/${program.id}`}
                    state={program}
                    className="d-flex align-items-center flex-row-reverse justify-content-between text-white"
                    onClick={() => setuserInput(program.name)}
                  >
                    <img
                      src={program.programimage}
                      id="Searchsuggestionimage"
                      className=""
                    />
                    {program.name}
                  </Link>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Card>
      </div>
    </>
  );
}

export default ProgramSearchBar;
