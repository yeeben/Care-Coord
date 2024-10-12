import { useState } from 'react'
import './App.css'
import { Button, TextField, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';


function Home() {
  const [condition, setCondition] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/careplan', { state: { condition } });
    console.log("conditions", condition);
  };


  const handleButtonClick = (value: string) => {
    setCondition((prevText) => prevText + ' ' + value);
  };

  return (
    <>
      <div className="center-container">
        <Typography variant="h4" gutterBottom>
          Begin your Care Journey
        </Typography>

        <Grid container spacing={1}>
            <Button className="button" variant="contained" onClick={() => handleButtonClick('Alzheimers')}>Alzheimers</Button>
            <Button className="button" variant="contained" onClick={() => handleButtonClick('Anxiety')}>Anxiety</Button>
            <Button className="button" variant="contained" onClick={() => handleButtonClick('Chronic Kidney Disease (CKD)')}>Chronic Kidney Disease (CKD)</Button>
            <Button className="button" variant="contained" onClick={() => handleButtonClick('Diabetes')}>Diabetes</Button>
          </Grid>
          <br></br>
          <TextField
            className="text-field-custom"
            variant="outlined"
            value={condition}
          />
          <br></br>

          <Button className="button" variant="contained" onClick={handleSubmit}>Submit</Button>

      </div>
    </>


  );
}

export default Home
