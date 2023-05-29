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
    setpaginationData(data);

    if (paginationData.page > currPag + 3) {
      console.log(currPag);

      setcurrPag(paginationData.page);
    } else if (paginationData.page < currPag) {
      setcurrPag(paginationData.page - 3);
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

  function changeCurrPaginationItem(nextNum: number) {
    paginationData.page = nextNum;
    const pagNumRegex = /\d+$/;
    const nextPageURL = checkNextPageKeyName(paginationData.nextpage);
    handleFetchNextPage(
      nextPageURL.replace(pagNumRegex, paginationData.page.toString())
    );
  }

  let paginationsHolder = [
    <Pagination.Item
      key={currPag}
      active={currPag === paginationData.page}
      onClick={() => changeCurrPaginationItem(currPag)}
    >
      {currPag}
    </Pagination.Item>,
    <Pagination.Item
      key={currPag + 1}
      active={currPag + 1 === paginationData.page}
      onClick={() => changeCurrPaginationItem(currPag + 1)}
    >
      {currPag + 1}
    </Pagination.Item>,
    <Pagination.Item
      key={currPag + 2}
      active={currPag + 2 === paginationData.page}
      onClick={() => changeCurrPaginationItem(currPag + 2)}
    >
      {currPag + 2}
    </Pagination.Item>,
    <Pagination.Item
      key={currPag + 3}
      active={currPag + 3 === paginationData.page}
      onClick={() => changeCurrPaginationItem(currPag + 3)}
    >
      {currPag + 3}
    </Pagination.Item>,

  ];
  // for (let i = 1; i <= paginationData.totalpages; i++) {
  //   paginationsHolder.push(
  //     <Pagination.Item
  //       key={i}
  //       active={i === paginationData.page}
  //       onClick={() => changeCurrPaginationItem(i)}
  //     >
  //       {i}
  //     </Pagination.Item>
  //   );
  // }
  //tills nästa gång fixa paginationen.om det finss 5 rutor total för rutorna och mängden sidor är 20 så ska paginationsnumrena vara [i-2,i-1,i=3,i+1,+2]
  return (
    <div className="m-2 d-flex justify-content-center">
      <Pagination className="flex-wrap">
        <Pagination.First onClick={() => changeCurrPaginationItem(1)} />
        <Pagination.Prev
          onClick={() => changeCurrPaginationItem(paginationData.page - 1)}
        />
        {paginationsHolder}
        <Pagination.Next
          onClick={() => changeCurrPaginationItem(paginationData.page + 1)}
        />
        <Pagination.Last
          onClick={() => changeCurrPaginationItem(paginationData.totalpages)}
        />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
