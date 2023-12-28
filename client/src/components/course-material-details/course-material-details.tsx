import React, { useEffect, useState } from 'react';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import { Document, Page } from 'react-pdf';
interface FileComponentProps {
    title: string;
    description: string;
    file: string; // URL del archivo PDF o HTML
}

const FileComponent: React.FC<FileComponentProps> = ({
    title,
    description,
    file,
}) => {
    const [isPdf, setIsPdf] = useState(false);

    useEffect(() => {
        console.log('File:', file);
        // Intentar cargar el recurso para determinar si es un PDF
        const fetchData = async () => {
            try {
                const response = await fetch(file);
                const contentType = response.headers.get('content-type');

                // Verificar si el contenido es de tipo PDF
                setIsPdf(contentType?.toLowerCase().includes('application/pdf') || false);
            } catch (error) {
                console.error('Error fetching file:', error);
            }
        };

        fetchData();
    }, [file]);

    return (    
        <Card>
        <CardContent>
          <Typography variant="h4">{title}</Typography>
          <Divider sx={{ marginBottom: 1, marginTop: 1 }} />
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Description: {description}
          </Typography>
        <iframe
            src={file}
            width="100%"
            height="600"
            title="PDF Viewer"
        ></iframe>

        </CardContent>
      </Card>
    
  );
};

export default FileComponent;
