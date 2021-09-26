export const getSummarizedText = (maxLength, text) => {
    const max = maxLength || 40;
    
    if (text) {
        if (text.lenght > max) {
            return text.slice(0, max) + '...';
        } else {
            return text + '...';
        }
    } else {
        return undefined;
    }
};