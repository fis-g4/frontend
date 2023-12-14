import React from 'react';
import { Card, CardContent, Icon, Typography, useTheme } from '@mui/material';

export default function LandingServiceCard ({ title, description, Icon } : { title: string, description: string, Icon: any}) {
    const theme = useTheme();
  
    return (
      <Card style={{ textAlign: 'center', padding: theme.spacing(2) }}>
        <Icon style={{ fontSize: 60, margin: 'auto' }} color="primary" />
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {title}
          </Typography>
          <Typography color="textSecondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    );
  };