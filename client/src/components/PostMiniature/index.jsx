// react
import { useState, useEffect } from "react";

// routes
import { Link } from "react-router-dom";

// redux
import { connect, useDispatch } from "react-redux";
import { newFavorite, removeFavorite } from "../../store/user";

// mui
import { Card, CardContent, CardMedia, CardActions, Typography, IconButton, Stack } from "@mui/material";
import { FavoriteBorderOutlined, FavoriteOutlined, Share } from '@mui/icons-material';

// util
import { getSummarizedText, AuthorChip, TagChip } from "./PostMiniature.util";
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
        tags: props.tags || [],
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
        setMeta({ ...meta, ready: true, favorite: favorites.find(f => f === content.postId) !== undefined, });
    }, []);

    return(
        <Card
            sx={{
                backgroundColor: props.darkMode && '#1b202a',
                margin: '0.5rem 0 0.5rem 0',
                transition: 'all 250ms ease-in',

                '&:hover': {
                    transform: 'translateY(-3px) scale(1.01)',
                },
            }}
        >
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

                    <Stack direction="row" sx={{ alignItems: 'center', margin: '1rem 0 1rem 0' }}>
                        <AuthorChip author={content.author} />

                        <Typography
                            gutterBottom
                            variant="caption"
                            component="div"
                            color="text.disabled"
                            sx={{ margin: '0 0 0 auto' }}
                        >
                            { content.date !== '' ? `Publicado em ${content.date}` : null }
                        </Typography>
                    </Stack>                    

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

                <Stack direction="row">
                    {
                        content.tags?.map(tag => (
                            <TagChip tag={tag} />
                        ))
                    }
                </Stack>

            </CardActions>

        </Card>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(PostMiniature);