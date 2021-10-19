import { Alert, AlertTitle, Typography, Button } from '@mui/material';

const Erro = (props) => (
    <Alert severity={props.severity || 'error'}>
        <AlertTitle>Erro</AlertTitle>
        
        <Typography>
            { 
                props.message 
                ? 
                props.message 
                : 
                (
                    props.type === '404'
                    ?
                    'O conteúdo solicitado não existe.'
                    :
                    'Não foi possível carregar o conteúdo.'
                )
            }
        </Typography>

        {
            props.onClick
            ?
            (
                <Button
                    onClick={props?.onClick}
                >
                    { props.label ? props.label : 'Tentar novamente' }
                </Button>
            )
            :
            null
        }
    </Alert>
);

export default Erro;