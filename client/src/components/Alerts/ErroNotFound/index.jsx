import { Alert, AlertTitle, Typography } from '@mui/material';

const ErroNotFound = (props) => (
    <Alert severity="error">
        <AlertTitle>Erro</AlertTitle>
        
        <Typography>
            { props.body ? props.body : 'O post procurado não existe.' }
        </Typography>
    </Alert>
);

export default ErroNotFound;