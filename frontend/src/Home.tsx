import { useState } from 'react'
import './App.css'
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';


function Home() {
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [availableConditions, setAvailableConditions] = useState<string[]>([
    'Alzheimers',
    'Anxiety Disorders',
    'Chronic Kidney Disease (CKD)',
    'Chronic Obstructive Pulmonary Disease (COPD)',
    'Dementia',
    'Depression',
    'Diabetes',
    'High Blood Pressure',
    'Loneliness',
    'Malnutrition',
    'Urinary Tract Infections (UTIs)',
    'Vision Impairments (Cataracts, Glaucoma, Macular Degeneration)',
    'Wheelchair Bound',
  ]);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/careplan', { state: { selectedConditions } });
    console.log("conditions", JSON.stringify({ conditions: selectedConditions }));
  };


  const handleSelectButtonClick = (value: string) => {
    setSelectedConditions((prevConditions) => [...prevConditions, value]);
    setAvailableConditions((prevAvailable) => prevAvailable.filter(cond => cond !== value));
  };

  const handleDeselectButtonClick = (value: string) => {
    setAvailableConditions((prevConditions) => [...prevConditions, value]);
    setSelectedConditions((prevAvailable) => prevAvailable.filter(cond => cond !== value));
  };

  return (
    <>
      <div className="center-container">
        <Typography variant="h4" gutterBottom>
          Begin your Care Journey Here
        </Typography>
        <Grid container spacing={1}>
          {availableConditions.map((cond) => (
            <Button
              key={cond}
              className="button"
              variant="contained"
              onClick={() => handleSelectButtonClick(cond)}
            >
              {cond}
            </Button>
          ))}
        </Grid>
        <br />
        <br />
        <Grid container spacing={1}>
          {selectedConditions.map((cond) => (

            <Button
              key={cond}
              className="button"
              variant="contained"
              onClick={() => handleDeselectButtonClick(cond)}
            >
              {cond}
            </Button>
          ))}
        </Grid>

        <br />
        <br />
        <Button className="button" variant="contained" onClick={handleSubmit}>Submit</Button>
      </div>
    </>


  );
}

export default Home
