import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { json, useLocation } from 'react-router-dom';
import axios from 'axios';


const CarePlan: React.FC = () => {
  const location = useLocation();
  const selectedConditions = location.state?.selectedConditions || [];
  const [rawJsonResponse, setRawJsonResponse] = useState(null);


  useEffect(() => {
    const postConditions = async () => {
      try {
        const data = JSON.stringify({
          conditions: selectedConditions
        });

        
        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://ve0ml49xs6.execute-api.us-east-1.amazonaws.com/',
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };

        const response = await axios.request(config);
        setRawJsonResponse(response?.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    postConditions();
  }, [selectedConditions]);

  return (
    <div className="center-container">
      <Typography variant="h4" gutterBottom>
        Your Selected Conditions
      </Typography>
      {selectedConditions.length > 0 ? (
        selectedConditions.map((condition: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
          <Typography key={index} variant="body1">
            {condition}
          </Typography>
        ))
      ) : (
        <Typography variant="body1">
          No conditions selected.
        </Typography>
      )}

      {rawJsonResponse ? (
        <Typography variant="body1">
          {JSON.stringify(rawJsonResponse)}
        </Typography>
      ) : (
        <Typography variant="body1">
          No response from server.
        </Typography>
      )}
    </div>
  );
};

export default CarePlan;