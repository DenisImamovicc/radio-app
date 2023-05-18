import Pagination from "react-bootstrap/Pagination";

const PaginationComponent = ({
  totalpages,
  active,
  handleFetchNextPage,
}) => {

  console.log(active);
  function changeCurrPaginationItem(nextNum:number) {
    active = nextNum
    handleFetchNextPage(`https://api.sr.se/v2/channels?format=json&indent=true&page=${active}`)
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
        <Pagination>{items}</Pagination>
      </div>
    </>
  );
};

export default PaginationComponent;
