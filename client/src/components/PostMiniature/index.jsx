import { useState } from "react";
import { Card, CardContent, CardMedia, CardActions, Typography, IconButton } from "@mui/material";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ShareIcon from '@mui/icons-material/Share';

import { getSummarizedText } from "./PostMiniature.util";
import localStyles from "./PostMiniature.style";

const PostMiniature = (props) => {
    const [content, setContent] = useState({
        postId: props.id,
        title: props.title || "Untitled",
        text: getSummarizedText(props.text) || "Empty...",
        image: props.image,
    });

    const [meta, setMeta] = useState({
        favorite: props.favorite || false,
    });

    const localClasses = localStyles();

    const handleFavorite = () => {
        setMeta({ ...meta, favorite: !meta.favorite, });
    };

    const handleShare = () => {

    };

    return(
        <Card sx={{backgroundColor: props.darkMode && '#1b202a'}} className={localClasses.post} >
            {
                content.image ? (
                    <CardMedia 
                        component="img" 
                        height="140" 
                        image={content.image} 
                        alt={props.title}
                    />
                ) : (null)
            }

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {content.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {content.text}
                </Typography>
            </CardContent>

            <CardActions>
                <IconButton onClick={handleFavorite}>
                    {
                        meta.favorite ? (
                            <FavoriteOutlinedIcon />
                        ) : (
                            <FavoriteBorderOutlinedIcon />
                        )
                    }
                </IconButton>

                <IconButton onClick={handleShare}>
                    <ShareIcon />
                </IconButton>
            </CardActions>

        </Card>
    );
};

export default PostMiniature;