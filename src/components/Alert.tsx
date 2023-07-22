import Alert from "react-bootstrap/Alert";
import { useEffect } from "react";

interface AlertMssg {
  alert: {
    mssg: string;
    type: string;
    duration:number
  };
  setalert: React.Dispatch<React.SetStateAction<AlertMssg["alert"]>>;
}

const alertMessage = ({ alert, setalert }: AlertMssg) => {
  useEffect(() => {
    alert.mssg.length
      ? setTimeout(() => {
          setalert({ mssg: "", type: "",duration:3000});
        }, alert.duration)
      : "";
  }, [alert.mssg]);

  return (
    <>
      {alert ? (
        <Alert
          className="m-1"
          variant={alert.type}
          key={alert.type}
          onClose={() => setalert({ mssg: "", type: "",duration:3000})}
          dismissible
        >
          {alert.mssg}
        </Alert>
      ) : (
        ""
      )}
    </>
  );
};

export default alertMessage;
