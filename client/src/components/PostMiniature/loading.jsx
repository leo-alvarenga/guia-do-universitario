import { Skeleton } from "@mui/material";

const PostMiniatureSkeleton = () => {
    
    return (
        <div>
            <Skeleton variant="text" animation="wave"/>
            <Skeleton variant="rectangular" animation="wave" />
        </div>
    );
};

export default PostMiniatureSkeleton;