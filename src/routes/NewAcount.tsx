import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function NewAcount() {
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const [submitForm, setsubmitForm] = useState<boolean>(false);
  const [URL, setURL] = useState("");
  const [User, setUser] = useState({});

  const { error, isLoading } = useFetch(URL, "POST", User);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading === false && submitForm) {
      if (error) {
        alert("Account creation failed!");
        setsubmitForm(false);
        setURL("");
      } else {
        navigate("/Login");
        alert("Account creation success! Please login afterwards");
        setsubmitForm(false);
        setURL("");
      }
    }
  }, [submitForm, isLoading]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const User = {
      Name: `${e.target[0].value}`,
      Email: `${e.target[1].value}`,
      Password: `${e.target[2].value}`,
    };
    setUser(User);
    setURL("http://localhost:9000/users/newacount");
    setsubmitForm(true);
  };

  const handleShowPassword = () => setshowPassword(!showPassword);

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      id="LoginContainer"
    >
      <h1 className="text-light">Skapa ny konto</h1>
      <Card className="m-3" bg="dark" text="white">
        <Form className="m-3" onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Namn</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lägg in ditt namn"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email addres</Form.Label>
            <Form.Control
              type="email"
              placeholder="exempel@exempel.se"
              required
            />
            <Form.Text className="text-light">
              Vi kommer aldrig dela din adress med någon annan
            </Form.Text>
          </Form.Group>
          {showPassword ? (
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Lösenord</Form.Label>
              <Form.Control type="text" placeholder="Lösenord" required />
            </Form.Group>
          ) : (
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Lösenord</Form.Label>
              <Form.Control type="password" placeholder="Lösenord" required />
            </Form.Group>
          )}
          <Form.Group controlId="formBasicCheckbox" className="mt-1">
            <Form.Check
              type="checkbox"
              label="Visa Lösenord"
              onClick={handleShowPassword}
            />
          </Form.Group>
          <div>
            <Button variant="primary" type="submit" className="mt-1">
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default NewAcount;
