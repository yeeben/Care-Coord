import { useState } from 'react'
import './App.css'
import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';


function App() {
  const [condition, setCondition] = useState('');

  const handleButtonClick = (value: string) => {
    setCondition((prevText) => prevText + ' ' + value);
  };

  return (
    <>
      <div className="center-container">
        <Grid container spacing={2}>
          <Button className="button" variant="contained" onClick={() => handleButtonClick('Alzheimers')}>Alzheimers</Button>
          <Button className="button" variant="contained" onClick={() => handleButtonClick('Anxiety')}>Anxiety</Button>
          <Button className="button" variant="contained" onClick={() => handleButtonClick('Chronic Kidney Disease (CKD)')}>Chronic Kidney Disease (CKD)</Button>
          <Button className="button" variant="contained" onClick={() => handleButtonClick('Diabetes')}>Diabetes</Button>
        </Grid>


        <div>
          <TextField
            className="text-field"
            id="outlined-multiline-static"
            multiline
            rows={4}
            value={condition}
          />
        </div>
      </div>
    </>
  )
}

export default App
