import { useLocation, useParams } from "react-router-dom";
import Channeloptions from "./Channeloptions.tsx";
import useFetch from "../hooks/useFetch";
import Loadingprogramcard from "../components/Loadingprogramcard";
import { Placeholder } from "react-bootstrap";

const Channel = () => {
  let channelData = useLocation().state;
  const { id } = useParams();
  const { data,isLoading } = useFetch(
    `https://api.sr.se/api/v2/channels/${id}?format=json`
  );

  if (!channelData) {
    channelData = data;
    console.log(channelData, "inside if");
  }

   if (isLoading || !channelData) {
     return (
       <>
       <h2 className="text-center m-2 text-white"><Placeholder xs={8} /></h2>
         <Loadingprogramcard />
       </>
     );
   }

  return (
    <>
      {channelData.channel ? 
        <div>
          <h2 className="text-center m-2 text-white">
            {channelData.channel.name} - {channelData.channel.channeltype}
          </h2>
          <Channeloptions channelData={channelData.channel} />
        </div>
       : 
        <div>
          <h2 className="text-center m-2 text-white">
            {channelData.name} - {channelData.channeltype}
          </h2>
          <Channeloptions channelData={channelData} />
        </div>
      }
    </>
  );
};

export default Channel;
