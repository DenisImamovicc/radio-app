import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const alertMessage =  () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (show === true) {
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [show]);

  
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Email and/or Password is incorrect!</Alert.Heading>
        <Button onClick={() => setShow(true)}>Show Alert</Button>;
      </Alert>
    );
   
}

export default alertMessage;
