import React from 'react';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';


const CarePlan: React.FC = () => {
  const location = useLocation();
  const { condition } = location.state as { condition: string };

  return (
    <div className="center-container">
      <Typography variant="h4" gutterBottom>
        Your Selected Conditions
      </Typography>
      <Typography variant="body1">
        {condition}
      </Typography>
    </div>
  );
};

export default CarePlan;