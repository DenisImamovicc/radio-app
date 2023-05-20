import Pagination from "react-bootstrap/Pagination";

interface PaginationComponentProps {
  totalpages: number;
  active: number;
  handleFetchNextPage: (url: string) => void;
  nextPageUrl: string
}

const PaginationComponent = ({
  totalpages,
  active,
  handleFetchNextPage,
  nextPageUrl
}:PaginationComponentProps) => {

  function changeCurrPaginationItem(nextNum:number) {
    active = nextNum
    const regex = /\d+$/;
     handleFetchNextPage(nextPageUrl.replace(regex, active.toString()))
  }
  let items = [];
  for (let number = 1; number <= totalpages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => changeCurrPaginationItem(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <div className="m-3">
        <Pagination className="flex-wrap">{items}</Pagination>
      </div>
    </>
  );
};

export default PaginationComponent;
