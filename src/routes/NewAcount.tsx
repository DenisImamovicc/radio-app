import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NewAcount() {
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const [isOk, setisOk] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isFormSubmitted) {
      console.log(isOk, "Status");
      if (isOk) {
        navigate("/");
        alert("Account creation success! Please login afterwards");
      } else {
        alert("Account creation failed!");
      }
    }
  }, [isOk, isFormSubmitted]);

  async function createNewAcount(data: any) {
    try {
      const rawResponse = await fetch("http://localhost:9000/users/newacount", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (rawResponse.ok === false) {
        setisOk(false);
        throw new Error("Request failed");
      }
      const responseData = await rawResponse.json();
      console.log(responseData);
      setisOk(true);
      return responseData;
    } catch (error) {
      console.log(error);
      setisOk(false);
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const User = {
      Name: `${e.target[0].value}`,
      Email: `${e.target[1].value}`,
      Password: `${e.target[2].value}`,
    };
    await createNewAcount(User);
    setIsFormSubmitted(true);
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
