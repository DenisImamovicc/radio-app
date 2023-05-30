import Pagination from "react-bootstrap/Pagination";
import { useState, useEffect } from "react";
import { Placeholder } from "react-bootstrap";

interface PaginationComponentProps {
  data: {
    totalpages: number;
    page: number;
    previouspage: string;
    nextpage: string;
  };
  handleFetchNextPage: (url: string) => void;
}

const PaginationComponent = ({
  data,
  handleFetchNextPage,
}: PaginationComponentProps) => {
  const [paginationData, setpaginationData] = useState(data);
  const [currPag, setcurrPag] = useState(1);

  useEffect(() => {
    setcurrPag(data.page)
  }, [data.totalpages])
  
  useEffect(() => {
    setpaginationData(data);

    if (paginationData.page > currPag + 3) {
      console.log(currPag);
      setcurrPag(paginationData.page);
    } 
    else if (paginationData.page < currPag) {
      setcurrPag(paginationData.page - 3);
    }
    else if (paginationData.page === 1) {
      setcurrPag(paginationData.page);
    } 
  }, [data, currPag]);

  if (!paginationData)
    return (
      <Pagination className="flex-wrap m-3">
        <Placeholder xs={7} />
      </Pagination>
    );

  const checkNextPageKeyName = (keyName: string) => {
    if (!keyName) {
      return paginationData.previouspage;
    }
    return paginationData.nextpage;
  };

  function fetchNextPage(nextNum: number | null) {
    console.log(nextNum);

    if (nextNum === null) {
      return "not valid input";
    }
    paginationData.page = nextNum;
    const pagNumRegex = /\d+$/;
    const nextPageURL = checkNextPageKeyName(paginationData.nextpage);
    handleFetchNextPage(
      nextPageURL.replace(pagNumRegex, paginationData.page.toString())
    );
  }

  function HandlePaginationAmount() {
    if (currPag === paginationData.totalpages) {
      console.log("has 1 page");
      return 0;
    }else if (paginationData.totalpages-currPag > 3) {
      console.log("has more than 3 pages");
      return 3;
    }
     return 1     
  }

  let paginationsHolder = [];
  for (let i = 0; i <= HandlePaginationAmount(); i++) {
    paginationsHolder.push(
      <Pagination.Item
        key={currPag + i}
        active={currPag + i === paginationData.page}
        onClick={() => fetchNextPage(currPag + i)}
      >
        {currPag + i}
      </Pagination.Item>
    );
  }

  function handleNonExistingPaginationPage(nextpagination: number) {
    if (nextpagination > paginationData.totalpages) {
      return null;
    } else if (nextpagination < 1) {
      return null;
    }
    return nextpagination;
  }

  return (
    <div className="m-2 d-flex justify-content-center">
      <Pagination className="flex-wrap">
        <Pagination.First onClick={() => fetchNextPage(1)} />
        <Pagination.Prev
          onClick={() =>
            fetchNextPage(
              handleNonExistingPaginationPage(paginationData.page - 1)
            )
          }
        />
        {paginationsHolder}
        <Pagination.Next
          onClick={() =>
            fetchNextPage(
              handleNonExistingPaginationPage(paginationData.page + 1)
            )
          }
        />
        <Pagination.Last
          onClick={() => fetchNextPage(paginationData.totalpages)}
        />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
