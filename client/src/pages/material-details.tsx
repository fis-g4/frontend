// material-details.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography, Divider, Button,useTheme, alpha  } from '@mui/material';
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

    getMaterialDetails();
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
    const theme = useTheme();
    return (
      <Grid container spacing={2}>

      <Grid item xs={isSmallScreen ? 12 : 8}>
        <FileComponent
          title={materialDetails?.title ?? ''}
          description={materialDetails?.description ?? ''}
          file={materialDetails?.file ?? ''}
        />
      </Grid>
      <Grid item xs={isSmallScreen ? 12 : 4}>
        <Card >
          <CardContent>
            <Typography variant="h6">More information:</Typography>
            <Divider sx={{ marginBottom: 1, marginTop: 1 }} />
            <Typography variant="body2" sx={{ backgroundColor: alpha(theme.palette.grey[500],0.24), color: theme.palette.common.black, padding: 1, borderRadius: '4px', maxHeight: '25em', overflow: 'auto' }}>{materialDetails?.description ?? ''}</Typography> 
            <Typography sx={{ marginBottom: 2 }}>Price: {materialDetails?.currency ?? ''} {materialDetails?.price ?? 0}</Typography>
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