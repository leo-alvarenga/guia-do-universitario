// react
import { useState, useEffect } from "react";

// routes
import { Link } from "react-router-dom";

// mui
import { Card, CardContent, CardMedia, CardActions, Typography, IconButton, Zoom } from "@mui/material";
import { FavoriteBorderOutlined, FavoriteOutlined, Share } from '@mui/icons-material';

// util
import { getSummarizedText } from "./PostMiniature.util";
import localStyles from "./PostMiniature.style";

const PostMiniature = (props) => {
    const [content, setContent] = useState({
        postId: props.id,
        title: props.title || "Untitled",
        text: getSummarizedText(props.body) || "Empty...",
        image: props.image,
    });

    const [meta, setMeta] = useState({
        ready: false,
        favorite: props.favorite || false,
    });

    const localClasses = localStyles();

    const handleFavorite = () => {
        setMeta({ ...meta, favorite: !meta.favorite, });
    };

    const handleShare = () => {

    };

    useEffect(() => {
        setMeta({ ...meta, ready: true, });
    }, []);

    return(
        <Card sx={{backgroundColor: props.darkMode && '#1b202a'}} className={localClasses.post}>
            <Link className={localClasses.postAnchor} to={() => `/read/${content.postId}`}>
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
                    <Typography sx={{textAlign: 'center'}} gutterBottom variant="h5" component="div" color="text.primary">
                        {content.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {content.text}
                    </Typography>
                </CardContent>

            </Link>
            <CardActions>
                <IconButton onClick={handleFavorite}>
                    {
                        meta.favorite ? (
                            <FavoriteOutlined />
                        ) : (
                            <FavoriteBorderOutlined />
                        )
                    }
                </IconButton>

                <IconButton onClick={handleShare}>
                    <Share />
                </IconButton>
            </CardActions>

        </Card>
    );
};

export default PostMiniature;