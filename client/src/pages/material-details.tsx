// material-details.tsx
import React, { useEffect, useState } from 'react';
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

  // Renderizar los detalles del material usando el componente FileComponent
  return (
    <div>
      <h2>Material Details</h2>
      <FileComponent
        title={materialDetails?.title ?? ''}
        description={materialDetails?.description ?? ''}
        price={materialDetails?.price ?? 0}
        currency={materialDetails?.currency ?? ''}
        author={materialDetails?.author ?? ''}
        type={materialDetails?.type ?? ''}
        file={materialDetails?.file ?? ''}
      />
    </div>
  );
};

export default MaterialDetailsPage;
