import { useState } from "react";

import localStyles from "./PostMiniature.style";

import { getSummarizedText } from "./PostMiniature.util";

const PostMiniature = (props) => {
    const localClasses = localStyles();
    const [content, setContent] = useState({
        title: props.title || "Untitled",
        text: getSummarizedText(props.text) || "Empty...",
    });

    return(
        <div className={localClasses.postMiniature}>
            <div className={localClasses.header}>
                <h3>{content.title}</h3>
            </div>
            <div className={localClasses.body}>
                <p>{content.text}</p>
            </div>
        </div>
    );
};

export default PostMiniature;