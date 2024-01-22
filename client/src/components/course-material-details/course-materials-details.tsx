import React from 'react';
import { Card, CardContent, Divider, Typography, useTheme, alpha } from '@mui/material';
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
    const theme = useTheme();
    return (    
        <Card>
        <CardContent>
          <Typography variant="h4">{title}</Typography>
          <Divider sx={{ marginBottom: 1, marginTop: 1 }} />
                              
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