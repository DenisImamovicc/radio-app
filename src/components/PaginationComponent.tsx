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
    setcurrPag(data.page);
  }, [data.totalpages]);

  useEffect(() => {
    setpaginationData(data);

    if (paginationData.page > currPag + 3) {
      setcurrPag(paginationData.page);
    } else if (paginationData.page < currPag) {
      setcurrPag(paginationData.page - 3);
    } else if (paginationData.page === 1) {
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
    if (nextNum === null) {
      return "not valid input";
    }
    paginationData.page = nextNum;
    const pagNumRegex = /\d+$/;
    const nextPageURL = checkNextPageKeyName(paginationData.nextpage);
    scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    handleFetchNextPage(
      nextPageURL.replace(pagNumRegex, paginationData.page.toString())
    );
  }

  function HandlePaginationAmount() {
    let PAGINATION_ITEM_AMOUNT = 1;
    if (currPag === paginationData.totalpages) {
      PAGINATION_ITEM_AMOUNT = 0;
      return PAGINATION_ITEM_AMOUNT;
    } else if (paginationData.totalpages - currPag > 3) {
      PAGINATION_ITEM_AMOUNT = 3;
      return PAGINATION_ITEM_AMOUNT;
    }
    return PAGINATION_ITEM_AMOUNT;
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
