import QRCode from "qrcode.react";
import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
const Generator = () => {
  const [link, setLink] = useState("");
  const [show, setshow] = useState(true);
  const [qr, Setqr] = useState("");
  const [intervalId, setIntervalId] = useState(null);

  const handleChange = (e) => {
    if(intervalId){
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setshow(true);
    setLink(e.target.value);
  };

  window.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  });

  async function getLink() {
    
    try{
      const res = await axios.post(import.meta.env.VITE_URL,null,{
        params:{
          long:link,
        }
      })
      Setqr("1pt.co/"+res.data.short);
    }
    catch(err){
      throw new Error(err);
    }
  }

  const handleClick = () => {

    if(intervalId){
      clearInterval(intervalId);
    }

   const newInterval =  setInterval(()=>{
      getLink();
    },5000);

    setIntervalId(newInterval);
    setshow(false);
  };

  return (
    <div className="card-container">
      <h1 className="card-title" >QR CODE GENERATOR</h1>
      <div className="input-container">
        <input
          value={link}
          onChange={handleChange}
          placeholder="Paste the link here"
        />
        <Button variant="contained" sx={{borderRadius:"0px"}} onClick={handleClick}>Generate</Button>
      </div>
      {show ? (
        <div className="empty-qr"></div>
      ) : (
        <QRCode
          style={{ padding: "10px", backgroundColor: "white" }}
          value={qr}
        ></QRCode>
      )}
    </div>
  );
};

export default Generator;
