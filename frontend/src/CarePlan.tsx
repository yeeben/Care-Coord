import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Checkbox, 
  Card, 
  CardContent, 
  CardHeader, 
  Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

import axios from 'axios';

interface CareType {
  [key: string]: string[];
}

interface Condition {
  [key: string]: CareType;
}

interface ApiResponse {
  data: {
    [key: string]: Condition;
  };
}


const CarePlan: React.FC = () => {
  const location = useLocation();
  const selectedConditions = location.state?.selectedConditions || [];

  const [rawJsonResponse, setRawJsonResponse] = useState<ApiResponse | null>(null);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});


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

  const handleToggle = (itemKey: string) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [itemKey]: !prevState[itemKey]
    }));
  };

  return (
    <div className="center-container">
      <Typography variant="h4" gutterBottom>
        Your Selected Conditions
      </Typography>
      {selectedConditions.length < 1 && (
        <Typography variant="body1">
          No conditions selected.
        </Typography>
      )}


{rawJsonResponse && rawJsonResponse.data ? (
        <Box sx={{ display: 'flex', overflowX: 'auto', padding: 2 }}>
          {Object.keys(rawJsonResponse.data).map((condition, index) => (
            <Card key={index} variant="outlined" sx={{ minWidth: 300, marginRight: 2 }}>
              <CardHeader title={condition} />
              <CardContent>
                {Object.keys(rawJsonResponse.data[condition]).map((careType, careTypeIndex) => (
                  <Card key={careTypeIndex} variant="outlined" sx={{ marginBottom: 2 }}>
                    <CardHeader title={careType} />
                    <CardContent>
                      <List>
                        {rawJsonResponse.data[condition][careType].map((item, itemIndex) => {
                          const itemKey = `${condition}-${careType}-${itemIndex}`;
                          return (
                            <ListItem key={itemKey}>
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={checkedItems[itemKey] || false}
                                  tabIndex={-1}
                                  disableRipple
                                  onChange={() => handleToggle(itemKey)}
                                />
                              </ListItemIcon>
                              <ListItemText primary={item} />
                            </ListItem>
                          );
                        })}
                      </List>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          ))}
        </Box>

      ) : (
        <Typography variant="body1">
          No response from server.
        </Typography>
      )}
    </div>
  );
};

export default CarePlan;