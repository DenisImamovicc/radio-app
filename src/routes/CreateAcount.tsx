import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch.tsx";
import AlertMessage from "../components/Alert.tsx";

function NewAcount() {
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const [submitForm, setsubmitForm] = useState<boolean>(false);
  const [URL, setURL] = useState("");
  const [User, setUser] = useState({});
  const [alert, setalert] = useState({ mssg: "", type: "", duration: 3000 });
  const [buttonIsLoading, setbuttonIsLoading] = useState(false);

  const API_URL: any = import.meta.env.VITE_API_URL;

  const { error, isLoading } = useFetch(URL, "POST", User);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading === false && submitForm) {
      if (error) {
        setbuttonIsLoading(false);
        setalert({
          mssg: "Skapelse av ny konto har misslyckats!",
          type: "danger",
          duration: 3000,
        });

        setsubmitForm(false);
        setURL("");
      } else {
        setbuttonIsLoading(false);
        setalert({
          mssg: "Skapelse av ny konto har lyckats,dirigerar till inloggningsidan!",
          type: "success",
          duration: 3000,
        });
        setTimeout(handleSucessfulCreateAcount, 3000);
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
    setbuttonIsLoading(true);
    setUser(User);
    setURL(API_URL + "users/newacount");
    setsubmitForm(true);
  };

  const handleSucessfulCreateAcount = () => {
    navigate("/Login");
    setsubmitForm(false);
    setURL("");
  };

  const handleShowPassword = () => setshowPassword(!showPassword);

  return (
    <>
      <AlertMessage alert={alert} setalert={setalert} />
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
              <Button
                variant="primary"
                type="submit"
                className="mt-1"
                disabled={buttonIsLoading}
              >
                {buttonIsLoading ? "Skapar ny konto..." : "Skapa ny konto"}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default NewAcount;
