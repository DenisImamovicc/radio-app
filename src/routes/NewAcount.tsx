import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useState } from "react";

function NewAcount() {
  const [showPassword, setshowPassword] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const User = {
      Name: `${e.target[0].value}`,
      Email: `${e.target[1].value}`,
      Password: `${e.target[2].value}`,
    };
    console.log(User);
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
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
            <Form.Text className="text-light">
              Vi kommer aldrig dela din adress med någon annan
            </Form.Text>
          </Form.Group>
          {showPassword ? (
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Lösenord</Form.Label>
              <Form.Control type="text" placeholder="Password" required />
            </Form.Group>
          ) : (
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Lösenord</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
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
