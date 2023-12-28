// material-details.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography, Divider, Button } from '@mui/material'; // Import the Button component
import { useParams } from 'react-router-dom';
import FileComponent from '../components/course-material-details/course-material-details';
import { Material, materials } from '../_mocks/materials';
import { useResponsive } from '../hooks/useResponsive';
import { useAuth } from '../hooks/useAuth'
const MaterialDetailsPage = () => {
  const { id } = useParams();
  const [materialDetails, setMaterialDetails] = useState<Material | null>(null);
  const { authUser } = useAuth()

  useEffect(() => {
    // Obtener los detalles del material usando el ID
    const getMaterialDetails = async () => {
      // Buscar el material por ID
      const foundMaterial = materials.find((material) => material.id === id);

      if (foundMaterial) {
        setMaterialDetails(foundMaterial);
      }
    };

    getMaterialDetails(); // Llamada a la función dentro del useEffect
  }, [authUser, id]);

    const isSmallScreen = useResponsive('down', 'sm')
    const handleDownload = () => {
      const link = document.createElement('a');
      link.href = materialDetails?.file ?? '';
      link.download = materialDetails?.title ?? 'file';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    return (
      <Grid container spacing={2}>

      <Grid item xs={isSmallScreen ? 12 : 6}>

        <Card>
          <CardContent>
          <Typography variant="h4">Material Content</Typography>
            <Divider sx={{ marginBottom: 1, marginTop: 1 }} />
            <FileComponent
              title={materialDetails?.title ?? ''}
              description={materialDetails?.description ?? ''}
              file={materialDetails?.file ?? ''}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={isSmallScreen ? 12 : 6}>
        <Card style={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6">Other Attributes</Typography>
            <Divider sx={{ marginBottom: 1, marginTop: 1 }} />
            <Typography sx={{ marginBottom: 2 }}>Price: {materialDetails?.currency ?? ''}{materialDetails?.price ?? 0}</Typography>
            <Typography sx={{ marginBottom: 2 }}>Author: {materialDetails?.author ?? ''}</Typography>
            <Typography sx={{ marginBottom: 2 }}>Type: {materialDetails?.type ?? ''}</Typography>
            <Button variant="contained" color="primary" onClick={handleDownload}>
              Download
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
  
  export default MaterialDetailsPage;