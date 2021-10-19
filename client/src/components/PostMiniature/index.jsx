// react
import { useState, useEffect } from "react";

// routes
import { Link } from "react-router-dom";

// redux
import { connect, useDispatch } from "react-redux";
import { newFavorite, removeFavorite } from "../../store/user";

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
        subtitle: props.subtitle || '',
        date: props.date || '',
        author: props.author || '',
        text: getSummarizedText(props.body) || "Empty...",
        image: props.image,
    });

    const isAuth = props.user.value.isAuth;
    const favorites = props.user.value.favorites;
    const dispatch = useDispatch();
    
    const [meta, setMeta] = useState({
        ready: false,
        favorite: false,
    });

    const localClasses = localStyles();

    const handleFavorite = () => {
        if (meta.favorite === false) {
            dispatch(newFavorite(content.postId));
    
            setMeta({ ...meta, favorite: true, });
        } else {
            dispatch(removeFavorite(content.postId));

            setMeta({ ...meta, favorite: false, });
        }

    };

    const handleShare = () => {
        const link = `${location.href}read/${content.postId}`;
        navigator.clipboard.writeText(link);
        window?.clipboardData?.setData("Text", link);
    };

    useEffect(() => {
        setMeta({ ...meta, ready: true, favorite: content.postId in favorites, });
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
                    <Typography sx={{textAlign: 'center'}} gutterBottom variant="h4" component="div" color="text.primary">
                        {content.title}
                    </Typography>

                    <Typography gutterBottom variant="caption" component="div" color="text.disabled">
                        { content.author !== '' ? `Por: '${content.author}'` : null } 
                        { content.date !== '' ? ` em ${content.date}` : null }
                    </Typography>

                    <Typography gutterBottom variant="subtitle2" component="div" color="text.disabled">
                        {content.subtitle}
                    </Typography>

                    <Typography variant="h6" color="text.secondary">
                        {content.text}
                    </Typography>
                </CardContent>

            </Link>
            <CardActions>
                {
                    isAuth === true 
                    ?
                    (
                        <IconButton onClick={handleFavorite}>
                            {
                                meta.favorite ? (
                                    <FavoriteOutlined />
                                ) : (
                                    <FavoriteBorderOutlined />
                                )
                            }
                        </IconButton>
                    )
                    :
                    null
                }

                <IconButton onClick={handleShare}>
                    <Share />
                </IconButton>
            </CardActions>

        </Card>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(PostMiniature);