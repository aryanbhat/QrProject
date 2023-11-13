import { useState } from "react";
import Generator from "./Components/Generator";
import { Tab, Tabs } from "@mui/material";
function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange} variant="fullWidth" sx={{background:"rgba(255,255,255,0.4)"}}>
        <Tab label="Generate QR" />
        <Tab disabled label="Bind QR" />
      </Tabs>
      {value === 0 ? <Generator /> : <></>}
    </>
  );
}

export default App;
