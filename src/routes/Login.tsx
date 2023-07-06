import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

interface prop {
  setisLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
}

function Login({setisLoggedIn}:prop) {
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const [submitForm, setsubmitForm] = useState<boolean>(false);
  const [URL, setURL] = useState("");
  const [User, setUser] = useState({});
  const [email, setemail] = useState("");
  const {data,error,isLoading } = useFetch(URL,"POST",User);
  const navigate = useNavigate();

   const createUserCookie = (cookie:any) =>
     (document.cookie = `${cookie.Name}=${cookie.token}; ;max-age=${cookie.maxAge}`);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const User = {
      Email: `${e.target[0].value}`,
      Password: `${e.target[1].value}`,
    };
    setemail(User.Email)
    setUser(User)
    setURL("https://sradio-api.onrender.com/users/loginacount")
    setsubmitForm(true);
  };

  useEffect(() => {
    if (isLoading === false && submitForm) {
      if (error) {
        alert("Login failed!");
        setsubmitForm(false);
        setURL("");
      } else {
        navigate("/User",{ state: email });
         createUserCookie(data);
        alert("Login success!");
        setisLoggedIn(true)
        setsubmitForm(false);
        setURL("");
      }
    }
  }, [submitForm, isLoading]);

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
