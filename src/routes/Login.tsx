import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const [isOk, setisOk] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [token, settoken] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const User = {
      Email: `${e.target[0].value}`,
      Password: `${e.target[1].value}`,
    };
    await loginAcount(User);
    setIsFormSubmitted(true);
  };

  useEffect(() => {
    if (isFormSubmitted) {
      if (isOk) {
        navigate("/User");
        console.log(token);
        alert("Login success!");
      } else {
        alert("Login failed!");
      }
    }
  }, [isOk, isFormSubmitted]);

  const handleShowPassword = () => setshowPassword(!showPassword);

  const loginAcount = async (User: any) => {
    try {
      const rawResponse = await fetch(
        "http://localhost:9000/users/loginacount",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(User),
        }
      );
      if (rawResponse.ok === false) {
        setisOk(false);
        throw new Error("Request failed");
      }
      const responseData = await rawResponse.json();
      settoken(responseData);
      setisOk(true);
      return responseData;
    } catch (error) {
      console.log(error);
      setisOk(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      id="LoginContainer"
    >
      <h1 className="text-light">Logga in</h1>
      <Card className="m-3" bg="dark" text="white">
        <Form className="m-3" onSubmit={handleSubmit}>
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
            <Button variant="primary" type="submit" className="mt-2">
              Submit
            </Button>
          </div>
          <div className="text-end text-light  mt-1">
            <Form.Text>
              <Link to="/NewAcount">Skapa konto här!</Link>
            </Form.Text>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
