import { Container, ButtonGroup, Button, Typography, Grid, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRouter } from '../routes/hooks/useRouter'
import Footer from '../components/footer/footer'

const cssAppliedContent = (body: any) => `
    <div>
      <link rel="stylesheet" type="text/css" href="/docs/CA/css/styles.css">
      ${body}
    </div>
`

const ContractPage: React.FC = () => {
    const [html, setHtml] = useState<string>('')
    const [version, setVersion] = useState<string>('v0.9')
    const versions = [
        'v0.9',
        'v0.8',
        'v0.7',
        'v0.6',
        'v0.5',
        'v0.4',
    ]
    const router = useRouter()

    useEffect(() => {
        fetch(`/docs/CA/Customer_Agreement_${version}.html`)
            .then((response) => response.text())
            .then((html) => {
                setHtml(html)
            })
    }, [version])

    const handleVersionChange = (event: SelectChangeEvent) => {
        setVersion(event?.target.value)
    }

    return (
        <>
            <Container maxWidth="md" style={{ marginBottom: '100px' }}>
                <Grid container justifyContent="center">
                    <Button
                        style={{ margin: '20px', marginBottom: '40px' }}
                        variant="contained"
                        color="error"
                        onClick={() => {
                            router.push('/')
                        }}
                    >
                        Back to home
                    </Button>
                    <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                    >
                        <InputLabel id="demo-simple-select-standard-label">
                            Version
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={version}
                            onChange={handleVersionChange}
                            label="Age"
                        >
                            {versions.map((v) => (
                                <MenuItem key={v} value={v}>
                                    {v}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Typography variant="h2" style={{ textAlign: 'center' }}>
                    Customer Agreement - {version}
                </Typography>
                <div
                    className={'html'}
                    dangerouslySetInnerHTML={{
                        __html: cssAppliedContent(html),
                    }}
                />
            </Container>
            <Footer />
        </>
    )
}

export default ContractPage
