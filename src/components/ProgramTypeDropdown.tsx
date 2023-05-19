import Dropdown from "react-bootstrap/Dropdown";
import useFetch from "../hooks/useFetch";

const ProgramTypeDropdown = () => {
  const { data } = useFetch(
    "http://api.sr.se/api/v2/programcategories?format=json&size=15"
  );

  if (!data || !data.programcategories) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Dropdown className="m-3" >
        <Dropdown.Toggle id="dropdown-basic" variant="dark">
          Kategori
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          {data.programcategories &&
            data.programcategories.map((category: any) => (
              <Dropdown.Item href="" key={category.id}>
                {category.name}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ProgramTypeDropdown;
