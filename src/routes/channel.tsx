import { useLocation } from "react-router-dom";
import Channeloptions from "./Channeloptions.tsx";

const Channel = () => {
  const channelData = useLocation().state;

  return (
    <>
      <h2 className="text-center m-2 text-white">
        {channelData.name} - {channelData.channeltype}
      </h2>

      <Channeloptions channelData={channelData}/>
    </>
  );
};

export default Channel;
