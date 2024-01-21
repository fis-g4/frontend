import { Container, ButtonGroup, Button, Typography, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRouter } from '../routes/hooks/useRouter'

const cssAppliedContent = (body: any) => `
    <div>
      <link rel="stylesheet" type="text/css" href="/docs/CA/css/styles.css">
      ${body}
    </div>
`

const ContractPage: React.FC = () => {
    const [html, setHtml] = useState<string>('')
    const [version, setVersion] = useState<string>('v0.4')
    const [versions, setVersions] = useState<string[]>([])
    const router = useRouter()

    useEffect(() => {
        const versions = ['v0.4', 'v0.5', 'v0.6', 'v0.7']
        setVersions(versions)

        fetch(`/docs/CA/Customer_Agreement_${versions[0]}.html`)
            .then((response) => response.text())
            .then((html) => {
                setHtml(html)
            })
    }, [])

    const handleVersionChange = (version: string) => {
        fetch(`/docs/CA/Customer_Agreement_${version}.html`)
            .then((response) => response.text())
            .then((html) => {
                setHtml(html)
            })
        setVersion(version)
    }

    return (
        <Container maxWidth="md">
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
                <ButtonGroup style={{ margin: '20px', marginBottom: '40px' }}>
                    {versions.map((v) => (
                        <Button
                            key={v}
                            onClick={() => handleVersionChange(v)}
                            variant={v === version ? 'contained' : 'outlined'}
                        >
                            {v}
                        </Button>
                    ))}
                </ButtonGroup>
            </Grid>
            <Typography variant="h2" style={{ textAlign: 'center' }}>
                Customer Agreement - {version}
            </Typography>
            <div
                className={'html'}
                dangerouslySetInnerHTML={{ __html: cssAppliedContent(html) }}
            />
        </Container>
    )
}

export default ContractPage
