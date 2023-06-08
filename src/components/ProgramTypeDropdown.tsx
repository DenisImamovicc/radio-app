import Dropdown from "react-bootstrap/Dropdown";
import useFetch from "../hooks/useFetch";
import Loadingprogramcard from "./Loadingprogramcard";
import {useState} from "react"

interface ProgramTypeDropdown {
  setprogramCategory: (categoryId: string) => void;
  setUrl: (url: string) => void;
}

const ProgramTypeDropdown = ({
  setprogramCategory,
  setUrl,
}: ProgramTypeDropdown) => {
  const [titel, settitel] = useState("Kategori")
  const { data } = useFetch(
    "https://api.sr.se/api/v2/programcategories?format=json&size=15"
  );

  if (!data || !data.programcategories) {
    return <Loadingprogramcard />;
  }

  const handleOnClick = (category: any) => {
    setprogramCategory(category.id);
    setUrl(
      `https://api.sr.se/api/v2/programs?programcategoryid=${category.id}&format=json`
    );
    settitel(category.name)
  };

  return (
    <>
      <Dropdown className="m-3">
        <Dropdown.Toggle id="dropdown-basic" variant="dark">
          {titel}
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          {data.programcategories &&
            data.programcategories.map((category: any) => (
              <Dropdown.Item
                key={category.id}
                onClick={() => handleOnClick(category)}
              >
                {category.name}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ProgramTypeDropdown;
