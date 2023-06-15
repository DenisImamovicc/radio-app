import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [showPassword, setshowPassword] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const User = {
      Email: `${e.target[0].value}`,
      Password: `${e.target[1].value}`,
    };
    console.log(User);
  };

  const handleShowPassword = () => setshowPassword(!showPassword);

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      id="LoginContainer"
    >
      <h1 className="text-light">Logga in</h1>
      <Card className="m-3" bg="dark" text="white">
        <Form className="m-3" onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
            <Form.Text className="text-light">
              We'll never share your email with anyone else.
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
          <Form.Text className="text-light text-end mt-1">
            <Link to="/NewAcount">Dont have an acount?</Link>
          </Form.Text>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
