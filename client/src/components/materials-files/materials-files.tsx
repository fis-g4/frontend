import {
    Box,
    Grid,
} from '@mui/material'
import MaterialCard from './material-card'
import { materials } from '../../_mocks/materials'

export default function MaterialsFiles() {

    const handleEdit = () => {
    console.log('Editar material');
  };

  const handleDelete = () => {
    console.log('Eliminar material');
  };

    return (
        <Box sx={{marginBottom: "100px"}}>
            <Box
                display="flex"
                justifyContent="center"
            >
                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    maxWidth="75%"
                >
                    {materials.map((material, index) => (
                        <Grid item key={index} width="100%" maxWidth="750px">
                            <MaterialCard {...material} onEdit={handleEdit} onDelete={handleDelete} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}
