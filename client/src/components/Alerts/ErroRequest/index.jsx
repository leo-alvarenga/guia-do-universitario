import { Alert, AlertTitle, Typography, Button } from '@mui/material';

const ErroRequest = (props) => (
    <Alert severity="error">
        <AlertTitle>Erro</AlertTitle>
        
        <Typography>
            { props.body ? props.body : 'Não foi possível carregar o conteúdo.' }
        </Typography>

        <Button onClick={props?.onClick}>Tentar novamente</Button>
    </Alert>
);

export default ErroRequest;