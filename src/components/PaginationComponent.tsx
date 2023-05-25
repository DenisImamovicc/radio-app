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

  useEffect(() => {
    setpaginationData(data);
  }, [data]);

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



  let paginationsHolder = [];
  for (let i = 1; i <= paginationData.totalpages; i++) {
    paginationsHolder.push(
      <Pagination.Item
        key={i}
        active={i === paginationData.page}
        onClick={() => changeCurrPaginationItem(i)}
      >
        {i}
      </Pagination.Item>
    );
  }
 //tills nästa gång fixa paginationen.om det finss 5 rutor total för rutorna och mängden sidor är 20 så ska paginationsnumrena vara [i-2,i-1,i=3,i+1,+2]
  return (
    <div className="m-3">
      <Pagination className="flex-wrap">
        <Pagination.First onClick={() => changeCurrPaginationItem(1)}/>
        <Pagination.Prev onClick={() => changeCurrPaginationItem(paginationData.page-1)}/>
        {paginationsHolder}
        <Pagination.Next onClick={() => changeCurrPaginationItem(paginationData.page+1)}/>
        <Pagination.Last onClick={() => changeCurrPaginationItem(paginationData.totalpages)}/>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
