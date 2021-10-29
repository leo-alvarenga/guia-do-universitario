import { Chip, Avatar } from "@mui/material";

export const getSummarizedText = (text, maxLength) => {
    const max = Math.floor((window.screen.width / 3) / 5);
    
    if (text) {
        if (text.length > max) {
            let out = '';

            for (let i = 0; i < max; ++i) {
                out = out + text.charAt(i);
            }

            return out + '...';
        } else {
            return text + '...';
        }
    } else {
        return undefined;
    }
};


export const AuthorChip = (props) => (
    props.author
    ? (
        <Chip
            avatar={<Avatar>{props.author.toUpperCase()[0]}</Avatar>}
            label={props.author}
            variant="outlined"
            sx={{ 
                transition: 'all 250ms ease-in',

                '&:hover': {
                    transform: 'translateY(-3px) scale(1.01)',
                },
            }}
        />
    )
    : null
    
);

export const TagChip = (props) => (
    props.tag
    ? (
        <Chip
            label={props.tag}
            color="primary"
            variant="outlined"
            sx={{ 
                marginLeft: '1rem',
                transition: 'all 250ms ease-in',

                '&:hover': {
                    transform: 'translateY(-3px) scale(1.01)',
                },
            }}
        />
    )
    : null
);